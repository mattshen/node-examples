const fs = require("fs");
const stream = fs.createReadStream("./bigfile.txt");

stream.on("data", function(data) {
    var chunk = data.toString();
    console.log(chunk);
}); 