const AWS = require('aws-sdk');
var XmlStream = require('xml-stream') ;

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const params = {
    Bucket: 'data-dev-incoming',
    Key: 'bigfile.xml', // big file
    ResponseContentEncoding: 'utf-16le'
};

const xmlOutput = require('fs').createWriteStream('./small-file.xml');
const jsonOutput = require('fs').createWriteStream('./small-file.json');
jsonOutput.write('[');

const s3Stream = s3.getObject(params).createReadStream().setEncoding('utf-16le');

s3Stream.pipe(xmlOutput);

var xml = new XmlStream(s3Stream);
xml.preserve('Transaction', true);
xml.collect('subitem');

let doDelimter = false;
xml.on('endElement: Transaction', function(item) {
    try {
        //console.log(JSON.stringify(item, null, 2));
        if (doDelimter) {
            jsonOutput.write('\n,');
        }
        jsonOutput.write(JSON.stringify(item.$, null, 2));
        doDelimter = true;
    } catch (e) {
        console.error(e);
    }
});

xml.on("end", function() {
    jsonOutput.write(']')
    jsonOutput.end();
    console.log("finished");
});
