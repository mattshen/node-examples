const { RateLimiterMemory } = require('rate-limiter-flexible');

const sleep = (timeout) => new Promise((resolve) => {
    setTimeout(resolve, timeout);
});

const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 1
});



;(async function() {
  while(true) {
    try {
      const rateLimiterRes = await rateLimiter.consume("bucket-123", 1);
      console.log(new Date(), 'pass', rateLimiterRes);
    } catch (e) {
      console.log(new Date(), 'blocked', e);
      if (e.msBeforeNext) {
        await sleep(e.msBeforeNext);
      }
    }
    await sleep(100);
  }
}());
