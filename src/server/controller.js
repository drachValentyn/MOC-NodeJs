const querystring = require('querystring');
const path = require('path');
const fs = require('fs');
const { task1: filterArr, task2: maxPrice, task3 } = require('../task');
const { getArrayWithDiscCb, getArrayWithDiscPromise } = require('../utils/parseFiles');

const dataLocal = require('../../data.json');

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

const callback = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getArrayWithDiscCb(dataFlag || dataLocal, (body, err) => {
    if (err) throw new Error(err);
    res.end(JSON.stringify(body));
  });
};

const promise = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  getArrayWithDiscPromise(dataFlag || dataLocal)
    .then((body) => {
      res.end(JSON.stringify(body));
    })
    .catch((err) => console.error(err));
};

// eslint-disable-next-line consistent-return
async function asyncAwait(req, res) {
  try {
    const body = await getArrayWithDiscPromise(dataFlag || dataLocal);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(body));
  } catch (err) {
    console.error(err);
  }
}

const getFilesDir = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const dirPath = path.join('upload');
  let list = '';
  fs.readdir(dirPath, (err, files) => {
    if (err) console.error(`Unable to scan directory${err}`);

    files.forEach((file) => {
      list += `${file}\n`;
      console.log(file);
    });

    return res.end(list);
  });
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
  getFilesDir,
};
