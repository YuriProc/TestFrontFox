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
        this.xInputClientCompany = this.xFieldSetClientCompany + `//input[@type="text"]`;
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
        // Форма оплаты -----------------------------
        // Филд сет "Форма оплаты"
        this.xFieldSetPaymentForm = `//fieldset[legend[contains(text(), "Форма оплаты")]]`;
        // Селект "Форма оплаты"
        this.xSelectPaymentForm = this.xFieldSetPaymentForm + `//input[@placeholder="Выберите форму оплаты"]`;
        // Стрелка вниз для раскрытия списка
        this.xPaymentFormArrowDown = this.xFieldSetPaymentForm + `//div[@class="multiselect__select"]`;
        // ДропДаун с нужной строкой + `[contains(text(), "${XXX}")]` `[text()="${XXX}"]`
        this.xPaymentFormDropDownNeedStr = this.xFieldSetPaymentForm + `//span`;
        // Выбранное значение + `[contains(text(), "")]` GetInnerText
        this.xPaymentFormSelectedValue = this.xFieldSetPaymentForm + `//div[@class="crm-select__single-replica"]/span`;
        // Надпись "Поле Форма оплаты обязательно для заполнения"
        this.xPaymentFormRequired = this.xFieldSetPaymentForm + `//span[contains(text(), "Поле Форма оплаты обязательно для заполнения")]`;
        // "Доп. условие оплаты" -----------------------------
        // Филд Сет "Доп. условие оплаты"
        this.xFieldSetAdditionalConditionPayment = `//fieldset[legend[contains(text(), "Доп. условие оплаты")]]`;
        // Селект "Доп. условие оплаты"
        this.xSelectAdditionalConditionPayment = this.xFieldSetAdditionalConditionPayment + `//input[@placeholder="Выберите условие оплаты"]`;
        // Стрелка вниз для раскрытия списка
        this.xAdditionalConditionPaymentArrowDown = this.xFieldSetAdditionalConditionPayment + `//div[@class="multiselect__select"]`;
        // ДропДаун с нужной строкой + `[contains(text(), "${XXX}")]` `[text()="${XXX}"]`
        this.xAdditionalConditionPaymentDropDownNeedStr = this.xFieldSetAdditionalConditionPayment + `//span`;
        // Выбранное значение + `[contains(text(), "")]` GetInnerText
        this.xAdditionalConditionPaymentSelectedValue = this.xFieldSetAdditionalConditionPayment + `//div[@class="crm-select__single-replica"]/span`;



        // Кнопка "Сохранить" -----------------------------
        this.xAddFreightButtonSaveDisabled = this.xModalAddFreight + `//button[contains(text(), "Сохранить")][@disabled="disabled"]`;
        this.xAddFreightButtonSaveActive = this.xModalAddFreight + `//button[contains(text(), "Сохранить") and not(contains(@disabled , "disabled"))]`;

        // ==== END ----- Секция "Данные про заказчика"=====================================================
        // ===== Секция "Данные про перевозчика"=====================================================
        this.xSectionDataOfTransporter = `//section[h5[contains(text(), "Данные про перевозчика")]]`;
        //----------------------------------------------------------
        // Тип -- пока не реализовано
        // Филдсет "Компания перевозчика *"
        this.xFieldSetTransporterCompany = `//fieldset[legend[contains(text(), "Компания перевозчика")][span[@class="required"][contains(text(),"*")]]]`;
        // Селект "Компания перевозчика"
        this.xSelectTransporterCompany = this.xFieldSetTransporterCompany + `//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "Компания перевозчика"
        this.xSelectTransporterCompanyActive = this.xFieldSetTransporterCompany + `//div[contains(@class, "multiselect crm-select multiselect--active")]`;
        // Инпут "Компания перевозчика"
        this.xInputTransporterCompany = this.xFieldSetTransporterCompany + `//input[@type="text"]`;
        // Спиннер ОК НЕ Активный
        this.xTransporterCompanySpinnerNone = this.xFieldSetTransporterCompany + `//div[@class="multiselect__spinner"][@style="display: none;"]`;
        // DropDown "Компания перевозчика" с нужной строкой
        this.xDropDownTransporterCompany =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xDropDownTransporterCompany+=`[contains(text(), '${this.DealData.strTransporterCompanyName}') and (contains(text(), '${this.DealData.strTransporterCompanyCode}'))]`;
        // Линк на Компанию перевозчика
        this.xLinkTransporterCompany = this.xFieldSetTransporterCompany + `//a[@href="/crm/company/${this.DealData.strTransporterCompanyID}"]`;
        this.xLinkTransporterCompany+= `[contains(text(), '${this.DealData.strTransporterCompanyName}')]`;
        //----------------------------------------------------------
        // "Создайте хотя бы 1 договор для выбора юр. лица!"
        this.xNoTransporterContract = this.xSectionDataOfTransporter + `//span[contains(text(), "Создайте хотя бы 1 договор для выбора юр. лица!")]`;
        this.xNoTransporterContractDisabled = this.xNoTransporterContract + `[@style="display: none;"]`;
        // Автовыбор Юр. лицо (с Перевозчиком) ([contains(text(), '${this.DealData.strOurCompanyWithClient}')])
        this.xSelectedOurCompanyTransporterGetText = this.xSectionDataOfTransporter + `//div[@class="bordered-single-select"][div[contains(text(), "Юр. лицо")]]`;
        this.xSelectedOurCompanyTransporterGetText+= `//span[@class="vs__selected"]`;
        // div with fieldset "Компания перевозчика *"
        this.xDivFieldSetTransporterCompany = `//div[fieldset[legend[contains(text(), "Компания перевозчика")][span[@class="required"][contains(text(),"*")]]]]`;
        // стрелка вниз раскрытие Дроп дауна "Юр. лицо"
        this.xDropDownOurCompanyWithTransporterArrowDown = this.xDivFieldSetTransporterCompany + `//div[@class="vs__actions"]`;
        this.xDropDownOurCompanyWithTransporter = this.xDivFieldSetTransporterCompany + `//ul[@role="listbox"]`;
        // ДропДаун "Юр. лицо" строки
        this.xDropDownOurCompaniesWithTransporter = this.xDropDownOurCompanyWithTransporter + `/li[@role="option"]`;
        // ДропДаун "Юр. лицо" Нужная строка
        this.xDropDownOurCompanyWithTransporterStr = this.xDropDownOurCompaniesWithTransporter + `[contains(text(), '${this.DealData.strOurCompanyWithTransporter}')]`;
        // Филдсет "ФИО водителя *" ---------------------------------------------------
        this.xFieldSetDriver = `//fieldset[legend[contains(text(), "ФИО водителя")][span[@class="required"][contains(text(),"*")]]]`;
        // Селект "ФИО водителя"
        this.xSelectDriver = this.xFieldSetDriver + `//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "ФИО водителя"
        this.xSelectDriverActive = this.xFieldSetDriver + `//div[contains(@class, "multiselect crm-select multiselect--active")]`;
        // Инпут "ФИО водителя"
        this.xInputDriver = this.xFieldSetDriver + `//input[@type="text"]`;
        // Альтернативный элемент Селект "ФИО водителя"
        this.xInput2DriverDisabled = `//div[@placeholder="Выберите водителя"][@disabled="disabled"]`;
        this.xInput2DriverActive = `//div[@placeholder="Выберите водителя"][not(contains(@disabled , "disabled"))]`;
        // Выбранный Водитель
        this.xSelectedDriver = this.xFieldSetDriver + `//a[@class="crm-select__link"][contains(text(), "${this.DealData.strDriverFullName}")]`;
        // Стелка вниз для раскрытия списка Водителей
        this.xArrowDownListDrivers = this.xFieldSetDriver + `//div[@class="multiselect__select"]`;
        // Раскрытый Список Водителей
        this.xOpenedListDrivers = this.xFieldSetDriver + `//div[@class="multiselect__content-wrapper"][not(contains(@style , "display: none;"))]`
        // Спиннер ОК НЕ Активный
        this.xDriverSpinnerNone = this.xFieldSetDriver + `//div[@class="multiselect__spinner"][@style="display: none;"]`;
        // DropDown "ФИО водителя" строки
        this.xDropDownDriverStrings = this.xFieldSetDriver + `//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")][not(contains(text() , "Водители компании"))]`;
        // DropDown "ФИО водителя" с нужной строкой
        this.xDropDownDriverNeedStr =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xDropDownDriverNeedStr+=`[contains(text(), '${this.DealData.strDriverFullName}') and (contains(text(), '${this.DealData.strDriverPhone}'))]`;
        // DropDown "ФИО водителя" с нужной строкой Подсвеченной
        this.xDropDownDriverNeedStrHighlight = this.xDropDownDriverNeedStr + `[contains(@class, "highlight")]`;
        // Линк на Водителя
        this.xLinkDriver = this.xFieldSetDriver + `//a[@href="/crm/contact/${this.DealData.strContactDriverID}"]`;
        this.xLinkDriver+= `[contains(text(), '${this.DealData.strDriverFullName}')]`;
        //----------------------------------------------------------
        // Филдсет "Автомобиль *" ---------------------------------------------------
        this.xFieldSetVehicle = `//fieldset[legend[contains(text(), "Автомобиль")][span[@class="required"][contains(text(),"*")]]]`;
        // Инпут "Автомобиль *"
        this.xInputVehicleDisabled = this.xFieldSetVehicle + `//input[@placeholder="Выберите автомобиль"][@disabled="disabled"]`;
        this.xInputVehicleActive = this.xFieldSetVehicle + `//input[@placeholder="Выберите автомобиль"][not(contains(@disabled , "disabled"))]`;
        // Выбранный "Автомобиль *"
        this.xSelectedVehicle = this.xFieldSetVehicle + `//a[@class="crm-select__link"][contains(text(), "${this.DealData.strLicensePlate1}")]`;
        // Стелка вниз для раскрытия списка Автомобилей
        this.xArrowDownListVehicles = this.xFieldSetVehicle + `//div[@class="multiselect__select"]`;
        // Раскрытый Список Автомобилей
        this.xOpenedListVehicles = this.xFieldSetVehicle + `//div[@class="multiselect__content-wrapper"][not(contains(@style , "display: none;"))]`
        // DropDown "Автомобиль" строки
        this.xDropDownVehicleStrings = this.xFieldSetVehicle + `//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")][not(contains(text() , "Водители компании"))]`;
        // DropDown "Автомобиль" с нужной строкой
        this.xDropDownVehicleTempStr =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xVehicleNeedStr = `/span[contains(text(), "${this.DealData.strLicensePlate1}")]`;
        this.xDropDownVehicleNeedStr = this.xDropDownVehicleTempStr + this.xVehicleNeedStr;
        // DropDown "Автомобиль" с нужной строкой Подсвеченной
        this.xDropDownVehicleTempStrHighlight = this.xDropDownVehicleTempStr + `[contains(@class, "highlight")]`;
        this.xDropDownVehicleNeedStrHighlight = this.xDropDownVehicleTempStrHighlight + this.xVehicleNeedStr;
        // Линк на Автомобиль
        this.xLinkVehicle = this.xFieldSetVehicle + `//a[@href="/crm/vehicle/${this.DealData.strVehicleID}"]`;
        this.xLinkVehicle+= `[contains(text(), '${this.DealData.strLicensePlate1}')]`;
        // Филдсет "Прицеп" ---------------------------------------------------
        this.xFieldSetTrailer = `//fieldset[legend[contains(text(), "Прицеп")]]`;
        // Инпут "Прицеп"
        this.xInputTrailerDisabled = this.xFieldSetTrailer + `//input[@placeholder="Выберите автомобиль"][@disabled="disabled"]`;
        this.xInputTrailerActive = this.xFieldSetTrailer + `//input[@placeholder="Выберите прицеп"][not(contains(@disabled , "disabled"))]`;
        // Выбранный "Прицеп"
        this.xSelectedTrailer = this.xFieldSetTrailer + `//a[@class="crm-select__link"][contains(text(), "${this.DealData.strLicensePlate2}")]`;
        // Стелка вниз для раскрытия списка Прицепов
        this.xArrowDownListTrailers = this.xFieldSetTrailer + `//div[@class="multiselect__select"]`;
        // Раскрытый Список Прицеп
        this.xOpenedListTrailers = this.xFieldSetTrailer + `//div[@class="multiselect__content-wrapper"][not(contains(@style , "display: none;"))]`
        // DropDown "Прицеп" строки
        this.xDropDownTrailerStrings = this.xFieldSetTrailer + `//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")][not(contains(text() , "Водители компании"))]`;
        // DropDown "Прицеп" с нужной строкой
        this.xDropDownTrailerTempStr =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xTrailerNeedStr = `/span[contains(text(), "${this.DealData.strLicensePlate2}")]`;
        this.xDropDownTrailerNeedStr = this.xDropDownTrailerTempStr + this.xTrailerNeedStr;
        // DropDown "Автомобиль" с нужной строкой Подсвеченной
        this.xDropDownTrailerTempStrHighlight = this.xDropDownTrailerTempStr + `[contains(@class, "highlight")]`;
        this.xDropDownTrailerNeedStrHighlight = this.xDropDownTrailerTempStrHighlight + this.xTrailerNeedStr;

        // Линк на Прицеп
        this.xLinkTrailer = this.xFieldSetTrailer + `//a[@href="/crm/vehicle/${this.DealData.strTrailerID}"]`;
        this.xLinkTrailer+= `[contains(text(), '${this.DealData.strLicensePlate2}')]`;
        //--------
        // Фрахт Перевозчика
        //Перевозчик Кнопка "+ Добавить Фрахт"
        this.xTransporterAddFreightBtn = this.xSectionDataOfTransporter + `//div[@class="add-freight-btn"]`;
        //-----------------------------------------

        // ==== END ----- Секция "Данные про перевозчика"=====================================================



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

                if (InText !== `` && !await SubStrIsPresent(this.DealData.strOurCompanyWithClient, InText)) {
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
            let tempHref = await ElementGetHref(this.page, 0 , this.xLinkClientCompany);
            if (tempHref === ``){
                await console.log('\x1b[38;5;1m\t', `Линк на Компанию Заказчика (${this.xLinkClientCompany}) - FAIL !!!`, '\x1b[0m');
            }else{
                await console.log('\x1b[38;5;2m\t', `Линк на Компанию Заказчика (${tempHref}) - OK`, '\x1b[0m');
            }

            await console.log('\x1b[38;5;2m\t', `Компания Заказчика ${this.DealData.strClientCompanyName} - OK`, '\x1b[0m');
            await console.log('\x1b[38;5;2m\t', `Наше "Юр. лицо" с компанией Заказчика ${this.DealData.strOurCompanyWithClient} - OK`, '\x1b[0m');
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

            await console.log('\x1b[38;5;2m\t', `Установка "Мониторинг (МЦ)" ${this.DealData.strLevelMonitoringMC} - OK`, '\x1b[0m');
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
                await console.log('\x1b[38;5;2m\t', `Автовыбор "Тип груза" ${this.DealData.strCargoName} - OK`, '\x1b[0m');
                await console.log('\x1b[38;5;2m\t', `Автовыбор "Стоимость груза" ${this.DealData.strCargoCost} грн. - OK`, '\x1b[0m');

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
    async AddAllClientOrTransporterFreights( CT ) { // Добавить Все Фрахты Заказчика //1 or 2
        let resOk;
        let QFreights = 0;
        let xTemp = ``;
        let N = 0;
        try {
            if(!(CT === 1 || CT === 2)) {
                throw `FAIL => Параметр CT НЕ УКАЗАН В ДАННЫХ ДЛЯ ТЕСТОВ CT=(${CT}) AddAllClientOrTransporterFreights( CT )`;
            }
            if (CT === 1) {
                // Фрахт Заказчика
                QFreights = this.DealData.ClientFreights.length;
                //await console.log(`QFreights=${QFreights}`);

                if (QFreights < 1) {
                    throw `FAIL => Фрахт Заказчика НЕ УКАЗАН В ДАННЫХ ДЛЯ ТЕСТОВ QFreights=(${QFreights})`;
                }
            }else{
                // Фрахт Перевозчика
                QFreights = this.DealData.TransporterFreights.length;
                //await console.log(`QFreights=${QFreights}`);

                if (QFreights < 1) {
                    throw `FAIL => Фрахт Перевозчика НЕ УКАЗАН В ДАННЫХ ДЛЯ ТЕСТОВ QFreights=(${QFreights})`;
                }

            }
            //
            for(N = 0; N < QFreights; N++ ) {
                // await console.log(`ClientFreights[${N}].Amount=${this.DealData.ClientFreights[N].Amount}`);
                if (CT === 1) {
                    // Заказчик Кнопка "+ Добавить Фрахт"
                    resOk = await ClickByXPath(this.page, this.xClientAddFreightBtn);
                    if (!resOk) {
                        throw `FAIL => Заказчик Кнопка "+ Добавить Фрахт" ClickByXPath(${this.xClientAddFreightBtn})`;
                    }
                }else{
                    // Перевозчик Кнопка "+ Добавить Фрахт"
                    resOk = await ClickByXPathNum(this.page,0, this.xTransporterAddFreightBtn);
                    if (!resOk) {
                        throw `FAIL => Перевозчик Кнопка "+ Добавить Фрахт" ClickByXPathNum(${this.xTransporterAddFreightBtn})`;
                    }

                }
                await WaitRender(this.page);
                // Проверка Модалки "Добавить фрахт"
                resOk = await this.ChekModalAddNewFreight();
                if (!resOk) {
                    throw `FAIL => Проверка Модалки "Добавить фрахт" this.ChekModalAddNewFreight();`;
                }
                // ClientFreights[N] -------------------
                // Модалка "Добавить фрахт"
                // Инпут "Фрахт"
                resOk = await ClickByXPath(this.page, this.xInputFreight);
                if (!resOk) {
                    throw `FAIL => Инпут "Фрахт" ClickByXPath(${this.xInputFreight})`;
                }
                if (CT === 1) {
                    resOk = await SetTextByXPath(this.page, this.xInputFreight, this.DealData.ClientFreights[N].Amount);
                }else{
                    resOk = await SetTextByXPath(this.page, this.xInputFreight, this.DealData.TransporterFreights[N].Amount);
                }
                if (!resOk) {
                    throw `FAIL => Инпут "Фрахт" SetTextByXPath(${this.xInputFreight})`;
                }
                // Селект "Форма оплаты"  this.xSelectPaymentForm
                // Стрелка вниз для раскрытия списка  this.xPaymentFormArrowDown

                resOk = await ClickByXPath(this.page, this.xPaymentFormArrowDown);
                if (!resOk) {
                    throw `FAIL => Селект "Форма оплаты" Стрелка вниз для раскрытия списка ClickByXPath(${this.xPaymentFormArrowDown})`;
                }
                // Вводим "Форма оплаты"
                if (CT === 1) {
                    resOk = await SetTextByXPath(this.page, this.xSelectPaymentForm, this.DealData.ClientFreights[N].PaymentForm);
                }else{
                    resOk = await SetTextByXPath(this.page, this.xSelectPaymentForm, this.DealData.TransporterFreights[N].PaymentForm);
                }

                if (!resOk) {
                    throw `FAIL => Вводим "Форма оплаты" SetTextByXPath(${this.xSelectPaymentForm})`;
                }
                // ДропДаун с нужной строкой + `[contains(text(), "${XXX}")]`
                if (CT === 1) {
                    xTemp = this.xPaymentFormDropDownNeedStr + `[contains(text(), "${this.DealData.ClientFreights[N].PaymentForm}")]`;
                }else{
                    xTemp = this.xPaymentFormDropDownNeedStr + `[contains(text(), "${this.DealData.TransporterFreights[N].PaymentForm}")]`;
                }

                resOk = await ClickByXPath(this.page, xTemp);
                if (!resOk) {
                    throw `FAIL => Селект "Форма оплаты" ДропДаун с нужной строкой ClickByXPath(${xTemp})`;
                }
                // Подождать пока закроется дроп даун
                await WaitRender(this.page);
                // Селект "Доп. условие оплаты" this.xSelectAdditionalConditionPayment
                // Селект "Доп. условие оплаты" Стрелка вниз для раскрытия списка
                resOk = await ClickByXPath(this.page, this.xAdditionalConditionPaymentArrowDown);
                if (!resOk) {
                    throw `FAIL => Селект "Доп. условие оплаты" Стрелка вниз для раскрытия списка ClickByXPath(${this.xAdditionalConditionPaymentArrowDown})`;
                }
                // Вводим "Доп. условие оплаты"
                if (CT === 1) {
                    resOk = await SetTextByXPath(this.page, this.xSelectAdditionalConditionPayment, this.DealData.ClientFreights[N].AdditionalConditionPayment);
                }else{
                    resOk = await SetTextByXPath(this.page, this.xSelectAdditionalConditionPayment, this.DealData.TransporterFreights[N].AdditionalConditionPayment);
                }
                if (!resOk) {
                    throw `FAIL => Вводим "Доп. условие оплаты" SetTextByXPath(${this.xSelectAdditionalConditionPayment})`;
                }
                // ДропДаун с нужной строкой + `[contains(text(), "${XXX}")]` `[text()="${XXX}"]`
                if (CT === 1) {
                    xTemp = this.xAdditionalConditionPaymentDropDownNeedStr + `[text()="${this.DealData.ClientFreights[N].AdditionalConditionPayment}"]`;
                }else{
                    xTemp = this.xAdditionalConditionPaymentDropDownNeedStr + `[text()="${this.DealData.TransporterFreights[N].AdditionalConditionPayment}"]`;
                }
                resOk = await ClickByXPath(this.page, xTemp);
                if (!resOk) {
                    throw `FAIL => Селект "Доп. условие оплаты" ДропДаун с нужной строкой ClickByXPath(${xTemp})`;
                }
                // Подождать пока закроется дроп даун
                await WaitRender(this.page);
                // Кнопка "Сохранить" Активная
                resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xAddFreightButtonSaveActive);
                if (!resOk) {
                    throw `FAIL => Кнопка "Сохранить" Активная WaitForElementIsPresentByXPath(${this.xAddFreightButtonSaveActive})`;
                }
                resOk = await ClickByXPath(this.page, this.xAddFreightButtonSaveActive);
                if (!resOk) {
                    throw `FAIL => Кнопка "Сохранить" Активная ClickByXPath(${this.xAddFreightButtonSaveActive})`;
                }
                if (CT === 1) {
                    await console.log('\x1b[38;5;2m\t', `Добавлен фрахт Заказчика ${this.DealData.ClientFreights[N].Amount} грн. ${this.DealData.ClientFreights[N].PaymentForm}  - OK`, '\x1b[0m');
                }else {
                    await console.log('\x1b[38;5;2m\t', `Добавлен фрахт Заказчика ${this.DealData.TransporterFreights[N].Amount} грн. ${this.DealData.TransporterFreights[N].PaymentForm}  - OK`, '\x1b[0m');
                }
                // Подождать пока закроется Модалка
                 await WaitRender(this.page);

            }// for(N = 0; N < QFreights; N++ )  --------------------------------------------

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in AddAllClientOrTransporterFreights`);
            return false;
        }
    }//async AddAllClientOrTransporterFreights() //1 or 2
    //----------------------------------------
    async EnterTransporterCompany() {
        let resOk, resOk2;
        let ColStr = 0;
        let InText = ``;
        try {
            //----------------------------------------------------------
            // Филдсет "Компания перевозчика *"
            await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectTransporterCompany);
            resOk = await ClickByXPathWithScroll(500, this.page, this.xSelectTransporterCompany);
            if (!resOk) {
                throw `FAIL => Инпут "Компания перевозчика *" ClickByXPath(${this.xSelectTransporterCompany})`;
            }
            // подождать пока будет активен Селект "Компания перевозчика *"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectTransporterCompanyActive);
            if (!resOk) {
                throw `FAIL => НЕ активен Селект "Компания перевозчика *" WaitForElementIsPresentByXPath(${this.xSelectTransporterCompanyActive})`;
            }
            //await WaitRender(this.page);
            //await this.page.waitFor(5000);
            resOk = await SetTextByXPath(this.page, this.xInputTransporterCompany, this.DealData.strTransporterCompanyName);
            if (!resOk) {
                throw `FAIL => Инпут "Компания перевозчика *" SetTextByXPath(${this.xInputTransporterCompany})`;
            }
            // Спиннер ОК НЕ Активный
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xTransporterCompanySpinnerNone);
            if (!resOk) {
                throw `FAIL => Спиннер ОК НЕ Активный WaitForElementIsPresentByXPath(${this.xTransporterCompanySpinnerNone})`;
            }
            //await this.page.waitFor(200);
            // DropDown "Компания перевозчика *" с нужной строкой
            await WaitForElementIsPresentByXPath(4000, this.page, this.xDropDownTransporterCompany);
            resOk = await ClickByXPath(this.page, this.xDropDownTransporterCompany);
            if (!resOk) {
                throw `FAIL => DropDown "Компания перевозчика *" с нужной строкой ClickByXPath(${this.xDropDownTransporterCompany})`;
            }
            //await WaitRender(this.page);
            // Линк на Компанию перевозчика
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xLinkTransporterCompany);
            if (!resOk) {
                throw `FAIL => НЕ вижу Линк на Компанию перевозчика WaitForElementIsPresentByXPath(${this.xLinkTransporterCompany})`;
            }
            // await WaitRender(this.page);
            // await this.page.waitFor(1000);
            // После выбора Компании ждём пока скроется Нотификация
            // "Создайте хотя бы 1 договор для выбора юр. лица!"
            // this.xNoClientsContract = this.xSectionDataOfClients + `//span[contains(text(), "Создайте хотя бы 1 договор для выбора юр. лица!")]`;
            // this.xNoClientsContractDisabled = this.xNoClientsContract + `[@style="display: none;"]`;
            //await console.log(`xPath=${this.xNoClientsContractDisabled}`);
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xNoTransporterContractDisabled);
            if (!resOk) {
                let TxtErr = `FAIL => У Компании перевозчика отсутствует Договор !!! \n`;
                TxtErr+= `FAIL => НЕ вижу ПРОПАВШЕЙ надписи "Создайте хотя бы 1 договор для выбора юр. лица!" \n`;
                TxtErr+= `FAIL => WaitForElementIsPresentByXPath(${this.xNoTransporterContractDisabled})`;
                throw TxtErr;
            }


            // Автовыбор Юр. лицо (с Перевозчик) ( без  [contains(text(), '${this.DealData.strOurCompanyWithTransporter}')])
            // Автовыбор Юр. лицо (с Перевозчик)

            resOk = await ElementIsPresent(this.page, this.xSelectedOurCompanyTransporterGetText);
            if (resOk) {
                InText = await ElementGetInnerText(this.page, 0, this.xSelectedOurCompanyTransporterGetText);
                await InText.trim();

                if (InText !== `` && !await SubStrIsPresent(this.DealData.strOurCompanyWithTransporter, InText)) {
                    throw `FAIL => Перевозчик Автовыбор Нашей компании InText(${InText})!==(${this.DealData.strOurCompanyWithTransporter})`;
                }
            } //  throw `FAIL => Автовыбор Юр. лицо (с Перевозчиком) WaitForElementIsPresentByXPath(${this.xSelectedOurCompanyTransporterGetText})`;
            if (InText === ``) { // если не Автовыбралась Наша компания проверим ДропДаун
                // клик по
                // Перевозчик стрелка вниз раскрытие Дроп дауна "Юр. лицо"
                resOk2 = await ClickByXPath(this.page, this.xDropDownOurCompanyWithTransporterArrowDown);
                if (!resOk2) {
                    throw `FAIL => Перевозчик стрелка вниз раскрытие Дроп дауна "Юр. лицо" ClickByXPath(${this.xDropDownOurCompanyWithTransporterArrowDown})`;
                }
                await WaitRender(this.page);

                // Проверим, что строк больше Одной (если бы была одна то должен был сработать Автовыбор)
                // Перевозчик ДропДаун "Юр. лицо" строки
                resOk2 = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownOurCompaniesWithTransporter);
                if (!resOk2) {
                    throw `FAIL => Перевозчик ДропДаун "Юр. лицо" строки WaitForElementIsPresentByXPath(${this.xDropDownOurCompaniesWithTransporter})`;
                }

                ColStr = await ElementGetLength(this.page, this.xDropDownOurCompaniesWithTransporter);
                if (ColStr === 1){
                    await console.log(`WARNING - Не сработал АвтоВыбор Нашей компании с Перевозчиком ColStr=${ColStr}`);
                    await this.page.screenshot({path: g_PathSS + `screenshot_AutoSelectOurCompanyTransporter.png`, fullPage: true });
                    await console.log(` Скриншот: (screenshot_AutoSelectOurCompanyTransporter.png)`);
                }
                // ДропДаун Перевозчик "Юр. лицо" Нужная строка
                resOk2 = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownOurCompanyWithTransporterStr);
                if (!resOk2) {
                    await console.log(` !!! Перевозчик Не вижу договора с ${this.DealData.strOurCompanyWithTransporter}`);
                    throw `FAIL => ДропДаун Перевозчик "Юр. лицо" Нужная строка WaitForElementIsPresentByXPath(${this.xDropDownOurCompanyWithTransporterStr})`;
                }
                // Клик ДропДаун Перевозчик "Юр. лицо" Нужная строка
                resOk2 = await ClickByXPath(this.page, this.xDropDownOurCompanyWithTransporterStr);
                if (!resOk2) {
                    throw `FAIL => ДропДаун Перевозчик "Юр. лицо" Нужная строка ClickByXPath(${this.xDropDownOurCompanyWithTransporterStr})`;
                }

            }// if (!resOk) { // если не Автовыбралась Наша компания проверим ДропДаун
            let tempHref = await ElementGetHref(this.page, 0 , this.xLinkTransporterCompany);
            if (tempHref === ``){
                await console.log('\x1b[38;5;1m\t', `Линк на Компанию перевозчика (${this.xLinkTransporterCompany}) - FAIL !!!`, '\x1b[0m');
            }else{
                await console.log('\x1b[38;5;2m\t', `Линк на Компанию перевозчика (${tempHref}) - OK`, '\x1b[0m');
            }

            await console.log('\x1b[38;5;2m\t', `Компания Перевозчика (${this.DealData.strTransporterCompanyName}) - OK`, '\x1b[0m');
            await console.log('\x1b[38;5;2m\t', `Наше "Юр. лицо" с компанией Перевозчика (${this.DealData.strOurCompanyWithTransporter}) - OK`, '\x1b[0m');
            await WaitRender(this.page);





            return true;
        } catch (e) {
            await this.page.screenshot({path: g_PathSS + `screenshot_EnterTransporterCompany.png`, fullPage: true });
            await console.log(` Скриншот: (screenshot_EnterTransporterCompany.png)`);
            await console.log(`${e} \n FAIL in EnterTransporterCompany`);
            return false;
        }
    }//async EnterTransporterCompany()

    //----------------------------------------
    async EnterDriver() {
        let resOk;
        let resAutoSelDrv;
        let QDriverStrings;
        try {
            // await console.log(`strDriverFullName=(${this.DealData.strDriverFullName})`);
            // await console.log(`strDriverPhone=(${this.DealData.strDriverPhone})`);

            // ТОЛЬКО ПОСЛЕ нашего Юр лица с перевозом, иначе маркеры не сработают
            await WaitRender(this.page);
            // Селект "ФИО водителя"
            // подождать пока будет Активен Альтернативный элемент Селект "ФИО водителя"

            // Альтернативный элемент Селект "ФИО водителя"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInput2DriverActive);
            if (!resOk) {
                throw `FAIL => Активен Селект "ФИО водителя" WaitForElementIsPresentByXPath(${this.xInput2DriverActive})`;
            }
            // Выбранный Водитель
            resAutoSelDrv = await WaitForElementIsPresentByXPath(1000, this.page, this.xSelectedDriver);
            if (!resAutoSelDrv) { // если не автовыбрался, значит Водил больше ОДНОГО
                // Стелка вниз для раскрытия списка Водителей
                resOk = await ClickByXPath(this.page, this.xArrowDownListDrivers);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для раскрытия списка Водителей ClickByXPath(${this.xArrowDownListDrivers})`;
                }
                // Раскрытый Список Водителей
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xOpenedListDrivers);
                if (!resOk) {
                    throw `FAIL => Раскрытый Список Водителей WaitForElementIsPresentByXPath(${this.xOpenedListDrivers})`;
                }
                // DropDown "ФИО водителя" строки
                QDriverStrings = await ElementGetLength(this.page, this.xDropDownDriverStrings);
                if (QDriverStrings === 1){
                    await console.log('\x1b[38;5;2m\t', `Warning => Автовыбор Водителя (${this.DealData.strDriverFullName}) Не сработал , Хотя в Компании ТОЛЬКО ОДИН Водитель !!!`, '\x1b[0m');
                }
                //await console.log(`QDriverStrings=${QDriverStrings}`);
                // DropDown "ФИО водителя" с нужной строкой
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownDriverNeedStr);
                if (!resOk) {
                    throw `FAIL => DropDown "ФИО водителя" с нужной строкой WaitForElementIsPresentByXPath(${this.xDropDownDriverNeedStr})`;
                }
                //await WaitRender(this.page);
                // Селект "ФИО водителя"
                resOk = await SetTextByXPath(this.page, this.xInputDriver, this.DealData.strDriverFullName);
                if (!resOk) {
                    throw `FAIL => Селект "ФИО водителя" SetTextByXPath(${this.xInputDriver})`;
                }
                //await WaitRender(this.page);
                // DropDown "ФИО водителя" с нужной строкой Подсвеченной
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownDriverNeedStrHighlight);
                if (!resOk) {
                    throw `FAIL => DropDown "ФИО водителя" с нужной строкой Подсвеченной WaitForElementIsPresentByXPath(${this.xDropDownDriverNeedStrHighlight})`;
                }
                resOk = await ClickByXPath(this.page, this.xDropDownDriverNeedStrHighlight);
                if (!resOk) {
                    throw `FAIL => DropDown "ФИО водителя" с нужной строкой Подсвеченной ClickByXPath(${this.xDropDownDriverNeedStrHighlight})`;
                }else {
                    await console.log('\x1b[38;5;2m\t', `Выбор Водителя (${this.DealData.strDriverFullName}) - OK`, '\x1b[0m');
                }

            }else { // Проверить что в ДропДауне ТОЛЬКО ОДНА строка
                // Стелка вниз для раскрытия списка Водителей
                resOk = await ClickByXPath(this.page, this.xArrowDownListDrivers);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для раскрытия списка Водителей ClickByXPath(${this.xArrowDownListDrivers})`;
                }
                // await this.page.waitFor(2000);
                // Раскрытый Список Водителей
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xOpenedListDrivers);
                if (!resOk) {
                    throw `FAIL => Раскрытый Список Водителей WaitForElementIsPresentByXPath(${this.xOpenedListDrivers})`;
                }
                // DropDown "ФИО водителя" строки
                QDriverStrings = await ElementGetLength(this.page, this.xDropDownDriverStrings);
                if (QDriverStrings === 1){
                    await console.log('\x1b[38;5;2m\t', `Автовыбор Водителя (${this.DealData.strDriverFullName}) - OK`, '\x1b[0m');
                }else {
                    await console.log('\x1b[38;5;2m\t', `Warning => Автовыбор Водителя (${this.DealData.strDriverFullName}) сработал , Хотя в Компании ${QDriverStrings} Водителя !!!`, '\x1b[0m');
                }
                // Стелка вниз для закрытия списка Водителей
                resOk = await ClickByXPath(this.page, this.xArrowDownListDrivers);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для закрытия списка Водителей ClickByXPath(${this.xArrowDownListDrivers})`;
                }
            }
            // Проверим Линк на Водителя
            let tempHref = await ElementGetHref(this.page, 0 , this.xLinkDriver);
            if (tempHref === ``){
                await console.log('\x1b[38;5;1m\t', `Линк на Водителя (${this.xLinkDriver}) - FAIL !!!`, '\x1b[0m');
            }else{
                await console.log('\x1b[38;5;2m\t', `Линк на Водителя (${tempHref}) - OK`, '\x1b[0m');
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterDriver`);
            return false;
        }
    }//async EnterDriver()
    //----------------------------------------
    async EnterVehicle() {
        let resOk;
        let resAutoSelVehicle;
        let QVehicleStrings;
        try {
            // await console.log(`strLicensePlate1=(${this.DealData.strLicensePlate1})`);
            // await console.log(`strLicensePlate2=(${this.DealData.strLicensePlate2})`);

            // ТОЛЬКО ПОСЛЕ установки Водителя, иначе маркеры не сработают
            await WaitRender(this.page);

            // подождать пока будет Активен Инпут "Автомобиль *"

            // Инпут "Автомобиль *"
            // this.xInputVehicleDisabled
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputVehicleActive);
            if (!resOk) {
                throw `FAIL => Активен Инпут "Автомобиль *" WaitForElementIsPresentByXPath(${this.xInputVehicleActive})`;
            }
            // Выбранный Автомобиль
            resAutoSelVehicle = await WaitForElementIsPresentByXPath(1000, this.page, this.xSelectedVehicle);
            if (!resAutoSelVehicle) { // если не автовыбрался, значит Автомобилей больше ОДНОГО
                // Стелка вниз для раскрытия списка Автомобилей
                resOk = await ClickByXPath(this.page, this.xArrowDownListVehicles);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для раскрытия списка Автомобилей ClickByXPath(${this.xArrowDownListVehicles})`;
                }
                // Раскрытый Список Автомобилей
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xOpenedListVehicles);
                if (!resOk) {
                    throw `FAIL => Раскрытый Список Автомобилей WaitForElementIsPresentByXPath(${this.xOpenedListVehicles})`;
                }
                // DropDown "Автомобиль" строки
                QVehicleStrings = await ElementGetLength(this.page, this.xDropDownVehicleStrings);
                if (QVehicleStrings === 1){
                    await console.log('\x1b[38;5;2m\t', `Warning => Автовыбор Автомобиля (${this.DealData.xDropDownVehicleStrings}) Не сработал , Хотя у Водителя ТОЛЬКО ОДИН Автомобиль !!!`, '\x1b[0m');
                }
                //await console.log(`QVehicleStrings=${QVehicleStrings}`);
                // DropDown "Автомобиль" с нужной строкой
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownVehicleNeedStr);
                if (!resOk) {
                    throw `FAIL => DropDown "Автомобиль" с нужной строкой WaitForElementIsPresentByXPath(${this.xDropDownVehicleNeedStr})`;
                }else {
                    await console.log('\x1b[38;5;2m\t', `DropDown "Автомобиль" с нужной строкой (${this.DealData.strLicensePlate1}) - OK`, '\x1b[0m');
                }
                //await WaitRender(this.page);
                // Инпут "Автомобиль"
                resOk = await SetTextByXPath(this.page, this.xInputVehicleActive, this.DealData.strLicensePlate1);
                if (!resOk) {
                    throw `FAIL => Инпут "Автомобиль" SetTextByXPath(${this.xInputVehicleActive})`;
                }
                //await WaitRender(this.page);
                // DropDown "Автомобиль" с нужной строкой Подсвеченной
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownVehicleNeedStrHighlight);
                if (!resOk) {
                    throw `FAIL => DropDown "Автомобиль" с нужной строкой Подсвеченной WaitForElementIsPresentByXPath(${this.xDropDownVehicleNeedStrHighlight})`;
                }
                resOk = await ClickByXPath(this.page, this.xDropDownVehicleNeedStrHighlight);
                if (!resOk) {
                    throw `FAIL => DropDown "Автомобиль" с нужной строкой Подсвеченной ClickByXPath(${this.xDropDownVehicleNeedStrHighlight})`;
                }

            }else { // Проверить что в ДропДауне ТОЛЬКО ОДНА строка
                // Стелка вниз для раскрытия списка Автомобилей
                resOk = await ClickByXPath(this.page, this.xArrowDownListVehicles);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для раскрытия списка Автомобилей ClickByXPath(${this.xArrowDownListVehicles})`;
                }
                //await this.page.waitFor(2000);
                // Раскрытый Список Автомобилей
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xOpenedListVehicles);
                if (!resOk) {
                    throw `FAIL => Раскрытый Список Автомобилей WaitForElementIsPresentByXPath(${this.xOpenedListVehicles})`;
                }
                // DropDown "Автомобиль" строки
                QVehicleStrings = await ElementGetLength(this.page, this.xDropDownVehicleStrings);
                if (QVehicleStrings === 1){
                    await console.log('\x1b[38;5;2m\t', `Автовыбор Автомобиль (${this.DealData.strLicensePlate1}) - OK`, '\x1b[0m');
                }else{
                    await console.log('\x1b[38;5;2m\t', `Warning => Автовыбор Автомобиля (${this.DealData.xDropDownVehicleStrings}) Сработал , Хотя у Водителя ${QVehicleStrings} Автомобиля !!!`, '\x1b[0m');
                }
                // Закрыть ДропДаун "Автомобиль"
                // Стелка вниз для закрытия списка Автомобилей
                resOk = await ClickByXPath(this.page, this.xArrowDownListVehicles);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для закрытия списка Автомобилей ClickByXPath(${this.xArrowDownListVehicles})`;
                }
            }
            // Проверим Линк на Автомобиль
            let tempHref = await ElementGetHref(this.page, 0 , this.xLinkVehicle);
            if (tempHref === ``){
                await console.log('\x1b[38;5;1m\t', `Линк на Автомобиль (${this.xLinkVehicle}) - FAIL !!!`, '\x1b[0m');
            }else{
                await console.log('\x1b[38;5;2m\t', `Линк на Автомобиль (${tempHref}) - OK`, '\x1b[0m');
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterVehicle`);
            return false;
        }
    }//async EnterVehicle()
    //----------------------------------------
    async EnterTrailer() {
        let resOk;
        let resAutoSelTrailer;
        let QTrailerStrings;
        try {
            // await console.log(`strLicensePlate1=(${this.DealData.strLicensePlate1})`);
            // await console.log(`strLicensePlate2=(${this.DealData.strLicensePlate2})`);

            // ТОЛЬКО ПОСЛЕ установки Водителя, иначе маркеры не сработают
            await WaitRender(this.page);

            // подождать пока будет Активен Инпут "Автомобиль *"

            // Инпут "Прицеп"
            // this.xInputVehicleDisabled
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputTrailerActive);
            if (!resOk) {
                throw `FAIL => Активен Инпут "Прицеп" WaitForElementIsPresentByXPath(${this.xInputTrailerActive})`;
            }
            // Выбранный Прицеп
            resAutoSelTrailer = await WaitForElementIsPresentByXPath(1000, this.page, this.xSelectedTrailer);
            if (!resAutoSelTrailer) { // если не автовыбрался, значит Прицепов больше ОДНОГО
                // Стелка вниз для раскрытия списка Прицепов
                resOk = await ClickByXPath(this.page, this.xArrowDownListTrailers);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для раскрытия списка Прицепов ClickByXPath(${this.xArrowDownListTrailers})`;
                }
                // Раскрытый Список Прицепов
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xOpenedListTrailers);
                if (!resOk) {
                    throw `FAIL => Раскрытый Список Прицепов WaitForElementIsPresentByXPath(${this.xOpenedListTrailers})`;
                }
                // DropDown "Прицеп" строки
                QTrailerStrings = await ElementGetLength(this.page, this.xDropDownTrailerStrings);
                if (QTrailerStrings === 1){
                    await console.log('\x1b[38;5;2m\t', `Warning => Автовыбор Прицепа (${this.DealData.xDropDownTrailerStrings}) Не сработал , Хотя у Водителя ТОЛЬКО ОДИН Прицеп !!!`, '\x1b[0m');
                }
                //await console.log(`QVehicleStrings=${QTrailerStrings}`);
                // DropDown "Прицеп" с нужной строкой
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownTrailerNeedStr);
                if (!resOk) {
                    throw `FAIL => DropDown "Прицеп" с нужной строкой WaitForElementIsPresentByXPath(${this.xDropDownTrailerNeedStr})`;
                }else {
                    await console.log('\x1b[38;5;2m\t', `DropDown "Прицеп" с нужной строкой (${this.DealData.strLicensePlate2}) - OK`, '\x1b[0m');
                }
                //await WaitRender(this.page);
                // Инпут "Прицеп"
                resOk = await SetTextByXPath(this.page, this.xInputTrailerActive, this.DealData.strLicensePlate2);
                if (!resOk) {
                    throw `FAIL => Инпут "Прицеп" SetTextByXPath(${this.xInputTrailerActive})`;
                }
                //await WaitRender(this.page);
                // DropDown "Прицеп" с нужной строкой Подсвеченной
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownTrailerNeedStrHighlight);
                if (!resOk) {
                    throw `FAIL => DropDown "Прицеп" с нужной строкой Подсвеченной WaitForElementIsPresentByXPath(${this.xDropDownTrailerNeedStrHighlight})`;
                }
                resOk = await ClickByXPath(this.page, this.xDropDownTrailerNeedStrHighlight);
                if (!resOk) {
                    throw `FAIL => DropDown "Прицеп" с нужной строкой Подсвеченной ClickByXPath(${this.xDropDownTrailerNeedStrHighlight})`;
                }

            }else { // Проверить что в ДропДауне ТОЛЬКО ОДНА строка
                // Стелка вниз для раскрытия списка Прицепов
                resOk = await ClickByXPath(this.page, this.xArrowDownListTrailers);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для раскрытия списка Прицепов ClickByXPath(${this.xArrowDownListTrailers})`;
                }
                //await this.page.waitFor(2000);
                // Раскрытый Список Прицепов
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xOpenedListTrailers);
                if (!resOk) {
                    throw `FAIL => Раскрытый Список Прицепов WaitForElementIsPresentByXPath(${this.xOpenedListTrailers})`;
                }
                // DropDown "Прицеп" строки
                QTrailerStrings = await ElementGetLength(this.page, this.xDropDownTrailerStrings);
                if (QTrailerStrings === 1){
                    await console.log('\x1b[38;5;2m\t', `Автовыбор Прицеп (${this.DealData.strLicensePlate2}) - OK`, '\x1b[0m');
                }else{
                    await console.log('\x1b[38;5;2m\t', `Warning => Автовыбор Прицепа (${this.DealData.xDropDownTrailerStrings}) Сработал , Хотя у Водителя ${QTrailerStrings} Прицепа !!!`, '\x1b[0m');
                }
                // Закрыть ДропДаун "Прицеп"
                // Стелка вниз для закрытия списка Прицепов
                resOk = await ClickByXPath(this.page, this.xArrowDownListTrailers);
                if (!resOk) {
                    throw `FAIL => Стелка вниз для закрытия списка Прицепов ClickByXPath(${this.xArrowDownListTrailers})`;
                }
            }
            // Проверим Линк на Прицеп
            let tempHref = await ElementGetHref(this.page, 0 , this.xLinkTrailer);
            if (tempHref === ``){
                await console.log('\x1b[38;5;1m\t', `Линк на Прицеп (${this.xLinkTrailer}) - FAIL !!!`, '\x1b[0m');
            }else{
                await console.log('\x1b[38;5;2m\t', `Линк на Прицеп (${tempHref}) - OK`, '\x1b[0m');
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterTrailer`);
            return false;
        }
    }//async EnterTrailer()
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
