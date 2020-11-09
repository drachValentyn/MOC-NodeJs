// eslint-disable-next-line no-unused-vars
const data = require('../../homework.json');

const getMaxValue = function (obj) {
  const price = +(obj.price || obj.priceForPair).slice(1);
  const quantity = obj.quantity || 0;
  return price * quantity;
};

const biggestPrice = function (array) {
  return array.reduce((prev, curr) => {
    return getMaxValue(prev) > getMaxValue(curr) ? prev : curr;
  });
};

module.exports = biggestPrice(data);
