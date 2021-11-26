//'use strict';
class Company{
    constructor(browser, page , CompanyData) {
        this.browser = browser;
        this.page = page;
        this.CompanyData = CompanyData;
        // Таблица Компаний "Загрузка"
        this.xCompanyTableLoading = `//div[@class="busy-table"]//strong[contains(text(), "Загрузка...")]`;
        // Верхнее меню "Компания +"
        this.xMenuCompanyPlus = `//a[@href="/crm/company"][@class="info__add"]`;
        // Тайтл "Создание компании"
        this.xTitleCompanyCrteate = '//h3[@class="crm-view__title"][contains(text(), "Создание компании")]';
        // Инпут "Введите ЕДРПОУ/ИНН"
        this.xInputINN = '//input[@type="number"][@placeholder="Введите ЕДРПОУ/ИНН"]';
        // Кнопка "Проверить в базе"
        this.xButtonCheckInBase = `//button[@type="submit"][contains(text(), "Проверить в базе")]`;
        // Плашка блокировки одновременного редаетирования Кнопка "Хочу быть первым"
        this.xBlockButtonWantFirst = `//div[@class="lock-button"][contains(text(), "Хочу быть первым")]`;
        // Плашка блокировки одновременного редактирования Кнопка "Кикнуть первого"
        this.xBlockButtonKickFirst = `//div[@class="lock-button"][contains(text(), "Кикнуть первого")]`;
        // Проверка, что нет спиннера на форме компании
        this.xCompanyFormSpinner = `//section[@class="crm-view crm-view--company crm-view__processing"]//span[@class="spinner-border"]`;
        // Хеадер "Данные о компании"
        this.xHeaderDataCompany = `//h5[contains(text(), "Данные о компании")]`;
        // Хеадер "Контактные данные"
        this.xHeaderDataContacts = `//h5[contains(text(), "Контактные данные")]`;
        // Хеадер "Имя Компании"
        this.xHeaderCompanyName = `//div[@class="company-head-info"]/..//div[@class="company-heading"]`;
        // ЕДРПОУ/ИНН
        this.xEDRPOUcode = `//div[div[@class="label"][contains(text(),"ЕДРПОУ/ИНН")]]/div[@class="value"]`;
        // Статус Компании
        this.xStatusCompany = `//div[./div[@class="label"][contains(text(), "Статус:")]]/div[@class="value"]`;
        //Плашка о плохом статусе
        this.xBoxBadStatusCompany = `//span[contains(text(), "Редактирование карточки Компании запрещено ее статус не равен")]`;
        //проверяем по наличию на странице span(Заказчик, Перевозчик, Экспедитор, Контрагент ТО) class="multiselect__tag
        //Типы Компании в шапке (после статуса)
        this.xTypesCompany = `//div[@class="sub-info-title"]`;
        //Тип Компании стрелка вниз
        this.xTypesCompanyArrowDown = `//fieldset/legend[contains(text(), "Тип компании")]/..//div[@class="multiselect__select"]`;
        //Тип Компании Крестик удалить
        this.xTypesCompanyDel = `//div[@class="crm-select__delete-tag-btn"]/i[@class="icon-cancel"]`;
        // Контактные данные -> Контакты
        this.ContactDataContacts = `//div[@class="relations__item"][label[contains(text(),"Контакты")]]`;
        // Контактные данные -> Контакты "Plus"
        this.ContactDataContactsPlus = this.ContactDataContacts + `//div[@class="add-button"][i[@class="icon-plus"]]`;

        //Проверка открытия ТАБА Контакты
        this.xTabContacts = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Контакты")]`;
        // Активная таблица
        this.xActiveTable = `//div[@role="tabpanel"][@aria-hidden="false"]`;
        //Табличное редактирование, строка с типом Директор
        this.xStrTypeBoss = this.xActiveTable + `//tr[@role="row"]/td[@aria-colindex="3"][@role="cell"][contains(text(), "Директор")]`;
        // Строки с ФИО и Линками + [contains(text(), "ФИО")] , @href=???
        this.xStringsFIOandLinks = `//tr[@role="row"]/td[@aria-colindex="2"][@role="cell"]/a`;
        // Контактные данные -> Подписанты
        this.ContactDataDocumentWriter = `//div[@class="relations__item"]/label[contains(text(),"Подписанты")]`;
        // Контактные данные -> Подписанты "Plus"
        this.ContactDataDocumentWriterPlus = this.ContactDataDocumentWriter + `//div[@class="add-button"][i[@class="icon-plus"]]`;
        //Проверка открытия ТАБА Подписанты
        this.xTabDocumentWriters = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Подписанты")]`;
        //Табличное редактирование, строки ячейки ФИО Подписанта [Num]
        this.xStrDocumentWriterFIO = this.xActiveTable + `//tr[@role="row"]/td[@aria-colindex="2"][@role="cell"]`;
        // Табл редактирование Вкладка Подписанты Кнопка "+ Добавить Подписанты"
        this.xButtonPlusDocumentWriters = this.xActiveTable + `//button[@type="button"][contains(text(), "Добавить Подписанты")]`;
        // Модалка "Добавить подписанта"
        this.xModalAddDocumentWriter = `//div[@class="modal-content"][header/h5[contains(text(), "Добавить подписанта")]]`;
        // Селект "Добавить подписанта" Стрелка Вниз
        this.xDocumentWriterArrowDown = this.xModalAddDocumentWriter + `//div[@class="multiselect__select"]`;
        // "Добавить подписанта" Раскрытый ДропДаун
        this.xDocumentWriterDropDownActive = this.xModalAddDocumentWriter + `//div[@class="multiselect__content-wrapper"][not (contains(@style, "display: none"))]`;
        // "Добавить подписанта" Закрытый ДропДаун
        this.xDocumentWriterDropDownClosed = this.xModalAddDocumentWriter + `//div[@class="multiselect__content-wrapper"][contains(@style, "display: none")]`;
        // "Добавить подписанта" Раскрытый ДропДаун Строки [Num]
        this.xDocumentWriterDropDownStrings = this.xDocumentWriterDropDownActive + `//li/span/span`;
        // Кнопка "Добавить подписанта" активная
        this.xButtonAddDocumentWriter = this.xModalAddDocumentWriter + `//button[contains(text(), "Добавить подписанта")][not (contains(@disabled, "disabled"))]`;


        // закроем таблицу
        // Закрыть Таблицу табличное редактирование
        this.xCloseTable = `//button[@type="button"][@class="close"]`;
        // Контактные данные ->Типы грузов
        this.xContactDataCargoTypes =`//div[@class="relations__item"]/label[contains(text(),"Типы грузов")]`;
        //Проверка открытия ТАБА  Типы грузов
        this.xTabCargoTypes = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Типы грузов")]`;
        // Типы Грузов Корзина Удалить
        this.xDelCargoTypes = `//td[@aria-colindex="10"][@role="cell"]/div[@class="delete-icon"]`;
        // Табл редактирование Вкладка Типы Грузов Кнопка "+ Добавить Типы грузов"
        //this.xPlusCargoType = `//div[@class="tab-pane active"]/div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xPlusCargoType = this.xActiveTable + `//button[@type="button"][contains(text(), "Добавить Типы грузов")]`;
        // Заголовок Модалки Тип Груза
        this.xTitleModalCargoType = `//h5[@class="modal-title"][contains(text(), "Тип груза")]`;
        // ФилдСет "Тип груза"
        this.xFieldSetCargoType = `//fieldset[legend[contains(text(),"Тип груза")][span[@class="required"]]]`;
        //Модалка инпут "Тип груза"
        this.xMultiSelectCargoType = this.xFieldSetCargoType + `//div[@class="multiselect__tags"]`;
        this.xInputCargoType = this.xFieldSetCargoType + `//input`;
        // Дропдаун "Тип груза" Активный
        this.xDropDownCargoTypeActive = this.xFieldSetCargoType + `//div[@class="multiselect__content-wrapper"][not (contains(@style, "display: none"))]`;
        // Дропдаун "Тип груза" Закрытый
        this.xDropDownCargoTypeClosed = this.xFieldSetCargoType + `//div[@class="multiselect__content-wrapper"][contains(@style, "display: none")]`;
        // Модалка инпут "Тип груза" выбор в ДропДауне Нужная Строка
        this.xDropDownCargoTypeNeedStr =`//li[@class="multiselect__element"]/span[@class="multiselect__option multiselect__option--highlight"]`;
        this.xDropDownCargoTypeNeedStr+=`/span[contains(text(), "${this.CompanyData.strCargoType}")]`;
        // Модалка Тип Груза инпут "Цена"
        this.xPriceCargoType =`//fieldset[legend[contains(text(),"Цена")]]//input[@type="number"]`;
        // Модалка Тип Груза галочка "Установить по умолчанию"
        this.xDefoltCargoType =`//label[contains(@class, "crm-checkbox")][input[@type="checkbox"]][div[@class="crm-checkbox_indicator"]]`;
        this.xDefoltCargoType+=`[contains(text(), "Установить по умолчанию")]`;
        //  Модалка Тип Груза инпут Тип транспорта
        this.xInputVehicleType = `//fieldset[legend[contains(text(),"Тип транспорта")]]`;
        this.xInputVehicleType+=`//div[@class="multiselect__tags"]`;
        // Модалка Тип груза выбор в ДропДауне Тип транспорта
        this.xDropDownVehicleType =`//li[@class="multiselect__element"]/span[@class="multiselect__option multiselect__option--highlight"]`;
        this.xDropDownVehicleType+=`/span[contains(text(), "${this.CompanyData.strCargoVehicleType}")]`;
        // Модалка Тип груза Тоннаж От / До
        this.xCargoWeight0 =`//fieldset[legend[contains(text(),"Тоннаж")]]//input[@placeholder="От"]`;
        this.xCargoWeight1 =`//fieldset[legend[contains(text(),"Тоннаж")]]//input[@placeholder="До"]`;
        // Модалка Тип груза Объем От / До
        this.xCargoVolume0 =`//fieldset[legend[contains(text(),"Объем")]]//input[@placeholder="От"]`;
        this.xCargoVolume1 =`//fieldset[legend[contains(text(),"Объем")]]//input[@placeholder="До"]`;
        // Модалка Тип груза Кнопка Сохранить
        this.xSaveCargoType = `//div[@class="modal-dialog modal-md"]//button[@type="button"][contains(text(), "Сохранить")]`;




    }

