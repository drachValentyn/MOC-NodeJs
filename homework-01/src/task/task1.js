const filterArray = function (arr = [], param = '', value = '') {
  return arr.filter((el) => {
    return Object.keys(el).includes(param) && Object.values(el).includes(value);
  });
};

module.exports = filterArray;
