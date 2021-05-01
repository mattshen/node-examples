const csv = require('csv-parser')
const fs = require('fs')
const es = require('event-stream')
const results = [];

fs.createReadStream('./hw_big.csv')
  .pipe(csv())
  .pipe(es.through(function write(data) {
    this.pause();
    setTimeout(() => {
      this.emit('data', data);
      this.resume();
    }, 10);
  }))
  .pipe(es.map(function (data, cb) { //turn this async function into a stream
    cb(null, JSON.stringify(data) + '\n');
  }))
  .pipe(process.stdout);



