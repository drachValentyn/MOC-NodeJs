const { parse: parseQuery } = require('querystring');
const { URL } = require('url');
const { handleRoutes, handleStreamRoutes } = require('./router');

module.exports = async (request, response) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { url, method } = request;
    const parsedUrl = new URL(url, process.env.ORIGIN);
    const queryParams = parseQuery(parsedUrl.search.substr(1));
    let body = [];

    if (request.headers['content-type'] === 'text/csv') {
      handleStreamRoutes(request, response).catch((err) =>
        console.error('CSV handler failed', err),
      );
      return;
    }

    if (request.headers['content-type'] === 'application/json') {
      handleStreamRoutes(request, response).catch((err) =>
        console.error('CSV handler failed', err),
      );
      return;
    }

    request
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        handleRoutes(
          {
            ...request,
            body: body ? JSON.parse(body) : {},
            url,
            queryParams,
          },
          response,
        );
      });
  } catch (error) {
    console.log(error);
  }
};
