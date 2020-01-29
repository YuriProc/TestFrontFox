let CompanyCheckNewV2 = async (page, CompanyData) => {
    const nameTest = NameFunction()+'->"' + CompanyData.strCodeCompany + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1200;
    let height = 880;
    let resOk;
    let xPath, MyXPath;
    let strTT, strInnerText, strAlreadyCreated, strNotCorrect, strNotFind, strErrorActivity;
    let strCompanyTypesFromPage;
    let QLength;
    let strCheck;
    let enableError = false;
    let tempStr = '';
    let Selector;
    let ElPresent,ElPresent1,ElPresent2,ElPresent3;
    let findCreatedCompanyOk = false;
    await page.setViewport({width, height});
    try{
        //Клик по LOGO
        await LogoClick(page);
        // Клик по Компании
        xPath = '//a[@href="/company"]';
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
        }
        //Ждём загрузки страницы
        await WaitUntilPageLoads(page);
        //Ждём появления тайтла Создать компанию
        xPath = '//div[@class="head__title"][contains(text(), "Компании")]';
        resOk = await WaitForElementIsPresentByXPath(500,page,xPath);
        if (!resOk) {
            throw `FAIL => Не вижу (${xPath})`;
        }
        //Проверим наличие //input[@id="code"]
        xPath = '//input[@placeholder="ЕДРПОУ\\ИНН"]';
        resOk = await WaitForElementIsPresentByXPath(500,page,xPath);
        if (!resOk) {
            throw `FAIL => WaitForElementIsPresentByXPath(${xPath})`;
        }
        // Вводим код ЕДРПОУ
        resOk = await SetInputByXPath(page, xPath, CompanyData.strCodeCompany);
        if (!resOk) {
            throw `FAIL => SetInputByXPath(${xPath})`;
        }

        //Ждём загрузки страницы
        await WaitUntilPageLoads(page);
        //----------------------------

        // Проверим "Ничего не найдено"
        xPath = '//b[contains(text(), "Ничего не найдено")]';
        resOk = await WaitForElementIsPresentByXPath(1000, page, xPath);
        if (resOk) {
            await console.log(`     FAIL => (${xPath})`);
            g_StrOutLog+=` FAIL => (${xPath})\n`;
            throw `     FAIL => (${xPath})`;
        }
        // Проверим кнопка редактировать
        xPath = '//a[@class="table__option"]';
        resOk = await WaitForElementIsPresentByXPath(1000, page, xPath);
        if (!resOk) {// Нет кнопки редактировать
            await console.log(`     FAIL => Нет кнопки редактировать(${xPath})`);
            g_StrOutLog+=` FAIL => Нет кнопки редактировать(${xPath})\n`;
            throw `     FAIL => Нет кнопки редактировать(${xPath})`;
        }
        // Клик по кнопке редактировать
        resOk = await ClickByXPath( page, xPath);
        if (!resOk) {// Нет кнопки редактировать
            await console.log(`     FAIL => ClickByXPath(${xPath})`);
            g_StrOutLog+=` FAIL => ClickByXPath(${xPath})\n`;
            throw `     FAIL => ClickByXPath(${xPath})`;
        }
        // Ждём Загрузки Страницы (Редактировать компанию)
        await WaitUntilPageLoads(page);

        xPath = '//div[@class="head__title"][contains(text(), "Редактировать компанию")]';
        resOk = await WaitForElementIsPresentByXPath(5000,page,xPath);
        if (!resOk) {
            throw `FAIL => Не вижу (${xPath})`;
        }
        // Проверим Наличие поля (ЕДРПОУ\ИНН)
        xPath = '//input[@name="code"]';
        resOk = await WaitForElementIsPresentByXPath(500,page,xPath);
        if (!resOk) {
            throw `FAIL => Не вижу (${xPath})`;//<--специальный вызов ошибки!
        }
        // Проверим код компании
        strCheck = await ElementGetValue(page, 0, xPath);
        if ( strCheck !== CompanyData.strCodeCompany ){
            enableError = true;
            tempStr = `=> FAIL => (ЕДРПОУ\\ИНН !== CompanyData.strCodeCompany)(${strCheck} !== ${CompanyData.strCodeCompany})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
            //throw `     FAIL => (ЕДРПОУ\\ИНН !== CompanyData.strCodeCompany)(${strCheck} !== ${CompanyData.strCodeCompany})`;
        }

        // Проверим Тип компании
        xPath = '//div[@class="multiselect__tags"][./input[@name="company_types"]]/div/span[@class="multiselect__tag"]/span';
        QLength = await ElementGetLength(page, xPath);
        if (QLength !== CompanyData.strCompanyTypes.length){
            enableError = true;
            tempStr = `=> FAIL (поле Тип компании)=> QLength:${QLength} !== ${CompanyData.strCompanyTypes.length}`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;
            //throw `FAIL (поле Тип компании)=> QLength:${QLength} !== ${CompanyData.strCompanyTypes.length}`;//<--специальный вызов ошибки!
        }
        strCompanyTypesFromPage = "[";
        for (let i=0;i<QLength;i++){
            strInnerText = await ElementGetInnerText(page, i, xPath);
            let tFind = false;
            for (let b=0;b<CompanyData.strCompanyTypes.length;b++){
                if (strInnerText === CompanyData.strCompanyTypes[b]){ tFind = true;}            }
            if (!tFind){
                enableError = true;
                tempStr = `=> FAIL => (Тип Компании) ${strInnerText} Такого Значения не было в исходных данных !!!`;
                await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
                g_StrOutLog+= tempStr + `\n`;
                //throw `     FAIL => (Тип Компании) ${strInnerText} Такого Значения не было в исходных данных !!!`;
            }
            strCompanyTypesFromPage +=`${strInnerText}`;
            if((QLength > 1) && (i<QLength-1)){strCompanyTypesFromPage +=",";}
        }
        strCompanyTypesFromPage +="]";
        await console.log(`     --> поле тип компании заполнено ${strCompanyTypesFromPage}`);
        // Проверим Наша компания
        // чек Наша компания

        //xPath = '//label[@class="check"][./span[@class="check__label"][contains(text(), "Наша компания")]]/input[@name="is_our"]';
        xPath = '//input[@name="is_our"]';
        resOk = await ElementIsChecked(page,0, xPath);
        //await console.log(`ElementIsChecked(${xPath}) = "${resOk}" `);
        if (resOk !== CompanyData.boolIsOurCompany){
            enableError = true;
            tempStr = `=> Fail => (чек Наша компания)${resOk} !== CompanyData.boolIsOurCompany(${CompanyData.boolIsOurCompany})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;

            //throw `     Fail => (чек Наша компания)${resOk} !== CompanyData.boolIsOurCompany(${CompanyData.boolIsOurCompany})`;
        }
        // чек ТРЕБУЕТ ПРОВЕРКИ
        //xPath = '//label[@class="check"][./span[@class="check__label"][contains(text(), "ТРЕБУЕТ ПРОВЕРКИ")]]/input[@name="is_our"]';
        xPath = '//input[@name="isReviewRequired"]';
        resOk = await ElementIsChecked(page,0, xPath);
        //await console.log(`ElementIsChecked(${xPath}) = "${resOk}" `);
        if (resOk !== CompanyData.boolNeedCheck){
            enableError = true;
            tempStr = `=> Fail => (чек ТРЕБУЕТ ПРОВЕРКИ)${resOk} !== CompanyData.boolNeedCheck(${CompanyData.boolNeedCheck})`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;

            //throw `     Fail => (чек ТРЕБУЕТ ПРОВЕРКИ)${resOk} !== CompanyData.boolNeedCheck(${CompanyData.boolNeedCheck})`;
        }
        // Поле Ответственный
        xPath = '//div[@class="select__area"]/div[1][./div/input[@name="managers"]]/div[@class="multiselect__tags"]/div[@class="multiselect__tags-wrap"]/span/span';

        QLength = await ElementGetLength(page, xPath);
        if (QLength !== CompanyData.strManagers.length){
            enableError = true;
            tempStr = `=> FAIL (Поле Ответственный)=> QLength:${QLength} !== ${CompanyData.strManagers.length}`;
            await console.log('\x1b[38;5;1m', tempStr , '\x1b[0m');
            g_StrOutLog+= tempStr + `\n`;

            //throw `FAIL (Поле Ответственный)=> QLength:${QLength} !== ${CompanyData.strManagers.length}`;//<--специальный вызов ошибки!
        }

        for (let b=0;b<CompanyData.strManagers.length;b++) {
            let tFind = false;
            for (let i=0;i<QLength;i++){
                strInnerText = await ElementGetInnerText(page, i, xPath);

                if (strInnerText.indexOf(CompanyData.strManagers[b] , 0) !== -1){
                    tFind = true;
                }
            }
            if (!tFind) {
                enableError = true;
                tempStr = `=> FAIL => (Поле Ответственный) ${CompanyData.strManagers[b]} Не найден на странице!!!`;
                await console.log('\x1b[38;5;1m', tempStr, '\x1b[0m');
                g_StrOutLog += tempStr + `\n`;

                //throw `FAIL (Поле Ответственный) ${strInnerText} Такого Значения не было в исходных данных !!!`;//<--специальный вызов ошибки!
            }
        }
        //Отсрочка дней оплаты
        xPath = '//input[@name="delay_days"]';
        strTT = await ElementGetValue(page, 0, xPath);
        if (strTT !== CompanyData.strDelayDays){
            enableError = true;
            tempStr = `=> FAIL => (Отсрочка дней оплаты) ${strTT} !== ${CompanyData.strDelayDays}!!!`;
            await console.log('\x1b[38;5;1m', tempStr, '\x1b[0m');
            g_StrOutLog += tempStr + `\n`;

        }
        //Условие оплаты
        xPath = `//div[@class="multiselect__tags"][./input[@name="payment_condition"]]/span[@class="multiselect__single"]`;
        strInnerText = await ElementGetInnerText(page, 0, xPath);

        if (strInnerText !== CompanyData.strPaymentCondition) {
            enableError = true;
            tempStr = `=> FAIL => (Условие оплаты) ${strInnerText} !== ${CompanyData.strPaymentCondition}!!!`;
            await console.log('\x1b[38;5;1m', tempStr, '\x1b[0m');
            g_StrOutLog += tempStr + `\n`;

        }


        // await console.log('-------------');
        // await TempStop(page);


        if (enableError){
            throw `при проверке Компании ${CompanyData.strCodeCompany} были несоответствия`;
        }


        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        CompanyData.returnResult = true;
        //await page.waitFor(11000);
        return CompanyData;//<------------------EXIT !!!



    }catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Компании : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        CompanyData.returnResult = false;
        //await page.waitFor(5001111);
    }



    return CompanyData;//<------------------EXIT !!!
};
// LocalFunctions---------------------------------------------------------------------------------------------
ClickCompanyCreateNewPlus = async  function( page ){
    try {
        await page.hover('a[href="/company"]');

        await page.hover('a[href="/company-save"]');

        await page.click('a[href="/company-save"]');

        return true;
    }catch (e) {
        return false;
    }
};
// End LocalFunctions---------------------------------------------------------------------------------------------
module.exports.CompanyCheckNewV2 = CompanyCheckNewV2;