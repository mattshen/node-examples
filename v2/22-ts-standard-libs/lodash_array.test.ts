import * as _ from 'lodash';

test("array - chunk split one array into multiple arrays", () => {
    const arr = ['a', 'b', 'c', 'd'];
    expect(_.chunk(arr)).toEqual([['a'], ['b'], ['c'], ['d']]);
    expect(_.chunk(arr, 3)).toEqual([['a', 'b', 'c'], ['d']]);
});

test("array - compact remove falsy values", () => {
    expect(_.compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
});

test('array - concat array with additional arrays and values', () => {
    expect(_.concat([0, 1], [2], 3, [4])).toEqual([0, 1, 2, 3, 4]);
});

test('array - difference, get the values not included in the other given arrays', () => {
    expect(_.difference([1, 2, 3], [1, 'a'], [3, 'b'])).toEqual([2]);
});

test('array - drop', () => {
    expect(_.drop([1, 2, 3])).toEqual([2, 3]);
    expect(_.drop([1, 2, 3], 2)).toEqual([3]);
});


test('array - dropWhile', () => {
    expect(_.dropWhile([1, 2, 3, 4, 5, 1], o => o < 4)).toEqual([4, 5, 1]);
});
