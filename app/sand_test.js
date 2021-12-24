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
//-----------------------------------------------------------------------------------------------------
document.getElementById('client_our_company').click();
document.getElementById('client_our_company').value = 11;
//-----------------------------------------------------------------------------------------------------
await page.$eval('#client_our_company', el => el.value = '11');
resOk = await ClickByXPath(page, '//select[@name="client_our_company"]');
if (!resOk) {
    throw `FAIL => ClickByXPath(Дані про замовника => ЮР. ОСОБА З ЗАМОВНИКОМ)`;//<--специальный вызов ошибки!
}


await page.waitFor(12000);
await page.hover('select[name="client_our_company"]');
await console.log('hover');
await page.waitFor(5000);
let link = await page.$('select[name="client_our_company"]'); // I take element's coords to use them to move the mouse later
let linkPos = await page.evaluate((link) => {
    const {top, left} = link.getBoundingClientRect();
    return {top, left};
}, link);

await page.mouse.move(linkPos.left + 15, linkPos.top + 15);
await console.log('move');
await page.waitFor(5000);
await page.mouse.down();
await page.waitFor(200);
await page.mouse.up();
await console.log('down/up');
await page.waitFor(5000);
await page.mouse.move(linkPos.left + 15, linkPos.top + 45);
await page.waitFor(1000);
await page.mouse.move(linkPos.left + 15, linkPos.top + 55);
await page.waitFor(1000);
await page.mouse.move(linkPos.left + 15, linkPos.top + 65);
await page.waitFor(1000);
await page.mouse.move(linkPos.left + 15, linkPos.top + 75);
await page.waitFor(1000);
await page.mouse.move(linkPos.left + 15, linkPos.top + 85);
await page.waitFor(1000);
await page.mouse.move(linkPos.left + 15, linkPos.top + 95);
await console.log('move2');
await page.waitFor(5000);
await page.mouse.down();
await page.waitFor(200);
await page.mouse.up();
await console.log('down/up2');
//===============================================================================================
resOk = await ClickByXPath(page, '//select[@name="client_our_company"]');
if (!resOk) {
    throw `FAIL => ClickByXPath(Дані про замовника => ЮР. ОСОБА З ЗАМОВНИКОМ)`;//<--специальный вызов ошибки!
}
await page.waitFor(5000);

//await page.keyboard.press('Up');
await page.keyboard.press('ArrowDown');
await console.log('press(\'ArrowDown\')');
await page.waitFor(5000);
await page.keyboard.press('Enter');
await console.log('press(\'Enter\')');
//===============================================================================================
        await page.$eval('#client_our_company', el => el.value = '11');
        await console.log('eval = 11');
        await page.waitFor(5000);
        // await page.$eval('#client_our_company', el => el.class = 'element__area');
        // await console.log('eval = element__area');
//================================================================================================
//( (for instant) //*[@Class='whateverclass'][not(ancestor::div[@id='abcdef'])] )
//================================================================================================
// ОЧИСТКА Input
    //Вы можете использовать page.evaluateдля управления DOM, как считаете нужным:

    await page.evaluate( () => document.getElementById("inputID").value = "")
    //Однако иногда простого манипулирования данным полем может быть недостаточно (целевой страницей может быть SPA с прослушивателями событий), поэтому эмуляция реальных нажатий клавиш предпочтительнее. Приведенные ниже примеры взяты из информативного вопроса в Github кукловода об этой задаче.

    //Здесь мы нажимаем Backspaceстолько раз, сколько символов в этом поле:

    const inputValue = await page.$eval('#inputID', el => el.value);
    for (let i = 0; i < inputValue.length; i++) {
        await page.press('Backspace');
        await page.keyboard.press('ArrowDown');//Enter
    }
    //Другое интересное решение состоит в том, чтобы щелкнуть целевое поле 3 раза, чтобы браузер выделил весь текст в нем, а затем вы можете просто напечатать, что вы хотите:

    const input = await page.$('#inputID');
    await input.click({ clickCount: 3 })
    await input.type("Blah");
