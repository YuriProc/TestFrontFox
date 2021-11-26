//установить обработчик запросов-------------------------------------------------
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setRequestInterception(true);
page.on('request', req => {
    console.log('request:', req.url())
    req.continue();
});
page.on('requestfinished', (req) => {
    console.log('finished:', req.url())
});
page.on('requestfailed', (req) => {
    console.log('failed:', req.url())
})
await page.goto(url);
await page.click(selector);
//установить обработчик запросов-------------------------------------------------------

//перезагрузка стрницы--------------------------------------------------------------
await Promise.all([
    page.select('select[name=sort]', 'size'),
    page.waitForNavigation(),
]);
//перезагрузка стрницы---------------------------------------------------------
//=====Select File================
let [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('div[id=dropzone]'), // some button that triggers file selection
]);
await page.waitFor(2000);
await fileChooser.accept(['/Users/Urupa/Pictures/fack.png']);
await page.waitFor(5000);

[fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('div[id=dropzone]'), // some button that triggers file selection
]);
await page.waitFor(2000);
await fileChooser.accept(['/Users/Urupa/Pictures/zalupa.png']);
await page.waitFor(5000);

[fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('div[id=dropzone]'), // some button that triggers file selection
]);
await page.waitFor(2000);
await fileChooser.accept(['/Users/Urupa/Pictures/favicon.png']);
await page.waitFor(5000);

[fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('div[id=dropzone]'), // some button that triggers file selection
]);
await page.waitFor(2000);
await fileChooser.accept(['/Users/Urupa/Pictures/cat.png']);
await page.waitFor(2000);

//    /Users/Urupa/Pictures/zalupa.png
//  /Users/Urupa/Pictures/favicon.png
//  /Users/Urupa/Pictures/cat.png

//await fileChooser.cancel();

//==========================
//get the xpath of the element
const getXpathOfRecordLabel = await page.$x('//div');

//get the property of textContent
const getTheProperty = await getXpathOfRecordLabel[0].getProperty(
    'textContent'
);

//get the value
const getRecordName = getTheProperty._remoteObject.value;
console.log(getRecordName);
//===========================
    await page.evaluate( async() => {
        await window.scrollBy(0, window.innerHeight);
    });
    await page.waitFor(1000);
//===============
let elHandle = await page.$x('//button[@class="btn"][./span[contains(text(), "Создать контакт")]]');
let Text = await page.evaluate(el => el.textContent, elHandle[0]);
//===============
let ts = Date.now();
let date_ob = new Date(ts);
//==========================
//заполняем Ответственный
//Клик по инпуту Ответственный
xPath = "//div[./div[./input[@name='managers']]]";
//xPath = "//div[@class='multiselect__tags'][./input[@name='managers']]";
resOk = await ClickByXPath(page, xPath);
//await page.waitFor(5001111);
//Выбираем Первого в списке
await page.waitFor(1000);
try {
    // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[5]/div/div/div/div[2]/input
    // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[5]/div/div/div/div[3]/ul/li[1]/span/span
    // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[5]/div/div/div/div[3]/ul/li[2]/span/span
    xPath = "//div[./div[@class='multiselect__tags'][./input[@name='managers']]]/div/ul/li/span/span";
    let linkManagers = await page.$x(xPath);
    let MaxL = linkManagers.length;
    let TextF;
    await console.log('\x1b[38;5;2m', "length", MaxL , '\x1b[0m');
    for (let i = 0 ; i < MaxL; i++){

        TextF = await page.evaluate(elm => elm.textContent, linkManagers[i]);
        TextF = await TextF.trim();
        await console.log('\x1b[38;5;2m', "-", TextF , '\x1b[0m');//linkManagers[i].visible();
    }
    //await linkManagers[3].click();
}catch (e) {
    throw `Не получилось выбрать Ответственного ${e}`;
}
await page.waitFor(500);
//Жмём кнопку Сохранить компанию
//==========================
//Ждём появление кнопки редактировать
await page.waitForXPath('//a[@class="table__option"]', {timeout: 5000});
await console.log('\x1b[38;5;2m', "     Вижу => Шото нашли!!! ", '\x1b[0m');
await console.log('\x1b[38;5;2m', "     Удаляем => Шото нашли!!! ", '\x1b[0m');

