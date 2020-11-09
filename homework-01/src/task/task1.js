const filterArray = function (arr = [], param = '', value = '') {
  return arr.filter((el) => param in el && el[param] === value);
};

module.exports = filterArray;
