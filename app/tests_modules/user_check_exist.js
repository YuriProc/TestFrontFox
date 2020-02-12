
async function isElementVisible(page, cssSelector) {
    try {
        await page.waitForSelector(cssSelector, {visible: true, timeout: 1000});
        return true;
    } catch (e) {
        return false;
    }
}

let CheckUserExist = async (page, strSearchUser) => {
    const nameTest = NameFunction()+'->"' + strSearchUser + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);

    //let strSearchUser = 'Тосте';
    let strSpecialErrorSearchUser = 'strSpecialErrorSearchUser';
    let strNotFind = 'Ничего не найдено';
    let findExistUserOk = false;




    let width = 1200;
    let height = 880;
    let widthX = 1200;
    let heightX = 1800;
    let xPath;
    let ElPresent, ElPresent1, ElPresent2, ElPresent3;
    let resOk;
    let returnResult = false;
    try {
    await page.setViewport({width, height});

        //Клик по ЛОГО
        resOk = await ClickByXPath(page, '//div[@class="logo__icon"]');
        if (!resOk) {
            throw 'ClickByXPath(//div[@class="logo__icon"])';//<--специальный вызов ошибки!
        }
        //Ждём "Вітаємо вас в системі FOX CRM"
        resOk = await WaitForElementIsPresentByXPath(1000,page,'//div[contains(text(), "Вітаємо вас в системі FOX CRM")]');
        if (!resOk) {
            throw 'Не вижу "Вітаємо вас в системі FOX CRM"';//<--специальный вызов ошибки!
        }
        //Клик по стрелке
        resOk = await ClickByXPath(page, '//div[@class="header__toogle"]');
        if (!resOk) {
            throw 'ClickByXPath(//div[@class="header__toogle"])';//<--специальный вызов ошибки!
        }

        //Ждём появление пункта 'Добавить данные'
        resOk = await WaitForElementIsPresentByXPath(1000,page,'//div[contains(text(), "Добавить данные")]');
        if (!resOk) {
            throw 'Не вижу "Добавить данные"';//<--специальный вызов ошибки!
        }

        //Клик по пункту 'Добавить данные'
        resOk = await ClickByXPath(page, "//div[contains(text(), 'Добавить данные')]");
        if (!resOk) {
            throw 'ClickByXPath(//div[contains(text(), \'Добавить данные\')])';//<--специальный вызов ошибки!
        }

        //Ждём появление пункта 'Пользователи'
        resOk = await WaitForElementIsPresentByXPath(1000,page,'//a[contains(text(), "Пользователи")]');
        if (!resOk) {
            throw 'Не вижу "Добавить данные -> Пользователи"';//<--специальный вызов ошибки!
        }
        //Клик по пункту 'Пользователи'
        resOk = await ClickByXPath(page, "//a[contains(text(), 'Пользователи')]");
        if (!resOk) {
            throw "ClickByXPath(//a[contains(text(), 'Пользователи')])";//<--специальный вызов ошибки!
        }
        //Ждём открытие страницы 'Пользователи'
        await WaitUntilPageLoads(page);
        resOk = await WaitForElementIsPresentByXPath(12000,page,'//div[contains(text(), "Пользователи")]');
        if (!resOk) {
            throw 'Не вижу //div[contains(text(), "Пользователи")]';//<--специальный вызов ошибки!
        }
        //закрываем Добавить данные, SideBar в обратном порядке !!!
        resOk = await ClickByXPath(page, "//div[contains(text(), 'Добавить данные')]");
        resOk = await ClickByXPath(page, '//div[@class="header__toogle"]');

        //Клик по инпуту //input[@placeholder="Фамилия пользователя"]
        resOk = await ClickByXPath(page, '//input[@placeholder="Фамилия пользователя"]');
        if (!resOk) {
            throw 'ClickByXPath(//input[@placeholder="Фамилия пользователя"])])';//<--специальный вызов ошибки!
        }
        resOk = await TypeByXPath(page, '//input[@placeholder="Фамилия пользователя"]',strSpecialErrorSearchUser);
        if (!resOk) {
            throw 'TypeByXPath(page, \'//input[@placeholder="Фамилия пользователя"]\',strSpecialErrorSearchUser)';//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        //Ждём появление пункта "Ничего не найдено"
        resOk = await WaitForElementIsPresentByXPath(1000,page,`//b[contains(text(), '${strNotFind}')]`);
        if (!resOk) {
            throw 'Не вижу "Ничего не найдено"';//<--специальный вызов ошибки!
        }
        //await console.log('\x1b[38;5;1m', "        OK!!! ", '\x1b[0m');
        //await page.waitFor(500000);
        //Очищаем input поиска Фамилии
        //Клик по крестику

        resOk = await ClickByXPath(page, '//div[@class="search__nav"]');
        if (!resOk) {
            throw 'Клик по крестику ClickByXPath(//div[@class="search__nav"]) Не получился';//<--специальный вызов ошибки!
        }
        //Теперь вводим строку Тостер
        //Клик по инпуту //input[@placeholder="Фамилия пользователя"]
        resOk = await ClickByXPath(page, '//input[@placeholder="Фамилия пользователя"]');
        if (!resOk) {
            throw 'ClickByXPath(//input[@placeholder="Фамилия пользователя"])])';//<--специальный вызов ошибки!
        }
        resOk = await TypeByXPath(page, '//input[@placeholder="Фамилия пользователя"]',strSearchUser);
        if (!resOk) {
            throw 'TypeByXPath(page, \'//input[@placeholder="Фамилия пользователя"]\',strSpecialErrorSearchUser)';//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        // Теперь Должна быть найдена фмиилия strSearchUser
        //проверим есть ли Надпись "Ничего не найдено"
        resOk = await WaitForElementIsPresentByXPath(1000,page,`//b[contains(text(), '${strNotFind}')]`);
        if (resOk) {//Надпись "Ничего не найдено " присутствует
            await console.log('\x1b[38;5;1m', "       Вижу ->  ",strNotFind, '\x1b[0m');
        }else{
            //Ждём появление кнопки редактировать
            resOk = await WaitForElementIsPresentByXPath(1000,page,'//a[@class="table__option"]');
            if (!resOk) {
                throw 'Не вижу кнопки редактировать -> //a[@class="table__option"]';//<--специальный вызов ошибки!
            }

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

        }
        //await console.log('\x1b[38;5;1m', "        OK!!! ", '\x1b[0m');
        //await page.waitFor(500000);




        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;

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