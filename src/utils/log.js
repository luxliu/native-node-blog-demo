const fs = require('fs');
const path = require('path');

const createWriteStream = (fileName) => {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a',
  });
  return writeStream;
};

const accessWriteStream = createWriteStream('access.log');

const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n');
};

const access = (log) => {
  writeLog(accessWriteStream, log);
};

module.exports = {
  access,
};
