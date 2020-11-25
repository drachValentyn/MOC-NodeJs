const {
  getFilterArr,
  getMax,
  formatArr,
  createStore,
  changeSource,
  callback,
  promise,
  asyncAwait,
  getFilesDir,
} = require('./controller');

const { uploadCsv } = require('./parseCsv');
const { optimizeJson } = require('../utils/optimizeJson');

function handleRoutes(req, res) {
  const { url, method, queryParams, body: data } = req;
  if (method === 'GET' && url.match(/\/filter/)) return getFilterArr(req, res);
  if (method === 'GET' && url.match(/\/max-price/)) return getMax(req, res);
  if (method === 'GET' && url.match(/\/format/)) return formatArr(req, res);
  if (method === 'POST' && url.match(/\/addArray/)) return createStore(req, res);
  if (method === 'POST' && url.match(/\/source/)) return changeSource(req, res);

  if (method === 'GET' && url.match(/\/callback/)) return callback(req, res);
  if (method === 'GET' && url.match(/\/promise/)) return promise(req, res);
  if (method === 'GET' && url.match(/\/async-await/)) return asyncAwait(req, res);

  if (method === 'GET' && url.match(/\/upload/)) return getFilesDir(req, res);

  if (method === 'POST' && url.match(/\/optimize-json/)) return changeSource(req, res);

  // eslint-disable-next-line no-use-before-define
  notFound(res);
}

async function handleStreamRoutes(req, res) {
  const { url, method } = req;

  if (method === 'PUT' && url.match(/\/store\/csv/)) {
    try {
      await uploadCsv(req);
    } catch (err) {
      console.error('Failed to upload CSV', err);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      res.end(JSON.stringify({ status: 'error' }));
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ status: 'ok' }));
  }

  // eslint-disable-next-line no-use-before-define
  notFound(res);
}

module.exports = { handleRoutes, handleStreamRoutes };

const notFound = (res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write('404');
  res.end();
};
