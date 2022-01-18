//'use strict';
class Deal {
    constructor(browser, page, DealData) {
        this.browser = browser;
        this.page = page;
        this.DealData = DealData;
        // TopHeader
        this.xTopHeader = `//div[@id="crm-top-header"]`;
        // Пункт Верхнего Меню "Сделки"
        this.xMenuDeals = `//a[@href="/cfo"][contains(text(), "Сделки")]`;
        // Пункт Верхнего Меню "Сделки +" Плюс
        this.xMenuDealsPlus = `//a[@href="/crm/deal"][@class="info__add"]/div[@class="add-item"]`;
        // Секция Сделки
        this.xDealSection = `//section[@class="crm-view crm-view__deal"]`;
        // Хеадер
        this.xHeader = this.xDealSection + `//header[@class="crm-view__header"]`;
        // Заголовок "Создание сделки"
        this.xHeaderCreateDeal = this.xHeader + `//span[contains(text(), "Создание сделки")]`;
        // Сатус Сделки (InnerText)
        this.xDealStatusName = this.xHeader + `//div[@class="crm-select__single-replica"]/span`;
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
        this.xValidationCargoWeight = `//p[@class="validator-feedback__name"][contains(text(), "Тоннаж клиента")]`;
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
        //-------------------------
        // Кросс Док
        this.xCrossDoc = `//label[span[contains(text(),"Кросс Док")]]`;
        this.xCheckBoxCrossDoc = this.xCrossDoc + `/div[@class="control-indicator"]`;
        this.xCheckBoxValueCrossDoc = this.xCrossDoc + `/input[@type="checkbox"]`;
        // ФилдСет "Тип груза *"
        this.xFieldSetCargoType = `//fieldset[legend[contains(text(), "Тип груза")][span[@class="required"][contains(text(),"*")]]]`;
        // Выбранный Тип груза
        this.xSelectedCargoType = this.xFieldSetCargoType + `//div[@class="crm-select__single-replica"]/span`;
        // ФилдСет "Стоимость груза"
        this.xFieldSetCargoCost = `//fieldset[legend[contains(text(), "Стоимость груза")][span[@class="required"][contains(text(),"*")]]]`;
        // Инпут "Стоимость груза"
        this.xInputCargoCost = this.xFieldSetCargoCost + `//input[@name="Стоимость груза"]`;
        // ФилдСет "Тоннаж клиента *"
        this.xFieldSetCargoWeight = `//fieldset[legend[contains(text(), "Тоннаж клиента")][span[@class="required"][contains(text(),"*")]]]`;
        // Инпут "Тоннаж клиента *"
        this.xInputCargoWeight = this.xFieldSetCargoWeight + `//input[@name="Тоннаж клиента"]`;

        // Мониторинг (МЦ)
        this.xLevelMonitporingMC = this.xSectionDataOfClients + `//div[@class="bordered-single-select"][div[contains(text(), "Мониторинг (МЦ)")]]`;
        this.xSelectedLevelMonitporingMCGetText = this.xLevelMonitporingMC + `//span[@class="vs__selected"]`;
        // стрелка вниз раскрытие Дроп дауна "Мониторинг (МЦ)"
        this.xLevelMonitporingMCArrowDown = this.xLevelMonitporingMC + `//div[@class="vs__actions"]`;
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
        // Филд сет "Фрахт" --------------------------------------------------------
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
        // ФилСет "№ тел. топливо"
        this.xFieldSetNPhoneToplyvo = `//fieldset[legend[contains(text(), "№ тел. топливо")]]`;
        // Инпут "№ тел. топливо"
        this.xInputNPhoneToplyvo = this.xFieldSetNPhoneToplyvo + `//input[@name="№ тел. топливо"]`;
        // Номер Телефона Топливо !!!!
        // this.strNPhoneToplyvo = `380666188425`;
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
        // Фрахт Кнопка "Сохранить" -----------------------------
        this.xAddFreightButtonSaveDisabled = this.xModalAddFreight + `//button[contains(text(), "Сохранить")][@disabled="disabled"]`;
        this.xAddFreightButtonSaveActive = this.xModalAddFreight + `//button[contains(text(), "Сохранить") and not(contains(@disabled , "disabled"))]`;
        // Дополнительные поля
        this.xButtonAdditionalFields = `//div[@role="button"][contains(text(),"Дополнительные поля")][contains(text(),"2")]`;
        this.xButtonAdditionalFieldsCollapsed = this.xButtonAdditionalFields + `[@aria-expanded="false"]`;
        this.xButtonAdditionalFieldsExpanded = this.xButtonAdditionalFields + `[@aria-expanded="true"]`;
        // Инпут "Номер транспортировки"
        this.xInputNumberTransportation = `//fieldset[legend[contains(text(),"Номер транспортировки")]]//input[@name="Номер транспортировки"]`;
        // Филдсет "Номер вкладки" ----------------------------
        this.xFeildSetNumberInSet = `//fieldset[legend[contains(text(),"Номер вкладки")]]`;
        // Инпут "Номер вкладки"
        this.xInputInSet = this.xFeildSetNumberInSet + `//input[@placeholder="Выберите номер вкладки"]`;
        // Инпут "Номер вкладки" Выбранное значение (ElementGetInnerText)
        this.xInputInSetSelectedValue = this.xFeildSetNumberInSet + `//div[@class="crm-select__single-replica"]/span`;

        // "Номер вкладки" Стрелка вниз для раскрытия списка
        this.xArrowDownInSet = this.xFeildSetNumberInSet + `//div[@class="multiselect__select"]`;
        // Спиннер НЕ Активный в "Номер вкладки"
        this.xInSetSpinnerNotActive = this.xFeildSetNumberInSet + `//div[@class="multiselect__spinner"][@style="display: none;"]`;
        // "Номер вкладки" Раскрытый список
        this.xDropDownInSetActive = this.xFeildSetNumberInSet + `//div[@class="multiselect__content-wrapper"][not(contains(@style,"display: none;"))]`;
        // "Номер вкладки" в Раскрытом списке Нужная строка + [contains(text(), "${XXX}")] или [text()="${XXX}"]
        this.xDropDownInSetNeedStr = this.xFeildSetNumberInSet + `//li/span[contains(@class,"highlight")]/span`;





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
        // Филдсет "Адрес и дата загрузки"
        this.xFieldSetAddressLoading = `//fieldset[legend[contains(text(),"Адрес и дата загрузки")]]`;
        // Кнопка "Изменить" в "Адрес и дата загрузки"
        this.xButtonChangeLoading = this.xFieldSetAddressLoading + `//div[@role="button"][contains(text(),"Изменить")]`;
        // Модалка "Маршрут"
        this.xModalMarshrut = `//div[@id="deal-address-control"]`;
        // Заголовок "Маршрут"
        this.xHeaderMarshrut = this.xModalMarshrut + `//h3[contains(text(),"Маршрут")]`;
        // Кнопка "Добавить загрузку"
        this.xButtonAddLoading = this.xModalMarshrut + `//button[contains(text(),"Добавить загрузку")]`;
        // Кнопка "Добавить выгрузку"
        this.xButtonAddUnLoading = this.xModalMarshrut + `//button[contains(text(),"Добавить выгрузку")]`;
        // Класс ДейтПикер
        this.xClassDatePicker = `//div[@class="flatpickr-wrapper"]`;
        // Дата Загрузки (Num)
        this.xDateLoading = `//input[@placeholder="Дата загрузки"]`;
        // Раскрытый Дейт Пикер "Дата загрузки"
        this.xDateLoadingPickerActive = this.xClassDatePicker+ `[input[@placeholder="Дата загрузки"][@class="flatpickr-input active"]]`;
        // Выезд с загрузки (Num)
        this.xDateExitLoading = `//input[@placeholder="Выезд с загрузки"]`;
        // Раскрытый Дейт Пикер "Выезд с загрузки"
        this.xDateExitLoadingPickerActive = this.xClassDatePicker+ `[input[@placeholder="Выезд с загрузки"][@class="flatpickr-input active"]]`;
        // Дата Выгрузки (Num)
        this.xDateUnLoading = `//input[@placeholder="Дата выгрузки"]`;
        // Раскрытый Дейт Пикер "Дата выгрузки"
        this.xDateUnLoadingPickerActive = this.xClassDatePicker+ `[input[@placeholder="Дата выгрузки"][@class="flatpickr-input active"]]`;
        // Выезд с выгрузки (Num)
        this.xDateExitUnLoading = `//input[@placeholder="Выезд с выгрузки"]`;
        // Раскрытый Дейт Пикер "Выезд с выгрузки"
        this.xDateExitUnLoadingPickerActive = this.xClassDatePicker+ `[input[@placeholder="Выезд с выгрузки"][@class="flatpickr-input active"]]`;
        // Мувер Адресов
        this.xMoover = `//div[contains(@class, "addresses-mover__item")]`;
        // Мувер "Загрузка" (Num)
        this.xMoverLoading = this.xMoover + `[/div/div/div[@title="Загрузка"]]/div/div[@class="mover"]`;
        this.xSVGMover = this.xMoover + `/div[@class="options"]/div[@class="mover"]`;
        // Селект Тип "Загрузка"
        this.xSelTypeLoading = this.xMoover + `//div[contains(@class, "location-category-select")][div[span[contains(text(), "Загрузка")]]]//div[@class="multiselect__select"]`;
        // Инпут "Загрузка" (Num)
        this.xClassLoading = `//div[@class="address-control-item"][div/div/div[@title="Загрузка"]]`;// /span[contains(text(),"Выгрузка")]
        this.xMultiSelectLoading = this.xClassLoading + `//div[@class="multiselect__tags"][input[@placeholder="Выберите или введите"]]`;
        this.xInputLoading = this.xClassLoading + `//input[@placeholder="Выберите или введите"]`;
        // ДропДаун "Загрузка" раскрытый
        this.xDropDownLoadingReady = this.xClassLoading + `//div[@class="multiselect__content-wrapper"][not(contains(@style , "display: none"))]`;
        // В "Загрузка" Дропдаун пункт "Поиск по базе данных"
        this.xLoadingButtonFindInBase = this.xDropDownLoadingReady + `//button[contains(text(),"Поиск по базе данных")]`;
        //*[@id="deal-address-control"]/div/main/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div[1]/div/div/div[3]/ul/button

        // Нужная строка ДропДаун "Загрузка" + [contains(text(),"${XXX}")]
        //this.xDropDownLoadingNeedStr = this.xClassLoading + `//li[@class="multiselect__element"]/span[contains(@class,"highlight")]/span`;
        this.xDropDownLoadingNeedStr = `//li[@class="multiselect__element"]/span[contains(@class,"highlight")]/span`;
        // Селект Тип "Выгрузка"
        this.xSelTypeUnLoading = this.xMoover + `//div[contains(@class, "location-category-select")][div[span[contains(text(), "Выгрузка")]]]//div[@class="multiselect__select"]`;
        // Инпут "Выгрузка" (Num)
        this.xClassUnLoading = `//div[@class="address-control-item"][div/div/div[@title="Выгрузка"]]`;
        this.xMultiSelectUnLoading = this.xClassUnLoading + `//div[@class="multiselect__tags"][input[@placeholder="Выберите или введите"]]`;
        this.xInputUnLoading = this.xClassUnLoading + `//input[@placeholder="Выберите или введите"]`;
        // ДропДаун "Выгрузка" раскрытый
        this.xDropDownUnLoadingReady = this.xClassUnLoading + `//div[@class="multiselect__content-wrapper"][not(contains(@style , "display: none"))]`;
        // В "Выгрузка" Дропдаун пункт "Поиск по базе данных"
        this.xUnLoadingButtonFindInBase = this.xDropDownUnLoadingReady + `//button[contains(text(),"Поиск по базе данных")]`;
        // Нужная строка ДропДаун "Выгрузка" + [contains(text(),"${XXX}")]
        this.xDropDownUnLoadingNeedStr = `//li[@class="multiselect__element"]/span[contains(@class,"highlight")]/span`;


        // Кнопка "Сохранить адреса"
        this.xButtonSaveAddresses = this.xModalMarshrut + `//button[contains(text(),"Сохранить адреса")]`;
        this.xButtonSaveAddressesDisabled = this.xButtonSaveAddresses + `[@disabled="disabled"]`;
        this.xButtonSaveAddressesActive = this.xButtonSaveAddresses + `[not(contains(@disabled , "disabled"))]`;
        //  Комментарий к загрузке
        this.xButtonCommentLoadind = `//div[contains(text(), "Комментарий к загрузке")]`;
        // Текст Ареа "Комментарий к загрузке" Раскрытый
        this.xTextAreaCommentLoadind = `//div[@id="loading-collapse-point"][@class="collapse show"]//textarea`;
        //  Комментарий к выгрузке
        this.xButtonCommentUnLoadind = `//div[contains(text(), "Комментарий к выгрузке")]`;
        // Текст Ареа "Комментарий к выгрузке" Раскрытый
        this.xTextAreaCommentUnLoadind = `//div[@id="unloading-collapse-point"][@class="collapse show"]//textarea`;
        //Филдсет "Ответственный по фоксу"
        this.xFieldSetResponsibleFOX = `//fieldset[legend[contains(text(),"Ответственный по фоксу")]]`;
        // "Ответственный по фоксу" Стрелка Вниз для раскрытия списка
        this.xResponsibleArrowDown = this.xFieldSetResponsibleFOX + `//div[@class="multiselect__select"]`;
        // Инпут "Ответственный по фоксу"
        this.xInputResponsible = `//input[@placeholder="Выберите ответсвенного по фоксу"]`;
        // Раскрытый ДропДаун "Ответственный по фоксу"
        this.xDropDownResponsible = this.xFieldSetResponsibleFOX + `//div[@class="multiselect__content-wrapper"][not(contains(@style , "display: none;"))]`;
        this.xDropDownResponsibleNotDisplayed = this.xFieldSetResponsibleFOX + `//div[@class="multiselect__content-wrapper"][contains(@style , "display: none;")]`;
        // Нужная строка ДропДаун "Ответственный по фоксу" + [contains(text(),"${XXX}")]
        this.xDropDownResponsibleNeedStr = `//li[@class="multiselect__element"]/span[contains(@class,"highlight")]/span`;

        //Филдсет "Логист"
        this.xFieldSetLogist = `//fieldset[legend[contains(text(),"Логист")]]`;
        // "Ответственный по фоксу" Стрелка Вниз для раскрытия списка
        this.xLogistArrowDown = this.xFieldSetLogist + `//div[@class="multiselect__select"]`;
        // Инпут "Логист"
        this.xInputLogist = `//input[@placeholder="Выберите логиста"]`;
        // Раскрытый ДропДаун "Логист"
        this.xDropDownLogist = this.xFieldSetLogist + `//div[@class="multiselect__content-wrapper"][not(contains(@style , "display: none;"))]`;
        this.xDropDownLogistNotDisplayed = this.xFieldSetLogist + `//div[@class="multiselect__content-wrapper"][contains(@style , "display: none;")]`;
        // Нужная строка ДропДаун "Логист" + [contains(text(),"${XXX}")]
        this.xDropDownLogistNeedStr = `//li[@class="multiselect__element"]/span[contains(@class,"highlight")]/span`;

        //BEGIN -- Заявка с Перевозчиком ----------------
        // секция Перевозчика "Создать заявку"
        this.xCreateOrder = this.xSectionDataOfTransporter + `//div[contains(text(),"Создать заявку")]`;
        // Заголовок "Создание заявки с перевозчиком"
        this.xHeaderCreateOrderTransporter = `//span[@class="title"][contains(text(),"Создание заявки с перевозчиком")]`;
        // "Создание заявки с перевозчиком" кнопка "Создать" Активная
        this.xButtonCreateOrderActive = `//button[@type="submit"][contains(text(),"Создать")][not(contains(@disabled, "disabled"))]`;
        // -- END --- Заявка с Перевозчиком ----
        // Время первого прозвона
        this.xFieldSetFirstCallTime = `//fieldset[legend[contains(text(),"Время первого прозвона")]]`;
        this.xFirstCallTimeWrapper = this.xFieldSetFirstCallTime + `//div[@class="fox-book-time-input__wrapper"]`;
        this.xFirstCallTimeInput = this.xFirstCallTimeWrapper + `/div[@id="fox-book-time-input-target"]`;
        this.xFirstCallTimeButton = this.xFieldSetFirstCallTime + `//button[contains(text(),"Подтвердить")]`;
        this.xFirstCallTimeButtonActive = this.xFirstCallTimeButton + `[not(contains(@disabled, "disabled"))]`;

        this.xFirstCallTimePresentDay = this.xFieldSetFirstCallTime + `//div[@class="sub-title"]`;

        this.xFirstCallTimeItemActive = this.xFieldSetFirstCallTime + `//div[@class="book-time-picker__item"][not(contains(@class , "disabled"))]`;
        // Скролл на час
        this.xFirstCallTimeHourAdd = this.xFieldSetFirstCallTime + `//div[@class="handle-change-hours-btn add"]`;
        // Скролл на День
        this.xFirstCallTimeDayAdd = this.xFieldSetFirstCallTime + `//div[@class="handle-date-btn add"]`;


        // Сделка Кнопка "Сохранить" Активная
        this.xButtonDealSaveActive = `//div[contains(@class , "text-center")][button[contains(text(),"Сохранить и остаться")]]`;
        this.xButtonDealSaveActive+= `/button[contains(text(),"Сохранить") and not(contains(text(),"Сохранить и остаться"))][not(contains(@disabled , "disabled"))]`;
        // Сделка Кнопка "Сохранить" Disabled
        this.xButtonDealSaveDisabled = `//div[contains(@class , "text-center")][button[contains(text(),"Сохранить и остаться")]]`;
        this.xButtonDealSaveDisabled+= `/button[contains(text(),"Сохранить") and not(contains(text(),"Сохранить и остаться"))][contains(@disabled , "disabled")]`;
        // Сделка Кнопка "Сохранить и остаться" Активная
        this.xButtonDealSaveAndStayActive = `//button[contains(text(),"Сохранить и остаться")][not(contains(@disabled , "disabled"))]`;
        // Сделка Кнопка "Сохранить и остаться" Disabled
        this.xButtonDealSaveAndStayDisabled = `//button[contains(text(),"Сохранить и остаться")][contains(@disabled , "disabled")]`;
        // Таблица Сделок Готова
        this.xTableDeals = `//div[@class="speedyTable"]`;
        this.xTableDealsBusy = this.xTableDeals + `[//span[@class="spinner-border"]]`;


        // Счётчик вызова Дат в Адресах
        this.CounterCallDate = 0;

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
            // // Кнопка "Отдел продаж" Выбрана // Должен быть пермишен "Выбор отдела в сделке"
            // resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xButtonSalesDepartmentSelected);
            // if (!resOk) {
            //     throw `FAIL => Кнопка "Отдел продаж" Выбрана WaitForElementIsPresentByXPath(${this.xButtonSalesDepartmentSelected})`;
            // }
            // // Кнопка "Транспортный отдел" НЕ выбрана
            // resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xButtonTransportationDepartmentNotSelected);
            // if (!resOk) {
            //     throw `FAIL => Кнопка "Транспортный отдел" НЕ выбрана WaitForElementIsPresentByXPath(${this.xButtonTransportationDepartmentNotSelected})`;
            // }
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
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidationCargoWeight);
            if(!resOk){
                resErrorText+= `FAIL => Нет валидации "Тоннаж клиента" ${this.xValidationCargoWeight} \n`;
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
                // throw `FAIL => НЕ вижу Линк на Компанию Заказчика WaitForElementIsPresentByXPath(${this.xLinkClientCompany})`;
                await console.log('\x1b[38;5;1m\t', `Линк на Компанию Заказчика WaitForElementIsPresentByXPath(${this.xLinkClientCompany}) - FAIL !!!`, '\x1b[0m');
            }
            // await WaitRender(this.page);
            // await this.page.waitFor(1000);
            // После выбора Компании ждём пока скроется Нотификация
            // "Создайте хотя бы 1 договор для выбора юр. лица!"
            // this.xNoClientsContract = this.xSectionDataOfClients + `//span[contains(text(), "Создайте хотя бы 1 договор для выбора юр. лица!")]`;
            // this.xNoClientsContractDisabled = this.xNoClientsContract + `[@style="display: none;"]`;
            //await console.log(`xPath=${this.xNoClientsContractDisabled}`);
            resOk = await WaitForElementIsPresentByXPath(21000, this.page, this.xNoClientsContractDisabled);
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

