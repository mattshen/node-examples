test("slice valid range", () => {
    expect("hello world".slice(0, 2)).toBe('he');
    expect("hello world".substring(0, 2)).toBe('he');
});

test("slice invalid range case 1", () => {
    expect("hello world".slice(2, 1)).toBe('');
    expect("hello world".substring(2, 0)).toBe('he');  // very weird
});

test("slice invalid range case 2", () => {
    expect("hello world".slice(0, 1000)).toBe('hello world');
    expect("hello world".slice(999, 1000)).toBe('');

    expect("hello world".substring(0, 1000)).toBe('hello world');
    expect("hello world".substring(999, 1000)).toBe('');
});
