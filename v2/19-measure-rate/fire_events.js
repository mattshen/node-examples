const { stat } = require('fs');
const { StreamUtils } = require('ne-utils');
const { Readable, Writable, pipeline } = require('stream');
const through2Concurrent = require('through2-concurrent');

var stats = require('measured-core').createCollection();

setInterval(function () {
    console.log(stats.toJSON());
}, 3000);

function createReadable() {
    let count = 0;
    let max = 1600000;
    const stream = new Readable({
        objectMode: true,
        read() {
            if (count < max) {
                const obj = { id: count++ }
                //console.log('=> start', obj);
                this.push(obj);
            } else {
                this.push(null);
            }
        }
    });
    return stream;
}

function parallelMap() {
    return through2Concurrent.obj(
        { maxConcurrency: 1000 },
        async function (chunk, enc, callback) {
            setTimeout(() => {
                stats.meter('requestsPerSecond').mark();
                // console.log(`in ${chunk.id}`);
                this.push(chunk);
                callback();
            }, 500);

        })
}


function endMap() {
    return new Writable({
        objectMode: true,
        write(data, _, done) {
            setTimeout(() => {
                //console.log('<= end', data.id);
                done()
            });
        }
    })
}

pipeline(
    createReadable(),
    StreamUtils.throttler(200),
    parallelMap(),
    endMap(),
    (err) => {
        if (err) {
            console.error('\nPipeline failed', err);
        } else {
            console.log('\nPipeline succeeded');
        }
        process.exit(0);
    }
);
