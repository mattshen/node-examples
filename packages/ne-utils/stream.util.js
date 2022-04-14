const { RateLimiterMemory } = require('rate-limiter-flexible');
const { Transform } = require('stream');

function throttler(tps = 10) {
  const rateLimiter = new RateLimiterMemory({
    points: tps,
    duration: 1
  });

  function process(self, data, encoding, done) {
    rateLimiter.consume("throttler#123", 1).then(() => {
      const pushed = self.push(data);
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

module.exports = {
  throttler
}