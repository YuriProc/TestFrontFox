const calc = require('./calc')
const numbersToAdd = [
    3,
    4,
    10,
    2
]

const result = calc.sum(numbersToAdd)
console.log(`The result is: ${result}`);
console.log('-------------------');

const result1 = calc.sumX(numbersToAdd)
console.log(`The result1 is: ${result1}`);
//----------Read FIle-------------------------------
console.log('-------------------');

const fs = require('fs')
let content
try {
    content = fs.readFileSync('file.md', 'utf-8')
} catch (ex) {
    console.log(ex)
}
console.log(content);
console.log('-------------------');
//----------END Read FIle---------------------------
const fs2 = require('fs')

console.log('start reading a file...')

fs2.readFile('file.md', 'utf-8', function (err, content2) {
    if (err) {
        console.log('error happened during reading the file')
        return console.log(err)
    }
    console.log(content2);
    console.log('rf-------------------');
})
console.log('end rf-------------------');
console.log('start numbers-------------------');
const numbers = [2,4,1,5,4,2,3,0,-1,-2]

function isBiggerThanTwo (num) {
    return num > 2
}
console.log(numbers);
console.log(numbers.filter(isBiggerThanTwo))
console.log('end numbers-------------------');

 //примеры из user_check_exist.js
// //  //*[@id="app"]/div/main/div/div[2]/div/table/tbody/tr[2]/td[5]
// await console.log('\x1b[38;5;1m', "--------------------------", '\x1b[0m');
// const xPathSelector = await page.evaluate(
//     el => el.outerHTML,
//     //(await page.$x("//tbody/tr/td[contains(text(), 'то')]"))[0])
//     (await page.$x("//tbody/tr[2]/td[5]"))[0])
//     .then(
//         result => console.log('HHH',result,'HHH')
//     ).catch( e => {
//         console.log('XPath Error', e)
//     })
// await console.log('\x1b[38;5;1m', "--------------------------", '\x1b[0m');