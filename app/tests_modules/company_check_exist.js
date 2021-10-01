let CompanyCheckExist = async (page, strCodeCompany) => {
    const nameTest = NameFunction()+'->"' + strCodeCompany + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1900;
    let height = 880;
    let resOK;
    let xPath;
    let tStr;

    let findExistCompanyOk = false;
    let ElPresent1,ElPresent2,ElPresent3;
    try{
    await page.setViewport({width, height});

        //Клик по LOGO
        // await page.click("div[class=logo__icon]");
        // await page.waitFor(500);
        // await WaitUntilPageLoads(page);
        // await page.waitFor(500);
        // await WaitUntilPageLoads(page);
        // await page.waitFor(500);
        //xPath = `//a[@href="/crm/companies"]`;
        xPath = `//li[@class="info"]/a[@href="/crm/companies"][contains(text(), "Компании")]`;
        resOK = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOK) {
            await console.log('\x1b[38;5;1m', `     Нет пункта Компании ${xPath}`, '\x1b[0m');
        }

        resOK = await ClickByXPath(page, xPath);
        if (!resOK){
            throw `FAIL => Клик по кнопке КОМПАНИИ(${xPath})`;
        }

        await WaitUntilPageLoads(page);

        xPath = `//li[@class="info"]/a[@href="/crm/companies"][contains(text(), "Компании")][@aria-current="page"]`;
        resOK = await WaitForElementIsPresentByXPath(5000, page, xPath);

        if (!resOK){
            throw `FAIL => Кнопка КОМПАНИИ не ПОДЧЁРКНУТА (${xPath})`;
        }

        await WaitUntilPageLoads(page);
        // Проверим есть ли название столбца ЕДРПОУ [aria-colindex="5"]
        xPath = `//th[@role="columnheader"][@aria-colindex="5"]/div[contains(text(), "ЕДРПОУ")]`;
        resOK = await WaitForElementIsPresentByXPath(20000, page, xPath);
        if (!resOK){
            throw `FAIL => НЕ Вижу (${xPath})`;
        }
        //проверим есть ли строки в таблице компаний

        xPath = `//tbody[@role="rowgroup"][@class="crm-table__body"]`;
        xPath+= `/tr[@role="row"]/td[@aria-colindex="1"][@role="cell"]`;
        resOK = await ElementGetLength( page ,xPath);
        if (resOK == -1 ){
            throw `FAIL => После Клика по кнопке КОМПАНИИ => НЕ ВИЖУ НИ ОДНОЙ КОМПАНИИ (${xPath})`;
        }else{
            //await console.log(`вижу  => ${resOK} шт.`);
        }
       // Взять ЕДРПОУ из первой строки
        xPath = `//tr[@role="row"]/td[@aria-colindex="5"][@role="cell"]/a`;
        let firstEDRPOU = await ElementGetInnerText(page, 1, xPath);
        if (firstEDRPOU === ''){
            throw `FAIL => ЕДРПОУ в первой строке пустое(${firstEDRPOU})`;
        }


        // Открываем фильтр
        xPath = `//div[@id="navigation-input"][input[@placeholder="Открыть фильтр"]]`;
        resOK = await WaitForElementIsPresentByXPath(20000, page, xPath);
        if (!resOK){
            throw `FAIL => НЕ Вижу (${xPath})`;
        }
        resOK = await ClickByXPath(page, xPath);
        if (!resOK){
            throw `FAIL => ClickByXPath (${xPath})`;
        }
        await WaitUntilPageLoads(page);

        // Проверим Инпут ЕДРПОУ
        xPath = `//input[@name="ЕДРПОУ"]`;
        resOK = await WaitForElementIsPresentByXPath(20000, page, xPath);
        if (!resOK){
            throw `FAIL => НЕ Вижу (${xPath})`;
        }
        resOK = await ClickByXPath(page, xPath);
        if (!resOK){
            throw `FAIL => ClickByXPath (${xPath})`;
        }
        resOK = await SetInputByXPath(page,xPath,firstEDRPOU); //strCompanyCode
        if (!resOK){
            throw `FAIL => SetInputByXPath (${xPath})`;
        }
        //Жмём Фильтровать
        xPath = `//button[@type="submit"][contains(text(), "Фильтровать")]`;
        resOK = await ClickByXPath(page, xPath);
        if (!resOK){
            throw `FAIL => ClickByXPath (${xPath})`;
        }


        xPath = `//td[@aria-colindex="5"][@role="cell"]/a[contains(text(), "${firstEDRPOU}")]`;//strCompanyCode
        resOK = await WaitForElementIsPresentByXPath(20000, page, xPath);
        if (!resOK){
            throw `FAIL => Фильтр по ЕДРПОУ не работает WaitForElementIsPresentByXPath (${xPath})`;
        }
        // проверим искомый ЕДРПОУ
        // Открываем фильтр
        xPath = `//div[@id="navigation-input"][input[@placeholder="Открыть фильтр"]]`;
        resOK = await WaitForElementIsPresentByXPath(20000, page, xPath);
        if (!resOK){
            throw `FAIL => НЕ Вижу (${xPath})`;
        }
        resOK = await ClickByXPath(page, xPath);
        if (!resOK){
            throw `FAIL => ClickByXPath (${xPath})`;
        }

        // Дабл клик по инпуту ЕДРПОУ для выделения
        xPath = `//input[@name="ЕДРПОУ"]`;
        resOK = await DoubleClickByXPath(page, xPath);
        if (!resOK){
            throw `FAIL => ClickByXPath (${xPath})`;
        }
        // перезаписываем то что в инпуте
        resOK = await SetInputByXPath(page,xPath,strCodeCompany); //strCompanyCode
        if (!resOK){
            throw `FAIL => SetInputByXPath (${xPath})`;
        }
        //Жмём Фильтровать
        xPath = `//button[@type="submit"][contains(text(), "Фильтровать")]`;
        resOK = await ClickByXPath(page, xPath);
        if (!resOK){
            throw `FAIL => ClickByXPath (${xPath})`;
        }
        // проверяем есть ли строки
        xPath = `//td[@aria-colindex="5"][@role="cell"]/a[contains(text(), "${strCodeCompany}")]`;//strCompanyCode
        ElPresent1 = await WaitForElementIsPresentByXPath(4000, page, xPath);


       // await page.waitFor(50000);




        if (ElPresent1) {// компания найдена
            await console.log('\x1b[38;5;2m', "     Вижу => Шото нашли!!! ", '\x1b[0m');
            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            findExistCompanyOk = true;
            return findExistCompanyOk;// <----------------------------- EXIT OK!!!
        }else{// компания НЕ найдена


                await console.log('\x1b[38;5;1m', "     Вижу => Ничего не найдено", '\x1b[0m');
                g_StatusCurrentTest = 'Пройден';
                await g_SuccessfulTests++;
                await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                findExistCompanyOk = false;
                return findExistCompanyOk;// <----------------------------- EXIT OK!!!

        }
    }catch (err) {
        console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Компании : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;

    }

    return false;// <----------------------------- EXIT FAILED FALSE!!!
};

module.exports.CompanyCheckExist = CompanyCheckExist;
