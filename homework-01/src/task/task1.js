const filterArray = function (arr = [], param = '', value = '') {
  const quantity = [];
  arr.forEach((item) => {
    Object.keys(item).forEach((e) => {
      if (e === param) {
        Object.values(item).forEach((el) => {
          if (el === value) {
            quantity.push(item);
          }
        });
      }
    });
  });

  return quantity;
};

module.exports = filterArray;
