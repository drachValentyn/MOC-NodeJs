// eslint-disable-next-line no-extend-native
Array.prototype.myMap = function (cb) {
  const arr = [];
  for (let i = 0; i < this.length; i++) arr.push(cb(this[i], i, this));
  return arr;
};

module.exports = Array.prototype.myMap;
