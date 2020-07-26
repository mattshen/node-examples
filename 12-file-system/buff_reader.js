const fs = require('fs'); 
const util = require('util');

const read = util.promisify(fs.read);
const open = util.promisify(fs.open);

async function read_file_content(filename) {
  const fd = await open(filename, 'r');
  const buffSize = 128;
  const buffer = Buffer.alloc(buffSize);
  let bytesRead = -1;
  while (bytesRead < 0 || bytesRead === 128) {
    const result = await read(fd, buffer, 0, buffSize, null);
    bytesRead = result.bytesRead;
    //console.log(bytesRead);
    process.stdout.write(result.buffer.slice(0, bytesRead).toString());
  }
}

read_file_content('bigfile.txt').catch(console.error);
