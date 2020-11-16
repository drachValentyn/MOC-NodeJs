const querystring = require('querystring');
const fs = require('fs');
const { task1: filterArr, task2: maxPrice, task3 } = require('./task');

const data = global.store;

const getFilterArr = (req, res) => {
  const { param, val } = querystring.parse(req.url.split('?').slice(1).join(''));
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(filterArr(data, param, val)));
};

const getMax = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(maxPrice(data)));
};

const formatArr = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(task3(data)));
};

const createStore = (req, res) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    body = Buffer.concat(body).toString();
  });
  global.store = JSON.parse(body);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(data));
};

module.exports = {
  getFilterArr,
  getMax,
  formatArr,
  createStore,
};
