const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
dotenv.config();

const app = express();

const LoggerMiddleware = (req, res, next) => {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    next();
}

const tracer = require('./zipkin').tracer;
app.use(zipkinMiddleware({ tracer }));

app.use(LoggerMiddleware);
app.use(bodyParser.text({
  type: function(req) {
    return 'text';
  }
}));

// app-level
app.get('/address', (req, res) => {
    //console.log(req.headers);
    res.json({
        address: "1 Woolworth close"
    });
});

app.listen(3002, (req, res) => {
    console.log('server running on port 3002')
});

