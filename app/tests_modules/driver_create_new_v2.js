let DriverCreateNewV2 = async (browser, page, DriverData) => {
    const nameTest = NameFunction()+'->"' + DriverData.strLastName + '"';
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

    try {
        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);

        //Клик по пункту Водители
        resOk = await ClickByXPath(page, '//a[@href="/driver"][contains(text(), "Водители")]');
        if (!resOk) {
            throw 'ClickByXPath(//a[@href="/driver"][contains(text(), "Водители")])';//<--специальный вызов ошибки!
        }
        //await console.log('\x1b[38;5;2m', "ClickByXPath" ,resOk , '\x1b[0m');
        //Ждём загрузки страницы
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Водители")';//<--специальный вызов ошибки!
        }
        //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads" ,resOk , '\x1b[0m');
        //Проверяем наличие на странице Характерных элементов (Водители)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Водители")]');
        if (!resOk) {
            throw 'Not ElementIsPresent(class="head__title""Водители")';//<--специальный вызов ошибки!
        }
        //await console.log('\x1b[38;5;2m', "Контакты ElementIsPresent" ,resOk , '\x1b[0m');
        //Клик по кнопке Создать
        resOk = await ClickByXPath(page, '//span[contains(text(), "Создать")]');
        if (!resOk) {
            throw 'ClickByXPath(//span[contains(text(), "Создать")])';//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Создание Контакта Водителя")';//<--специальный вызов ошибки!
        }
        //Проверяем наличие на странице Характерных элементов (Создание контакта)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Создание контакта")]');
        if (!resOk) {
            throw 'ElementIsPresent(class="head__title""Создание контакта")';//<--специальный вызов ошибки!
        }
