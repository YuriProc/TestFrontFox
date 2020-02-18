
let CompanyCreateNewV2 = async (browser, page, CompanyData) => {
    const nameTest = NameFunction()+'->"' + CompanyData.strCodeCompany + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1200;
    let height = 880;
    let resOk;
    let xPath, MyXPath, xpLogoPhoto, PhotoURL, xPathPhones, xPathUrlS;
    let tStr, strTT, strInnerText, strAlreadyCreated, strNotCorrect, strNotFind, strErrorActivity;
    let strCompanyTypesFromPage;
    let QLength;
    let strCheck;
    let Selector;
    let ElPresent,ElPresent1,ElPresent2,ElPresent3;
    let findCreatedCompanyOk = false;
    try {
    await page.setViewport({width, height});

        //Клик по LOGO
        //await console.log("LogoClick(page);");
        await LogoClick(page);
        // hover КОМПАНИИ hover +  and click
        resOk = await ClickCompanyCreateNewPlus(page);
        if (!resOk) {
            throw 'ClickCompanyCreateNewPlus(page); = FAIL!"';//<--специальный вызов ошибки!
        }
        //Ждём загрузки страницы
        await WaitUntilPageLoads(page);
        //Ждём появления тайтла Создать компанию
        xPath = '//div[@class="head__title"][contains(text(), "Создать компанию")]';
        resOk = await WaitForElementIsPresentByXPath(5500, page, xPath);
        if (!resOk) {
            throw `FAIL => Не вижу (${xPath})`;
        }
        await WaitUntilPageLoads(page);
        //Проверим наличие //input[@id="code"]
        xPath = '//input[@id="code"]';
        resOk = await WaitForElementIsPresentByXPath(8500, page, xPath);
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
            // await console.log(`     Warning => После(проверить в базе) Отсутствует сообщение класса (${xPath})`);
            // g_StrOutLog += `     Warning => После(проверить в базе) Отсутствует сообщение класса (${xPath})\n`;
        } else {
            strInnerText = await ElementGetInnerText(page, 0, xPath);
            strAlreadyCreated = "Данная компания уже создана!";
            strNotCorrect = "Вы ввели некоректный ЕДРПОУ компании!";
            strNotFind = "Данные не найдены!";
            strErrorActivity = "Trying to get property 'activities' of non-object";
            switch (strInnerText) {
                case strNotCorrect:
                case strNotFind:
                case strErrorActivity:
                    await console.log('\x1b[38;5;1m', "    FAIL => Вижу =>", strInnerText, '\x1b[0m');
                    g_StrOutLog += `=> FAIL =>${strInnerText} \n`;
                    CompanyData.returnResult = false;

                    throw `FAIL => Проверить в базе => Вижу => ${strInnerText}`;//<--специальный вызов ошибки!
                    break;
                case strAlreadyCreated:
                    await console.log('\x1b[38;5;2m', `     Вижу => ${strInnerText}`, '\x1b[0m');
                    g_StrOutLog += `=> \n     Вижу =>${strInnerText} \n`;
                    break;
                default:
                    await console.log('\x1b[38;5;2m', "         Кажется это новая компания, но это не точно.", '\x1b[0m');
                    g_StrOutLog += `=> \n     Кажется это новая компания, но это не точно. \n`;
                    break;
            }
        }
        //Опять Ждём Загрузки Страницы (на всякий пожарный)
        await WaitUntilPageLoads(page);
        // Проверим Наличие ИНПУТА (Тип компании)
        //xPath = '//input[@name="company_types"]';
        xPath = `//label[@class="select__label"][contains(text(), "Тип компании")]`;
        resOk = await WaitForElementIsPresentByXPath(12000, page, xPath);
        if (!resOk) {
            tStr = `\n FAIL => После нажатия на кнопку (ПРОВЕРИТЬ В БАЗЕ) не прогрузилась страница `;
            tStr+= `\n FAIL => Не вижу (${xPath})`;
            await console.log(tStr);
            //await TempStop(page);
            throw tStr;//<--специальный вызов ошибки!
        }
        //Сука по этому XPath нельзя кликнуть , он перекрыт Span "Выберите"
        // Хитрый XPath выбрать родителя содержащего конкретного ребёнка
        //("//div[./div[@class='MyClassName1' and text()='MyText']]")
        // const linkHandlers = await page.$x("//div[./input[@name='company_types']]");// <--работает!!!
        // linkHandlers[0].click();// <--работает!!!

        // Выцепим название
        xPath = `//div[@class="element"][./div[@class="element__wrap"]/label[contains(text(), "Название")]]/div/input[@id="name"]`;
        CompanyData.strCompanyName = await ElementGetValue(page, 0, xPath);
        if (CompanyData.strCompanyName === '') {
            throw `FAIL => Не вижу (Название Компании(ElementGetValue = ""))`;
        }
        xPath = `//div[@class="element"][./div[@class="element__wrap"]/label[contains(text(), "Статус")]]/div/input[@id="status"]`;
        CompanyData.strStatusCompany = await ElementGetValue(page, 0, xPath);
        if (CompanyData.strStatusCompany === '') {
            throw `FAIL => Не вижу (Статус Компании(ElementGetValue = ""))`;
        }
        await console.log(`     Компания:(${CompanyData.strCompanyName}) | Статус:(${CompanyData.strStatusCompany})`);
        g_StrOutLog += `=> \n     Компания:(${CompanyData.strCompanyName}) | Статус:(${CompanyData.strStatusCompany}) \n`;

        //Проверяем заполнено ли поле тип компании
        //проверяем по наличию на странице span(Заказчик, Перевозчик, Экспедитор) class="multiselect__tag
        ElPresent1 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Заказчик")]]');
        ElPresent2 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Перевозчик")]]');
        ElPresent3 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Экспедитор")]]');
        if (ElPresent1 || ElPresent2 || ElPresent3) {
            //xPath = '//div[@class="multiselect__tags-wrap"]/span[@class="multiselect__tag"]/span';
            xPath = '//div[@class="multiselect__tags"][./input[@name="company_types"]]/div/span[@class="multiselect__tag"]/span';
            QLength = await ElementGetLength(page, xPath);
            if (QLength < 1) {
                throw `FAIL (поле Тип компании)=> QLength = ${QLength}`;//<--специальный вызов ошибки!
            }
            strCompanyTypesFromPage = "[";
            for (let i = 0; i < QLength; i++) {
                strInnerText = await ElementGetInnerText(page, i, xPath);
                strCompanyTypesFromPage += `${strInnerText}`;
                if ((QLength > 1) && (i < QLength - 1)) {
                    strCompanyTypesFromPage += ",";
                }
            }
            strCompanyTypesFromPage += "]";
            // await console.log(`     --> поле тип компании заполнено ${strCompanyTypesFromPage}`);
            // g_StrOutLog+=`\n  --> поле тип компании заполнено ${strCompanyTypesFromPage}\n`;

            // Очищаем Поле Тип компании
            // иконка Крестик(Удалить)
            // xPath = '//div[@class="select"][./label[contains(text(), "Тип компании")]]/div/div/div/div/span/i[@class="multiselect__tag-icon"]';
            xPath = '//div[@class="multiselect__tags"][./input[@name="company_types"]]/div/span/i[@class="multiselect__tag-icon"]';
            //xPath = '//div[@class="multiselect__tags"][./input[@name="company_types"]]/div/span/i';

            QLength = await ElementGetLength(page, xPath);
            if (QLength < 1) {
                throw `FAIL (поле Тип компании[x])=> QLength = ${QLength}`;//<--специальный вызов ошибки!
            }
            for (let i = 0; i < QLength; i++) {
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
        for (let i = 0; i < CompanyData.strCompanyTypes.length; i++) {
            strTT = CompanyData.strCompanyTypes[i];
            //Клик по Инпуту ТИП КОМПАНИИ
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw `FAIL => (ТИП КОМПАНИИ)ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
            }
            await page.waitFor(500);
            resOk = await ClickByXPath(page, `//span[contains(text(), "${strTT}")]`);
            if (!resOk) {
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
        resOk = await ElementIsChecked(page, 0, xPath);
        //await console.log(`ElementIsChecked(${xPath}) = "${resOk}" `);
        if (resOk === undefined) {
            throw `     Fail => ${resOk} => ElementIsChecked(${xPath})`;
        }
        xPath = '//label[@class="check"][./input[@name="is_our"]]/i[@class="check__icon"]';
        if ((CompanyData.boolIsOurCompany && !resOk) || (!CompanyData.boolIsOurCompany && resOk)) {
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw `FAIL => (чек Наша компания)ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
            }
        }

        // чек ТРЕБУЕТ ПРОВЕРКИ
        //xPath = '//label[@class="check"][./span[@class="check__label"][contains(text(), "ТРЕБУЕТ ПРОВЕРКИ")]]/input[@name="is_our"]';
        xPath = '//input[@name="isReviewRequired"]';
        resOk = await ElementIsChecked(page, 0, xPath);
        //await console.log(`ElementIsChecked(${xPath}) = "${resOk}" `);
        if (resOk === undefined) {
            throw `     Fail => ${resOk} => ElementIsChecked(${xPath})`;
        }
        xPath = '//label[@class="check"][./input[@name="isReviewRequired"]]/i[@class="check__icon"]';
        if ((CompanyData.boolNeedCheck && !resOk) || (!CompanyData.boolNeedCheck && resOk)) {
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
        if (QLength === -1) {
            throw `FAIL (Поле Ответственный[x])=> QLength = ${QLength}`;//<--специальный вызов ошибки!
        }
        for (let i = 0; i < QLength; i++) {
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
        for (let i = 0; i < CompanyData.strManagers.length; i++) {
            strTT = CompanyData.strManagers[i];
            //Клик по стрелке Инпута Ответственный

            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {

                throw `FAIL => (Клик по стрелке Инпута Ответственный)ClickByXPath(${xPath})`;//<--специальный вызов ошибки!
            }

            await page.waitFor(500);

            resOk = await TypeByXPath(page, '//input[@name="managers"]', strTT);

            await page.waitFor(500);
            MyXPath = `//div[@class="multiselect multiselect--active"][./div/input[@name="managers"]]/div[@class="multiselect__content-wrapper"]/ul/li/span/span`;
            strCheck = await ElementGetInnerText(page, 0, MyXPath);
            if (strCheck === 'Не найдено') {
                await console.log(`  Warning => ${CompanyData.strManagers[i]} => ${strCheck}`);
                g_StrOutLog += `  Warning => ${CompanyData.strManagers[i]} => ${strCheck}\n`;
                CompanyData.strManagers.splice(i, 1);
                i--;

            } else {
                await page.keyboard.press('Enter');
                await page.waitFor(500);
            }

        }
        // Вводим Отсрочка дней оплаты
        xPath = '//input[@name="delay_days"]';
        strTT = await ElementGetValue(page, 0, xPath);
        //await console.log(`${xPath}=${strTT}`);
        resOk = await SetInput(page, 'input[name=delay_days]', CompanyData.strDelayDays);
        if (!resOk) {
            throw ` FAIL => (Отсрочка дней оплаты)SetInput(input[name=delay_days])`;
        }
        // Очищаем Условие оплаты
        xPath = `//div[@class="select"][./label[@class="select__label"][contains(text(), "Условие оплаты")]]/div/div[@class="select__clear"]`;
        if (await ElementIsPresent(page, xPath)) {
            resOk = await ClickByXPath(page, xPath);
            await page.waitFor(500);
            if (!resOk) {
                throw ` FAIL => (Очищаем Условие оплаты)ClickByXPath("${xPath}")])`;
            }
        }

        // Выбираем условие оплаты
        // strPaymentCondition
        xPath = `//div[@class="multiselect__tags"][./input[@name="payment_condition"]]`;
        resOk = await ClickByXPath(page, xPath);
        await page.waitFor(500);
        if (!resOk) {
            throw ` FAIL => (Условие оплаты)ClickByXPath(${xPath})])`;
        }
        xPath = `//span[contains(text(), "${CompanyData.strPaymentCondition}")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw ` FAIL => (Выпад. список Условие оплаты)ClickByXPath(${xPath})])`;
        }
        await page.waitFor(500);
        //Лого если ПРИСУТСТВУЕТ
        if (await ElementIsPresent(page, '//div[@class="zone__title"][contains(text(), "Лого компании")]')) {
            // Лого компании ТОЛЬКО если ещё нет
            ElPresent = await ElementIsPresent(page, '//div[@class="dz-image"]');
            if (!ElPresent) {
                xpLogoPhoto = '//div[@class="zone"][./div[contains(text(), "Лого компании")]]/div[@id="dropzone"]';
                PhotoURL = await InsertPhoto(browser, page, 'LogoURL', -1, xpLogoPhoto);
            }
        }else{
            await console.log('     Warning: Отсутствует (//div[@id="dropzone"])');
            g_StrOutLog+=`\n Warning: Отсутствует (//div[@id="dropzone"]) \n`;
        }

        //проверить наличие телефонов
        xPathPhones = `//div[@class="form__block"][./div[@class="module__head"]/div[@class="module__title"][contains(text(), "Телефоны")]]`;
        xPathPhones+= `/div[@class="module__cnt"]/div[@class="module__element"]/div[@class="module__data"]`;
        // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[2]/div[4]/div/div[2]/div/div[2]/div[1]/div[1]
        let tempNQ = await ElementGetLength(page, xPathPhones);
        //await console.log(`ElementGetLength:${tempNQ}`);
        if (tempNQ < 2) {
            // Клик по Телефон +
            xPath = `//div[@class="module__head"][./div[@class="module__title"][contains(text(), "Телефоны")]]`;
            xPath += `/div[@class="module__nav"]/div[@class="module__item"]/span[1]`;
            resOk = await ClickByXPathWithScroll(2000, page, xPath);
            if (!resOk) {
                throw ` FAIL => ClickByXPath(Телефоны + )`;
            }
            await page.waitFor(1000);
            // Модалка Добавить номер контакта
            xPath = `//input[@id="phone"]`;
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw ` FAIL => ClickByXPath(${xPath})`;
            }
            resOk = await TypeByXPath(page, xPath, CompanyData.strPhoneNumber);
            if (!resOk) {
                throw ` FAIL => TypeByXPath(${xPath})`;
            }
            // Клик по кнопке создать
            xPath = `//div[@class="vueModal__container"]/div[@class="vueModal__main"]/div[@class="form"]`;
            xPath += `/div[@class="form__footer"]/button[@class="btn"]/span[contains(text(), "Создать")]`;
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw ` FAIL => ClickByXPath((Модалка Добавить номер контакта)Клик по кнопке создать)`;
            }
            // Проверяем Успешно сохранено и ждём загрузки страницы
            resOk = await WaitUntilPageLoadsAndReturnSuccessSave(page);
            if (!resOk) {
                throw ` FAIL => WaitUntilPageLoadsAndReturnSuccessSave((Модалка Добавить номер контакта)Клик по кнопке создать)`;
            }
            //Ждать закрытия Модалки и загрузки Страницы
            await page.waitFor(2000);
            await WaitUntilPageLoads(page);
        }
        let strTempPhone = await ElementGetInnerText(page, 0, xPathPhones);
        if (strTempPhone === '') {
            throw ` FAIL => Не получилось прочитать номер телефона`;
        }
        CompanyData.strPhoneNumber = strTempPhone;

        //проверить наличие ссылок
        xPathUrlS = ``;
        xPathUrlS = `//div[@class="form__block"][./div[@class="module__head"]/div[@class="module__title"][contains(text(), "Ссылки")]]`;
        xPathUrlS+= `/div[@class="module__cnt"]/div[@class="module__element"]/a[@class="module__link"]`;
        // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[2]/div[4]/div/div[2]/div/div[2]/div[1]/div[1]
        tempNQ = await ElementGetLength(page, xPathUrlS);
        //await console.log(`Сылки ElementGetLength:${tempNQ}`);
        if (tempNQ < 2) {

            // Клик по Ссылки +
                //ёбаный /svg/path не кликается
            xPath = '//div[@class="module__head"][./div[@class="module__title"][contains(text(), "Ссылки")]]';

            resOk = await ClickHeaderPlus(page, xPath);
            if (!resOk){
                throw ` FAIL => ClickHeaderPlus((Клик по Ссылки +)${xPath})`;
            }
            await page.waitFor(1000);
            // Модалка Редагувати посилання
            xPath = `//input[@id="url"]`;
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw ` FAIL => ClickByXPath((Модалка Редагувати посилання)${xPath})`;
            }
            resOk = await TypeByXPath(page, xPath, CompanyData.strUrl);
            if (!resOk) {
                throw ` FAIL => TypeByXPath(${xPath})`;
            }
            //  Тип посилання
            xPath = `//div[@class="form__item"]/div[@class="select"][./label[contains(text(), "Тип посилання")]]`;
            xPath += `/div[@class="select__area"]/div[@class="multiselect"]/div[@class="multiselect__tags"]`;//
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw ` FAIL => ClickByXPath((Модалка Редагувати посилання)Тип посилання)`;
            }
            //Выпадающий список => Выбор Другой
            await page.waitFor(2000);
            xPath = `//div[@class="form__item"]/div[@class="select"][./label[contains(text(), "Тип посилання")]]`;
            xPath += `/div[@class="select__area"]/div[@class="multiselect"]/div[@class="multiselect__content-wrapper"]/ul`;//
            xPath += `/li/span/span[contains(text(), "Другой")]`;
            xPath = `//li/span/span[contains(text(), "Другой")]`;
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                //
                // await console.log(`------------Выбор Другой`);
                // await TempStop(page);
                throw ` FAIL => ClickByXPath((Модалка Редагувати посилання)Выпадающий список => Выбор Другой)`;
            }
            await page.waitFor(2000);
            // Клик по кнопке Сохранить
            xPath = `//div[@class="vueModal__container"]/div[@class="vueModal__main"]/div[@class="form"]`;
            xPath += `/div[@class="form__footer"]/button[@class="btn"]/span`;//[contains(text(), "Сохранить")]
            resOk = await ClickByXPath(page, xPath);
            if (!resOk) {
                throw ` FAIL => ClickByXPath((Модалка Редагувати посилання)Клик по кнопке Сохранить)`;
            }
            // Проверяем Успешно сохранено и ждём загрузки страницы
            resOk = await WaitUntilPageLoadsAndReturnSuccessSave(page);
            if (!resOk) {
                throw ` FAIL => WaitUntilPageLoadsAndReturnSuccessSave((Модалка Редагувати посилання)Клик по кнопке создать)`;
            }
            //Ждать закрытия Модалки и загрузки Страницы
            await page.waitFor(2000);
            await WaitUntilPageLoads(page);
        }
        let strTempUrl = await ElementGetInnerText(page, 0, xPathUrlS);
        if (strTempUrl === '') {
            throw ` FAIL => Не получилось прочитать Ссылку`;
        }
        CompanyData.strUrl = strTempUrl;


        // await console.log(`------------`);
        // await TempStop(page);

        // Модалка Додати договор
        resOk = await AddNewContract(page, CompanyData);
        if (!resOk){
            throw ` FAIL => Не получилась Модалка Додати договор`;
        }
        await WaitUntilPageLoads(page);






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
        // //await page.waitForSelector(`html[class=nprogress-busy]`, { timeout: 2000});
        // await WaitForElementIsPresentByXPath(1000, page, '//html[@class="nprogress-busy"]');
        // //Ждём и проверяем Успешно сохранено //Успешно сохранено
        // xPath = '//div[@class="noty_body"][contains(text(), "Успешно сохранено")]';
        // ElPresent = await WaitForElementIsPresentByXPath(11000, page, xPath);
        resOk = await WaitUntilPageLoadsAndReturnSuccessSave(page);


        // if (DropZoneOk) {
        //     Href = await ElementGetHref(page, 0, '//div[@class="dz-image"]/a');
        //     //await console.log('PhotoURL(',Href,')');
        // }else {Href = '';}
        // VehicleData['strHrefPhotoURL'] = Href;


        //await TempStop(page);

        //if (ElPresent) {
        if (resOk) {
            //await console.log('\x1b[38;5;2m', "Вижу =>", xPath, '\x1b[0m');

            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            CompanyData.returnResult = true;
            //await page.waitFor(11000);
            return CompanyData;//<------------------EXIT !!!

        }else {
            //await console.log('\x1b[38;5;1m', "Не Вижу =>", xPath, '\x1b[0m');
            await console.log('\x1b[38;5;1m', "!!!! На странице Компании что то пошло не так !!!" , '\x1b[0m');
            await console.log('resOk = await WaitUntilPageLoadsAndReturnSuccessSave(page); resOk ===',resOk);
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
let AddNewContract;
AddNewContract = async function( page , CompanyData){

    let xPath, resOk, result;
    result = false;
    // Клик по Договора +
    //ёбаный /svg/path не кликается
    xPath = '//div[@class="module__head"][./div[@class="module__title"][contains(text(), "Договора")]]';

    resOk = await ClickHeaderPlus(page, xPath);
    if (!resOk){
        throw ` FAIL => ClickHeaderPlus((Клик по Договора +)${xPath})`;
    }
    await page.waitFor(1000);
    // Модалка Додати договор
    //  клик по инпуту
    xPath = `//div[@class="search"][./label[contains(text(), "От какой фирмы работаем с компанией")]]`;
    xPath+= `/div[@class="search__area"]/div[@class="element"]/div/input[@class="element__area"]`;
    //xPath = `//div[@data-vv-name="our_company_role"]/div/input[@class="element__area"]`;
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){

        throw ` FAIL => (Договора + клик по инпуту)ClickByXPath((Клик по "input[@class="element__area"]"))`;
    }
    await page.waitFor(500);
    //вводим название нашей компании
    resOk = await TypeByXPath(page, xPath, CompanyData.strContractOurCompany);
    await WaitUntilPageLoads(page);

    //выбор из списка
    xPath = `//div[@class="search"][./label[contains(text(), "От какой фирмы работаем с компанией")]]`;
    xPath+= `/div[@class="search__cnt has-active"]/div[@class="search__item"][contains(text(), "${CompanyData.strContractOurCompany}")]`;

    //xPath = `//div[@class="search__cnt has-active"]/div[@class="search__item"][contains(text(), "${CompanyData.strContractOurCompany}")]`;
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){

        throw ` FAIL => (Договора + выбор из списка)ClickByXPath((Клик по ${CompanyData.strContractOurCompany}))`;
    }
    //клик по инпуту (Кем является наша компания в этом договоре)
    xPath = `//div[@class="select"][./label[contains(text(), "Кем является наша компания в этом договоре")]]`;
    xPath+= `/div[@class="select__area"]/div[@class="multiselect"]/div[@class="multiselect__select"]`;
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){

        throw ` FAIL => (Договора + клик по инпуту (Кем является наша компания в этом договоре))ClickByXPath((Клик по ${CompanyData.strContractOurCompanyIs}))`;
    }
    await page.waitFor(1000);
    //выбор из списка
    xPath = `//div[@class="select"][./label[contains(text(), "Кем является наша компания в этом договоре")]]`;

    xPath+= `/div[@class="select__area"]`;

    xPath+= `/div[@class="multiselect multiselect--active"]`;
    // let TempStr = await ElementGetLength(page, xPath);
    // await console.log(`ElementGetLength=(${TempStr})`);
    xPath+= `/div[@class="multiselect__content-wrapper"]`;

    xPath+= `/ul/li/span/span[contains(text(), "${CompanyData.strContractOurCompanyIs}")]`;
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){
        // await console.log('FAIL => (Договора + выбор из списка strContractOurCompanyIs)');
        // await console.log(`xPath="${xPath}"`);
        // await TempStop(page);
        throw ` FAIL => (Договора + выбор из списка (Кем является наша компания в этом договоре))ClickByXPath((Клик по ${CompanyData.strContractOurCompanyIs}))`;
    }
    await page.waitFor(500);
    // клик по инпуту (Дата начала договора)
    xPath = `//input[@id="start_date"]`;
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){
        throw ` FAIL => (Договора + start_date)ClickByXPath(${xPath})`;
    }
    await page.waitFor(500);
    //клик по ДАТАПИКЕРУ (Выбор Даты начала договора)
    xPath = `//div[@class="vdp-datepicker element__area"][./div/input[@id="start_date"]]`;
    xPath+= `/div[@class="vdp-datepicker__calendar"]/div/span[@class="cell day"][1]`; //[last()]
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){
        throw ` FAIL => (Договора + (Выбор Даты начала договора))ClickByXPath(клик по ДАТАПИКЕРУ)`;
    }
    await page.waitFor(500);