    async ClickCompanyCreateNewPlus(){
        try {
            let xPath, resOk,strInnerText;

            await WaitRender(this.page);
            // //-----
            // let Tname = await NameFunction();
            //
            // await console.log(`Tname1=(${Tname})`);
            // Tname = await NameNameFunction();
            // await console.log(`Tname2=(${Tname})`);
            // //----
            // Верхнее меню "Компания +"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMenuCompanyPlus);
            if (!resOk) {
                throw `FAIL => Ждём появления Верхнее меню "Компания +"(${this.xMenuCompanyPlus})`;
            }
            // Таблица Компаний "Загрузка"
            // Ждём пока не пропадёт
            resOk = await WaitUntilXPathExist(this.page,5000, this.xCompanyTableLoading);

            resOk = await ClickByXPath(this.page, this.xMenuCompanyPlus);
            if (!resOk) {
                throw `FAIL => Верхнее меню "Компания +"(${this.xMenuCompanyPlus})`;
            }
            //Ждём появления Тайтл "Создание компании"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xTitleCompanyCrteate);
            if (!resOk) {
                throw `FAIL => Ждём появления Тайтл "Создание компании"(${this.xTitleCompanyCrteate})`;
            }
            // Ждём появления Инпут "Введите ЕДРПОУ/ИНН"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputINN);
            if (!resOk) {
                throw `FAIL => Ждём появления Инпут "Введите ЕДРПОУ/ИНН" (${this.xInputINN})`;
            }
            // Вводим код ЕДРПОУ
            resOk = await SetTextByXPath(this.page, this.xInputINN, this.CompanyData.strCompanyCode);
            if (!resOk) {
                throw `FAIL => Вводим код ЕДРПОУ SetTextByXPath(${this.xInputINN})`;
            }
            // Жмём Кнопка "Проверить в базе" _PromiseAll
            //resOk = await ClickByXPath_PromiseAll(this.page, this.xButtonCheckInBase);
            resOk = await ClickByXPath(this.page, this.xButtonCheckInBase);
            if (!resOk) {
                throw `FAIL => Жмём Кнопка "Проверить в базе" ClickByXPath(${this.xButtonCheckInBase})`;
            }
            // Ждём Исчезновения Спиннера и Рендера страницы
            await SpinnerWait(this.page);
            await WaitRender(this.page);



            //----------------------------

// проверим Вывод ошибки

            strInnerText = await WarningsRead(this.page, 4000);
            if (strInnerText!==''){
                let strAlreadyCreated = "Данная компания уже создана!";
                let strNotCorrect = "Вы ввели некоректный ЕДРПОУ компании!";
                let strNotFind = "Данные не найдены!";
                let strErrorActivity = "Trying to get property 'activities' of non-object";
                if (strInnerText !== strAlreadyCreated) {
                    await this.page.screenshot({ path: g_PathSS + `screenshot_ClickCompanyCreateNewPlus_checkInBase.png`, fullPage: true });
                }
                await WarningsRemove(this.page);
                switch (strInnerText) {
                    case strNotCorrect:
                    case strNotFind:
                    case strErrorActivity:
                        await console.log('\x1b[38;5;1m\t', "FAIL => strErrorActivity => ", strInnerText, '\x1b[0m');
                        g_StrOutLog += `=> FAIL =>${strInnerText} \n`;
                        this.CompanyData.returnResult = false;

                        throw `FAIL => Проверить в базе => ${strInnerText}`;//<--специальный вызов ошибки!
                        break;
                    case strAlreadyCreated:
                        await console.log('\x1b[38;5;2m\t', `Вижу => ${strInnerText}`, '\x1b[0m');
                        g_StrOutLog += `=> \n\tВижу =>${strInnerText} \n`;
                        break;
                    default:
                        await console.log('\x1b[38;5;2m', "         Кажется это новая компания, но это не точно.", '\x1b[0m');
                        g_StrOutLog += `=> \n     Кажется это новая компания, но это не точно. \n`;
                        break;
                }
            }else{
                await console.log('\x1b[38;5;3m\t', `Странно нет сообщений => ClickCompanyCreateNewPlus_checkInBase`, '\x1b[0m');
            }
//await console.log(`qqqqqqq`);
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in ClickCompanyCreateNewPlus`);
            return false;
        }
    } // async ClickCompanyCreateNewPlus(){
    //-------------------
    async CheckCompanyForm(){
        try{ let strCrmCompany = `/crm/company/`;
            let resOk;
            let elPresent;
            // await WaitRender(this.page);
             await WaitRender(this.page);
            // Проверка URL
            let strPageURL = await this.page.url();
            resOk = true;
            if (! await SubStrIsPresent(strCrmCompany, strPageURL)){
                resOk = false;
                await console.log('\x1b[38;5;1m\t', `!!! FAIL -> URL страницы (${strPageURL}) не содержит (${strCrmCompany}) <- FAIL !!!`, '\x1b[0m');
            }
            let strID_fromURL = await GetIDFromHref(strPageURL);
            if (strID_fromURL === ``){
                resOk = false;
                await console.log('\x1b[38;5;1m\t', `!!! FAIL -> URL страницы (${strPageURL}) не содержит ID (${strID_fromURL}) <- FAIL !!!`, '\x1b[0m');
            }
            if (! resOk){
                throw `FAIL => Проверка URL`;
            }else {
                await console.log('\x1b[38;5;2m\t', `URL страницы=(${strPageURL}) `, `- OK !`, '\x1b[0m');
            }
            this.CompanyData.strCompanyID = strID_fromURL;

            // Хеадер "Данные о компании"
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xHeaderDataCompany);
            if (!resOk) {
                //await TempStop(this.page);
                throw `FAIL => Хеадер "Данные о компании"(${this.xHeaderDataCompany})`;
            }
            // Хеадер "Контактные данные"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xHeaderDataContacts);
            if (!resOk) {
                throw `FAIL => Хеадер "Контактные данные"(${this.xHeaderDataContacts})`;
            }
            // Хеадер "Имя Компании"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xHeaderCompanyName);
            if (!resOk) {
                throw `FAIL => Хеадер "Имя Компании"(${this.xHeaderCompanyName}))`;
            }
            // ЕДРПОУ/ИНН
            let codeEDRPOU_fromPage = await ElementGetInnerText(this.page, 0, this.xEDRPOUcode);
            if(codeEDRPOU_fromPage === ``){
                await console.log('\x1b[38;5;1m\t', `!!! Warning -> ЕДРПОУ/ИНН на странице пустое (${codeEDRPOU_fromPage}) <- Warning !!!`, '\x1b[0m');
            }else if( codeEDRPOU_fromPage !== this.CompanyData.strCompanyCode ){
                await console.log('\x1b[38;5;1m\t', `!!! Warning -> ЕДРПОУ/ИНН на странице (${codeEDRPOU_fromPage})!==(${this.CompanyData.strCompanyCode}) Введённому коду при создании <- Warning !!!`, '\x1b[0m');
            }
            // Проверка, что нет спиннера на форме компании
            // resOk = await WaitUntilXPathExist(this.page, 5000, this.xCompanyFormSpinner);
            // if (!resOk) {
            //     throw `FAIL => Проверка, что нет спиннера на форме компании(${this.xCompanyFormSpinner}))`;
            // }

            // Запишем Имя Компании
            this.CompanyData.strCompanyName = await ElementGetInnerText(this.page, 0, this.xHeaderCompanyName);
            if (this.CompanyData.strCompanyName === '') {
                await console.log('\x1b[38;5;1m\t', `!!! FAIL -> Имя Компании на странице пустое (${this.CompanyData.strCompanyName}) <- FAIL !!!`, '\x1b[0m');
                //await TempStop(this.page);
                await this.page.screenshot({path: g_PathSS + 'screenshot_strCompanyName.png', fullPage: true });
                throw `FAIL => Не вижу (Название Компании(ElementGetInnerText = "")) \n ${this.xHeaderCompanyName}`;
            }
            // Статус Компании
            this.CompanyData.strStatusCompany = await ElementGetInnerText(this.page, 0, this.xStatusCompany);
            if (this.CompanyData.strStatusCompany === '') {
                await console.log('\x1b[38;5;1m\t', `!!! FAIL -> Статус Компании на странице пустой (${this.CompanyData.strStatusCompany}) <- FAIL !!!`, '\x1b[0m');
                throw `FAIL => Статус Компании(ElementGetInnerText = "")`;
            }
            // Выведем Название и Статус Компании
            await console.log('\x1b[38;5;2m\t', `Компания:(${this.CompanyData.strCompanyName}) `,
                                                `ID:(${this.CompanyData.strCompanyID}) `,
                                                `ЕДРПОУ:(${this.CompanyData.strCompanyCode}) `,
                                                `Статус:(${this.CompanyData.strStatusCompany}) - OK !`, '\x1b[0m');
            //g_StrOutLog += `=> \n     Компания:(${this.CompanyData.strCompanyName}) | Статус:(${this.CompanyData.strStatusCompany}) \n`;


//await TempStop(this.page);
            // Проверка наличия Плашки о плохом статусе
            if (this.CompanyData.strStatusCompany !== 'зареєстровано' && this.CompanyData.strStatusCompany !== ''){
                //Плашка о плохом статусе
                resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xBoxBadStatusCompany);
                if (!resOk) {
                    throw `FAIL => Не вижу Плашки "Редактирование карточки Компании запрещено ее статус не равен"`;
                }
                throw `Warning!!! => Попалась Компания со Статусом "${this.CompanyData.strStatusCompany}"`;
            }

            // Плашка блокировки одновременного редактирования Кнопка "Кикнуть первого"
            elPresent = await WaitForElementIsPresentByXPath(0, this.page, this.xBlockButtonKickFirst);
            let i= 10;
            while (elPresent && i>0) {

                await ClickByXPath(this.page, this.xBlockButtonKickFirst);

                await this.page.screenshot({path: g_PathSS + `screenshot_block${i}.png`, fullPage: true });
                i--;
                await WaitRender(this.page);
                await WaitRender(this.page);
                await WaitRender(this.page);
                elPresent = await WaitForElementIsPresentByXPath(0, this.page, this.xBlockButtonKickFirst);
                if (!elPresent) {
                    await WaitRender(this.page);
                    await WaitRender(this.page);
                    await WaitRender(this.page);
                }
            }
            await console.log('\x1b[38;5;2m\t',`OK => CheckCompanyForm`,'\x1b[0m');

        return true;

        }catch (e) {
            await console.log(`${e} \n FAIL in CheckCompanyForm`);
            return false;
        }
    }//async CheckCompanyForm()
    //------------------
    async AddNewCompanyTypes(){
        try{
            let xPath, resOk, tStr;
            let TypesCompPres = [false,false,false,false];
            //Проверяем заполнено ли поле тип компании
            //Типы Компании в шапке (после статуса)
            //проверяем по наличию на странице span(Заказчик, Перевозчик, Экспедитор, Контрагент ТО) class="multiselect__tag
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xTypesCompany);
            if (!resOk) {
                //await TempStop(page);
                throw `FAIL => Не вижу тега с типами компании (${this.xTypesCompany})`;
            }

            let StrAllTypesCompany = await ElementGetInnerText(this.page, 0, this.xTypesCompany);
            //if (StrAllTypesCompany !== '') {}
            TypesCompPres[0] = await SubStrIsPresent('Заказчик',      StrAllTypesCompany);
            TypesCompPres[1] = await SubStrIsPresent('Перевозчик',    StrAllTypesCompany);
            TypesCompPres[2] = await SubStrIsPresent('Экспедитор',    StrAllTypesCompany);
            TypesCompPres[3] = await SubStrIsPresent('Контрагент ТО', StrAllTypesCompany);

            //await console.log(`     (${TypesCompPres[0]}) | (${TypesCompPres[1]}) | (${TypesCompPres[2]}) | (${TypesCompPres[3]})`);
            //await TempStop(page);

            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xTypesCompanyArrowDown);
            if (!resOk) {
                //await TempStop(page);
                tStr = `\n FAIL => После нажатия на кнопку (ПРОВЕРИТЬ В БАЗЕ) не прогрузилась страница `;
                tStr+= `\n FAIL => Не вижу (${this.xTypesCompanyArrowDown})`;
                await console.log(tStr);
                throw tStr;//<--специальный вызов ошибки!
            }
            // Удаляем все типы Компании
            //await console.log(`StrAllTypesCompany[${StrAllTypesCompany}]`);
            let TypesCount = 0;
            for (let i = 0; i < 4; i++) {
                if (TypesCompPres[i]) {
                    TypesCount++;
                    //await console.log(`TypesCompPres[${i}]`);
                    resOk = await ClickByXPath(this.page, this.xTypesCompanyDel);
                    if (!resOk) {
                        await this.page.screenshot({path: g_PathSS + `screenshot_del_company_type.png`, fullPage: true });
                        await console.log(`FAIL => Del "Тип Компании" крестик`);
                        //await TempStop(this.page);
                        throw `FAIL => Del "Тип Компании" крестик (${this.xTypesCompanyDel})`;
                    }
                }
            }
            //await console.log(`     TypesCount=    (${TypesCount}) `);
            let xPathTypes;
            //await console.log(`     CompanyData.strCompanyTypes.length(${this.CompanyData.strCompanyTypes.length}) `);
            //Установим Тип Компании из CompanyData.strCompanyTypes
            for (let i = 0; i < this.CompanyData.strCompanyTypes.length; i++) {
                resOk = await ClickByXPath(this.page, this.xTypesCompanyArrowDown);
                if (!resOk){
                    throw `FAIL => Клик "Тип Компании" стрелка вниз (${i}) (${this.xTypesCompanyArrowDown})`;
                }
                // Дропдаун Типы Компании
                xPathTypes = `//span[contains(@class, "multiselect__option")]/span[contains(text(), "${this.CompanyData.strCompanyTypes[i]}")]`;
                resOk = await ClickByXPath(this.page, xPathTypes);
                if (!resOk) {
                    await this.page.screenshot({path: g_PathSS + 'screenshot_add_company_type.png', fullPage: true });
                    await console.log(`FAIL => Добавить "Тип Компании" (${xPathTypes}) `);
                    //await TempStop(page);
                    throw `FAIL => Добавить "Тип Компании" (${xPathTypes})`;
                }
            }
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddNewCompanyTypes`);
            return false;
        }
    }//async AddNewCompanyTypes()
    //------------------
    async CheckBossPresent(){ // Проверим наличие Директора
        try{
            let xPath, resOk;

            resOk = await ClickByXPath(this.page, this.ContactDataContacts);
            if (!resOk){
                throw `FAIL => Клик Контактные данные -> "Контакты"  (${this.ContactDataContacts})`;
            }
            //await WaitRender(this.page);
//Проверка открытия ТАБА Контакты
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTabContacts);
            if (!resOk){
                throw `FAIL => ТАБ Контакты  (${this.xTabContacts})`;
            }

            //Проверка наличия строки с типом Директор
            //Табличное редактирование, строка с типом Директор
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xStrTypeBoss);
            if (!resOk){
                throw `FAIL => в Таблице нет строки с Директором  (${this.xStrTypeBoss})`;
            }
            await WaitRender(this.page);
            // закроем таблицу
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk){
                throw `FAIL => Клик "закрыть таблицу Контакты"  (${this.xCloseTable})`;
            }
            await WaitRender(this.page);
            await console.log('\x1b[38;5;2m\t', `Проверка наличия Директора - OK !!!`, '\x1b[0m');
//await TempStop(this.page);

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in CheckBossPresent`);
            return false;
        }
    }//async CheckBossPresent()
    //------------------
    async CheckDocumentWriterPresent(){ // Проверим наличие Подписанта, если нет, то Создать
        try{
            let xPath, resOk;
            // Клик Контактные данные -> "Подписанты"
            resOk = await ClickByXPath(this.page, this.ContactDataDocumentWriter);
            if (!resOk){
                throw `FAIL => Клик Контактные данные -> "Подписанты"  (${this.ContactDataDocumentWriter})`;
            }
            //await WaitRender(this.page);
            //Проверка открытия ТАБА Подписанты
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTabDocumentWriters);
            if (!resOk){
                throw `FAIL => ТАБ Подписанты  (${this.xTabDocumentWriters})`;
            }
            await WaitRender(this.page);
            //Проверка наличия строк в таблице Подписантов
            //Табличное редактирование, строки ячейки ФИО Подписанта [Num]
            resOk = await WaitForElementIsPresentByXPath(1000 , this.page, this.xStrDocumentWriterFIO);
            if (resOk){ // Подписанты есть выведем их
                let tempLength = await ElementGetLength(this.page, this.xStrDocumentWriterFIO);
                let tempFIO;
                for (let Num = 0; Num < tempLength; Num++){
                    tempFIO = await ElementGetInnerText(this.page, Num, this.xStrDocumentWriterFIO);
                    await console.log('\x1b[38;5;2m\t', `Подписант (${tempFIO}) - ОК`, '\x1b[0m');
                }
            }else{ // Подписантов НЕТ Создадим Одного
                await console.log('\x1b[38;5;3m\t', `Warning ! -> в Таблице "Подписанты" пусто  - Warning !`, '\x1b[0m');
                resOk = await this.AddDocumentWriter();
                if (!resOk){
                    throw `FAIL => Не получилось Добавить Подписанта => this.AddDocumentWriter();)`;
                }
            }
            // закроем таблицу
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk){
                throw `FAIL => Клик "закрыть таблицу Подписанты"  (${this.xCloseTable})`;
            }
            await WaitRender(this.page);


            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in CheckDocumentWriterPresent`);
            return false;
        }
    }//async CheckDocumentWriterPresent()
    //------------------
    async AddDocumentWriter(){ // Добавить подписанта
        try{
            let xPath, resOk;

            // Табл редактирование Вкладка Подписанты Кнопка "+ Добавить Подписанты"
            resOk = await ClickByXPath(this.page, this.xButtonPlusDocumentWriters);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Табл редактирование Вкладка Подписанты Кнопка "+ Добавить Подписанты" ClickByXPath(${this.xButtonPlusDocumentWriters})`;
            }
            // Модалка "Добавить подписанта"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xModalAddDocumentWriter);
            if (!resOk){
                throw `FAIL => Модалка "Добавить подписанта" WaitForElementIsPresentByXPath(${this.xModalAddDocumentWriter})`;
            }
            // Селект "Добавить подписанта" Стрелка Вниз
            resOk = await ClickByXPathW(this.page, this.xDocumentWriterArrowDown);
            if (!resOk){
                throw `FAIL => Селект "Добавить подписанта" Стрелка Вниз ClickByXPathW(${this.xDocumentWriterArrowDown})`;
            }
            // "Добавить подписанта" Раскрытый ДропДаун
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDocumentWriterDropDownActive);
            if (!resOk){
                throw `FAIL => "Добавить подписанта" Раскрытый ДропДаун WaitForElementIsPresentByXPath(${this.xDocumentWriterDropDownActive})`;
            }
            // "Добавить подписанта" Раскрытый ДропДаун Строки [Num]
            resOk = await WaitForElementIsPresentByXPathNum(2000, 0, this.page, this.xDocumentWriterDropDownStrings);
            if (!resOk){
                throw `FAIL => "Добавить подписанта" Раскрытый ДропДаун WaitForElementIsPresentByXPathNum(${this.xDocumentWriterDropDownStrings})`;
            }
            let tempFIO = await ElementGetInnerText(this.page, 0, this.xDocumentWriterDropDownStrings);
            if (tempFIO === ``){
                throw `FAIL => ФИО Подписанта Пустое !!!`;
            }else {
                await console.log('\x1b[38;5;2m\t', `Выбран Подписант (${tempFIO}) - ОК`, '\x1b[0m');
            }
            // "Добавить подписанта" Раскрытый ДропДаун Строки [Num]
            resOk = await ClickByXPathWNum(this.page, 0,this.xDocumentWriterDropDownStrings);
            if (!resOk){
                throw `FAIL => Селект "Добавить подписанта" Стрелка Вниз ClickByXPathWNum(${this.xDocumentWriterDropDownStrings})`;
            }
            // "Добавить подписанта" Закрытый ДропДаун
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDocumentWriterDropDownClosed);
            if (!resOk){
                throw `FAIL => "Добавить подписанта" Раскрытый ДропДаун WaitForElementIsPresentByXPath(${this.xDocumentWriterDropDownClosed})`;
            }
            // Кнопка "Добавить подписанта" активная
            resOk = await ClickByXPathW(this.page, this.xButtonAddDocumentWriter);
            if (!resOk){
                throw `FAIL => Кнопка "Добавить подписанта" активная ClickByXPathW(${this.xButtonAddDocumentWriter})`;
            }
            await WaitRender(this.page);
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddDocumentWriter`);
            return false;
        }
    }//async AddDocumentWriter()
    //--------------------------------------------------------------------
    async CreateNewContactForLocation(ContactData){ // Создадим новый контакт, который будет добавлен в локацию
        try{
            let xPath, resOk;
            await WaitRender(this.page);
            // Контактные данные -> Контакты "Plus"
            resOk = await ClickByXPath(this.page, this.ContactDataContactsPlus);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Контактные данные -> Контакты "Plus" ClickByXPath(${this.ContactDataContactsPlus})`;
            }
            var {Contact} = require("../sub_objects/contact_obj.js");
            //this.CompanyData.LocationData1.ContactData.PhoneData.strPhoneNumber = `123456789`;
            let NewContact = new Contact(this.browser, this.page, ContactData);

            resOk = await NewContact.CreateNewContactFromCompanies();
            if (!resOk){
                throw `FAIL => NewContact.CreateNewContactFromCompanies`;
            }

            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in CreateNewContactForLocation`);
            return false;
        }
    }//async CreateNewContactForLocation()
    //--------------------------------------------------------------------
    async CreateNewDriverWithVehiclesFromCompanies(DriverData){ // Создадим нового Водилу с Транспортом
        try{
            let xPath, resOk, tempFIO, tempXPath, tempHref;
            if (DriverData.strContactType !== 'Водитель'){
               throw `FAIL => Ошибка данных! DriverData.strContactType(${DriverData.strContactType}) !== 'Водитель'`;
            }
            await WaitRender(this.page);
            // Контактные данные -> Контакты "Plus"
            resOk = await ClickByXPath(this.page, this.ContactDataContactsPlus);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Контактные данные -> Контакты "Plus" ClickByXPath(${this.ContactDataContactsPlus})`;
            }
            var {Contact} = require("../sub_objects/contact_obj.js");
            let NewContact = new Contact(this.browser, this.page, DriverData);

            resOk = await NewContact.CreateNewDriverWithVehicles();
            if (!resOk){
                throw `FAIL => NewContact.CreateNewDriverWithVehicles`;
            }

            await WaitRender(this.page);
            // Открыть Табл редактирование "Контакты"
            // Контактные данные -> Контакты
            resOk = await ClickByXPath(this.page, this.ContactDataContacts);
            if (!resOk){
                throw `FAIL => Контактные данные -> Открыть Табл редактирование "Контакты" ClickByXPath(${this.ContactDataContacts})`;
            }
            //Проверка открытия ТАБА Контакты
            resOk = await WaitForElementIsPresentByXPath(3000, this.page, this.xTabContacts);
            if(!resOk){
                throw `FAIL => Проверка открытия ТАБА Контакты WaitForElementIsPresentByXPath(${this.xTabContacts})`;
            }

            DriverData.strFIO = DriverData.strLastName + ` ` + DriverData.strFirstName + ` ` + DriverData.strMiddleName;

            // Строки с ФИО и Линками + [contains(text(), "ФИО")] , @href=???

            tempXPath = this.xStringsFIOandLinks + `[contains(text(), "${DriverData.strFIO}")]`;
            resOk = await WaitForElementIsPresentByXPath(3000, this.page, tempXPath);
            if(!resOk){
                await console.log('\x1b[38;5;1m\t', `Не вижу строки в табличном редактировании (${tempXPath}) - FAIL !!!`, '\x1b[0m');
            }
            tempHref = await ElementGetHref(this.page, 0, tempXPath);
            if(tempHref===``){
                await console.log('\x1b[38;5;1m\t', `Линк на Контакт Водителя (${tempXPath}) - FAIL !!!`, '\x1b[0m');
                DriverData.strContactID = `_FAIL__FAIL__FAIL_`;
            }else{
                await console.log('\x1b[38;5;2m\t', `Линк на Контакт Водителя (${tempHref}) - OK`, '\x1b[0m');
                DriverData.strContactID = await GetIDFromHref(tempHref);
            }
            await WaitRender(this.page);
            // Закрыть Табл редактирование
            // Закрыть Таблицу табличное редактирование
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk){
                throw `FAIL => Контактные данные -> Закрыть Табл редактирование "Контакты" ClickByXPath(${this.xCloseTable})`;
            }
            await WaitRender(this.page);





            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in CreateNewDriverWithVehiclesFromCompanies`);
            return false;
        }
    }//async CreateNewDriverWithVehiclesFromCompanies()
    //------------------
    async AddNewCargoTypes(){
        try{
            let resOk;
            resOk = await this.OpenModalTableCargoTypes();
            if (!resOk){
                throw `FAIL => OpenModalTableCargoTypes`;
            }

            resOk = await this.OnlyDeleteAllPresentCargoTypes();
            if (!resOk){
                throw `FAIL => OnlyDeleteAllPresentCargoTypes`;
            }

            resOk = await this.AddOneCargoType();
            if (!resOk){
                throw `FAIL => AddOneCargoType`;
            }

            resOk = await this.CloseModalTableCargoTypes();
            if (!resOk){
                throw `FAIL => CloseModalTableCargoTypes`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddNewCargoTypes`);
            return false;
        }
    }//async AddNewCargoTypes()
    //------------------
    async OpenModalTableCargoTypes(){
        try{
            let resOk,xPath;
            // Контактные данные ->Типы грузов
            resOk = await ClickByXPath(this.page, this.xContactDataCargoTypes);
            if (!resOk){
                throw `FAIL => Клик Контактные данные ->"Типы грузов"  (${this.xContactDataCargoTypes})`;
            }
            //await WaitRender(this.page);

            //Проверка открытия ТАБА  Типы грузов
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTabCargoTypes);
            if (!resOk){
                throw `FAIL => ТАБ Типы грузов  WaitForElementIsPresentByXPath (${this.xTabCargoTypes})`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in OpenModalTableCargoTypes`);
            return false;
        }
    }//async OpenModalTableCargoTypes()
    //------------------
    async OnlyDeleteAllPresentCargoTypes(){
        try{
            let xPath,resOk, QElem;
            await WaitRender(this.page);
            // Типы Грузов Корзина Удалить Сколько Штук
            QElem = await ElementGetLength(this.page, this.xDelCargoTypes);
            //await console.log(`DeleteAllPresentCargoTypes QElem = ${QElem}`);
            if (QElem<=0) {
                //await console.log(`XXX DeleteAllPresentCargoTypes QElem = ${QElem}`);
                //await TempStop(page);
            }
            while(QElem>0) {
                // Типы Грузов Корзина Удалить
                //await console.log(` OnlyDeleteAllPresentCargoTypes ${QElem}`);
                g_strDialogInitiator = `Удаление Типа груза`;
                resOk = await ClickByXPathNum(this.page, 0, this.xDelCargoTypes);
                if (!resOk) {
                    //await console.log(` DeleteAllPresentCargoTypes`);
                    //await TempStop(page);

                    throw `FAIL => Клик по корзине OnlyDeleteAllPresentCargoTypes (${this.xDelCargoTypes})`;
                }
                await WaitRender(this.page);
                QElem = await ElementGetLength(this.page, this.xDelCargoTypes);
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in OnlyDeleteAllPresentCargoTypes`);
            return false;
        }
    }//async OnlyDeleteAllPresentCargoTypes()
    //------------------
    async DeleteAllPresentCargoTypes(){
        try{
            let resOk;
            resOk = await this.OpenModalTableCargoTypes();
            if (!resOk){
                throw `FAIL => OpenModalTableCargoTypes`;
            }

            resOk = await this.OnlyDeleteAllPresentCargoTypes();
            if (!resOk){
                throw `FAIL => OnlyDeleteAllPresentCargoTypes`;
            }

            resOk = await this.CloseModalTableCargoTypes();
            if (!resOk){
                throw `FAIL => CloseModalTableCargoTypes`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in DeleteAllPresentCargoTypes`);
            return false;
        }
    }//async DeleteAllPresentCargoTypes()
    //------------------
    async AddOneCargoType(){
        try{
            let xPath,resOk;
            await WaitRender(this.page);
            // Клик по кнопке +Типы грузов
            // Табл редактирование Вкладка Типы Грузов Кнопка "+ Добавить Типы грузов"
            resOk = await WaitForElementIsPresentByXPath(5000 , this.page, this.xPlusCargoType);
            if (!resOk){
                throw `FAIL => Табл редактирование Вкладка Типы Грузов Кнопка "+ Добавить Типы грузов"(${this.xPlusCargoType})`;
            }

            resOk = await ClickByXPath(this.page, this.xPlusCargoType);
            if (!resOk){
                throw `FAIL => Клик по кнопке "+Типы грузов"  (${this.xPlusCargoType})`;
            }
            // мы на модалке Тип груза
            await WaitRender(this.page);
            //проверим заголовок
            // Заголовок Модалки Тип Груза
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTitleModalCargoType);
            if (!resOk){
                throw `FAIL => Заголовок Модалки Тип Груза(${this.xTitleModalCargoType})`;
            }
            // //Модалка инпут "Тип груза"
            // resOk = await ClickByXPath(this.page, this.xMultiSelectCargoType);
            // if (!resOk){
            //     throw `FAIL => Модалка инпут "Тип груза" ClickByXPath(${this.xMultiSelectCargoType})`;
            // }
            // // Ждём пока откроется
            // // Дропдаун "Тип груза" Активный
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownCargoTypeActive);
            // if (!resOk){
            //     throw `FAIL => Дропдаун "Тип груза" Активный WaitForElementIsPresentByXPath(${this.xDropDownCargoTypeActive})`;
            // }
            // //await WaitRender(this.page);
            // resOk = await SetTextByXPath(this.page,this.xInputCargoType,this.CompanyData.strCargoType);
            // if (!resOk){
            //     throw `FAIL => Модалка инпут "Тип груза" SetTextByXPath(${this.xInputCargoType})`;
            // }
            // // Модалка инпут Тип груза в ДропДауне Нужная Строка
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownCargoTypeNeedStr);
            // if (!resOk){
            //     throw `FAIL => Модалка инпут Тип груза в ДропДауне Нужная Строка WaitForElementIsPresentByXPath(${this.xDropDownCargoTypeNeedStr})`;
            // }
            // // Модалка инпут Тип груза в ДропДауне Нужная Строка
            // //await WaitRender(this.page);
            // resOk = await ClickByXPath(this.page, this.xDropDownCargoTypeNeedStr);
            // if (!resOk){
            //     await this.page.screenshot({path: g_PathSS + `screenshot_cargo_type_dropdown.png`, fullPage: true });
            //     throw `FAIL => Модалка инпут Тип груза в ДропДауне Нужная Строка ClickByXPath(${this.xDropDownCargoTypeNeedStr})`;
            // }
            // // Ждём пока закроется
            // // Дропдаун "Тип груза" Закрытый
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownCargoTypeClosed);
            // if (!resOk){
            //     throw `FAIL => Дропдаун "Тип груза" Закрытый WaitForElementIsPresentByXPath(${this.xDropDownCargoTypeClosed})`;
            // }
            // //await WaitRender(this.page);

            const {MultiSelect} = require("../sub_objects/drop_down_obj.js");
            //(browser, page, xForward ,LegendText, Required, NeedStr)
            let CargoType = new MultiSelect(this.browser, this.page, ``, `Тип груза`, true, this.CompanyData.strCargoType);
            resOk = await CargoType.SetData();
            if (!resOk) {
                throw 'FAIL => CargoType.SetData(); = FAIL!"';//<--специальный вызов ошибки!
            }
            // Модалка Тип Груза инпут "Цена"
            // SetTextByXPath
            // TypeByXPath
            resOk = await SetTextByXPath(this.page, this.xPriceCargoType, this.CompanyData.strCargoCost);
            if (!resOk){
                throw `FAIL => TypeByXPath "Цена"  (${this.xPriceCargoType})`;
            }
            // Модалка Тип Груза галочка "Установить по умолчанию"
            resOk = await ClickByXPath(this.page, this.xDefoltCargoType);
            if (!resOk){
                throw `FAIL => ClickByXPath "Установить по умолчанию"  (${this.xDefoltCargoType})`;
            }
            //  Модалка Тип Груза Тип транспорта
            // resOk = await ClickByXPath(this.page, this.xInputVehicleType);
            // if (!resOk){
            //     throw `FAIL => Клик "Тип транспорта"  (${this.xInputVehicleType})`;
            // }
            // resOk = await TypeByXPath(this.page, this.xInputVehicleType, this.CompanyData.strCargoVehicleType);
            // if (!resOk){
            //     throw `FAIL => TypeByXPath "Тип транспорта"  (${this.xInputVehicleType})`;
            // }
            // // Модалка Тип груза выбор в ДропДауне Тип транспорта
            // resOk = await ClickByXPath(this.page, this.xDropDownVehicleType);
            // if (!resOk){
            //     throw `FAIL => Клик "Выбор в дропдауне"(${this.CompanyData.strCargoVehicleType})  (${this.xDropDownVehicleType})`;
            // }
            //(browser, page, xForward ,LegendText, Required, NeedStr)
            let VehicleType = new MultiSelect(this.browser, this.page, ``, `Тип транспорта`, false, this.CompanyData.strCargoVehicleType);
            resOk = await VehicleType.SetData();
            if (!resOk) {
                throw 'FAIL => VehicleType.SetData(); = FAIL!"';//<--специальный вызов ошибки!
            }
            // Модалка Тип груза Тоннаж От / До
            resOk = await TypeByXPath(this.page,this.xCargoWeight0 ,this.CompanyData.strCargoVehicleCapacity0);
            if (!resOk){
                throw `FAIL => Модалка Тип груза TypeByXPath "Тоннаж От"  (${this.xCargoWeight0})`;
            }
            resOk = await TypeByXPath(this.page,this.xCargoWeight1,this.CompanyData.strCargoVehicleCapacity1);
            if (!resOk){
                throw `FAIL => TypeByXPath "Тоннаж До"  (${this.xCargoWeight1})`;
            }
            // Модалка Тип груза Объем От / До
            resOk = await TypeByXPath(this.page, this.xCargoVolume0, this.CompanyData.strCargoVehicleVolume0);
            if (!resOk){
                throw `FAIL => TypeByXPath "Объем От"  (${this.xCargoVolume0})`;
            }
            resOk = await TypeByXPath(this.page, this.xCargoVolume1, this.CompanyData.strCargoVehicleVolume1);
            if (!resOk){
                throw `FAIL => TypeByXPath "Объем До"  (${this.xCargoVolume1})`;
            }
            // Модалка Тип груза Тип Загрузки
            for(let i=0 ; i<this.CompanyData.strCargoLoadingTypes.length; i++ ) {
                xPath = `//fieldset[legend[contains(text(),"Тип загрузки")]]//button[@type="button"][span[contains(text(), "${this.CompanyData.strCargoLoadingTypes[i]}")]]`;
                resOk = await ClickByXPath(this.page, xPath);
                if (!resOk) {
                    throw `FAIL => Клик "Тип Загрузки"(${this.CompanyData.strCargoLoadingTypes[i]})  (${xPath})`;
                }
            }
            // Модалка Тип груза Кнопка Сохранить
            resOk = await ClickByXPath(this.page, this.xSaveCargoType);
            if (!resOk) {
                throw `FAIL => Модалка Тип груза Кнопка "Сохранить" (${this.xSaveCargoType})`;
            }
            await WaitRender(this.page);

            await console.log('\x1b[38;5;2m\t', `Добавление Тип груза (${this.CompanyData.strCargoType}) - OK !`, '\x1b[0m');
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddOneCargoType`);
            return false;
        }
    }//async AddOneCargoType()
    //------------------
    async CloseModalTableCargoTypes(){
        try{
            let resOk;
            //Закрываем Модалку Таблицы
            await WaitRender(this.page);
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk) {
                throw `FAIL => Клик Закрываем Модалку Таблицы (${this.xCloseTable})`;
            }
            await WaitRender(this.page);
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in CloseModalTableCargoTypes`);
            return false;
        }
    }//async CloseModalTableCargoTypes()
    //------------------
    async AddNewPhoneNumber(){
        try{let resOk;

            var {Phone} = require("../sub_objects/phone_odj.js");
            //app/tests_modules/sub_objects/phone_odj.js
            let NewPhone = new Phone( this.page , this.CompanyData.PhoneData);
            resOk = await NewPhone.clickPhone();
            if (!resOk){
                throw `FAIL => clickPhone`;
            }
            resOk = await NewPhone.clickPlusPhoneInTable();
            if (!resOk){
                throw `FAIL => clickPlusPhoneInTable`;
            }
            resOk = await NewPhone.EnterPhoneDataInModalAndSave();
            if (!resOk){
                throw `FAIL => EnterPhoneDataInModalAndSave`;
            }
            resOk = await NewPhone.clickClosePhoneTable();
            if (!resOk){
                throw `FAIL => clickClosePhoneTable`;
            }
            await console.log('\x1b[38;5;2m\t', `Добавление Телефона (${this.CompanyData.PhoneData.strPhoneNumber}) - OK !`, '\x1b[0m');
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddNewPhoneNumber`);
            return false;
        }
    }//async AddNewPhoneNumber()
    //------------------
    async AddNewEmail(){
        try{let resOk;

            var {Email} = require("../sub_objects/email_obj.js");
            //app/tests_modules/sub_objects/email_obj.js
            let NewEmail = new Email( this.page , this.CompanyData.EmailData);
            resOk = await NewEmail.clickEmail();
            if (!resOk){
                throw `FAIL => clickEmail`;
            }
            resOk = await NewEmail.clickPlusEmailInTable();
            if (!resOk){
                throw `FAIL => clickPlusEmailInTable`;
            }
            resOk = await NewEmail.EnterEmailDataInModalAndSave();
            if (!resOk){
                throw `FAIL => EnterEmailDataInModalAndSave`;
            }
            resOk = await NewEmail.clickCloseEmailTable();
            if (!resOk){
                throw `FAIL => clickCloseEmailTable`;
            }
            await console.log('\x1b[38;5;2m\t', `Добавление Email (${this.CompanyData.EmailData.strEmail}) - OK !`, '\x1b[0m');
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddNewEmail`);
            return false;
        }
    }//async AddNewEmail()
     //------------------
    async AddNewLink(){
        try{let resOk;

            var {Link} = require("../sub_objects/link_obj.js");
            //app/tests_modules/sub_objects/link_obj.js
            let NewLink = new Link( this.page , this.CompanyData.LinkData);
            resOk = await NewLink.clickLink();
            if (!resOk){
                throw `FAIL => clickLink`;
            }
            resOk = await NewLink.clickPlusLinkInTable();
            if (!resOk){
                throw `FAIL => clickPlusLinkInTable`;
            }
            resOk = await NewLink.EnterLinkDataInModalAndSave();
            if (!resOk){
                throw `FAIL => EnterLinkDataInModalAndSave`;
            }
            resOk = await NewLink.clickCloseLinkTable();
            if (!resOk){
                throw `FAIL => clickCloseLinkTable`;
            }
            await console.log('\x1b[38;5;2m\t', `Добавление Ссылки (${this.CompanyData.LinkData.strLink}) - OK !`, '\x1b[0m');
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddNewLink`);
            return false;
        }
    }//async AddNewLink()
    //------------------
    async AddNewContract(){
        try{let resOk;

            var {Contract} = require("../sub_objects/contract_obj.js");
            let NewContract = new Contract( this.page , this.CompanyData.ContractData);
            resOk = await NewContract.clickContract();
            if (!resOk){
                throw `FAIL => clickContract`;
            }
            resOk = await NewContract.deleteAllContracts();
            if (!resOk){
                throw `FAIL => deleteAllContracts`;
            }
            resOk = await NewContract.AddNewContract();
            if (!resOk){
                throw `FAIL => AddNewContract`;
            }
            resOk = await NewContract.clickCloseContractTable();
            if (!resOk){
                throw `FAIL => clickCloseContractTable`;
            }
            await console.log('\x1b[38;5;2m\t', `Создание Договора (${this.CompanyData.ContractData.strContractOurCompany}) - OK !`, '\x1b[0m');
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddNewContract`);
            return false;
        }
    }//async AddNewContract()
    //------------------
    async EditExistsContractAddOriginal(strNumContract){
        try{let resOk; let numPos;

            var {Contract} = require("../sub_objects/contract_obj.js");
            let NewContract = new Contract( this.page , this.CompanyData.ContractData);
            resOk = await NewContract.clickContract();
            if (!resOk){
                throw `FAIL => clickContract`;
            }
            numPos = await NewContract.findContract(strNumContract);
            if (numPos === -1){
                throw `FAIL => findContract(${strNumContract})`;
            }
            resOk = await NewContract.openContract(numPos);
            if (!resOk){
                throw `FAIL => openContract(${numPos})`;
            }

            resOk = await NewContract.EditContractAddOriginalAndSave();
            if (!resOk){
                throw `FAIL => EditContractAddOriginalAndSave()`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in EditExistsContractAddOriginal`);
            return false;
        }
    }//async EditExistsContractAddOriginal()
    //------------------
    async AddNewLocation(LocationData){
        try{
            let resOk;
            let RetRes = true;

            var {Location} = require("../sub_objects/location_obj.js");
            // this.CompanyData.LocationData1.strCompanyName = this.CompanyData.strCompanyName;
            // this.CompanyData.LocationData1.strCompanyCode = this.CompanyData.strCompanyCode;
            //
            // this.CompanyData.LocationData1.ContactData.strWorkOnCompany = this.CompanyData.strCompanyName;
            // this.CompanyData.LocationData1.ContactData.strWorkOnCompanyEDRPOU = this.CompanyData.strCompanyCode;

            let NewLocation = new Location(this.browser, this.page , LocationData);
            resOk = await NewLocation.clickLocation();
            if (!resOk){
                throw `FAIL => NewLocation.clickLocation`;
            }

            resOk = await NewLocation.clickGoToTableLocations();
            if (!resOk){
                throw `FAIL => NewLocation.clickGoToTableLocations`;
            }

            resOk = await NewLocation.clickMenuLocationsPlus();
            if (!resOk){
                throw `FAIL => NewLocation.clickMenuLocationsPlus`;
            }

            resOk = await NewLocation.EnterNewDataInLocation();
            if (!resOk){
                RetRes = false;
                await console.log('\x1b[38;5;1m\t', `NewLocation.EnterNewDataInLocation(); - FAIL !!!`, '\x1b[0m');
                //throw `FAIL => NewLocation.EnterNewDataInLocation`;
            }

            resOk = await NewLocation.clickSaveLocation();
            if (!resOk){
                RetRes = false;
                await console.log('\x1b[38;5;1m\t', `NewLocation.clickSaveLocation(); - FAIL !!!`, '\x1b[0m');
                //throw `FAIL => NewLocation.clickSaveLocation`;
            }

            // await console.log(`clickMenuLocationsPlus`);
            // await TempStop(this.page);


            resOk = await NewLocation.clickCloseLocationTable();
            if (!resOk){
                throw `FAIL => NewLocation.clickCloseLocationTable`;
            }
            return RetRes;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddNewLocation`);
            return false;
        }
    }//async AddNewLocation()
    //------------------------------------------------------------------------------------
    async AddExistsLocation(){
        try{let resOk;

            var {Location} = require("../sub_objects/location_obj.js");
            this.CompanyData.LocationData2.strCompanyName = this.CompanyData.strCompanyName;
            this.CompanyData.LocationData2.strCompanyCode = this.CompanyData.strCompanyCode;

            this.CompanyData.LocationData2.ContactData.strWorkOnCompany = this.CompanyData.strCompanyName;
            this.CompanyData.LocationData2.ContactData.strWorkOnCompanyEDRPOU = this.CompanyData.strCompanyCode;

            let NewLocation = new Location(this.browser, this.page , this.CompanyData.LocationData2);
            resOk = await NewLocation.clickLocation();
            if (!resOk){
                throw `FAIL => NewLocation.clickLocation`;
            }

            resOk = await NewLocation.deleteAllLocations();
            if (!resOk){
                throw `FAIL => NewLocation.deleteAllLocations`;
            }

            resOk = await NewLocation.clickPlusAddLocations();
            if (!resOk){
                throw `FAIL => NewLocation.clickPlusAddLocations`;
            }

            this.CompanyData.LocationData2.strAddressFOX = `Херсон`;
            resOk = await NewLocation.EnterExistsAddressAndPressAdd();
            if (!resOk){
                throw `FAIL => NewLocation.EnterExistsAddressAndPressAdd`;
            }
            // NewLocation.pageTableLocations = this.page;
            resOk = await NewLocation.EnterDataInExistsLocation();
            if (!resOk){
                throw `FAIL => NewLocation.EnterDataInExistsLocation`;
            }

            resOk = await NewLocation.clickSaveLocation();
            if (!resOk){
                throw `FAIL => NewLocation.clickSaveLocation`;
            }




            resOk = await NewLocation.clickCloseLocationTable();
            if (!resOk){
                throw `FAIL => NewLocation.clickCloseLocationTable`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in AddExistsLocation`);
            return false;
        }
    }//async AddExistsLocation()

//------------------------------------------------------------------------------------
    async CheckCompanyTypeF(strCT = '') {
        try {
            return await this.CompanyData.strCompanyTypes.forEach(async(element) => {
                await console.log(`element=(${element})`);
                if (element === strCT) {
                    return true;
                }else{
                    return false;
                }
            });

        } catch (e) {
            await console.log(`${e} \n FAIL in CheckCompanyType`);
            return false;
        }
    }//async CheckCompanyTypeF()
    //------------------------------------------------------------------------------------
    async CheckCompanyType(strCT = '') {
        let L = 0;
        try {
            L = this.CompanyData.strCompanyTypes.length;
            for (let i= 0 ; i < L; i++){
                //await console.log(`ХЕР_element=(${this.CompanyData.strCompanyTypes[i]})`);
                if (this.CompanyData.strCompanyTypes[i] === strCT) {
                    return true;
                }
                return false;
            }
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckCompanyType`);
            return false;
        }
    }//async CheckCompanyType()
    //------------------------------------------------------------------------------------
    async TemplateTemp(){
        try{let resOk;

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp`);
            return false;
        }
    }//async TemplateTemp()

    //------------------------------------------------------------------------------------

}

module.exports = {Company};
