let DealCreateNew = async (browser, page, DealData) => {
    const nameTest = NameFunction()+'->"' + DealData.strPointLoading +'/'+ DealData.strPointUnLoading+'"';
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
    await page.setViewport({width, height});

    //await page.setViewport({width2, height2});
    try {
        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);

        // hover Сделки hover +  and click
        resOk = await ClickDealCreateNewPlus(page);
        if (!resOk){
            //await console.log('\x1b[38;5;2m', "     ClickDealCreateNewPlus(page); = FAIL!" , '\x1b[0m');

            throw 'ClickDealCreateNewPlus(page); = FAIL!"';//<--специальный вызов ошибки!
        }

        //Ждём загрузки страницы СТВОРИТИ УГОДУ
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'FAIL WaitUntilPageLoads("СТВОРИТИ УГОДУ")';//<--специальный вызов ошибки!
        }

        //Проверяем наличие на странице Характерных элементов (Сделки)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Створити угоду")]');
        if (!resOk) {
            throw 'Not ElementIsPresent(class="head__title""Створити угоду")';//<--специальный вызов ошибки!
        }
        //Клик по инпуту ДАТА ЗАВАНТАЖЕННЯ Автозаполнение
        resOk = await ClickByXPath(page, '//input[@name="date_loading"]');
        if (!resOk) {
            throw 'ClickByXPath(//input[@name="date_loading"])';//<--специальный вызов ошибки!
        }
        DealData.strDateLoading = await ElementGetValue(page, 0, '//input[@name="date_loading"]');
        if (DealData.strDateLoading === '') {
            throw "DealData.strDateLoading === ''";
        }
        //Клик по инпуту ДАТА ВИЇЗДУ ІЗ ЗАВАНТАЖЕННЯ
        resOk = await ClickByXPath(page, '//input[@name="date_loading_departure"]');
        if (!resOk) {
            throw 'ClickByXPath(//input[@name="date_loading_departure"])';//<--специальный вызов ошибки!
        }
        DealData.strDateLoadingDeparture = await ElementGetValue(page, 0, '//input[@name="date_loading_departure"]');
        if (DealData.strDateLoadingDeparture === '') {
            throw "DealData.strDateLoadingDeparture === ''";
        }
        //Клик по инпуту ДАТА РОЗВАНТАЖЕННЯ
        resOk = await ClickByXPath(page, '//input[@name="date_unloading"]');
        if (!resOk) {
            throw 'ClickByXPath(//input[@name="date_unloading"])';//<--специальный вызов ошибки!
        }
        DealData.strDateUnLoading = await ElementGetValue(page, 0, '//input[@name="date_unloading"]');
        if (DealData.strDateUnLoading === '') {
            throw "FAIL => DealData.strDateUnLoading === ''";
        }
        //Блядово Хераково
        resOk = await EnterDealPointLoading(page, DealData.strPointLoading);
        if (!resOk) {
            throw `FAIL => EnterDealPointLoading(${DealData.strPointLoading})`;//<--специальный вызов ошибки!
            //await console.log('\x1b[38;5;2m', "     FAIL EnterDealPointLoading(${DealData.strPointLoading})" , '\x1b[0m');
        }
        resOk = await EnterDealPointUnLoading(page, DealData.strPointUnLoading);
        if (!resOk) {
            throw `FAIL => EnterDealPointUnLoading(${DealData.strPointUnLoading})`;//<--специальный вызов ошибки!
            //await console.log('\x1b[38;5;2m', "     FAIL EnterDealPointLoading(${DealData.strPointLoading})" , '\x1b[0m');
        }
        // "Тип вантажа "
        xPath = '//div[@class="select"][./label[contains(text(), "Тип вантажа ")]]/div[@class="select__area"]/div/div[@class="multiselect__tags"]';
        resOk = await ClickByXPathWithScroll(1000 ,page, xPath);
        if (!resOk) {
            throw 'FAIL => ClickByXPathWithScroll("Тип вантажа ")';//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        resOk = await ClickByXPath(page, `//span[contains(text(), "${DealData.strTypeLoad}")]`);
        if (!resOk) {
            throw `FAIL => ClickByXPath("${DealData.strTypeLoad}")`;//<--специальный вызов ошибки!
        }
        // Вартість вантажа
        await page.waitFor(500);
        resOk = await ClickByXPath(page, '//input[@name="cargo_cost"]');
        resOk = await TypeByXPath(page, '//input[@name="cargo_cost"]', DealData.strCargoCost);
        if (!resOk) {
            throw `FAIL => TypeByXPath(//input[@name="cargo_cost"])`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        // Дані про замовника ДАНІ ПРО ЗАМОВНИКА --------------------------------
        // Тип Компания
        xPath = '//label[@class="nav__item"][./span[contains(text(), "Компания")]]';
        resOk = await ClickByXPathNum(page, 1, xPath);
        //await console.log('ClickByXPathNum(Дані про замовника => кнопка Компания)');
        if (!resOk) {
            throw `FAIL => ClickByXPathNum(Дані про замовника => кнопка Компания)`;//<--специальный вызов ошибки!
        }
        // Вводим "Компания замовника "
        resOk = await ClickByXPath(page, '//div[@data-vv-name="client"]/div/input');
        if (!resOk) {
            throw `FAIL => ClickByXPath(Дані про замовника => Компания замовника])`;//<--специальный вызов ошибки!
        }
        resOk = await TypeByXPath(page, '//div[@data-vv-name="client"]/div/input', DealData.strCompanyClient);
        if (!resOk) {
            throw `FAIL => TypeByXPath(Компания замовника => ${DealData.strCompanyClient}])`;//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        // Выбор из меню
        xPath = '//div[@class="search__cnt has-active"]/div[@class="search__item"]';
        resOk = await ClickByXPathNum(page, 1, xPath);
        if (!resOk) {
            throw `FAIL => Выбор из меню(Компания замовника => ${DealData.strCompanyClient}])`;//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        // Вводим "(ЮР. ОСОБА З ЗАМОВНИКОМ )"
        await page.waitFor(500);
        let Data = await GetDataFromList(page, '//select[@id="client_our_company"]/option');
        if (!Data.returnStatus){
            throw `FAIL => Траблы с меню(ЮР. ОСОБА З ЗАМОВНИКОМ)=>(${Data.returnError})`;
        }
        resOk = false;
        Data.returnList.forEach(element => {
            if (element.PropInnerText === DealData.strOurCompanyClient) {
                DealData.valOurCompanyClient = element.PropValue;
                resOk = true;
            }
        });
        if (!resOk){
            await console.log('WARNING => Не найдено в Дроп Листе:', DealData.strOurCompanyClient);
            await console.log('Data=>', Data);
            // Если не нашли ЗАДАННОЕ значение, МЕНЯЕМ!!! его на первое значение
            DealData.strOurCompanyClient = Data.returnList[0].PropInnerText;
            DealData.valOurCompanyClient = Data.returnList[0].PropValue;

            await console.log('Выбрано =>', Data.returnList[0].PropInnerText);
            //throw `FAIL => Не найдено в Дроп Листе:"${DealData.strOurCompanyClient}"`;
        }
        // await console.log(Data.returnList[0].PropValue);
        // await console.log(Data.returnList[0].PropInnerText);

        resOk = await SelectFromList(page, 'select[name="client_our_company"]', DealData.valOurCompanyClient);
        if (!resOk) {
            throw `FAIL => Выбор из меню(ЮР. ОСОБА З ЗАМОВНИКОМ => ${DealData.strOurCompanyClient}])`;//<--специальный вызов ошибки!
        }
        // Ура!!! наконец-то выбрали из списка "(ЮР. ОСОБА З ЗАМОВНИКОМ )"

        //ДАНІ ПРО ПЕРЕВІЗНИКА -----------------------------------
        // Тип Компания
        xPath = '//label[@class="nav__item"][./span[contains(text(), "Компания")]][last()]';
        resOk = await ClickByXPathNumWithScroll(1000 , page, 1, xPath);
        //await console.log('ClickByXPathNum(ДАНІ ПРО ПЕРЕВІЗНИКА => кнопка Компания)');
        if (!resOk) {
            throw `FAIL => ClickByXPathNum(ДАНІ ПРО ПЕРЕВІЗНИКА => кнопка Компания)`;//<--специальный вызов ошибки!
        }
        // Вводим "КОМПАНИЯ ПЕРЕВІЗНИКА "
        resOk = await ClickByXPath(page, '//div[@data-vv-name="transporter"]/div/input');
        if (!resOk) {
            throw `FAIL => ClickByXPath(ДАНІ ПРО ПЕРЕВІЗНИКА => КОМПАНИЯ ПЕРЕВІЗНИКА])`;//<--специальный вызов ошибки!
        }
        resOk = await TypeByXPath(page, '//div[@data-vv-name="transporter"]/div/input', DealData.strCompanyTransporter);
        if (!resOk) {
            throw `FAIL => TypeByXPath(Компания замовника => ${DealData.strCompanyTransporter}])`;//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        await page.waitFor(500);
        // Выбор из меню
        xPath = '//div[@class="search__cnt has-active"]/div[@class="search__item"]';
        resOk = await ClickByXPathNum(page, 1, xPath);
        if (!resOk) {
            throw `FAIL => Выбор из меню(КОМПАНИЯ ПЕРЕВІЗНИКА => ${DealData.strCompanyTransporter}])`;//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        // Вводим "(ЮР. ОСОБА З ПЕРЕВІЗНИКОМ )"
        await page.waitFor(500);
        let Data2 = await GetDataFromList(page, '//select[@id="transporter_our_company"]/option');
        if (!Data2.returnStatus){
            throw `FAIL => Траблы с меню(ЮР. ОСОБА З ПЕРЕВІЗНИКОМ)=>(${Data2.returnError})`;
        }
        resOk = false;
        Data2.returnList.forEach(element => {
            if (element.PropInnerText === DealData.strOurCompanyTransporter) {
                DealData.valOurCompanyTransporter = element.PropValue;
                resOk = true;
            }
        });
        if (!resOk){
            await console.log('WARNING => Не найдено в меню(ЮР. ОСОБА З ПЕРЕВІЗНИКОМ):', DealData.strOurCompanyTransporter);
            await console.log('Data2=>', Data2);
            // Если не нашли ЗАДАННОЕ значение, МЕНЯЕМ!!! его на первое значение
            DealData.strOurCompanyTransporter = Data2.returnList[0].PropInnerText;
            DealData.valOurCompanyTransporter = Data2.returnList[0].PropValue;

            await console.log('Выбрано =>', Data2.returnList[0].PropInnerText);
            //throw `FAIL => Не найдено в Дроп Листе:"${DealData.strOurCompanyTransporter}"`;
        }
        // await console.log(Data2.returnList[0].PropValue);
        // await console.log(Data2.returnList[0].PropInnerText);

        resOk = await SelectFromList(page, 'select[name="transporter_our_company"]', DealData.valOurCompanyTransporter);
        if (!resOk) {
            throw `FAIL => Выбор из меню(ЮР. ОСОБА З ПЕРЕВІЗНИКОМ => ${DealData.strOurCompanyTransporter}])`;//<--специальный вызов ошибки!
        }
        // Ура!!! наконец-то выбрали из списка "(ЮР. ОСОБА З ПЕРЕВІЗНИКОМ )"
        //  (Данні про водія )
        // КЛИК   data-vv-name="driver"
        xPath = '//div[@data-vv-name="driver"]/div/div/div/input';
        resOk = await ClickByXPathWithScroll(1000, page, xPath);
        if (!resOk) {
            throw `FAIL => клик по инпуту(Данні про водія)`;//<--специальный вызов ошибки!
        }
        // ВВОД
        resOk = await TypeByXPath(page, xPath, DealData.strDriverMiddleName);
        if (!resOk) {
            throw `FAIL => TypeByXPath(Данні про водія => ${DealData.strDriverMiddleName}])`;//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        // ВЫБОР из списка
        //xPath = `//div[@class="search__item"][starts-with(text(), "${DealData.strDriverMiddleName}")]`;
        //xPath = `//div[@class="search__item"][contains(text(), "${DealData.strDriverMiddleName}")]`;
        xPath = `//div[@class="search__item"][contains(text(), "${DealData.strDriverMiddleName}")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            //await TempStop(page);
            throw `FAIL => клик по СПИСКУ(Данні про водія"${DealData.strDriverMiddleName}")`;//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        //ОБРАНИЙ АВТОМОБІЛЬ
        // Клик по стрелке
        xPath = `//div[@class="select"][./label[starts-with(text(), "Обраний автомобіль")]]/div/div/div[@class="multiselect__select"]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по стрелке(ОБРАНИЙ АВТОМОБІЛЬ)`;//<--специальный вызов ошибки!
        }
        await page.waitFor(1000);
        // клик по пункту (первый / или номер машины)
     //  //*[@id="app"]/div/main/div/div/div[3]/div[4]/div[2]/div[1]/div/div[5]/div[1]/div/div/div/div/div[3]/ul/li[1]/span/span
        //xPath = `//span[@class="multiselect__option multiselect__option--highlight"]/span[ends-with(text(), "${DealData.strLicensePlate1}")]`;
        xPath = `//div[@class="select"][./label[starts-with(text(), "Обраний автомобіль")]]`;
        xPath+=`/div/div/div[@class="multiselect__content-wrapper"]/ul/li/span/span[contains(text(), "${DealData.strLicensePlate1}")]`;
        //xPath = `//span[contains(text(), "${DealData.strLicensePlate1}")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по пункту меню(ОБРАНИЙ АВТОМОБІЛЬ=${DealData.strLicensePlate1})`;//<--специальный вызов ошибки!
        }


        //ОБРАНИЙ ПРИЦЕП
        // Клик по стрелке
        xPath = `//div[@class="select"][./label[starts-with(text(), "Обраний прицеп")]]/div/div/div[@class="multiselect__select"]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по стрелке(ОБРАНИЙ ПРИЦЕП)`;//<--специальный вызов ошибки!
        }
        await page.waitFor(1000);
        // клик по пункту (первый / или номер ПРИЦЕПА)
        //xPath = `//span[@class="multiselect__option multiselect__option--highlight"]/span[ends-with(text(), "${DealData.strLicensePlate2}")]`;
        xPath = `//div[@class="select"][./label[starts-with(text(), "Обраний прицеп")]]`;
        xPath+=`/div/div/div[@class="multiselect__content-wrapper"]/ul/li/span/span[contains(text(), "${DealData.strLicensePlate2}")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по пункту меню(ОБРАНИЙ ПРИЦЕП=${DealData.strLicensePlate2})`;//<--специальный вызов ошибки!
        }



        //ВІДПОВІДАЛЬНИЙ ПО ФОКСУ
        // Клик по стрелке
        xPath = `//div[@class="select"][./label[starts-with(text(), "Відповідальний по Фоксу")]]/div/div/div[@class="multiselect__select"]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по стрелке(ВІДПОВІДАЛЬНИЙ ПО ФОКСУ)`;//<--специальный вызов ошибки!
        }
        await page.waitFor(1000);
        xPath = `//div[@class="select"][./label[starts-with(text(), "Відповідальний по Фоксу")]]`;
        xPath+=`/div/div/div[@class="multiselect__content-wrapper"]/ul/li/span/span[contains(text(), "${DealData.strFoxResponsible}")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по пункту меню(ВІДПОВІДАЛЬНИЙ ПО ФОКСУ=${DealData.strFoxResponsible})`;//<--специальный вызов ошибки!
        }



        //ЛОГІСТ
        // Клик по стрелке
        xPath = `//div[@class="select"][./label[starts-with(text(), "Логіст")]]/div/div/div[@class="multiselect__select"]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по стрелке(ЛОГІСТ)`;//<--специальный вызов ошибки!
        }
        await page.waitFor(1000);
        xPath = `//div[@class="select"][./label[starts-with(text(), "Логіст")]]`;
        xPath+=`/div/div/div[@class="multiselect__content-wrapper"]/ul/li/span/span[contains(text(), "${DealData.strLogistician}")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по пункту меню(ЛОГІСТ=${DealData.strLogistician})`;//<--специальный вызов ошибки!
        }



        //Клик по кнопке (Зберегти угоду)
        //   Зберегти угоду
        xPath = `//button[@class="btn"][./span[contains(text(), "Зберегти угоду")]]`;
        resOk = await ClickByXPathWithScroll(1000, page, xPath);
        if (!resOk) {
            throw `FAIL => Клик по кнопке (Зберегти угоду)`;//<--специальный вызов ошибки!
        }
        // Проверяем есть ли валидируемые незаполненные поля
        xPath = '//span[@class="element__error"]';
        resOk = await WaitForElementIsPresentByXPath(500,page,xPath);
        if (resOk) {
            let linkHandlers = await page.$x(xPath);
            //await console.log('\x1b[38;5;2m', "     Вижу валидируемые незаполненные поля" ,linkHandlers.length,"шт" , '\x1b[0m');
            g_StrOutLog+=`=> Вижу валидируемые незаполненные поля ${linkHandlers.length} шт. \n`;
        }
        //Ждём и проверяем Успешно сохранено //Успешно сохранено
        xPath = '//div[@class="noty_body"][contains(text(), "Успешно сохранено")]';
        resOk = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOk) {
            throw `FAIL => Не Вижу(Успешно сохранено) `;//<--специальный вызов ошибки!
        }


        // Ждём прогрузки страницы (Должна появиться таблица СДЕЛКИ)
        await WaitUntilPageLoads(page);
        // Ждём появление таблицы сделки
        xPath = '//div[@class="head__title"][contains(text(), "Сделки")]';
        resOk = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOk) {
            throw `FAIL => Не Вижу(//div[@class="head__title"][contains(text(), "Сделки")]) `;//<--специальный вызов ошибки!
        }

        // Ждём всей таблицы(Должна появиться таблица СДЕЛКИ)
        await WaitUntilPageLoads(page);
        //ElementGetInnerText
        xPath = `//div[@class="table"]/table/tbody/tr/td[2]`;
        resOk = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOk) {
            throw `FAIL => Не Вижу(//div[@class="table"]/table/tbody/tr/td[2]`;//<--специальный вызов ошибки!
        }
        let strDealID = await ElementGetInnerText(page , 0, xPath);
        strDealID = strDealID.trim();
        DealData.strDealID = strDealID;
        if (strDealID === '' ) {
            throw `FAIL => Не найден ID новой сделки в таблице СДЕЛКИ`;
        }
        await console.log('\x1b[38;5;2m', `     ID = ${DealData.strDealID} ` , '\x1b[0m');

        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        DealData.returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице (Создать Сделку) : ",err , '\x1b[0m');
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

module.exports.DealCreateNew = DealCreateNew;