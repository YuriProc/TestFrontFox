//'use strict';
class Vehicle {
    constructor(browser, page, VehicleData) {
        this.browser = browser;
        this.page = page;

        this.VehicleData = VehicleData;
        // Заголовок ВСЕЙ Модалки "Создание нового автомобиля"
        this.xModalHeader0 = `//div[contains(@id, "add-vehicle-modal")]/header/h5[contains(text(), "Создание нового автомобиля")]`;
        this.xModalHeader1 = `//div[contains(@id, "add-vehicle-modal")]/header/h5[contains(text(), "Создание нового прицепа")]`;
        // Чек "Не стандарт"
        this.xCheckNotStandart = `//div[contains(@class, "check-license-plate")]//label[contains(text(), "Не стандарт")]`;
        // Инпут "Серия и номер тех. паспорта"
        this.xInputRegistrationCertificateNumber = `//fieldset[legend[contains(text(), "Серия и номер тех. паспорта")]]//input`;
        // Картинка "Пример тех паспорта"
        this.xImageSampleRegistrationCertificateNumber = `//div[@class="tech-passport-example-preview"]/img[@alt="Пример тех. паспорта"]`;
        // next Step
        // Инпут "Гос. номера"
        this.xInputLicensePlate = `//fieldset[legend[contains(text(), "Гос. номера")]]//input`;
        // Картинка "Пример автомобильного номера"
        this.xImageSampleLicensePlate = `//div[@class="tech-passport-example-preview"]/img[@alt="Пример автомобильного номера"]`;
        // Кнопка "Проверить в базе"
        this.xButtonCheckInBaseDisabled = `//div[contains(@class, "check-license-plate")]//button[contains(text(), "Проверить в базе")][@disabled="disabled"]`;
        this.xButtonCheckInBaseActive = `//div[contains(@class, "check-license-plate")]//button[contains(text(), "Проверить в базе") and not(contains(@disabled , "disabled"))]`;
        //--------------------
        // ФилдСет "Тип транспорта" *
        this.xFieldSetVehicleType = `//fieldset[legend[contains(text(), "Тип транспорта")][span[@class="required"][contains(text(), "*")]]]`;
        // Селект "Тип транспорта"
        this.xSelectVehicleType = this.xFieldSetVehicleType + `//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "Тип транспорта"
        this.xSelectVehicleTypeActive = this.xFieldSetVehicleType + `//div[@class="multiselect crm-select multiselect--active"]`;
        // Инпут "Тип транспорта" *
        this.xInputVehicleType = this.xFieldSetVehicleType + `//input`;
        // DropDown "Тип транспорта" с нужным Типом
        this.xDropDownVehicleType =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xDropDownVehicleType+=`/span[text()="${this.VehicleData.strVehicleType}"]`;
        //--------------------
        // ФилдСет "Субтип транспорта" *
        this.xFieldSetVehicleSubType = `//fieldset[legend[contains(text(), "Субтип транспорта")][span[@class="required"][contains(text(), "*")]]]`;
        // Селект "Субтип транспорта"
        this.xSelectVehicleSubType = this.xFieldSetVehicleSubType + `//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "Субтип транспорта"  [contains(@class, "multiselect crm-select multiselect--active")]
        this.xSelectVehicleSubTypeActive = this.xFieldSetVehicleSubType + `//div[contains(@class, "multiselect crm-select multiselect--active")]`;
        // Инпут "Субтип транспорта" *
        this.xInputVehicleSubType = this.xFieldSetVehicleSubType + `//input`;
        // DropDown "Субтип транспорта" с нужным Типом
        this.xDropDownVehicleSubType =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xDropDownVehicleSubType+=`/span[text()="${this.VehicleData.strVehicleSubType}"]`;
        // Инпут "Тоннаж"
        this.xInputCapacity = `//fieldset[legend[contains(text(), "Тоннаж")]]//input`;
        // Инпут "Обьем"
        this.xInputVolume = `//fieldset[legend[contains(text(), "Обьем")]]//input`;
        // Инпут "Масса без груза (кг)"
        this.xInputEmptyWeight = `//fieldset[legend[contains(text(), "Масса без груза (кг)")]]//input`;
        // Инпут "Полная масса (кг)"
        this.xInputMaxWeight = `//fieldset[legend[contains(text(), "Полная масса (кг)")]]//input`;
        // Кнопки "Тип загрузки" + [span[contains(text(), "${this.VehicleData.strLoadingTypes[i]}")]]
        this.xButtonsLoadingTypes = `//fieldset[legend[contains(text(),"Тип загрузки")]]//button[@type="button"]`;
        // Кнопки "Тип контейнера" + [span[contains(text(), "${this.VehicleData.strContainerType}")]]
        this.xButtonContainerType = `//fieldset[legend[contains(text(),"Тип контейнера")]]//button[@type="button"]`;
        this.xButtonContainerType+= `[span[contains(text(), "${this.VehicleData.strContainerType}")]]`;

            // CarBrand ---------------------
        // ФилдСет "Марка" *
        this.xFieldSetCarBrand = `//fieldset[legend[contains(text(), "Марка")][span[@class="required"][contains(text(), "*")]]]`;
        // Селект "Марка"
        this.xSelectCarBrand = this.xFieldSetCarBrand + `//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "Марка"
        this.xSelectCarBrandActive = this.xFieldSetCarBrand + `//div[@class="multiselect crm-select multiselect--active"]`;
        // Инпут "Марка" *
        this.xInputCarBrand = this.xFieldSetCarBrand + `//input`;
        // DropDown "Марка" с нужной Маркой
        this.xDropDownCarBrand =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xDropDownCarBrand+=`/span[text()="${this.VehicleData.strCarBrand}"]`;
        //-------------------------
        // Инпут "Модель"
        this.xInputModel = `//fieldset[legend[contains(text(), "Модель")]]//input`;
        // Количество осей
        // ФилдСет "Количество осей"
        this.xFieldSetQuantityAxles = `//fieldset[legend[contains(text(), "Количество осей")]]`;
        // Кнопки с иконками "Количество осей" [0]
        // тягач, фургон 1-2 [0..1], прицепы 1-3 [0..2] у остальных нет
        this.xQuantityAxlesButtons = this.xFieldSetQuantityAxles + `//button`;//button[contains(@class, "fox-button__primary")]
        // Кнопки Владелец транспорта
        // ФилдСет "Владелец транспорта"
        this.xFieldSetOwnerVehicle = `//fieldset[legend[contains(text(), "Владелец транспорта")]]`;
        // Кнопка "Компания" // this.VehicleData.strTypeOwner
        this.xButtonCompanyOwner = this.xFieldSetOwnerVehicle+ `//button[span[contains(text(), "Компания")]]`; //button[contains(@class, "fox-button__primary")]
        // Кнопка "Контакт" //this.VehicleData.strTypeOwner
        this.xButtonContactOwner = this.xFieldSetOwnerVehicle+ `//button[span[contains(text(), "Контакт")]]`; //button[contains(@class, "fox-button__primary")]
        //----------------------
        // ФилдСет "Документ"
        this.xFieldSetDocument = `//fieldset[legend[contains(text(), "Документ")]]`;
        // Селект "Документ"
        this.xSelectDocument = this.xFieldSetDocument + `//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "Марка"
        this.xSelectDocumentActive = this.xFieldSetDocument + `//div[@class="multiselect__spinner"][@style="display: none;"]`;
        // Инпут "Документ"
        this.xInputDocument = this.xFieldSetDocument + `//input`;
        // DropDown "Документ" с нужным типом Документа
        this.xDropDownDocument =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xDropDownDocument+=`/span[text()="${this.VehicleData.strDocument}"]`;
        //----------------------


        // ФилдСет "Компания/Контакт владельца" this.VehicleData.strTypeOwner
        // При переключении кнопок меняется лейбл "Компания/Контакт владельца"
        this.xFieldSetSubjectOwner = `//fieldset[legend[contains(text(), "${this.VehicleData.strTypeOwner} владельца")]]`;
        // Селект "Компания/Контакт владельца"
        this.xSelectSubjectOwner = this.xFieldSetSubjectOwner + `//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "Компания/Контакт владельца"
        this.xSelectSubjectOwnerActive = this.xFieldSetSubjectOwner + `//div[contains(@class, "multiselect crm-select multiselect--active")]`;
        // Инпут "Компания/Контакт владельца"
        this.xInputSubjectOwner = this.xFieldSetSubjectOwner + `//input`;
        // DropDown "Компания/Контакт владельца" с нужной строкой
        this.xDropDownSubjectOwner =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xDropDownSubjectOwner+=`[contains(text(), '${this.VehicleData.strSubjectOwner}')]`;
        //-------------------------
        // Секция "Документы"
        this.xDocumentsSection = `//section[h5[contains(text(), "Документы")]]`;
        // Файл менеджер "Тех. паспорт/Доверенность"
        this.xFileManagerVehicle = this.xDocumentsSection + `[//div[@class="files-manager__type"][contains(text(), "Тех. паспорт/Доверенность")]]`;
        // Кнопка "Добавить файл"
        this.xButtonAddFile = this.xFileManagerVehicle + `//button[contains(text(), "Добавить файл")]`;
        // Кнопка "+ Добавить" Файл
        this.xButtonAddFilePlus = this.xFileManagerVehicle + `//div[@class="files-manager__add-input-btn"][contains(text(), "+ Добавить")]`;
        //---------------------
        // Секция Vehicle
        this.xSectionVehicle = `//section[@class="crm-view crm-view__vehicle"]`;
        // Кнопка "Сохранить" //normalize-space
        this.xButtonSave = this.xSectionVehicle + `//button[contains(text(), "Сохранить") and not (contains(text(),"остаться"))]`;
        // Спиннер формы
        this.xSpinner = `//span[@class="spinner-border"]`;


        //----------------------

    }//constructor(browser, page, VehicleData)
    //----------------------------------------
    async CheckRegistrationCertificateNumberForm(Num) { // проверка , что мы на форме/модалке проверки тех паспорта
        let resOk;
        let resErrorText = ``;
        try {
            if (Num === 0) {
                // Заголовок ВСЕЙ Модалки "Создание нового автомобиля"
                resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xModalHeader0);
                if (!resOk) {
                    resErrorText += `FAIL => Заголовок ВСЕЙ Модалки "Создание нового автомобиля" ${this.xModalHeader0} \n`;
                }
            }else{
                // Заголовок ВСЕЙ Модалки "Создание нового прицепа"
                resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xModalHeader1);
                if (!resOk) {
                    resErrorText += `FAIL => Заголовок ВСЕЙ Модалки "Создание нового прицепа" ${this.xModalHeader1} \n`;
                }
            }
            // Чек "Не стандарт"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xCheckNotStandart);
            if(!resOk){
                resErrorText+= `FAIL => Чек "Не стандарт" ${this.xCheckNotStandart} \n`;
            }
            // Инпут "Серия и номер тех. паспорта"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputRegistrationCertificateNumber);
            if(!resOk){
                resErrorText+= `FAIL => Инпут "Серия и номер тех. паспорта" ${this.xInputRegistrationCertificateNumber} \n`;
            }
            // Картинка "Пример тех паспорта"
            resOk = await WaitForElementIsPresentByXPath(21000, this.page, this.xImageSampleRegistrationCertificateNumber);
            if(!resOk){
                resErrorText+= `FAIL => Картинка "Пример тех паспорта" ${this.xImageSampleRegistrationCertificateNumber} \n`;
            }
            // Кнопка "Проверить в базе" Disabled
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xButtonCheckInBaseDisabled);
            if(!resOk){
                resErrorText+= `FAIL => Кнопка "Проверить в базе" Disabled ${this.xButtonCheckInBaseDisabled} \n`;
            }
            if(resErrorText !==``){
                await this.page.screenshot({path: g_PathSS + `screenshot_CheckRegistrationCertificateNumberForm${Num}.png`, fullPage: true });
                await console.log(` Скриншот: (screenshot_CheckRegistrationCertificateNumberForm${Num}.png)`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки => ВЫХОД
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckRegistrationCertificateNumberForm( ${Num})`);
            return false;
        }
    }//async CheckRegistrationCertificateNumberForm(Num)
    //----------------------------------------
    async EnterRegistrationCertificateNumber() { // ТЕХ ПАСПОРТ
        let resOk;
        try {
            // Инпут "Серия и номер тех. паспорта"
            resOk = await SetTextByXPath(this.page, this.xInputRegistrationCertificateNumber, this.VehicleData.strRegistrationCertificateNumber);
            if (!resOk){
                await this.page.screenshot({path: g_PathSS + 'screenshot_EnterRegistrationCertificateNumber.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_EnterRegistrationCertificateNumber.png)`);
                throw ` FAIL => Инпут "Серия и номер тех. паспорта" SetTextByXPath(${this.xInputRegistrationCertificateNumber})`;
            }
            await WaitRender(this.page);
            // https://dev.api.cfo.tl.ee/api/opendatabot/full-vehicle?force=false&registration_certificate_number=
            // https://dev.api.cfo.tl.ee/api/opendatabot/full-vehicle?force=false&license_plate=
            let strUrls = [
                `${g_BackCfoFoxURL}/api/opendatabot/full-vehicle?force=false&registration_certificate_number=`,
            ];
            resOk = await ResponsesListener(this.page, strUrls, true, strUrls.length);

            // Кнопка "Проверить в базе"
            resOk = await ClickByXPath(this.page, this.xButtonCheckInBaseActive);
            if (!resOk){ // НЕ Удачное нажатие - Снять слушателя
                // Снимаем слушателя
                resOk = await ResponsesListener(this.page, strUrls, false, strUrls.length);
                await this.page.screenshot({path: g_PathSS + 'screenshot_xButtonCheckInBaseActiveCF.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_xButtonCheckInBaseActiveCF.png)`);
                throw ` FAIL => Кнопка "Проверить в базе" ClickByXPath(${this.xButtonCheckInBaseActive})`;
            }
            // Ждём завершения всех запросов по карточки Транспорта
            resOk = await ResponsesListenerWaitForAllResponses(31000);
            if(!resOk){
                throw `Fail -> ResponsesListenerWaitForAllResponses(31000)(${strUrls})`;
            }
            // Снимаем слушателя
            resOk = await ResponsesListener(this.page, strUrls, false, strUrls.length);
            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterRegistrationCertificateNumber`);
            return false;
        }
    }//async EnterRegistrationCertificateNumber()
     //----------------------------------------
    async CheckLicensePlateForm(Num) { // проверка , что мы на форме/модалке проверки Гос. номера
        let resOk;
        let resErrorText = ``;
        try {

            if (Num === 0) {
                // Заголовок ВСЕЙ Модалки "Создание нового автомобиля"
                resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xModalHeader0);
                if (!resOk) {
                    resErrorText += `FAIL => Заголовок ВСЕЙ Модалки "Создание нового автомобиля" ${this.xModalHeader0} \n`;
                }
            }else{
                // Заголовок ВСЕЙ Модалки "Создание нового прицепа"
                resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xModalHeader1);
                if (!resOk) {
                    resErrorText += `FAIL => Заголовок ВСЕЙ Модалки "Создание нового прицепа" ${this.xModalHeader1} \n`;
                }
            }

            // Инпут "Гос. номера"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputLicensePlate);
            if(!resOk){
                resErrorText+= `FAIL => Инпут "Гос. номера" ${this.xInputLicensePlate} \n`;
            }
            // Картинка "Пример автомобильного номера"
            resOk = await WaitForElementIsPresentByXPath(21000, this.page, this.xImageSampleLicensePlate);
            if(!resOk){
                resErrorText+= `FAIL => Картинка "Пример автомобильного номера" ${this.xImageSampleLicensePlate} \n`;
            }
            // Кнопка "Проверить в базе" Disabled // !!!!!!!! NOT DISABLED
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xButtonCheckInBaseActive);
            if(!resOk){
                resErrorText+= `FAIL => Кнопка "Проверить в базе" Disabled ${this.xButtonCheckInBaseActive} \n`;
            }
            if(resErrorText !==``){
                await this.page.screenshot({path: g_PathSS + `screenshot_CheckLicensePlateForm${Num}.png`, fullPage: true });
                await console.log(` Скриншот: (screenshot_CheckLicensePlateForm${Num}.png)`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки => ВЫХОД
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckLicensePlateForm( ${Num} )`);
            return false;
        }
    }//async CheckLicensePlateForm(Num)
    //----------------------------------------
    async EnterLicensePlateNumber() {// ГОС НОМЕР
        let resOk;
        try {
            await WaitRender(this.page);await WaitRender(this.page);
            // Инпут "Гос. номера"
            resOk = await SetTextByXPath(this.page, this.xInputLicensePlate, this.VehicleData.strLicensePlate);
            if (!resOk){
                await this.page.screenshot({path: g_PathSS + 'screenshot_EnterLicensePlateNumber.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_EnterLicensePlateNumber.png)`);
                throw ` FAIL => Инпут "Гос. номера" SetTextByXPath(${this.xInputLicensePlate})`;
            }
            await WaitRender(this.page);await WaitRender(this.page);
            // https://dev.api.cfo.tl.ee/api/opendatabot/full-vehicle?force=false&registration_certificate_number=
            // https://dev.api.cfo.tl.ee/api/opendatabot/full-vehicle?force=false&license_plate=
            let strUrls = [
                `${g_BackCfoFoxURL}/api/opendatabot/full-vehicle?force=false&license_plate=`,
            ];
            resOk = await ResponsesListener(this.page, strUrls, true, strUrls.length);
            // Кнопка "Проверить в базе"
            resOk = await ClickByXPath(this.page, this.xButtonCheckInBaseActive);
            if (!resOk){ // НЕ удачное нажатие
                // Снимаем слушателя
                resOk = await ResponsesListener(this.page, strUrls, false, strUrls.length);
                await this.page.screenshot({path: g_PathSS + 'screenshot_xButtonCheckInBaseActiveLP.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_xButtonCheckInBaseActiveLP.png)`);
                throw ` FAIL => Кнопка "Проверить в базе" ClickByXPath(${this.xButtonCheckInBaseActive})`;
            }
            // Ждём завершения всех запросов по карточки Транспорта
            resOk = await ResponsesListenerWaitForAllResponses(31000);
            if(!resOk){
                throw `Fail -> ResponsesListenerWaitForAllResponses(31000)(${strUrls})`;
            }
            // Снимаем слушателя
            resOk = await ResponsesListener(this.page, strUrls, false, strUrls.length);
            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterLicensePlateNumber`);
            return false;
        }
    }//async EnterLicensePlateNumber()
    //----------------------------------------
    async CheckVehicleForm() { // проверка , что мы на форме/модалке карточки Транспорта
        let resOk;
        let resErrorText = ``;
        try {
            resOk = await WaitProcessing(this.page, 21000);
            await WaitRender(this.page);
            // Проверяем что есть Инпут "Тип транспорта" *
            resOk = await WaitForElementIsPresentByXPath(21000, this.page, this.xInputVehicleType);
            if(!resOk){
                resErrorText+= `FAIL => Инпут "Тип транспорта" *  21 сек${this.xInputCarBrand} \n`;
            }
            // Проверяем что есть Инпут "Марка" *
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputCarBrand);
            if(!resOk){
                resErrorText+= `FAIL => Инпут "Марка" * ${this.xInputCarBrand} \n`;
            }
            // Инпут "Модель"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputModel);
            if(!resOk){
                resErrorText+= `FAIL => Инпут "Модель" ${this.xInputModel} \n`;
            }

            if(resErrorText !==``){
                await this.page.screenshot({path: g_PathSS + 'screenshot_CheckVehicleForm.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_CheckVehicleForm.png)`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки => ВЫХОД
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckVehicleForm`);
            return false;
        }
    }//async CheckVehicleForm()
    //----------------------------------------
    async EnterVehicleType() {
        try { let resOk;
            //await WaitRender(this.page);

            // Инпут "Тип транспорта"
            await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectVehicleType);
            resOk = await ClickByXPath(this.page, this.xSelectVehicleType);
            if (!resOk) {
                throw `FAIL => Инпут "Тип транспорта" ClickByXPath(${this.xSelectVehicleType})`;
            }
            // подождать пока будет активен Селект "Тип транспорта"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectVehicleTypeActive);
            if (!resOk) {
                throw `FAIL => НЕ активен Селект "Тип транспорта" ClickByXPath(${this.xSelectVehicleType})`;
            }
            //await WaitRender(this.page);

            resOk = await SetTextByXPath(this.page, this.xInputVehicleType, this.VehicleData.strVehicleType);
            if (!resOk) {
                throw `FAIL => Инпут "Тип транспорта" SetTextByXPath(${this.xInputVehicleType})`;
            }
            //await this.page.waitFor(200);
            // DropDown "Тип транспорта" с нужным Типом
            await WaitForElementIsPresentByXPath(4000, this.page, this.xDropDownVehicleType);
            resOk = await ClickByXPath(this.page, this.xDropDownVehicleType);
            if (!resOk) {
                throw `FAIL => DropDown "Тип транспорта" с нужным Типом ClickByXPath(${this.xDropDownVehicleType})`;
            }
           // await WaitRender(this.page);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterVehicleType`);
            return false;
        }
    }//async EnterVehicleType()
    //----------------------------------------
    async EnterVehicleSubType() {
        try { let resOk;

            // Инпут "Субтип транспорта"
            await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectVehicleSubType);
            //await WaitRender(this.page);
            resOk = await ClickByXPath(this.page, this.xSelectVehicleSubType);
            if (!resOk) {
                throw `FAIL => Инпут "Субтип транспорта" ClickByXPath(${this.xSelectVehicleSubType})`;
            }
            // подождать пока будет активен Селект "Субтип транспорта"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectVehicleSubTypeActive);
            if (!resOk) {
                throw `FAIL => НЕ активен Селект "Субтип транспорта" WaitForElementIsPresentByXPath(${this.xSelectVehicleSubTypeActive})`;
            }
            //await WaitRender(this.page);

            resOk = await SetTextByXPath(this.page, this.xInputVehicleSubType, this.VehicleData.strVehicleSubType);
            if (!resOk) {
                throw `FAIL => Инпут "Субтип транспорта" SetTextByXPath(${this.xInputVehicleSubType})`;
            }
            //await this.page.waitFor(200);
            // DropDown "Тип транспорта" с нужным Типом
            await WaitForElementIsPresentByXPath(4000, this.page, this.xDropDownVehicleSubType);
            resOk = await ClickByXPath(this.page, this.xDropDownVehicleSubType);
            if (!resOk) {
                throw `FAIL => DropDown "Субтип транспорта" с нужным Типом ClickByXPath(${this.xDropDownVehicleSubType})`;
            }
            // await WaitRender(this.page);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterVehicleSubType`);
            return false;
        }
    }//async EnterVehicleSubType()
     //----------------------------------------
    async EnterCapacityAndVolume() {
        try { let resOk;
            //await WaitRender(this.page);

            // Инпут "Тоннаж"
            resOk = await SetTextByXPath(this.page, this.xInputCapacity, this.VehicleData.strVehicleCapacity);
            if (!resOk) {
                throw `FAIL => Инпут "Тоннаж" SetTextByXPath(${this.xInputModel})`;
            }
            // Инпут "Обьем"
            resOk = await SetTextByXPath(this.page, this.xInputVolume, this.VehicleData.strVehicleVolume);
            if (!resOk) {
                throw `FAIL => Инпут "Обьем" SetTextByXPath(${this.xInputModel})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterCapacityAndVolume`);
            return false;
        }
    }//async EnterCapacityAndVolume()
    //----------------------------------------
    async SelectLoadingTypes() {
        try { let resOk;
            await WaitRender(this.page);

            // Кнопки "Тип загрузки"
            for(let i=0 ; i<this.VehicleData.strLoadingTypes.length; i++ ) {
                let xPathTemp = this.xButtonsLoadingTypes + `[span[contains(text(), "${this.VehicleData.strLoadingTypes[i]}")]]`;
                resOk = await ClickByXPath(this.page, xPathTemp);
                if (!resOk) {
                    throw `FAIL => Кнопки "Тип загрузки" ClickByXPath(${this.VehicleData.strLoadingTypes[i]})  (${xPathTemp})`;
                }
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SelectLoadingTypes`);
            return false;
        }
    }//async SelectLoadingTypes()
    //----------------------------------------
    async SelectContainerType() {
        try { let resOk;
            //await WaitRender(this.page);

            // Кнопки "Тип контейнера"
            // Кнопки "Тип контейнера" + [span[contains(text(), "${this.VehicleData.strContainerType}")]]
            resOk = await ClickByXPath(this.page, this.xButtonContainerType);
            if (!resOk) {
                throw `FAIL => Кнопки "Тип контейнера" ClickByXPath(${this.xButtonContainerType})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SelectContainerType`);
            return false;
        }
    }//async SelectContainerType()
    //----------------------------------------
    async EnterCarBrand() {
        try { let resOk;
            //await WaitRender(this.page);

            // Инпут "Марка"
            await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectCarBrand);
            resOk = await ClickByXPath(this.page, this.xSelectCarBrand);
            if (!resOk) {
                throw `FAIL => Инпут "Марка" ClickByXPath(${this.xSelectCarBrand})`;
            }
            // подождать пока будет активен Селект "Марка"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectCarBrandActive);
            if (!resOk) {
                throw `FAIL => НЕ активен Селект "Марка" ClickByXPath(${this.xSelectCarBrand})`;
            }
            //await WaitRender(this.page);

            resOk = await SetTextByXPath(this.page, this.xInputCarBrand, this.VehicleData.strCarBrand);
            if (!resOk) {
                throw `FAIL => Инпут "Марка" SetTextByXPath(${this.xInputCarBrand})`;
            }
            //await this.page.waitFor(200);
            // DropDown "Марка" с нужной Маркой
            await WaitForElementIsPresentByXPath(4000, this.page, this.xDropDownCarBrand);
            resOk = await ClickByXPath(this.page, this.xDropDownCarBrand);
            if (!resOk) {
                throw `FAIL => DropDown "Марка" с нужной Маркой ClickByXPath(${this.xDropDownCarBrand})`;
            }
            //await WaitRender(this.page);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterCarBrand`);
            return false;
        }
    }//async EnterCarBrand()
    //----------------------------------------
    async EnterModel() {
        try { let resOk;
            //await WaitRender(this.page);

            resOk = await SetTextByXPath(this.page, this.xInputModel, this.VehicleData.strModel);
            if (!resOk) {
                throw `FAIL => Инпут "Модель" SetTextByXPath(${this.xInputModel})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterModel`);
            return false;
        }
    }//async EnterModel()
    //----------------------------------------
    async SetQuantityAxles() {
        try { let resOk;

            // Количество осей
            // Кнопки с иконками "Количество осей" [0]
            // тягач, фургон 1-2 [0..1], прицепы 1-3 [0..2] у остальных нет

            resOk = await ClickByXPathNum(this.page, this.VehicleData.strQuantityAxles-1  ,this.xQuantityAxlesButtons);
            if (!resOk) {
                throw `FAIL => Кнопки "Количество осей" ClickByXPathNum[${this.VehicleData.strQuantityAxles-1}](${this.xQuantityAxlesButtons})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SetQuantityAxles`);
            return false;
        }
    }//async SetQuantityAxles()
//----------------------------------------
    async SetOwnerType() {
        try { let resOk;

            // ФилдСет "Владелец транспорта"
            // Владелец транспорта Кнопки "Компания/Контакт"
            if(this.VehicleData.strTypeOwner === "Компания") {
                resOk = await ClickByXPath(this.page, this.xButtonCompanyOwner);
                if (!resOk) {
                    throw `FAIL => Владелец транспорта Кнопка "Компания" ClickByXPath(${this.xButtonCompanyOwner})`;
                }
            }else if (this.VehicleData.strTypeOwner === "Контакт"){
                resOk = await ClickByXPath(this.page, this.xButtonContactOwner);
                if (!resOk) {
                    throw `FAIL => Владелец транспорта Кнопка "Контакт" ClickByXPath(${this.xButtonContactOwner})`;
                }
            } else{
                throw `FAIL => НЕ ПРАВИЛЬНО ЗАДАНЫ ДАННЫЕ "Компания/Контакт"(${this.VehicleData.strTypeOwner})`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SetOwnerType`);
            return false;
        }
    }//async SetOwnerType()
    //----------------------------------------
    async EnterDocumentType() {
        try { let resOk;
            await WaitRender(this.page);
            // ФилдСет "Документ"
            // Селект "Документ"
            await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectDocument);
            resOk = await ClickByXPath(this.page, this.xSelectDocument);
            if (!resOk) {
                throw `FAIL => Инпут "Документ" ClickByXPath(${this.xSelectDocument})`;
            }
            // подождать пока будет активен Селект "Документ"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectDocumentActive);
            if (!resOk) {
                throw `FAIL => НЕ активен Селект "Документ" WaitForElementIsPresentByXPath(${this.xSelectDocumentActive})`;
            }
            await WaitRender(this.page);

            resOk = await SetTextByXPath(this.page, this.xInputDocument, this.VehicleData.strDocument);
            if (!resOk) {
                throw `FAIL => Инпут "Документ" SetTextByXPath(${this.xInputDocument})`;
            }
            //await this.page.waitFor(200);
            // DropDown "Документ" с нужным типом документа
            await WaitForElementIsPresentByXPath(4000, this.page, this.xDropDownDocument);
            resOk = await ClickByXPath(this.page, this.xDropDownDocument);
            if (!resOk) {
                throw `FAIL => DropDown "Документ" с нужным типом документа ClickByXPath(${this.xDropDownDocument})`;
            }
            await WaitRender(this.page);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterDocumentType`);
            return false;
        }
    }//async EnterDocumentType()
     //----------------------------------------
    async EnterSubjectOwner() {
        try { let resOk;
            await WaitRender(this.page);

            // ФилдСет "Компания/Контакт владельца" this.VehicleData.strTypeOwner
            // При переключении кнопок меняется лейбл "Компания/Контакт владельца"
            await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectSubjectOwner);
            resOk = await ClickByXPath(this.page, this.xSelectSubjectOwner);
            if (!resOk) {
                throw `FAIL => Инпут "Компания/Контакт владельца" ClickByXPath(${this.xSelectSubjectOwner})`;
            }
            // подождать пока будет активен Селект "Компания/Контакт владельца"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectSubjectOwnerActive);
            if (!resOk) {
                throw `FAIL => НЕ активен Селект "Компания/Контакт владельца" ClickByXPath(${this.xSelectSubjectOwnerActive})`;
            }
            //await WaitRender(this.page);

            resOk = await SetTextByXPath(this.page, this.xInputSubjectOwner, this.VehicleData.strSubjectOwner);
            if (!resOk) {
                throw `FAIL => Инпут "Компания/Контакт владельца" SetTextByXPath(${this.xInputSubjectOwner})`;
            }
            //await this.page.waitFor(200);
            // DropDown "Компания/Контакт владельца" с нужной строкой
            await WaitForElementIsPresentByXPath(4000, this.page, this.xDropDownSubjectOwner);
            resOk = await ClickByXPath(this.page, this.xDropDownSubjectOwner);
            if (!resOk) {
                throw `FAIL => DropDown "Компания/Контакт владельца" с нужной строкой ClickByXPath(${this.xDropDownSubjectOwner})`;
            }
            await WaitRender(this.page);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterSubjectOwner`);
            return false;
        }
    }//async EnterSubjectOwner()
    //----------------------------------------
    async LoadNewFileInVehicle() {
        let resOk;
        let MyFilePath;
        try {
            // Загружаем и сохраняем на диск Фото ВодУд
            MyFilePath = await SaveTempPictureFromRandomURL(this.browser, 'DriverDocURL', -1);
            //await console.log(`Путь:(${MyFilePath})`);

            // Кнопка "Добавить файл"
            // resOk = await ClickByXPath(this.page, this.xButtonAddFile);
            // if (!resOk) {
            //     throw `FAIL => Кнопка "Добавить файл" LoadNewFileInVehicle ClickByXPath(${this.xButtonAddFile})`;
            // }


            // await console.log(`Клик`);
            // await this.page.waitFor(6000);
            // await console.log(`Старт Промис`);
            if (MyFilePath !== '') {
                const [fileChooserDocs] = await Promise.all([
                    this.page.waitForFileChooser(),
                    ClickByXPath(this.page, this.xButtonAddFile)

                ]);
                // await console.log(`Сер Промис`);
                // await this.page.waitFor(6000);

                await fileChooserDocs.accept([MyFilePath]);
            }else{
                throw `FAIL => SaveTempPictureFromRandomURL(DriverDocURL)`;
            }
           // await console.log(`End Промис`);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in LoadNewFileInVehicle`);
            return false;
        }
    }//async LoadNewFileInVehicle()

    //----------------------------------------
    async SaveVehicle() {
        let resOk;
        try {
            resOk = await WaitForElementIsPresentByXPath(6000, this.page, this.xButtonSave);
            if (!resOk) {
                throw `FAIL => SaveVehicle WaitForElementIsPresentByXPath(${this.xButtonSave})`;
            }
            await WaitRender(this.page);
            // Кнопка "Сохранить"

            resOk = await ClickByXPath(this.page, this.xButtonSave);
            if (!resOk) {
                throw `FAIL => SaveVehicle ClickByXPath(${this.xButtonSave})`;
            }
            await console.log('\x1b[38;5;2m\t',`Сохранение Транспорта ${this.VehicleData.strVehicleType} ${this.VehicleData.strLicensePlate} - OK !!!`, '\x1b[0m');
            //span[@class="spinner-border"]
            // Спиннер формы

            await WaitUntilXPathExist(this.page, 5000, this.xSpinner);
            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SaveVehicle`);
            await this.page.screenshot({path: g_PathSS + `SaveVehicle.png`, fullPage: true});
            await console.log(g_PathSS + `screenshot_SaveVehicle.png`);
            return false;
        }
    }//async SaveVehicle()
    //----------------------------------------
    async CreateNewVehicle(Num) {
        let resOk;
        try {

            //проверка Формы (Тех паспорт)
            resOk = await this.CheckRegistrationCertificateNumberForm(Num);
            if (!resOk) {
                throw `FAIL => проверка Формы (Тех паспорт) this.CheckRegistrationCertificateNumberForm( ${Num} );`;
            }
            // Ввод тех паспорта и нажатие кнопки
            resOk = await this.EnterRegistrationCertificateNumber();
            if (!resOk) {
                throw `FAIL => Ввод тех паспорта и нажатие кнопки this.EnterRegistrationCertificateNumber();`;
            }
            await WarningsRemove(this.page);
            // !!!! Потом написать условие для проверки - мы на "ВВОД Гос номера" или уже нашло и вернуло существующую тачку
            //проверка Формы (Гос. номер)
            resOk = await this.CheckLicensePlateForm(Num);
            if (!resOk) {
                throw `FAIL => проверка Формы (Гос. номер) this.CheckLicensePlateForm( ${Num} );`;
            }
            // Ввод гос номера и нажатие кнопки
            resOk = await this.EnterLicensePlateNumber();
            if (!resOk) {
                throw `FAIL => Ввод гос номера и нажатие кнопки this.EnterLicensePlateNumber();`;
            }
            await WarningsRemove(this.page);
            // Проверка Формы (Транспорта)
            resOk = await this.CheckVehicleForm();
            if (!resOk) {
                throw `FAIL => проверка Формы (Транспорта) this.CheckVehicleForm();`;
            }
            // Ввод и выбор "Тип транспорта"
            resOk = await this.EnterVehicleType();
            if (!resOk) {
                throw `FAIL => Ввод и выбор "Тип транспорта" this.EnterVehicleType();`;
            }
            //-----------------------------------------------------------------------
            // Если "Тягач" , то одна логика заполнения - иначе - другая
            if (this.VehicleData.strVehicleType === 'Тягач'){

            }else{ // НЕ "Тягач"  - другая логика заполнения ------------------------

                // Ввод Тоннажа и Объёма
                resOk = await this.EnterCapacityAndVolume();
                if (!resOk) {
                    throw `FAIL => Ввод Тоннажа и Объёма this.EnterCapacityAndVolume();`;
                }
                // Ввод и выбор "Суб тип транспорта"
                resOk = await this.EnterVehicleSubType();
                if (!resOk) {
                    throw `FAIL => Ввод и выбор "Суб тип транспорта" this.EnterVehicleSubType();`;
                }
                // Если "Контейнеровоз" , то одна логика заполнения - иначе - другая
                if (this.VehicleData.strVehicleSubType === 'Контейнеровоз'){
                    // Выбор "Тип контейнера"
                    resOk = await this.SelectContainerType();
                    if (!resOk) {
                        throw `FAIL => Выбор "Тип контейнера" this.SelectContainerType();`;
                    }

                }else {// НЕ "Контейнеровоз"  - другая логика заполнения ------------------------
                    // Выбор Кнопки "Тип загрузки"
                    resOk = await this.SelectLoadingTypes();
                    if (!resOk) {
                        throw `FAIL => Выбор Кнопки "Тип загрузки" this.SelectLoadingTypes();`;
                    }
                }
            }//  End НЕ "Тягач"  - другая логика заполнения ------------------------
            // Марка
            resOk = await this.EnterCarBrand();
            if (!resOk) {
                throw `FAIL => Ввод и выбор "Марка" this.EnterCarBrand();`;
            }

            //Модель
            resOk = await this.EnterModel();
            if (!resOk) {
                throw `FAIL => Ввод "Модель" this.EnterModel();`;
            }
            // Количество осей
            resOk = await this.SetQuantityAxles();
            if (!resOk) {
                throw `FAIL => Ввод "Количество осей" this.SetQuantityAxles();`;
            }
            // Владелец транспорта Кнопки "Компания/Контакт"
            resOk = await this.SetOwnerType();
            if (!resOk) {
                throw `FAIL => Кнопки "Компания/Контакт" this.SetOwnerType();`;
            }
            // Документ
            resOk = await this.EnterDocumentType();
            if (!resOk) {
                throw `FAIL => Ввод "Документ" this.EnterDocumentType();`;
            }
            // "Компания/Контакт владельца"

            resOk = await this.EnterSubjectOwner();
            if (!resOk) {
                throw `FAIL => Ввод "Компания/Контакт владельца" this.EnterSubjectOwner();`;
            }
            // Если мы не задали в Данных , то ->
            // Прочитаем и запишем "Масса без груза (кг)" и Полная масса (кг)
            if (this.VehicleData.VehicleEmptyWeight === ``) {
                //let WeightEmpty = await ElementGetValue(this.page, 0, this.xInputEmptyWeight);
                this.VehicleData.VehicleEmptyWeight = await ElementGetValue(this.page, 0, this.xInputEmptyWeight);
            }
            if (this.VehicleData.VehicleMaxWeight === ``) {
                //let WeightFull = await ElementGetValue(this.page, 0, this.xInputMaxWeight);
                this.VehicleData.VehicleMaxWeight = await ElementGetValue(this.page, 0, this.xInputMaxWeight);
            }

            resOk = await this.LoadNewFileInVehicle();
            if (!resOk) {
                throw `FAIL => Загрузка Файла this.LoadNewFileInVehicle();`;
            }

            resOk = await this.SaveVehicle();
            if (!resOk) {
                throw `FAIL => Сохранить Транспорт this.SaveVehicle();`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CreateNewVehicle ( ${Num})`);
            return false;
        }
    }//async CreateNewVehicle()
    //----------------------------------------
    async VehicleAddEmptyAndMaxWeights() {
        let resOk;
        try {

            // Инпут "Масса без груза (кг)"
            resOk = await WaitForElementIsPresentByXPath(24000, this.page, this.xInputEmptyWeight);
            if (!resOk) {
                throw `FAIL => Инпут "Масса без груза (кг)" WaitForElementIsPresentByXPath(24000)(${this.xInputEmptyWeight})`;
            }

            resOk = await SetTextByXPath(this.page, this.xInputEmptyWeight, this.VehicleData.VehicleEmptyWeight);
            if (!resOk) {
                throw `FAIL => Инпут "Масса без груза (кг)" SetTextByXPath(${this.xInputEmptyWeight})`;
            }
            await console.log('\x1b[38;5;2m\t', `Масса без груза (кг) добавлена (${this.VehicleData.VehicleEmptyWeight}) - OK !!!`, '\x1b[0m');
            // Инпут "Полная масса (кг)"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputMaxWeight);
            if (!resOk) {
                throw `FAIL => Инпут "Полная масса (кг)" WaitForElementIsPresentByXPath(${this.xInputMaxWeight})`;
            }
            resOk = await SetTextByXPath(this.page, this.xInputMaxWeight, this.VehicleData.VehicleMaxWeight);
            if (!resOk) {
                throw `FAIL => Инпут "Полная масса (кг)" SetTextByXPath(${this.xInputMaxWeight})`;
            }
            await console.log('\x1b[38;5;2m\t', `Полная масса (кг) добавлена (${this.VehicleData.VehicleMaxWeight}) - OK !!!`, '\x1b[0m');

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in VehicleAddEmptyAndMaxWeights`);
            await this.page.screenshot({path: g_PathSS + `screenshot_VehicleAddEmptyAndMaxWeights.png`, fullPage: true});
            await console.log(g_PathSS + `screenshot_VehicleAddEmptyAndMaxWeights.png`);
            return false;
        }
    }//async VehicleAddEmptyAndMaxWeights()

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

}// class Vehicle
//=========================================================
module.exports = {Vehicle};