//await page.amAcceptingPopups();
await console.log('\x1b[38;5;2m', "     click => Шото нашли!!! ", '\x1b[0m');
// Установка ОБРАБОТЧИКА НА ДИАЛОГ
page.on('dialog', async dialog => {
    await console.log(dialog.accept());
});
await page.click("div[class=table__option]");
await console.log('\x1b[38;5;2m', "     click2 => Шото нашли!!! ", '\x1b[0m');
await page.waitFor(2500);
// await page.acceptPopup();
await console.log('\x1b[38;5;2m', "     Enter => Шото нашли!!! ", '\x1b[0m');
await page.keyboard.press('Enter',{delay: 100});

//=================
const result = await page.evaluate(() => {
    let textX;
    try {
        textX = document.querySelector("div[class=head__title]").innerText;

        let elements = document.querySelectorAll('div.head__title');

        let data = []; // Создаём пустой массив для хранения данных

        for (var element of elements) { // Проходимся в цикле по каждому товару

            //let title = element.childNodes[0].innerText; // Выбираем название
            let title = element.innerText; // Выбираем название
            data.push({title}); // Помещаем объект с данными в массив
            //text = title;
        }
    }catch (err) {
        console.log('\x1b[38;5;1m', "Error: Link not found", '\x1b[0m');
        textX = 'empty text';
    }
    //return data;
    return textX;

});
//=================
// Если элемент уникальный (судя по именованию, подозреваю, что это уникальное значение для поля ‘last name’),
// то делаем так:
//
//     type | //*[contains(@id, ‘_physician_last_name’)] | doctorLastName
//
//     То есть, просто указываем кусок этого id, игнорируя все то, что находится перед ним или после него.
//
//     Конструкция ‘//*’ означает “НАЙТИ ВАЩЩЕ ЛЮБОЙ ЭЛЕМЕНТ, у которого есть id и этот id содержит…”,
// // но вы можете указать этот элемент более точно.
//==================
await page.waitForXPath('//input[@name="company_types"]', {visible: true, timeout: 2000});
//Сука по этому XPath нельзя кликнуть , он перекрыт Span "Выберите"
// Хитрый XPath выбрать родителя содержащего конкретного ребёнка
//("//div[./div[@class='MyClassName1' and text()='MyText']]")
const linkHandlers = await page.$x("//div[./input[@name='company_types']]");
linkHandlers[0].click();

//Ну можно еще таким способом:

//    .//div[@class="MyClassName1" and text()="MyText"]/..
//Или таким:

//    .//div[@class="MyClassName1" and text()="MyText"]/parent::div
//Или даже таким:

//    .//div[@class="MyClassName1" and text()="MyText"]/ancestor::div[1]
//===================
//----------------------------------------------------------------------------------------
// $('.check__item input[type=radio]:checked').value
// "contact"

//  //label[@class="check__item"]/input[@type="radio"] <-- input с родителем label
//  //label[@class="check__item"][./input[@type="radio"]] <-- label с дочерним input
try {
    let linkTemp = await page.$x('//input[@type="radio"]');
    let MaxL = linkTemp.length;

    let ValF;
    let TextF;
    let PropF;
    let VVV;
    await console.log('\x1b[38;5;2m', "length", MaxL , '\x1b[0m');
    for (let i = 0 ; i < MaxL; i++){

        ValF = await page.evaluate(elm => elm.value, linkTemp[i]);
        TextF = await page.evaluate(elm => elm.innerText, linkTemp[i]);
        PropF = await page.evaluate(elm => elm.checked, linkTemp[i]);
        //TextF = await TextF.trim();
        await console.log('\x1b[38;5;2m', "(", ValF ,")(",TextF,")(" ,PropF ,")",'\x1b[0m');//linkManagers[i].visible();
    }

    VVV = await page.$('input[type=radio]:checked').value;
    await console.log('\x1b[38;5;2m', "VVV->>>(" ,VVV ,")",'\x1b[0m');
}catch (e) {
    throw `XPath Wrong3 ${e}`;
}
//--------------------
const list = await page.evaluateHandle(() => {
    return Array.from(document.getElementsByTagName('a')).map(a => a.href);
});
console.log(await list.jsonValue());
//--------------------
const browser = await puppeteer.launch();
const page = await browser.newPage();
const check = async(element, page) => (await page.$(element) !== null); // Make it async, return true if the element is visible
await page.goto('https://www.example.com/');

