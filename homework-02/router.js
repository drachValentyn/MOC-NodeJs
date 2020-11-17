const { getFilterArr, getMax, formatArr, createStore } = require('./src/controller');

// eslint-disable-next-line consistent-return
module.exports = (req, res) => {
  const { url, method } = req;
  if (method === 'GET' && url.match(/\/filter/)) return getFilterArr(req, res);
  if (method === 'GET' && url.match(/\/max-price/)) return getMax(req, res);
  if (method === 'GET' && url.match(/\/format/)) return formatArr(req, res);
  if (method === 'POST' && url.match(/\/addArray/)) return createStore(req, res);

  // eslint-disable-next-line no-use-before-define
  notFound(res);
};

const notFound = (res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write('404');
  res.end();
};
