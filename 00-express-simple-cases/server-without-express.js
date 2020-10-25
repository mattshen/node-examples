const http = require('http')

const hello = (request, response) => {
  console.log(request.url);
  response.end('hello\n');
}

const server = http.createServer(hello);

server.listen(8090, (err) => {
  if (err) {
    return console.error('something bad happened', err)
  }
});