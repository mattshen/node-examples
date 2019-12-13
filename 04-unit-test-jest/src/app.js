const math = require('./math.js');

module.exports = {
    doSubtract: (a, b) => math.subtract(a, b),
    doAdd: (a, b) => math.add(a, b),
    doMultiply: (a, b) => math.multiply(a, b),
    doDivide: (a, b) => math.divide(a, b)
}