// now lets check for the h1 element on example.com
const foundH1 = await check("h1", page);
console.log(`Element Found? : ${foundH1}`);

// now lets check for the h2 element on example.com
const foundH2 = await check("h2", page);
console.log(`Element Found? : ${foundH2}`);

await browser.close();
//--------------------

//    '//table/tbody/tr/td[1]'
//    "//table[@class = 'classname']/tbody/tr/td[1]"
let linkTBody = await page.$x("//tbody/tr");// Количество строк
await console.log('\x1b[38;5;1m', "Записей linkTBody найдено: ",linkTBody.length, '\x1b[0m');
let i = 0;
let TextF;
let linkTextF = await page.$x("//tbody/tr/td[5]");
for (var linkF of linkTextF) { // Проходимся в цикле по каждому элементу
    i++;
    TextF = await page.evaluate(elm => elm.textContent, linkF);
    TextF = await TextF.trim();
    await console.log('\x1b[38;5;2m', "TextF[",i,"]:",TextF, '\x1b[0m');
}

let linkTextXXX = await page.$x("//tbody/tr[2]/td[5]");
let textXXX = await page.evaluate(elm => elm.textContent, linkTextXXX[0]);
textXXX = await textXXX.trim();
await console.log('\x1b[38;5;2m', "linkTextXXX :",textXXX, '\x1b[0m');
//
const elm = await page.$x("//tbody/tr[2]/td[5]");
let text = await page.evaluate(elm => elm.textContent, elm[0]);
text = await text.trim();
//text.replace(/\s+/g,'');
//text.replace(/[\s{1,}]+/g, '');
await console.log('-(',text,')-');

//
let linkTextUser = await page.$x("//td[contains(text(), 'та')]");
//await linkEditUser[0].click();
await console.log('\x1b[38;5;1m', "Записей найдено: ",linkTextUser.length, '\x1b[0m');
i = 0;
for ( linkF of linkTextUser) { // Проходимся в цикле по каждому элементу
    i++;
    TextF = await page.evaluate(elm => elm.textContent, linkF);
    TextF = await TextF.trim();
    await console.log('\x1b[38;5;2m', "TextF[",i,"]:",TextF, '\x1b[0m');
}
//await page.click("a[class=table__option]");
//------------------
await console.log('111111111111');

await page.waitForNavigation();

await console.log('2222222222222');
//---------
let linkSearchCodeCompany = await page.$x('//input[@placeholder="ЕДРПОУ\\ИНН"]');
//Вводим неправильные данные которых гарантированно не в базе
await linkSearchCodeCompany[0].click();
await linkSearchCodeCompany[0].type('077584765812442390485743843275830011');
await page.waitFor(500);
await page.keyboard.press('Enter',{delay: 100});
await page.waitFor(500);
//============================


//ЧАСТИЧНЫЙ НЕЙМИНГ , поиск по части класса
xPath = `//div[@title="Заказчик"][contains(@class, "crm-select__tag--first")]`;

//============================
// прример Классов в модулях
//'use strict';
let method = Animal.prototype;

function Animal(age) {
    this._age = age;
}

