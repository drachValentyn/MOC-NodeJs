const fs = require('fs');
const { task1: renameTask1, task2: renameTask2, task3 } = require('./task');

const data = fs.readFileSync('homework.json', 'utf8');
const words = JSON.parse(data);

const boot = function (arr = [], param = '', value = '') {
  const task1Result = renameTask1(arr, param, value);
  console.log(task1Result);

  const task3Result = task3(task1Result);
  console.log(task3Result);

  const task2Result = renameTask2(task3Result);
  console.log(task2Result);
};

boot(words, 'type', 'socks');
