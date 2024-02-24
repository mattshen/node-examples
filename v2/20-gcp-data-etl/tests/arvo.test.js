const avro = require('avro-js');
const avsc = require('avsc');

test("simple encode/decode", () => {
    // We can declare a schema inline:
    const type = avro.parse({
        name: 'Pet',
        type: 'record',
        fields: [
            { name: 'kind', type: { name: 'Kind', type: 'enum', symbols: ['CAT', 'DOG'] } },
            { name: 'name', type: 'string' }
        ]
    });
    const pet = { kind: 'CAT', name: 'Albert' };
    const buf = type.toBuffer(pet); // Serialized object.
    const obj = type.fromBuffer(buf); // {kind: 'CAT', name: 'Albert'}

    expect(obj).toMatchObject(pet);
});

test("encode and decode, add field", () => {
    // We can declare a schema inline:
    const type = avro.parse({
        name: 'Pet',
        type: 'record',
        fields: [
            { name: 'kind', type: { name: 'Kind', type: 'enum', symbols: ['CAT', 'DOG'] } },
            { name: 'name', type: 'string' }
        ]
    });

    const type1 = avro.parse({
        name: 'Pet',
        type: 'record',
        fields: [
            { name: 'kind', type: { name: 'Kind', type: 'enum', symbols: ['CAT', 'DOG'] } },
            { name: 'name', type: 'string' },
            { name: 'gender', type: 'string' }
        ]
    });

    const pet = { kind: 'CAT', name: 'Albert' };
    const buf = type.toBuffer(pet); // Serialized object.
    const obj = type1.fromBuffer(buf); // {kind: 'CAT', name: 'Albert'}

    expect(obj).toMatchObject(pet);
});

test("encode and decode, remove field", () => {
    // We can declare a schema inline:
    const type = avsc.Type.forSchema({
        name: 'Pet',
        type: 'record',
        fields: [
            { name: 'kind', type: { name: 'Kind', type: 'enum', symbols: ['CAT', 'DOG'] } },
            //{ name: 'name', type: ["null", "string"] }
        ]
    });

    const type1 = avsc.Type.forSchema({
        name: 'Pet',
        type: 'record',
        fields: [
            { name: 'kind', type: { name: 'Kind', type: 'enum', symbols: ['CAT', 'DOG'] } },
            { name: 'name', type: ["null", "string"] }
        ]
    });

    const pet = { kind: 'CAT', name: 'Albert' };
    const buf = type.toBuffer(pet); // Serialized object.
    const obj = type1.fromBuffer(buf); // {kind: 'CAT', name: 'Albert'}

    expect(obj).toMatchObject(pet);
});
