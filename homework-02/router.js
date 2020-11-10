const { home, comment } = require('./controller');

// eslint-disable-next-line consistent-return
module.exports = (request, response) => {
  const { url, method, queryParams, body: data } = request;

  if (method === 'GET' && url === '/') return home(response);
  if (method === 'POST' && url === '/comment') return comment(data, response, queryParams);
  // eslint-disable-next-line no-use-before-define
  notFound(response);
};

function notFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write('404');
  res.end();
}
