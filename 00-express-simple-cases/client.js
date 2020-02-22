
const rp = require('request-promise');

rp({
    url: 'http://localhost:3002/timeout',
    timeout: 3000
}).then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.error("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.error(err);
    });
