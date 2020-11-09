const biggestPrice = function (array) {
  return array.reduce((prev, curr) => {
    return +prev.price.slice(1) * prev.quantity > +curr.price.slice(1) * curr.quantity
      ? prev
      : curr;
  });
};

module.exports = biggestPrice;
