var XmlStream = require('xml-stream') ;

const is = require('fs').createReadStream('export-02-12T134944.xml'); //.setEncoding('utf-8');;
const jsonOutput = require('fs').createWriteStream('./small-file.json');

var xml = new XmlStream(is);
xml.preserve('HH', true);
xml.collect('TA');
xml.collect('TSA');
xml.collect('TX');
xml.collect('TXS');


let doDelimter = false;
xml.on('endElement: HouseHold', function(item) {
    try {
        console.log(item);
    } catch (e) {
        console.error(e);
    }
});

xml.on("end", function() {
    console.log("finished");
});
