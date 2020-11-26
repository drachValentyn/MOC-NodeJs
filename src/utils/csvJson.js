const { Transform } = require('stream');

function createCsvToJson() {
  let first = true;
  let firstHeader = true;
  let resultStr = '[';
  let lines = [];
  let headers = [];

  const transform = (chunk, encoding, cb) => {
    const csv = chunk.toString();
    lines = csv.split('\n');
    if (firstHeader) {
      headers = lines[0].split(',');
      firstHeader = false;
    } else {
      resultStr = '';
    }

    for (let i = 1; i < lines.length - 1; i++) {
      let str = '';
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length - 1; j++) {
        if (headers[j] === 'price') {
          str += ` "unitPrice": "${currentline[j]}$",`;
        } else {
          str += ` "${headers[j]}": "${currentline[j]}",`;
        }

        if (j === headers.length - 2) str = str.slice(0, -1);
      }

      resultStr += `, {${str}}`;
    }

    if (first) {
      resultStr = resultStr.slice(0, 1) + resultStr.slice(2);
      first = false;
    }

    cb(null, resultStr);
  };

  const flush = (cb) => {
    cb(null, ']');
  };
  return new Transform({ transform, flush });
}

function optimizeJson() {
  const transform = (chunk, encoding, cb) => {
    const jsonArr = JSON.parse(chunk.toString());

    const res = jsonArr.reduce((acc, currentValue) => {
      const { type } = currentValue;
      // const accT = acc.type;
      const { color } = currentValue;
      const quantity = +currentValue.quantity;
      acc[type] = (acc[type] || 0) + quantity;
      acc[color] = (acc[color] || 0) + quantity;

      return acc;
    }, []);
    // obj[prop] === currentValue[prop])
    console.log(res);

    cb(null, '');
  };

  const flush = (cb) => {
    cb(null, '');
  };
  return new Transform({ transform, flush });
}

module.exports = { createCsvToJson, optimizeJson };