method.getAge = function() {
    return this._age;
};
class Jack{
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} пердит !!!`);
    }
}
module.exports = {Animal, Jack};//
// использование в другом модуле
var {Jack: personJack, Animal} = require("../tests_modules/sub_objects/contract_obj.js");

var john = new Animal(3);
console.log(`john.getAge()=`,john.getAge(),`\n`);

let chlen = new personJack('Митци');
chlen.speak();
//=====================================================
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
await sleep(5000);
//===============================
// https://coderoad.ru/51866987/%D0%9A%D0%B0%D0%BA-%D0%B8%D0%BC%D0%B8%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%BF%D1%80%D0%BE%D0%BA%D1%80%D1%83%D1%82%D0%BA%D1%83-%D0%BC%D1%8B%D1%88%D0%B8-%D0%B2%D0%BD%D1%83%D1%82%D1%80%D0%B8-div-%D0%B2%D0%BE-%D0%B2%D1%81%D0%BF%D0%BB%D1%8B%D0%B2%D0%B0%D1%8E%D1%89%D0%B5%D0%BC-%D0%BE%D0%BA%D0%BD%D0%B5-%D1%81-%D0%BA%D1%83%D0%BA%D0%BB%D0%BE%D0%B2%D0%BE%D0%B4%D0%BE%D0%BC
try {
    const res = await page.$eval(`div._weirdo`,
        e => {
            e.scrollTop = e.scrollTop + 200
            return e
        }
    )
}
catch (e) {
    console.log(e)
}
//========================================
// https://stackoverflow.com/questions/68417011/how-to-log-in-true-headless-mode-with-puppeteer
const data = {
    username: username, // from real registration
    password: password, // from real registration
    client_id: cliendId, // from your existing login URL
    ux_id: 'com.nike.commerce.nikedotcom.web',
    grant_type: 'password',
    gzip: true
}
const headers = {
    'DNT': '1',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'User-Agent': 'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    'Accept': '*/*',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-type': 'application/json'
}
const options = {
        method: 'POST',
        url: 'https://unite.nike.com.br/login?appVersion=900&experienceVersion=900&uxid=com.nike.commerce.nikedotcom.web&locale=pt_BR&backendEnvironment=identity&browser=Google%20Inc.&os=undefined&mobile=false&native=false&visit=1&visitor=ec83f58d-0bd0-44a5-8ccd-a17f5efc3333',
        json: data
    }

;(async () => {
    const browser = await puppeteer.launch({ headless: true, devtools: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'] })
    const page = await browser.newPage()
    await page.goto('https://unite.nike.com.br/oauth.html?client_id=' + data.clientId)

    await page.evaluate((options, headers) => {
        fetch('/login?appVersion=900&experienceVersion=900&uxid=com.nike.commerce.nikedotcom.web&locale=pt_BR&backendEnvironment=identity&browser=Google%20Inc.&os=undefined&mobile=false&native=false&visit=1&visitor=ec83f58d-0bd0-44a5-8ccd-a17f5efc3333', {
            method: 'POST',
            postData: JSON.stringify(options),
            headers: headers
        })
    }, options, headers);
// refresh page
//
    //
    //

})()
//=================================================================
// Удалить Папку с Файлами !!!!!
const fs = require('fs').promises;

const directory = `Test`;

fs.rmdir(directory, { recursive: true })
    .then(() => console.log('directory removed!'));
//=================================================================
// Вывести в консоль все Типы Контактов
let xPathTemp = `//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]/span`;
let strTemp;
let tempLength = await ElementGetLength(this.page, xPathTemp);
--tempLength;
await console.log(`tempLength=${tempLength} -------------`);

for( let i=0 ; i<=tempLength ; i++ ) {

    strTemp = await ElementGetInnerText(this.page, i, xPathTemp);
    await console.log(`'${strTemp}',`);
}

await console.log(`-------------`);
await TempStop(this.page);
            //=================================================================
// Вывести в консоль все поля таблицы CFO
//let xPathTemp = `//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]/span`;
            let xPathTemp1 = `//div[@data-type="head-cell"][@class="head"]`;
            let strColName,strFName; // data-field
            let tlCN,tlFN, tl0,tl1;
            let tempLength1 = await ElementGetLength(this.page, xPathTemp1);
            --tempLength1;
            await console.log(`tempLength=${tempLength1} -------------`);
            await console.log(`-------------`);

            for( let i=0 ; i<=tempLength1 ; i++ ) {
                strFName = await ElementGetAttribute(this.page, i, `data-field`, xPathTemp1);
                strColName = await ElementGetInnerText(this.page, i, xPathTemp1);
                tlCN = strColName.length;
                tlFN = strFName.length;
                tl0 = 42 - tlCN;
                tl1 = 39 - tlFN;
                await console.log(`['${strColName}', ${' '.repeat(tl0)}'${strFName}',  ${' '.repeat(tl1)}'',  '',  '',  ''],`);
                //74 ' '.repeat(N)
            }
            await console.log(`-------------`);
 //============================
