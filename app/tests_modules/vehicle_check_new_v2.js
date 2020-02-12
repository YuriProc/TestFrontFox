let VehicleCheckNewV2 = async (browser, page, VehicleData) => {
    const nameTest = NameFunction()+'->"' + VehicleData.strLicensePlate + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
    g_StrOutLog += `Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1200;
    let height = 900;
    let widthX = 1200;
    let heightX = 1800;
    let xPath;
    let ElPresent, ElPresent1, ElPresent2, ElPresent3;
    let resOk;
    let MyFilePath = '';
    let strNotFind = 'Ничего не найдено';
    let enableError = false;
    let tempStr = '';
    VehicleData['returnResult'] = false;
    try {
    await page.setViewport({width, height});

    //await page.setViewport({width2, height2});

        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);
        await WaitUntilPageLoads(page);

        //Клик по пункту Транспорт
        resOk = await ClickByXPath(page, '//a[@href="/vehicle"][contains(text(), "Транспорт")]');
        if (!resOk) {
            throw 'ClickByXPath(//a[@href="/vehicle"][contains(text(), "Транспорт")])';//<--специальный вызов ошибки!
        }

        //Ждём загрузки страницы
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Создать транспорт")';//<--специальный вызов ошибки!
        }

        //Проверяем наличие на странице Характерных элементов (Транспортные стредства)
        resOk = await WaitForElementIsPresentByXPath(1000, page,'//div[@class="head__title"][contains(text(), "Транспортные стредства")]');
        if (!resOk) {
            throw 'Not ElementIsPresent(class="head__title""Транспортные стредства")';//<--специальный вызов ошибки!
        }

        // Клик по инпуту найти Номер авто
        let xpFindVehicle = '//input[@placeholder="Номер авто"]';
        resOk = await ClickByXPath(page, xpFindVehicle);
        if (!resOk) {
            throw `ClickByXPath(${xpFindVehicle})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        //Вводим Номер для поиска
        //await TypeByXPath(page, xpFindVehicle, ' ');
        resOk = await TypeByXPath(page, xpFindVehicle, VehicleData.strLicensePlate);
        if (!resOk) {
            throw `TypeByXPath(${xpFindVehicle})`;//<--специальный вызов ошибки!
        }

        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Поиск транспорта")';//<--специальный вызов ошибки!
        }

        resOk = await WaitForElementIsPresentByXPath(1000,page,`//b[contains(text(), '${strNotFind}')]`);
        if (resOk) {//Надпись "Ничего не найдено " присутствует
            await console.log('\x1b[38;5;1m', "       Вижу ->  ",strNotFind, '\x1b[0m');
            throw `Только что созданный транспорт не Найден !!! ${strNotFind}`;
        }
        // Клик по первой кнопке редактировать //  /svg[@class="fa-icon"]
        resOk = await ClickByXPathNum(page, 1,'//a[@class="table__option"]');
        if (!resOk) {
            throw 'ClickByXPathNum(//a[@class="table__option"])';//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Редактирование транспорта")';//<--специальный вызов ошибки!
        }


        //Проверяем наличие на странице Характерных элементов (Редактировать транспорт)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Редактировать транспорт")]');
        if (!resOk) {
            throw 'ElementIsPresent(class="head__title""Редактировать транспорт")';//<--специальный вызов ошибки!
        }
//---------------
        //теперь нужно проверить все ранее введённые поля

        // Номерной знак
        let xpLicensePlate = '//input[@id="license_plate"]';
        let strLicensePlate = await ElementGetValue(page, 0, xpLicensePlate);
        if (strLicensePlate !== VehicleData.strLicensePlate ) {
            enableError = true;
            tempStr = `=> Ошибка Номерной знак(${strLicensePlate})<>(${VehicleData.strLicensePlate})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;

        }

        //Марка автомобиля
        let xpCarBrand = '//div[@data-vv-name="car_brand"]/div/input';
        let strCarBrand = await ElementGetValue(page, 0, xpCarBrand);
        if (strCarBrand !== VehicleData.strCarBrand ) {
            enableError = true;
            tempStr = `=> Ошибка Номерной знак(${strCarBrand})<>(${VehicleData.strCarBrand})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }


        // Проверяем Фото тех пас
        if (VehicleData.strHrefPhotoURL !== '') {
            let strHrefPhotoURL = await ElementGetHref(page, 0, '//div[@class="dz-image"]/a');
            if (strHrefPhotoURL !== VehicleData.strHrefPhotoURL) {
                enableError = true;
                tempStr = `=> Ошибка Другой файл (${strHrefPhotoURL})<>(${VehicleData.strHrefPhotoURL})`;
                await console.log('\x1b[38;5;1m', tempStr, '\x1b[0m');
                g_StrOutLog += tempStr + `\n`;
            }
        }

        // Тип (Тягач)
        xPath = '//div[@class="select"][./label[contains(text(), "Тип ")]]/div/div/div[2]/span[@class="multiselect__single"]';
        let strCarType = await ElementGetInnerText(page, 0, xPath);
        if (strCarType !== VehicleData.strCarType){
            enableError = true;
            tempStr = `=> Ошибка Другой Тип Транспорта (${strCarType})<>(${VehicleData.strCarType})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }
        // Водители / Водитель( пока Один)
        //xPath = '//a[@target="_blank"]/span[1]';
        xPath = '//div[@data-vv-as="Водители"]';
        xPath+= '/div[@class="multiselect__tags"]/div[@class="multiselect__tags-wrap"]/span[@class="multiselect__tag"]/a[@target="_blank"]/span[1]';
        let strDriverFullNameInnerText = await ElementGetInnerText(page, 0, xPath);
        let strDriverFullName = VehicleData.DriverData.strLastName + ' '
                              + VehicleData.DriverData.strFirstName + ' '
                              + VehicleData.DriverData.strMiddleName;
        if (strDriverFullNameInnerText !== strDriverFullName) {
            enableError = true;
            tempStr = `=> Ошибка strDriverFullNameInnerText(${strDriverFullNameInnerText})<>(${strDriverFullName})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;

        }
        // Компания
        //xPath = '//a[@target="_blank"]/span[1]';
        xPath = '//div[@data-vv-as="Компания"]';
        xPath+= '/div[@class="multiselect__tags"]/div[@class="multiselect__tags-wrap"]/span[@class="multiselect__tag"]/a[@target="_blank"]/span[1]';
        let strCompanyName = await ElementGetInnerText(page, 0, xPath);
        // Выделим из строки только имя Компании
        //strCompanyName = await TrimCompanyName(strCompanyName);

        if (strCompanyName !== VehicleData.CompanyData.strCompanyName ) {
            enableError = true;
            tempStr = `=> Ошибка strCompanyName(${strCompanyName})<>(${VehicleData.CompanyData.strCompanyName})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }
        //await page.waitFor(1232432423);


        if (enableError){
            throw 'при проверке Контакта Водитель были несоответствия';
        }


        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        VehicleData.returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице (Редактировать транспорт) : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${err} => ${g_StatusCurrentTest} \n`;
        VehicleData.returnResult = false;
        //await page.waitFor(5001111);
    }


    await page.setViewport({width, height});
    return VehicleData;//<------------------EXIT !!!

};

module.exports.VehicleCheckNewV2 = VehicleCheckNewV2;