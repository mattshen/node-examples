const bunyan = require("bunyan");
const splunkBunyan = require("splunk-bunyan-logger");

const config = require('./config');

const splunkStream = splunkBunyan.createStream({
    token: config.SPLUNK_TOKEN,
    url: config.SPLUNK_URL,
    port: '443',
    //batchInterval: 1000,
    //maxBatchCount: 10,
    //maxBatchSize: 1024 // 1kb
});

splunkStream.on("error", function(err, context) {
  // Handle errors here
  console.log("Error", err, "Context", context);
});

// Note: splunkStream must be set to an element in the streams array
const Logger = bunyan.createLogger({
  name: "loggerAbc",
  streams: [
      splunkStream
  ],
  serializers: {
    err: bunyan.stdSerializers.err
  }
});


// Define the payload to send to Splunk's Event Collector
var payload = {
  // Our important fields
  temperature: "70F",
  chickenCount: 500,
  caller: "test-splunk-caller",

  // Special keys to specify metadata for Splunk's Event Collector
  source: "chicken coop",
  sourcetype: "httpevent",
  index: config.SPLUNK_INDEX,
  host: "farm.local"
};

// Send the payload
console.log("Queuing payload", payload);
Logger.info(payload, "Chicken coup looks stable.");

var payload2 = {
  // Our important fields
  temperature: "75F",
  chickenCount: 600,
  caller: "test-splunk-caller",
  err: new Error('sys err'),

  // Special keys to specify metadata for Splunk's Event Collector
  source: "chicken coop",
  sourcetype: "httpevent",
  index: config.SPLUNK_INDEX,
  host: "farm.local"
};

// Send the payload
console.log("Queuing second payload", payload2);
Logger.error(payload2, "New chickens have arrived %s, %s", "at helloworld", {v1: 123});

// Kill the process
setTimeout(function() {
  console.log("Events should be in Splunk! Exiting...");
  process.exit();
}, 2000);
