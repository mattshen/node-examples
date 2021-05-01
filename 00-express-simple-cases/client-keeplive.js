const http = require('http');
const https = require('https');
const axios = require('axios');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const httpAgent = new http.Agent({ keepAlive: true });

const axiosInstance = axios.create({
    //60 sec timeout
    timeout: 60000,

    //keepAlive pools and reuses TCP connections, so it's faster
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),

    //follow up to 10 HTTP 3xx redirects
    maxRedirects: 10,


    //cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000
});

async function main() {

    // on the request
    axiosInstance.get('http://localhost:3002/echo') // httpAgent: httpAgent -> for non es6 syntax
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    await sleep(7000);

    axiosInstance.get('http://localhost:3002/echo') // httpAgent: httpAgent -> for non es6 syntax
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

}

main().catch(e => console.error(e));