//---------------
        //Проверяем заполнено ли поле ТИП КОНТАКТА (Водитель)
        // //*[@id="app"]/div/main/div/div[2]/div/div/div[1]/div/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/input
        // //*[@id="app"]/div/main/div/div[2]/div/div/div[1]/div/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[1]/span/span
        xPath = '//div[@class="multiselect__tags"][./input[@placeholder="Тип контакта"]]/div/span/span[contains(text(), "Водитель")]';
        resOk = await ElementIsPresent(page,xPath);
        if (!resOk) {
            throw 'Поле (Тип контакта)не содержит(Водитель)';//<--специальный вызов ошибки!
        }

        //Клик по Галочке (Работает на компанию)
        resOk = await ClickByXPath(page, '//span[contains(text(), "Работает на компанию")]');
        if (!resOk) {
            throw 'ClickByXPath([....] "Работает на компанию")';//<--специальный вызов ошибки!
        }
        //Клик по инпуту Фамилия
        let xpLastName = '//input[@id="last_name"]';
        resOk = await ClickByXPath(page, xpLastName);
        if (!resOk) {
            throw `ClickByXPath(${xpLastName})`;//<--специальный вызов ошибки!
        }
        //Вводим Фамилию
        resOk = await TypeByXPath(page, xpLastName, DriverData.strLastName);
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
        resOk = await TypeByXPath(page, xpFirstName, DriverData.strFirstName);
        if (!resOk) {
            throw `TypeByXPath(${xpFirstName})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        //Клик по инпуту Отчество
        let xpMiddleName = '//input[@id="middle_name"]';
        resOk = await ClickByXPath(page, xpMiddleName);
        if (!resOk) {
            throw `ClickByXPath(${xpMiddleName})`;//<--специальный вызов ошибки!
        }
        //Вводим Отчество
        resOk = await TypeByXPath(page, xpMiddleName, DriverData.strMiddleName);
        if (!resOk) {
            throw `TypeByXPath(${xpMiddleName})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(1000);
        //Клик по инпуту КОМПАНИЯ
        let xpCompanies = '//div[@class="multiselect__tags"][./input[@name="companies"]]';
        resOk = await ClickByXPath(page, xpCompanies);
        if (!resOk) {
            throw `ClickByXPath(${xpCompanies})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        resOk = await TypeByXPath(page, xpCompanies, DriverData.strCompanyName);
        //resOk = await TypeByXPath(page, xpCompanies, 'транслойд');
        if (!resOk) {
            throw `TypeByXPath(${xpCompanies})`;//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        //await page.waitFor(1111500);
        if (!resOk) {
            throw 'WaitUntilPageLoads("поиск ТРАНСЛОЙД")';//<--специальный вызов ошибки!
        }
       // await console.log('(',`//span[contains(text(), "${DriverData.strCompanyName}")]`,')');
        //resOk = await ClickByXPath(page, '//span[contains(text(), "ТОВ ТРАНСЛОЙД")]');
        //await page.waitFor(1220334);
        //  //*[@id="app"]/div/main/div/div[2]/div/div/div[1]/div/div/div/div[3]/div[2]/div/div/div[3]/ul/li[2]/span/span

        resOk = await ClickByXPathNum(page, 2,`//span[contains(text(), "${DriverData.strCompanyName}")]`);
        if (!resOk) {
            throw `ClickByXPath(${xpCompanies})`;//<--специальный вызов ошибки!
        }
        //Выбираем ФОТО

        MyFilePath = await SaveTempPictureFromRandomURL(browser, 'DriverFaceURL');
        if (MyFilePath !== '') {
            let [fileChooser] = await Promise.all([
                page.waitForFileChooser(),
                page.click('div[id=dropzone]'), // some button that triggers file selection
            ]);


            await fileChooser.accept([MyFilePath]);
            await page.waitFor(3000);
            //await DeleteTempPicture(MyFilePath);
            //await fileChooser.cancel();
            //await page.waitFor(1111500);
        }

        //Жмём на кнопку Создать контакт
        let xpButtonCreateContact = '//button[@class="btn"][./span[contains(text(), "Создать контакт")]]';
        resOk = await ClickByXPathWithScroll(2000 ,page, xpButtonCreateContact);
        if (!resOk) {
            throw 'ClickByXPath([....] "Создать контакт")';//<--специальный вызов ошибки!
        }
        // Проверяем есть ли валидируемые незаполненные поля
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
        resOk = await WaitForElementIsPresentByXPath(2000,page,'//div[@class="noty_body"][contains(text(), "Успешно сохранено")]');
        if (!resOk) {
            await console.log('\x1b[38;5;2m', "     Не вижу (Успешно сохранено)" , '\x1b[0m');
            throw `Отсутствует (Успешно сохранено(СОХРАНИТЬ КОНТАКТ))`;//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        //await page.waitFor(1111500);
        if (!resOk) {
            throw 'WaitUntilPageLoads("СОХРАНИТЬ КОНТАКТ Водитель")';//<--специальный вызов ошибки!
        }
        // Похоже есть разрыв в присутствии селектора (html[class=nprogress-busy])
        await WaitUntilPageLoads(page);

        //Ждём label (Номер водительского удостоверения )
        xPath = '//label[@class="element__label"][contains(text(), "Номер водительского удостоверения ")]';
        resOk = await WaitForElementIsPresentByXPath(25000,page,xPath);
        if (!resOk) {
            await console.log('\x1b[38;5;2m', "     Не вижу (Номер водительского удостоверения )" , '\x1b[0m');
            throw `Отсутствует label(Номер водительского удостоверения )`;//<--специальный вызов ошибки!
        }
        // Клик по инпуту (Номер водительского удостоверения )
        let xpDriverLicenseNumber = '//input[@id="driver_license_number"]';
        resOk = await ClickByXPath(page, xpDriverLicenseNumber);
        if (!resOk) {
            throw `ClickByXPath(${xpDriverLicenseNumber})`;//<--специальный вызов ошибки!
        }
        //Вводим Номер водительского удостоверения

        resOk = await TypeByXPath(page, xpDriverLicenseNumber, DriverData.strDriverLicenseNumber);
        if (!resOk) {
            throw `TypeByXPath(${xpDriverLicenseNumber})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);

        // Вставляем Фото ВодУд
        MyFilePath = await SaveTempPictureFromRandomURL(browser, 'DriverDocURL');
        if (MyFilePath !== '') {
            let xpDriverLicensePhoto = '//div[@class="zone"][./div[contains(text(), "Водительское удостоверение")]]/div[@id="dropzone"]';
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

        //Жмём на кнопку (Сохранить водителя)
        let xpButtonSaveDriver = '//button[@class="btn"][./span[contains(text(), "Сохранить водителя")]]';
        resOk = await ClickByXPathWithScroll(2000 ,page, xpButtonSaveDriver);
        if (!resOk) {
            throw 'ClickByXPath([....] "Сохранить водителя")';//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        //await page.waitFor(1111500);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Сохранить водителя")';//<--специальный вызов ошибки!
        }
        //Ждём Успешно сохранено
        resOk = await WaitForElementIsPresentByXPath(2000,page,'//div[@class="noty_body"][contains(text(), "Успешно сохранено")]');
        if (!resOk) {
            await console.log('\x1b[38;5;2m', "     Не вижу (Успешно сохранено)" , '\x1b[0m');
            throw `Отсутствует (Успешно сохранено(Сохранить водителя))`;//<--специальный вызов ошибки!
        }
        if(false) {
            // Клик по + (Транспортное средство )
            // //*[@id="app"]/div/main/div/div[2]/div/div/div[2]/div[2]/div/div[4]/div[1]
            // //*[@id="app"]/div/main/div/div[2]/div/div/div[2]/div[2]/div/div[4]/div[2]/svg
            // //*[@id="app"]/div/main/div/div[2]/div/div/div[2]/div[2]/div/div[4]/div[2]/svg/path
            //  let xpPlusAuto = '//div[@class="module__head"][./div[@class="form__title"][contains(text(), "Транспортное средство ")]]';
            // xpPlusAuto = xpPlusAuto + '/div[@class="module__add"]/svg[@class="fa-icon"]/path';

            let xpPlusAuto = '//div[@class="module__head"][./div[@class="form__title"][contains(text(), "Транспортное средство ")]]';
            xpPlusAuto = xpPlusAuto + '/div[@class="module__add"]';
            // const [elementHandle] = await page.$x(xpPlusAuto);
            // const propertyHandle = await elementHandle.getProperty('innerText');
            // const propertyValue = await propertyHandle.jsonValue();
            // await console.log(propertyValue);

            //let TextF = await page.evaluate(elm => elm.textContent, linkTextX[0]);
            // let TextF = linkTextX[0].attribute('d');
            // await console.log('\x1b[38;5;1m', `TextF=${TextF}` , '\x1b[0m');
            //await page.waitFor(111500);

            resOk = await ClickByXPath(page, xpPlusAuto);
            if (!resOk) {
                await console.log('\x1b[38;5;1m', `xpPlusAuto=${xpPlusAuto}`, '\x1b[0m');
                //await page.waitFor(111500);
                throw `ClickByXPath(xpPlusAuto)`;//<--специальный вызов ошибки!
            }

            await page.waitFor(111500);
            // '//span[@class="element__error"]'
        }

        //

        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        DriverData.returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Создание Контакта Водителя : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${err} => ${g_StatusCurrentTest} \n`;
        DriverData.returnResult = false;
        //await page.waitFor(5001111);
    }
    await page.setViewport({width, height});
    return DriverData;//<------------------EXIT !!!

};

module.exports.DriverCreateNewV2 = DriverCreateNewV2;