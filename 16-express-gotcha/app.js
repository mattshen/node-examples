const express = require('express');
const app = express()

// save route
app.get('/timeout', (req, res) => {
  setTimeout(() => {
    console.log(req.headers);
    res.json({
      'status': true
    });
    console.log(`crn was ${req.headers.crn} set it to '9999'`)
    req.headers.crn = '9999';
  }, req.headers.delay | 0);
});

app.listen(3002, (req, res) => {
  console.log('server running on port 3002')
});
