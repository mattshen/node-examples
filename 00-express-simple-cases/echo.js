const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.text({
    type: function (req) {
        return 'text';
    }
}));

app.use('/echo', function (req, res) {
  console.log(req.body);
  console.log(JSON.stringify(req.headers))
  res = res.status(200);
  if (req.get('Content-Type')) {
      console.log("Content-Type: " + req.get('Content-Type'));
      res = res.type(req.get('Content-Type'));
  }
  let queryParams = {};
  for (let propName in req.query) {
      if (req.query.hasOwnProperty(propName)) {
          queryParams[propName] = req.query[propName];
      }
  }
  res.send({method: req.method, body: req.body, query: queryParams});
});

app.listen(3000, (req, res) => {
  console.log('server running on port 3000')
});