            await console.log('\x1b[38;5;2m\t', `Компания Заказчика (${this.DealData.strClientCompanyName}) - OK`, '\x1b[0m');
            await console.log('\x1b[38;5;2m\t', `Наше "Юр. лицо" с компанией Заказчика (${this.DealData.strOurCompanyWithClient}) - OK`, '\x1b[0m');
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
    async EnterCrossDoc() { // Кросс Док
        let resOk;let boxIsChecked;
        try {
            // await console.log(`0 boxIsChecked=(${boxIsChecked})`);
            // await this.page.waitFor(2000);
            // Кросс Док
            boxIsChecked = await ElementIsChecked(this.page, 0, this.xCheckBoxValueCrossDoc);
            // await console.log(`0 boxIsChecked=(${boxIsChecked})`);
            if(boxIsChecked) {
                await console.log('\x1b[38;5;1m\t', `Кросс Док Чек Бокс => По дефолту Должен быть СНЯТ , а он (${boxIsChecked}) - FAIL !!!`, '\x1b[0m');
            }else {
                resOk = WaitForElementIsPresentByXPath(2000, this.page, this.xCheckBoxCrossDoc);
                if (!resOk) {
                    await console.log('\x1b[38;5;1m\t', `Кросс Док Чек Бокс => Не Вижу - FAIL !!!`, '\x1b[0m');
                } else {
                    // Кросс Док Чек Бокс => Клик 1 Установить
                    resOk = await ClickByXPath(this.page, this.xCheckBoxCrossDoc);
                    //await this.page.waitFor(2000);
                    if (!resOk) {
                        await console.log('\x1b[38;5;1m\t', `Кросс Док Чек Бокс => Клик 1 Установить - FAIL !!!`, '\x1b[0m');
                    } else {
                        //await this.page.waitFor(2000);
                        boxIsChecked = await ElementIsChecked(this.page, 0, this.xCheckBoxValueCrossDoc);
                        // await console.log(`1 boxIsChecked=(${boxIsChecked})`);
                        if (!boxIsChecked) {
                            await console.log('\x1b[38;5;1m\t', `Кросс Док Чек Бокс => Клик 1 Установить => НЕ УСТАНОВИЛСЯ ЧЕК(${boxIsChecked})- FAIL !!!`, '\x1b[0m');
                        } else {
                            // Кросс Док Чек Бокс => Клик 2 Снять
                            //await this.page.waitFor(3000);
                            resOk = await ClickByXPath(this.page, this.xCheckBoxCrossDoc);
                            //await this.page.waitFor(2000);
                            if (!resOk) {
                                await console.log('\x1b[38;5;1m\t', `Кросс Док Чек Бокс => Клик 2 Снять - FAIL !!!`, '\x1b[0m');
                            } else {
                                //await this.page.waitFor(500);
                                boxIsChecked = await ElementIsChecked(this.page, 0, this.xCheckBoxValueCrossDoc);
                                // await console.log(`2 boxIsChecked=(${boxIsChecked})`);
                                if(boxIsChecked){
                                    await console.log('\x1b[38;5;1m\t', `Кросс Док Чек Бокс => Клик 2 Снять => НЕ СНЯЛСЯ ЧЕК(${boxIsChecked}) - FAIL !!!`, '\x1b[0m');
                                }else {
                                    if(this.DealData.isCrossDoc){
                                        // Если в Сделке он Должен быть установлен, то Ставим его
                                        resOk = await ClickByXPath(this.page, this.xCheckBoxCrossDoc);
                                        //await this.page.waitFor(2000);
                                        boxIsChecked = await ElementIsChecked(this.page, 0, this.xCheckBoxValueCrossDoc);
                                        if (!resOk) {
                                            await console.log('\x1b[38;5;1m\t', `Кросс Док Чек Бокс => Клик 3 Установить - FAIL !!!`, '\x1b[0m');
                                        }else{
                                            if(!boxIsChecked){
                                                await console.log('\x1b[38;5;1m\t', `Кросс Док Чек Бокс => Клик 3 Установить => НЕ УСТАНОВИЛСЯ ЧЕК(${boxIsChecked}) - FAIL !!!`, '\x1b[0m');
                                            }else{
                                                await console.log('\x1b[38;5;2m\t', `Кросс Док в Сделке Установлен(${boxIsChecked}) - Ok`, '\x1b[0m');
                                            }
                                        }
                                    }else {
                                        await console.log('\x1b[38;5;2m\t', `Работа чек бокса "Кросс Док" на странице Сделки Проверена - Ok`, '\x1b[0m');
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //await this.page.waitFor(2000);
            // Проверка на соответствие состояния требуемому
            if(this.DealData.isCrossDoc !== boxIsChecked) {
                // Попытка привести состояние к требуемому
                await ClickByXPath(this.page, this.xCheckBoxCrossDoc);
                boxIsChecked = await ElementIsChecked(this.page, 0, this.xCheckBoxValueCrossDoc);
                if (this.DealData.isCrossDoc !== boxIsChecked) {
                    throw `\x1b[38;5;1m\t !!! FAIL -> Кросс Док Состояние Чек Бокса(${boxIsChecked}) НЕ СООТВЕТСТВУЕТ ТРЕБУЕМОМУ (${this.DealData.isCrossDoc}) - FAIL !!!\x1b[0m`;
                }
            }
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterCrossDoc`);
            return false;
        }
    }//async EnterCrossDoc() // Кросс Док
    //----------------------------------------
    async EnterCargoTypeData() {
        let resOk;
        let strGetCargoType = ``;
        let strGetCargoCost = ``;
        let strGetCargoWeight = ``;
        let strErr = ``;
        try {
                // strCargoType: 'Алкоголь',
                // strCargoCost: '100500',
                // AutoCompleteCargo: true, // false
            await WaitRender(this.page);
            if (this.DealData.AutoCompleteCargo) { // Если true то должен быть автовыбран указанный тип груза и его цена
                // Автовыбор Выбранный "Тип груза"
                strGetCargoType = await ElementGetInnerText(this.page, 0, this.xSelectedCargoType);
                if (strGetCargoType !== this.DealData.strCargoType){
                    strErr+= `\x1b[38;5;1m\tАвтовыбор Выбранный "Тип груза" FAIL => (${strGetCargoType})!==(${this.DealData.strCargoType})\n`;
                }
                // Автовыбор Инпут "Стоимость груза"
                strGetCargoCost = await ElementGetValue(this.page, 0, this.xInputCargoCost);
                if (strGetCargoCost !== this.DealData.strCargoCost){
                    strErr+= `\x1b[38;5;1m\tАвтовыбор Инпут "Стоимость груза" FAIL => (${strGetCargoCost})!==(${this.DealData.strCargoCost})\n`;
                }
                //Проверка автовыбора Ок
                await console.log('\x1b[38;5;2m\t', `Автовыбор "Тип груза" (${this.DealData.strCargoType}) - OK`, '\x1b[0m');
                await console.log('\x1b[38;5;2m\t', `Автовыбор "Стоимость груза" (${this.DealData.strCargoCost} грн.) - OK`, '\x1b[0m');
            }
            // Тоннаж клиента *
            // resOk = await SetTextByXPath(this.page, this.xInputCargoWeight, this.DealData.strCargoWeight);
            // SetTextByXPath <- Не всегда работает (21.7) так как этот инпут не принимает "21." а потом "7"
            resOk = await TypeByXPath(this.page, this.xInputCargoWeight, this.DealData.strCargoWeight);

            await WaitRender(this.page);

            if (!resOk) {
                strErr+= '\x1b[38;5;1m\t', `FAIL -> Инпут "Тоннаж клиента *" SetTextByXPath(${this.xInputCargoWeight})`, '\x1b[0m';
            }else {
                strGetCargoWeight = await ElementGetValue(this.page, 0, this.xInputCargoWeight);
                if (strGetCargoWeight !== this.DealData.strCargoWeight){
                    strErr+= `\x1b[38;5;1m\t Инпут "Тоннаж клиента *" Введённое значение FAIL => (${strGetCargoWeight})!==(${this.DealData.strCargoWeight})\n`;
                }else{
                    await console.log('\x1b[38;5;2m\t', `Тоннаж клиента * (${this.DealData.strCargoWeight}) - OK`, '\x1b[0m');
                }
            }

            if(strErr!==``){
                throw strErr; // вывод суммарной ошибки и выход
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterCargoTypeData`);
            return false;
        }
    }//async EnterCargoTypeData()
    //----------------------------------------
    async EnterLevelMonitoringMC() {
        let resOk;
        const strAutomatically = `Автоматически`;
        let strTemp = ``;
        let strErr = ``;
        try {
            // Проверка "Мониторинг (МЦ)" "Автоматически"
            strTemp = await ElementGetInnerText(this.page, 0, this.xSelectedLevelMonitporingMCGetText);
            if (strTemp !== strAutomatically){
                strErr+= `FAIL => Автовыбор "Мониторинг (МЦ)" (${strTemp})!==(${strAutomatically})`;
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
                await console.log('\x1b[38;5;1m\t', `Проверка "Мониторинг (МЦ)" (${strAutomatically}) - ${strErr}`, '\x1b[0m');
            }else{
                await console.log('\x1b[38;5;2m\t', `Проверка "Мониторинг (МЦ)" (${strAutomatically}) - OK`, '\x1b[0m');
            }
            await console.log('\x1b[38;5;2m\t', `Установка "Мониторинг (МЦ)" (${this.DealData.strLevelMonitoringMC}) - OK`, '\x1b[0m');
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterLevelMonitoringMC`);
            return false;
        }
    }//async EnterLevelMonitoringMC()
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
    async AddAllClientOrTransporterFreights( CT ) { // Добавить Все Фрахты Заказчика // CT 1 or 2; Client = 1 ; Transporter = 2
        let resOk;
        let QFreights = 0;
        let xTemp = ``;
        let N = 0;
        try {
            if(!(CT === 1 || CT === 2)) { // CT 1 or 2; Client = 1 ; Transporter = 2
                throw `FAIL => Параметр CT НЕ УКАЗАН В ДАННЫХ ДЛЯ ТЕСТОВ CT=(${CT}) AddAllClientOrTransporterFreights( CT )`;
            }
            if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                // Фрахт Заказчика
                QFreights = this.DealData.ClientFreights.length;
                //await console.log(`QFreights=${QFreights}`);

                if (QFreights < 1) {
                    throw `FAIL => Фрахт Заказчика НЕ УКАЗАН В ДАННЫХ ДЛЯ ТЕСТОВ QFreights=(${QFreights})`;
                }
            }else{ // CT 1 or 2; Client = 1 ; Transporter = 2
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
                if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                    // Заказчик Кнопка "+ Добавить Фрахт"
                    resOk = await ClickByXPath(this.page, this.xClientAddFreightBtn);
                    if (!resOk) {
                        throw `FAIL => Заказчик Кнопка "+ Добавить Фрахт" ClickByXPath(${this.xClientAddFreightBtn})`;
                    }
                }else{ // CT 1 or 2; Client = 1 ; Transporter = 2
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
                if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                    resOk = await SetTextByXPath(this.page, this.xInputFreight, this.DealData.ClientFreights[N].Amount);
                }else{ // CT 1 or 2; Client = 1 ; Transporter = 2
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
                if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                    resOk = await SetTextByXPath(this.page, this.xSelectPaymentForm, this.DealData.ClientFreights[N].PaymentForm);
                }else{ // CT 1 or 2; Client = 1 ; Transporter = 2
                    resOk = await SetTextByXPath(this.page, this.xSelectPaymentForm, this.DealData.TransporterFreights[N].PaymentForm);
                }

                if (!resOk) {
                    throw `FAIL => Вводим "Форма оплаты" SetTextByXPath(${this.xSelectPaymentForm})`;
                }
                // ДропДаун с нужной строкой + `[contains(text(), "${XXX}")]`
                let strPaymentForm = ``;
                if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                    xTemp = this.xPaymentFormDropDownNeedStr + `[contains(text(), "${this.DealData.ClientFreights[N].PaymentForm}")]`;
                    strPaymentForm = this.DealData.ClientFreights[N].PaymentForm;
                }else{ // CT 1 or 2; Client = 1 ; Transporter = 2
                    xTemp = this.xPaymentFormDropDownNeedStr + `[contains(text(), "${this.DealData.TransporterFreights[N].PaymentForm}")]`;
                    strPaymentForm = this.DealData.TransporterFreights[N].PaymentForm;
                }

                resOk = await ClickByXPath(this.page, xTemp);
                if (!resOk) {
                    throw `FAIL => Селект "Форма оплаты" ДропДаун с нужной строкой ClickByXPath(${xTemp})`;
                }
                // Подождать пока закроется дроп даун
                await WaitRender(this.page);
                // Если Форма оплаты "топливо" , нужно добавить № тел. топливо
                let strNPhoneToplyvo = ``;
                if (strPaymentForm === `топливо`){
                    if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                        strNPhoneToplyvo = this.DealData.ClientFreights[N].strNPhoneToplyvo;
                    }else{ // CT 1 or 2; Client = 1 ; Transporter = 2
                        strNPhoneToplyvo = this.DealData.TransporterFreights[N].strNPhoneToplyvo;
                    }
                    // Инпут "№ тел. топливо"
                    resOk = await SetTextByXPath(this.page, this.xInputNPhoneToplyvo , strNPhoneToplyvo);
                    if (!resOk) {
                        throw `FAIL => Инпут "№ тел. топливо" SetTextByXPath(${this.xInputNPhoneToplyvo})`;
                    }
                }
                // Селект "Доп. условие оплаты" this.xSelectAdditionalConditionPayment
                // Селект "Доп. условие оплаты" Стрелка вниз для раскрытия списка
                resOk = await ClickByXPath(this.page, this.xAdditionalConditionPaymentArrowDown);
                if (!resOk) {
                    throw `FAIL => Селект "Доп. условие оплаты" Стрелка вниз для раскрытия списка ClickByXPath(${this.xAdditionalConditionPaymentArrowDown})`;
                }
                // Вводим "Доп. условие оплаты"
                if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                    resOk = await SetTextByXPath(this.page, this.xSelectAdditionalConditionPayment, this.DealData.ClientFreights[N].AdditionalConditionPayment);
                }else{ // CT 1 or 2; Client = 1 ; Transporter = 2
                    resOk = await SetTextByXPath(this.page, this.xSelectAdditionalConditionPayment, this.DealData.TransporterFreights[N].AdditionalConditionPayment);
                }
                if (!resOk) {
                    throw `FAIL => Вводим "Доп. условие оплаты" SetTextByXPath(${this.xSelectAdditionalConditionPayment})`;
                }
                // ДропДаун с нужной строкой + `[contains(text(), "${XXX}")]` `[text()="${XXX}"]`
                if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                    xTemp = this.xAdditionalConditionPaymentDropDownNeedStr + `[text()="${this.DealData.ClientFreights[N].AdditionalConditionPayment}"]`;
                }else{ // CT 1 or 2; Client = 1 ; Transporter = 2
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
                if (CT === 1) { // CT 1 or 2; Client = 1 ; Transporter = 2
                    await console.log('\x1b[38;5;2m\t', `Фрахт Заказчика(${N}) добавлен (${this.DealData.ClientFreights[N].Amount} грн. ${this.DealData.ClientFreights[N].PaymentForm}) - OK`, '\x1b[0m');
                }else { // CT 1 or 2; Client = 1 ; Transporter = 2
                    await console.log('\x1b[38;5;2m\t', `Фрахт Перевозчика(${N}) добавлен (${this.DealData.TransporterFreights[N].Amount} грн. ${this.DealData.TransporterFreights[N].PaymentForm}) - OK`, '\x1b[0m');
                }
                // Подождать пока закроется Модалка
                 await WaitRender(this.page);

            }// for(N = 0; N < QFreights; N++ )  --------------------------------------------

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in AddAllClientOrTransporterFreights`);
            return false;
        }
    }//async AddAllClientOrTransporterFreights(CT) // CT 1 or 2; Client = 1 ; Transporter = 2
    //----------------------------------------
    async EnterAdditionalFields() { // Вводим Дополнительные поля
        let resOk;let tempValue = ``;let resError = false;
        let xTempNeed = ``;
        let strFromPage = ``;
        try {
            // Дополнительные поля // Сразу после открытия сделки должны быть свёрнуты [@aria-expanded="false"]
            // this.xButtonAdditionalFields
            // this.xButtonAdditionalFieldsCollapsed
            // this.xButtonAdditionalFieldsExpanded
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xButtonAdditionalFields);
            if (!resOk) {
                await console.log('\x1b[38;5;1m\t', `Дополнительные поля => Не Вижу - FAIL !!!`, '\x1b[0m');
                resError = true;
            }else {
                // Сразу после открытия сделки должны быть свёрнуты [@aria-expanded="false"]
                tempValue = await ElementGetAttribute(this.page, 0, `aria-expanded`, this.xButtonAdditionalFields);
                //await console.log('\x1b[38;5;3m\t', `tempValue -> (${tempValue})`, '\x1b[0m');
                if (tempValue === ``) {
                    await console.log('\x1b[38;5;1m\t', `Дополнительные поля => Не Вижу Состояния (Свёрнуны/Развёрнуты)- FAIL !!!`, '\x1b[0m');
                    resError = true;
                }else {
                    if (tempValue===`true`) { //[@aria-expanded="true"] - развёрнуты
                        await console.log('\x1b[38;5;3m\t', `Warning -> Дополнительные поля => Сразу после открытия сделки должны быть свёрнуты, а они раскрыты <- Warning !`, '\x1b[0m');
                    //await TempStop(this.page);
                    }else if(tempValue===`false`){
                        resOk = await ClickByXPathNum(this.page, 0,this.xButtonAdditionalFields);
                        if (!resOk) {
                            await console.log('\x1b[38;5;1m\t', `Дополнительные поля => Клик - FAIL !!!`, '\x1b[0m');
                            resError = true;
                        }else {
                            tempValue = await ElementGetAttribute(this.page, 0, `aria-expanded`, this.xButtonAdditionalFields);
                            if (tempValue===`false`) {
                                await console.log('\x1b[38;5;1m\t', `Дополнительные поля => После Клика НЕ РАСКРЫЛИСЬ - FAIL !!!`, '\x1b[0m');
                                resError = true;
                            }
                        }
                    }else{
                        await console.log('\x1b[38;5;1m\t', `Дополнительные поля => Неизвестное состояние(${tempValue})-(Свёрнуны/Развёрнуты)? - FAIL !!!`, '\x1b[0m');
                        resError = true;
                    }
                }
            }
            if(!resError) {
                // Инпут "Номер транспортировки"
                resOk = await SetTextByXPath(this.page, this.xInputNumberTransportation, this.DealData.strNumberTransportation);
                if (!resOk) {
                    resError = true;
                    await console.log('\x1b[38;5;1m\t', `FAIL -> Инпут "Номер транспортировки" SetTextByXPath(${this.xInputNumberTransportation})`, '\x1b[0m');
                }else {
                    await console.log('\x1b[38;5;2m\t', `Номер транспортировки (${this.DealData.strNumberTransportation}) - OK`, '\x1b[0m');
                }
                // "Номер вкладки" Стрелка вниз для раскрытия списка
                resOk = await ClickByXPath(this.page, this.xArrowDownInSet);
                if (!resOk) {
                    await console.log('\x1b[38;5;1m\t', `FAIL -> "Номер вкладки" Стрелка вниз для раскрытия списка ClickByXPath(${this.xArrowDownInSet})`, '\x1b[0m');
                    resError = true;
                }else{
                    // "Номер вкладки" Раскрытый список
                    resOk = await WaitForElementIsPresentByXPath(7000, this.page, this.xDropDownInSetActive);
                    if (!resOk) {
                        await console.log('\x1b[38;5;1m\t', `FAIL -> "Номер вкладки" Раскрытый список WaitForElementIsPresentByXPath(${this.xDropDownInSetActive})`, '\x1b[0m');
                    }
                    // Инпут "Номер вкладки"
                    resOk = await SetTextByXPath(this.page, this.xInputInSet, this.DealData.strNumberInSet);
                    if (!resOk) {
                        await console.log('\x1b[38;5;1m\t', `FAIL -> Инпут "Номер вкладки" SetTextByXPath(${this.xInputInSet})`, '\x1b[0m');
                        resError = true;
                    }else {
                        // Спиннер НЕ Активный в "Номер вкладки"
                        resOk = await WaitForElementIsPresentByXPath(7000, this.page, this.xInSetSpinnerNotActive);
                        // "Номер вкладки" в Раскрытом списке Нужная строка + [contains(text(), "${XXX}")] или [text()="${XXX}"]
                        xTempNeed = this.xDropDownInSetNeedStr + `[text()="${this.DealData.strNumberInSet}"]`;
                        resOk = await WaitForElementIsPresentByXPath(7000, this.page, xTempNeed);
                        if (!resOk) {
                            await console.log('\x1b[38;5;1m\t', `FAIL -> "Номер вкладки" в Раскрытом списке Нужная строка WaitForElementIsPresentByXPath(${xTempNeed})`, '\x1b[0m');
                            resError = true;
                        }else{
                            resOk = await ClickByXPath(this.page, xTempNeed);
                            if (!resOk) {
                                await console.log('\x1b[38;5;1m\t', `FAIL -> "Номер вкладки" в Раскрытом списке Нужная строка ClickByXPath(${xTempNeed})`, '\x1b[0m');
                                resError = true;
                            }
                        }
                    }
                }
            }
            if(resError){
                await console.log('\x1b[38;5;1m\t', `Дополнительные поля => "Номер транспортировки" и "Номер вкладки" в данных для тестов ОЧИЩЕНЫ И НЕ БУДУТ УЧАСТВОВАТЬ В СЦЕНАРИИ- SKIPPED !!!`, '\x1b[0m');
                this.DealData.strNumberTransportation = ``;
                this.DealData.strNumberInSet = ``;
                throw `\x1b[38;5;1m\t Пропущено - "Номер транспортировки" и "Номер вкладки"`;
            }
            strFromPage = await ElementGetValue(this.page, 0, this.xInputNumberTransportation);
            if(strFromPage !== this.DealData.strNumberTransportation){
                await console.log('\x1b[38;5;1m\t', `Дополнительные поля => "Номер транспортировки" (${strFromPage}) !== (${this.DealData.strNumberTransportation}) в данных для тестов ОЧИЩЕНО И НЕ БУДЕТ УЧАСТВОВАТЬ В СЦЕНАРИИ - FAIL !!!`, '\x1b[0m');
                this.DealData.strNumberTransportation = ``;
                resError = true;
            }else{ // OK !!!!
                await console.log('\x1b[38;5;2m\t', `Дополнительные поля => "Номер транспортировки" (${this.DealData.strNumberTransportation}) - OK`, '\x1b[0m');
            }
            //await WaitRender(this.page);
            // strFromPage = await ElementGetValue(this.page, 0, this.xInputInSet);
            // Инпут "Номер вкладки" Выбранное значение (ElementGetInnerText)
            strFromPage = await ElementGetInnerText(this.page, 0, this.xInputInSetSelectedValue);
            if(strFromPage !== this.DealData.strNumberInSet){
                await console.log('\x1b[38;5;1m\t', `Дополнительные поля => "Номер вкладки" (${strFromPage}) !== (${this.DealData.strNumberInSet}) в данных для тестов ОЧИЩЕНО И НЕ БУДЕТ УЧАСТВОВАТЬ В СЦЕНАРИИ - FAIL !!!`, '\x1b[0m');
                this.DealData.strNumberInSet = ``;
                resError = true;
            }else { // OK !!!!
                await console.log('\x1b[38;5;2m\t', `Дополнительные поля => "Номер вкладки" (${this.DealData.strNumberInSet}) - OK`, '\x1b[0m');
            }
            if(resError){
                throw `\x1b[38;5;1m\t Пропущено - "Номер транспортировки" и "Номер вкладки"`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterAdditionalFields`);
            return false;
        }
    }//async EnterAdditionalFields() // Вводим Дополнительные поля
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
                throw `FAIL => НЕ вижу Линк на Компанию Перевозчика WaitForElementIsPresentByXPath(${this.xLinkTransporterCompany})`;
            }
            // await WaitRender(this.page);
            // await this.page.waitFor(1000);
            // После выбора Компании ждём пока скроется Нотификация
            // "Создайте хотя бы 1 договор для выбора юр. лица!"
            // this.xNoClientsContract = this.xSectionDataOfClients + `//span[contains(text(), "Создайте хотя бы 1 договор для выбора юр. лица!")]`;
            // this.xNoClientsContractDisabled = this.xNoClientsContract + `[@style="display: none;"]`;
            //await console.log(`xPath=${this.xNoClientsContractDisabled}`);
            resOk = await WaitForElementIsPresentByXPath(21000, this.page, this.xNoTransporterContractDisabled);
            if (!resOk) {
                let TxtErr = `FAIL => У Компании Перевозчика отсутствует Договор !!! \n`;
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
                await console.log('\x1b[38;5;1m\t', `Линк на Компанию Перевозчика (${this.xLinkTransporterCompany}) - FAIL !!!`, '\x1b[0m');
            }else{
                await console.log('\x1b[38;5;2m\t', `Линк на Компанию Перевозчика (${tempHref}) - OK`, '\x1b[0m');
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
    async EnterAllAddresses() {
        let resOk;
        let QAdr = 0;
        let N = 0;
        try {
            // Вводим Адрес Загрузки
            // Кнопка "Изменить" в "Адрес и дата загрузки"
            resOk = await ClickByXPath(this.page, this.xButtonChangeLoading);
            if (!resOk) {
                throw `FAIL => Кнопка "Изменить" в "Адрес и дата загрузки" ClickByXPath(${this.xButtonChangeLoading})`;
            }
            // Проверка Модалки "Маршрут"
            resOk = await this.CheckModalMarshrut();
            if (!resOk) {
                throw `FAIL => Проверка Модалки "Маршрут" this.CheckModalMarshrut();`;
            }
            // Ввод Адресов Загрузки
            QAdr = this.DealData.PointsLoading.length;
            for(N = 0; N < QAdr; N++ ) {
                // Вводим Одну Загрузку (Num)
                resOk = await this.EnterOneLoading(N);
                if (!resOk) {
                    throw `FAIL => Вводим Одну Загрузку EnterOneLoading(${N})`;
                }
            }
            // Ввод Адресов Выгрузки
            QAdr = this.DealData.PointsUnLoading.length;
            for(N = 0; N < QAdr; N++ ) {
                // Вводим Одну Выгрузку (Num)
                resOk = await this.EnterOneUnLoading(N);
                if (!resOk) {
                    throw `FAIL => Вводим Одну Выгрузку EnterOneUnLoading(${N})`;
                }
            }
            // Ждём и Жмём Сохранить Адреса
            // Кнопка "Сохранить адреса" Active
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xButtonSaveAddressesActive);
            if (!resOk) {
                throw `FAIL => Кнопка "Сохранить адреса" Active WaitForElementIsPresentByXPath(${this.xButtonSaveAddressesActive})`;
            }
            resOk = await ClickByXPath(this.page, this.xButtonSaveAddressesActive);
            if (!resOk) {
                throw `FAIL => Кнопка "Сохранить адреса" Active ClickByXPath(${this.xButtonSaveAddressesActive})`;
            }
            await WaitRender(this.page);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterAllAddresses`);
            return false;
        }
    }//async EnterAllAddresses()
    //----------------------------------------
    //----------------------------------------
    async EnterOneLoading(Num) {
        let resOk;let tempStr;let tempXP;
        try {
            // Вводим Адрес Загрузки

            if(Num===0){ // Первая Загрузка
                resOk = await ClickByXPathNum(this.page, Num, this.xMultiSelectLoading);
                if (!resOk) {
                    throw `FAIL => Инпут "Загрузка" (${Num}) ClickByXPath(${this.xMultiSelectLoading})`;
                }
                // ДропДаун "Загрузка" раскрытый
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownLoadingReady);
                if (!resOk) {
                    throw `FAIL => ДропДаун "Загрузка"(${Num}) раскрытый WaitForElementIsPresentByXPath(${this.xDropDownLoadingReady})`;
                }
                // Ввод Адреса Загрузки
                tempStr = this.DealData.PointsLoading[Num].PointLoading.strAddressFOXfromGoogle;
                resOk = await SetTextByXPathNum(this.page, Num, this.xInputLoading, tempStr);
                if (!resOk) {
                    throw `FAIL => Инпут "Загрузка" (Num) SetTextByXPathNum(${Num})(${this.xInputLoading})`;
                }
                // Нужная строка ДропДаун "Загрузка" + [contains(text(),"${XXX}")]
                tempXP = this.xDropDownLoadingNeedStr + `[contains(text(),"${tempStr}")]`;
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, tempXP);
                if (!resOk) {
                    throw `FAIL => Нужная строка ДропДаун "Загрузка"(${Num}) WaitForElementIsPresentByXPath(${tempXP})`;
                }
                resOk = await ClickByXPath(this.page, tempXP);
                if (!resOk) {
                    throw `FAIL => Нужная строка ДропДаун "Загрузка"(${Num}) ClickByXPath(${tempXP})`;
                }
            }else { // if(Num=0)
                // Если не перввая, нужно нажать на кнопку "Добавить загрузку"
                // Кнопка "Добавить загрузку"
                resOk = await ClickByXPath(this.page, this.xButtonAddLoading);
                if (!resOk) {
                    throw `FAIL => Кнопка "Добавить загрузку" ClickByXPath(${this.xButtonAddLoading})`;
                }
                //Ждём пока появится "Добавленная Загрузка (Num)"
                // Инпут "Загрузка" (Num)
                resOk = await WaitForElementIsPresentByXPathNum(1000, Num, this.page, this.xMultiSelectLoading);
                if (!resOk) {
                    throw `FAIL => Инпут "Загрузка" (${Num}) WaitForElementIsPresentByXPathNum(${this.xMultiSelectLoading})`;
                }
                // Мувер "Загрузка" (Num)
                // Num = 2;
                // Перетаскивание Последней Загрузки
                let SS = `#deal-address-control > div > main > div > div > div:nth-child(1) > div > div > div:nth-child(3) > div.options > div.mover > svg`;
                let DS = `#deal-address-control > div > main > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div.options > div.mover > svg`;
                resOk = await dragAndDrop(this.page, SS, DS);
                if (!resOk) {
                    throw `FAIL => Загрузка Перетаскивание Последней(${Num}) dragAndDrop(${this.xButtonAddLoading})`;
                } else {
                    await console.log('\x1b[38;5;2m\t', `Загрузка Перетаскивание Последней(${Num}) - OK`, '\x1b[0m');
                }
                //*[@id="deal-address-control"]/div/main/div/div/div[1]/div/div/div[2]/div[1]/div[1]
                await WaitRender(this.page);
                // раскрыть Дропдаун
                resOk = await ClickByXPathNum(this.page, Num, this.xMultiSelectLoading);
                if (!resOk) {
                    throw `FAIL => Инпут "Загрузка" (${Num}) ClickByXPath(${this.xMultiSelectLoading})`;
                }
                // ДропДаун "Загрузка" раскрытый
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownLoadingReady);
                if (!resOk) {
                    throw `FAIL => ДропДаун "Загрузка"(${Num}) раскрытый WaitForElementIsPresentByXPath(${this.xDropDownLoadingReady})`;
                }

                // как искать по локациям Компании или по всей базе данных
                if (!this.DealData.PointsLoading[Num].PointLoading.fromCompany) {
                    // Поиск по базе данных
                    // В "Загрузка" Дропдаун пункт "Поиск по базе данных"
                    resOk = await ClickByXPathNumWithScroll(1000, this.page, 0, this.xLoadingButtonFindInBase);
                    if (!resOk) {
                        throw `FAIL => В "Загрузка" Дропдаун пункт "Поиск по базе данных"(${Num}) ClickByXPathNumWithScroll(${this.xLoadingButtonFindInBase})`;
                    }
                    // Вводим адрес локации
                    tempStr = this.DealData.PointsLoading[Num].PointLoading.strAddressFOXfromGoogle;
                    resOk = await SetTextByXPathNum(this.page, Num, this.xInputLoading, tempStr);
                    if (!resOk) {
                        throw `FAIL => Инпут "Загрузка" (${Num}) SetTextByXPathNum(${this.xMultiSelectLoading})`;
                    }
                    // Ждём пока найдёт
                    tempXP = this.xDropDownLoadingNeedStr + `[contains(text(),"${tempStr}")]`;
                    resOk = await WaitForElementIsPresentByXPath(7000, this.page, tempXP);
                    if (!resOk) {
                        throw `FAIL => Нужная строка ДропДаун "Загрузка"(${Num}) WaitForElementIsPresentByXPath(${tempXP})`;
                    }

                    resOk = await ClickByXPath(this.page, tempXP);
                    if (!resOk) {
                        throw `FAIL => Нужная строка ДропДаун "Загрузка"(${Num}) ClickByXPath(${tempXP})`;
                    }

                }// if (!this.DealData.PointsLoading[Num].PointLoading.fromCompany){
                // await this.page.waitFor(20100);
            } // if(Num=0) else
            await console.log('\x1b[38;5;2m\t', `Загрузка(${Num}) Адрес(${tempStr}) - OK`, '\x1b[0m');
            await WaitRender(this.page);
            // Ввод Дат ---------------------------------

            // Дата Загрузки (Num)
            // const {DatePicker} = require("../sub_objects/date_picker_obj.js");
            // let NewDatePicker = new DatePicker(this.browser, this.page);
            // resOk = await NewDatePicker.OpenDatePicker(Num, this.xDateLoading);
            // resOk = await NewDatePicker.ClickNextOfCurrentDate(1);
            // let strHours =   `` + await randomInt(1, 23);
            // let strMinutes = `` + await randomInt(1, 59);
            // await console.log(`strHours=(${strHours}), strMinutes=(${strMinutes})`);
            // resOk = await NewDatePicker.SetTime(strHours, strMinutes);

            this.DealData.PointsLoading[Num].PointLoading.strInDate =  await this.SetDateTime(Num, this.xDateLoading);
            this.DealData.PointsLoading[Num].PointLoading.strOutDate = await this.SetDateTime(Num, this.xDateExitLoading);
            await console.log('\x1b[38;5;2m\t', `Загрузка(${Num}) Дата In (${this.DealData.PointsLoading[Num].PointLoading.strInDate}) - OK`, '\x1b[0m');
            await console.log('\x1b[38;5;2m\t', `Загрузка(${Num}) Дата Out(${this.DealData.PointsLoading[Num].PointLoading.strOutDate}) - OK`, '\x1b[0m');


            //
            // await TempStop(this.page, `--------ДАТА--------`);
            //
            // //------------------------------
            // resOk = await ClickByXPathNum(this.page, Num, this.xDateLoading);
            // if (!resOk) {
            //     throw `FAIL => Дата Загрузки (${Num}) ClickByXPathNum(${this.xDateLoading})`;
            // }
            // // Раскрытый Дейт Пикер "Дата загрузки"
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDateLoadingPickerActive);
            // if (!resOk) {
            //     throw `FAIL => Раскрытый Дейт Пикер "Дата загрузки"(${Num}) WaitForElementIsPresentByXPath(${this.xDateLoadingPickerActive})`;
            // }
            // // Выезд с загрузки (Num)
            // resOk = await ClickByXPathNum(this.page, Num, this.xDateExitLoading);
            // if (!resOk) {
            //     throw `FAIL => Выезд с загрузки (${Num}) ClickByXPathNum(${this.xDateExitLoading})`;
            // }
            // // Раскрытый Дейт Пикер "Выезд с загрузки"
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDateExitLoadingPickerActive);
            // if (!resOk) {
            //     throw `FAIL => Раскрытый Дейт Пикер "Дата загрузки"(${Num}) WaitForElementIsPresentByXPath(${this.xDateExitLoadingPickerActive})`;
            // }
            // // Клик в любом месте - Дата Автовыберется
            // // Заголовок "Маршрут"
            // resOk = await ClickByXPath(this.page, this.xHeaderMarshrut);
            // if (!resOk) {
            //     throw `FAIL => Клик в любом месте (Заголовок "Маршрут") для Автовыбора даты (${Num}) ClickByXPath(${this.xHeaderMarshrut})`;
            // }
            await WaitRender(this.page);
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterOneLoading(${Num})`);
            return false;
        }
    }//async EnterOneLoading(Num)
    //----------------------------------------
    async SetDateTime(Num, xPath) {
        let resOk;
        let Value = ``;
        try {
            const {DatePicker} = require("../sub_objects/date_picker_obj.js");
            let NewDatePicker = new DatePicker(this.browser, this.page);
            resOk = await NewDatePicker.OpenDatePicker(Num, xPath);
            this.CounterCallDate++;
            resOk = await NewDatePicker.ClickNextOfCurrentDate(this.CounterCallDate);
            let strHours =   `` + await randomInt(1, 23);
            let strMinutes = `` + await randomInt(1, 59);
            // await console.log(`strHours=(${strHours}), strMinutes=(${strMinutes})`);
            resOk = await NewDatePicker.SetTime(strHours, strMinutes);
            Value = NewDatePicker.Value;

            return Value;
        } catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp`);
            return ``;
        }
    }//async TemplateTemp()
    //----------------------------------------
    async EnterOneUnLoading(Num) { // ВЫГРУЗКА
        let resOk;let tempStr;let tempXP;
        try {
            // Вводим Адрес Выгрузки

            if(Num===0){ // Первая Выгрузка
                resOk = await ClickByXPathNum(this.page, Num, this.xMultiSelectUnLoading);
                if (!resOk) {
                    throw `FAIL => Инпут "Выгрузка" (${Num}) ClickByXPath(${this.xMultiSelectUnLoading})`;
                }
                // ДропДаун "Выгрузка" раскрытый
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownUnLoadingReady);
                if (!resOk) {
                    throw `FAIL => ДропДаун "Выгрузка"(${Num}) раскрытый WaitForElementIsPresentByXPath(${this.xDropDownUnLoadingReady})`;
                }
                // Ввод Адреса Выгрузки
                tempStr = this.DealData.PointsUnLoading[Num].PointUnLoading.strAddressFOXfromGoogle;
                resOk = await SetTextByXPathNum(this.page, Num, this.xInputUnLoading, tempStr);
                if (!resOk) {
                    throw `FAIL => Инпут "Выгрузка" (Num) SetTextByXPathNum(${Num})(${this.xInputUnLoading})`;
                }
                // Нужная строка ДропДаун "Выгрузка" + [contains(text(),"${XXX}")]
                tempXP = this.xDropDownUnLoadingNeedStr + `[contains(text(),"${tempStr}")]`;
                resOk = await WaitForElementIsPresentByXPath(4000, this.page, tempXP);// <-Поиск по Базе мб ДОООлго
                if (!resOk) {
                    throw `FAIL => Нужная строка ДропДаун "Выгрузка"(${Num}) WaitForElementIsPresentByXPath(${tempXP})`;
                }
                resOk = await ClickByXPath(this.page, tempXP);
                if (!resOk) {
                    throw `FAIL => Нужная строка ДропДаун "Выгрузка"(${Num}) ClickByXPath(${tempXP})`;
                }
            }else { // if(Num=0)
                // Если не перввая, нужно нажать на кнопку "Добавить выгрузку"
                // Кнопка "Добавить выгрузку"
                resOk = await ClickByXPath(this.page, this.xButtonAddUnLoading);
                if (!resOk) {
                    throw `FAIL => Кнопка "Добавить выгрузку" ClickByXPath(${this.xButtonAddUnLoading})`;
                }
                //Ждём пока появится "Добавленная Выгрузка (Num)"
                // Инпут "Выгрузка" (Num)
                resOk = await WaitForElementIsPresentByXPathNum(1000, Num, this.page, this.xMultiSelectUnLoading);
                if (!resOk) {
                    throw `FAIL => Инпут "Выгрузка" (${Num}) WaitForElementIsPresentByXPathNum(${this.xMultiSelectUnLoading})`;
                }
                // раскрыть Дропдаун
                resOk = await ClickByXPathNum(this.page, Num, this.xMultiSelectUnLoading);
                if (!resOk) {
                    throw `FAIL => Инпут "Выгрузка" (${Num}) ClickByXPath(${this.xMultiSelectUnLoading})`;
                }
                // ДропДаун "Выгрузка" раскрытый
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xDropDownUnLoadingReady);
                if (!resOk) {
                    throw `FAIL => ДропДаун "Выгрузка"(${Num}) раскрытый WaitForElementIsPresentByXPath(${this.xDropDownUnLoadingReady})`;
                }

                // как искать по локациям Компании или по всей базе данных
                if (!this.DealData.PointsUnLoading[Num].PointUnLoading.fromCompany){
                    // Поиск по базе данных
                    // В "Выгрузка" Дропдаун пункт "Поиск по базе данных"
                    resOk = await ClickByXPathNumWithScroll(1000, this.page,0, this.xUnLoadingButtonFindInBase);
                    if (!resOk) {
                        throw `FAIL => В "Выгрузка" Дропдаун пункт "Поиск по базе данных"(${Num}) ClickByXPathNumWithScroll(${this.xUnLoadingButtonFindInBase})`;
                    }
                    // Вводим адрес локации
                    tempStr = this.DealData.PointsUnLoading[Num].PointUnLoading.strAddressFOXfromGoogle;
                    resOk = await SetTextByXPathNum(this.page, Num, this.xInputUnLoading, tempStr);
                    if (!resOk) {
                        throw `FAIL => Инпут "Загрузка" (${Num}) SetTextByXPathNum(${this.xInputUnLoading})`;
                    }
                    // Ждём пока найдёт
                    tempXP = this.xDropDownUnLoadingNeedStr + `[contains(text(),"${tempStr}")]`;
                    resOk = await WaitForElementIsPresentByXPath(4000, this.page, tempXP);// <-Поиск по Базе мб ДОООлго
                    if (!resOk) {
                        throw `FAIL => Нужная строка ДропДаун "Выгрузка"(${Num}) WaitForElementIsPresentByXPath(${tempXP})`;
                    }

                    resOk = await ClickByXPath(this.page, tempXP);
                    if (!resOk) {
                        throw `FAIL => Нужная строка ДропДаун "Выгрузка"(${Num}) ClickByXPath(${tempXP})`;
                    }

                }// if (!this.DealData.PointsUnLoading[Num].PointUnLoading.fromCompany){
                // await this.page.waitFor(20100);
            } // if(Num=0) else
            await console.log('\x1b[38;5;2m\t', `Выгрузка(${Num}) Адрес(${tempStr}) - OK`, '\x1b[0m');
            await WaitRender(this.page);
            // Ввод Дат
            // Дата Выгрузки (Num)
            this.DealData.PointsUnLoading[Num].PointUnLoading.strInDate =  await this.SetDateTime(Num, this.xDateUnLoading);
            this.DealData.PointsUnLoading[Num].PointUnLoading.strOutDate = await this.SetDateTime(Num, this.xDateExitUnLoading);
            await console.log('\x1b[38;5;2m\t', `Выгрузка(${Num}) Дата In (${this.DealData.PointsUnLoading[Num].PointUnLoading.strInDate}) - OK`, '\x1b[0m');
            await console.log('\x1b[38;5;2m\t', `Выгрузка(${Num}) Дата Out(${this.DealData.PointsUnLoading[Num].PointUnLoading.strOutDate}) - OK`, '\x1b[0m');
            // ----------
            // resOk = await ClickByXPathNum(this.page, Num, this.xDateUnLoading);
            // if (!resOk) {
            //     throw `FAIL => Дата Загрузки (${Num}) ClickByXPathNum(${this.xDateUnLoading})`;
            // }
            // // Раскрытый Дейт Пикер "Дата выгрузки"
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDateUnLoadingPickerActive);
            // if (!resOk) {
            //     throw `FAIL => Раскрытый Дейт Пикер "Дата выгрузки"(${Num}) WaitForElementIsPresentByXPath(${this.xDateUnLoadingPickerActive})`;
            // }
            // // Выезд с выгрузки (Num)
            // resOk = await ClickByXPathNum(this.page, Num, this.xDateExitUnLoading);
            // if (!resOk) {
            //     throw `FAIL => Выезд с выгрузки (${Num}) ClickByXPathNum(${this.xDateExitUnLoading})`;
            // }
            // // Раскрытый Дейт Пикер "Выезд с выгрузки"
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDateExitUnLoadingPickerActive);
            // if (!resOk) {
            //     throw `FAIL => Раскрытый Дейт Пикер "Дата выгрузки"(${Num}) WaitForElementIsPresentByXPath(${this.xDateExitUnLoadingPickerActive})`;
            // }
            // // Клик в любом месте - Дата Автовыберется
            // // Заголовок "Маршрут"
            // resOk = await ClickByXPath(this.page, this.xHeaderMarshrut);
            // if (!resOk) {
            //     throw `FAIL => Клик в любом месте (Заголовок "Маршрут") для Автовыбора даты (${Num}) ClickByXPath(${this.xHeaderMarshrut})`;
            // }
            await WaitRender(this.page);
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterOneUnLoading(${Num})`);
            return false;
        }
    }//async EnterOneUnLoading(Num)
// --------------------------------------------------
    async EnterComments() {
        let resOk;
        try {
            //  Комментарий к загрузке
            resOk = await ClickByXPath(this.page, this.xButtonCommentLoadind);
            if (!resOk) {
                throw `FAIL => Комментарий к загрузке  ClickByXPath(${this.xButtonCommentLoadind})`;
            }
            // Текст Ареа "Комментарий к загрузке" Раскрытый
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xTextAreaCommentLoadind);
            if (!resOk) {
                throw `FAIL => Текст Ареа "Комментарий к загрузке" Раскрытый WaitForElementIsPresentByXPath(${this.xTextAreaCommentLoadind})`;
            }
            resOk = await ClickByXPath(this.page, this.xTextAreaCommentLoadind);
            if (!resOk) {
                throw `FAIL => Текст Ареа "Комментарий к загрузке" Раскрытый ClickByXPath(${this.xTextAreaCommentLoadind})`;
            }
            this.DealData.strCommentLoadind = `Загрузка в ` + this.DealData.PointsLoading[0].PointLoading.strAddressFOXfromGoogle;
            // Ввод Текста в "Комментарий к загрузке"
            resOk = await SetTextByXPath(this.page, this.xTextAreaCommentLoadind,this.DealData.strCommentLoadind);
            if (!resOk) {
                throw `FAIL => Ввод Текста в "Комментарий к загрузке" SetTextByXPath(${this.xTextAreaCommentLoadind})`;
            }
            await console.log('\x1b[38;5;2m\t', `Комментарий к загрузке (${this.DealData.strCommentLoadind}) - OK`, '\x1b[0m');

            //  Комментарий к выгрузке
            resOk = await ClickByXPath(this.page, this.xButtonCommentUnLoadind);
            if (!resOk) {
                throw `FAIL => Комментарий к выгрузке  ClickByXPath(${this.xButtonCommentUnLoadind})`;
            }
            // Текст Ареа "Комментарий к выгрузке" Раскрытый
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xTextAreaCommentUnLoadind);
            if (!resOk) {
                throw `FAIL => Текст Ареа "Комментарий к выгрузке" Раскрытый WaitForElementIsPresentByXPath(${this.xTextAreaCommentUnLoadind})`;
            }
            resOk = await ClickByXPath(this.page, this.xTextAreaCommentUnLoadind);
            if (!resOk) {
                throw `FAIL => Текст Ареа "Комментарий к выгрузке" Раскрытый ClickByXPath(${this.xTextAreaCommentUnLoadind})`;
            }
            this.DealData.strCommentUnLoadind = `Выгрузка в ` + this.DealData.PointsUnLoading[0].PointUnLoading.strAddressFOXfromGoogle;
            // Ввод Текста в "Комментарий к выгрузке"
            resOk = await SetTextByXPath(this.page, this.xTextAreaCommentUnLoadind,this.DealData.strCommentUnLoadind);
            if (!resOk) {
                throw `FAIL => Ввод Текста в "Комментарий к выгрузке" SetTextByXPath(${this.xTextAreaCommentUnLoadind})`;
            }
            await console.log('\x1b[38;5;2m\t', `Комментарий к выгрузке (${this.DealData.strCommentUnLoadind}) - OK`, '\x1b[0m');
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterComments`);
            return false;
        }
    }//async EnterComments()
     //----------------------------------------
    async CheckModalMarshrut() {
        let resOk;
        let strError = ``;
        try {
            await WaitRender(this.page);
            // Заголовок "Маршрут"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xHeaderMarshrut);
            if (!resOk) {
                strError+=`Заголовок "Маршрут"\n`;
            }
            // Кнопка "Добавить загрузку"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xButtonAddLoading);
            if (!resOk) {
                strError+=`Кнопка "Добавить загрузку"\n`;
            }
            // Кнопка "Добавить выгрузку"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xButtonAddUnLoading);
            if (!resOk) {
                strError+=`Кнопка "Добавить выгрузку"\n`;
            }
            // Кнопка "Сохранить адреса"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xButtonSaveAddresses);
            if (!resOk) {
                strError+=`Кнопка "Сохранить адреса"\n`;
            }
            if (strError !== ``){
                throw `FAIL => \n ${strError}`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckModalMarshrut`);
            return false;
        }
    }//async CheckModalMarshrut()
    //----------------------------------------
    async EnterResponsibleAndLogist() {
        let resOk;let tempXP;
        try {
            // Вводим Ответственного и Логиста
            // "Ответственный по фоксу" Стрелка Вниз для раскрытия списка
            resOk = await ClickByXPath(this.page, this.xResponsibleArrowDown);
            if (!resOk) {
                throw `FAIL => "Ответственный по фоксу" Стрелка Вниз для раскрытия списка ClickByXPath(${this.xResponsibleArrowDown})`;
            }
            // подождать пока раскроется ДропДаун
            // Раскрытый ДропДаун "Ответственный по фоксу"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownResponsible);
            if (!resOk) {
                throw `FAIL => Раскрытый ДропДаун "Ответственный по фоксу" WaitForElementIsPresentByXPath(${this.xDropDownResponsible})`;
            }
            // Инпут "Ответственный по фоксу"
            resOk = await SetTextByXPath(this.page, this.xInputResponsible, this.DealData.strResponsibleFOX);
            if (!resOk) {
                throw `FAIL => Инпут "Ответственный по фоксу" SetTextByXPath(${this.xInputResponsible})`;
            }
            // Нужная строка ДропДаун "Ответственный по фоксу" + [contains(text(),"${XXX}")]
            tempXP = this.xDropDownResponsibleNeedStr + `[contains(text(),"${this.DealData.strResponsibleFOX}")]`;
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, tempXP);
            if (!resOk) {
                throw `FAIL => Нужная строка ДропДаун "Ответственный по фоксу" WaitForElementIsPresentByXPath(${tempXP})`;
            }
            resOk = await ClickByXPath( this.page, tempXP);
            if (!resOk) {
                throw `FAIL => Нужная строка ДропДаун "Ответственный по фоксу" ClickByXPath(${tempXP})`;
            }
            // Подождать пока закроется Дропдаун
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownResponsibleNotDisplayed);
            if (!resOk) {
                throw `FAIL => Подождать пока закроется Дропдаун "Ответственный по фоксу" WaitForElementIsPresentByXPath(${this.xDropDownResponsibleNotDisplayed})`;
            }
            await console.log('\x1b[38;5;2m\t', `Ответственный по фоксу (${this.DealData.strResponsibleFOX}) `, `- OK !`, '\x1b[0m');
            //---------
            // "Логист" Стрелка Вниз для раскрытия списка
            resOk = await ClickByXPath(this.page, this.xLogistArrowDown);
            if (!resOk) {
                throw `FAIL => "Логист" Стрелка Вниз для раскрытия списка ClickByXPath(${this.xLogistArrowDown})`;
            }
            // подождать пока раскроется ДропДаун
            // Раскрытый ДропДаун "Логист"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownLogist);
            if (!resOk) {
                throw `FAIL => Раскрытый ДропДаун "Логист" WaitForElementIsPresentByXPath(${this.xDropDownLogist})`;
            }
            // Инпут "Логист"
            resOk = await SetTextByXPath(this.page, this.xInputLogist, this.DealData.strLogist);
            if (!resOk) {
                throw `FAIL => Инпут "Логист" SetTextByXPath(${this.xInputLogist})`;
            }
            // Нужная строка ДропДаун "Логист" + [contains(text(),"${XXX}")]
            tempXP = this.xDropDownLogistNeedStr + `[contains(text(),"${this.DealData.strLogist}")]`;
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, tempXP);
            if (!resOk) {
                throw `FAIL => Нужная строка ДропДаун "Логист" WaitForElementIsPresentByXPath(${tempXP})`;
            }
            resOk = await ClickByXPath( this.page, tempXP);
            if (!resOk) {
                throw `FAIL => Нужная строка ДропДаун "Логист" ClickByXPath(${tempXP})`;
            }
            // Подождать пока закроется Дропдаун
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownLogistNotDisplayed);
            if (!resOk) {
                throw `FAIL => Подождать пока закроется Дропдаун "Логист" WaitForElementIsPresentByXPath(${this.xDropDownLogistNotDisplayed})`;
            }
            await console.log('\x1b[38;5;2m\t', `Логист (${this.DealData.strLogist}) `, `- OK !`, '\x1b[0m');
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterResponsibleAndLogist`);
            return false;
        }
    }//async EnterResponsibleAndLogist()
    //----------------------------------------
    async SaveDealAndWaitTableDeals() { // Сохраняем Сделку и ждём отрисовки таблицы сделок
        let resOk;
        let strWarning = ``;
        try { // Сохраняем Сделку
            // 1)нажать на "Сохранить и остаться", что б получить ID сделки
            // ) если ошибка Оригинала Договора
            // 2) выцепить ID сделки
            // 3)нажать на "Сохранить"
            // 4)чекнуть отрисовку таблицы сделок
            // Сделка Кнопка "Сохранить и остаться" Активная
            resOk = await WaitForElementIsPresentByXPath(7000, this.page, this.xButtonDealSaveAndStayActive);
            if (!resOk) {
                throw `FAIL => Сделка Кнопка "Сохранить и остаться" Активная WaitForElementIsPresentByXPath(${this.xButtonDealSaveAndStayActive})`;
            }
            // await this.page.waitFor(2000);
            // resOk = await ElementSetAttribute(this.page,0, `disabled`, `disabled`, this.xButtonDealSaveActive);
            // await console.log(`resOk=${resOk}`);
            // await this.page.waitFor(2000);

//             // секция Перевозчика "Создать заявку"
//             resOk = await ClickByXPath(this.page, this.xCreateOrder);
//             if (!resOk) {
//                 throw `FAIL => секция Перевозчика "Создать заявку" ClickByXPath(${this.xCreateOrder})`;
//             }
//             // Заголовок "Создание заявки с перевозчиком"
//             resOk = await WaitForElementIsPresentByXPath(7000, this.page, this.xHeaderCreateOrderTransporter);
//             if (!resOk) {
//                 throw `FAIL => Заголовок "Создание заявки с перевозчиком" WaitForElementIsPresentByXPath(${this.xHeaderCreateOrderTransporter})`;
//             }
//             // "Создание заявки с перевозчиком" кнопка "Создать" Активная
//             resOk = await WaitForElementIsPresentByXPath(7000, this.page, this.xButtonCreateOrderActive);
//             if (!resOk) {
//                 throw `FAIL => "Создание заявки с перевозчиком" кнопка "Создать" Активная WaitForElementIsPresentByXPath(${this.xButtonCreateOrderActive})`;
//             }
//             resOk = await ClickByXPath(this.page, this.xButtonCreateOrderActive);
//             if (!resOk) {
//                 throw `FAIL => "Создание заявки с перевозчиком" кнопка "Создать" Активная ClickByXPath(${this.xButtonCreateOrderActive})`;
//             }
//             // https://question-it.com/questions/130241/kuklovod-kak-zhdat-tolko-pervyj-otvet-html
//             await  console.log(`Заявка Click Save`);
//             //await this.page.setRequestInterception(true);
//             await this.page.on('response', async (response) => {
//                 // if (response.url().includes("https://api.maerskline.com/track/")) {
//                 try {
//                     if (response.url().includes("https://dev.api.cfo.tl.ee/api/v2/deal")) {
//                         let resultJ = await response.json();
//                         await console.log(`-1-----------------------`);
//                         await console.log(resultJ); // JSON RESULT OK
//                         await console.log(`-2-----------------------`);
//                         // здесь перехватил результат, ВСЕ ОК
//                         //await page.evaluate(() => window.stop())
//                     }
//                 }catch (e) {
//
//                 }
//             });
//
//             //
//             // const [response] = await Promise.all([
//             //  ClickByXPath(this.page, this.xButtonCreateOrderActive),
//             //     // page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
//             //     // this.page.waitForNavigation('networkidle2') // The promise resolves after navigation has finished after no more than 2 request left
//             //     WaitUntilXPathExist(this.page, 7000, this.xHeaderCreateOrderTransporter)
//             // ]);
//             // await console.log(`-------------\n${response}\n--------------------`);
//             // let resultJson = await response.json();
//             // await console.log(`-------------\n${resultJson}\n--------------------`);
//
//             resOk = await WaitUntilXPathExist(this.page, 17000, this.xHeaderCreateOrderTransporter);
//             if (!resOk) {
//                 throw `FAIL => Модалка не закрылась -> Заголовок "Создание заявки с перевозчиком" WaitUntilXPathExist(${this.xButtonCreateOrderActive})`;
//             }
//
//
//
// await console.log(`Заявка ОК`);
//             //await TempStop(this.page);
            //--------
            // Сатус Сделки (InnerText) тут ещё рано
            // let tempStrID = await this.GetDealStatusID();


            let tempBoolean = true;
            let noVehicleWeight = 0;
            let noTrailerWeight = 0;
// labelLoop1:
   while(tempBoolean){
       tempBoolean = false;

    // resOk = await ClickByXPath(this.page, this.xButtonDealSaveAndStayActive);
    // if (!resOk) {
    //     throw `FAIL => Сделка Кнопка "Сохранить и остаться" Активная ClickByXPath(${this.xButtonDealSaveAndStayActive})`;
    // }

       // await console.log(`-3000-`);
       // await this.page.waitFor(3000);
       g_tempDataFromEventListener_id = ``;
       await console.log('\x1b[38;5;3m\t', `Сохраняем Сделку..................`, '\x1b[0m');
       let strDealSaveUrl = `${g_BackCfoFoxURL}/api/v2/deal`;
       resOk = await ResponseListener(this.page, strDealSaveUrl, true);
       resOk = await ClickByXPath(this.page, this.xButtonDealSaveActive);
       if (!resOk) {
           throw `FAIL => Сделка Кнопка "Сохранить" Активная ClickByXPath(${this.xButtonDealSaveActive})`;
       }
       resOk = await ResponseListenerWaitForResponse(12000);
       if(!resOk){
           await console.log('\x1b[38;5;1m\t', `FAIL -> ResponseListenerWaitForResponse(${strDealSaveUrl}) - FAIL !!!`, '\x1b[0m');
           let strPSS = g_PathSS + `screenshot_ButtonDealSaveResponse.png`;
           await this.page.screenshot({path: strPSS, fullPage: true});
           await console.log(`Скриншот: ${strPSS}`);
           throw `Сделка не сохранена !!!`;

       }
    // Проверяем Варнинги
    strWarning = await WarningsRead(this.page, 1000, false);
       resOk = await ResponseListener(this.page, strDealSaveUrl, false);

    let warnDealSuccessfullyCreated = 'Сделка успешно создана!';
    let warnNoOriginalContract = 'Нет оригинала Договора №';
    let warnNoVehicleMaxWeight = 'У Автомобиля не указана допустимая масса';
    let warnNoTrailerMaxWeight = 'У прицепа не указана допустимая масса';

    if (await SubStrIsPresent(warnDealSuccessfullyCreated, strWarning) || strWarning === ``) { // Сделка успешно создана!
        this.DealData.strStatusID = `1`;
        await console.log('\x1b[38;5;2m\t', `Сообщение (${strWarning}) - OK !!!`, '\x1b[0m');
    } else if (await SubStrIsPresent(warnNoOriginalContract, strWarning)) { // Нет оригинала Договора

        await console.log('\x1b[38;5;3m\t', `Сообщение (${strWarning}) \n - Значит уже есть 5 сделок с этой компанией Заказчика, а оригинала договора ещё нет. Добавим его.`, '\x1b[0m');

        await console.log('\x1b[38;5;3m\t', `Добавление Оригинала Договора -> Открываем компанию ${this.DealData.strClientCompanyName}`, '\x1b[0m');
        //выцепить номер договора !!!!
        let strNumContract = await GetSubStrFromStr(warnNoOriginalContract, ` с юр.лицом`,strWarning);
        //await console.log(`strNumContract=${strNumContract}`);
        //№СТВ-131021-13
        resOk = await this.ClientAddOriginalContract(strNumContract);
        if(resOk){
            await console.log('\x1b[38;5;3m\t', `Добавление Оригинала Договора - OK !!!`, '\x1b[0m');
            tempBoolean = true;
            await WarningsRemove(this.page);
            //break labelLoop1;

        }else {
            await console.log('\x1b[38;5;1m\t', `FAIL -> ( Добавление Оригинала Договора ) - FAIL !!!`, '\x1b[0m');
            throw `Сделка не сохранена !!!`;
        }
    } else if(await SubStrIsPresent(warnNoVehicleMaxWeight, strWarning) || await SubStrIsPresent(warnNoTrailerMaxWeight, strWarning) ){

        await WarningsRemove(this.page);
        if(await SubStrIsPresent(warnNoVehicleMaxWeight, strWarning)){
            if (noVehicleWeight > 0) {
                throw `\x1b[38;5;1m\tFAIL -> Повторная ошибка(${warnNoVehicleMaxWeight})  - FAIL !!!\x1b[0m`;
            }
            await console.log('\x1b[38;5;3m\t', `Будем Добавлять (${warnNoVehicleMaxWeight}) - Warning !!!`, '\x1b[0m');
            noVehicleWeight++;
            this.DealData.objVehicle.VehicleEmptyWeight = await randomInt(700, 970) * 10 ;// 7450;
            this.DealData.objVehicle.VehicleMaxWeight = await randomInt(1100, 1290) * 10 ;//12700;

            await this.SetAutoMaxWeight(0, this.DealData.objVehicle.VehicleEmptyWeight, this.DealData.objVehicle.VehicleMaxWeight);
        }
        if(await SubStrIsPresent(warnNoTrailerMaxWeight, strWarning)){
            if (noTrailerWeight > 0) {
                throw `\x1b[38;5;1m\tFAIL -> Повторная ошибка(${warnNoTrailerMaxWeight})  - FAIL !!!\x1b[0m`;
            }
            await console.log('\x1b[38;5;3m\t', `Будем Добавлять (${warnNoTrailerMaxWeight}) - Warning !!!`, '\x1b[0m');
            noTrailerWeight++;
            this.DealData.objTrailer.VehicleEmptyWeight = await randomInt(1135, 1290) * 10 ;// 11350;
            this.DealData.objTrailer.VehicleMaxWeight = await randomInt(3275, 3875) * 10 ; // 38750;

            await this.SetAutoMaxWeight(1, this.DealData.objTrailer.VehicleEmptyWeight, this.DealData.objTrailer.VehicleMaxWeight);
        }
        tempBoolean = true;
        await WaitRender(this.page);
        // Возврат на while(tempBoolean) <----!!!!!!!
    } else{ // Другие "неизвестные ошибки"
        await console.log('\x1b[38;5;1m\t', `Warning ( ${strWarning} ) - Warning !!!`, '\x1b[0m');
        await this.page.screenshot({path: g_PathSS + `screenshot_ButtonDealSaveActive.png`, fullPage: true});
        await console.log(g_PathSS + `screenshot_ButtonDealSaveActive.png`);

    }
}//while(tempBoolean)

            await this.CalculateVehicleMaxCapacity();

            this.DealData.strDealID = '' + g_tempDataFromEventListener_id;
            if (this.DealData.strDealID === ''){
                await console.log('\x1b[38;5;1m\t', `FAIL ! -> Получение ID Сделки (${this.DealData.strDealID}) - FAIL!`, '\x1b[0m');
            }else{
                this.DealData.strStatusID = `1`;
                await console.log('\x1b[38;5;2m\t', `Получение ID Сделки (${this.DealData.strDealID}) - OK !!!`, '\x1b[0m');
            }

            // // подождать пока кнопки раздизейблятся
            // resOk = await WaitForElementIsPresentByXPath(7000, this.page, this.xButtonDealSaveActive);
            // if (!resOk) {
            //     throw `FAIL => Сделка Кнопка "Сохранить" Активная WaitForElementIsPresentByXPath(${this.xButtonDealSaveActive})`;
            // }
            // // 2) узнать ID сделки
            // resOk = await this.GetDealIDFromURL();
            // if (!resOk) {
            //     throw `FAIL => узнать ID сделки this.GetDealIDFromURL();`;
            // }

            // await HoverByXPath(this.page, this.xButtonDealSaveActive);
            //
            // resOk = await ClickByXPath(this.page, this.xButtonDealSaveActive);
            // if (!resOk) {
            //     throw `FAIL => Сделка Кнопка "Сохранить" Активная ClickByXPath(${this.xButtonDealSaveActive})`;
            // }

          //  await console.log(`g_tempDataFromEventListener=(${g_tempDataFromEventListener})`);
//await console.log(`1-this.DealData.strDealID=(${this.DealData.strDealID})`);
// await TempStop(this.page, `---- Здесь SaveDeal----`);

            // Ждём отрисовки таблицы сделок
            resOk = await WaitForElementIsPresentByXPath(19000, this.page, this.xTableDeals);
            if (!resOk) {
                throw `FAIL => Ждём отрисовки таблицы сделок WaitForElementIsPresentByXPath(${this.xTableDeals})`;
            }else {
                await console.log('\x1b[38;5;2m\t', `Сохранение Сделки -> Переход на таблицу Сделок - ОК`, '\x1b[0m');
            }
            resOk = await ScrollByXPathNum(this.page, this.xTopHeader);
            if(!resOk){
                await console.log('\x1b[38;5;1m\t', `FAIL ! -> ScrollByXPathNum(${this.xTopHeader}) - FAIL!`, '\x1b[0m');
            }
            // Ждём пока пропадёт спиннер таблицы сделок
            resOk = await WaitUntilXPathExist(this.page, 11000, this.xTableDealsBusy);
            if (!resOk) {
                throw `FAIL => Ждём пока пропадёт спиннер таблицы сделок WaitUntilXPathExist(${this.xTableDealsBusy})`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SaveDealAndWaitTableDeals`);
            return false;
        }
    }//async SaveDealAndWaitTableDeals() // Сохраняем Сделку и ждём отрисовки таблицы сделок
     //----------------------------------------
    async ClientAddOriginalContract(strNumContract) {
        let resOk;
        try {
            const newPagePromise = new Promise(x => this.browser.once('targetcreated', target => x(target.page())));    // объявляем промис
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // Клик по Компании Заказчика // кликаем, открывается новая СТРАНИЦА
            resOk = await ClickByXPath(this.page, this.xLinkClientCompany);
            if (!resOk) {
                throw `FAIL => Клик по Компании Заказчика (${this.xLinkClientCompany})`;
            }

            this.pageClientCompany = await newPagePromise;           // объявляем новую СТРАНИЦУ/окно, теперь с ней можно работать
            await this.pageClientCompany.setViewport({width: g_width, height: g_height});
            var {Company} = require("../sub_objects/company_obj.js");
            let CompanyDataD = { // !!! для Конструктора - иначе будут ошибки (эти поля используются в конструкторе)
                strCompanyCode: this.DealData.strClientCompanyCode,
                strCargoType: `ТНВ`,// тут можно фейк
                strCargoVehicleType: `Тент`,// тут можно фейк
                ContractData: {
                    strContractOurCompany: this.DealData.strOurCompanyWithClient,
                    strPaymentCondition: 'По календарным', // тут можно фейк
                },
            };

            let NewCompanyD = new Company(this.browser, this.pageClientCompany , CompanyDataD);
            resOk = await NewCompanyD.CheckCompanyForm();
            if (!resOk) {
                throw 'NewCompanyD.CheckCompanyForm(); = FAIL!"';//<--специальный вызов ошибки!
            }

            resOk = await NewCompanyD.EditExistsContractAddOriginal(strNumContract);
            if (!resOk) {
                throw 'NewCompanyD.EditExistsContractAddOriginal(); = FAIL!"';//<--специальный вызов ошибки!
            }
            await this.pageClientCompany.close();

//await TempStop(this.page);
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ClientAddOriginalContract`);
            return false;
        }
    }//async ClientAddOriginalContract()
    //----------------------------------------
    async GetDealIDFromURL() {
        let resOk;
        try {
            let strCrmDeal = `/crm/deal/`;

            await WaitRender(this.page);
            // Проверка URL
            let strPageURL = await this.page.url();
            resOk = true;
            if (! await SubStrIsPresent(strCrmDeal, strPageURL)){
                resOk = false;
                await console.log('\x1b[38;5;1m\t', `!!! FAIL -> URL страницы (${strPageURL}) не содержит (${strCrmDeal}) <- FAIL !!!`, '\x1b[0m');
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
            this.DealData.strDealID = strID_fromURL;


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in GetDealIDFromURL`);
            return false;
        }
    }//async GetDealIDFromURL()
    //----------------------------------------
    async GetDealStatusID() {
        let resOk;
        try {
            let InProcessing = `В обработке`;
            let Concluded = "Заключена";
            let strDealStatusName = await ElementGetInnerText(this.page, 0, this.xDealStatusName);

            if (strDealStatusName === InProcessing) {
                await console.log('\x1b[38;5;2m\t', `Статус Сделки ID=1 (${strDealStatusName}) - OK !!!`, '\x1b[0m');
                // this.DealData.strStatusID = `1`;
                return `1`;
            }else if(strDealStatusName === Concluded) {
                await console.log('\x1b[38;5;2m\t', `Статус Сделки ID=2 (${strDealStatusName}) - OK !!!`, '\x1b[0m');
                //this.DealData.strStatusID = `2`;
                return `2`;
            }
            await console.log('\x1b[38;5;1m\t', `FAIL !!!  Статус Сделки (${strDealStatusName}) - FAIL !!!`, '\x1b[0m');

            return ``;
        } catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp`);
            return ``;
        }
    }//async TemplateTemp()
     //----------------------------------------
    /**
     * @param {boolean} setListener The boolean
     * @param {string} requestUrl The string
     */
    async ResponseListener1(page, requestUrl, setListener) {
        let resOk;
        try {
            g_setListener = setListener;

            async function done(page, fName) {
                if(page) { // response requestfinished
                    //await page.removeListener('requestfinished', onRequestFinished);
                    await page.removeListener('requestfinished', fName);
                }else{
                    await console.log(`page=NOT`);
                }
            };
            async function onRequestFinished(request) {
                // https://question-it.com/questions/130241/kuklovod-kak-zhdat-tolko-pervyj-otvet-html
                try {
                    if(! g_setListener){
                        await done(page, onRequestFinished); // <- тут сработает !!!
                        return true;
                    }

                    if (request.url().includes(requestUrl)) {
                        const response = await request.response();
                        let resultJ = await response.json();
                        //await console.log(`-1-----------------------`);
                        // await console.log(resultJ); // JSON RESULT OK
                        // await console.log(`-2-----------------------`);

                        g_tempDataFromEventListener_id = resultJ.data.id;

                        await done(page, onRequestFinished);// <- тут сработает !!!

                        return true;
                    }
                }catch (e) {
                    await console.log(`*Ошибка в onRequestFinished (${e})`);
                    return false;
                }
            };
            if (setListener) { // requestfinished  // response
                await page.on('requestfinished', onRequestFinished);
            }else{
                await done(page, onRequestFinished);// <- тут не сработает !!!
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ResponseListener(${requestUrl})(${setListener})`);
            return false;
        }
    }//async ResponseListener(requestUrl, setListener)
    //----------------------------------------
    async SetAutoMaxWeight(Who, WeightEmpty, WeightFull) { // Who=0 - Vehicle Who=1 - Trailer
        let resOk;
        try {
            await WaitRender(this.page);
            if(!((Who === 0) || (Who === `0`) || (Who === 1) || (Who === `1`))){
                throw `Внутренняя ошибка -> не правильно передан параметр Who(${Who}) Должно быть(Who=0 - Vehicle Who=1 - Trailer)`;
            }
            const newPagePromise = new Promise(x => this.browser.once('targetcreated', target => x(target.page())));    // объявляем промис
            if( (Who === 0) || (Who === `0`) ){
                // Клик по Автомобиль для перехода на карточку Автомобиля
                resOk = await ClickByXPath(this.page, this.xSelectedVehicle);
                if (!resOk) {
                    throw `FAIL => Клик по Автомобиль для перехода на карточку Автомобиля(${this.xSelectedVehicle})`;
                }
            }else{
                // Клик по Прицеп для перехода на карточку Прицепа
                resOk = await ClickByXPath(this.page, this.xSelectedTrailer);
                if (!resOk) {
                    throw `FAIL => Клик по Прицеп для перехода на карточку Прицепа(${this.xSelectedTrailer})`;
                }
            }

            //await WaitMS(5000); // если ждать то получается pageVehicleCard === null    ????!!!!
            let pageVehicleCard = await newPagePromise;           // объявляем новую СТРАНИЦУ/окно, теперь с ней можно работать
            pageVehicleCard = await GetNewPage(this.browser, pageVehicleCard, 2);// <- подстраховка
            if (!pageVehicleCard) {
                throw `FAIL => pageVehicleCard=(${pageVehicleCard})`;
            }
            //
            // //await console.log(`pageVehicleCard=(${pageVehicleCard})`);
            // //await console.dir(pageVehicleCard, { showHidden: true, depth: 3, colors: true }); // depth: null - infinity
            // if(pageVehicleCard === null){
            //     let AllPages = await this.browser.pages();
            //     let TempLenPages = AllPages.length;
            //   //  await console.log(`0 TempLenPages=(${TempLenPages})`);
            //     if (TempLenPages < 2 ){
            //         resOk = await WaitForBrowserNewPage(this.browser,2, 4000);
            //         if(!resOk) {
            //             AllPages = await this.browser.pages();
            //             TempLenPages = AllPages.length;
            //             throw `FAIL => TempLenPages=(${TempLenPages})`;
            //         }
            //     }
            //     AllPages = await this.browser.pages();
            //     TempLenPages = AllPages.length;
            // //    await console.log(`1 TempLenPages=(${TempLenPages})`);
            //     pageVehicleCard = AllPages[TempLenPages-1];// !!! С НУЛЯ !!!
            // }
            // //await console.log(`pageVehicleCard=(${pageVehicleCard})`);
            // if (!pageVehicleCard) {
            //     throw `FAIL => pageVehicleCard=(${pageVehicleCard})`;
            // }
            await pageVehicleCard.bringToFront();
            await pageVehicleCard.setViewport({width: g_width, height: g_height});
            const {Vehicle} = require("../sub_objects/vehicle_obj.js");
            let VehicleData = { // это для того что б конструктор не упал
                strLicensePlate: ``,
                strVehicleID: ``,
                strRegistrationCertificateNumber: ``,
                strVehicleType: ``,
                strCarBrand: ``,
                strModel: ``,
                strQuantityAxles: '',
                strTypeOwner: '',
                strDocument: '',
                strSubjectOwner: '',
                VehicleEmptyWeight: WeightEmpty, // <- Нужно
                VehicleMaxWeight: WeightFull, // <- Нужно
            }
            let NewVehicle = new Vehicle(this.browser, pageVehicleCard, VehicleData);
            await WaitSpinner(pageVehicleCard,12000);
            await WaitRender(pageVehicleCard);
            // await pageVehicleCard.screenshot({path: g_PathSS + `screenshot_TEMP.png`, fullPage: true});
            // await console.log(g_PathSS + `screenshot_TEMP.png`);
            resOk = await NewVehicle.VehicleAddEmptyAndMaxWeights();
            if (!resOk) {
                throw `FAIL => Добавление Веса в Карточке Авто/Прицепа NewVehicle.VehicleAddEmptyAndMaxWeights(${Who},${WeightEmpty},${WeightFull});`;
            }
            resOk = await NewVehicle.SaveVehicle();
            if (!resOk) {
                throw `FAIL => Сохранение Авто/Прицепа NewVehicle.SaveVehicle(${Who},${WeightEmpty},${WeightFull});`;
            }
            await pageVehicleCard.close();// новая СТРАНИЦА/окно, закрыть


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SetAutoMaxWeight`);
            await this.page.screenshot({path: g_PathSS + `screenshot_SetAutoMaxWeight.png`, fullPage: true});
            await console.log(g_PathSS + `screenshot_SetAutoMaxWeight.png`);

            return false;
        }
    }//async SetAutoMaxWeight()


