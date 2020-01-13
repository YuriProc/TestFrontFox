// app/calc.js
function sum (arr) {
    return arr.reduce(function(a, b) {
        return a + b
    }, 0)
}

function sum1 (arr) {
    return arr.reduce(function(a, b) {
        return a + b + 1
    }, 0)
}

module.exports.sum = sum

module.exports.sumX = sum1