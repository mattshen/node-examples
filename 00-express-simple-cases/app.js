const express = require('express');
const bodyParser = require('body-parser');

/**
 * Show cases for different types of middleware:
 * 1. Application-level
 * 2. Router-level middleware
 * 3. Error-handling middleware
 * 4. Built-in middleware
 * 5. Third-party middleware
 */

// custom middleware create
const LoggerMiddleware = (req, res, next) => {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    next();
}

const app = express()

// app-level
app.use(LoggerMiddleware);
app.use(bodyParser.text({
    type: function (req) {
        return 'text';
    }
}));

// app-level
app.get('/users', (req, res) => {
    res.json([{
        name: "John Smith"
    }, {
        name: "Matt Smith"
    }])
})

// save route
app.post('/save', (req, res) => {
    res.json({
        'status': true
    })
})

// save route
app.get('/timeout', (req, res) => {
    /*setTimeout(() => {
        res.json({
            'status': true
        });
    }, 360000);*/

    res.status(504).send("server timeout");
});

// router level
const posts = express.Router();
posts.use('/:id', function (req, res, next) {
    console.log(`Request URL: ${req.originalUrl}`);
});

app.use('/posts', posts);

app.use('/echo', function (req, res) {
    console.log(req.body);
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

app.listen(3002, (req, res) => {
    console.log('server running on port 3002')
});


