
//-----------------------------------------------------------------------------------
WaitUntilPageLoadsCfo  = async function (page) {

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
        return false;
    }
};
//-----------------------------------------------------------------------------------
WaitUntilTableLoadsCfo  = async function (page) {

    let xPathTable = `//table[contains(@id, "__BVID__")]`;
    let xPathTableBusy = `//table[contains(@id, "__BVID__")][@aria-busy="true"]`;
    let xPathTableReady = `//table[contains(@id, "__BVID__")][@aria-busy="false"]`;
    let resOk;

    try {

        resOk = await ElementIsPresent(page, xPathTable);
        if(!resOk){
            await console.log(`ElementNotPresent(${xPathTable})`);
            g_StrOutLog+= `ElementNotPresent(${xPathTable})`;
            throw `ElementNotPresent(${xPathTable})`;
        }

        // Ждём пока таблица начнёт грузиться
        resOk = await WaitForElementIsPresentByXPath(1000, page, xPathTableBusy);

        // Теперь ждём пока таблица Будет Готова
        resOk = await WaitForElementIsPresentByXPath(65000, page, xPathTableReady);
        if(!resOk){
            await console.log(`ElementNotPresent(${xPathTableReady})`);
            g_StrOutLog+= `ElementNotPresent(${xPathTableReady})`;
            throw `ElementNotPresent(${xPathTableReady})`;
        }

        return resOk;
    } catch (e) {
        await console.log("WaitUntilTableLoadsCfo => error=>",e,);
        return false;
    }
};
//-----------------------------------------------------------------------------------
RefreshTableCfo = async function (page) {
    let xPath,resOk,tStr;
    // жмём кнопку обновить таблицу
    //await console.log(`жмём кнопку обновить таблицу`);
    xPath = `//button[@type="button"][./span[contains(text(), "Обновить таблицу")]]/img`;
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){
        tStr = `FAIL => RefreshTableCfo(ClickByXPath(Обновить таблицу)) (CFO)`;
        g_StrOutLog+= `${tStr}\n`;
        await console.log(tStr);
        //await TempStop(page);
        //throw tStr;
    }
    //await console.log(`Нажали кнопку обновить таблицу`);
    return resOk;
};
//-----------------------------------------------------------------------------------

WaitUntilTableLoadsCfo_  = async function (page) {
    let xPathTable = `//table[@id="__BVID__2978"]`;
    let xPathTableBusy = `//table[@id="__BVID__2978"][@aria-busy="true"]`;
    let xPathTableReady = `//table[@id="__BVID__2978"][@aria-busy="false"]`;
    let resOk, tRes1, tRes2;

    let startTime = await Date.now();
    try {
        do { // Ждём пока таблица начнёт грузится
            tRes1 = await page.evaluate(() => {
                let res = document.querySelector("table[id^='__BVID__']").getAttribute('aria-busy');
                return res;
            });
            if(await Date.now() - startTime > 3000) {
                await console.log('table NOT start load > 3 sec !!!');
                break;
            }
            await page.waitFor(500);
        }while (!tRes1);// повторяет пока истина, выходит если ложь





        // сейчас таблица уже грузится
        await console.log(`tRes1=`,tRes1);
        startTime = await Date.now();
        do { // Ждём пока таблица перестанет грузится

            if(await Date.now() - startTime > 65000) {
                await console.log('table BUSY > 65 sec !!!');
                throw `table BUSY > 65 sec !!!`;
            }

            await page.waitFor(1000);

            tRes2 = await page.evaluate(() => {
                return document.querySelector("table[id^='__BVID__']").getAttribute('aria-busy');
            });


        }while (tRes2);

        await console.log(`tRes2=`,tRes2);
        // сейчас таблица уже загрузилась

       return true;
    } catch (e) {
        await console.log('\x1b[38;5;1m', "WaitUntilTableLoadsCfo => error=>",e, '\x1b[0m');
        return false;
    }
};