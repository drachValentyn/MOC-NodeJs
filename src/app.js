require('dotenv').config();
const http = require('http');
const requestHandler = require('./requestHandler');

const port = process.env.PORT;

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
