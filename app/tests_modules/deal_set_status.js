let DealSetStatus = async (browser, page, DealData) => {
    const nameTest = NameFunction()+'->"'+'ID:'+DealData.strDealID +
                                    '=>' + DealData.strPointLoading +'/'+ DealData.strPointUnLoading+'"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
    g_StrOutLog += `Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1200;
    let height = 880;
    let widthX = 1200;
    let heightX = 1800;
    let xPath;
    let ElPresent, ElPresent1, ElPresent2, ElPresent3;
    let resOk;
    let MyFilePath = '';
    let returnResult = false;
    let enableError = false;
    await page.setViewport({width, height});

    //await page.setViewport({width2, height2});
    try {
        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);
        // Клик по Сделки
        resOk = await ClickByXPath(page, `//a[@href="/deal"]`);
        if (!resOk){
            //await console.log('\x1b[38;5;2m', "     ClickDealCreateNewPlus(page); = FAIL!" , '\x1b[0m');

            throw 'Клик по Сделки(//a[@href="/deal"]) = FAIL!"';//<--специальный вызов ошибки!
        }

        //Ждём загрузки страницы Сделки ТАБЛИЦА
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'FAIL WaitUntilPageLoads("Сделки ТАБЛИЦА")';//<--специальный вызов ошибки!
        }
        //Проверяем наличие на странице Характерных элементов (Сделки)
        // Ждём появление таблицы сделки
        xPath = '//div[@class="head__title"][contains(text(), "Сделки")]';
        resOk = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOk) {
            throw `FAIL => Не Вижу(//div[@class="head__title"][contains(text(), "Сделки")]) `;//<--специальный вызов ошибки!
        }
        //клик по кнопке Все сделки
        xPath = `//button[@class="btn btn--sm"][contains(text(), "Все сделки")]`;
        resOk = await ClickByXPath(page, xPath);
        await WaitUntilPageLoads(page);


        //Клик по инпуту поиск по ID
        resOk = await ClickByXPath(page, '//input[@placeholder="ID сделки"]');
        if (!resOk) {
            throw 'ClickByXPath(//input[@placeholder="ID сделки"])';//<--специальный вызов ошибки!
        }
        // Вводим ID
        resOk = await TypeByXPath(page, '//input[@placeholder="ID сделки"]', DealData.strDealID);
        if (!resOk) {
            throw 'TypeByXPath(//input[@placeholder="ID сделки"])';//<--специальный вызов ошибки!
        }
        //Ждём пока найдёт сделку
        await WaitUntilPageLoads(page);
        //проверим отсутствие надписи (ничего не найдено)
        resOk = await ElementIsPresent(page, '//b[contains(text(), "Ничего не найдено")]');
        if (resOk){
            await console.log('Вижу (Ничего не найдено)');
            throw `FAIL => ввели ID:${DealData.strDealID} => Вижу (Ничего не найдено)`;
        }
        //клик по кнопке редактировать сделку
        //  //*[@id="app"]/div/main/div/div[2]/div/table/tbody/tr/td[1]/div/a/svg
        //  //*[@id="app"]/div/main/div/div[2]/div/table/tbody/tr/td[1]/div/a/svg
        //xPath = `//div[@class="table"]/table/tbody/tr/td[@class="has-nav"]/div/a/svg[@class="fa-icon"]`;
        // //a[@class="table__option"]
        xPath = `//a[@class="table__option"]`;
        resOk = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOk) {
            await console.log('Не Вижу(кнопки редактировать сделку)');
            throw `FAIL => Не Вижу(кнопки редактировать сделку) `;//<--специальный вызов ошибки!
        }
        let qDN = await ElementGetLength(page, xPath);
        if(qDN > 1){
            await console.log(`     Вижу ${qDN} шт. cделок!!!`);
            g_StrOutLog+=`=> Вижу ${qDN} шт. cделок!!! \n`;

        }
        // Клик по первой кнопке
        resOk = await ClickByXPathNum(page, 1,xPath);
        if (!resOk) {
            throw 'ClickByXPath(клик по кнопке редактировать сделку)';//<--специальный вызов ошибки!
        }
        //Ждём загрузки страницы редактировать сделку
        await WaitUntilPageLoads(page);

        //Проверяем наличие характерных элементов(Редагувати угоду)
        xPath = '//div[@class="head__title"][contains(text(), "Редагувати угоду")]';
        resOk = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOk) {
            throw `FAIL => Не Вижу(//div[@class="head__title"][contains(text(), "Редагувати угоду")]) `;//<--специальный вызов ошибки!
        }
        //------------------------Проверка ДАННЫХ----------------------------------
        // проверим Статус Сделки
        xPath = `//div[@class="select"][./label[contains(text(), "")]]`;
        xPath+= `/div[@class="select__area"]/div[@class="multiselect"]`;
        xPath+= `/div[@class="multiselect__tags"]/span[@class="multiselect__single"]`;
        let GetStrStatus  = await ElementGetInnerText(page, 0, xPath);
        await console.log(`     Текущий Статус сделки:(${GetStrStatus}) `);
        g_StrOutLog+=`\n Текущий Статус сделки:(${GetStrStatus}) \n`;
        // клик по стрелке (Статус Сделки)
        xPath = `//div[@class="select"][./label[contains(text(), "")]]`;
        xPath+= `/div[@class="select__area"]/div[@class="multiselect"]/div[@class="multiselect__select]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk){
            throw `     FAIL => клик по стрелке (Статус Сделки)`;
        }
        // Выбор из списка
        await page.waitFor(500);
        xPath = `//span[contains(text(), "${DealData.strStatus}")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk){
            throw `     FAIL => не получиось выбрать из списка (${DealData.strStatus})`;
        }
        await page.waitFor(500);
        // проверим Статус Сделки
        xPath = `//div[@class="select"][./label[contains(text(), "")]]`;
        xPath+= `/div[@class="select__area"]/div[@class="multiselect"]`;
        xPath+= `/div[@class="multiselect__tags"]/span[@class="multiselect__single"]`;
        GetStrStatus  = await ElementGetInnerText(page, 0, xPath);
        await console.log(`     Статус сделки выбран:(${GetStrStatus}) `);
        g_StrOutLog+=`\n Статус сделки выбран:(${GetStrStatus}) \n`;
        if (GetStrStatus !== DealData.strStatus) {
            g_StrOutLog+=`FAIL => Выбранный статус сделки:([${GetStrStatus}] вместо [${DealData.strStatus}]) \n`;
            throw `     FAIL => Выбранный статус сделки:([${GetStrStatus}] вместо [${DealData.strStatus}])`;
        }
        //Клик по кнопке сохранить (Редагувати угоду)
        xPath = `//button[@class="btn"]/span[contains(text(), "Редагувати угоду")]`;
        resOk = await ClickByXPathWithScroll(2000, page, xPath);
        if (!resOk){
            g_StrOutLog+=`FAIL => ClickByXPathWithScroll(Редагувати угоду)\n`;
            throw `     FAIL => ClickByXPathWithScroll(Редагувати угоду)`;
        }

        //await TempStop(page);
        if (enableError){
            throw `При проверке Ранее Созданной Сделки Были Несоответствия Данных`;
        }
        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        DealData.returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице (Редагувати угоду) : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${err} => ${g_StatusCurrentTest} \n`;
        DealData.returnResult = false;
        //await page.waitFor(5001111);
    }
    await page.setViewport({width, height});
    return DealData;//<------------------EXIT !!!

};

module.exports.DealSetStatus = DealSetStatus;