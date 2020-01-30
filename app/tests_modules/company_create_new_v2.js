let CompanyCreateNewV2 = async (page, CompanyData) => {
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
    let Selector;
    let ElPresent,ElPresent1,ElPresent2,ElPresent3;
    let findCreatedCompanyOk = false;
    await page.setViewport({width, height});
    try{
        //Клик по LOGO
        await LogoClick(page);
        // hover КОМПАНИИ hover +  and click
        resOk = await ClickCompanyCreateNewPlus(page);
        if (!resOk){
            throw 'ClickCompanyCreateNewPlus(page); = FAIL!"';//<--специальный вызов ошибки!
        }
        //Ждём загрузки страницы
        await WaitUntilPageLoads(page);
        //Ждём появления тайтла Создать компанию
        xPath = '//div[@class="head__title"][contains(text(), "Создать компанию")]';
        resOk = await WaitForElementIsPresentByXPath(500,page,xPath);
        if (!resOk) {
            throw `FAIL => Не вижу (${xPath})`;
        }
        //Проверим наличие //input[@id="code"]
        xPath = '//input[@id="code"]';
        resOk = await WaitForElementIsPresentByXPath(500,page,xPath);
        if (!resOk) {
            throw `FAIL => Не вижу (${xPath})`;
        }
        // Вводим код ЕДРПОУ
        Selector = "input[id=code]";
        resOk = await SetInput(page, Selector, CompanyData.strCodeCompany);
        if (!resOk) {
            throw `FAIL => Не вижу (${Selector})`;
        }
        // Жмём проверить в базе
        xPath = "//span[contains(text(), 'Проверить в базе')]";
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
        }
        //Ждём загрузки страницы
        await WaitUntilPageLoads(page);
        //----------------------------

        //  //div[@class="noty_body"][contains(text(), "Trying to get property 'activities' of non-object"]
        xPath = '//div[@class="noty_body"]';
        resOk = await WaitForElementIsPresentByXPath(1000, page, xPath);
        if (!resOk) {
            await console.log(`     Warning => Отсутствует сообщение класса (${xPath})`);
            g_StrOutLog+=`     Warning => Отсутствует сообщение класса (${xPath})\n`;
        }else {
            strInnerText = await ElementGetInnerText(page, 0, xPath);
            strAlreadyCreated = "Данная компания уже создана!";
            strNotCorrect = "Вы ввели некоректный ЕДРПОУ компании!";
            strNotFind = "Данные не найдены!";
            strErrorActivity = "Trying to get property 'activities' of non-object";
            switch (strInnerText) {
                case strNotCorrect:
                case strNotFind:
                case strErrorActivity:
                    await console.log('\x1b[38;5;1m', "    FAIL => Вижу =>",strInnerText, '\x1b[0m');
                    g_StrOutLog+=`=> FAIL =>${strInnerText} \n`;
                    CompanyData.returnResult = false;

                    throw `${g_StrOutLog}`;//<--специальный вызов ошибки!
                    break;
                case strAlreadyCreated:
                    await console.log('\x1b[38;5;2m', `     Вижу => ${strInnerText}`, '\x1b[0m');
                    g_StrOutLog+=`=> \n     Вижу =>${strInnerText} \n`;
                    break;
                default:
                    await console.log('\x1b[38;5;2m', "         Кажется это новая компания, но это не точно.", '\x1b[0m');
                    g_StrOutLog+=`=> \n     Кажется это новая компания, но это не точно. \n`;
                    break;
            }
        }
        //Опять Ждём Загрузки Страницы (на всякий пожарный)
        await WaitUntilPageLoads(page);
        // Проверим Наличие ИНПУТА (Тип компании)
        xPath = '//input[@name="company_types"]';
        resOk = await WaitForElementIsPresentByXPath(1000,page,xPath);
        if (!resOk) {
            throw `FAIL => Не вижу (${xPath})`;//<--специальный вызов ошибки!
        }
        //Сука по этому XPath нельзя кликнуть , он перекрыт Span "Выберите"
        // Хитрый XPath выбрать родителя содержащего конкретного ребёнка
        //("//div[./div[@class='MyClassName1' and text()='MyText']]")
        // const linkHandlers = await page.$x("//div[./input[@name='company_types']]");// <--работает!!!
        // linkHandlers[0].click();// <--работает!!!

        //Проверяем заполнено ли поле тип компании
        //проверяем по наличию на странице span(Заказчик, Перевозчик, Экспедитор) class="multiselect__tag
        ElPresent1 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Заказчик")]]');
        ElPresent2 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Перевозчик")]]');
        ElPresent3 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Экспедитор")]]');
        if(ElPresent1 || ElPresent2 || ElPresent3) {
            //xPath = '//div[@class="multiselect__tags-wrap"]/span[@class="multiselect__tag"]/span';
            xPath = '//div[@class="multiselect__tags"][./input[@name="company_types"]]/div/span[@class="multiselect__tag"]/span';
            QLength = await ElementGetLength(page, xPath);
            if (QLength<1){
                throw `FAIL (поле Тип компании)=> QLength = ${QLength}`;//<--специальный вызов ошибки!
            }
            strCompanyTypesFromPage = "[";
            for (let i=0;i<QLength;i++){
                strInnerText = await ElementGetInnerText(page, i, xPath);
                strCompanyTypesFromPage +=`${strInnerText}`;
                if((QLength > 1) && (i<QLength-1)){strCompanyTypesFromPage +=",";}
            }
            strCompanyTypesFromPage +="]";
           // await console.log(`     --> поле тип компании заполнено ${strCompanyTypesFromPage}`);
           // g_StrOutLog+=`\n  --> поле тип компании заполнено ${strCompanyTypesFromPage}\n`;

            // Очищаем Поле Тип компании
            // иконка Крестик(Удалить)
           // xPath = '//div[@class="select"][./label[contains(text(), "Тип компании")]]/div/div/div/div/span/i[@class="multiselect__tag-icon"]';
            xPath = '//div[@class="multiselect__tags"][./input[@name="company_types"]]/div/span/i[@class="multiselect__tag-icon"]';
            //xPath = '//div[@class="multiselect__tags"][./input[@name="company_types"]]/div/span/i';

            QLength = await ElementGetLength(page, xPath);
            if (QLength<1){
                throw `FAIL (поле Тип компании[x])=> QLength = ${QLength}`;//<--специальный вызов ошибки!
            }
            for (let i=0;i<QLength;i++){
                resOk = await ClickByXPath(page, xPath);
                if (!resOk) {
                    // await console.log('QLength=',QLength,'; i=',i);
                    // await TempStop(page);
                    throw `FAIL (поле Тип компании[x]) => ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
                }
                await page.waitFor(1000);
            }

        }
        // Ввожу ТИП КОМПАНИИ
        xPath = "//div[./input[@name='company_types']]";
        // Выбираем тип( из CompanyData.strCompanyTypes[x] )
        for (let i=0;i<CompanyData.strCompanyTypes.length;i++){
            strTT = CompanyData.strCompanyTypes[i];
            //Клик по Инпуту ТИП КОМПАНИИ
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw `FAIL => (ТИП КОМПАНИИ)ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
            }
            await page.waitFor(500);
            resOk = await ClickByXPath(page, `//span[contains(text(), "${strTT}")]`);
            if (!resOk){
                //await console.log(`FAIL => ClickByXPath(//span[contains(text(), "${strTT}")])`);
                //await TempStop(page);
                throw ` FAIL => (Выпад. список ТИП КОМПАНИИ)ClickByXPath(//span[contains(text(), "${strTT}")])`;
            }
            //await console.log('\x1b[38;5;2m', `    --> Выбрали тип( ${strTT} )`, '\x1b[0m');
            await page.waitFor(500);
        }

        // чек Наша компания

        //xPath = '//label[@class="check"][./span[@class="check__label"][contains(text(), "Наша компания")]]/input[@name="is_our"]';
        xPath = '//input[@name="is_our"]';
        resOk = await ElementIsChecked(page,0, xPath);
        //await console.log(`ElementIsChecked(${xPath}) = "${resOk}" `);
        if (resOk === undefined){
            throw `     Fail => ${resOk} => ElementIsChecked(${xPath})`;
        }
        xPath = '//label[@class="check"][./input[@name="is_our"]]/i[@class="check__icon"]';
        if ((CompanyData.boolIsOurCompany && !resOk) || (!CompanyData.boolIsOurCompany && resOk)){
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw `FAIL => (чек Наша компания)ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
            }
        }

        // чек ТРЕБУЕТ ПРОВЕРКИ
        //xPath = '//label[@class="check"][./span[@class="check__label"][contains(text(), "ТРЕБУЕТ ПРОВЕРКИ")]]/input[@name="is_our"]';
        xPath = '//input[@name="isReviewRequired"]';
        resOk = await ElementIsChecked(page,0, xPath);
        //await console.log(`ElementIsChecked(${xPath}) = "${resOk}" `);
        if (resOk === undefined){
            throw `     Fail => ${resOk} => ElementIsChecked(${xPath})`;
        }
        xPath = '//label[@class="check"][./input[@name="isReviewRequired"]]/i[@class="check__icon"]';
        if ((CompanyData.boolNeedCheck && !resOk) || (!CompanyData.boolNeedCheck && resOk)){
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw `FAIL => (чек ТРЕБУЕТ ПРОВЕРКИ)ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
            }
        }
        // Поле Ответственный
        // Очищаем
        // иконка Крестик(Удалить)
        // xPath = '//div[@class="select"][./label[contains(text(), "Тип компании")]]/div/div/div/div/span/i[@class="multiselect__tag-icon"]';
        xPath = '//div[@class="multiselect__tags"][./input[@name="managers"]]/div/span/i[@class="multiselect__tag-icon"]';

        QLength = await ElementGetLength(page, xPath);
        if (QLength === -1){
            throw `FAIL (Поле Ответственный[x])=> QLength = ${QLength}`;//<--специальный вызов ошибки!
        }
        for (let i=0;i<QLength;i++){
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw `FAIL (Поле Ответственный[x]) => ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
            }
            await page.waitFor(500);
        }
        // Вводим Тостер

        //xPath = '//div[@class="multiselect"][./div/input[@name="managers"]]/div[@class="multiselect__select"]';
        xPath = '//div[@class="select__area"]/div[1][./div/input[@name="managers"]]/div[@class="multiselect__select"]';


        // Выбираем Ответственный( из CompanyData.strManagers[x] )
        for (let i=0;i<CompanyData.strManagers.length;i++){
            strTT = CompanyData.strManagers[i];
            //Клик по стрелке Инпута Ответственный

            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {

                throw `FAIL => (Клик по стрелке Инпута Ответственный)ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
            }

            await page.waitFor(500);

            resOk = await TypeByXPath(page,'//input[@name="managers"]', strTT);

            await page.waitFor(500);
            MyXPath = `//div[@class="multiselect multiselect--active"][./div/input[@name="managers"]]/div[@class="multiselect__content-wrapper"]/ul/li/span/span`;
            strCheck = await ElementGetInnerText(page, 0 , MyXPath);
            if (strCheck === 'Не найдено'){
                await console.log(`  Warning => ${CompanyData.strManagers[i]} => ${strCheck}`);
                g_StrOutLog+=`  Warning => ${CompanyData.strManagers[i]} => ${strCheck}\n`;
                CompanyData.strManagers.splice(i,1);
                i--;

            }else {
                await page.keyboard.press('Enter');
                await page.waitFor(500);
            }

        }
        // Вводим Отсрочка дней оплаты
        xPath = '//input[@name="delay_days"]';
        strTT = await ElementGetValue(page, 0, xPath);
        //await console.log(`${xPath}=${strTT}`);
        resOk = await SetInput(page, 'input[name=delay_days]', CompanyData.strDelayDays);
        if (!resOk){
            throw ` FAIL => (Отсрочка дней оплаты)SetInput(input[name=delay_days])`;
        }
        // Очищаем Условие оплаты
        xPath = `//div[@class="select"][./label[@class="select__label"][contains(text(), "Условие оплаты")]]/div/div[@class="select__clear"]`;
        if (await ElementIsPresent(page, xPath)) {
            resOk = await ClickByXPath(page, xPath);
            await page.waitFor(500);
            if (!resOk){
                throw ` FAIL => (Очищаем Условие оплаты)ClickByXPath("${xPath}")])`;
            }
        }

        // Выбираем условие оплаты
        // strPaymentCondition
        xPath = `//div[@class="multiselect__tags"][./input[@name="payment_condition"]]`;
        resOk = await ClickByXPath(page, xPath);
        await page.waitFor(500);
        if (!resOk){
            throw ` FAIL => (Условие оплаты)ClickByXPath(${xPath})])`;
        }
        xPath = `//span[contains(text(), "${CompanyData.strPaymentCondition}")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk){
            throw ` FAIL => (Выпад. список Условие оплаты)ClickByXPath(${xPath})])`;
        }


        // await console.log(`------------`);
        // await TempStop(page);





        //Скролл до ФУТЕРА
        //await console.log('\x1b[38;5;2m', "div[class=form__footer]=> scrollIntoView", '\x1b[0m');
        await page.evaluate(() => {
            //document.querySelector('.nav-worker_threads').scrollIntoView();
            document.querySelector("div[class=form__footer]").scrollIntoView();
        });
        await page.waitFor(1000);
        //Клик по кнопке  (Сохранить компанию)
        //await console.log('\x1b[38;5;2m', "     --> Клик по кнопке  (Сохранить компанию)  =>", '\x1b[0m');
        await ClickByXPath(page, "//span[contains(text(), 'Сохранить компанию')]");
        await page.waitFor(500);
        //Проверяем на ошибки обязательных полей
        xPath = '//span[@class="element__error"]';
        ElPresent = await ElementIsPresent(page, xPath);
        if(ElPresent) {
            await console.log('\x1b[38;5;1m', "     --> !!! Вижу Незаполненные Поля=>", xPath, '\x1b[0m');
            throw 'myException: Незаполненные Поля. ХЗ почему.';//<--специальный вызов ошибки!!!
        }

        //Ждём начала прогрузки страницы
        //await page.waitForSelector(`html[class=nprogress-busy]`, { timeout: 2000});
        await WaitForElementIsPresentByXPath(1000, page, '//html[@class="nprogress-busy"]');
        //Ждём и проверяем Успешно сохранено //Успешно сохранено
        xPath = '//div[@class="noty_body"][contains(text(), "Успешно сохранено")]';
        ElPresent = await WaitForElementIsPresentByXPath(11000, page, xPath);
        if (ElPresent) {
            //await console.log('\x1b[38;5;2m', "Вижу =>", xPath, '\x1b[0m');

            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            CompanyData.returnResult = true;
            //await page.waitFor(11000);
            return CompanyData;//<------------------EXIT !!!

        }else {
            await console.log('\x1b[38;5;1m', "Не Вижу =>", xPath, '\x1b[0m');
            await console.log('\x1b[38;5;1m', "!!!! На странице Компании что то пошло не так !!!" , '\x1b[0m');
            g_StatusCurrentTest = 'Провален !!!';
            await g_FailedTests++;
            await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            CompanyData.returnResult = false;
            //await page.waitFor(11000);
            return CompanyData;//<------------------EXIT !!!
        }

        //await page.waitFor(9000);





        findCreatedCompanyOk = false;
        //await page.waitFor(5001111);

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
module.exports.CompanyCreateNewV2 = CompanyCreateNewV2;