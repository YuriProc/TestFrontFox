
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
