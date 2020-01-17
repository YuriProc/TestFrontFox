let DriverCheckNewV2 = async (browser, page, DriverData) => {
    //NameFunction()
    //const nameTest = 'DriverCheckNewV2->"' + DriverData.strLastName + '"';
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
    let enableError = false;
    let tempStr = '';
    await page.setViewport({width, height});
    let strNotFind = 'Ничего не найдено';

    try {
        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);
        await WaitUntilPageLoads(page);

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
        //await page.waitFor(12000);
        resOk = await WaitUntilElementIsPresentByXPath(1000, page,'//div[@class="head__title"][contains(text(), "Водители")]');
        if (!resOk) {
            throw 'Not ElementIsPresent(class="head__title""Водители")';//<--специальный вызов ошибки!
        }
        //await console.log('\x1b[38;5;2m', "Контакты ElementIsPresent" ,resOk , '\x1b[0m');
        //await WaitUntilPageLoads(page);
        //Клик по инпуту Водители
        let xpFindDriver = '//input[@placeholder="Водитель"]';
        resOk = await ClickByXPath(page, xpFindDriver);
        if (!resOk) {
            throw `ClickByXPath(${xpFindDriver})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        //Вводим Фамилию для поиска
        resOk = await TypeByXPath(page, xpFindDriver, DriverData.strLastName);
        if (!resOk) {
            throw `TypeByXPath(${xpFindDriver})`;//<--специальный вызов ошибки!
        }
        await WaitUntilPageLoads(page);
        resOk = await WaitUntilElementIsPresentByXPath(1000,page,`//b[contains(text(), '${strNotFind}')]`);
        if (resOk) {//Надпись "Ничего не найдено " присутствует
            await console.log('\x1b[38;5;1m', "       Вижу ->  ",strNotFind, '\x1b[0m');
            throw `Только что созданный водитель не Найден !!! ${strNotFind}`;
        }
        //await page.waitFor(21000);
        // Клик по первой кнопке редактировать //  /svg[@class="fa-icon"]
        resOk = await ClickByXPathNum(page, 1,'//a[@class="table__option"]');
        if (!resOk) {
            throw 'ClickByXPathNum(//a[@class="table__option"])';//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Редактирование контакта Водителя")';//<--специальный вызов ошибки!
        }

        //Проверяем наличие на странице Характерных элементов (Редактирование контакта)
        resOk = await ElementIsPresent(page,'//div[@class="head__title"][contains(text(), "Редактирование контакта")]');
        if (!resOk) {
            throw 'ElementIsPresent(class="head__title""Редактирование контакта")';//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Вторая часть страницы Редактирование контакта Водителя")';//<--специальный вызов ошибки!
        }
        //теперь нужно проверить все ранее введённые поля
        //---------->>>
        //   '//input[@id="last_name"]'
        //   '//label[@class="check__item"]'
        //   '//input[@type="radio"]'
        // Тип работы
        let TypeWork = await ElementGetCheckedNum(page, '//input[@type="radio"]');
        if (TypeWork !== DriverData.typeWork) {
            enableError = true;
            tempStr = `=> Ошибка ЧекБокс(${TypeWork})<>(${DriverData.typeWork})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }
        //Проверяем заполнено ли поле ТИП КОНТАКТА (Водитель)
        // //*[@id="app"]/div/main/div/div[2]/div/div/div[1]/div/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/input
        // //*[@id="app"]/div/main/div/div[2]/div/div/div[1]/div/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[1]/span/span
        xPath = '//div[@class="multiselect__tags"][./input[@placeholder="Тип контакта"]]/div/span/span[contains(text(), "Водитель")]';
        resOk = await ElementIsPresent(page,xPath);
        if (!resOk) {
           // throw 'Поле (Тип контакта)не содержит(Водитель)';//<--специальный вызов ошибки!
            enableError = true;
            tempStr = `=> Ошибка ТИП КОНТАКТА не содержит (Водитель)`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }
        // Фамилия
        let DriverLastName = await ElementGetValue(page, 0, '//input[@id="last_name"]');
        if (DriverLastName !== DriverData.strLastName ) {
            enableError = true;
            tempStr = `=> Ошибка Фамилия(${DriverLastName})<>(${DriverData.strLastName})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }
        // Имя
        let DriverFirstName = await ElementGetValue(page, 0, '//input[@id="first_name"]');
        if (DriverFirstName !== DriverData.strFirstName ) {
            enableError = true;
            tempStr = `=> Ошибка Имя(${DriverLastName})<>(${DriverData.strFirstName})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }
        // Отчество
        let DriverMiddleName = await ElementGetValue(page, 0, '//input[@id="middle_name"]');
        if (DriverMiddleName !== DriverData.strMiddleName ) {
            enableError = true;
            tempStr = `=> Ошибка Имя(${DriverMiddleName})<>(${DriverData.strMiddleName})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }
        // Номер Вод Уд
        //   id="driver_license_number"
        let DriverLicenseNumber = await ElementGetValue(page, 0, '//input[@id="driver_license_number"]');
        if (DriverLicenseNumber !== DriverData.strDriverLicenseNumber ) {
            enableError = true;
            tempStr = `=> Ошибка НомерВодУд(${DriverLicenseNumber})<>(${DriverData.strDriverLicenseNumber})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }
        // Компания
        xPath = '//a[@target="_blank"]/span[1]';
        let strCompanyName = await ElementGetInnerText(page, 0, xPath);
        // Выделим из строки только имя Компании
        strCompanyName = await TrimCompanyName(strCompanyName);

        if (strCompanyName !== DriverData.strCompanyName ) {
            enableError = true;
            tempStr = `=> Ошибка strCompanyName(${strCompanyName})<>(${DriverData.strCompanyName})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
        }


//---------------





        //await page.waitFor(1231230);
        if (enableError){
            throw 'при проверке Контакта Водитель были несоответствия';
        }



        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Редактирование Контакта Водителя : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`\n=> Ошибка ${err} => ${g_StatusCurrentTest} \n`;
        returnResult = false;
        //await page.waitFor(5001111);
    }
    //Клик по LOGO
    await page.click("div[class=logo__icon]");
    await page.setViewport({width, height});
    return returnResult;//<------------------EXIT !!!

};



module.exports.DriverCheckNewV2 = DriverCheckNewV2;