//'use strict';
class Deal {
    constructor(browser, page, DealData) {
        this.browser = browser;
        this.page = page;
        this.DealData = DealData;
        // Пункт Верхнего Меню "Сделки"
        this.xMenuDeals = `//a[@href="/cfo"][contains(text(), "Сделки")]`;
        // Пункт Верхнего Меню "Сделки +" Плюс
        this.xMenuDealsPlus = `//a[@href="/crm/deal"][@class="info__add"]/div[@class="add-item"]`;
        // Секция Сделки
        this.xDealSection = `//section[@class="crm-view crm-view__deal"]`;
        // Заголовок "Создание сделки"
        this.xHeaderCreateDeal = `//span[contains(text(), "Создание сделки")]`;
        // Кнопка "Отдел продаж" Выбрана
        this.xButtonSalesDepartmentSelected = `//button[@type="button"][contains(@class, "fox-button__primary")]/span[contains(text(), "Отдел продаж")]`;
        this.xButtonSalesDepartmentNotSelected = `//button[@type="button"][contains(@class, "fox-button__outline")]/span[contains(text(), "Отдел продаж")]`;
        // Кнопка "Транспортный отдел" НЕ выбрана
        this.xButtonTransportationDepartmentNotSelected = `//button[@type="button"][contains(@class, "fox-button__outline")]/span[contains(text(), "Транспортный отдел")]`;
        this.xButtonTransportationDepartmentSelected = `//button[@type="button"][contains(@class, "fox-button__primary")]/span[contains(text(), "Транспортный отдел")]`;
        // Блок Валидации -----------
        this.xValidationClientCompany = `//p[@class="validator-feedback__name"][contains(text(), "Компания заказчика")]`;
        this.xValidationOurCompanyClient = `//p[@class="validator-feedback__name"][contains(text(), "Юр. лицо")]`;
        this.xValidationCargoType = `//p[@class="validator-feedback__name"][contains(text(), "Выберите тип груза")]`;
        this.xValidationCargoPrice = `//p[@class="validator-feedback__name"][contains(text(), "Стоимость груза")]`;
        this.xValidationTransporterDelay = `//p[@class="validator-feedback__name"][contains(text(), "Отсрочка перевозчика")]`;
        this.xValidationTransporterCompany = `//p[@class="validator-feedback__name"][contains(text(), "Компания перевозчика")]`;
        this.xValidationOurCompanyTransporter = `//p[@class="validator-feedback__name"][contains(text(), "Юр. лицо с перевозом")]`;
        this.xValidationFIODriver = `//p[@class="validator-feedback__name"][contains(text(), "ФИО водителя")]`;
        this.xValidationVehicle = `//p[@class="validator-feedback__name"][contains(text(), "Автомобиль")]`;
        this.xValidationResponsible = `//p[@class="validator-feedback__name"][contains(text(), "Ответственный по фоксу")]`;

        // --------------------------
        // ===== Секция "Данные про заказчика"=====================================================
        this.xSectionDataOfClients = `//section[div/h5[contains(text(), "Данные про заказчика")]]`;
        // Селект "Мониторинг (МЦ)" "Автоматически"
        this.xSelectMC = `//fieldset[//div[contains(text(), "Мониторинг (МЦ)")]]//span[@class="vs__selected"][contains(text(),"Автоматически")]`;
        //----------------------------------------------------------
        // Филдсет "Компания заказчика *"
        this.xFieldSetClientCompany = `//fieldset[legend[contains(text(), "Компания заказчика")][span[@class="required"][contains(text(),"*")]]]`;
        // Селект "Компания заказчика"
        this.xSelectClientCompany = this.xFieldSetClientCompany + `//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "Компания заказчика"
        this.xSelectClientCompanyActive = this.xFieldSetClientCompany + `//div[contains(@class, "multiselect crm-select multiselect--active")]`;
        // Инпут "Компания заказчика"
        this.xInputClientCompany = this.xFieldSetClientCompany + `//input`;
        // Спиннер ОК НЕ Активный
        this.xClientCompanySpinnerNone = this.xFieldSetClientCompany + `//div[@class="multiselect__spinner"][@style="display: none;"]`;
        // DropDown "Компания заказчика" с нужной строкой
        this.xDropDownClientCompany =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xDropDownClientCompany+=`[contains(text(), '${this.DealData.strClientCompanyName}') and (contains(text(), '${this.DealData.strClientCompanyCode}'))]`;
        // Линк на Компанию Заказчика
        this.xLinkClientCompany = this.xFieldSetClientCompany + `//a[@href="/crm/company/${this.DealData.strClientCompanyID}"]`;
        this.xLinkClientCompany+= `[contains(text(), '${this.DealData.strClientCompanyName}')]`;
            //----------------------------------------------------------
        // "Создайте хотя бы 1 договор для выбора юр. лица!"
        this.xNoClientsContract = this.xSectionDataOfClients + `//span[contains(text(), "Создайте хотя бы 1 договор для выбора юр. лица!")]`;
        this.xNoClientsContractDisabled = this.xNoClientsContract + `[@style="display: none;"]`;
        // Автовыбор Юр. лицо (с Заказчиком) ([contains(text(), '${this.DealData.strOurCompanyWithClient}')])
        this.xSelectedOurCompanyClientGetText = this.xSectionDataOfClients + `//div[@class="bordered-single-select"][div[contains(text(), "Юр. лицо")]]`;
        this.xSelectedOurCompanyClientGetText+= `//span[@class="vs__selected"]`;
        // div with fieldset "Компания заказчика *"
        this.xDivFieldSetClientCompany = `//div[fieldset[legend[contains(text(), "Компания заказчика")][span[@class="required"][contains(text(),"*")]]]]`;
        // стрелка вниз раскрытие Дроп дауна "Юр. лицо"
        this.xDropDownOurCompanyWithClientArrowDown = this.xDivFieldSetClientCompany + `//div[@class="vs__actions"]`;
        this.xDropDownOurCompanyWithClient = this.xDivFieldSetClientCompany + `//ul[@role="listbox"]`;
        // ДропДаун "Юр. лицо" строки
        this.xDropDownOurCompaniesWithClient = this.xDropDownOurCompanyWithClient + `/li[@role="option"]`;
        // ДропДаун "Юр. лицо" Нужная строка
        this.xDropDownOurCompanyWithClientStr = this.xDropDownOurCompaniesWithClient + `[contains(text(), '${this.DealData.strOurCompanyWithClient}')]`;
        // Мониторинг (МЦ)
        this.xLevelMonitporingMC = this.xSectionDataOfClients + `//div[@class="bordered-single-select"][div[contains(text(), "Мониторинг (МЦ)")]]`;
        this.xSelectedLevelMonitporingMCGetText = this.xLevelMonitporingMC + `//span[@class="vs__selected"]`;
        // стрелка вниз раскрытие Дроп дауна "Мониторинг (МЦ)"
        this.xLevelMonitporingMCArrowDown = this.xLevelMonitporingMC + `//div[@class="vs__actions"]`;
        // ФилдСет "Тип груза *"
        this.xFieldSetCargoType = `//fieldset[legend[contains(text(), "Тип груза")][span[@class="required"][contains(text(),"*")]]]`;
        // Выбранный Тип груза
        this.xSelectedCargoType = this.xFieldSetCargoType + `//div[@class="crm-select__single-replica"]/span`;
        // ФилдСет "Стоимость груза"
        this.xFieldSetCargoCost = `//fieldset[legend[contains(text(), "Стоимость груза")][span[@class="required"][contains(text(),"*")]]]`;
        // Инпут "Стоимость груза"
        this.xInputCargoCost = this.xFieldSetCargoCost + `//input[@name="Стоимость груза"]`;


        //ul[@role="listbox"]/li[@role="option"]
        // ДропДаун "Мониторинг (МЦ)" строки
        this.xDropDownLevelMonitporingMCstrings = this.xLevelMonitporingMC + `//li[@role="option"]`;
        // ДропДаун "Мониторинг (МЦ)" нужная строка
        this.xDropDownLevelMonitporingMCstrData = this.xDropDownLevelMonitporingMCstrings + `[contains(text(), "${this.DealData.strLevelMonitoringMC}")]`;
        //--------
        // Фрахт Заказчика
        // Заказчик Кнопка "+ Добавить Фрахт"
        this.xClientAddFreightBtn = this.xSectionDataOfClients + `//div[@class="add-freight-btn"]`;
        //-----------------------------------------
        // Модалка "Добавить фрахт"
        this.xModalAddFreight = `//div[@class="crm--manage-freight"]`;
        // Заголовок Модалки "Добавить фрахт"
        this.xModalHeaderAddFreight = this.xModalAddFreight + `[//div[@class="title"][contains(text(), "Добавить фрахт")]]`;
        // Выбор Валюты "UAH"
        this.xValutaUAH = `//div[@title="UAH"][span[contains(text(), "UAH")]]`;
        // Филд сет "Фрахт"
        this.xFieldSetFreight = `//fieldset[legend[contains(text(), "Фрахт")]]`;
        // Инпут "Фрахт"
        this.xInputFreight = this.xFieldSetFreight + `//input[@name="Фрахт"]`;
        // Надпись "Поле Фрахт обязательно для заполнения"
        this.xFreightRequired = this.xFieldSetFreight + `//span[contains(text(), "Поле Фрахт обязательно для заполнения")]`;
        // Форма оплаты
        // Филд сет "Форма оплаты"
        this.xFieldSetPaymentForm = `//fieldset[legend[contains(text(), "Форма оплаты")]]`;
        // Селект "Форма оплаты"
        this.xSelectPaymentForm = this.xFieldSetPaymentForm + `//input[@placeholder="Выберите форму оплаты"]`;
        // Стрелка вниз для раскрытия списка
        this.xPaymentFormArrowDown = this.xFieldSetPaymentForm + `//div[class="multiselect__select"]`;
        // ДропДаун с нужной строкой + `[contains(text(), "${XXX}")]`
        this.xPaymentFormDropDownNeedStr = this.xFieldSetPaymentForm + `//span`;
        // Выбранное значение + `[contains(text(), "")]` GetInnerText
        this.xPaymentFormSelectedValue = this.xFieldSetPaymentForm + `//div[@class="crm-select__single-replica"]/span`;
        // Надпись "Поле Форма оплаты обязательно для заполнения"
        this.xPaymentFormRequired = this.xFieldSetPaymentForm + `//span[contains(text(), "Поле Форма оплаты обязательно для заполнения")]`;
        // Филд Сет "Доп. условие оплаты"
        this.xFieldSetAdditionalConditionPayment = `//fieldset[legend[contains(text(), "Доп. условие оплаты")]]`;
        // Селект "Доп. условие оплаты"
        this.xSelectAdditionalConditionPayment = this.xFieldSetAdditionalConditionPayment + `//input[@placeholder="Выберите условие оплаты"]`;

        // Кнопка "Сохранить"
        this.xAddFreightButtonSaveDisabled = this.xModalAddFreight + `//button[contains(text(), "Сохранить")][@disabled="disabled"]`;
        this.xAddFreightButtonSaveActive = this.xModalAddFreight + `//button[contains(text(), "Сохранить") and not(contains(@disabled , "disabled"))]`;

        // ==== END ----- Секция "Данные про заказчика"=====================================================



    } // constructor(browser, page, DealData)
    //----------------------------------------
    async ClickDealPlus() { // Открытие Формы Создания НОВОЙ сделки
        let resOk;
        try {
            await WaitRender(this.page);
            // Пункт Верхнего Меню "Сделки"
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xMenuDeals);
            if (!resOk) {
                throw `FAIL => Пункт Верхнего Меню "Сделки" WaitForElementIsPresentByXPath(${this.xMenuDeals})`;
            }
            // Пункт Верхнего Меню "Сделки" Наводим на него курсор
            resOk = await HoverByXPath(this.page, this.xMenuDeals);
            if (!resOk) {
                throw `FAIL => Пункт Верхнего Меню "Сделки" HoverByXPath(${this.xMenuDeals})`;
            }
            await WaitRender(this.page);
            // Пункт Верхнего Меню "Сделки +" Плюс
            resOk = await ClickByXPath(this.page, this.xMenuDealsPlus);
            if (!resOk) {
                throw `FAIL => Пункт Верхнего Меню "Сделки +" Плюс ClickByXPath(${this.xMenuDealsPlus})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ClickDealPlus`);
            return false;
        }
    }//async ClickDealPlus()
    //----------------------------------------
    async CheckFormNewDeal() { // Проверка Формы создания НОВОЙ сделки
        let resOk;
        try {
            await WaitRender(this.page);
            // Секция Сделки
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xDealSection);
            if (!resOk) {
                throw `FAIL => Секция Сделки WaitForElementIsPresentByXPath(${this.xDealSection})`;
            }
            // Заголовок "Создание сделки"
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xHeaderCreateDeal);
            if (!resOk) {
                throw `FAIL => Заголовок "Создание сделки" WaitForElementIsPresentByXPath(${this.xHeaderCreateDeal})`;
            }
            // Кнопка "Отдел продаж" Выбрана
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xButtonSalesDepartmentSelected);
            if (!resOk) {
                throw `FAIL => Кнопка "Отдел продаж" Выбрана WaitForElementIsPresentByXPath(${this.xButtonSalesDepartmentSelected})`;
            }
            // Кнопка "Транспортный отдел" НЕ выбрана
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xButtonTransportationDepartmentNotSelected);
            if (!resOk) {
                throw `FAIL => Кнопка "Транспортный отдел" НЕ выбрана WaitForElementIsPresentByXPath(${this.xButtonTransportationDepartmentNotSelected})`;
            }
            // Селект "Мониторинг (МЦ)" "Автоматически"
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xSelectMC);
            if (!resOk) {
                throw `FAIL => Селект "Мониторинг (МЦ)" "Автоматически" WaitForElementIsPresentByXPath(${this.xSelectMC})`;
            }
            // Проверка Начальной Валидации Формы Сделки
            resOk = this.CheckDealFormStartValidation();
            if (!resOk) {
                throw `FAIL => Проверка Начальной Валидации Формы Сделки this.CheckStartValidation();`;
            }

            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckFormNewDeal`);
            return false;
        }
    }//async CheckFormNewDeal()
    //----------------------------------------
    async CheckDealFormStartValidation() { // Проверка Начальной Валидации Формы Сделки
        let resOk;
        let resErrorText = ``;
        try {
            // Блок Валидации -----------
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationClientCompany);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Компания заказчика" ${this.xValidationClientCompany} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationOurCompanyClient);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации Заказчик "Юр. лицо" ${this.xValidationOurCompanyClient} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationCargoType);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Выберите тип груза" ${this.xValidationCargoType} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationCargoPrice);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Стоимость груза" ${this.xValidationCargoPrice} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationTransporterDelay);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Отсрочка перевозчика" ${this.xValidationTransporterDelay} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationTransporterCompany);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Компания перевозчика" ${this.xValidationTransporterCompany} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationOurCompanyTransporter);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Юр. лицо с перевозом" ${this.xValidationOurCompanyTransporter} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationFIODriver);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "ФИО водителя" ${this.xValidationFIODriver} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationVehicle);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Автомобиль" ${this.xValidationVehicle} \n`;
            }
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationResponsible);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Ответственный по фоксу" ${this.xValidationResponsible} \n`;
            }

            if(resErrorText !==``){
                await this.page.screenshot({path: g_PathSS + `screenshot_CheckDealFormStartValidation.png`, fullPage: true });
                await console.log(` Скриншот: (screenshot_CheckDealFormStartValidation.png)`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки => ВЫХОД
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckDealFormStartValidation`);
            return false;
        }
    }//async CheckDealFormStartValidation()
    //----------------------------------------
    async EnterClientCompany() { // Вводим "Компания заказчика *"
        let resOk, resOk2;
        let ColStr = 0;
        let InText = ``;
        try {
            //----------------------------------------------------------
            // Филдсет "Компания заказчика *"
            await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectClientCompany);
            resOk = await ClickByXPath(this.page, this.xSelectClientCompany);
            if (!resOk) {
                throw `FAIL => Инпут "Компания заказчика *" ClickByXPath(${this.xSelectClientCompany})`;
            }
            // подождать пока будет активен Селект "Компания заказчика *"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectClientCompanyActive);
            if (!resOk) {
                throw `FAIL => НЕ активен Селект "Компания заказчика *" WaitForElementIsPresentByXPath(${this.xSelectClientCompanyActive})`;
            }
            //await WaitRender(this.page);

            resOk = await SetTextByXPath(this.page, this.xInputClientCompany, this.DealData.strClientCompanyName);
            if (!resOk) {
                throw `FAIL => Инпут "Компания заказчика *" SetTextByXPath(${this.xInputClientCompany})`;
            }
            // Спиннер ОК НЕ Активный
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xClientCompanySpinnerNone);
            if (!resOk) {
                throw `FAIL => Спиннер ОК НЕ Активный WaitForElementIsPresentByXPath(${this.xClientCompanySpinnerNone})`;
            }
            //await this.page.waitFor(200);
            // DropDown "Компания заказчика *" с нужной строкой
            await WaitForElementIsPresentByXPath(4000, this.page, this.xDropDownClientCompany);
            resOk = await ClickByXPath(this.page, this.xDropDownClientCompany);
            if (!resOk) {
                throw `FAIL => DropDown "Компания заказчика *" с нужной строкой ClickByXPath(${this.xDropDownClientCompany})`;
            }
            //await WaitRender(this.page);
            // Линк на Компанию Заказчика
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xLinkClientCompany);
            if (!resOk) {
                throw `FAIL => НЕ вижу Линк на Компанию Заказчика WaitForElementIsPresentByXPath(${this.xLinkClientCompany})`;
            }
            // await WaitRender(this.page);
            // await this.page.waitFor(1000);
            // После выбора Компании ждём пока скроется Нотификация
            // "Создайте хотя бы 1 договор для выбора юр. лица!"
            // this.xNoClientsContract = this.xSectionDataOfClients + `//span[contains(text(), "Создайте хотя бы 1 договор для выбора юр. лица!")]`;
            // this.xNoClientsContractDisabled = this.xNoClientsContract + `[@style="display: none;"]`;
            //await console.log(`xPath=${this.xNoClientsContractDisabled}`);
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xNoClientsContractDisabled);
            if (!resOk) {
                let TxtErr = `FAIL => У Компании Заказчика отсутствует Договор !!! \n`;
                    TxtErr+= `FAIL => НЕ вижу ПРОПАВШЕЙ надписи "Создайте хотя бы 1 договор для выбора юр. лица!" \n`;
                    TxtErr+= `FAIL => WaitForElementIsPresentByXPath(${this.xNoClientsContractDisabled})`;
                throw TxtErr;
            }


            // Автовыбор Юр. лицо (с Заказчиком) ( без  [contains(text(), '${this.DealData.strOurCompanyWithClient}')])
            // Автовыбор Юр. лицо (с Заказчиком)

            resOk = await ElementIsPresent(this.page, this.xSelectedOurCompanyClientGetText);
            if (resOk) {
                InText = await ElementGetInnerText(this.page, 0, this.xSelectedOurCompanyClientGetText);
                await InText.trim();
                if (InText !== `` && InText !== this.DealData.strOurCompanyWithClient) {
                    throw `FAIL => Автовыбор Нашей компании InText(${InText})!==(${this.DealData.strOurCompanyWithClient})`;
                }
            } //  throw `FAIL => Автовыбор Юр. лицо (с Заказчиком) WaitForElementIsPresentByXPath(${this.xSelectedOurCompanyClientGetText})`;
            if (InText === ``) { // если не Автовыбралась Наша компания проверим ДропДаун
                // клик по
                // стрелка вниз раскрытие Дроп дауна "Юр. лицо"
                resOk2 = await ClickByXPath(this.page, this.xDropDownOurCompanyWithClientArrowDown);
                if (!resOk2) {
                    throw `FAIL => стрелка вниз раскрытие Дроп дауна "Юр. лицо" ClickByXPath(${this.xDropDownOurCompanyWithClientArrowDown})`;
                }
                await WaitRender(this.page);

                // Проверим, что строк больше Одной (если бы была одна то должен был сработать Автовыбор)
                // ДропДаун "Юр. лицо" строки
                resOk2 = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownOurCompaniesWithClient);
                if (!resOk2) {
                    throw `FAIL => ДропДаун "Юр. лицо" строки WaitForElementIsPresentByXPath(${this.xDropDownOurCompaniesWithClient})`;
                }

                ColStr = await ElementGetLength(this.page, this.xDropDownOurCompaniesWithClient);
                if (ColStr === 1){
                    await console.log(`WARNING - Не сработал АвтоВыбор Нашей компании с Заказчиком ColStr=${ColStr}`);
                    await this.page.screenshot({path: g_PathSS + `screenshot_AutoSelectOurCompanyClient.png`, fullPage: true });
                    await console.log(` Скриншот: (screenshot_AutoSelectOurCompanyClient.png)`);
                }
                // ДропДаун "Юр. лицо" Нужная строка
                resOk2 = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownOurCompanyWithClientStr);
                if (!resOk2) {
                    await console.log(` !!! Не вижу договора с ${this.DealData.strOurCompanyWithClient}`);
                    throw `FAIL => ДропДаун "Юр. лицо" Нужная строка WaitForElementIsPresentByXPath(${this.xDropDownOurCompanyWithClientStr})`;
                }
                // Клик ДропДаун "Юр. лицо" Нужная строка
                resOk2 = await ClickByXPath(this.page, this.xDropDownOurCompanyWithClientStr);
                if (!resOk2) {
                    throw `FAIL => ДропДаун "Юр. лицо" Нужная строка ClickByXPath(${this.xDropDownOurCompanyWithClientStr})`;
                }

            }// if (!resOk) { // если не Автовыбралась Наша компания проверим ДропДаун

            await WaitRender(this.page);





            return true;
        } catch (e) {
            await this.page.screenshot({path: g_PathSS + `screenshot_EnterClientCompany.png`, fullPage: true });
            await console.log(` Скриншот: (screenshot_EnterClientCompany.png)`);
            await console.log(`${e} \n FAIL in EnterClientCompany`);
            return false;
        }
    }//async EnterClientCompany()
    //----------------------------------------
    async EnterLevelMonitoringMC() {
        let resOk;
        let strTemp = ``;
        let strErr = ``;
        try {
            // Проверка "Мониторинг (МЦ)" "Автоматически"
            strTemp = await ElementGetInnerText(this.page, 0, this.xSelectedLevelMonitporingMCGetText);
            if (strTemp !== `Автоматически`){
                strErr+= `FAIL => Автовыбор "Мониторинг (МЦ)" (${strTemp})!==(Автоматически)`;
            }


            // стрелка вниз раскрытие Дроп дауна "Мониторинг (МЦ)"
            resOk = await ClickByXPath(this.page, this.xLevelMonitporingMCArrowDown);
            if (!resOk) {
                throw `FAIL => стрелка вниз раскрытие Дроп дауна "Мониторинг (МЦ)" ClickByXPath(${this.xLevelMonitporingMCArrowDown})`;
            }
            // ДропДаун "Мониторинг (МЦ)" строки
            resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownLevelMonitporingMCstrings);
            if (!resOk) {
                throw `FAIL => ДропДаун "Мониторинг (МЦ)" строки WaitForElementIsPresentByXPath(${this.xDropDownLevelMonitporingMCstrings})`;
            }
            // await OutToConsoleInnerTextByXPAth(this.page, this.xDropDownLevelMonitporingMCstrings);
            await WaitRender(this.page);
            // ДропДаун "Мониторинг (МЦ)" нужная строка
            resOk = await ClickByXPath(this.page, this.xDropDownLevelMonitporingMCstrData);
            if (!resOk) {
                throw `FAIL => ДропДаун "Мониторинг (МЦ)" нужная строка ClickByXPath(${this.xDropDownLevelMonitporingMCstrData})`;
            }


            if (strErr!==``){
                await console.log('\x1b[38;5;1m\t', `Проверка "Мониторинг (МЦ)" "Автоматически" - ${strErr}`, '\x1b[0m');
            }else{
                await console.log('\x1b[38;5;2m\t', `Проверка "Мониторинг (МЦ)" "Автоматически" - OK`, '\x1b[0m');
            }

            await console.log('\x1b[38;5;2m\t', `Установка "Мониторинг (МЦ)" - OK`, '\x1b[0m');
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterLevelMonitoringMC`);
            return false;
        }
    }//async EnterLevelMonitoringMC()
    //----------------------------------------
    async EnterCargoTypeData() {
        let resOk;
        let strGetCargoType = ``;
        let strGetCargoCost = ``;
        let strErr = ``;
        try {
                // strCargoName: 'Алкоголь',
                // strCargoCost: '100500',
                // AutoCompleteCargo: true, // false
            if (this.DealData.AutoCompleteCargo) { // Если true то должен быть автовыбран указанный тип груза и его цена
                // Автовыбор Выбранный "Тип груза"
                strGetCargoType = await ElementGetInnerText(this.page, 0, this.xSelectedCargoType);
                if (strGetCargoType !== this.DealData.strCargoName){
                    strErr+= `\x1b[38;5;1m\tАвтовыбор Выбранный "Тип груза" FAIL => (${strGetCargoType})!==(${this.DealData.strCargoName})\n`;
                }
                // Автовыбор Инпут "Стоимость груза"
                strGetCargoCost = await ElementGetValue(this.page, 0, this.xInputCargoCost);
                if (strGetCargoCost !== this.DealData.strCargoCost){
                    strErr+= `\x1b[38;5;1m\tАвтовыбор Инпут "Стоимость груза" FAIL => (${strGetCargoCost})!==(${this.DealData.strCargoCost})\n`;
                }

                if(strErr!==``){
                    throw strErr; // вывод суммарной ошибки и выход
                }
                //Проверка автовыбора Ок
                await console.log('\x1b[38;5;2m\t', `Автовыбор "Тип груза" - OK`, '\x1b[0m');
                await console.log('\x1b[38;5;2m\t', `Автовыбор "Стоимость груза" - OK`, '\x1b[0m');

            }



            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterCargoTypeData`);
            return false;
        }
    }//async EnterCargoTypeData()
    //----------------------------------------
    async ChekModalAddNewFreight() { // Проверка Модалки "Добавить фрахт"
        let resOk;
        try {
            // Заголовок Модалки "Добавить фрахт"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xModalHeaderAddFreight);
            if (!resOk) {
                throw `FAIL => Заголовок Модалки "Добавить фрахт" WaitForElementIsPresentByXPath(${this.xModalHeaderAddFreight})`;
            }
            // Выбор Валюты "UAH"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValutaUAH);
            if (!resOk) {
                throw `FAIL => Выбор Валюты "UAH" WaitForElementIsPresentByXPath(${this.xValutaUAH})`;
            }
            // Инпут "Фрахт"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputFreight);
            if (!resOk) {
                throw `FAIL => Инпут "Фрахт" WaitForElementIsPresentByXPath(${this.xInputFreight})`;
            }
            // Надпись "Поле Фрахт обязательно для заполнения"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xFreightRequired);
            if (!resOk) {
                throw `FAIL => Надпись "Поле Фрахт обязательно для заполнения" WaitForElementIsPresentByXPath(${this.xFreightRequired})`;
            }
            // Селект "Форма оплаты"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectPaymentForm);
            if (!resOk) {
                throw `FAIL => Селект "Форма оплаты" WaitForElementIsPresentByXPath(${this.xSelectPaymentForm})`;
            }
            // Надпись "Поле Форма оплаты обязательно для заполнения"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xPaymentFormRequired);
            if (!resOk) {
                throw `FAIL => Надпись "Поле Форма оплаты обязательно для заполнения" WaitForElementIsPresentByXPath(${this.xPaymentFormRequired})`;
            }
            // // Селект "Доп. условие оплаты"
            // resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectAdditionalConditionPayment);
            // if (!resOk) {
            //     throw `FAIL => Селект "Доп. условие оплаты" WaitForElementIsPresentByXPath(${this.xSelectAdditionalConditionPayment})`;
            // }
            // Кнопка "Сохранить" Disabled
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xAddFreightButtonSaveDisabled);
            if (!resOk) {
                throw `FAIL => Кнопка "Сохранить" Disabled WaitForElementIsPresentByXPath(${this.xAddFreightButtonSaveDisabled})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ChekModalAddNewFreight`);
            return false;
        }
    }//async ChekModalAddNewFreight()
    //----------------------------------------
    async AddAllClientFreights() { // Добавить Все Фрахты Заказчика
        let resOk;
        let QFreights = 0;
        try {

            // Фрахт Заказчика
            QFreights = this.DealData.ClientFreights.length;
            await console.log(`QFreights=${QFreights}`);
            await console.log(`ClientFreights[0].Amount=${this.DealData.ClientFreights[0].Amount}`);
            if (QFreights < 1 ){
                throw `FAIL => Фрахт Заказчика НЕ УКАЗАН В ДАННЫХ ДЛЯ ТЕСТОВ QFreights=(${QFreights})`;
            }

            // Заказчик Кнопка "+ Добавить Фрахт"
            resOk = await ClickByXPath(this.page, this.xClientAddFreightBtn);
            if (!resOk) {
                throw `FAIL => Заказчик Кнопка "+ Добавить Фрахт" ClickByXPath(${this.xClientAddFreightBtn})`;
            }
            await WaitRender(this.page);
            // Проверка Модалки "Добавить фрахт"
            resOk = await this.ChekModalAddNewFreight();
            if (!resOk) {
                throw `FAIL => Проверка Модалки "Добавить фрахт" this.ChekModalAddNewFreight();`;
            }

            // Модалка "Добавить фрахт"

           // ClientFreights[N]




            // TempLength = await ElementGetLength(this.page, this.xModalAddFreight);
            // await console.log(`TempLength=${TempLength}`);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in AddAllClientFreights`);
            return false;
        }
    }//async AddAllClientFreights()
    //----------------------------------------
    async TemplateTemp() {
        let resOk;
        try {


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp`);
            return false;
        }
    }//async TemplateTemp()

}// class Deal
//=========================================================
module.exports = {Deal};
