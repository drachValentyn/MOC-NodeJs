const http = require('http');
const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);

function start() {
  const port = process.env.PORT;
  const host = process.env.HOST;

  server.listen(port, host, () => {
    console.log(
      `server is listening on: [${server.address().address}]:${server.address().port} (${
        process.env.NODE_ENV
      })`,
    );
    // throw new Error('error');
  });
}

function stop(cb) {
  server.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      cb();
      return;
    }
    console.log('Server has been stopped.');
    cb();
  });
}

module.exports = { start, stop };
