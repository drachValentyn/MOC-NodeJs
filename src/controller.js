const querystring = require('querystring');
const { ifError } = require('assert');
const { task1: filterArr, task2: maxPrice, task3 } = require('./task');
const { randomDiscountCb, randomDiscountPr, randomDiscountAsAw } = require('./utils');

const dataLocal = require('../data.json');

let dataStore = null;

let dataFlag = null;

const getFilterArr = (req, res) => {
  const { param, val } = querystring.parse(req.url.split('?').slice(1).join(''));
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(filterArr(dataFlag || dataLocal, param, Number(val) || val)));
};

const getMax = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(maxPrice(dataFlag || dataLocal)));
};

const formatArr = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(task3(dataFlag || dataLocal)));
};

const createStore = (req, res) => {
  const { body } = req;
  global.store = JSON.stringify(body);
  dataStore = JSON.parse(global.store);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(body));
};

const changeSource = (req, res) => {
  const { type } = querystring.parse(req.url.split('?').slice(1).join(''));
  res.setHeader('Content-Type', 'application/json');

  if (type === 'json') {
    dataFlag = dataLocal;
  } else if (type === 'store') {
    dataFlag = dataStore;
  }

  return res.end(JSON.stringify(type));
};

// eslint-disable-next-line no-extend-native
Array.prototype.myMap = function (cb) {
  const arr = [];
  for (let i = 0; i < this.length; i++) arr.push(cb(this[i], i, this));
  return arr;
};

const callback = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const data = dataFlag || dataLocal;
  data.myMap((item) => {
    randomDiscountCb((err, number) => {
      if (err) {
        console.log(err.message);
      }
      // if (!(number > 20)) {
      console.log(number);
      // }
    });
    // item.discount = randomDiscountCb((err, number) => {
    //   if (err) console.log(err);
    //   else {
    //     console.log(number);
    //   }
    // });
  });

  res.end(JSON.stringify(data));
};

const promise = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(maxPrice(dataFlag || dataLocal)));
};

const asyncAwait = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(maxPrice(dataFlag || dataLocal)));
};

module.exports = {
  getFilterArr,
  getMax,
  formatArr,
  createStore,
  changeSource,
  callback,
  promise,
  asyncAwait,
};
