const fs = require("fs");
const stream = fs.createWriteStream("tmp.txt", { flags:'a' });

stream.write("Tutorial on Node.js")
stream.write("Introduction")
stream.write("Events")
stream.write("Generators")
stream.write("Data Connectivity")
stream.write("Using Jasmine") 