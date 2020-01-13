
async function isElementVisible(page, cssSelector) {
    try {
        await page.waitForSelector(cssSelector, {visible: true, timeout: 1000});
        return true;
    } catch (e) {
        return false;
    }
}

let CheckUserExist = async (page, strSearchUser) => {
    const nameTest = 'CheckUserExist->"' + strSearchUser + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1200;
    let height = 880;
    //let strSearchUser = 'Тосте';
    let strSpecialErrorSearchUser = 'strSpecialErrorSearchUser';
    let findExistUserOk = false;
    await page.setViewport({width, height});
    try {
        //Клик по стрелке
        await page.click("div[class=header__toogle]");
        //await console.log('\x1b[38;5;2m', "Клик по стрелке('div[class=header__toogle]'" , '\x1b[0m');
        //Ждём появление пункта 'Добавить данные'
        await page.waitForXPath("//div[contains(text(), 'Добавить данные')]", {timeout: 12000});
        //Клик по пункту 'Добавить данные'
        let linkAddData = await page.$x("//div[contains(text(), 'Добавить данные')]");
        await linkAddData[0].click();
        //Ждём появление пункта 'Пользователи'
        await page.waitForXPath("//a[contains(text(), 'Пользователи')]", {timeout: 12000});
        // await console.log('\x1b[38;5;2m', "page.waitForXPath//a[contains(text(), 'Пользователи')]" , '\x1b[0m');
        // await page.waitFor(1000000);
        //Клик по пункту 'Пользователи'
        let linkUsers = await page.$x("//a[contains(text(), 'Пользователи')]");
        await linkUsers[0].click();
        // await console.log('\x1b[38;5;2m', "Клик по пункту 'Пользователи'//a[contains(text(), 'Пользователи')]" , '\x1b[0m');
        // await page.waitFor(500);
        //Ждём открытие страницы 'Пользователи'
        await WaitUntilPageLoads(page);
        await page.waitForXPath("//div[contains(text(), 'Пользователи')]", {timeout: 12000});

        //await console.log('\x1b[38;5;2m', "waitForXPath('//div[contains(text(), 'Пользователи')]" , '\x1b[0m');
        //Опять Клик по стрелке Закрываем SideBar
        await page.click("div[class=header__toogle]");
        //await page.waitFor(1000000);
        // await page.hover ("input[name=search]");
        // await page.waitFor(1000);
        // let PMouse = await page.mouse;
        // await PMouse.click(600,135);
        // await page.waitFor(1000);
        // let linkSearch = await page.$x('//*[@id="search"]');
        // await linkSearch[0].click();
        await page.waitFor(500);
        // Вводим в поиск по Фамилии Фамилию strSpecialErrorSearchUser
        await page.click("input[name=search]");
        //await page.type("input[name=search]", strSearchUser);//Тостер//strSpecialErrorSearchUser
        await page.type("input[name=search]", strSpecialErrorSearchUser);
        await WaitUntilPageLoads(page);
        //await page.waitFor(500);
        //Жмём Enter
        //await page.keyboard.press('Enter',{delay: 200});
        //let pLOk = await WaitUntilPageLoads(page);
        //await page.waitFor(500);

        //Проверяем наличие Фамилии в строках таблицы
        // await page.waitForXPath("//tr[contains(text(), 'то')]", {timeout: 12000});
        // let linkUsersExist = await page.$x("//tr[contains(text(), 'то')]");
        // await linkUsersExist[0].click();

        //Ждём появление Надписи "Ничего не найдено"
        let strNotFind = "Ничего не найдено";
        try {
            await page.waitForXPath(`//b[contains(text(), '${strNotFind}')]`, {timeout: 12000});
            //await console.log('\x1b[38;5;2m', `НАЙДЕНО -> \"${strNotFind}\"`, '\x1b[0m');
            //Очищаем input поиска Фамилии
            await page.click("div[class=search__nav]");
            // Вводим в поиск по Фамилии Фамилию strSearchUser
            await page.click("input[name=search]");
            //await page.type("input[name=search]", strSearchUser);//Тостер//strSpecialErrorSearchUser
            await page.type("input[name=search]", strSearchUser);
            //Жмём Enter
            await page.keyboard.press('Enter',{delay: 100});
            //await page.waitFor(5000);
            // Теперь Должна быть найдена фмиилия strSearchUser
            //проверим есть ли Надпись "Ничего не найдено"
            let VisibleStrNotFind = await ElementIsPresent(page, `//b[contains(text(), '${strNotFind}')]`);
            if (!VisibleStrNotFind) { //Надпись "Ничего не найдено " присутствует
                await console.log('\x1b[38;5;1m', "         ",strNotFind, '\x1b[0m');
            }else{
                //await console.log('\x1b[38;5;2m', "     NOT VisibleStrNotFind: ",VisibleStrNotFind, '\x1b[0m');
                try { //Ждём появление кнопки редактировать
                    await page.waitForXPath('//a[@class="table__option"]', {timeout: 12000});
                    //Считаем количество кнопок
                    let linkEditUser = await page.$x('//a[@class="table__option"]');
                    //await linkEditUser[0].click();
                    let tempStr = "     Записей найдено: "+ linkEditUser.length;
                    await console.log('\x1b[38;5;2m', tempStr, '\x1b[0m');
                    //Выводим фамилии
                    let i = 0;
                    let TextF;
                    let posSU;
                    let linkTextX = await page.$x("//tbody/tr/td[5]");
                    for (let linkF of linkTextX) { // Проходимся в цикле по каждому элементу
                        i++;
                        TextF = await page.evaluate(elm => elm.textContent, linkF);
                        TextF = await TextF.trim();
                        posSU = TextF.indexOf(strSearchUser,0);

                        if (posSU !== -1){
                            findExistUserOk = true;
                        }
                        tempStr = "             found TextF[" + i + "]:";
                        await console.log('\x1b[38;5;2m', tempStr ,TextF, '\x1b[0m');
                    }
                }catch (e) {
                    // НЕ появилась кнопка редактировать
                    await console.log('\x1b[38;5;1m', `     --> НЕ появилась кнопка редактировать !!!`, '\x1b[0m');
                    let VisibleStrNotFind = await ElementIsPresent(page, `//b[contains(text(), '${strNotFind}')]`);
                    if (VisibleStrNotFind) { //Надпись "Ничего не найдено " присутствует
                        await console.log('\x1b[38;5;1m', "         ", strNotFind, '\x1b[0m');
                    }
                    findExistUserOk = false;
                }
            }

        }catch (e) {
            await console.log('\x1b[38;5;1m', `НЕ НАЙДЕНО -> \"${strNotFind}\" !!!`, '\x1b[0m');
            await console.log('\x1b[38;5;1m', `Ошибка -> \"${e}\" !!!`, '\x1b[0m');
        }
        if (findExistUserOk) {
            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        }else{
            g_StatusCurrentTest = 'Провален !!!';
            await g_FailedTests++;
            await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        }
        await page.waitFor(1000);

    }catch (e) {
        console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Добавить данные или Пользователи : ",e , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
    }
    //await page.waitFor(500000);
    return findExistUserOk;
};

module.exports.CheckUserExist = CheckUserExist;