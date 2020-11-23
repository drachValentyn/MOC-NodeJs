require('./helpers');

const getRandom = () => {
  return Math.floor(Math.random() * 99) + 1;
};

const randomDiscountCb = (cb) => {
  setTimeout(() => {
    let discount = getRandom();
    while (discount > 20) discount = getRandom();
    if (discount > 20) {
      throw cb(new Error(`number too big ${discount}`));
    }
    cb(discount);
  }, 50);
};

const getTypeProduct = (item) => {
  let discount = 1;
  if (item.type === 'hat') discount++;
  if (item.type === 'hat' && item.color === 'red') discount++;
  return discount;
};

const formatDataDiscount = (el, discount) => {
  return {
    type: el.type,
    color: el.color,
    quantity: el.quantity || 0,
    price: el.price || el.priceForPair,
    discount: `${discount}%`,
  };
};

const getDiscountCb = (type = 1, cb) => {
  let count = 1;
  for (let i = 0; i < type; i++) {
    // eslint-disable-next-line no-loop-func
    randomDiscountCb((number) => {
      count *= Math.fround((1 - number / 100) * 100) / 100;
      if (i === type - 1) {
        count = Math.floor((1 - count) * 100);
        cb(count);
      }
    });
  }
};

const getDiscountPromise = (type = 1) => {
  return new Promise((res, rej) => {
    let count = 1;
    for (let i = 0; i < type; i++) {
      // eslint-disable-next-line no-loop-func
      randomDiscountCb((number) => {
        count *= Math.fround((1 - number / 100) * 100) / 100;
        if (i === type - 1) {
          count = Math.floor((1 - count) * 100);
          res(count);
        }
      });
    }
  });
};

const getArrayWithDiscCb = (data, callback) => {
  const newData = [];
  data.myMap((prod) => {
    getDiscountCb(getTypeProduct(prod), (discount) => {
      // eslint-disable-next-line no-param-reassign
      prod = formatDataDiscount(prod, discount);
      newData.push(prod);
      if (newData.length === data.length) {
        callback(newData);
      }
    });
  });
};

const getArrayWithDiscPromise = (data) => {
  const newData = [];
  return new Promise((res) => {
    data.myMap((prod) => {
      const discountType = getTypeProduct(prod);
      getDiscountPromise(discountType).then((discount) => {
        // eslint-disable-next-line no-param-reassign
        prod = formatDataDiscount(prod, discount);
        newData.push(prod);
        if (newData.length === data.length) {
          res(newData);
        }
      });
    });
  });
};

module.exports = {
  getTypeProduct,
  formatDataDiscount,
  getArrayWithDiscCb,
  getArrayWithDiscPromise,
};