    //----------------------------------------
    async CalculateVehicleMaxCapacity() {
        /* strVehicleMaxCapacity: ``, //Расчитывается в сделке по данным из Авто и Прицепа
    Для связки тягач и полуприцеп: 40т - (масса без нагрузки прицепа + масса без нагрузки тягача);
    Для фургон и прицеп: 40т - (Масса без нагр. фургона + масса без нагр. прицепа);
    Для фургона: Полная Масса - Масса без нагрузки;
    Для буса: Полная Масса - Масса без нагрузки;
    Для связки тягач и платформа: Полная масса платформы - (масса без нагрузки платформы + масса без нагрузки тягача);
    Для связки тягач и контейнеровоз: 44т - (масса без нагрузки прицепа + масса без нагрузки тягача);
    ВАЖНО! не забыть условие, если тоннаж транспорта вернулся пустой.
    */
        let resOk;
        let MaxCapacity;
        let strMaxCapacity;
        let LastSymbol;
        let LastPoint;
        try {
            MaxCapacity = 40000 - (this.DealData.objTrailer.VehicleEmptyWeight + this.DealData.objVehicle.VehicleEmptyWeight);
            MaxCapacity = MaxCapacity/1000;
            strMaxCapacity = MaxCapacity.toFixed(2);
            // -------- Удаление последних Нулей после точки , если есть(включая точку)
            //await console.log(`strMaxCapacity=(${strMaxCapacity})`);
            if(await SubStrIsPresent(`.`, strMaxCapacity)){
                LastSymbol = strMaxCapacity.length - 1;
                while ( 0 < strMaxCapacity.indexOf('0', LastSymbol)){
                    strMaxCapacity = strMaxCapacity.slice(0, LastSymbol);
                    LastSymbol = strMaxCapacity.length - 1;
                }
            }
            LastPoint = strMaxCapacity.indexOf('.', LastSymbol);
            if(LastPoint === LastSymbol){
                //await console.log(`LP=(${LastPoint})`);
                strMaxCapacity = strMaxCapacity.slice(0, LastPoint);
            }
            //await console.log(`strMaxCapacity=(${strMaxCapacity})`);
            this.DealData.strVehicleMaxCapacity = strMaxCapacity;
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CalculateVehicleMaxCapacity`);
            return false;
        }
    }//async CalculateVehicleMaxCapacity()

    //----------------------------------------
    async SetTimeFirstCall() {
        let resOk;let tempXP;
        try {
            // Раскрыть Дейт Пикер "Время первого прозвона"
            resOk = await ScrollByXPathNum(this.page, this.xFirstCallTimeInput);
            resOk = await ClickByXPath(this.page, this.xFirstCallTimeInput);
            // Скролл до кнопки, ибо не влазит на экран
            resOk = await ScrollByXPathNum(this.page, this.xFirstCallTimeButton);
            // Проверка что на ДейтПикере есть свободное время
            let NumClickHour = 0;
            let NumClickDay = 0;
            let MaxTry = false;
            let FreeTime;
            let NumItem;
            // В Сегодняшнем Дне нельзя выбирать первое свободное время (1/5 может упасть)(если минуты равны текущему времени)
            let strPresentDay = await ElementGetInnerText(this.page, 0, this.xFirstCallTimePresentDay);
            if (await SubStrIsPresent(`Сегодня`, strPresentDay)){
                NumItem = 1; // Обезопасим себя от ошибки
            }else {
                NumItem = 0;
            }
            FreeTime = await WaitForElementIsPresentByXPathNum(500, NumItem,this.page, this.xFirstCallTimeItemActive);

            while (!FreeTime && !MaxTry){
                NumItem = 0;
                if (NumClickHour > 3) {
                    resOk = await ClickByXPath(this.page, this.xFirstCallTimeDayAdd);
                    await WaitRender(this.page);
                    NumClickDay++;
                    NumClickHour = 0;
                }else{
                    resOk = await ClickByXPath(this.page, this.xFirstCallTimeHourAdd);
                    await WaitRender(this.page);
                    NumClickHour++;
                }
                if(NumClickDay > 3){
                    MaxTry = true;
                }
                FreeTime = await WaitForElementIsPresentByXPathNum(500, 0,this.page, this.xFirstCallTimeItemActive);

            }// while (!FreeTime && !MaxTry)

            // Клик по свободному времени
            resOk = await ClickByXPathNum(this.page, NumItem, this.xFirstCallTimeItemActive);
            if (!resOk) {
                throw `FAIL -> Не нашли свободного времени`;
            }

            await WaitRender(this.page);
            // Нажать на кнопку "Подтвердить"
            resOk = await ClickByXPath(this.page, this.xFirstCallTimeButtonActive);
            if(!resOk){
                throw `FAIL -> Нажать на кнопку "Подтвердить" ClickByXPath(this.page, this.xFirstCallTimeButtonActive);`;
            }
            await WaitRender(this.page);
            let strTimeFirstCall = await ElementGetInnerText(this.page, 0, this.xFirstCallTimeInput);
            if (strTimeFirstCall !== ``) {
                await console.log('\x1b[38;5;2m\t', `Установка "Время первого прозвона" (${strTimeFirstCall}) - OK !!!`, '\x1b[0m');
            }else{
                throw `"Время первого прозвона" - НЕ Установилось - пустое значение !!!`;
            }

            resOk = await HoverByXPathNum(this.page, 0, this.xButtonDealSaveActive);

            await WaitRender(this.page);

            // Сохраняем Сделку
            // resOk = await ClickByXPath(this.page, this.xButtonDealSaveActive);
            resOk = await this.SaveDealAndWaitTableDeals();
            if(!resOk){
                throw `FAIL -> this.SaveDealAndWaitTableDeals();`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SetTimeFirstCall`);
            await ScreenLog(this.page, `Ошибка при установке времени первого звонка`, 1);
            return false;
        }
    }//async SetTimeFirstCall()
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
