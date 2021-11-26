// index.js

require('./app/data/global_variables');

console.log('-----------------','\x1b[38;5;2m',  'Start FOX TESTS', '\x1b[0m', '----------------');

let strDT = 'DT:'+ g_StartTimeMS;
console.log( strDT );

// при возникновении необработанных ошибок/исключений выводить их в консоль, программа не будет падать
//process.on(`uncaughtException`, console.error);
// new console.Console(process.stdout, process.stderr)

// var fs = require('fs');
// let access = fs.createWriteStream('my_first_log.log');
// var Old_stdout = process.stdout.write;
//process.stdout.write = process.stderr.write = access.write.bind(access);



g_StrOutLog+='----------------- Start FOX TESTS ----------------\n';


//
// let OpenConfig = require('./app/open_config');
// let oConfig = OpenConfig.SetAllConfigConst();

require('./app/index');

//console.log('-----------------','\x1b[38;5;2m',  'END   FOX TESTS', '\x1b[0m', '----------------');

process.on('exit', async function(code) {

    process.stdout.write = await Old_stdout;
    await console.log('-----------------','\x1b[38;5;2m',  'END   FOX TESTS', '\x1b[0m', '----------------');

   return console.log(`About to exit with code ${code}`);
});

// function doHomework(subject, callback) {
//    // alert(`Starting my ${subject} homework.`);
//     let app = require('./app/index');
//
//
//     callback();
// }
// function alertFinished(){
//     //alert('Finished my homework');
//     console.log('-----------------','\x1b[38;5;2m',  'END   FOX TESTS', '\x1b[0m', '----------------');
// }
// doHomework('math', alertFinished);
// new Promise(function (resolve) {
//
//     alert("Начали");
//
//     setTimeout(function () {
//
//         resolve(1);
//
//     }, 1000)
//
// }).then(function (value) {
//
//     alert("Закончили. Результат = " + value + ".");
//
// });
