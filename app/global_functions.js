// async function WaitUntilPageLoads(page) {
//     let cssSelector = `//html[@class="nprogress-busy"]`;
//     try {
//         await page.waitForSelector(cssSelector, { timeout: 35000});
//         return true;
//     } catch (e) {
//         return false;
//     }
// }
// if (Date.now() - startCallback < 10) {
//     // ничего не делать
// }
//===================================================================================
WaitUntilMessageExist = async function (page) {
    let cssSelector = `div[class=noty_body]`;
    let startTime = await Date.now();
    try {
        // Ждём селектор
        await page.waitForSelector(cssSelector, { timeout: 500});
        // Теперь ждём пока не пропадёт селектор
        while (await page.$(cssSelector) !== null){
            // Если прошло больше 65 сек то выход!!!
            if(await Date.now() - startTime > 65000) {
                return false;
            }
        }
        return true;
    } catch (e) {
        return false;
    }
};
//-----------------------------------------------------------------------------------
WaitUntilXPathExist = async function (page, xPath) {
    let resOk;
    let startTime = await Date.now();
    try {
        // Ждём пока xPath присутствует
        while (await ElementIsPresent(page, xPath)){
            // Если прошло больше 65 сек то выход!!!
            if(await Date.now() - startTime > 65000) {
                return false;
            }
        }
        return true;
    } catch (e) {
        return false;
    }
};
//-----------------------------------------------------------------------------------
GetExceptions = async function (page) {
    let cssSelector = `div[class=noty_body]`;
    let xPath = `//div[@class="noty_body"]`;
    let resOk;
    let qLength;
    let iText;
    let tStr = ``;
    try {
        await WaitUntilPageLoads(page);
        qLength = await ElementGetLength(page, xPath);
        if (qLength>0){
            //tStr = `\n`;
            for (let i = 0; i < qLength; i++){
                iText = await ElementGetInnerText(page, i, xPath);
                if (i > 0){
                    tStr+= `${iText}\n`;
                }else {
                    tStr+= `${iText}`;
                }

            }
            // await console.log(`GetExceptions => qLength=${qLength} `);
            // await console.log(`GetExceptions => iText="${iText}" `);
            return tStr;
        }


        return ``;
    } catch (e) {
        return `Exception in GetExceptions(${e})`;
    }
};
//-----------------------------------------------------------------------------------
WaitUntilPageLoads  = async function (page) {
    let cssSelector = `html[class=nprogress-busy]`;

    let startTime = await Date.now();
    try {
        // Ждём селектор (html[class=nprogress-busy])
        await page.waitForSelector(cssSelector, { timeout: 2000});

        // Теперь ждём пока не пропадёт селектор (html[class=nprogress-busy])
        while (await page.$(cssSelector) !== null){
            // Если прошло больше 35 сек то выход!!!
            if(await Date.now() - startTime > 65000) {
                await console.log('page NOT load > 65 sec !!!');
                return false;
            }
        }
        //await console.log('page load');
        return true;
    } catch (e) {
        //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads => error=>",e, '\x1b[0m');
        return true;
    }
};
//-----------------------------------------------------------------------------------

