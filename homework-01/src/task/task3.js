const addFieldToArray = function (array) {
  const allFields = [];

  array.forEach((el) => {
    Object.keys(el).forEach((key) => {
      if (!allFields.includes(key)) {
        allFields.push(key);
      }
    });
  });

  allFields.forEach((val) => {
    array.forEach((el1) => {
      if (!(val in el1)) {
        el1[val] = 0;
      }
    });
  });

  return array;
};

module.exports = addFieldToArray;
