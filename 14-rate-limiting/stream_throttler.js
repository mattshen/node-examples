const { RateLimiterMemory } = require('rate-limiter-flexible');
const { Readable, Writable, Transform, pipeline } = require('stream');

function createReadable() {
  let count = 0;
  const stream = new Readable({
    objectMode: true,
    read() {
      this.push({ pushIndex: count++ });
    }
  });
  return stream;
}

function throtter(tps = 10) {
  const rateLimiter = new RateLimiterMemory({
    points: tps,
    duration: 1
  });
  let count = 0;

  function process(self, data, encoding, done) {
    rateLimiter.consume("bucket-123", 1).then(() => {
      done(null, { ...data, time: new Date(), index: count++ });
    }).catch((e) => {
      self.pause();
      if (e.msBeforeNext) {
        setTimeout(() => {
          try {
            self.resume();
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

function render() {
  return new Writable({
    objectMode: true,
    write(data, _, done) {
      console.log('<-', data);
      done();
    }
  })
}

pipeline(
  createReadable(),
  throtter(1),
  render(),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