WaitUntilPageLoadsAndReturnSuccessSave = async function (page) {
    let xPathBusy = `//html[@class="nprogress-busy"]`;
    let xPathSuccessSave = '//div[@class="noty_body"][contains(text(), "Успешно сохранено")]';
    let PresentPBusy = false;
    let PresentSSave = false;

    let startTime = await Date.now();
    try{
        while (!PresentPBusy){ //Ждём появление "nprogress-busy" и проверяем наличие "Успешно сохранено"
            await page.waitFor(100);
            PresentPBusy = await ElementIsPresent(page, xPathBusy);
            if (!PresentSSave) {
                PresentSSave = await ElementIsPresent(page, xPathSuccessSave);
            }
            if(await Date.now() - startTime > 5000) {
                break;// <- Выход из Цикла !!!
            }
        }
        if (!PresentPBusy && PresentSSave){
            return true;
        }
        if (!PresentSSave) {
            PresentSSave = await WaitForElementIsPresentByXPath(3000, page, xPathSuccessSave);
            PresentPBusy = await ElementIsPresent(page, xPathBusy);
        }
        if (!PresentPBusy && !PresentSSave){
            return false;
        }

        while ( PresentPBusy ){ //Ждём пока грузится страница
            await page.waitFor(100);
            PresentPBusy = await ElementIsPresent(page, xPathBusy);
            if (!PresentSSave) {
                PresentSSave = await ElementIsPresent(page, xPathSuccessSave);
            }
            if(await Date.now() - startTime > 65000) {
                await console.log('page NOT load > 65 sec !!!');
                return PresentSSave;
            }
        }

        return PresentSSave;


    }catch (e) {
        return false;
    }
};
//-----------------------------------------------------------------------------------
WaitForElementIsPresentByXPath  = async function (timeMS, page, MyXPath) {
    let startTime = await Date.now();
    let linkHandlers;
    try {
        while (true) {
            await page.waitFor(200);
            linkHandlers = await page.$x(MyXPath);
            if (linkHandlers.length > 0) {
                return true;
            }
            if ((await Date.now() - startTime) > timeMS) {
                //await console.log('Element:',MyXPath,' Not Present >', timeMS, 'ms');
                return false;
            }
        }
    }catch (e) {
        await console.log(`catch Error => WaitForElementIsPresentByXPath(${MyXPath})`);
        await console.log(`ERROR => ${e}`);
        return false;
    }
};
//-----------------------------------------------------------------------------------
ElementIsPresent = async function (page , MyXPath) {
    const linkHandlers = await page.$x(MyXPath);
    if (linkHandlers.length > 0) {
        return true;
    }else{
        return false;
    }
};
//-----------------------------------------------------------------------------------
ElementIsPresentNum = async function (page, Num, MyXPath) {
    const linkHandlers = await page.$x(MyXPath);
    if (linkHandlers.length > (Num + 1) ) {
        return true;
    }else{
        return false;
    }
};
//-----------------------------------------------------------------------------------
ElementGetLength = async function (page , MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        return linkHandlers.length;
    }catch (e) {
        return -1;
    }
};
ElementGetCheckedNum = async function (page , MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length;
        let PropC;
        if ( MaxL > 0 ) {
            let i = 0;
            do{
                PropC = await page.evaluate(elm => elm.checked, linkHandlers[i]);
                if (PropC) {
                    return i;
                }
                i++;
            }while (i < MaxL);

            return -1;
        } else {
            return -1;
        }
    }catch (e) {
        return -1;
    }
};
ElementGetValue = async function (page , Num, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropValue;
        if (Num > MaxL){
            return '';
        }else{
            PropValue = await page.evaluate(elm => elm.value, linkHandlers[Num]);
            return PropValue;
        }
    }catch (e) {
        return '';
    }
};
ElementGetInnerText = async function (page , Num, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropInnerText;
        if (Num > MaxL){
            return '';
        }else{
            PropInnerText = await page.evaluate(elm => elm.innerText, linkHandlers[Num]);
            return PropInnerText;
        }
    }catch (e) {
        return '';
    }
};
ElementGetHref = async function (page , Num, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropInnerText;
        if (Num > MaxL){
            return '';
        }else{
            PropInnerText = await page.evaluate(elm => elm.href, linkHandlers[Num]);
            return PropInnerText;
        }
    }catch (e) {
        return '';
    }
};
ElementGetDisabled = async function (page , Num, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropInnerText;
        if (Num > MaxL){
            return '';
        }else{
            PropInnerText = await page.evaluate(elm => elm.disabled, linkHandlers[Num]);
            return PropInnerText;
        }
    }catch (e) {
        return '';
    }
};
ElementGetClass = async function (page , Num, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropInnerText;
        if (Num > MaxL){
            return '';
        }else{
            PropInnerText = await page.evaluate(elm => elm.class, linkHandlers[Num]);
            return PropInnerText;
        }
    }catch (e) {
        return '';
    }
};
ElementSetTest = async function (page , Num, MyXPath) {//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropInnerText;
        if (Num > MaxL){
            return '';
        }else{
            PropInnerText = await page.evaluate(elm => elm.aria-hidden, linkHandlers[Num]);
            return PropInnerText;
        }
    }catch (e) {
        return '';
    }
};
ElementIsChecked = async function (page , Num, MyXPath) {
  try {
      const linkHandlers = await page.$x(MyXPath);
      let PropChecked = await page.evaluate(elm => elm.checked, linkHandlers[Num]);
      return PropChecked;
  }catch (e) {
      return undefined;
  }
};
//-----------------------------------------------------------------------------------
ClickByXPath = async function (page , MyXPath) {
    try {
    const linkHandlers = await page.$x(MyXPath);

        if ((await linkHandlers.length) > 0) {
            //await linkHandlers[0].click({ clickCount:20, delay: 500 });
            // await linkHandlers[0].hover();
            // await page.waitFor(500);
            await linkHandlers[0].click();
            //await linkHandlers[0]._scrollIntoViewIfNeeded()
            //await page.evaluate(el => el.click(), linkHandlers[0]);
            return true;
        } else {
            //await console.log('Ошибка внутр ClickByXPath:(linkHandlers.length=',linkHandlers.length , ')','\n');
            return false;
        }
    }catch (e) {
        //await console.log('Ошибка внутр ClickByXPath:', e ,'\n');
        return false;
    }
};
//-----------------------------------------------------------------------------------
HoverByXPath = async function (page , MyXPath) {
    const linkHandlers = await page.$x(MyXPath);
    try {
        if ((await linkHandlers.length) > 0) {

            await linkHandlers[0].hover();

            return true;
        } else {
            await console.log('Ошибка внутр HoverByXPath:(linkHandlers.length=',linkHandlers.length , ')','\n');
            return false;
        }
    }catch (e) {
        await console.log('Ошибка внутр HoverByXPath:', e ,'\n');
        return false;
    }
};
ClickByXPathNum = async function (page ,Num ,MyXPath) { // Отсчёт с 1 !!!
    const linkHandlers = await page.$x(MyXPath);
    try {
        if (await linkHandlers.length >= Num) {
            //await linkHandlers[0].click({ clickCount:20, delay: 500 });
            await linkHandlers[Num - 1].click();
            //await page.evaluate(el => el.click(), linkHandlers[0]);
            return true;
        } else {
            return false;
        }
    }catch (e) {
        return false;
    }
};
//-----------------------------------------------------------------------------------
ClickByXPathWithScroll = async function (timeMS, page , MyXPath) {
    let startTime = await Date.now();
    const elHandle = await page.$x(MyXPath);
    try {
        if (await elHandle.length > 0) {

            await page.evaluate(el => el.scrollIntoView(), elHandle[0]);
            await page.waitFor(500);
            while (!await ClickByXPath(page, MyXPath)) {
                await page.waitFor(100);
                if( (await Date.now() - startTime) > timeMS ) {
                    //await console.log('Element:',MyXPath,' Not Present >', timeMS, 'ms');
                    return false;
                }
            }
            return true;
        }else {
            return false;
        }
    }catch (e) {
        return false;
    }
};
//-----------------------------------------------------------------------------------
ClickByXPathNumWithScroll = async function (timeMS, page ,Num , MyXPath) { // Num отсчёт с 1 !!!
    let startTime = await Date.now();
    const elHandle = await page.$x(MyXPath);
    try {
        if (await elHandle.length >= Num) {

            await page.evaluate(el => el.scrollIntoView(), elHandle[Num - 1]);
            await page.waitFor(500);
            while (!await ClickByXPath(page, MyXPath)) {
                await page.waitFor(100);
                if( (await Date.now() - startTime) > timeMS ) {
                    //await console.log('Element:',MyXPath,' Not Present >', timeMS, 'ms');
                    return false;
                }
            }
            return true;
        }else {
            return false;
        }
    }catch (e) {
        return false;
    }
};
//--------------------------------------------------------------------------------
SelectFromList = async function (page, selectorList, valueItem ) {
    try {
        await page.select(selectorList, valueItem);
        return true;
    }catch (e) {
        return false;
    }
};
//--------------------------------------------------------------------------------
GetDataFromList = async function (page, xPath ) {
    //let DataArray = [{returnResult : false}];
    let Data = {};

    let linkHandlers;
    let PropInnerText;
    let PropValue;
    let MaxL;
    let Num;
    let i;
    Data.returnStatus = false;
    Data.returnList = [];
    try {
        linkHandlers = await page.$x(xPath);
        MaxL = await linkHandlers.length ;
        if (MaxL < 1) {
            throw `GetDataFromList => Длина списка(${xPath}) меньше 1 !!!`;
        }

        //await console.log('MaxL=', MaxL , 'xPath(', xPath , ')');
        for (Num = 0; Num < MaxL; Num++) {

            PropValue = await page.evaluate(elm => elm.value, linkHandlers[Num]);
            if ((PropValue === '')||(PropValue === undefined)){
                PropValue = '';
            }else {
                PropValue = PropValue.trim();
                PropInnerText = await page.evaluate(elm => elm.innerText, linkHandlers[Num]);
                if (PropInnerText === undefined){ PropInnerText = '';}
                PropInnerText = PropInnerText.trim();
                Data.returnList.push({PropValue : PropValue, PropInnerText : PropInnerText});
            }
        }
        Data.returnStatus = true;
    }catch (e) {
        Data.returnError = e;
        //await console.log('returnError(',e , ')');
    }
    return Data;
};
//------------------------
TempStop = async function(page){
    await console.log('Временно СТОП');
    await page.waitFor(98765400);
};
//--------------------
LogoClick = async function(page){
  let resOk;
    try {
        resOk = await ClickByXPath(page, '//div[@class="logo__icon"]');
        if (!resOk){
            await console.log('FAIL => ClickByXPath(//div[@class="logo__icon"])');
            throw 'FAIL => ClickByXPath(//div[@class="logo__icon"])';

        }
      //await page.click("div[class=logo__icon]");
      // //div[contains(text(), "Вітаємо вас в системі FOX CRM")]
        resOk = await WaitForElementIsPresentByXPath(16000, page, '//div[contains(text(), "Вітаємо вас в системі FOX CRM")]');
        if (!resOk){

            await console.log('FAIL => WaitForElementIsPresentByXPath(//div[contains(text(), "Вітаємо вас в системі FOX CRM")])');
            //await TempStop(page);
            throw 'FAIL => WaitForElementIsPresentByXPath(//div[contains(text(), "Вітаємо вас в системі FOX CRM")])';
        }
      return true;


  }catch (e) {
      return false;
  }
};
//-----------------------
SetInput = async function(page, Selector, strText){
  try{

      const input = await page.$(Selector);
      await input.click({ clickCount: 3 })
      await input.type(strText);

      // await page.click(Selector);
      // await page.type(Selector,strText);
      return true;
  }catch (e) {
      return false;
  }
};
//-----------------------
SetInputByXPath = async function(page, xPath, strText){
    try{

        const input = await page.$x(xPath);
        await input[0].click({ clickCount: 3 });
        await input[0].type(strText);

        // await page.click(Selector);
        // await page.type(Selector,strText);
        return true;
    }catch (e) {
        return false;
    }
};
// DEAL --------------------------------------------------------------------------
ClickDealCreateNewPlus = async  function( page ){
    try {
        await page.hover('a[href="/deal"]');

        await page.hover('a[href="/deal-save"]');

        await page.click('a[href="/deal-save"]');

        return true;
    }catch (e) {
        return false;
    }
};
EnterDealPointLoading = async  function( page , strEnter){
    let resOk;
    try {
        await ClickByXPath(page, '//div[@name="point_loadings"]/div/div[@class="select__zone"]');

        await ClickByXPath(page, '//div[@name="point_loadings"]/div/input[@class="select__input"]');

        await page.waitFor(500);

        await TypeByXPath(page, '//div[@name="point_loadings"]/div/input[@class="select__input"]', strEnter);

        resOk = await await WaitForElementIsPresentByXPath(15000, page, `//span[@class="pac-matched"][contains(text(), "${strEnter}")]`);
        if (!resOk){
            if(await ElementIsPresent(page, '//span[contains(text(), "Не вдається завантажити Карти Google на цій сторінці.")]')){
                throw "Не вдається завантажити Карти Google на цій сторінці.";
            }
            throw ` Не Найдено ${strEnter}`;
        }
        resOk = await ClickByXPath(page, `//span[@class="pac-matched"][contains(text(), "${strEnter}")]`);
        if (!resOk){
            throw ` ClickByXPath(//span[@class="pac-matched"][contains(text(), "${strEnter}")])`;
        }

        await page.waitFor(500);

        let xP = `//div[@name="point_loadings"]/div/div[@class="select__zone"]/div[@class="select__item"]/span`;
        resOk = await WaitForElementIsPresentByXPath(15000, page, xP);
        if (!resOk){
            throw ` WaitForElementIsPresentByXPath(${xP})`;
        }

        let sT = await ElementGetInnerText(page , 0, xP);

        if (!sT.includes(strEnter)) {
            throw ` InnerText:"${sT}" Not !sT.includes(${strEnter})`;
        }

        return true;
    }catch (e) {
        await console.log('     Ошибка => function EnterDealPointLoading =>(', e,')');
        g_StrOutLog+=`\n Ошибка => function EnterDealPointLoading =>(${e})\n`;
        return false;
    }
};
EnterDealPointUnLoading = async  function( page , strEnter){
    let resOk;
    try {
        await ClickByXPath(page, '//div[@name="point_unloading"]/div/div[@class="select__zone"]');

        await ClickByXPath(page, '//div[@name="point_unloading"]/div/input[@class="select__input"]');

        await page.waitFor(500);

        await TypeByXPath(page, '//div[@name="point_unloading"]/div/input[@class="select__input"]', strEnter);

        resOk = await WaitForElementIsPresentByXPath(15000, page, `//span[@class="pac-matched"][contains(text(), "${strEnter}")]`);
        if (!resOk){
            if(await ElementIsPresent(page, '//span[contains(text(), "Не вдається завантажити Карти Google на цій сторінці.")]')){
                throw "Не вдається завантажити Карти Google на цій сторінці.";
            }
            // TEMP!!!!!!!!!!
            await console.log(` WaitForElementIsPresentByXPath(Не Найдено ${strEnter})`);
            //await TempStop(page);
            throw ` Не Найдено ${strEnter}`;
        }

        resOk = await ClickByXPath(page, `//span[@class="pac-matched"][contains(text(), "${strEnter}")]`);
        if (!resOk){
            throw ` ClickByXPath(//span[@class="pac-matched"][contains(text(), "${strEnter}")])`;
        }

        await page.waitFor(500);

        let xP = `//div[@name="point_unloading"]/div/div[@class="select__zone"]/div[@class="select__item"]/span`;
        resOk = await WaitForElementIsPresentByXPath(15000, page, xP);
        if (!resOk){
            // TEMP!!!!!!!!!!
            await console.log(` WaitForElementIsPresentByXPath(${xP})`);
            //await TempStop(page);
            throw ` WaitForElementIsPresentByXPath(${xP})`;
        }

        let sT = await ElementGetInnerText(page , 0, xP);

        if (!sT.includes(strEnter)) {
            throw ` InnerText:"${sT}" Not !sT.includes(${strEnter})`;
        }

        return true;
    }catch (e) {
        await console.log('     Ошибка => function EnterDealPointUnLoading =>(', e,')');
        g_StrOutLog+=`\n Ошибка => function EnterDealPointUnLoading =>(${e})\n`;
        return false;
    }
};

