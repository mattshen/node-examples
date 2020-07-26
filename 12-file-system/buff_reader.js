var fs = require('fs'); 
  
fs.open('bigfile.txt', 'r', function (err, fd) { 
  if (err) {
    console.error(err);
    return;
  }
  const buffer = Buffer.alloc(4096);

  fs.read(fd, buffer, 0, 4096, null, (err, bytesRead, buff) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`bytesRead: ${bytesRead}`)
    console.log(buff.toString());
  });
}); 