//================================================================================================
// ввести это ВСЁ в консоль и нажать Enter при прохождении тестов и будет видно кружок где находится курсор мыши
(function(){
    const box = document.createElement('div');
    box.classList.add('mouse-helper');
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
  .mouse-helper {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,.4);
    border: 1px solid white;
    border-radius: 10px;
    margin-left: -10px;
    margin-top: -10px;
    transition: background .2s, border-radius .2s, border-color .2s;
    z-index: 10000;
  }
  .mouse-helper.button-1 {
    transition: none;
    background: rgba(0,0,0,0.9);
  }
  .mouse-helper.button-2 {
    transition: none;
    border-color: rgba(0,0,255,0.9);
  }
  .mouse-helper.button-3 {
    transition: none;
    border-radius: 4px;
  }
  .mouse-helper.button-4 {
    transition: none;
    border-color: rgba(255,0,0,0.9);
  }
  .mouse-helper.button-5 {
    transition: none;
    border-color: rgba(0,255,0,0.9);
  }
  `;
    document.head.appendChild(styleElement);
    document.body.appendChild(box);
    document.addEventListener('mousemove', event => {
        box.style.left = event.pageX + 'px';
        box.style.top = event.pageY + 'px';
        updateButtons(event.buttons);
    }, true);
    document.addEventListener('mousedown', event => {
        updateButtons(event.buttons);
        box.classList.add('button-' + event.which);
    }, true);
    document.addEventListener('mouseup', event => {
        updateButtons(event.buttons);
        box.classList.remove('button-' + event.which);
    }, true);
    function updateButtons(buttons) {
        for (let i = 0; i < 5; i++)
            box.classList.toggle('button-' + i, buttons & (1 << i));
    }
})();
//----------------------------------------------------------------------------
// DragAndDropXXX
async function dragAndDrop(page, originSelector, destinationSelector) {
    const origin = await page.waitForSelector(originSelector);
    const destination = await page.waitForSelector(destinationSelector);
    const originBox = await origin.boundingBox();
    const destinationBox = await destination.boundingBox();
    const lastPositionCoordenate = (box) => ({
        x: box.x + box.width / 2,
        y: box.y + box.height,
    });
    const getPayload = (box) => ({
        bubbles: true,
        cancelable: true,
        screenX: lastPositionCoordenate(box).x,
        screenY: lastPositionCoordenate(box).y,
        clientX: lastPositionCoordenate(box).x,
        clientY: lastPositionCoordenate(box).y,
    });

    // Function in browser.
    const pageFunction = async (_originSelector, _destinationSelector, originPayload, destinationPayload) => {
        const _origin = document.querySelector(_originSelector);
        let _destination = document.querySelector(_destinationSelector);
        // If has child, put at the end.
        _destination = _destination.lastElementChild || _destination;

        // Init Events
        _origin.dispatchEvent(new MouseEvent('pointerdown', originPayload));
        _origin.dispatchEvent(new DragEvent('dragstart', originPayload));

        await new Promise((resolve) => setTimeout(resolve, 2000));
        _destination.dispatchEvent(new MouseEvent('dragenter', destinationPayload));
        _origin.dispatchEvent(new DragEvent('dragend', destinationPayload));
    };

    // Init drag and drop.
    await page.evaluate(
        pageFunction,
        originSelector,
        destinationSelector,
        getPayload(originBox),
        getPayload(destinationBox),
    );
}

await dragAndDrop(
    page,
    '#origin-selector',
    '#destination-selector',
);
//===================================================
// https://question-it.com/questions/250434/dozhdites-pojavlenija-teksta-pri-ispolzovanii-puppeteer
// вариации поиска текста и классов
await page.waitForXPath("//*[@class='count' and contains(., 'Expected text')]");
//----------------------------------------------------
function waitForRequestToFinish(page, requestUrl, timeout) {
    page.on('response', onRequestFinished);
    let fulfill, timeoutId = (typeof timeout === 'number' && timeout >= 0) ? setTimeout(done, timeout) : -1;
    return new Promise(resolve => fulfill = resolve);

    function done() {
        page.removeListener('requestfinished', onRequestFinished);
        clearTimeout(timeoutId);
        fulfill();
    }
    async function onRequestFinished(req) {
        try {
            if (req.url().includes(requestUrl)) {
                let resultJ = await req.response().json();
                await console.log(`-1-----------------------`);
                await console.log(resultJ); // JSON RESULT OK
                await console.log(`-2-----------------------`);

                await console.log(`-ID=(${resultJ.data.id})`);
                done();
            }
        }catch (e) {
            await console.log(`-какая то херня(${e})`);
        }
    }
};

 await waitForRequestToFinish(this.page,"https://dev.api.cfo.tl.ee/api/v2/deal", 12000);
 //-----------------------------------------------
 // вывод в КОНСОЛЬ
let a = 1, b = "1";
await console.assert(a === b, "A doesn't equal B");
await console.time("Execution time took");
// Some code to execute

let tStr = `Процесс`;
let C = FRGB(0, 0, 0,5);
await process.stdout.write(`${tStr}`);
for(let i=0 ; i<10; i++){
    await WaitMS(100);
    //await process.stdout.write(`\x1B[0G${tStr} : ${i}%`);
    await process.stdout.write(`\r${C}${tStr} : ${i}%${FRGB()}`);
}
C = FRGB(0, 0, 5,0);
await process.stdout.write(`\r${C}${tStr} - успешно завершён !${FRGB()}`);
await WaitMS(1000);
await process.stdout.write(`\r`);

await console.timeEnd("Execution time took");
//-----------------------------------------------
