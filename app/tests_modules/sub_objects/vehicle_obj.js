//'use strict';
class Vehicle {
    constructor(browser, page, VehicleData) {
        this.browser = browser;
        this.page = page;

        this.VehicleData = VehicleData;
        // Заголовок ВСЕЙ Модалки "Создание нового автомобиля"
        this.xModalHeader = `//div[contains(@id, "add-vehicle-modal")]/header/h5[contains(text(), "Создание нового автомобиля")]`;
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
        //----------------------

    }//constructor(browser, page, VehicleData)
    //----------------------------------------
    async CheckRegistrationCertificateNumberForm() { // проверка , что мы на форме/модалке проверки тех паспорта
        let resOk;
        let resErrorText = ``;
        try {
            // Заголовок ВСЕЙ Модалки "Создание нового автомобиля"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xModalHeader);
            if(!resOk){
                resErrorText+= `FAIL => Заголовок ВСЕЙ Модалки "Создание нового автомобиля" ${this.xModalHeader} \n`;
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
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xImageSampleRegistrationCertificateNumber);
            if(!resOk){
                resErrorText+= `FAIL => Картинка "Пример тех паспорта" ${this.xImageSampleRegistrationCertificateNumber} \n`;
            }
            // Кнопка "Проверить в базе" Disabled
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xButtonCheckInBaseDisabled);
            if(!resOk){
                resErrorText+= `FAIL => Кнопка "Проверить в базе" Disabled ${this.xButtonCheckInBaseDisabled} \n`;
            }
            if(resErrorText !==``){
                await this.page.screenshot({path: PathSS + 'screenshot_CheckRegistrationCertificateNumberForm.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_CheckRegistrationCertificateNumberForm.png)`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки => ВЫХОД
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckRegistrationCertificateNumberForm`);
            return false;
        }
    }//async CheckRegistrationCertificateNumberForm()
    //----------------------------------------
    async EnterRegistrationCertificateNumber() { // ТЕХ ПАСПОРТ
        let resOk;
        try {
            // Инпут "Серия и номер тех. паспорта"
            resOk = await SetTextByXPath(this.page, this.xInputRegistrationCertificateNumber, this.VehicleData.strRegistrationCertificateNumber);
            if (!resOk){
                await this.page.screenshot({path: PathSS + 'screenshot_EnterRegistrationCertificateNumber.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_EnterRegistrationCertificateNumber.png)`);
                throw ` FAIL => Инпут "Серия и номер тех. паспорта" SetTextByXPath(${this.xInputRegistrationCertificateNumber})`;
            }
            await WaitRender(this.page);

            // Кнопка "Проверить в базе"
            resOk = await ClickByXPath(this.page, this.xButtonCheckInBaseActive);
            if (!resOk){
                await this.page.screenshot({path: PathSS + 'screenshot_xButtonCheckInBaseActiveCF.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_xButtonCheckInBaseActiveCF.png)`);
                throw ` FAIL => Кнопка "Проверить в базе" ClickByXPath(${this.xButtonCheckInBaseActive})`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterRegistrationCertificateNumber`);
            return false;
        }
    }//async EnterRegistrationCertificateNumber()
     //----------------------------------------
    async CheckLicensePlateForm() { // проверка , что мы на форме/модалке проверки Гос. номера
        let resOk;
        let resErrorText = ``;
        try {
            // Заголовок ВСЕЙ Модалки "Создание нового автомобиля"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xModalHeader);
            if(!resOk){
                resErrorText+= `FAIL => Заголовок ВСЕЙ Модалки "Создание нового автомобиля" ${this.xModalHeader} \n`;
            }
            // Инпут "Гос. номера"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputLicensePlate);
            if(!resOk){
                resErrorText+= `FAIL => Инпут "Гос. номера" ${this.xInputLicensePlate} \n`;
            }
            // Картинка "Пример автомобильного номера"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xImageSampleLicensePlate);
            if(!resOk){
                resErrorText+= `FAIL => Картинка "Пример тех паспорта" ${this.xImageSampleLicensePlate} \n`;
            }
            // Кнопка "Проверить в базе" Disabled // !!!!!!!! NOT DISABLED
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xButtonCheckInBaseActive);
            if(!resOk){
                resErrorText+= `FAIL => Кнопка "Проверить в базе" Disabled ${this.xButtonCheckInBaseActive} \n`;
            }
            if(resErrorText !==``){
                await this.page.screenshot({path: PathSS + 'screenshot_CheckLicensePlateForm.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_CheckLicensePlateForm.png)`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки => ВЫХОД
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckLicensePlateForm`);
            return false;
        }
    }//async CheckLicensePlateForm()
    //----------------------------------------
    async EnterLicensePlateNumber() {// ГОС НОМЕР
        let resOk;
        try {
            // Инпут "Гос. номера"
            resOk = await SetTextByXPath(this.page, this.xInputLicensePlate, this.VehicleData.strLicensePlate);
            if (!resOk){
                await this.page.screenshot({path: PathSS + 'screenshot_EnterLicensePlateNumber.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_EnterLicensePlateNumber.png)`);
                throw ` FAIL => Инпут "Гос. номера" SetTextByXPath(${this.xInputLicensePlate})`;
            }
            await WaitRender(this.page);

            // Кнопка "Проверить в базе"
            resOk = await ClickByXPath(this.page, this.xButtonCheckInBaseActive);
            if (!resOk){
                await this.page.screenshot({path: PathSS + 'screenshot_xButtonCheckInBaseActiveLP.png', fullPage: true });
                await console.log(` Скриншот: (screenshot_xButtonCheckInBaseActiveLP.png)`);
                throw ` FAIL => Кнопка "Проверить в базе" ClickByXPath(${this.xButtonCheckInBaseActive})`;
            }


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

            // Проверяем что есть Инпут "Тип транспорта" *
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xInputVehicleType);
            if(!resOk){
                resErrorText+= `FAIL => Инпут "Тип транспорта" * ${this.xInputCarBrand} \n`;
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
                await this.page.screenshot({path: PathSS + 'screenshot_CheckVehicleForm.png', fullPage: true });
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
            await WaitRender(this.page);

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
            await console.log(`Путь:(${MyFilePath})`);

            // Кнопка "Добавить файл"
            // resOk = await ClickByXPath(this.page, this.xButtonAddFile);
            // if (!resOk) {
            //     throw `FAIL => Кнопка "Добавить файл" LoadNewFileInVehicle ClickByXPath(${this.xButtonAddFile})`;
            // }


            await console.log(`Клик`);
            await this.page.waitFor(6000);
            await console.log(`Старт Промис`);
            const [fileChooserDocs] =await Promise.all([
                this.page.waitForFileChooser(),
                ClickByXPath(this.page, this.xButtonAddFile)

            ]);
            await console.log(`Сер Промис`);
            await this.page.waitFor(6000);

            await fileChooserDocs.accept([MyFilePath]);
            await console.log(`End Промис`);



            await TempStop(this.page);
            if (MyFilePath !== '') {

                let [fileChooserDocs] = await Promise.all([
                    this.page.waitForFileChooser(),
                    // Кнопка "Добавить файл"
                    ClickByXPath(this.page, this.xButtonAddFile),

                ]);
                await this.page.waitFor(3000);
                await fileChooserDocs.accept([MyFilePath]);
                await this.page.waitFor(3000);
                //await DeleteTempPicture(MyFilePath);
                //await fileChooser.cancel();
                //await page.waitFor(1111500);
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in LoadNewFileInVehicle`);
            return false;
        }
    }//async LoadNewFileInVehicle()

    //----------------------------------------


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


