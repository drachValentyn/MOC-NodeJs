// eslint-disable-next-line no-extend-native
Array.prototype.myMap = function (cb) {
  const arr = [];
  for (let i = 0; i < this.length; i++) arr.push(cb(this[i], i, this));
  return arr;
};

const serailizeArr = function (arr, outputArray) {
  const result = outputArray;
  arr.forEach((item) => {
    const elIndex = result.findIndex(
      (el) => el.type === item.type && el.color === item.color && el.price === item.price,
    );
    if (elIndex >= 0) {
      result[elIndex].quantity += +item.quantity;
    } else {
      result.push({ ...item, quantity: +item.quantity });
    }
  });
  return result;
};

module.exports = {
  map: Array.prototype.myMap,
  serailizeArr,
};
