let ContactCheckValidation = async (page, strLastName) => {
    const nameTest = NameFunction()+'->"' + strLastName + '"';
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
    let returnResult = false;
    try {
    await page.setViewport({width, height});

    //await page.setViewport({width2, height2});

        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);

        //Клик по пункту Контакты
        resOk = await ClickByXPath(page, '//a[@href="/contact"][contains(text(), "Контакты")]');
        if (!resOk) {
            throw 'ClickByXPath(//a[@href="/contact"][contains(text(), "Контакты")])';//<--специальный вызов ошибки!
        }
        //await console.log('\x1b[38;5;2m', "ClickByXPath" ,resOk , '\x1b[0m');
        //Ждём загрузки страницы
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Контакты")';//<--специальный вызов ошибки!
        }
        //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads" ,resOk , '\x1b[0m');
        //Проверяем наличие на странице Характерных элементов (Контакты)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Контакты")]');
        if (!resOk) {
            throw 'ElementIsPresent(class="head__title""Контакты")';//<--специальный вызов ошибки!
        }
        //await console.log('\x1b[38;5;2m', "Контакты ElementIsPresent" ,resOk , '\x1b[0m');
        //Клик по кнопке Создать
        resOk = await ClickByXPath(page, '//span[contains(text(), "Создать")]');
        if (!resOk) {
            throw 'ClickByXPath(//span[contains(text(), "Создать")])';//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Создание контакта50")';//<--специальный вызов ошибки!
        }
        //Проверяем наличие на странице Характерных элементов (Создание контакта)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Создание контакта")]');
        if (!resOk) {
            throw 'ElementIsPresent(class="head__title""Контакты")';//<--специальный вызов ошибки!
        }

        //Жмём на кнопку Создать контакт
        let xpButtonCreateContact = '//button[@class="btn"][./span[contains(text(), "Создать контакт")]]';
        resOk = await ClickByXPathWithScroll(1000, page, xpButtonCreateContact);
        if (!resOk) {
            throw 'ClickByXPath([....] "Создать контакт")';//<--специальный вызов ошибки!
        }
        xPath = '//span[@class="element__error"]';
        resOk = await WaitForElementIsPresentByXPath(1000,page,xPath);
        if (resOk) {
            let linkHandlers = await page.$x(xPath);
            await console.log('\x1b[38;5;2m', "     Вижу валидируемые поля" ,linkHandlers.length,"шт" , '\x1b[0m');
            if (linkHandlers.length < 3){
                throw `Валидируемых полей ${linkHandlers.length} < 3 `;//<--специальный вызов ошибки!
            }
        }
        //Переключаем Флаг на(Работает на ФО)
        resOk = await ClickByXPath(page, '//span[contains(text(), "Работает на ФО")]');
        if (!resOk) {
            throw 'ClickByXPath([....] "Работает на ФО")';//<--специальный вызов ошибки!
        }
        //Жмём на кнопку Создать контакт
        resOk = await ClickByXPath(page, xpButtonCreateContact);
        if (!resOk) {
            throw 'ClickByXPath([....] "Создать контакт")';//<--специальный вызов ошибки!
        }
        xPath = '//span[@class="element__error"]';
        resOk = await WaitForElementIsPresentByXPath(1000,page,xPath);
        if (resOk) {
            let linkHandlers = await page.$x(xPath);
            await console.log('\x1b[38;5;2m', "     Вижу валидируемые поля" ,linkHandlers.length,"шт" , '\x1b[0m');
            if (linkHandlers.length < 2){
                throw `Валидируемых полей ${linkHandlers.length} < 2 `;//<--специальный вызов ошибки!
            }
        }
        //Переключаем Флаг на(Сам является ЛПР)
        resOk = await ClickByXPath(page, '//span[contains(text(), "Сам является ЛПР")]');
        if (!resOk) {
            throw 'ClickByXPath([....] "Сам является ЛПР")';//<--специальный вызов ошибки!
        }
        //Жмём на кнопку Создать контакт

        resOk = await ClickByXPathWithScroll(5000,page, xpButtonCreateContact);
        if (!resOk) {

            throw 'ClickByXPath([....] "Создать контакт")';//<--специальный вызов ошибки!
        }
        xPath = '//span[@class="element__error"]';
        resOk = await WaitForElementIsPresentByXPath(1000,page,xPath);
        if (resOk) {
            let linkHandlers = await page.$x(xPath);
            await console.log('\x1b[38;5;2m', "     Вижу валидируемые поля" ,linkHandlers.length,"шт" , '\x1b[0m');

            //await page.waitFor(1115000);

            if (linkHandlers.length < 3){
                throw `Валидируемых полей ${linkHandlers.length} < 3 `;//<--специальный вызов ошибки!
            }
        }



        //await page.waitFor(111500);
        // '//span[@class="element__error"]'

        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Компании : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${err} => ${g_StatusCurrentTest} \n`;
        returnResult = false;
        //await page.waitFor(5001111);
    }
    await page.setViewport({width, height});
    return returnResult;//<------------------EXIT !!!

};

module.exports.ContactCheckValidation = ContactCheckValidation;