// DEAL------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
// ClickByXPath = async function (page , MyXPath) {
//     const linkHandlers = await page.$x(MyXPath);
//     try {
//         if (await linkHandlers.length > 0) {
//             await linkHandlers[0].scrollIntoView;
//             await page.waitFor(1000);
//             await linkHandlers[0].click();
//             return true;
//         } else {
//             return false;
//         }
//     }catch (e) {
//         await console.log('Element:',MyXPath,' Error', e, 'ms');
//         return false;
//     }
//}
//-----------------------------------------------------------------------------------
TypeByXPath = async function (page , MyXPath, MyText) {
    const linkHandlers = await page.$x(MyXPath);
    if (linkHandlers.length > 0) {
        await linkHandlers[0].type(MyText);
        return true;
    }else{
        return false;
    }

}
//-----------------------------------------------------------------------------------
NameFunction = function() {
    return NameFunction.caller.name;
}
//-----------------------------------------------------------------------------------
randomInt = function(low, high) {
    return Math.floor(Math.random() * (high + 1 - low) + low);
}
//-----------------------------------------------------------------------------------
msToHHMMSS = function(ms_num) {
    let sec_num =Math.floor(ms_num / 1000);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    //return hours+':'+minutes+':'+seconds;
    //return 'Ч:'+hours+' М:'+minutes+' С:'+seconds;
    return hours+' час, '+minutes+' мин, '+seconds+' сек';
}
//-----------------------------------------------------------------------------------
SaveTempPictureFromURL = async function(browser, strPicURL, MyFileName) {
    // https://sapb1cloud.ru/files/komdir.png
    let page;
    let filePath;
    try {
    page = await browser.newPage();

    let width = 1200;
    let height = 880;
    await page.setViewport({width, height});
    const fs = require('fs');

        let viewSource = await page.goto(strPicURL);
        let StatusX = await viewSource._status;
        //await console.log('StatusX:',StatusX,':');
        if (StatusX !== 200 ) {
            throw 'StatusX !== 200' // <- специальный вызов ошибки !!!
        }
        // Проверим, существует ли папка, если нет — создадим её
        const imagesDirectory = './temp_images/';
        if (!fs.existsSync(imagesDirectory)) {
            fs.mkdirSync(imagesDirectory);
        }

        filePath = imagesDirectory + MyFileName;
        fs.writeFileSync(filePath, await viewSource.buffer(), async function (err) {
            if (err) {
                await console.log(err);
                await page.close();
                return '';
            }
            await console.log("The file was saved!");
        });
    }catch (e) {
        filePath = '';
    }
    await page.close();

    return filePath;
};
SaveTempPictureFromRandomURL = async function(browser, MyArrayName, Num) {// Num c 0 до Length -1 ; Num == -1 => Num = Rand
    let RandNum;
    let MyFilePath;
    let strPicURL;
    let NumTry = 0;
    let MaxTry = g_ArrayURL[MyArrayName].length;
    if (Num > g_ArrayURL[MyArrayName].length - 1 ){ Num = g_ArrayURL[MyArrayName].length - 1;}
    do {
        NumTry++;
        if (Num === -1) {
            RandNum = await randomInt(0, g_ArrayURL[MyArrayName].length - 1);
        }else {
            RandNum = Num;
            NumTry = MaxTry;
        }
        strPicURL = g_ArrayURL[MyArrayName][RandNum];

        MyFilePath = await SaveTempPictureFromURL(browser, strPicURL, 'temp_picture.png');
        if (MyFilePath === ''){
            await console.log(`MyArrayName=${MyArrayName}[${RandNum}] <= FAIL!!!`);
        }
    }while ((MyFilePath === '')&&(NumTry < MaxTry) );

    return MyFilePath;
};
//----------------------------------------------------------------------------------
GetFunnyStr = async function(MyArrayName) {

    let RandNum = await randomInt(0, g_ArraySTR[MyArrayName].length - 1);

    return g_ArraySTR[MyArrayName][RandNum];
};
GetFunnyUrl = async function(MyArrayName) {

    let RandNum = await randomInt(0, g_ArrayURL[MyArrayName].length - 1);

    return g_ArrayURL[MyArrayName][RandNum];
};
//-----------------------------------------------------------------------------------
InsertPhoto = async function(browser , page, MyArrayName, Num, MyXPath) {
    try {
        let MyFilePath = await SaveTempPictureFromRandomURL(browser, MyArrayName, Num);
        if (MyFilePath !== '') {
            //let xpDriverLicensePhoto = '//div[@class="zone"][./div[contains(text(), "Тех. Паспорт")]]/div[@id="dropzone"]';
            //await ClickByXPath(page, MyXPath);
            await page.waitFor(1000);
            let [fileChooserDPhoto] = await Promise.all([
                //ClickByXPath(page, MyXPath),
                //page.waitFor(500),
                page.waitForFileChooser(),
                //page.waitFor(500),
                ClickByXPathWithScroll(2000, page, MyXPath)
                //page.waitFor(500),
            ]);
            //await ClickByXPath(page, MyXPath);
            await fileChooserDPhoto.accept([MyFilePath]);
            await page.waitFor(3000);
            //await DeleteTempPicture(MyFilePath);
            //await fileChooser.cancel();
            //await page.waitFor(1111500);
            //let Href = await ElementGetHref(page,0, '//div[@class="dz-image"]/a[@target="_blank"]');
            //let Href = await ElementGetHref(page,0, '//a[@target="_blank"]');


            return true;
        }
    }catch (e) {
        await console.log(`Ошибка => ${e}`);
    }

    return false;
};
//-----------------------------------------------------------------------------------
DeleteTempPicture = async function(MyFileName) {
    const fs = require('fs');
    if (fs.existsSync(MyFileName)) {
        fs.unlinkSync(MyFileName);
    }

};
//-----------------------------------------------------------------------------------
TrimCompanyName = async function(strCompanyName) {
    let pos;
    pos = strCompanyName.indexOf('"', 0);
    if (pos>=0) {
        strCompanyName = strCompanyName.slice(pos + 1);
    }
    strCompanyName = strCompanyName.trim();

    pos = strCompanyName.indexOf('"', 0);
    if (pos>0){
        strCompanyName = strCompanyName.slice(0,pos);
    }
    strCompanyName = strCompanyName.trim();

    return strCompanyName;
};
//-----------------------------------------------------------------------------------
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return 'Ч:'+hours+' М:'+minutes+' С:'+seconds;
}
//-----------------------------------------------------------------------------------
// const linkHandlers = await page.$x("//a[contains(text(), 'Some text')]");
//
// if (linkHandlers.length > 0) {
//     await linkHandlers[0].click();
// } else {
//     throw new Error("Link not found");
// }
