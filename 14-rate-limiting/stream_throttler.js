const { RateLimiterMemory } = require('rate-limiter-flexible');
const { Readable, Writable, Transform, pipeline } = require('stream');
const es = require('event-stream');
const parallel = require('parallel-stream');
const through2Concurrent = require('through2-concurrent');
const { read } = require('fs');

let recentStart = 0;
let recentEnd = 0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function createReadable() {
  let count = 0;
  let max = 160000;
  const stream = new Readable({
    objectMode: true,
    read() {
      if (count < max) {
        const obj = { pushIndex: count++ }
        console.log('=> start', obj);
        this.push(obj);
        recentStart = Math.max(obj.pushIndex, recentStart);
      } else {
        this.push(null);
      }
    }
  });
  return stream;
}

async function readFromSQS(id) {
  // .sqs.receiveMessage(params).promise();

  console.log(`SQS read id=${id}`)
  if (id > 40 && id < 60) {
    return null;
  }
  
  return {
    messageId: id,
    body: `hello ${id}`
  };
}

class SQSReadable extends Readable {

  constructor(options) {
    super(options);
    this.count = 0;
    this.max = 160000;
    this._suspended = false;
    this.start();
  }

  sqsResume() {
    console.log("resuming at", new Date());
    this._suspended = false;
  }

  sqsPause() {
    console.log("pausing at ", new Date());
    this._suspended = true;
  }

  start() {
    const loop = (delay = 1000) => {
      setTimeout(async () => {
        console.log('start loop at', new Date(), `current state _suspened=${this._suspended}`);
        if (!this._suspended && this.count < this.max) {
          const msg = await readFromSQS(this.count);
          const obj = { pushIndex: this.count++, sqsMsg: msg };
          recentStart = Math.max(obj.pushIndex, recentStart);
          if (msg) {
            console.log(`pushing obj=`, obj);
            if (!this.push(obj)) {
              console.log('!!!!!!!!!!!!!!!!!!! high water mark, pausing');
              this.sqsPause();
            } else {
              // immediately run next loop
              return loop(0);
            }
          } else {
            console.log("no message in sqs!!");
            return loop();
          }
        }
        return loop();
      }, delay);
    }

    // start infinite loop
    loop(0);
  }

  _read() {
    console.log(`###############_read is called, _suspended=${this._suspended}, at`, new Date());
    if (this._suspended) {
      this.sqsResume();
    }
  }
}

function createDummySQSReadable() {
  const stream = new SQSReadable({
    objectMode: true
  });
  return stream;
}


function throttler(tps = 10) {
  const rateLimiter = new RateLimiterMemory({
    points: tps,
    duration: 1
  });
  let count = 0;

  function process(self, data, encoding, done) {
    rateLimiter.consume("bucket-123", 1).then(() => {
      //console.log(`<=> transform..., is paused? ${self.isPaused()}`,);
      const pushed = self.push({ ...data, index: count++ });
      //console.log(`<=> transform..., continue? ${pushed}`,);
      done();
    }).catch((e) => {
      if (e.msBeforeNext) {
        setTimeout(() => {
          try {
            process(self, data, encoding, done);
          } catch (e) {
            done(e);
          }
        }, e.msBeforeNext)
      } else {
        done(e);
      }
    })
  }

  return new Transform({
    objectMode: true,
    transform(data, encoding, done) {
      process(this, data, encoding, done);
    }
  })
}

function parallelMap() { // backpressure holds
  return parallel.transform(function(data, enc, cb) {
    console.log('<=> parallelMap', 'writing...')
    setTimeout(() => {
      console.log('<=> parallelMap ', { ...data, writeAt: new Date() });
      cb(null, data);
    }, getRandomInt(3000, 5000));
  }, { objectMode: true, concurrency: 1000 });
}


function parallelMap2() {
  return through2Concurrent.obj(
    {maxConcurrency: 10},
    function (chunk, enc, callback) {
      var self = this;
      setTimeout(() => {
        self.push(chunk);
        callback();
      }, getRandomInt(3000, 5000));

  })
}

function asyncMap() { // this breaks backpressure
  return es.map(function (data, cb) {
    console.log('<=> asyncMap', 'writing...')
    setTimeout(() => {
      console.log('<=> asyncMap', data);
      cb(null, data);
    }, 100);
  });
}

function syncMap() {
  return new Writable({
    objectMode: true,
    write(data, _, done) {
      setTimeout(() => {
        console.log('<= end', {index: data.index, sqsMsg: data.sqsMsg });
        recentEnd = Math.max(data.index, recentEnd);
        console.log('< - *********** gap', recentEnd - recentStart);
        done()
      }, 20);
    }
  })
}

pipeline(
  //createReadable(),
  createDummySQSReadable(),
  throttler(1000),
  parallelMap2(),
  // asyncMap(), // breaks backpressure
  syncMap(),
  (err) => {
    if (err) {
      console.error('\nPipeline failed', err);
    } else {
      console.log('\nPipeline succeeded');
    }
  }
);
