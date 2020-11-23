const getRandom = () => {
  return Math.floor(Math.random() * 99) + 1;
};

const getTypeProduct = (item) => {
  let discountType = 1;
  if (item.type === 'hat') discountType++;
  if (item.type === 'hat' && item.color === 'red') discountType++;
  return discountType;
};

const formatDataDiscount = (item, discount) => {
  return {
    type: item.type,
    color: item.color,
    quantity: item.quantity || 0,
    price: item.price || item.priceForPair,
    discount: `${discount}%`,
  };
};

const randomDiscountCb = function (cb) {
  setTimeout(() => {
    let discount = getRandom();
    while (discount > 20) discount = getRandom();
    if (discount > 20) {
      throw cb(new Error(`number too big ${discount}`));
    }
    cb(discount);
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

module.exports = {
  getTypeProduct,
  formatDataDiscount,
  randomDiscountCb,
  randomDiscountPr,
  randomDiscountAsAw,
};
