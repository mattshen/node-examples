const rp = require('request-promise');

const { wrapRequest } = require('zipkin-instrumentation-request-promise');
const tracer = require('./zipkin').tracer;
const request = wrapRequest(tracer, "app-2");

async function getAddress() {
  return await request('http://localhost:3002/address');
}

module.exports = {
  getAddress
};
