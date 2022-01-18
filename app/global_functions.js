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
WaitUntilXPathExist = async function (page, mSec, xPath, print = false) {
    let resOk;
    let startTime = await Date.now();
    try {
        if (!await WaitForElementIsPresentByXPath(500, page, xPath)){
            if (print) {
                await console.log(`WaitUntilXPathExist - не вижу (${xPath})`);
            }
        }else{
            if (print) {
                await console.log(`WaitUntilXPathExist - ВИЖУ ОК (${xPath})`);
            }
        }
        while (await ElementIsPresent(page, xPath)){ // Ждём пока xPath присутствует
            await page.waitFor(100);
            if(await Date.now() - startTime > mSec) { // Если прошло больше mSec сек то выход!!!
                return false;
            }
        }
        return true;
    } catch (e) {
        await console.log(`WaitUntilXPathExist ERROR (${e})`);
        return false;
    }
};
//-----------------------------------------------------------------------------------
WaitSpinner = async function (page, mSec=31000, print=false) {
    let xPath = `//span[@class="spinner-border"]`;
    let startTime = await Date.now();
    try {
        if (!await WaitForElementIsPresentByXPath(500, page, xPath)){
            if (print) {
                await console.log(`WaitSpinner - не вижу (${xPath})`);
            }
        }else{
            if (print) {
                await console.log(`WaitSpinner - ВИЖУ ОК (${xPath})`);
            }
        }
        while (await ElementIsPresent(page, xPath)){ // Ждём пока xPath присутствует
            await page.waitFor(100);
            if(await Date.now() - startTime > mSec) { // Если прошло больше mSec сек то выход!!!
                return false;
            }
        }
        return true;
    } catch (e) {
        await console.log(`WaitSpinner ERROR (${e})`);
        return false;
    }
};
//-------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
WaitProcessing = async function (page, mSec=31000, print=false) {
    // section class="crm-view crm-view--contact crm-view__processing"
    let xPath = `//section[contains(@class, "processing")]`;
    let startTime = await Date.now();
    try {
        if (!await WaitForElementIsPresentByXPath(500, page, xPath)){
            if (print) {
                await console.log(`WaitProcessing - не вижу (${xPath})`);
            }
        }else{
            if (print) {
                await console.log(`WaitProcessing - ВИЖУ ОК (${xPath})`);
            }
        }
        while (await ElementIsPresent(page, xPath)){ // Ждём пока xPath присутствует
            await page.waitFor(100);
            if(await Date.now() - startTime > mSec) { // Если прошло больше mSec сек то выход!!!
                return false;
            }
        }
        return true;
    } catch (e) {
        await console.log(`WaitProcessing ERROR (${e})`);
        return false;
    }
};
//-------------------------------------------------------------------------------

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
// WaitUntilPageLoads  = async function (page) {
//     // span[class=spinner-border]
//     //let cssSelector = `html[class=nprogress-busy]`;
//     let cssSelector = `span[class=spinner-border]`;
//
//     let startTime = await Date.now();
//     try {
//         // Ждём селектор (html[class=nprogress-busy])
//         await page.waitForSelector(cssSelector, { timeout: 2000});
//
//         // Теперь ждём пока не пропадёт селектор (html[class=nprogress-busy])
//         while (await page.$(cssSelector) !== null){
//             // Если прошло больше 35 сек то выход!!!
//             if(await Date.now() - startTime > 65000) {
//                 await console.log('page NOT load > 65 sec !!!');
//                 return false;
//             }
//         }
//         await console.log('page load');
//         return true;
//     } catch (e) {
//         //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads => error=>",e, '\x1b[0m');
//         return true;
//     }
// };

