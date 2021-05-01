const { Readable, Writable, Transform } = require('stream');
const es = require('event-stream')

function createReadable() {
  let count = 0;
  const stream = new Readable({
    objectMode: true,
    read() {
      this.push({ time: new Date(), pushIndex: count++ });
      console.log('Loaded data into buffer');
    }
  });
  return stream;
}

function xformer() {
  let count = 0;

  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      done(null, { ...data, index: count++ });
    }
  });
}

function throtter() {
  let count = 0;

  return new Transform({
    objectMode: true,
    transform(data, _, done) {
      console.log('throttling...')
      this.pause();
      setTimeout(() => {
        this.resume();
        done(null, { ...data, index: count++ });
      }, 500);
    }
  });
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

createReadable()
  .pipe(xformer())
  .pipe(throtter())
  .pipe(render());
