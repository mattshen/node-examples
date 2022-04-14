var http = require('http');
var stats = require('measured-core').createCollection();

http.createServer(function (req, res) {
    stats.meter('requestsPerSecond').mark();
    res.end('Thanks');
}).listen(3000);


setInterval(function () {
    console.log(stats.toJSON());
}, 3000);