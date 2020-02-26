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
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);

        xPath = `//a[@href="/company"]`;
        resOK = await WaitForElementIsPresentByXPath(5000, page, xPath);
        resOK = await ClickByXPath(page, xPath);
        if (!resOK){
            throw `FAIL => Клик по кнопке КОМПАНИИ(${xPath})`;
        }
        await WaitUntilPageLoads(page);
        //Ждём появления тайтла компании
        xPath = `//div[@class="head__title"][contains(text(), "Компании")]`;
        resOK = await WaitForElementIsPresentByXPath(20000, page, xPath);
        if (!resOK){
            throw `FAIL => НЕ Вижу (${xPath})`;
        }


        //Ждём появление кнопки редактировать
        xPath = `//a[@class="table__option"]`;
        resOK = await WaitForElementIsPresentByXPath(35000, page ,xPath);
        if (!resOK){
            throw `FAIL => После Клика по кнопке КОМПАНИИ => НЕ ВИЖУ НИ ОДНОЙ КОМПАНИИ (${xPath})`;
        }


        // await page.click("input[placeholder=ЕДРПОУ\\ИНН]");
        // await page.type("input[placeholder=ЕДРПОУ\\ИНН]",strCodeCompany);

        let linkSearchCodeCompany = await page.$x('//input[@placeholder="ЕДРПОУ\\ИНН"]');
        //Вводим неправильные данные которых гарантированно не в базе
        await linkSearchCodeCompany[0].click();
        await linkSearchCodeCompany[0].type('077584765812442390485743843275830011');
        await page.waitFor(500);
        await page.keyboard.press('Enter',{delay: 100});
        await page.waitFor(500);
        await WaitUntilPageLoads(page);
        //Ждём появление Надписи "Ничего не найдено"
        xPath = `//b[contains(text(), "Ничего не найдено")]`;
        resOK = await WaitForElementIsPresentByXPath(20000, page, xPath);
        if (!resOK){
            throw `FAIL => НЕ ВИЖУ НАДПИСИ "Ничего не найдено"`;
        }

        //Очищаем input поиска КОДА кликом по крестику
        await page.click("div[class=search__nav]");
        //Вводим правильные данные которые есть в реестре но мы хотим проверить их в нашей базе
        await linkSearchCodeCompany[0].click();
        await linkSearchCodeCompany[0].type(strCodeCompany);
        await page.keyboard.press('Enter',{delay: 100});
        await WaitUntilPageLoads(page);
        //await page.waitForXPath('//a[@class="table__option"]', {timeout: 12000});
        //Кнопка РЕДАКТИРОВАТЬ => '//a[@class="table__option"]'
        //Ждём появление кнопки редактировать
        ElPresent1 = await WaitForElementIsPresentByXPath(5000,page,'//a[@class="table__option"]');
        if (ElPresent1) {// кнопка редактировать есть
            await console.log('\x1b[38;5;2m', "     Вижу => Шото нашли!!! ", '\x1b[0m');
            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            findExistCompanyOk = true;
            return findExistCompanyOk;// <----------------------------- EXIT OK!!!
        }else{// кнопки редактировать НЕТ
            // ищем надпись "Ничего не найдено"
            ElPresent2 = await WaitForElementIsPresentByXPath(2000,page,'//b[contains(text(), "Ничего не найдено")]');
            if (ElPresent2) { //надпись "Ничего не найдено" есть
                await console.log('\x1b[38;5;1m', "     Вижу => Ничего не найдено", '\x1b[0m');
                g_StatusCurrentTest = 'Пройден';
                await g_SuccessfulTests++;
                await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                findExistCompanyOk = false;
                return findExistCompanyOk;// <----------------------------- EXIT OK!!!
            }else { //надписи "Ничего не найдено" НЕТ это ошибка
                tStr = `Компанию не нашли и надписи "Ничего не найдено" НЕТ - это ошибка`;
                await console.log(`${tStr}`);
                g_StrOutLog+=`\n ${tStr}`;
                g_StatusCurrentTest = 'Провален !!!';
                await g_FailedTests++;
                await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                findExistCompanyOk = false;
                return findExistCompanyOk;// <----------------------------- EXIT FAILED FALSE!!!
            }
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