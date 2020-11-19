// eslint-disable-next-line no-extend-native
Array.prototype.myMap = function (callback) {
  const arr = [];
  for (let i = 0; i < this.length; i++) arr.push(callback(this[i], i, this));
  return arr;
};
