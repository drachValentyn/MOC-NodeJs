function home(response) {
  response.write('Home');
  response.end();
}

// eslint-disable-next-line no-unused-vars
function comment(data, response, queryParams) {
  response.write(JSON.stringify(data));
  response.end();
}

module.exports = {
  home,
  comment,
};
