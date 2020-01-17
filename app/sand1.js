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