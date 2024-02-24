import os from 'os'; //node's core module
import express from 'express' // third party module
import operations from './operations'; //local module

//Do something with these modules
const result1 = operations.multiply(2, 4);
console.log('Multiply Result: ', result1)// 8

const result2 = operations.sum(2, 3);// Error, as it is not exported.
console.log('Sum Result: ', result2)

console.log(module)
