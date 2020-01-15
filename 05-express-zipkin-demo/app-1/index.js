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
  type: function (req) {
    return 'text';
  }
}));

const getAddress = require('./appClient').getAddress;
// app-level
app.get('/remote/users', async (req, res) => {
  const addressObj = JSON.parse(await getAddress());
  console.log('address', addressObj, addressObj.address);
  res.json([{
    name: "John Smith",
    address: addressObj.address
  }, {
    name: "Matt Smith",
    address: addressObj.address
  }])
});

app.get('/local/users', async (req, res) => {
  res.json([{
    name: "John Smith",
    address: "1 Woolworths Rd"
  }, {
    name: "Matt Smith",
    address: "1 Woolworths Rd"
  }])
});

app.listen(3001, (req, res) => {
  console.log('server running on port 3001')
});
