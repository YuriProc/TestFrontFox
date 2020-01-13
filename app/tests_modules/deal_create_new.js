let DealCreateNew = async (browser, page, strLicensePlate) => {
    const nameTest = 'DealCreateNew->"' + strLicensePlate + '"';
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

        //Клик по пункту Сделки
        resOk = await ClickByXPath(page, '//a[@href="/deal"][contains(text(), "Сделки")]');
        if (!resOk) {
            throw 'ClickByXPath(//a[@href="/deal"][contains(text(), "Сделки")])';//<--специальный вызов ошибки!
        }

        //Ждём загрузки страницы
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Сделки")';//<--специальный вызов ошибки!
        }

        //Проверяем наличие на странице Характерных элементов (Сделки)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Сделки")]');
        if (!resOk) {
            throw 'Not ElementIsPresent(class="head__title""Сделки")';//<--специальный вызов ошибки!
        }

        //Клик по кнопке Создать
        resOk = await ClickByXPath(page, '//span[contains(text(), "Создать")]');
        if (!resOk) {
            throw 'ClickByXPath(//span[contains(text(), "Создать")])';//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Створити угоду")';//<--специальный вызов ошибки!
        }
        //Проверяем наличие на странице Характерных элементов (Створити угоду)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Створити угоду")]');
        if (!resOk) {
            throw 'ElementIsPresent(class="head__title""Створити угоду")';//<--специальный вызов ошибки!
        }
//---------------

        //Клик по инпуту (Дата завантаження )
        let xpDateOfLoad = '//div[@class="form__item"][./label[contains(text(), "Дата завантаження ")]]/input[@class="element__area"]';
        resOk = await ClickByXPath(page, xpDateOfLoad);
        if (!resOk) {
            throw `ClickByXPath(${xpDateOfLoad})`;//<--специальный вызов ошибки!
        }
        //Вводим Номерной знак
        resOk = await TypeByXPath(page, xpLicensePlate, strLicensePlate);
        if (!resOk) {
            throw `TypeByXPath(${xpLicensePlate})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        //Клик по кнопке Проверить в базе
        let xpButtonCheckInBase = '//button[@class="btn"][./span[contains(text(), "Проверить в базе")]]';
        resOk = await ClickByXPath(page, xpButtonCheckInBase);
        if (!resOk) {
            throw `ClickByXPath(${xpButtonCheckInBase})`;//<--специальный вызов ошибки!
        }

        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("(Создать транспорт)(Проверить в базе)")';//<--специальный вызов ошибки!
        }

        //Проверяем наличие характерных элементов (Марка автомобиля )
        resOk = await ElementIsPresent(page,'//label[@class="search__label"][contains(text(), "Марка автомобиля ")]');
        if (!resOk) {
            throw 'ElementIsPresent(class="head__title""Создание контакта")';//<--специальный вызов ошибки!
        }
        //Клик по инпуту Марка автомобиля
        let xpCarBrand = '//div[@data-vv-name="car_brand"]/input';
        resOk = await ClickByXPath(page, xpCarBrand);
        if (!resOk) {
            throw `ClickByXPath(${xpCarBrand})`;//<--специальный вызов ошибки!
        }
        //Вводим Марка автомобиля
        resOk = await TypeByXPath(page, xpCarBrand, 'DAF');
        if (!resOk) {
            throw `TypeByXPath(${xpLicensePlate})`;//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("(Find)(Марка автомобиля)")';//<--специальный вызов ошибки!
        }

        //Выбираем из списка
        let xpItemCarBrand = '//div[@class="search__item"][1]';// <---Нумерация с 1 !!!
        resOk = await ClickByXPath(page, xpItemCarBrand);
        if (!resOk) {
            throw `ClickByXPath(${xpItemCarBrand})`;//<--специальный вызов ошибки!
        }
        // Вставляем Фото тех пас
        MyFilePath = await SaveTempPictureFromRandomURL(browser, 'DriverDocURL');
        if (MyFilePath !== '') {
            let xpDriverLicensePhoto = '//div[@class="zone"][./div[contains(text(), "Тех. Паспорт")]]/div[@id="dropzone"]';
            let [fileChooserDPhoto] = await Promise.all([
                page.waitForFileChooser(),
                ClickByXPath(page, xpDriverLicensePhoto)
            ]);
            await fileChooserDPhoto.accept([MyFilePath]);
            await page.waitFor(3000);
            //await DeleteTempPicture(MyFilePath);
            //await fileChooser.cancel();
            //await page.waitFor(1111500);
        }

        //Клик по селекту инпуту
        let xpSelectType = '//div[@class="multiselect__tags"][./input[@name="car_type"]]';
        resOk = await ClickByXPath(page, xpSelectType);
        if (!resOk) {
            throw `ClickByXPath(${xpSelectType})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        //Выбираем Тягач
        let xpItemType = '//div[./div[@class="multiselect__tags"][./input[@name="car_type"]]]';
        xpItemType = xpItemType + '/div[@class="multiselect__content-wrapper"]/ul/li/span/span[contains(text(), "Тягач")]';
        resOk = await ClickByXPath(page, xpItemType);
        if (!resOk) {
            throw `ClickByXPath(Тягач)`;//<--специальный вызов ошибки!
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
        await page.waitFor(500);

        let xpItemTransloyd = '//div[@data-vv-as="Компания"]/div[@class="multiselect__content-wrapper"]/ul/li[@class="multiselect__element"][2]';
        resOk = await ClickByXPath(page, xpItemTransloyd);
        if (!resOk) {
            throw `ClickByXPath(ТОВ ТРАНСЛОЙД)`;//<--специальный вызов ошибки!
        }

        //Жмём на кнопку Создать
        let xpButtonCreateContact = '//button[@class="btn"][./span[contains(text(), "Создать")]]';
        resOk = await ClickByXPathWithScroll(2000 ,page, xpButtonCreateContact);
        if (!resOk) {
            throw 'ClickByXPath([....] "Создать контакт")';//<--специальный вызов ошибки!
        }
        // Проверяем есть ли валидируемые незаполненные поля
        xPath = '//span[@class="element__error"]';
        resOk = await WaitUntilElementIsPresentByXPath(500,page,xPath);
        if (resOk) {
            let linkHandlers = await page.$x(xPath);
            await console.log('\x1b[38;5;2m', "     Вижу валидируемые незаполненные поля" ,linkHandlers.length,"шт" , '\x1b[0m');
            if (linkHandlers.length < 3){
                throw `Валидируемых незаполненных полей ${linkHandlers.length} < 3 `;//<--специальный вызов ошибки!
            }
        }
        resOk = await WaitUntilPageLoads(page);
        //await page.waitFor(1111500);
        if (!resOk) {
            throw 'WaitUntilPageLoads("СОХРАНИТЬ КОНТАКТ Водитель")';//<--специальный вызов ошибки!
        }
        //Ждём Успешно сохранено
        resOk = await WaitUntilElementIsPresentByXPath(2000,page,'//div[@class="noty_body"][contains(text(), "Успешно сохранено")]');
        if (!resOk) {
            await console.log('\x1b[38;5;2m', "     Не вижу (Успешно сохранено)" , '\x1b[0m');
            throw `Отсутствует (Успешно сохранено)`;//<--специальный вызов ошибки!
        }


        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице (Создать Сделку) : ",err , '\x1b[0m');
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

module.exports.DealCreateNew = DealCreateNew;