// клик по инпуту (Дата истечения договора )
    xPath = `//input[@id="expiration_date"]`;
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){
        throw ` FAIL => (Договора + start_date)ClickByXPath(${xPath})`;
    }
    await page.waitFor(500);
    //клик по ДАТАПИКЕРУ (Выбор Даты истечения договора)
    xPath = `//div[@class="vdp-datepicker element__area"][./div/input[@id="expiration_date"]]`;
    xPath+= `/div[@class="vdp-datepicker__calendar"]/div/span[@class="cell day"][last()]`; //[last()]
    resOk = await ClickByXPath(page, xPath);
    if (!resOk){
        throw ` FAIL => (Договора + (Выбор Даты истечения договора))ClickByXPath(клик по ДАТАПИКЕРУ)`;
    }
    await page.waitFor(500);

    //Клик по кнопке Создать
    xPath = `//div[@class="vueModal__container"][./div[@class="vueModal__title"]/div[contains(text(), "Додати договор")]]`;
    xPath+= `/div[@class="vueModal__main"]/div[@class="form"]/div[@class="form__footer"]/button/span[contains(text(), "Создать")]`;
    resOk = await ClickByXPath(page, xPath);

    if (!resOk){
        throw ` FAIL => (Договора + (Клик по кнопке Создать)`;
    }
    await page.waitFor(500);
    resOk = await WaitUntilPageLoadsAndReturnSuccessSave(page);
    if (!resOk){
        throw ` FAIL => (Договора + (Не вижу "Успешно сохранено")`;
    }


    result = true;

    return result;
};
let ClickHeaderPlus;
ClickHeaderPlus = async function(page , xPath){
    try {
        await ClickByXPathWithScroll(2000, page, xPath);

        let link = await page.$x(xPath);
        let linkPos = await link[0].boundingBox();
        let CenterPlus = await (linkPos.height / 2);
        await page.mouse.move(linkPos.x + linkPos.width - CenterPlus, linkPos.y + CenterPlus);
        await page.waitFor(500);
        await page.mouse.click(linkPos.x + linkPos.width - CenterPlus, linkPos.y + CenterPlus);
        return true;
    }catch (e) {
        return false;
    }
};
//--------------------------------------------------------------

let ClickCompanyCreateNewPlus;
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