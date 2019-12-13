const express = require('express');
const body = require('body-parser');
const AWSXRay = require('aws-xray-sdk');
const http = require('http');

AWSXRay.config([AWSXRay.plugins.ECSPlugin]);
AWSXRay.captureHTTPsGlobal(http, true);

const pg = AWSXRay.capturePostgres(require('pg'));

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test1',
    password: '',
    port: 5432,
});

const app = express();
app.use(AWSXRay.express.openSegment('testing'));

const LoggerMiddleware = (req, res, next) => {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    next();
};

app.use(LoggerMiddleware);

app.get('/users', (req, res) => {
    res.json([{
        name: "John Smith"
    }, {
        name: "Matt Smith"
    }])
});

app.get('/persons', (req, res) => {

    pool.connect((err, client, done) => {
        if (err) {
            res.json(err);
        }
        client.query('select * from person', [], (err, result) => {
            done();
            if (err) return res.json(err);
            return res.json(result); // Hello World!
        })
    });


});


app.use(AWSXRay.express.closeSegment());
app.listen(3000, (req, res) => {
    console.log('server running on port 3000');
});
