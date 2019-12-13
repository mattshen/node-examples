
test('Array.of should create array', () => {
    expect(Array.of(1,2,3,5)).toEqual([1,2,3,5]);
});

test('concat arrays should work', () => {
    expect([1, 2].concat([3, 4])).toEqual([1, 2, 3, 4]);
});

test('turn array into kv entries', () => {
   const iterator = ['a', 'b', 'c'].entries()
    expect(iterator.next().value).toEqual([0, 'a']);
    expect(iterator.next().value).toEqual([1, 'b']);
    expect(iterator.next().value).toEqual([2, 'c']);
});

test('test every element of an array', () => {
    const arr = [0, 2, 3, 4, 6];
    expect(arr.every(v => v % 2 == 0)).toBe(false);
});

test('fill an array with same element', () => {
    expect(Array(3).fill(4)).toEqual([4, 4, 4]);
});


