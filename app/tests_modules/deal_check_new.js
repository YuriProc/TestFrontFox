let DealCheckNew = async (browser, page, DealData) => {
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
    try {
    await page.setViewport({width, height});

    //await page.setViewport({width2, height2});

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
        // проверим ДАТУ ЗАГРУЗКИ
        let GetStrDate  = await ElementGetValue(page, 0, '//input[@name="date_loading"]');
        if (DealData.strDateLoading !== GetStrDate) {
            enableError = true;
            g_StrOutLog+=`     FAIL => ДАТА ЗАГРУЗКИ(DealData.strDateLoading !== GetStrDate)(${DealData.strDateLoading} !== ${GetStrDate}) \n`;
            //throw `     FAIL => ДАТА ЗАГРУЗКИ(DealData.strDateLoading !== GetStrDate)(${DealData.strDateLoading} !== ${GetStrDate})`;
        }
        // проверим ДАТУ ВИЇЗДУ ІЗ ЗАВАНТАЖЕННЯ
        GetStrDate  = await ElementGetValue(page, 0, '//input[@name="date_loading_departure"]');
        if (DealData.strDateLoadingDeparture !== GetStrDate) {
            enableError = true;
            g_StrOutLog+=`     FAIL => ДАТА ВИЇЗДУ ІЗ ЗАВАНТАЖЕННЯ(DealData.strDateLoadingDeparture !== GetStrDate)(${DealData.strDateLoadingDeparture} !== ${GetStrDate}) \n`;
            //throw `     FAIL => ДАТА ВИЇЗДУ ІЗ ЗАВАНТАЖЕННЯ(DealData.strDateLoadingDeparture !== GetStrDate)(${DealData.strDateLoadingDeparture} !== ${GetStrDate})`;
        }
        // проверим ДАТУ РОЗВАНТАЖЕННЯ
        GetStrDate  = await ElementGetValue(page, 0, '//input[@name="date_unloading"]');
        if (DealData.strDateUnLoading !== GetStrDate) {
            enableError = true;
            g_StrOutLog+=`     FAIL => ДАТА РОЗВАНТАЖЕННЯ(DealData.strDateUnLoading !== GetStrDate)(${DealData.strDateUnLoading} !== ${GetStrDate})\n`;
            //throw `     FAIL => ДАТА РОЗВАНТАЖЕННЯ(DealData.strDateUnLoading !== GetStrDate)(${DealData.strDateUnLoading} !== ${GetStrDate})`;
        }
        //Проверка ПУНКТ ЗАВАНТАЖЕННЯ
        xPath = `//div[@name="point_loadings"]/div/div[@class="select__zone"]/div[@class="select__item"]/span`;
        let GetStrAddress = await ElementGetInnerText(page , 0, xPath);
        if (!GetStrAddress.includes(DealData.strPointLoading)) {
            enableError = true;
            g_StrOutLog+=`     FAIL => "${DealData.strPointLoading}" Не найден в =>"${GetStrAddress}"\n`;
            //throw `     FAIL => "${DealData.strPointLoading}" Не найден в =>"${GetStrAddress}"`;
        }
        //Проверка ПУНКТ РОЗВАНТАЖЕННЯ
        xPath = `//div[@name="point_unloading"]/div/div[@class="select__zone"]/div[@class="select__item"]/span`;
        GetStrAddress = await ElementGetInnerText(page , 0, xPath);
        if (!GetStrAddress.includes(DealData.strPointUnLoading)) {
            enableError = true;
            g_StrOutLog+=`     FAIL => "${DealData.strPointUnLoading}" Не найден в =>"${GetStrAddress}"\n`;
            //throw `     FAIL => "${DealData.strPointUnLoading}" Не найден в =>"${GetStrAddress}"`;
        }
        //Проверка "Тип вантажа "
        //  //*[@id="app"]/div/main/div/div/div[3]/div[2]/div[2]/div[1]/div[1]/div/div/div/div[1]/div[2]/span
        //xPath = '//div[@class="select"][./label[contains(text(), "Тип вантажа ")]]/div[@class="select__area"]/div/div[@class="multiselect__tags"]';
        xPath = '//div[@class="select"][./label[contains(text(), "Тип вантажа ")]]/div[@class="select__area"]/div/div[@class="multiselect__tags"]/span';
        let GetTempStr = await ElementGetInnerText(page, 0, xPath);
        if (DealData.strTypeLoad !== GetTempStr) {
            enableError = true;
            g_StrOutLog+=`     FAIL => ("Тип вантажа ")${DealData.strTypeLoad} !== ${GetTempStr}\n`;
            //throw `     FAIL => ("Тип вантажа ")${DealData.strTypeLoad} !== ${GetTempStr}`;//<--специальный вызов ошибки!
        }
        //Проверка Вартість вантажа
        xPath = '//input[@name="cargo_cost"]';
        GetTempStr = await ElementGetValue(page, 0, xPath);
        if (DealData.strCargoCost !== GetTempStr) {
            enableError = true;
            g_StrOutLog+=`     FAIL => ("Вартість вантажа ")${DealData.strCargoCost} !== ${GetTempStr}\n`;
            //throw `     FAIL => ("Вартість вантажа ")${DealData.strCargoCost} !== ${GetTempStr}`;//<--специальный вызов ошибки!
        }

        // Проверка Дані про замовника ДАНІ ПРО ЗАМОВНИКА --------------------------------
        // Проверка Тип Компания
        xPath = '//label[@class="nav__item"][./span[contains(text(), "Компания")]]/input';
        let GetChecked = await ElementIsChecked(page, 0, xPath);
        //await console.log('ClickByXPathNum(Дані про замовника => кнопка Компания)');
        if (!GetChecked) {
            enableError = true;
            g_StrOutLog+=`     FAIL => Тип Компания(${GetChecked})\n`;
            //throw `     FAIL => Тип Компания(${GetChecked})`;//<--специальный вызов ошибки!
        }

        // Проверка "Компания замовника "
        GetTempStr = await ElementGetValue(page, 0,'//div[@data-vv-name="client"]/div/input');
        if (!GetTempStr.includes(DealData.CompanyClient.strCompanyName)) {
            enableError = true;
            g_StrOutLog+=`     FAIL => (Компания замовника)["${DealData.CompanyClient.strCompanyName}" Не найдено в =>"${GetTempStr}"]\n`;
            //throw `     FAIL => (Компания замовника)["${DealData.CompanyClient.strCompanyName}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
        }

        // Проверка "(ЮР. ОСОБА З ЗАМОВНИКОМ )"
        GetTempStr = await ElementGetValue(page, 0,'//div[@data-vv-name="client_our_company"]/div/div/div/input');
        if (!GetTempStr.includes(DealData.strOurCompanyClient)) {
            enableError = true;
            g_StrOutLog+=`     FAIL => (ЮР. ОСОБА З ЗАМОВНИКОМ)["${DealData.strOurCompanyClient}" Не найдено в =>"${GetTempStr}"]\n`;
            //throw `     FAIL => (ЮР. ОСОБА З ЗАМОВНИКОМ)["${DealData.strOurCompanyClient}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
        }

        //Проверка ДАНІ ПРО ПЕРЕВІЗНИКА -----------------------------------
        //Проверка Тип Компания
        xPath = '//label[@class="nav__item"][./span[contains(text(), "Компания")]]/input[last()]';
        GetChecked = await ElementIsChecked(page, 1, xPath);
        if (!GetChecked) {
            enableError = true;
            g_StrOutLog+=`       FAIL => (ДАНІ ПРО ПЕРЕВІЗНИКА)Тип Компания(${GetChecked})\n`;
            //throw `       FAIL => (ДАНІ ПРО ПЕРЕВІЗНИКА)Тип Компания(${GetChecked})`;//<--специальный вызов ошибки!
        }
        // Проверка "КОМПАНИЯ ПЕРЕВІЗНИКА "
        GetTempStr = await ElementGetValue(page, 0,'//div[@data-vv-name="transporter"]/div/input');
        if (!GetTempStr.includes(DealData.CompanyTransporter.strCompanyName)) {
            enableError = true;
            g_StrOutLog+=`     FAIL => (КОМПАНИЯ ПЕРЕВІЗНИКА)["${DealData.CompanyTransporter.strCompanyName}" Не найдено в =>"${GetTempStr}"]\n`;
            //throw `     FAIL => (КОМПАНИЯ ПЕРЕВІЗНИКА)["${DealData.CompanyTransporter.strCompanyName}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
        }
        // Проверка "(ЮР. ОСОБА З ПЕРЕВІЗНИКОМ )"
        GetTempStr = await ElementGetValue(page, 0,'//div[@data-vv-name="transporter_our_company"]/div/div/div/input');
        if (!GetTempStr.includes(DealData.strOurCompanyTransporter)) {
            enableError = true;
            g_StrOutLog+=`     FAIL => (ЮР. ОСОБА З ПЕРЕВІЗНИКОМ)["${DealData.strOurCompanyTransporter}" Не найдено в =>"${GetTempStr}"]\n`;
            //throw `     FAIL => (ЮР. ОСОБА З ПЕРЕВІЗНИКОМ)["${DealData.strOurCompanyTransporter}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
        }
        // Проверка (Данні про водія )
        //xPath = '//div[@data-vv-name="driver"]/div/div/div/input';
        xPath = '//div[@data-vv-name="driver"]/div/div/div/input';
        GetTempStr = await ElementGetValue(page, 0,xPath);
        if (!GetTempStr.includes(DealData.DriverFullData.strMiddleName)) {
            enableError = true;
            g_StrOutLog+=`       FAIL => (Данні про водія Фамилия)["${DealData.DriverFullData.strMiddleName}" Не найдено в =>"${GetTempStr}"]\n`;
            //throw `       FAIL => (Данні про водія Фамилия)["${DealData.DriverFullData.strMiddleName}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
        }
        //Проверка ОБРАНИЙ АВТОМОБІЛЬ
        xPath = `//div[@class="select"][./label[starts-with(text(), "Обраний автомобіль")]]/div/div/div/span[@class="multiselect__single"]`;
        GetTempStr = await ElementGetInnerText(page, 0, xPath);
        if (DealData.strLicensePlate1 !== GetTempStr) {
            enableError = true;
            g_StrOutLog+=`       FAIL => ("ОБРАНИЙ АВТОМОБІЛЬ ")${DealData.strLicensePlate1} !== ${GetTempStr}\n`;
            //throw `       FAIL => ("ОБРАНИЙ АВТОМОБІЛЬ ")${DealData.strLicensePlate1} !== ${GetTempStr}`;//<--специальный вызов ошибки!
        }
        // Проверка ОБРАНИЙ ПРИЦЕП
        xPath = `//div[@class="select"][./label[starts-with(text(), "Обраний прицеп")]]/div/div/div/span[@class="multiselect__single"]`;
        GetTempStr = await ElementGetInnerText(page, 0, xPath);
        if (DealData.strLicensePlate2 !== GetTempStr) {
            enableError = true;
            g_StrOutLog+=`       FAIL => ("ОБРАНИЙ ПРИЦЕП ")${DealData.strLicensePlate2} !== ${GetTempStr}\n`;
            //throw `       FAIL => ("ОБРАНИЙ ПРИЦЕП ")${DealData.strLicensePlate2} !== ${GetTempStr}`;//<--специальный вызов ошибки!
        }
        //Проверка ВІДПОВІДАЛЬНИЙ ПО ФОКСУ
        xPath = `//div[@class="select"][./label[starts-with(text(), "Відповідальний по Фоксу")]]/div/div/div/span[@class="multiselect__single"]`;
        GetTempStr = await ElementGetInnerText(page, 0, xPath);
        if (!GetTempStr.includes(DealData.strFoxResponsible)) {
            enableError = true;
            g_StrOutLog+=`     FAIL => ("ВІДПОВІДАЛЬНИЙ ПО ФОКСУ")["${DealData.strFoxResponsible}" Не найдено в =>"${GetTempStr}"]\n`;
            //throw `     FAIL => ("ВІДПОВІДАЛЬНИЙ ПО ФОКСУ")["${DealData.strFoxResponsible}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
        }
        //Проверка ЛОГІСТ
        xPath = `//div[@class="select"][./label[starts-with(text(), "Логіст")]]/div/div/div/span[@class="multiselect__single"]`;
        GetTempStr = await ElementGetInnerText(page, 0, xPath);
        if (!GetTempStr.includes(DealData.strLogistician)) {
            enableError = true;
            g_StrOutLog+=`     FAIL => ("ЛОГІСТ")["${DealData.strLogistician}" Не найдено в =>"${GetTempStr}"]\n`;
            //throw `     FAIL => ("ЛОГІСТ")["${DealData.strLogistician}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
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

module.exports.DealCheckNew = DealCheckNew;
