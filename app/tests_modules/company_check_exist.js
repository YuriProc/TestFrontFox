let CompanyCheckExist = async (page, strCodeCompany) => {
    const nameTest = NameFunction()+'->"' + strCodeCompany + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1900;
    let height = 880;

    let findExistCompanyOk = false;
    let ElPresent1,ElPresent2,ElPresent3;
    await page.setViewport({width, height});
    try{
        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);
        //await page.click("a[href='/company']");
        let linkCompany = await page.$x('//a[@href="/company"]');
        await linkCompany[0].click();
        //Ждём появления тайтла компании
        await page.waitForXPath('//div[@class="head__title"][contains(text(), \'Компании\')]', {visible: true, timeout: 20000});
        //await console.log('\x1b[38;5;2m', "     Вижу => div[@class=\"head__title\"][contains(text(), \'Компании\')] ", '\x1b[0m');
        //Ждём появление кнопки редактировать
        await page.waitForXPath('//a[@class="table__option"]', {timeout: 25000});
        // await page.click("input[placeholder=ЕДРПОУ\\ИНН]");
        // await page.type("input[placeholder=ЕДРПОУ\\ИНН]",strCodeCompany);

        let linkSearchCodeCompany = await page.$x('//input[@placeholder="ЕДРПОУ\\ИНН"]');
        //Вводим неправильные данные которых гарантированно не в базе
        await linkSearchCodeCompany[0].click();
        await linkSearchCodeCompany[0].type('077584765812442390485743843275830011');
        await page.waitFor(500);
        await page.keyboard.press('Enter',{delay: 100});
        await page.waitFor(500);
        //Ждём появление Надписи "Ничего не найдено"
        await page.waitForXPath('//b[contains(text(), "Ничего не найдено")]', {visible: true, timeout: 20000});
        //await console.log('\x1b[38;5;2m', '     Вижу => b[contains(text(), "Ничего не найдено")]', '\x1b[0m');
        //Очищаем input поиска КОДА кликом по крестику
        await page.click("div[class=search__nav]");
        //Вводим правильные данные которые есть в реестре но мы хотим проверить их в нашей базе
        await linkSearchCodeCompany[0].click();
        await linkSearchCodeCompany[0].type(strCodeCompany);
        await page.keyboard.press('Enter',{delay: 100});

        //await page.waitForXPath('//a[@class="table__option"]', {timeout: 12000});
        //Кнопка РЕДАКТИРОВАТЬ => '//a[@class="table__option"]'
        //Ждём появление кнопки редактировать
        ElPresent1 = await WaitUntilElementIsPresentByXPath(5000,page,'//a[@class="table__option"]');
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
            ElPresent2 = await WaitUntilElementIsPresentByXPath(2000,page,'//b[contains(text(), "Ничего не найдено")]');
            if (ElPresent2) { //надпись "Ничего не найдено" есть
                await console.log('\x1b[38;5;1m', "     Вижу => Ничего не найдено", '\x1b[0m');
                g_StatusCurrentTest = 'Пройден';
                await g_SuccessfulTests++;
                await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                findExistCompanyOk = false;
                return findExistCompanyOk;// <----------------------------- EXIT OK!!!
            }else { //надписи "Ничего не найдено" НЕТ это ошибка
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