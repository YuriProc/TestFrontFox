let CreateNewUser = async (page, strUserLastName) => {
    const nameTest = NameFunction()+'->"' + strUserLastName + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    let width = 1200;
    let height = 880;
    let resOk;
    let xPath, xPathArrow ,xPathPerm;
    let tStr;

    try{
    await page.setViewport({width, height});



        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);
        //throw 'myException';//<--специальный вызов ошибки!
        //Клик по стрелке
//d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9l22.5-22.8c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6 0.1 34z"
//         await page.click("path[d=M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9l22.5-22.8c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6 0.1 34z]");
        //await page.click("svg[class=fa-faicon]");
        await page.click("div[class=header__toogle]");
        await page.waitForXPath("//div[contains(text(), 'Добавить данные')]", {timeout: 12000});
        //Клик по Добавить данные
        let linkAddData = await page.$x("//div[contains(text(), 'Добавить данные')]");
        //await page.waitFor(500);
        await linkAddData[0].click();
        //Ждём пока раскроется меню
        await page.waitForXPath("//a[contains(text(), 'Пользователи')]", {timeout: 12000});
        //Клик по пункту Пользователи
        let linkUsers = await page.$x("//a[contains(text(), 'Пользователи')]");
        await linkUsers[0].click();

        //Закрываем меню Добавить данные
        await linkAddData[0].click();
        // Закрываем SideBar (Клик по стрелке)
        await page.click("div[class=header__toogle]");
//  //*[@id="app"]/div/main/div/div[1]/div[1]/div[1]
        //#app > div > main > div > div.head > div.head__left-block > div.head__title
       // #app > div > main > div > div.head > div.head__left-block > div.head__title
        // Ждём открытие страницы Пользователи
        await page.waitForXPath("//div[@class='head__title'][contains(text(), 'Пользователи')]", {timeout: 12000});
        // Ждём появление кнопки Создать
        await page.waitForXPath("//span[contains(text(), 'Создать')]", {timeout: 12000});
        // Клик по кнопке Создать
        let linkButtonCreate = await page.$x("//span[contains(text(), 'Создать')]");
        await linkButtonCreate[0].click();
        // Ждём пока загрузится страница
        resOk = await WaitUntilPageLoads(page);
        // Проверяем наличие на странице характерных элементов (Создать пользователя)
        await page.waitFor(500);
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Создать пользователя")]');
        if (!resOk) {
            //await TempStop(page);
            throw `Не вижу  //div[@class="head__title"][contains(text(), "Создать пользователя")]`;//<--специальный вызов ошибки!
        }

        await page.waitForXPath('//*[@id="first_name"]', {timeout: 12000});

        await page.click("input[id=first_name]");
        await page.type("input[id=first_name]", 'Тест');
        await page.click("input[id=last_name]");
        await page.type("input[id=last_name]", strUserLastName);
        await page.click("input[id=middle_name]");
        await page.type("input[id=middle_name]", 'Тостерович');
        // Админ
        await page.click("div[class=multiselect__tags]");
        await page.waitForXPath("//span[contains(text(), 'Админ')]", {timeout: 12000});
        let linkSpanAdmin = await page.$x("//span[contains(text(), 'Админ')]");
        await linkSpanAdmin[0].click();
        await page.waitFor(500);
        // Глава отдела продаж //Логист
        await page.click("div[class=multiselect__tags]");
        await page.waitForXPath("//span[contains(text(), 'Глава отдела продаж')]", {timeout: 12000});
        let linkSpanLogist = await page.$x("//span[contains(text(), 'Глава отдела продаж')]");
        await linkSpanLogist[0].click();
        await page.waitFor(500);
        xPath = `//button[@class="btn"]/span[contains(text(), "Создать контакт")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk){
            tStr = `FAIL => ClickByXPath(${xPath})`;
            await console.log(tStr);
            //await TempStop(page);
            g_StrOutLog+= `\n ${tStr}`;
            throw tStr;
        }
        //await page.click("button[class=btn]");

        await page.waitForXPath("//span[contains(text(), 'Создать пользователя')]", {timeout: 12000});

        await page.click("input[id=name]");
        await page.type("input[id=name]", 'test_xxx');
        await page.click("input[id=email]");
        await page.type("input[id=email]", 'test_xxx@test.com');

        await page.click("input[name=password]");
        await page.type("input[name=password]", 'test1234567890');
        await page.click("input[name=confirm_password]");
        await page.type("input[name=confirm_password]", 'test1234567890');

        //Супер админ
        let linkMultiselectTags = await page.$x('//*[@class="multiselect__tags"]');
        await linkMultiselectTags[1].click();
        await page.waitForXPath("//span[contains(text(), 'Супер админ')]", {timeout: 12000});
        let linkSelectSuperAdmin = await page.$x("//span[contains(text(), 'Супер админ')]");
        await linkSelectSuperAdmin[0].click();
        //Логист //Глава отдела продаж
        await linkMultiselectTags[1].click();
        await page.waitForXPath("//span[contains(text(), 'Глава отдела продаж')]", {timeout: 12000});
        let linkSelectLogist = await page.$x("//span[contains(text(), 'Глава отдела продаж')]");
        await linkSelectLogist[1].click();

        //Пермишены
        //Пермишены выбрать все
        //Клик по стрелке вниз (Пермишены)
        xPath = `//div[@class="select"][./label[@class="select__label"][contains(text(), "Пермишены")]]`;
        xPath+= `/div[@class="select__area"]/div`;
        xPathArrow=xPath + `/div[@class="multiselect__select"]`;
        xPathPerm =xPath + `/div[@class="multiselect__content-wrapper"]/ul/li[@class="multiselect__element"]`;
        xPathPerm+=`/span/span`;

        let lengthPerm = await ElementGetLength(page,xPathPerm);
        if (lengthPerm<1){
            await console.log(`Warning => (Список Пермишенов длина ${lengthPerm})`);
        }
        for (let i=0; i<lengthPerm; i++){
            resOk = await ClickByXPath(page, xPathArrow);
            if (!resOk){
                throw `FAIL => Клик по стрелке вниз (i=${i})`;
            }
            await page.waitFor(200);
            resOk = await ClickByXPath(page, xPathPerm);
            if (!resOk){
                throw `FAIL => Клик по Список Пермишенов (i=${i})`;
            }
            await page.waitFor(200);

        }


        //клик по баттон создать пользователя
        await page.waitFor(500);
        await page.click("button[class=btn]");

        try{
            await page.waitForXPath('//div[contains(text(), "Пользователи")]', {timeout: 7000});
            await console.log('\x1b[38;5;2m', "Пользователь Успешно Создан", '\x1b[0m');
            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            return true;//<----------EXIT OK!!!!
        }catch(err){

            try {
                await page.waitForXPath("//span[contains(text(), 'Такое значение уже существует.')]", {timeout: 3000});
                await console.log('\x1b[38;5;1m', "Пользователь с таким ЛОГИНОМ или EMAIL уже существует !!!", '\x1b[0m');

                await page.waitForXPath('//div[contains(text(), "Пользователи")]', {timeout: 7000});
                await console.log('\x1b[38;5;2m', "Пользователи", '\x1b[0m');
                g_StatusCurrentTest = 'Пройден';
                await g_SuccessfulTests++;
                await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                return true;//<----------EXIT true!!!!
                // !!!!!!!!!!!!!!!!!!!!
            }catch (err2) {
                await console.log('\x1b[38;5;1m', "При создании Нового Юзера ЧТО ТО ПОШЛО НЕ В ТУ ДА!!!\n", err2, '\x1b[0m');
                g_StatusCurrentTest = 'Провален !!!';
                await g_FailedTests++;
                await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;

                //await page.waitFor(11111500);
            }
            //await console.log('\x1b[38;5;1m', "При создании Нового Юзера ЧТО ТО ПОШЛО НЕ В ТУ ДА!!!\n", err, '\x1b[0m');

        }

    }catch (err) {
        await console.log('\x1b[38;5;1m', "При создании Нового Юзера ЧТО ТО ПОШЛО НЕ В ТУ ДЫРКУ!!!\n", err, '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        //process.exit(0);
    }
    return false;
};

module.exports.CreateNewUser = CreateNewUser;