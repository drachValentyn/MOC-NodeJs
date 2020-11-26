const { createGunzip } = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const fs = require('fs');
const { nanoid } = require('nanoid');

const promisifiedPipeline = promisify(pipeline);

const { createCsvToJson, optimizeJson } = require('../utils/csvJson');

async function uploadCsv(inputStream) {
  const gunzip = createGunzip();

  const id = nanoid();
  const filePath = `./upload/${id}.json`;
  const csvToJson = createCsvToJson();
  const outputStream = fs.createWriteStream(filePath);

  try {
    await promisifiedPipeline(inputStream, gunzip, csvToJson, outputStream);
  } catch (error) {
    console.error('Failed to upload CSV', error);
  }
}

async function parseJson(inputStream) {
  const id = nanoid(10);
  const filePath = `./upload-json/optim-${id}.json`;
  const json = optimizeJson();
  // const outputStream = fs.createWriteStream(filePath);

  try {
    await promisifiedPipeline(inputStream, json);
  } catch (error) {
    console.error('Failed to upload CSV', error);
  }
}

module.exports = {
  uploadCsv,
  parseJson,
};
