const { Transform } = require('stream');

function optimizeJson() {
  const transform = (chunk, encoding, cb) => {};

  const flush = (cb) => {
    cb(null, ']');
  };
  return new Transform({ transform, flush });
}

module.exports = { optimizeJson };
