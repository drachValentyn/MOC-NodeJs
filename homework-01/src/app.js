const data = require('../homework.json');
const { task1: renameTask1, task2: renameTask2, task3 } = require('./task');

const boot = function (arr = [], param = '', value = '') {
  const task1Result = renameTask1(arr, param, value);
  console.log(task1Result);

  const task3Result = task3(task1Result);
  console.log(task3Result);

  console.log(renameTask2);
};

boot(data, 'type', 'socks');
