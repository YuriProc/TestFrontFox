let CreateNewUser = async (page, strUserLastName) => {
    const nameTest = 'CreateNewUser->"' + strUserLastName + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    let width = 1200;
    let height = 880;

    await page.setViewport({width, height});


    try{
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

        let linkAddData = await page.$x("//div[contains(text(), 'Добавить данные')]");
        //await page.waitFor(500);
        await linkAddData[0].click();

        await page.waitForXPath("//a[contains(text(), 'Пользователи')]", {timeout: 12000});
        let linkUsers = await page.$x("//a[contains(text(), 'Пользователи')]");
        await linkUsers[0].click();
//  //*[@id="app"]/div/main/div/div[1]/div[1]/div[1]
        //#app > div > main > div > div.head > div.head__left-block > div.head__title
       // #app > div > main > div > div.head > div.head__left-block > div.head__title
        await page.waitForXPath("//div[contains(text(), 'Пользователи')]", {timeout: 12000});

        await page.waitForXPath("//span[contains(text(), 'Создать')]", {timeout: 12000});
        let linkButtonCreate = await page.$x("//span[contains(text(), 'Создать')]");
        await linkButtonCreate[0].click();

        //await page.waitForXPath("//div[contains(text(), 'Создать пользователя')]", {timeout: 12000});
        await page.waitForXPath('//*[@id="first_name"]', {timeout: 12000});
        let linkGotoUsers = await page.$x('//*[@href="/user"]');
        await page.click("input[id=first_name]");
        await page.type("input[id=first_name]", 'Тест');
        await page.click("input[id=last_name]");
        await page.type("input[id=last_name]", strUserLastName);
        await page.click("input[id=middle_name]");
        await page.type("input[id=middle_name]", 'Тостерович');

        await page.click("div[class=multiselect__tags]");
        await page.waitForXPath("//span[contains(text(), 'Админ')]", {timeout: 12000});
        let linkSpanAdmin = await page.$x("//span[contains(text(), 'Админ')]");
        await linkSpanAdmin[0].click();
        await page.waitFor(500);
        await page.click("button[class=btn]");

        await page.waitForXPath("//span[contains(text(), 'Создать пользователя')]", {timeout: 12000});

        await page.click("input[id=name]");
        await page.type("input[id=name]", 'test');
        await page.click("input[id=email]");
        await page.type("input[id=email]", 'test@test.com');

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
                //let linkGotoUsers = await page.$x('//*[@href="/user"]');
                //await linkGotoUsers[0].click();
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
            await linkGotoUsers[0].click();
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