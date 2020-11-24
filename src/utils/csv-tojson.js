const { timeEnd } = require('console');
const { Transform } = require('stream');

function objToString(obj) {
  let str = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const p in obj) {
    if (p in obj) {
      str += `${p}::${obj[p]}\n`;
    }
  }
  return str;
}

function createCsvToJson() {
  const file = '';
  const first = true;
  const transform = (chunk, encoding, cb) => {
    const csv = chunk.toString();
    const lines = csv.split('\n');

    const result = [];

    const headers = lines[0].split(',');
    console.time('start');
    for (let i = 1; i < lines.length - 1; i++) {
      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 1; j < headers.length; j++) {
        obj[`${headers[j]}`] = currentline[j];
      }

      result.push(obj);
    }
    console.timeEnd('start');
    
    console.log(JSON.stringify(result));
    // cb(null, result);.join(',')
    // return result; //JavaScript object
    // return JSON.stringify(result); // JSON

    // if (first) {
    //   file = `{${chunk.toString()}`;
    //   cb(null, file);
    // }
  };

  const flush = (cb) => {
    cb(null, '');
  };

  return new Transform({ transform, flush });
}

module.exports = { createCsvToJson };
