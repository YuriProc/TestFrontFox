//'use strict';
class Company{
    constructor(browser, page , CompanyData) {
        this.browser = browser;
        this.page = page;
        this.CompanyData = CompanyData;
        // Верхнее меню "Компания +"
        this.xMenuCompanyPlus = `//a[@href="/crm/company"][@class="info__add"]`;
        // Тайтл "Создание компании"
        this.xTitleCompanyCrteate = '//h3[@class="crm-view__title"][contains(text(), "Создание компании")]';
        // Инпут "Введите ЕДРПОУ/ИНН"
        this.xInputINN = '//input[@type="number"][@placeholder="Введите ЕДРПОУ/ИНН"]';
        // Кнопка "Проверить в базе"
        this.xButtonCheckInBase = `//button[@type="submit"][contains(text(), "Проверить в базе")]`;
        // Хеадер "Данные о компании"
        this.xHeaderDataCompany = `//h5[contains(text(), "Данные о компании")]`;
        // Хеадер "Контактные данные"
        this.xHeaderDataContacts = `//h5[contains(text(), "Контактные данные")]`;
        // Хеадер "Имя Компании"
        this.xHeaderCompanyName = `//div[@class="company-head-info"]/..//div[@class="company-heading"]`;
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
        this.ContactDataContacts = `//div[@class="relations__item"]/label[contains(text(),"Контакты")]`;
        //Проверка открытия ТАБА Контакты
        this.xTabContacts = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Контакты")]`;
        //Табличное редактирование, строка с типом Директор
        this.xStrTypeBoss = `//tr[@role="row"]/td[@aria-colindex="3"][@role="cell"][contains(text(), "Директор")]`;
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
        this.xPlusCargoType = `//div[@class="tab-pane active"]/div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xPlusCargoType+= `/button[@type="button"][contains(text(), "Добавить Типы грузов")]`;
        // Заголовок Модалки Тип Груза
        this.xTitleModalCargoType = `//h5[@class="modal-title"][contains(text(), "Тип груза")]`;
        //Модалка инпут Тип груза
        this.xInputCargoType = `//fieldset[legend[contains(text(),"Тип груза")][span[@class="required"]]]`;
        this.xInputCargoType+=`//div[@class="multiselect__tags"]`;
        // Модалка инпут Тип груза выбор в ДропДауне
        this.xDropDownCargoType =`//li[@class="multiselect__element"]/span[@class="multiselect__option multiselect__option--highlight"]`;
        this.xDropDownCargoType+=`/span[contains(text(), "${this.CompanyData.strCargoType}")]`;
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

            //await WaitRender(this.page);
            // Верхнее меню "Компания +"
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
            resOk = await SetInputByXPath(this.page, this.xInputINN, this.CompanyData.strCodeCompany);
            if (!resOk) {
                throw `FAIL => Вводим код ЕДРПОУ SetInputByXPath (${this.xInputINN})`;
            }
            // Жмём Кнопка "Проверить в базе"
            resOk = await ClickByXPath(this.page, this.xButtonCheckInBase);
            if (!resOk) {
                throw `FAIL => Жмём Кнопка "Проверить в базе" ClickByXPath(${this.xButtonCheckInBase})`;
            }
            //Ждём загрузки страницы
            await WaitRender(this.page);
            //----------------------------

// проверим Вывод ошибки

            strInnerText = await WarningCheck(this.page);
            if (strInnerText!==''){
                let strAlreadyCreated = "Данная компания уже создана!";
                let strNotCorrect = "Вы ввели некоректный ЕДРПОУ компании!";
                let strNotFind = "Данные не найдены!";
                let strErrorActivity = "Trying to get property 'activities' of non-object";
                switch (strInnerText) {
                    case strNotCorrect:
                    case strNotFind:
                    case strErrorActivity:
                        await console.log('\x1b[38;5;1m', "    FAIL => strErrorActivity => ", strInnerText, '\x1b[0m');
                        g_StrOutLog += `=> FAIL =>${strInnerText} \n`;
                        this.CompanyData.returnResult = false;

                        throw `FAIL => Проверить в базе => ${strInnerText}`;//<--специальный вызов ошибки!
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

            return true;
        }catch (e) {

            await console.log(`FAIL in ClickCompanyCreateNewPlus ${e} \n`);
            return false;
        }
    }
    //-------------------
    async CheckCompanyForm(){
        try{
            let resOk;
            await WaitRender(this.page);
            await WaitRender(this.page);

            // Хеадер "Данные о компании"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xHeaderDataCompany);
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
            // Запишем Имя Компании
            this.CompanyData.strCompanyName = await ElementGetInnerText(this.page, 0, this.xHeaderCompanyName);
            if (this.CompanyData.strCompanyName === '') {
                await console.log(`ElementGetInnerText = ""`);
                //await TempStop(this.page);
                throw `FAIL => Не вижу (Название Компании(ElementGetInnerText = "")) \n ${this.xHeaderCompanyName}`;
            }
            // Статус Компании
            this.CompanyData.strStatusCompany = await ElementGetInnerText(this.page, 0, this.xStatusCompany);
            if (this.CompanyData.strStatusCompany === '') {
                throw `FAIL => Статус Компании(ElementGetInnerText = "")`;
            }
            // Выведем Название и Статус Компании
            //await console.log(`     Компания:(${this.CompanyData.strCompanyName}) | Статус:(${this.CompanyData.strStatusCompany})`);
            //g_StrOutLog += `=> \n     Компания:(${this.CompanyData.strCompanyName}) | Статус:(${this.CompanyData.strStatusCompany}) \n`;


            // Проверка наличия Плашки о плохом статусе
            if (this.CompanyData.strStatusCompany !== 'зареєстровано' && this.CompanyData.strStatusCompany !== ''){
                //Плашка о плохом статусе
                resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xBoxBadStatusCompany);
                if (!resOk) {
                    throw `FAIL => Не вижу Плашки "Редактирование карточки Компании запрещено ее статус не равен"`;
                }
                throw `Warning!!! => Попалась Компания со Статусом "${this.CompanyData.strStatusCompany}"`;
            }

        return true;

        }catch (e) {
            await console.log(`FAIL in CheckCompanyForm ${e} \n`);
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
            let TypesCount = 0;
            for (let i = 0; i < 4; i++) {
                if (TypesCompPres[i]) {
                    TypesCount++;
                    resOk = await ClickByXPath(this.page, this.xTypesCompanyDel);
                    if (!resOk) {
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
                    await console.log(`FAIL => Добавить "Тип Компании" (${xPathTypes}) `);
                    //await TempStop(page);
                    throw `FAIL => Добавить "Тип Компании" (${xPathTypes})`;
                }
            }
            return true;
        }catch (e) {
            await console.log(`FAIL in AddNewCompanyTypes ${e} \n`);
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
            await WaitRender(this.page);
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
            // закроем таблицу
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk){
                throw `FAIL => Клик "закрыть таблицу Контакты"  (${this.xCloseTable})`;
            }
            await WaitRender(this.page);


            return true;
        }catch (e) {
            await console.log(`FAIL in CheckBossPresent ${e} \n`);
            return false;
        }
    }//async CheckBossPresent()
    //------------------
    async AddNewCargoTypes(){
        try{
            let resOk;
            resOk = await this.OpenModalTableCargoTypes();
            if (!resOk){
                throw `FAIL => OpenModalTableCargoTypes`;
            }

            resOk = await this.DeleteAllPresentCargoTypes();
            if (!resOk){
                throw `FAIL => DeleteAllPresentCargoTypes`;
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
            await console.log(`FAIL in AddNewCargoTypes ${e} \n`);
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
            await WaitRender(this.page);

            //Проверка открытия ТАБА  Типы грузов
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTabCargoTypes);
            if (!resOk){
                throw `FAIL => ТАБ Типы грузов  WaitForElementIsPresentByXPath (${this.xTabCargoTypes})`;
            }

            return true;
        }catch (e) {
            await console.log(`FAIL in OpenModalTableCargoTypes ${e} \n`);
            return false;
        }
    }//async OpenModalTableCargoTypes()
    //------------------
    async DeleteAllPresentCargoTypes(){
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
                resOk = await ClickByXPathNum(this.page, 0, this.xDelCargoTypes);
                if (!resOk) {
                    //await console.log(`сука бля DeleteAllPresentCargoTypes`);
                    //await TempStop(page);

                    throw `FAIL => Клик по корзине DeleteAllPresentCargoTypes (${this.xDelCargoTypes})`;
                }
                await WaitRender(this.page);
                QElem = await ElementGetLength(this.page, this.xDelCargoTypes);
            }

