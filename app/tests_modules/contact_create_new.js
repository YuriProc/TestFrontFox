let ContactCreateNew = async (page, typeWork,strLastName, strFirstName, MyFilePath) => {
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
//---------------


        //Клик по Галочке (Работает на компанию)
        resOk = await ClickByXPath(page, '//span[contains(text(), "Работает на компанию")]');
        if (!resOk) {
            throw 'ClickByXPath([....] "Работает на компанию")';//<--специальный вызов ошибки!
        }
        //Выбираем ТИП КОНТАКТА
        //Клик по ТИП КОНТАКТА
        let xpContactType = '//div[@class="multiselect__tags"][./input[@placeholder="Тип контакта"]]';
        resOk = await ClickByXPath(page, xpContactType);
        if (!resOk) {
            throw 'ClickByXPath([....] "Создать контакт")';//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        //Выбираем Директор
        //  //*[@id="app"]/div/main/div/div[2]/div/div/div[1]/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/ul/li[6]/span/span
        resOk = await ClickByXPath(page, '//span[contains(text(), "Директор")]');
        if (!resOk) {
            throw 'ClickByXPath([....] "Директор")';//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        //Клик по инпуту Фамилия
        let xpLastName = '//input[@id="last_name"]';
        resOk = await ClickByXPath(page, xpLastName);
        if (!resOk) {
            throw `ClickByXPath(${xpLastName})`;//<--специальный вызов ошибки!
        }
        //Вводим Фамилию
        resOk = await TypeByXPath(page, xpLastName, strLastName);
        if (!resOk) {
            throw `TypeByXPath(${xpLastName})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        //Клик по инпуту Имя
        let xpFirstName = '//input[@id="first_name"]';
        resOk = await ClickByXPath(page, xpFirstName);
        if (!resOk) {
            throw `ClickByXPath(${xpFirstName})`;//<--специальный вызов ошибки!
        }
        //Вводим Имя
        resOk = await TypeByXPath(page, xpFirstName, strFirstName);
        if (!resOk) {
            throw `TypeByXPath(${xpFirstName})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(1000);
        //Клик по инпуту КОМПАНИЯ
        let xpCompanies = '//div[@class="multiselect__tags"][./input[@name="companies"]]';
        resOk = await ClickByXPath(page, xpCompanies);
        if (!resOk) {
            throw `ClickByXPath(${xpCompanies})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        resOk = await TypeByXPath(page, xpCompanies, 'транслойд');
        if (!resOk) {
            throw `TypeByXPath(${xpCompanies})`;//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        //await page.waitFor(1111500);
        if (!resOk) {
            throw 'WaitUntilPageLoads("поиск ТРАНСЛОЙД")';//<--специальный вызов ошибки!
        }
        resOk = await ClickByXPath(page, '//span[contains(text(), "ТОВ ТРАНСЛОЙД")]');
        if (!resOk) {
            throw `ClickByXPath(${xpCompanies})`;//<--специальный вызов ошибки!
        }
        //Выбираем ФОТО
        if (MyFilePath !== '') {
            let [fileChooser] = await Promise.all([
                page.waitForFileChooser(),
                page.click('div[id=dropzone]'), // some button that triggers file selection
            ]);
            //await page.waitFor(2000);
            //  https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.prostir.ua%2Fwp-content%2Fuploads%2F2015%2F10%2F%25D0%25B4%25D0%25B8%25D1%2580%25D0%25B5%25D0%25BA%25D1%2582%25D0%25BE%25D1%2580.gif&imgrefurl=https%3A%2F%2Fwww.prostir.ua%2F%3Fjobs%3Dkonkurs-na-posadu-vykonavchoho-dyrektora&docid=3r0cDABEkQ5S-M&tbnid=dAksQBOtnCnWzM%3A&vet=10ahUKEwju-fTmtsvmAhWtxaYKHeVPAqwQMwhbKBEwEQ..i&w=490&h=409&itg=1&bih=933&biw=1729&q=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B4%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%BE%D1%80&ved=0ahUKEwju-fTmtsvmAhWtxaYKHeVPAqwQMwhbKBEwEQ&iact=mrc&uact=8
            //  http://old.xp.od.ua/images/director.png
            //let MyFilePath = '/Users/Urupa/Pictures/director1.jpeg';

            await fileChooser.accept([MyFilePath]);
            await page.waitFor(3000);
            //await fileChooser.cancel();
            //await page.waitFor(1111500);
        }

        //Жмём на кнопку Создать контакт
        let xpButtonCreateContact = '//button[@class="btn"][./span[contains(text(), "Создать контакт")]]';
        resOk = await ClickByXPathWithScroll(2000 ,page, xpButtonCreateContact);
        if (!resOk) {
            throw 'ClickByXPath([....] "Создать контакт")';//<--специальный вызов ошибки!
        }

        xPath = '//span[@class="element__error"]';
        resOk = await WaitForElementIsPresentByXPath(500,page,xPath);
        if (resOk) {
            let linkHandlers = await page.$x(xPath);
            await console.log('\x1b[38;5;2m', "     Вижу валидируемые незаполненные поля" ,linkHandlers.length,"шт" , '\x1b[0m');
            if (linkHandlers.length < 3){
                throw `Валидируемых незаполненных полей ${linkHandlers.length} < 3 `;//<--специальный вызов ошибки!
            }
        }
        //Ждём Успешно сохранено
        resOk = await WaitForElementIsPresentByXPath(5000,page,'//div[@class="noty_body"][contains(text(), "Успешно сохранено")]');
        if (!resOk) {
            await console.log('\x1b[38;5;2m', "     Не вижу (Успешно сохранено)" , '\x1b[0m');
            throw `Отсутствует (Успешно сохранено)`;//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        //await page.waitFor(1111500);
        if (!resOk) {
            throw 'WaitUntilPageLoads("СОХРАНИТЬ КОНТАКТ")';//<--специальный вызов ошибки!
        }


        //await page.waitFor(111500);
        // '//span[@class="element__error"]'


        //

        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Создание контакта : ",err , '\x1b[0m');
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

module.exports.ContactCreateNew = ContactCreateNew;