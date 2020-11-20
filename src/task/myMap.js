// eslint-disable-next-line no-extend-native
// Array.prototype.myMap = function (callback) {
//   const arr = [];
//   for (let i = 0; i < this.length; i++) arr.push(callback(this[i], i, this));
//   return arr;
// };
const getRandom = () => {
  return Math.floor(Math.random() * 100);
};
const randomDiscount = (cb) => {
  setTimeout(() => {
    const discount = getRandom();
    if (discount >= 20 && discount !== 0) return cb(new Error(`number too big ${discount}`));
    return cb(null, discount);
  }, 50);
};

randomDiscount((err, number) => {
  if (err) console.log(err);
  console.log(number);
});
