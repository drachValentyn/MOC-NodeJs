// eslint-disable-next-line no-extend-native
// Array.prototype.myMap = function (callback) {
//   const arr = [];
//   for (let i = 0; i < this.length; i++) arr.push(callback(this[i], i, this));
//   return arr;
// };

const getRandom = () => {
  return Math.floor(Math.random() * 99) + 1;
};

// const randomDiscount = (cb) => {
//   setTimeout(() => {
//     const discount = getRandom();
//     if (discount >= 20 && discount !== 0) return cb(new Error(`number too big ${discount}`));
//     return cb(null, discount);
//   }, 50);
// };

function randomDiscount() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const discount = getRandom();
      if (discount <= 20) res(discount);
      else rej(new Error(`number too big ${discount}`));
    }, 50);
  });
}

randomDiscount()
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err.message);
  });

async function boot() {
  try {
    const rand = await randomDiscount();
    console.log(rand);
  } catch (error) {
    console.log(error.message);
  }
}

boot();
