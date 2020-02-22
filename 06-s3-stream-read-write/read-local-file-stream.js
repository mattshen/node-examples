var XmlStream = require('xml-stream') ;

const is = require('fs').createReadStream('LoyaltyMembersGenericExport_2020-02-12T134944.xml'); //.setEncoding('utf-8');;
const jsonOutput = require('fs').createWriteStream('./small-file.json');

var xml = new XmlStream(is);
xml.preserve('HouseHold', true);
xml.collect('TranAccountActivity');
xml.collect('TranAccountsActivity');
xml.collect('Transaction');
xml.collect('Transactions');


let doDelimter = false;
xml.on('endElement: HouseHold', function(item) {
    try {
        console.log(item);
    } catch (e) {
        console.error(e);
    }
});

xml.on("end", function() {
    //jsonOutput.write(']')
    //jsonOutput.end();
    console.log("finished");
});
