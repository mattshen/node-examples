const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express()

// app-level
app.use(bodyParser.text({
    type: function (req) {
        return 'text';
    }
}));

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
    res.send({ method: req.method, body: req.body, query: queryParams });
});

const server = app.listen(3002, (req, res) => {
    console.log('server running on port 3002')
});

server.keepAliveTimeout = 6000;

server.on('connection', function (socket) {
    socket.id = shortid.generate();
    //socket.setTimeout(500)
    console.log("A new connection was made by a client." + ` SOCKET ${socket.id}`);
    socket.on('end', function () {
        console.log(`SOCKET ${socket.id} END: other end of the socket sends a FIN packet`);
    });

    socket.on('timeout', function () {
        console.log(`SOCKET ${socket.id} TIMEOUT`);
    });

    socket.on('error', function (error) {
        console.log(`SOCKET ${socket.id} ERROR: ` + JSON.stringify(error));
    });

    socket.on('close', function (had_error) {
        console.log(`SOCKET ${socket.id} CLOSED. IT WAS ERROR: ` + had_error);
    });
});


