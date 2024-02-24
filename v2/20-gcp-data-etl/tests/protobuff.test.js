const protobuf = require('protobufjs');

test("simple encode & decode", async () => {
    
    const root = await protobuf.load(`${__dirname}/awesome.proto`);
    var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

    // Exemplary payload
    var payload = { awesomeField: "AwesomeString", randomField: "abc123" };
    const encoded = AwesomeMessage.encode(payload).finish();
    const decoded = AwesomeMessage.decode(encoded);

    expect(payload).toMatchObject(decoded);

});

test("simple encode & decode, schema has new field", async () => {
    
    const root = await protobuf.load(`${__dirname}/awesome.proto`);
    var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

    const root1 = await protobuf.load(`${__dirname}/awesome_1.proto`);
    var AwesomeMessage1 = root.lookupType("awesomepackage.AwesomeMessage");

    // Exemplary payload
    var payload = { awesomeField: "AwesomeString" };
    const encoded = AwesomeMessage.encode(payload).finish();
    const decoded = AwesomeMessage1.decode(encoded);

    expect(payload).toMatchObject(decoded);

});

