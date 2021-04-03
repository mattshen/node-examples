// Require the framework and instantiate it
const shortid = require('shortid');
const fastify = require('fastify')({ logger: true, keepAliveTimeout: 30000 })

// Declare a route
fastify.get('/echo', async (request, reply) => {
    console.log('/echo is accessed');
    return { hello: 'world' }
})

// Run the server!
const server = fastify.server;
const start = async () => {
    try {
         await fastify.listen(3002)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();

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
