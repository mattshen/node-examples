import * as math_module from './math';

test("module.filename", () => {
    expect(module.filename).toBe(`${__dirname}/nodejs_module.test.ts`);
});

test("module.id", () => {
    expect(module.id).toBe(`${__dirname}/nodejs_module.test.ts`);
});

test("module.loaded", () => {
    expect(module.loaded).toBe(true);
    //expect(math_module.loaded).toBe(1);
});

test("module.paths", () => {
    expect(module.paths.length).toBeGreaterThan(1);
});

test("__filename should have some value", () => {
    expect(__filename).toBe(`${__dirname}/nodejs_module.test.ts`);
});

test("__dirname should have some value", () => {
    expect(__dirname.length).toBeGreaterThan(1);
});

test("module resolve", () => {
    expect(require.resolve('fs')).toBe("fs");
    expect(require.resolve.paths('fs')).toBeNull(); // core module
    expect(require.resolve.paths('express').length).toBeGreaterThan(1)
});

test("module named module ^^", () => {
    const builtin = require('module').builtinModules;
    expect(builtin.length).toBeGreaterThan(10); //quite a long list
});