            return true;
        }catch (e) {
            await console.log(`FAIL in DeleteAllPresentCargoTypes ${e} \n`);
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
            //Модалка инпут Тип груза
            resOk = await ClickByXPath(this.page, this.xInputCargoType);
            if (!resOk){
                throw `FAIL => Клик "Типы грузов"  (${this.xInputCargoType})`;
            }
            await WaitRender(this.page);
            resOk = await TypeByXPath(this.page,this.xInputCargoType,this.CompanyData.strCargoType);
            if (!resOk){
                throw `FAIL => Модалка инпут Тип груза TypeByXPath(${this.xInputCargoType})`;
            }
            // Модалка инпут Тип груза выбор в ДропДауне
            await WaitRender(this.page);
            resOk = await ClickByXPath(this.page, this.xDropDownCargoType);
            if (!resOk){
                throw `FAIL => Модалка инпут Тип груза Клик "Выбор в дропдауне"  (${this.xDropDownCargoType})`;
            }
            // Модалка Тип Груза инпут "Цена"
            resOk = await TypeByXPath(this.page, this.xPriceCargoType, this.CompanyData.strCargoPrice);
            if (!resOk){
                throw `FAIL => TypeByXPath "Цена"  (${this.xPriceCargoType})`;
            }
            // Модалка Тип Груза галочка "Установить по умолчанию"
            resOk = await ClickByXPath(this.page, this.xDefoltCargoType);
            if (!resOk){
                throw `FAIL => ClickByXPath "Установить по умолчанию"  (${this.xDefoltCargoType})`;
            }
            //  Модалка Тип Груза Тип транспорта
            resOk = await ClickByXPath(this.page, this.xInputVehicleType);
            if (!resOk){
                throw `FAIL => Клик "Тип транспорта"  (${this.xInputVehicleType})`;
            }
            resOk = await TypeByXPath(this.page, this.xInputVehicleType, this.CompanyData.strCargoVehicleType);
            if (!resOk){
                throw `FAIL => TypeByXPath "Тип транспорта"  (${this.xInputVehicleType})`;
            }
            // Модалка Тип груза выбор в ДропДауне Тип транспорта
            resOk = await ClickByXPath(this.page, this.xDropDownVehicleType);
            if (!resOk){
                throw `FAIL => Клик "Выбор в дропдауне"(${this.CompanyData.strCargoVehicleType})  (${this.xDropDownVehicleType})`;
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


            return true;
        }catch (e) {
            await console.log(`FAIL in AddOneCargoType ${e} \n`);
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
            await console.log(`FAIL in CloseModalTableCargoTypes ${e} \n`);
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

            return true;
        }catch (e) {
            await console.log(`FAIL in AddNewPhoneNumber ${e} \n`);
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

            return true;
        }catch (e) {
            await console.log(`FAIL in AddNewEmail ${e} \n`);
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

            return true;
        }catch (e) {
            await console.log(`FAIL in AddNewLink ${e} \n`);
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

            return true;
        }catch (e) {
            await console.log(`FAIL in AddNewContract ${e} \n`);
            return false;
        }
    }//async AddNewContract()
    //------------------
    async AddNewLocation(){
        try{let resOk;

            var {Location} = require("../sub_objects/location_obj.js");
            let NewLocation = new Location(this.browser, this.page , this.CompanyData.LocationData);
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
                throw `FAIL => NewLocation.EnterNewDataInLocation`;
            }

            resOk = await NewLocation.clickSaveLocation();
            if (!resOk){
                throw `FAIL => NewLocation.clickSaveLocation`;
            }

            // await console.log(`clickMenuLocationsPlus`);
            // await TempStop(this.page);


            resOk = await NewLocation.clickCloseLocationTable();
            if (!resOk){
                throw `FAIL => NewLocation.clickCloseLocationTable`;
            }
            return true;
        }catch (e) {
            await console.log(`FAIL in AddNewLocation ${e} \n`);
            return false;
        }
    }//async AddNewLocation()


    //------------------
    async TemplateTemp(){
        try{let resOk;

            return true;
        }catch (e) {
            await console.log(`FAIL in TemplateTemp ${e} \n`);
            return false;
        }
    }//async TemplateTemp()

    //-------------------


}

module.exports = {Company};