//-----------------------------------------------------------------------------------
WarningsClick = async function (page, timeout = 1000) {

    try {
        let myXPath = `//div[@class="notification-content"]`;
        let ResOk;
        let strInnerText;
        let qLength;

        ResOk = await WaitForElementIsPresentByXPath(timeout, page, myXPath );
        if (!ResOk){
            return '';
        }else {
            qLength = await ElementGetLength(page, myXPath);
            strInnerText = await ElementGetInnerText(page, qLength-1, myXPath);
            await console.log('\x1b[38;5;3m\t', `WarningsClick => (${strInnerText})`, '\x1b[0m');
            ResOk = await ClickByXPathNum(page, qLength-1, myXPath);
            await WaitUntilPageLoads(page);
            qLength = await ElementGetLength(page, myXPath);
            while (qLength>0) {
                strInnerText+= `; ${await ElementGetInnerText(page, qLength-1, myXPath)}`;
                ResOk = await ClickByXPathNum(page, qLength-1, myXPath);
                await WaitUntilPageLoads(page);
                qLength = await ElementGetLength(page, myXPath);
            }
            return strInnerText;
        }

    }catch (e) {
        await console.log('\x1b[38;5;1m', "WarningsClick => error=>",e, '\x1b[0m');
        return false;
    }
}
//-----------------------------------------------------------------------------------
WarningsRead = async function (page, timeout = 1000, print = true) {
    try {
        // class="vue-notification-template vue-notification error"
        let myXPath = `//div[@class="notification-content"]`;
        let ResOk;
        let strInnerText = '';
        let strWarningOutput = '';
        let qLength;
        let Num = 0;
        ResOk = await WaitForElementIsPresentByXPath(timeout, page, myXPath );
        if (!ResOk){
            return '';
        }else {
            qLength = await ElementGetLength(page, myXPath);
            Num = qLength;
            while (Num>0){
                strInnerText = await ElementGetInnerText(page, Num-1, myXPath);
                if (strWarningOutput === ''){
                    strWarningOutput = strInnerText;
                }else{
                    strWarningOutput+= ' ; '+ strInnerText;
                }
                if (print) {
                    await console.log('\x1b[38;5;3m\t', `WarningsRead => (${strInnerText})`, '\x1b[0m');
                }
                --Num;
            }
            return strWarningOutput;
        }
    }catch (e) {
        await console.log('\x1b[38;5;1m', "WarningsRead => error=>",e, '\x1b[0m');
        return false;
    }
}
//-----------------------------------------------------------------------------------
WarningsRemove = async function (page, timeout = 1000) {

    try {
        let myXPath = `//div[@class="notification-content"]`;
        let ResOk;
        let strInnerText;
        let qLength;

        ResOk = await WaitForElementIsPresentByXPath(timeout, page, myXPath );
        if (!ResOk){
            return '';
        }else {
            qLength = await ElementGetLength(page, myXPath);
            strInnerText = await ElementGetInnerText(page, qLength-1, myXPath);
            //await console.log('\x1b[38;5;3m', `         WarningsClick => (${strInnerText})`, '\x1b[0m');
            ResOk = await ClickByXPathNum(page, qLength-1, myXPath);
            //await WaitUntilPageLoads(page);
            qLength = await ElementGetLength(page, myXPath);
            while (qLength>0) {
                strInnerText+= `; ${await ElementGetInnerText(page, qLength-1, myXPath)}`;
                ResOk = await ClickByXPathNum(page, qLength-1, myXPath);
                //await WaitUntilPageLoads(page);
                qLength = await ElementGetLength(page, myXPath);
            }
            return strInnerText;
        }
    }catch (e) {
        await console.log('\x1b[38;5;1m', "WarningsRemove => error=>",e, '\x1b[0m');
        return false;
    }
}
//-----------------------------------------------------------------------------------
OutToConsoleInnerTextByXPAth = async function (page, xPath) {
    try {    // Вывести в консоль внутренний текст из элементов по xPath
        let strTemp;
        let tempLength = await ElementGetLength(page, xPath);
        --tempLength;
        await console.log(`--- OutToConsoleInnerTextByXPAth Length=${tempLength} -------------`);

        for (let i = 0; i <= tempLength; i++) {

            strTemp = await ElementGetInnerText(page, i, xPath);
            await console.log(`'${strTemp}',`);
        }
        await console.log(`--- End OutToConsoleInnerTextByXPAth -------------`);
        return true;
    }catch (e) {
        await console.log('\x1b[38;5;1m', "OutToConsoleByXPAth => error=>",e, '\x1b[0m');
        return false;
    }
}
//-----------------------------------------------------------------------------------
WaitUntilPageLoads  = async function (page) {

    try {

        let data = await page.evaluate(
            () =>  Array.from(document.querySelectorAll('*'))
                .map(elem => elem.tagName)
        );
        await page.waitFor(100);
        let data1 = await page.evaluate(
            () =>  Array.from(document.querySelectorAll('*'))
                .map(elem => elem.tagName)
        );
        await page.waitFor(100);
        let data2 = await page.evaluate(
            () =>  Array.from(document.querySelectorAll('*'))
                .map(elem => elem.tagName)
        );
        await page.waitFor('*');
        await page.waitFor(100);

        //console.log(data);
        //await console.log('page load');
        return true;
    } catch (e) {
        //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads => error=>",e, '\x1b[0m');
        return false;
    }
};
//-----------------------------------------------------------------------------------
WaitHTMLRendered = async function (page, timeout = 30000) {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;

    while(checkCounts++ <= maxChecks){
        let html = await page.content();
        let currentHTMLSize = html.length;

        let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

        console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

        if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
            countStableSizeIterations++;
        else
            countStableSizeIterations = 0; //reset the counter

        if(countStableSizeIterations >= minStableSizeIterations) {
            console.log("Page rendered fully..");
            break;
        }

        lastHTMLSize = currentHTMLSize;
        await page.waitFor(checkDurationMsecs);
    }
};
//------------------------------------------------------------------------------------
WaitRender = async function (page, timeout = 30000) {
    const checkDurationMsecs = 100;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;
    await WaitMS(checkDurationMsecs);

    while(checkCounts++ <= maxChecks){
        let html = await page.content();
        let currentHTMLSize = html.length;

        let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

        //console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

        if(lastHTMLSize !== 0 && currentHTMLSize === lastHTMLSize)
            countStableSizeIterations++;
        else
            countStableSizeIterations = 0; //reset the counter

        if(countStableSizeIterations >= minStableSizeIterations) {
            //console.log("Page rendered fully..");
            break;
        }

        lastHTMLSize = currentHTMLSize;
        //await page.waitFor(checkDurationMsecs);
        await WaitMS(checkDurationMsecs);
    }
};
//------------------------------------------------------------------------------------
WaitMS = async function(timeMS= 100){
    try {
        await new Promise(resolve => setTimeout(resolve, timeMS));
        return true;
    }catch (e) {
        await console.log('\x1b[38;5;1m', `WaitMS(${timeMS}) => error=>`,e, '\x1b[0m');
        return false;
    }
}
//------------------------------------------------------------------------------------
WaitForBrowserNewPage = async function(browser, qPages, timeMS=1000){
    let TempLenPages;
    let AllPages;
    let startTime = await Date.now();
    try{
        AllPages = await browser.pages();
        TempLenPages = AllPages.length;
        while (TempLenPages < qPages){
            await WaitMS(100);
            AllPages = await browser.pages();
            TempLenPages = AllPages.length;
            if((await Date.now() - startTime > timeMS) && (TempLenPages < qPages)) {
                return false;// <- Выход из Цикла !!!
            }
        }
        await AllPages[TempLenPages-1].bringToFront();//  С НУЛЯ !!!
        return true;
    }catch (e) {
        await console.log('\x1b[38;5;1m', `WaitForBrowserNewPage (${qPages}) => error=>`,e, '\x1b[0m');
        return false;
    }
}
//------------------------------------------------------------------------------------
ClickIfExistsUpdated  = async function (page) {

    try { let ResOK1, ResOK2, xPath;
        xPath = '//button[@type="button"][contains(text(),"Понятно")]';
        ResOK1= await WaitForElementIsPresentByXPath(1000, page, xPath);
        if (ResOK1) {
            ResOK2 = await ClickByXPath(page, xPath);
            if (!ResOK2) {
                throw `Fail -> ClickByXPath(contains(text(),"Понятно")`;
            }else {
                await page.waitFor(2000);
            }
        }else{
            return false;
        }

        //await console.log('          ClickIfExistsUpdated -> Кнопка "Понятно"');
        return true;
    } catch (e) {
        //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads => error=>",e, '\x1b[0m');
        return false;
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
ElementIsVisible0 = async function (page, xPath){
    const [element] = await page.$x(xPath);
    if (element === undefined) return false;

    return await page.evaluate((e) => {
        const style = window.getComputedStyle(e);
        return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }, element);
};
//-----------------------------------------------------------------------------------
ElementIsVisible = async function (page, xPathSelector){
    try {
        await page.waitForXPath(xPathSelector, { visible: true, timeout: 1000 });
        return true;
    } catch {
        return false;
    }
};
//-----------------------------------------------------------------------------------
WaitForElementIsPresentByXPath  = async function (timeMS, page, MyXPath) {
    let startTime = await Date.now();
    let linkHandlers;
    try {
        while (true) {
            //await page.waitFor(300);
            //await console.log(`1`);
            linkHandlers = await page.$x(MyXPath);
            //await console.log(`2`);
            if (linkHandlers.length > 0) {
                // if(MyXPath===`//button[@type="button"][@class="close"]`){
                //     await console.log(`1`);
                // }
                return true;
            }else {
                if ((await Date.now() - startTime) > timeMS) {
                    //await console.log('Element:',MyXPath,' Not Present >', timeMS, 'ms');
                    return false;
                }else {
                    // if(MyXPath===`//button[@type="button"][@class="close"]`){
                    //     await console.log(`0`);
                    // }
                    await page.waitFor(200);
                }
            }
        }
    }catch (e) {
        await console.log(`catch Error => WaitForElementIsPresentByXPath(${MyXPath})`);
        await console.log(`ERROR => ${e}`);
        return false;
    }
};
//-----------------------------------------------------------------------------------
WaitForElementIsPresentByXPathNum  = async function (timeMS, Num, page, MyXPath) {
    let startTime = await Date.now();
    let linkHandlers;
    try {
        while (true) {
            //await page.waitFor(300);
            //await console.log(`1`);
            linkHandlers = await page.$x(MyXPath);
            //await console.log(`2`);
            if (linkHandlers.length > Num) {
                // if(MyXPath===`//button[@type="button"][@class="close"]`){
                //     await console.log(`1`);
                // }
                return true;
            }else {
                if ((await Date.now() - startTime) > timeMS) {
                    //await console.log('Element:',MyXPath,' Not Present >', timeMS, 'ms');
                    return false;
                }else {
                    // if(MyXPath===`//button[@type="button"][@class="close"]`){
                    //     await console.log(`0`);
                    // }
                    await page.waitFor(200);
                }
            }
        }
    }catch (e) {
        await console.log(`catch Error => WaitForElementIsPresentByXPathNum(${Num})(${MyXPath})`);
        await console.log(`ERROR => ${e}`);
        return false;
    }
};
//-----------------------------------------------------------------------------------
ElementIsPresent = async function (page , MyXPath) {
    try {
         const linkHandlers = await page.$x(MyXPath);
         if (linkHandlers.length > 0) {
            return true;
         }else{
           return false;
         }
    }catch (e) {
        await console.log(`catch Error => ElementIsPresent(${MyXPath})`);
        await console.log(`ERROR => ${e}`);
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
//------------------------------------------------------------
ElementGetAttribute = async function (page , Num, strAttribute ,MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropValue;
        if (Num > MaxL){
            await console.log(`Fail!!! -> ElementGetAttribute("${strAttribute}")  -> Num=${Num} > MaxL=${MaxL}  return ""`);
            await console.log(`Fail!!! -> ElementGetAttribute(${MyXPath}) return ""`);

            return '';
        }else{
            PropValue = await page.evaluate((elm, strAttribute )=> elm.getAttribute(strAttribute), linkHandlers[Num], strAttribute);
            return PropValue;
        }
    }catch (e) {
        await console.log(`ElementGetAttribute -> catch (e) ${e}`);
        return '';
    }
};
//------------------------------------------------------------
ElementSetAttribute = async function (page , Num, strAttribute ,valAttribute, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        if (Num > MaxL){
            await console.log(`ElementSetAttribute("${strAttribute}")  -> Num=${Num} > MaxL=${MaxL}  return ""`);
            return false;
        }else{
            await page.evaluate((elm, strAttribute, valAttribute)=> elm.setAttribute(strAttribute, valAttribute), linkHandlers[Num], strAttribute, valAttribute);
            return true;
        }
    }catch (e) {
        await console.log(`ElementSetAttribute -> catch (e) ${e}`);
        return false;
    }
};
//------------------------------------------------------------
ElementRemoveAttribute = async function (page , Num, strAttribute ,MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropValue;
        if (Num > MaxL){
            await console.log(`ElementRemoveAttribute("${strAttribute}")  -> Num=${Num} > MaxL=${MaxL}  return ""`);
            return false;
        }else{
            PropValue = await page.evaluate((elm, strAttribute )=> elm.removeAttribute(strAttribute), linkHandlers[Num], strAttribute);
            return true;
        }

    }catch (e) {
        await console.log(`ElementRemoveAttribute -> catch (e) ${e}`);
        return false;
    }
};
//------------------------------------------------------------
ElementGetInnerText = async function (page , Num, MyXPath) { // с НУЛЯ
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        //await console.log(`     MaxL ${MaxL}`);
        let PropInnerText;
        if (Num > MaxL){
            return '';
        }else{
            PropInnerText = await page.evaluate(elm => elm.innerText, linkHandlers[Num]);
            return PropInnerText;
        }
    }catch (e) {
        await console.log('\x1b[38;5;1m', `FAIL -> ElementGetInnerText Num:${Num}; MyXPath:(${MyXPath})\n ${e} \n`, '\x1b[0m');
        return '';
    }
};
SubStrIsPresent = async function (SubStr , Str) {
    if (Str.indexOf(SubStr) !== -1) {
        return true;
    } else {
        return false;
    }
};
GetSubStrFromStr = async function (SubStr0 , SubStr1, Str) {
    let len0,pos0,pos1;
    pos0 = Str.indexOf(SubStr0);
    if (pos0 !== -1) {
        len0 = SubStr0.length;
        pos0 = pos0 + len0;
        pos1 = Str.indexOf(SubStr1,pos0);

        return Str.slice(pos0,pos1);
    } else {
        return ``;
    }
};
InsertSubStr = function (str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

GetIDFromHref = async function (Str) {
    // https://dev.cfo.tl.ee/crm/company/17691
    // return 17691
    try { let LP,strID;
    LP = Str.lastIndexOf('/');
    if (LP === -1){
        return '';
    }
    strID = Str.slice(LP + 1);
        return strID;

    }catch (e) {
        await console.log(`GetIDFromHref => ${e}`);
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
            PropInnerText = await page.evaluate(elm => elm.className , linkHandlers[Num]);
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
//
ClickByXPath = async function (page , MyXPath) {
    try {let resOk;
       //  resOk = await WaitForElementIsPresentByXPath(4000, page, MyXPath);
       //  //https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagewaitforxpathxpath-options
       //  // let resOk = await page.waitForXPath(MyXPath, {
       //  //     visible: true, timeout: 4000
       //  // }); // Возвращает ошибку в консоли, если не дождался или не видим
       // if (!resOk) {
       //     await console.log(`Ошибка внутр ClickByXPath/WaitForElementIsPresentByXPath:${MyXPath}`,'\n');
       //     return false;
       // }

       resOk = await ElementIsVisible(page, MyXPath);
        if (!resOk) {
            await console.log(`Ошибка внутр ClickByXPath/ElementIsVisible:${MyXPath}`,'\n');
            return false;
        }
        //await console.log(`ElementIsVisible${resOk}`,'\n');
    const linkHandlers = await page.$x(MyXPath);

        if ((await linkHandlers.length) === 1) {
            //await linkHandlers[0].click({ clickCount:20, delay: 500 });
            // await linkHandlers[0].hover();
            // await page.waitFor(500);
            await linkHandlers[0].click();
            //await linkHandlers[0]._scrollIntoViewIfNeeded()
            //await page.evaluate(el => el.click(), linkHandlers[0]);
            return true;
        } else {
            await console.log('Ошибка внутр ClickByXPath:( linkHandlers.length=',linkHandlers.length , ')','\n',`XPath=`,MyXPath,'\n');
            return false;
        }
    }catch (e) {
        await console.log(`Ошибка внутр ClickByXPath:${MyXPath}`, e ,'\n');
        return false;
    }
};
//-------------------------
ClickByXPathW = async function (page , MyXPath) {
    let startTime = await Date.now();
    let linkHandlers;
    let resOk;
    let ElPresent = false;
    let TimeOver = false;
    const timeMS = 4000;
    try {
        //  resOk = await WaitForElementIsPresentByXPath(4000, page, MyXPath);
        while (!ElPresent && !TimeOver ) {
            linkHandlers = await page.$x(MyXPath);
            if (linkHandlers.length > 0) {
                ElPresent = true;
            }else{
                if ((await Date.now() - startTime) > timeMS) {
                    TimeOver = true;
                }else{
                     await WaitMS(200);
                }
            }
        }// while (!ElPresent && !TimeOver )
        if (!ElPresent){
            return false;
        }
        resOk = await ElementIsVisible(page, MyXPath);
        if (!resOk) {
            //await console.log(`Ошибка внутр ClickByXPath/ElementIsVisible:${MyXPath}`,'\n');
            return false;
        }
        //await console.log(`ElementIsVisible${resOk}`,'\n');
        linkHandlers = await page.$x(MyXPath);

        if ((await linkHandlers.length) === 1) {
            await linkHandlers[0].click();
            return true;
        } else {
            await console.log('Ошибка внутр ClickByXPathW:( linkHandlers.length=',linkHandlers.length , ')','\n',`XPath=`,MyXPath,'\n');
            return false;
        }
    }catch (e) {
        await console.log(`Ошибка внутр ClickByXPathW:${MyXPath}`, e ,'\n');
        return false;
    }
};
//-------------------------
ClickByXPathWNum = async function (page ,Num, MyXPath) {
    let startTime = await Date.now();
    let linkHandlers;
    let ElPresent = false;
    let TimeOver = false;
    const timeMS = 4000;
    try {
        while (!ElPresent && !TimeOver ) {
            linkHandlers = await page.$x(MyXPath);
            if (linkHandlers.length > Num) {
                ElPresent = true;
            }else{
                if ((await Date.now() - startTime) > timeMS) {
                    TimeOver = true;
                }else{
                    // await page.waitFor(200);
                }
            }
        }// while (!ElPresent && !TimeOver )
        if (!ElPresent){
            return false;
        }
        await linkHandlers[Num].click();
        return true;
    }catch (e) {
        await console.log(`Ошибка внутр ClickByXPathWNum:${MyXPath}`, e ,'\n');
        return false;
    }
}; // ClickByXPathWNum
//-------------------------
MouseClickXY = async function (page , MX, MY) {
    try {
        await page.mouse.click(MX, MY);
        return true;
    }catch (e) {
        await console.log(`Ошибка внутр MouseClickXY(MX:${MX}; MY:${MY}) `, e ,'\n');
        return false;
    }
};
//-------------------------
ClickByXPath_PromiseAll = async function (page , MyXPath) {
    try {let resOk;
        //  resOk = await WaitForElementIsPresentByXPath(4000, page, MyXPath);
        //  //https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagewaitforxpathxpath-options
        //  // let resOk = await page.waitForXPath(MyXPath, {
        //  //     visible: true, timeout: 4000
        //  // }); // Возвращает ошибку в консоли, если не дождался или не видим
        // if (!resOk) {
        //     await console.log(`Ошибка внутр ClickByXPath/WaitForElementIsPresentByXPath:${MyXPath}`,'\n');
        //     return false;
        // }
        resOk = await ElementIsVisible(page, MyXPath);
        if (!resOk) {
            //await console.log(`Ошибка внутр ClickByXPath/ElementIsVisible:${MyXPath}`,'\n');
            return false;
        }
        //await console.log(`ElementIsVisible${resOk}`,'\n');
        const linkHandlers = await page.$x(MyXPath);

        if ((await linkHandlers.length) === 1) {
            //await linkHandlers[0].click({ clickCount:20, delay: 500 });
            // await linkHandlers[0].hover();
            // await page.waitFor(500);
            await Promise.all([
                //page.click('#submit_button'),
                linkHandlers[0].click(),
                page.waitForNavigation({ waitUntil: 'networkidle0' })
            ]);
            //await linkHandlers[0].click({waitUntil: networkidle0});
            //await linkHandlers[0]._scrollIntoViewIfNeeded()
            //await page.evaluate(el => el.click(), linkHandlers[0]);
            return true;
        } else {
            await console.log('Ошибка внутр ClickByXPath:( linkHandlers.length=',linkHandlers.length , ')','\n',`XPath=`,MyXPath,'\n');
            return false;
        }
    }catch (e) {
        await console.log(`Ошибка внутр ClickByXPath:${MyXPath}`, e ,'\n');
        return false;
    }
};
//-----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------- ({ clickCount: 2 });
DoubleClickByXPath = async function (page , MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);

        if ((await linkHandlers.length) > 0) {
            //await linkHandlers[0].click({ clickCount:20, delay: 500 });
            // await linkHandlers[0].hover();
            // await page.waitFor(500);
            await linkHandlers[0].click({ clickCount: 2 });
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
//-----------------------------------------------------------------------------------
HoverByXPathNum = async function (page, Num, MyXPath) {
    const linkHandlers = await page.$x(MyXPath);
    try {
        if ((await linkHandlers.length) > Num) {

            await linkHandlers[Num].hover();

            return true;
        } else {
            await console.log(`Ошибка внутр HoverByXPathNum(${Num}):(length=${linkHandlers.length})\n`);
            await console.log(`Ошибка внутр HoverByXPathNum(${MyXPath})\n`);
            return false;
        }
    }catch (e) {
        await console.log('Ошибка внутр HoverByXPathNum:', e ,'\n');
        await console.log(`Ошибка внутр HoverByXPathNum(${Num}):(length=${linkHandlers.length})\n`);
        await console.log(`Ошибка внутр HoverByXPathNum(${MyXPath})\n`);
        return false;
    }
};
//-----------------------------------------------------------------------------------
ClickByXPathNum = async function (page ,Num ,MyXPath) { // Отсчёт с 0 !!!
    const linkHandlers = await page.$x(MyXPath);
    try {
        if (await linkHandlers.length > Num) {
            //await linkHandlers[0].click({ clickCount:20, delay: 500 });
            await linkHandlers[Num].click();
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
ScrollByXPathNum = async function (page , MyXPath, Num=0) { // Num с Нуля !!!
    let elHandle;let resOk;
    try {
        resOk = await WaitForElementIsPresentByXPath(2000, page, MyXPath);
        if(resOk) {
            elHandle = await page.$x(MyXPath);
            if (await elHandle.length > Num) {
                await page.evaluate(el => el.scrollIntoView(), elHandle[0]);
                 await page.waitFor(500);
                return true; // <- OK Тут !!!!
            } else {
                await console.log(`Ошибка внутрення ScrollByXPathNum -> (elHandle.length:${elHandle.length} !> Num:${Num})`);
                return false;
            }
        }
        await console.log(`Ошибка внутрення ScrollByXPathNum -> WaitForElementIsPresentByXPath(${MyXPath})`);
        return false;
    }catch (e) {
        await console.log(`Ошибка внутрення ScrollByXPathNum -> (${e})`);
        return false;
    }
};
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
ClickByXPathWithScroll = async function (timeMS, page , MyXPath) {
    let startTime = await Date.now();
    const elHandle = await page.$x(MyXPath);
    try {
        if (await elHandle.length > 0) {

            await page.evaluate(el => el.scrollIntoView(), elHandle[0]);
            await page.waitFor(500);
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
ClickByXPathNumWithScroll = async function (timeMS, page ,Num , MyXPath) { // Num отсчёт с 0 !!!
    let startTime = await Date.now();
    const elHandle = await page.$x(MyXPath);
    try {
        if (await elHandle.length > Num) {

            await page.evaluate(el => el.scrollIntoView(), elHandle[Num]);
            await page.waitFor(500);
            while (!await ClickByXPathNum(page, Num, MyXPath)) {
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
dragAndDropX = async function (page, source,Num1, target, Num2) {
    await page.evaluate((source, target) => {
        //source = document.querySelector('#'+source);
        let sourceA = page.$x(source);

        let event = document.createEvent("CustomEvent");
        event.initCustomEvent("mousedown", true, true, null);
        event.clientX = sourceA[Num1].getBoundingClientRect().top;
        event.clientY = sourceA[Num1].getBoundingClientRect().left;
        sourceA[Num1].dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("dragstart", true, true, null);
        event.clientX = sourceA[Num1].getBoundingClientRect().top;
        event.clientY = sourceA[Num1].getBoundingClientRect().left;
        sourceA[Num1].dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("drag", true, true, null);
        event.clientX = sourceA[Num1].getBoundingClientRect().top;
        event.clientY = sourceA[Num1].getBoundingClientRect().left;
        sourceA[Num1].dispatchEvent(event);


        //target = document.querySelector('#'+target);
        let targetA = page.$x(target);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("dragover", true, true, null);
        event.clientX = targetA[Num2].getBoundingClientRect().top;
        event.clientY = targetA[Num2].getBoundingClientRect().left;
        targetA[Num2].dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("drop", true, true, null);
        event.clientX = targetA[Num2].getBoundingClientRect().top;
        event.clientY = targetA[Num2].getBoundingClientRect().left;
        targetA[Num2].dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("dragend", true, true, null);
        event.clientX = targetA[Num2].getBoundingClientRect().top;
        event.clientY = targetA[Num2].getBoundingClientRect().left;
        targetA[Num2].dispatchEvent(event);
    }, source, target);
}
//-------------------------------------------------------------------------------
dragAndDrop = async function(page, originSelector, destinationSelector) {
    try {
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
        return true;
    }catch (e) {
        return false;
    }
}//----
//-------------------------------------------------------------------------------
dragAndDropXpath = async function(page, originXPath, oNum, destinationXPath, dNum) {
  try {
      const originA = await page.$x(originXPath);
      const destinationA = await page.$x(destinationXPath);
      if (await originA.length < 1 || await destinationA.length < 1) {
          await console.log(` originA.length=${originA.length}   destinationA.length=${destinationA.length} `);
          return false;
      }

      const originBox = await originA[oNum].boundingBox();
      const destinationBox = await destinationA[dNum].boundingBox();
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
      const pageFunction = async (_originSelector,_oN, _destinationSelector,_dN, originPayload, destinationPayload) => {

          getElementByXpath =  async function (path, N) {

              const LH = await document.evaluate(path, document, null, XPathResult.ANY_TYPE, null);
              return LH[N];
          }

          let _origin = await getElementByXpath(_originSelector, _oN);
          let _destination = await getElementByXpath(_destinationSelector, _dN);
          // If has child, put at the end.
          //_destination = _destination.lastElementChild || _destination;

          // Init Events
          await _origin.dispatchEvent(new MouseEvent('pointerdown', originPayload));
          await _origin.dispatchEvent(new DragEvent('dragstart', originPayload));

          await new Promise((resolve) => setTimeout(resolve, 2000));
          _destination.dispatchEvent(new MouseEvent('dragenter', destinationPayload));
          _origin.dispatchEvent(new DragEvent('dragend', destinationPayload));
      };

      // Init drag and drop.
      await page.evaluate(
          pageFunction,
          originXPath,oNum,
          destinationXPath,dNum,
          getPayload(originBox),
          getPayload(destinationBox),
      );
      return true;
  }catch (e) {
      await console.log(`dragAndDropXpath catch (e) -> (${e})`);
      return false;
  }
};//dragAndDropXpath ----
//------------
pageCursor = async (big = false) => {
    // width: 50px;
    // height: 50px;
    // width: 70px;
    // height: 70px;
    // https://img.icons8.com/dusk/512/penis.png
    // margin-left: -20px;
    // margin-top: -4px;
    // border-radius: 50%;
    //-----
    // background: rgba(255,0,0,0.5);
    // transition: none;
    //let big = true;
    let WH=70;
    let BGS=50;
    if (big){
        WH=200;
        BGS=200;
    }else{

    }
        const box = document.createElement('div');
        box.classList.add('mouse-helper');
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
  .mouse-helper {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: ${WH}px;
    height: ${WH}px;
    background-color: transparent;
    
    background-image: url('https://img.icons8.com/dusk/512/penis.png'); 
    
    background-repeat: no-repeat;
    background-position: center;
    background-size: ${BGS}px;
    margin-left: -14px;
    margin-top: -12px;
    transition: background .2s, border-radius .2s, border-color .2s, transform 1s, margin-left 1s;
    z-index: 10000;
    transform: rotateY(180deg);
  }
  .mouse-helper.button-1 {
    
    
    transform: rotateY(0deg);
    margin-left: -54px;
    transition: background .2s, border-radius .2s, border-color .2s, transform .0s, margin-left .0s;
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
    };
// как использовать -> await page.evaluate(pageCursor);
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
TempStop = async function(page, WarnText=``){
    let dtEnd = new Date(Date.now());
    await console.log(`Временно СТОП \nDT:${dtEnd}`);
    let dtAll = dtEnd - g_StartTimeMS;
    let strDtAll = msToHHMMSS(dtAll);
    await console.log(`Времени от начала: ${strDtAll}`);
    if(WarnText!==``){
        await console.log(WarnText);
    }
    await page.waitFor(98765400);
};
//--------------------
LogoClick = async function(page){
  let resOk, xPath;
    try {
        xPath = `//img[@src="/img/LogoFoXTop.0890cee9.svg"][@class="logo-menu"]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk){
            await console.log(`FAIL => ClickByXPath(${xPath})`);
            throw `FAIL => ClickByXPath(${xPath})`;

        }
        await WaitRender(page);
        return true;

    }catch (e) {
        await console.log(`FAIL => LogoClick(${xPath})`);
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
    if (linkHandlers.length === 1) {
        await linkHandlers[0].type(MyText);
        return true;
    }else{
        await console.log(`Error => In TypeByXPath: length ${linkHandlers.length} !== 1`);
        return false;
    }
}// TypeByXPath = async function (page , MyXPath, MyText)
// Дождаться появления

//-----------------------------------------------------------------------------------
TypeByXPath__PromiseAll = async function (page , MyXPath, MyText) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        if (linkHandlers.length === 1) {
            //await linkHandlers[0].type(MyText);
            // const res = await Promise.all([
            //     linkHandlers[0].type(MyText),
            //     //linkHandlers[0].click(),
            //      page.waitForNavigation({ waitUntil: 'networkidle2' })
            //     //page.waitForNavigation({waitUntil: 'domcontentloaded'})
            //
            // ]);

            // const waitforNav = page.waitForNavigation({ waitUntil: 'networkidle0' ,timeout: 5000});
            // await linkHandlers[0].type(MyText);
            // await waitforNav;
            const [response] = await Promise.all([

                page.waitForNavigation({
                    waitUntil: 'load'
                }),
                linkHandlers[0].type(MyText)
            ]);

            return true;
        } else {
            return false;
        }
    }catch (e) {
        return false;
    }
}
//-----------------------------------------------------------------------------------
SetTextByXPath = async function (page , MyXPath, MyText) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        MyText = await MyText.toString();
        let TempText = await MyText.substr(0, MyText.length - 1);
        let LastText = await MyText.substr(MyText.length - 1, 1);
        if (linkHandlers.length === 1) {

            //await linkHandlers[0].click();

            // await console.log(`SetTextByXPath:(${MyText})`);
            // await console.log(`TempText:(${TempText})`);
            // await console.log(`LastText:(${LastText})`);

            await page.evaluate((el, value) => el.value = value, linkHandlers[0], TempText);
            await WaitRender(page);
            //await TypeByXPath(page , MyXPath, ' ');

            // await page.keyboard.sendCharacter(String.fromCharCode(32)); //32 - пробел; 13 - enter; 8 - Del
            // await page.waitFor(1000);
            // await page.keyboard.sendCharacter(String.fromCharCode(8));
            // await page.keyboard.press('Space');
            // await page.waitFor(50);
            // await page.keyboard.press('Backspace');
            await linkHandlers[0].type(LastText);

            //await console.log(`SetTextByXPath:(${MyText})`);

            return true;
        } else {
            await console.log(`Error => In SetTextByXPath: length ${linkHandlers.length} !== 1`);
            return false;
        }
    }catch (e) {
        await console.log(`Error => In SetTextByXPath: ${e}`);
        return false;
    }
}
//-----------------------------------------------------------------------------------
SetTextByXPathNum = async function (page , Num ,MyXPath, MyText) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        let TempText = await MyText.substr(0, MyText.length - 1);
        let LastText = await MyText.substr(MyText.length - 1, 1);
        if (linkHandlers.length > Num) {

            await page.evaluate((el, value) => el.value = value, linkHandlers[Num], TempText);

            await linkHandlers[Num].type(LastText);

            //await console.log(`SetTextByXPath:(${MyText})`);

            return true;
        } else {
            await console.log(`Error => In SetTextByXPathNum: length (${linkHandlers.length}) Num (${Num})`);
            return false;
        }
    }catch (e) {
        await console.log(`Error => In SetTextByXPathNum: ${e}`);
        return false;
    }
}
//-----------------------------------------------------------------------------------
TypeInPage = async function (page, MyText, tMS) { // работает ТОЛЬКО после успешного клика на Инпут
    try{
        await page.waitFor(200);
        await page.keyboard.type(MyText, {delay: tMS});
        return true;
    }catch (e) {
        await console.log(`Error => In TypeInPage: ${e}`);
        return false;
    }
}
//-----------------------------------------------------------------------------------
NameFunction = function() {
    try {
        return NameFunction.caller.name;
    }catch (e) {
        //console.log(`ERROR in NameFunction (${e})`);
        console.log(">>> DEBUG <<<", (e.stack.split("at ")[1]).trim());
        // Вы также можете добавить собственные аргументы в конце, например
        //
        // console.log("DEBUG", (new Error().stack.split("at ")[1]).trim(), ">>>", myVar);
        // Обратите внимание, что если вы поместите это во вспомогательную функцию, измените индекс стека, например, [1]на [2].

    }
}
//-----------------------------------------------------------------------------------
NameNameFunction = function() {
    try {
        const UpFunc = NameNameFunction.caller;
        return UpFunc.caller.name;
    }catch (e) {
        console.log(`ERROR in NameNameFunction (${e})`);
    }
}
//-----------------------------------------------------------------------------------
randomInt = async function(low, high) {
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
msToHHMMSSMS = function(ms_num) {
    let sec_num =Math.floor(ms_num / 1000);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let m_seconds = ms_num - (seconds * 1000) - (hours * 3600 * 1000) - (minutes * 60 * 1000);
    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (m_seconds < 10) {m_seconds = "00"+m_seconds;}
    else if(m_seconds < 100) {m_seconds = "0"+m_seconds;}
    //return hours+':'+minutes+':'+seconds;
    //return 'Ч:'+hours+' М:'+minutes+' С:'+seconds;
    return hours+' час, '+minutes+' мин, '+seconds+' сек, '+m_seconds+' мс';
}
msToMMSSMS = function(ms_num) {
    let sec_num =Math.floor(ms_num / 1000);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let m_seconds = ms_num - (seconds * 1000) - (hours * 3600 * 1000) - (minutes * 60 * 1000);
    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (m_seconds < 10) {m_seconds = "00"+m_seconds;}
    else if(m_seconds < 100) {m_seconds = "0"+m_seconds;}
    //return hours+':'+minutes+':'+seconds;
    //return 'Ч:'+hours+' М:'+minutes+' С:'+seconds;
    return minutes+' мин, '+seconds+' сек, '+m_seconds+' мс';
}
FRGB = function (FB,R,G,B) { // FB  - 0/1, (R G B - 0..5)
    if (FB === undefined) {return `\x1b[0m`;}
    //  https://en.wikipedia.org/wiki/ANSI_escape_code
    if (R>5){R=5}
    if (R<0){R=0}
    if (G>5){G=5}
    if (G<0){G=0}
    if (B>5){B=5}
    if (B<0){B=0}
    let N = 16 + 36 * R + 6 * G + B;
    let FBl;
    if (FB === 0) {
        FBl = 38;
    }else{
        FBl = 48;
    }
    return `\x1b[${FBl};5;${N}m`;
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
GetRandomStr = async function(MyArrayName) {
    let RandNum = await randomInt(0, g_ArraySTR[MyArrayName].length - 1);
    return g_ArraySTR[MyArrayName][RandNum];
};
GetFunnyUrl = async function(MyArrayName) {
    let RandNum = await randomInt(0, g_ArrayURL[MyArrayName].length - 1);
    return g_ArrayURL[MyArrayName][RandNum];
};
//-----------------------------------------------------------------------------------
GetRandomDriverLicenseNumber = async function() {
    let AA = `ABCEKMOTHPIXЯУ`;
    let N1,N2,N3, Num;
    let low = 100001;
    let high = 999999;
    let Res;
    N1 = await randomInt(0, AA.length - 1);
    N2 = await randomInt(0, AA.length - 1);
    N3 = await randomInt(0, AA.length - 1);
    Num = Math.floor(Math.random() * (high + 1 - low) + low);
    Res = AA[N1] + AA[N2] + AA[N3] + Num;
    return Res;
}
//-----------------------------------------------------------------------------------
GetRandomLicensePlate = async function() {
    let AA = `ABCEKMOTHPIX`;
    let N1,N2,N3,N4, Num;
    let low = 1000;
    let high = 9999;
    let Res;
    N1 = await randomInt(0, AA.length - 1);
    N2 = await randomInt(0, AA.length - 1);
    N3 = await randomInt(0, AA.length - 1);
    N4 = await randomInt(0, AA.length - 1);
    Num = Math.floor(Math.random() * (high + 1 - low) + low);
    Res = AA[N1] + AA[N2] + Num + AA[N3] + AA[N4];
    return Res;
}
//-----------------------------------------------------------------------------------
GetRandomRegistrationCertificateNumber = async function() {
    let AA = `ABCEKMOTHPIX`;
    let N1,N2,N3, Num;
    let low = 100000;
    let high = 999999;
    let Res;
    N1 = await randomInt(0, AA.length - 1);
    N2 = await randomInt(0, AA.length - 1);
    N3 = await randomInt(0, AA.length - 1);
    Num = Math.floor(Math.random() * (high + 1 - low) + low);
    Res = AA[N1] + AA[N2] + AA[N3] + Num;
    return Res;
}
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
//-----------------------------------------------------------------------------------
DeleteTempPicture = async function(MyFileName) {
    const fs = require('fs');
    if (fs.existsSync(MyFileName)) {
        fs.unlinkSync(MyFileName);
    }

};
//--------------------------------------------------------------
// const rimraf = require('rimraf');
// rimraf('./log/*', function () { console.log('done'); });

//-----------------------------------------------------------------------------------
DeleteAllScreenshots = async function(directory = 'test') {
    try {
        const fs = require('fs');

        const path = require('path');

        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
        return true;
    }catch (e) {
        await console.log(`ERROR => DeleteAllScreenshots(${e}) `);
        return false;
    }
}
//-----------------------------------------------------------------------------------
GetNewPage = async function(browser, page, qPages = 2){
    let ResPage;
    let resOk;
    try{
        if(page === null){
            let AllPages = await browser.pages();
            let TempLenPages = AllPages.length;
            if (TempLenPages < 2 ){
                resOk = await WaitForBrowserNewPage(browser,qPages, 4000);
                if(!resOk) {
                    AllPages = await browser.pages();
                    TempLenPages = AllPages.length;
                    throw `FAIL => TempLenPages=(${TempLenPages})`;
                }
            }
            AllPages = await browser.pages();
            TempLenPages = AllPages.length;
            ResPage = AllPages[TempLenPages-1];// !!! С НУЛЯ !!!
            if (!ResPage) {
                throw `FAIL => ResPage=(${ResPage})`;
            }
        }else{
            ResPage = page;
        }
        return ResPage;
    }catch (e) {
        await console.log(`${e} \n ERROR => GetNewPage()`);
        return null;
    }
}// GetNewPage = async function(browser, page)
//----------------------------------------
/**
 * @param {boolean} setListener The boolean
 * @param {string} requestUrl The string
 */
ResponseListener = async function(page, requestUrl, setListener) {
    let resOk;
    try {
        g_setListener = setListener;
        //await console.log(`ResponseListener g_setListener=(${g_setListener})`);

        async function done(page, fName) {
            if(g_tempDataEventListenerFunctionHandle === null){
                return false;
            }
            if(page) { // response requestfinished
                //await page.removeListener('requestfinished', onRequestFinished);
                await page.removeListener('requestfinished', fName);
                g_tempDataEventListenerFunctionHandle = null;
            }else{
                await console.log(`page=NOT`);
            }
        };
        async function onRequestFinished(request) {
            // https://question-it.com/questions/130241/kuklovod-kak-zhdat-tolko-pervyj-otvet-html
            try {
                // await console.log(`onRequestFinished g_setListener=(${g_setListener})`);
                // await console.log(`requestUrl=   (${requestUrl})`);
                // await console.log(`request.url()=(${request.url()})`);
                if(!g_setListener){
                    await done(page, g_tempDataEventListenerFunctionHandle); // <- тут сработает !!!
                    return true;
                }

                if (request.url().includes(g_tempDataFromEventListener_requestUrl_func)) {
                    const response = await request.response();
                    let resultJ = await response.json();
                    g_tempDataFromEventListener_requestUrl = request.url();
                    g_tempDataFromEventListener_json = resultJ;
                    g_tempDataFromEventListener_response = response;
                    //await console.log(`-1-----------------------`);
                    // await console.log(resultJ); // JSON RESULT OK
                    // await console.log(`-2-----------------------`);
                    // await console.log(`requestUrl=   (${requestUrl})+++++`);
                    // await console.log(`request.url()=(${request.url()})++++++`);
                    // await console.log(`response.status()=(${response.status()})`);
                    // await console.dir(response, { showHidden: true, depth: 3, colors: true }); // depth: null - infinity
                    if(response.status() === 200 && resultJ.data) {
                        g_tempDataFromEventListener_id = resultJ.data.id;
                        // await console.log(`g_tempDataFromEventListener=(${g_tempDataFromEventListener})`);
                    }else {
                        // await console.log(`response.status()=(${response.status()})`);
                        // if(resultJ.messages) {
                        //     for(let i=0; i<resultJ.messages.length;i++) {
                        //         await console.log(`messages[${i}]=(${resultJ.messages[i]})`);
                        //     }
                        // }
                    }

                    await done(page, g_tempDataEventListenerFunctionHandle);// <- тут сработает !!!

                    return true;
                }
            }catch (e) {
                await console.log(`*Ошибка в onRequestFinished (${e})`);
                return false;
            }
        };
        if (setListener) { // requestfinished  // response
            g_tempDataFromEventListener_id = ``;
            g_tempDataFromEventListener_requestUrl_func = requestUrl;
            g_tempDataFromEventListener_requestUrl = ``;
            g_tempDataFromEventListener_response = ``;
            g_tempDataFromEventListener_json = ``;
            g_tempDataEventListenerFunctionHandle = onRequestFinished;

            //await console.log(`g_tempDataEventListenerFunctionHandle=(${g_tempDataEventListenerFunctionHandle})`);
            await page.on('requestfinished', g_tempDataEventListenerFunctionHandle);
        }else{
           // await console.log(`else setListener(${setListener})`);
            await done(page, g_tempDataEventListenerFunctionHandle);// <- тут не сработает !!! (Уже сработает)
            // await console.log(`g_tempDataEventListenerFunctionHandle(${g_tempDataEventListenerFunctionHandle})`);
        }

        return true;
    } catch (e) {
        await console.log(`${e} \n FAIL in ResponseListener(${requestUrl})(${setListener})`);
        return false;
    }
}//async ResponseListener(requestUrl, setListener)
//----------------------------------------
ResponseListenerWaitForResponse = async function (timeMS = 4000){
    let startTime = await Date.now();
    try {
        while (true) {
            if (g_tempDataFromEventListener_response !== ``) {
                return true;
            }else {
                if ((await Date.now() - startTime) > timeMS) {
                    return false;
                }else {
                    await WaitMS(100);
                }
            }
        }

    }catch (e) {
        await console.log(`${e} \n FAIL in ResponseListenerWaitForResponse(${timeMS})`);
        return false;
    }
}// ResponseListenerWaitForResponse = async function (timeMS = 4000)
//----------------------------------------
ResponsesListener = async function(page, requestUrls, setListener, Q = 0) { // Q = 0 - Error  /// <- NEW !!!!!!!
    let resOk;
    try {
        g_RecEventListener.setListener = setListener;


        async function done(page, fName) {
            if( g_RecEventListener.EventListenerFunctionHandle === null){
                return false;
            }
            if(page) { // response requestfinished

                // await page.removeListener('requestfinished', fName);
                await page.removeListener('requestfinished', fName);
                g_RecEventListener.EventListenerFunctionHandle = null;
                return true;
            }else{
                await console.log(`page=NOT`);
                return false;
            }
        };
        async function onRequestFinished(request) {
            // https://question-it.com/questions/130241/kuklovod-kak-zhdat-tolko-pervyj-otvet-html
            try {
                // await console.log(`onRequestFinished g_setListener=(${g_setListener})`);
                // await console.log(`requestUrl=   (${requestUrl})`);
                // await console.log(`request.url()=(${request.url()})`);
                if(!g_RecEventListener.setListener){
                    await done(page, g_RecEventListener.EventListenerFunctionHandle); // <- тут сработает !!!
                    return true;
                }

                for (let i=0;i<g_RecEventListener.requestUrlsArrayLength; i++) {
                    if (request.url().includes(g_RecEventListener.requestUrls[i])) {
                        const response = await request.response();
                        let resultJ = await response.json();
                        g_RecEventListener.EventListener_requestUrls[i] = request.url();
                        g_RecEventListener.EventListener_jsons[i] = resultJ;
                        g_RecEventListener.EventListener_responses[i] = response;
                        //await console.log(`-1-----------------------`);
                        // await console.log(resultJ); // JSON RESULT OK
                        // await console.log(`-2-----------------------`);
                        // await console.log(`requestUrl=   (${requestUrl})+++++`);
                        // await console.log(`request.url()=(${request.url()})++++++`);
                        // await console.log(`response.status()=(${response.status()})`);
                        // await console.dir(response, { showHidden: true, depth: 3, colors: true }); // depth: null - infinity
                        // if (response.status() === 200 && resultJ.data) {
                        //     g_tempDataFromEventListener_id = resultJ.data.id;
                        //     // await console.log(`g_tempDataFromEventListener=(${g_tempDataFromEventListener})`);
                        // } else {
                        //     // await console.log(`response.status()=(${response.status()})`);
                        //     // if(resultJ.messages) {
                        //     //     for(let i=0; i<resultJ.messages.length;i++) {
                        //     //         await console.log(`messages[${i}]=(${resultJ.messages[i]})`);
                        //     //     }
                        //     // }
                        // }
                        // await done(page, g_RecEventListener.EventListenerFunctionHandle);// <- тут сработает !!!

                        return true;
                    }
                } // for (let i=1;i<g_RecEventListener.requestUrlsArrayLength; i++)


            }catch (e) {
                await console.log(`*Ошибка в onRequestFinished (${e})`);
                return false;
            }
        };
        if (setListener) { // requestfinished  // response
            if (Q > 10 || Q < 1){
                throw `Внутренняя ошибка Q = ${Q}`;
            }
            let len = requestUrls.length;
            if (len !== Q) {
                throw `Внутренняя ошибка (len = ${len}) <> (Q = ${Q})`;
            }
            g_RecEventListener.requestUrlsArrayLength = Q;
            for(let i=0;i < 10; i++) {
                g_RecEventListener.requestUrls[i] = ``;
                g_RecEventListener.EventListener_requestUrls[i] = ``;
                g_RecEventListener.EventListener_jsons[i] = ``;
                g_RecEventListener.EventListener_responses[i] = ``;
            }
            for(let i=0;i < len; i++) {
                g_RecEventListener.requestUrls[i] = requestUrls[i];
            }

            g_RecEventListener.EventListenerFunctionHandle = onRequestFinished;

            //await console.log(`g_tempDataEventListenerFunctionHandle=(${g_tempDataEventListenerFunctionHandle})`);
            g_RecEventListener.timeAll = ``;
            g_RecEventListener.startTime = await Date.now();

            await page.on('requestfinished', g_RecEventListener.EventListenerFunctionHandle);
        }else{
            // await console.log(`else setListener(${setListener})`);
            await done(page, g_RecEventListener.EventListenerFunctionHandle);// <- тут не сработает !!! (Уже сработает)
        }
        return true;
    } catch (e) {
        await console.log(`${e} \n FAIL in ResponsesListener(----------`);
        await console.dir(requestUrls,{ showHidden: true, depth: 3, colors: true }); // depth: null - infinity
        await console.log(`, setListener:${setListener}, Q:${Q});------------`);

        return false;
    }
}//async ResponsesListener(page, requestUrls, setListener, Q = 0)
//----------------------------------------
ResponsesListenerWaitForAllResponses = async function (timeMS = 4000){
    // let startTime = await Date.now();
    // g_RecEventListener.startTime Устанавливается в установщике прослушивателя !!!!!
    let EmptyResponse = false;
    try {
        while (true) {
            EmptyResponse = false;
            for (let i = 1; i < g_RecEventListener.requestUrlsArrayLength; i++) {
                if (g_RecEventListener.EventListener_responses[i] === ``) {
                    EmptyResponse = true;
                }
            } // for (let i = 1; i < g_RecEventListener.requestUrlsArrayLength; i++)
            if(!EmptyResponse){ // Если нет пустых Респонсов, значит всё выполнено !!!!!
                g_RecEventListener.timeAll = await Date.now() - g_RecEventListener.startTime;
                // let strDtAll = msToMMSSMS(dtAll);
               return true;  // <--- Тут ПОЛОЖИТЕЛЬНЫЙ ВЫХОД !!!!!!
            }
            if ((await Date.now() - g_RecEventListener.startTime) > timeMS) {
                g_RecEventListener.timeAll = await Date.now() - g_RecEventListener.startTime;
                return false;
            } else {
                await WaitMS(100);
            }
        } // while (true)

    }catch (e) {
        g_RecEventListener.timeAll = await Date.now() - startTime;
        await console.log(`${e} \n FAIL in ResponsesListenerWaitForAllResponses(${timeMS})`);
        return false;
    }
}// ResponsesListenerWaitForAllResponses = async function (timeMS = 4000)
//----------------------------------------
TempGetCallerFuncName = async function(str){
    //let CN = TempGetFName.caller().name;
    let CN = (new Error().stack.split("at ")[2]).trim();
    let S1 = `.` , S2 = ` (`;
    let N1 = CN.indexOf(S1) + S1.length , N2 = CN.indexOf(S2);
    let FN = CN.slice(0, N2);
    FN = FN.replace('Object','Тест');
       // await console.log(new Error().stack);
    //await console.log("DEBUG", (new Error().stack.split("at ")[2]).trim(), ">>>", str);
    //await console.log("DEBUG", (new Error().stack.split("Object.")[1]).trim(), ">>>", str);
    //await console.log("DEBUG", (new Error().stack));
    await console.log(`---(${str})--->(${FN})`);
    await console.log(`+(${CN})+`);
}
//----------------------------------------
ScreenLog = async function(page, Msg = '', Color = 0){ // 1,2,3 - R,G,Y
   try {
       let FullError = new Error().stack;
       let CurrentErrorStr = (FullError.split("at ")[2]).trim();
       let S2 = ` (`;
       let N2 = CurrentErrorStr.indexOf(S2);
       let FuncName = CurrentErrorStr.slice(0, N2);
       let strSSNum = ``;
       let strSSNumLength;
       strSSNum = strSSNum + g_SSNum; // ScreenShotNumber
       strSSNumLength = 3-strSSNum.length;
       strSSNum = '0'.repeat(strSSNumLength < 0 ? 0: strSSNumLength) + strSSNum;
       FuncName = FuncName.replace('Object', 'Тест');
       let strPSS = g_PathSS + `screenshot${strSSNum}_${FuncName}.png`;
       await page.screenshot({path: strPSS, fullPage: true});
       let Col0 = FRGB(0,5, 5, 0),
           Col1 = FRGB(1,1, 1, 4),
           Col2 = FRGB(0,3, 3, 0),
           Col  = FRGB();
       if(Msg !== ''){
           let C = `` , C0 = ``;
           if (Color !== 0){
               C0 = FRGB();
               switch (Color) {
                   case 1:
                       C = FRGB(0, 5, 0, 0);
                       break;
                   case 2:
                       C = FRGB(0, 0, 5, 0);
                       break;
                   case 3:
                       C = FRGB(0, 5, 5, 0);
                       break;
                   default:
                       break;
               }// switch (Color)
           }
           await console.log(C,Msg,C0);
       }
       await console.log(` ${Col0}${Col1}[O]${Col} ${Col2}Скриншот: ${strPSS}${Col}`);
       g_SSNum++; // <---- +1 !!!!!!! делать после скрина !!!
   }catch (e) {
       await console.log(`Ошибка внутренняя ScreenLog\n${e}`);
   }
}
//----------------------------------------
GetDealMarshrut = async function(DealData){
    try {
        let tempAdr = DealData.PointsLoading[0].PointLoading.strAddressFOX;
        for (let i = 1; i < DealData.PointsLoading.length; i++) {
            tempAdr += `; ` + DealData.PointsLoading[i].PointLoading.strAddressFOX;
        }
        tempAdr += ` - ` + DealData.PointsUnLoading[0].PointUnLoading.strAddressFOX;
        for (let i = 1; i < DealData.PointsUnLoading.length; i++) {
            tempAdr += `; ` + DealData.PointsUnLoading[i].PointUnLoading.strAddressFOX;
        }
        return tempAdr;
    }catch (e) {
        await console.log(`${e} \n FAIL in GetDealMarshrut`);
        return ``;
    }
}
//----------------------------------------
array_flip = async function ( trans )
{
    let key, tmp_ar = {};

    for ( key in trans )
    {
        if ( trans.hasOwnProperty( key ) )
        {
            tmp_ar[trans[key]] = key;
        }
    }

    return tmp_ar;
}
