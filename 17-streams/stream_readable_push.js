const Stream = require('stream')

const readableStream = new Stream.Readable({
  read() {}
})

readableStream.pipe(process.stdout);

readableStream.push('ping!\n')
readableStream.push('pong!\n')
