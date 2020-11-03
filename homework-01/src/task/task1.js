const arrExample = [
  {
    type: 'socks',
    color: 'red',
    quantity: 10,
    priceForPair: '$3',
  },
  {
    type: 'socks',
    color: 'green',
    quantity: 5,
    priceForPair: '$10',
  },
  {
    type: 'socks',
    color: 'blue',
    quantity: 8,
    priceForPair: '$6',
  },
  {
    type: 'hat',
    color: 'red',
    quantity: 7,
    price: '$5',
  },
  {
    type: 'hat',
    color: 'green',
    quantity: 0,
    price: '$6',
  },
  { type: 'socks', color: 'blue', priceForPair: '$6' },
  {
    type: 'socks',
    color: 'red',
    quantity: 10,
    priceForPair: '$3',
  },
  {
    type: 'socks',
    color: 'white',
    quantity: 3,
    priceForPair: '$4',
  },
  { type: 'socks', color: 'green', priceForPair: '$10' },
  {
    type: 'socks',
    color: 'blue',
    quantity: 2,
    priceForPair: '$6',
  },
  {
    type: 'hat',
    color: 'green',
    quantity: 3,
    price: '$5',
  },
  {
    type: 'hat',
    color: 'red',
    quantity: 1,
    price: '$6',
  },
  { type: 'socks', color: 'blue', priceForPair: '$6' },
];

const filterArray = function (arr = [], param = '', value = '') {
  const quantity = [];
  arr.forEach((item) => {
    Object.keys(item).forEach((e) => {
      if (e === param) {
        Object.values(item).forEach((el) => {
          if (el === value) {
            quantity.push(item);
          }
        });
      }
    });
  });

  return quantity;
};

module.exports = filterArray(arrExample, 'color', 'red');
