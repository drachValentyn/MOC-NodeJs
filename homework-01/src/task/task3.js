const addFieldToArray = function (array) {
  return array.map((el) => {
    return {
      type: el.type,
      color: el.color,
      quantity: el.quantity || 0,
      price: el.price || el.priceForPair,
    };
  });
};

module.exports = addFieldToArray;
