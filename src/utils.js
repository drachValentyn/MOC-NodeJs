const getRandom = () => {
  return Math.floor(Math.random() * 99) + 1;
};

const randomDiscountCb = (cb) => {
  setTimeout(() => {
    let discount = getRandom();
    if (discount > 20) {
      return cb(new Error(`number too big ${discount}`));
    }
    return cb(null, discount);
  }, 50);
};

function randomDiscountPr() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const discount = getRandom();
      if (discount <= 20) res(discount);
      else rej(new Error(`number too big ${discount}`));
    }, 50);
  });
}

async function randomDiscountAsAw() {
  try {
    const rand = await randomDiscountPr();
    console.log(rand);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { randomDiscountCb, randomDiscountPr, randomDiscountAsAw };