// Обращение к полям ОБЪЕКТА через строки
            // `PointsLoading[0].PointLoading.strAddressFOX`
            // let strName = `ClientFreights[0].Amount`;//`strClientCompanyName`;
            let strName1 = `ClientFreights`;//`strClientCompanyName`;
            let strName2 = `Amount`;
            let strName3 = ``;
            let strName4 = ``;
            let tstr = this.DealData[strName1][0][strName2];
            await console.log(`DealData.ClientFreights[0].Amount=(${this.DealData.ClientFreights[0].Amount})`);
            await console.log(`DealData.xName=(${tstr})`);
            strName1 = `PointsLoading`;//`strClientCompanyName`;
            strName2 = `1`;
            strName3 = `PointLoading`;
            strName4 = `strAddressFOX`;
            let tstr1 = this.DealData[strName1][strName2][strName3][strName4];
            await console.log(`DealData.PointsLoading[0].PointLoading.strAddressFOX=(${this.DealData.PointsLoading[0].PointLoading.strAddressFOX})`);
            await console.log(`DealData.xName=(${tstr1})`);
// =================================================================
// https://question-it.com/questions/130241/kuklovod-kak-zhdat-tolko-pervyj-otvet-html
//async ReadResponse() {
    let resOk;
    try {
        // https://question-it.com/questions/130241/kuklovod-kak-zhdat-tolko-pervyj-otvet-html
        function waitForRequestToFinish(page, requestUrl, timeout) {
            page.on('response', onRequestFinished);
            let fulfill, timeoutId = (typeof timeout === 'number' && timeout >= 0) ? setTimeout(done, timeout) : -1;
            return new Promise(resolve => fulfill = resolve);

            function done() {
                page.removeListener('response', onRequestFinished);
                clearTimeout(timeoutId);
                fulfill();
            }
            async function onRequestFinished(req) {
                try {
                    if (req.url().includes(requestUrl)) {
                        let resultJ = await req.json();
                        await console.log(`-1-----------------------`);
                        await console.log(resultJ); // JSON RESULT OK
                        await console.log(`-2-----------------------`);


                        done();
                    }
                }catch (e) {

                }
            }
        };

        await waitForRequestToFinish(this.page,"https://dev.api.cfo.tl.ee/api/v2/deal", 12000);

        // await this.page.on('response', async (response) => { <- тоже ок работало
        //     // if (response.url().includes("https://api.maerskline.com/track/")) {
        //     try {
        //         if (response.url().includes("https://dev.api.cfo.tl.ee/api/v2/deal")) {
        //             let resultJ = await response.json();
        //             await console.log(`-1-----------------------`);
        //             await console.log(resultJ); // JSON RESULT OK
        //             await console.log(`-2-----------------------`);
        //             // здесь перехватил результат, ВСЕ ОК
        //             ----//await page.evaluate(() => window.stop())
        //         }
        //     }catch (e) {
        //
        //     }
        // });

        return true;
    } catch (e) {
        await console.log(`${e} \n FAIL in ReadResponse`);
        return false;
    }
//}//async ReadResponse()
//================================================
// https://ru.stackoverflow.com/questions/1214723/node-js-%D0%B5%D1%81%D1%82%D1%8C-%D0%BB%D0%B8-%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3-cin-n-%D0%B8%D0%B7-c
// @ts-check
const readline = require('readline');

await (async () => {

    try {
        const count = await askInteger('Введите количество элементов: ');
        const arr = [];
        while (arr.length < count) {
            try {
                const number = await askInteger(`Введите число #${1 + arr.length}: `);
                arr.push(number);
            } catch (err) {}
        }

        const sum = arr.reduce((acc, x) => acc += x, 0);
        console.log(sum);

    } catch (err) {
        console.error(err);
    }

})();

/**
 * @param {*} question
 * @returns {Promise<number>}
 */
async function askInteger(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            rl.close();

            /** @type {number} */
            let number;
            if (answer !== null && answer !== undefined && answer !== '') {
                number = +answer;
            }

            return Number.isInteger(number) ? resolve(number) : reject('INCORRECT_INPUT');
        });
    });
}
//===============================================
