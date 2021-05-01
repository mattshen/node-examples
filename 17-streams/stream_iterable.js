const { Readable } = require('stream');

function* makeRangeIterator(start = 0, end = 100, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
      iterationCount++;
      yield `${i}\n`;
  }
  return iterationCount;
}

const readable = Readable.from(makeRangeIterator(0, 10));


readable.pipe(process.stdout);
