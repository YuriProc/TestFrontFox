//'use strict';
class Contact {
    constructor(browser, page, ContactData) {
        this.browser = browser;
        this.page = page;

        this.ContactData = ContactData;
        // MCC - ModalCreateContact
        // Хеадер "Контакт"
        this.xMCCHeaderContact = `//header/h5[@class="modal-title"][contains(text(), "Контакт")]`;
        // Крестик "×" - Закрыть модалку
        this.xMCCCloseModal = `//header[h5[@class="modal-title"][contains(text(), "Контакт")]]/button[@type="button"][@class="close"][contains(text(), "×")]`;
        // Чек "Найти контакт"
        this.xMCCCheckFindContact = `//label[span[@class="fox-checkbox-label"][contains(text(), "Найти контакт")]]`;
        this.xMCCCheckFindContact += `[input[@type="checkbox"]]/div[@class="control-indicator"]`;
        // Чек "Нет номера"
        this.xMCCCheckNoNumber = `//label[span[@class="fox-checkbox-label"][contains(text(), "Нет номера")]]`;
        this.xMCCCheckNoNumber += `[input[@type="checkbox"]]/div[@class="control-indicator"]`;

        // * Инпут "Номер телефона"
        this.xMCCInputPhoneNumber = `//fieldset[legend[contains(text(), "Номер телефона")]]//input[@name="Номер телефона"]`;
        // Инпут "ИНН"
        this.xMCCInputINN = `//fieldset[legend[contains(text(), "ИНН")]]//input`;
        // Кнопка "Проверить в базе"
        this.xMCCButtonCheckInBase = `//button[@type="submit"][contains(text(), "Проверить в базе")]`;
 // Плашка Валидации Обязательных Полей
        this.xValidatorBody = `//div[@class="validator-feedback__body"]`;
        this.xValidatorField = this.xValidatorBody + `/div[@class="validator-feedback__field"]`;
        // Поле в плашке Валидации "Тип контакта"
        this.xValidatorContactType = this.xValidatorField + `/p[contains(text(), "Тип контакта")]`;
        // Поле в плашке Валидации "Фамилия"
        this.xValidatorContactLastName = this.xValidatorField + `/p[contains(text(), "Фамилия")]`;
        // Поле в плашке Валидации "Имя"
        this.xValidatorContactFirstName = this.xValidatorField + `/p[contains(text(), "Имя")]`;
        // Поле в плашке Валидации "Отчество"
        this.xValidatorContactMiddleName = this.xValidatorField + `/p[contains(text(), "Отчество")]`;
        // Поле в плашке Валидации "Номер водительского удостоверения"
        this.xValidatorContactDriverLicenseNumber = this.xValidatorField + `/p[contains(text(), "Номер водительского удостоверения")]`;

        // Поле в плашке Валидации "Работает на"
        this.xValidatorContactWorkWith = this.xValidatorField + `/p[contains(text(), "Работает на")]`;
        // Плашка "Заполните все поля для сохранения!"
        this.xValidatorFillAllFields = `//span[@class="warning-block__name"][contains(text(), "Заполните все поля для сохранения!")]`;
        // ФилдСет "Тип контакта"
        this.xFieldSetContactType = `//fieldset[legend[contains(text(), "Тип контакта")]]`;
        // Селект "Тип контакта"
        this.xMultiSelectContactType = this.xFieldSetContactType + `[//input[@placeholder="Выберите тип контакта"]]//div[@class="multiselect__tags"]`;
        // подождать пока будет активен Селект "Тип контакта"
        this.xMultiSelectContactTypeActive = this.xFieldSetContactType + `//div[@class="multiselect crm-select multiselect--active"]`;
        // Инпут "Тип контакта"
        this.xInputContactType = this.xFieldSetContactType + `//input[@placeholder="Выберите тип контакта"]`;
        // Селект в Инпут "Тип контакта"
        //this.xSelectContactType =`//li[@class="multiselect__element"]/span[@class="multiselect__option multiselect__option--highlight"]`;
        //this.xSelectContactType+=`/span[contains(text(), "${this.ContactData.strContactType}")]`;
        this.xSelectContactType =`//li[@class="multiselect__element"]/span[contains(@class, "multiselect__option")]`;
        this.xSelectContactType+=`/span[text()="${this.ContactData.strContactType}"]`;

        // strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
        //     strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
        //     strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
        // Инпут "Фамилия"
        this.xLastName = `//input[@name="Фамилия"]`;
        // Инпут "Имя"
        this.xFirstName = `//input[@name="Имя"]`;
        // Инпут "Отчество"
        this.xMiddleName = `//input[@name="Отчество"]`;
        // "Работает на"
        this.xWorkWith = `//div[@class="relations__item"][label[contains(text(), "Работает на")]]`;
        // "Работает на" Данные
        this.xWorkWithData = this.xWorkWith + `//div[@class="info"]/div[@class="data"]/span`;
        // "Работает на" "+"
        this.xWorkWithPlus = this.xWorkWith + `//div[@class="add-button"]/i[@class="icon-plus"]`;
        // Модалка Добавить "Работает на"
        // Кнопка "+ Добавить На компанию"
        this.xButtonPlusOnCompany = `//div[@role="tabpanel"][@aria-hidden="false"][@class="tab-pane active"]`;
        this.xButtonPlusOnCompany+= `//button[@type="button"][i[@class="icon-plus"]][contains(text(), "Добавить На компанию")]`;
        // Модалка "Найти существующую компанию"
        this.xModalFindExistsCompany = `//div[@class="modal-content"][header[@class="modal-header"][h5[@class="modal-title"][contains(text(), "Найти существующую компанию")]]]`;
        // Заголовок "Найти существующую компанию"
        this.xHeaderFindExistsCompany = `//h5[@class="modal-title"][contains(text(), "Найти существующую компанию")]`
        // Инпут в модалке "Найти существующую компанию"
        // this.ContactData.strWorkOnCompany = ``;
        // this.ContactData.strWorkOnCompanyEDRPOU =``;
        this.xInputFindExistsCompany = this.xModalFindExistsCompany + `//div[@class="multiselect__tags"][input[@placeholder="Введите для поиска"]]`;
        // Селект в инпуте в модалке "Найти существующую компанию"
        this.xSelectFindExistsCompany =`//li[@class="multiselect__element"]/span[@class="multiselect__option multiselect__option--highlight"]`;
        this.xSelectFindExistsCompany+=`[contains(text(), "${this.ContactData.strWorkOnCompanyEDRPOU}")]`;
        // Кнопка "Сохранить" в "+ Добавить На компанию"
        this.xModalFindExistsCompanyButtonSave = this.xModalFindExistsCompany + `//button[@type="button"][contains(text(), "Сохранить")]`;
        // Закрыть модалку Добавить "Работает на"
        this.xButtonCloseOnCompany = `//button[@class="custom-modal-close"]`;
        // Блок "Водительские данные"
        // Инпут "Номер водительского удостоверения"
        this.xInputDriverLicenseNumber = `//fieldset[legend[contains(text(), "Номер водительского удостоверения")][span[@class="required"][contains(text(), "*")]]]`;
        this.xInputDriverLicenseNumber+= `//input[@name="Номер водительского удостоверения"]`;
        // Кнопка "+ Добавить" (Авто)
        this.xPlusButtonAddVehicle = `//div[@class="driver-data__type"][div[@class="icon"][img[@alt="Автомобили"]]]`;
        this.xPlusButtonAddVehicle+= `/div[@class="add-vehicle-btn"][contains(text(), "Добавить")]`;
        // Кнопка "+ Добавить" (Прицеп)
        this.xPlusButtonAddTrailer = `//div[@class="driver-data__type"][div[@class="icon"][img[@alt="Прицепы"]]]`;
        this.xPlusButtonAddTrailer+= `/div[@class="add-trailer-btn"][contains(text(), "Добавить")]`;

        // в Контакт Кнопка "Сохранить"
        this.xButtonSaveContact = `//div[@class="crm-contact__store"]//button[@type="button"][contains(@class, "primary")][contains(text(), "Сохранить")]`;
        // в Контакт Кнопка "Сохранить и остаться"
        this.xButtonSaveAndStayContact = `//div[@class="crm-contact__store"]//button[@type="button"][contains(@class, "secondary")][contains(text(), "Сохранить и остаться")]`;




    }

    //----------------------------------------
    async CheckModalCreateContact() {
        try {
            let resOk;

            // MCC - ModalCreateContact
            // Хеадер "Контакт"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMCCHeaderContact);
            if (!resOk) {
                throw `FAIL => CheckModalCreateContact => Хеадер "Контакт" (${this.xMCCHeaderContact})`;
            }
            // Крестик "×" - Закрыть модалку
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMCCCloseModal);
            if (!resOk) {
                throw `FAIL => CheckModalCreateContact => Крестик "×" - Закрыть модалку (${this.xMCCCloseModal})`;
            }
            // Чек "Найти контакт"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMCCCheckFindContact);
            if (!resOk) {
                throw `FAIL => CheckModalCreateContact => Чек "Найти контакт" (${this.xMCCCheckFindContact})`;
            }
            // Чек "Нет номера"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMCCCheckNoNumber);
            if (!resOk) {
                throw `FAIL => CheckModalCreateContact => Чек "Нет номера" (${this.xMCCCheckNoNumber})`;
            }
            // * Инпут "Номер телефона"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMCCInputPhoneNumber);
            if (!resOk) {
                throw `FAIL => CheckModalCreateContact => * Инпут "Номер телефона" (${this.xMCCInputPhoneNumber})`;
            }
            // Инпут "ИНН"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMCCInputINN);
            if (!resOk) {
                throw `FAIL => CheckModalCreateContact => Инпут "ИНН" (${this.xMCCInputINN})`;
            }
            // Кнопка "Проверить в базе"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMCCButtonCheckInBase);
            if (!resOk) {
                throw `FAIL => CheckModalCreateContact => Кнопка "Проверить в базе" (${this.xMCCButtonCheckInBase})`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckModalCreateContact`);
            return false;
        }
    }//async CheckModalCreateContact()
    //----------------------------------------
    async MCCEnterPhoneNumber() {
        try { let resOk;

            // * Инпут "Номер телефона" Клик
            // resOk = await ClickByXPath(this.page, this.xMCCInputPhoneNumber);
            // if (!resOk) {
            //     throw `FAIL => MCCEnterPhoneNumber => * Инпут "Номер телефона" ClickByXPath(${this.xMCCInputPhoneNumber})`;
            // }
            // await this.page.waitFor(200);
            // // * Инпут "Номер телефона" Ввод
            // resOk = await TypeInPage(this.page, this.ContactData.PhoneData.strPhoneNumber,20 );
            // if (!resOk) {
            //     throw `FAIL => MCCEnterPhoneNumber => * Инпут "Номер телефона" TypeInPage(${this.ContactData.PhoneData.strPhoneNumber})`;
            // }
            // await this.page.waitFor(200);
            resOk = await SetTextByXPath(this.page, this.xMCCInputPhoneNumber, this.ContactData.PhoneData.strPhoneNumber);
            if (!resOk) {
                throw `FAIL => MCCEnterPhoneNumber => * Инпут "Номер телефона" SetTextByXPath(${this.xMCCInputPhoneNumber})`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in MCCEnterPhoneNumber`);
            return false;
        }
    }//async MCCEnterPhoneNumber()
    //----------------------------------------
    async MCCEnterINN() {
        try { let resOk;
            // Инпут "ИНН" Клик
            // resOk = await ClickByXPath(this.page, this.xMCCInputINN);
            // if (!resOk) {
            //     throw `FAIL => MCCEnterINN => * Инпут "ИНН" ClickByXPath(${this.xMCCInputINN})`;
            // }
            // await this.page.waitFor(200);
            // // Инпут "ИНН" Ввод
            // resOk = await TypeInPage(this.page, this.ContactData.strINN,20 );
            // if (!resOk) {
            //     throw `FAIL => MCCEnterINN => * Инпут "ИНН" TypeInPage(${this.ContactData.strINN})`;
            // }
            // await this.page.waitFor(200);
            resOk = await SetTextByXPath(this.page, this.xMCCInputINN, this.ContactData.strINN);
            if (!resOk) {
                throw `FAIL => MCCEnterINN => * Инпут "ИНН" SetTextByXPath(${this.xMCCInputINN})`;
            }
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in MCCEnterINN`);
            return false;
        }
    }//async MCCEnterINN()
    //----------------------------------------
    async MCCClickCheckInBase() {
        try { let resOk;
            // Кнопка "Проверить в базе"
            resOk = await ClickByXPath(this.page, this.xMCCButtonCheckInBase);
            if (!resOk) {
                throw `FAIL => MCCClickCheckInBase => Кнопка "Проверить в базе" ClickByXPath(${this.xMCCButtonCheckInBase})`;
            }
            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in MCCClickCheckInBase`);
            return false;
        }
    }//async MCCClickCheckInBase()

    //----------------------------------------
    async CheckValidationModalContact() {
        try { let resOk;
            let resErrorText = ``;
            // Плашка Валидации Обязательных Полей
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorBody);
            if (!resOk) {
                resErrorText+= `FAIL => Плашка Валидации Обязательных Полей (${this.xValidatorBody}) \n`;
            }
            // Поле в плашке Валидации "Тип контакта"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactType);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Тип контакта" (${this.xValidatorContactType}) \n`;
            }
            // Поле в плашке Валидации "Фамилия"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactLastName);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Фамилия" (${this.xValidatorContactLastName}) \n`;
            }
            // Поле в плашке Валидации "Имя"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactFirstName);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Имя" (${this.xValidatorContactFirstName}) \n`;
            }
            // // Поле в плашке Валидации "Работает на"
            // resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactWorkWith);
            // if (!resOk) {
            //     resErrorText+= `FAIL => Поле в плашке Валидации "Работает на" (${this.xValidatorContactWorkWith}) \n`;
            // }
            // Плашка "Заполните все поля для сохранения!"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorFillAllFields);
            if (!resOk) {
                resErrorText+= `FAIL => Плашка "Заполните все поля для сохранения!" (${this.xValidatorFillAllFields}) \n`;
            }
            if(resErrorText !==``){
                await this.page.screenshot({path: PathSS + 'screenshot_CheckValidationModalContact.png', fullPage: true });
                await console.log(`${this.ContactData.strLastName}  ${this.ContactData.PhoneData.strPhoneNumber} ИНН: ${this.ContactData.strINN}`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки валидации => ВЫХОД
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckValidationModalContact`);
            return false;
        }
    }//async CheckValidationModalContact()
    //----------------------------------------
    async CheckValidationModalDriver() {
        try { let resOk;
            let resErrorText = ``;
            // Плашка Валидации Обязательных Полей
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorBody);
            if (!resOk) {
                resErrorText+= `FAIL => Плашка Валидации Обязательных Полей (${this.xValidatorBody}) \n`;
            }
            // Поле в плашке Валидации "Фамилия"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactLastName);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Фамилия" (${this.xValidatorContactLastName}) \n`;
            }
            // Поле в плашке Валидации "Имя"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactFirstName);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Имя" (${this.xValidatorContactFirstName}) \n`;
            }
            // Поле в плашке Валидации "Отчество"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactMiddleName);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Отчество" (${this.xValidatorContactFirstName}) \n`;
            }
            // Поле в плашке Валидации "Номер водительского удостоверения"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactDriverLicenseNumber);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Номер водительского удостоверения" (${this.xValidatorContactDriverLicenseNumber}) \n`;
            }
            // Плашка "Заполните все поля для сохранения!"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorFillAllFields);
            if (!resOk) {
                resErrorText+= `FAIL => Плашка "Заполните все поля для сохранения!" (${this.xValidatorFillAllFields}) \n`;
            }
            if(resErrorText !==``){
                await this.page.screenshot({path: PathSS + 'screenshot_CheckValidationModalDriver.png', fullPage: true });
                await console.log(`${this.ContactData.strLastName}  ${this.ContactData.PhoneData.strPhoneNumber} ИНН: ${this.ContactData.strINN}`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки валидации => ВЫХОД
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckValidationModalDriver`);
            return false;
        }
    }//async CheckValidationModalDriver()
     //----------------------------------------
    async CheckValidationModalContactFromLocation() {
        try { let resOk;
            let resErrorText = ``;
            // Плашка Валидации Обязательных Полей
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorBody);
            if (!resOk) {
                resErrorText+= `FAIL => Плашка Валидации Обязательных Полей (${this.xValidatorBody}) \n`;
            }
            // Поле в плашке Валидации "Тип контакта"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactType);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Тип контакта" (${this.xValidatorContactType}) \n`;
            }
            // Поле в плашке Валидации "Фамилия"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactLastName);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Фамилия" (${this.xValidatorContactLastName}) \n`;
            }
            // Поле в плашке Валидации "Имя"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactFirstName);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Имя" (${this.xValidatorContactFirstName}) \n`;
            }
            // Поле в плашке Валидации "Работает на"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorContactWorkWith);
            if (!resOk) {
                resErrorText+= `FAIL => Поле в плашке Валидации "Работает на" (${this.xValidatorContactWorkWith}) \n`;
            }
            // Плашка "Заполните все поля для сохранения!"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xValidatorFillAllFields);
            if (!resOk) {
                resErrorText+= `FAIL => Плашка "Заполните все поля для сохранения!" (${this.xValidatorFillAllFields}) \n`;
            }
            if(resErrorText !==``){
                await this.page.screenshot({path: PathSS + 'screenshot_double_data.png', fullPage: true });
                await console.log(`${this.ContactData.strLastName}  ${this.ContactData.PhoneData.strPhoneNumber} ИНН: ${this.ContactData.strINN}`);
                //await console.log(`${resErrorText}`);
                throw resErrorText; // Ошибки валидации => ВЫХОД
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckValidationModalContactFromLocation`);
            return false;
        }
    }//async CheckValidationModalContactFromLocation()
    //----------------------------------------
    async EnterContactType() {
        try { let resOk;
            await WaitRender(this.page);
            // Инпут "Тип контакта"
            //xMultiSelectContactType
            await WaitForElementIsPresentByXPath(4000, this.page, this.xMultiSelectContactType);
            resOk = await ClickByXPath(this.page, this.xMultiSelectContactType);
            if (!resOk) {
                throw `FAIL => EnterContactType => Инпут "Тип контакта" ClickByXPath(${this.xMultiSelectContactType})`;
            }
            // подождать пока будет активен Селект "Тип контакта"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMultiSelectContactTypeActive);
            if (!resOk) {
                throw `FAIL => EnterContactType => НЕ активен Селект "Тип контакта" ClickByXPath(${this.xMultiSelectContactType})`;
            }
            await WaitRender(this.page);

            resOk = await SetTextByXPath(this.page, this.xInputContactType, this.ContactData.strContactType);
            if (!resOk) {
                throw `FAIL => EnterContactType => Инпут "Тип контакта" SetTextByXPath(${this.xInputContactType})`;
            }
            //await this.page.waitFor(200);
            // Селект в Инпут "Тип контакта"
            await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectContactType);
            resOk = await ClickByXPath(this.page, this.xSelectContactType);
            if (!resOk) {
                throw `FAIL => EnterContactType => Селект в Инпут "Тип контакта" ClickByXPath(${this.xSelectContactType})`;
            }
            await WaitRender(this.page);


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterContactType`);
            return false;
        }
    }//async EnterContactType()

     //----------------------------------------
    async EnterContactFIO() {
        try { let resOk;
        await WaitRender(this.page);

            // Инпут "Фамилия"
            resOk = await SetTextByXPath(this.page, this.xLastName, this.ContactData.strLastName);
            if (!resOk) {
                throw `FAIL => EnterContactFIO => Инпут "Фамилия" SetTextByXPath(${this.xLastName})`;
            }
            // Инпут "Имя"
            resOk = await SetTextByXPath(this.page, this.xFirstName, this.ContactData.strFirstName);
            if (!resOk) {
                throw `FAIL => EnterContactFIO => Инпут "Имя" SetTextByXPath(${this.xFirstName})`;
            }
            // Инпут "Отчество"
            resOk = await SetTextByXPath(this.page, this.xMiddleName, this.ContactData.strMiddleName);
            if (!resOk) {
                throw `FAIL => EnterContactFIO => Инпут "Отчество" SetTextByXPath(${this.xMiddleName})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterContactFIO`);
            return false;
        }
    }//async EnterContactFIO()
    //----------------------------------------
    async EnterDriverLicenseNumber() {
        try { let resOk;
            // Инпут "Номер водительского удостоверения"
            resOk = await SetTextByXPath(this.page, this.xInputDriverLicenseNumber, this.ContactData.strDriverLicenseNumber);
            if (!resOk) {
                throw `FAIL => EnterDriverLicenseNumber => Инпут "Номер водительского удостоверения" SetTextByXPath(${this.xInputDriverLicenseNumber})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterDriverLicenseNumber`);
            return false;
        }
    }//async EnterDriverLicenseNumber()
    //----------------------------------------
    async AddVehicleFromDriver(Num ) {
        try { let resOk;
           // this.ContactData.Vehicles[Num].VehicleData.strVehicleType
            // Обработать "Бус" "Фургон"
        if (this.ContactData.Vehicles[Num].VehicleData.strVehicleType === 'Тягач') {
            // Кнопка "+ Добавить" (Авто)
            await console.log(`AddVehicleFromDriver[${Num}] ${this.ContactData.Vehicles[Num].VehicleData.strVehicleType} === 'Тягач'`);
            resOk = await ClickByXPath(this.page, this.xPlusButtonAddVehicle);
            if (!resOk) {
                throw `FAIL => AddVehicleFromDriver =>  Кнопка "+ Добавить" (Авто) ClickByXPath(${this.xPlusButtonAddVehicle})`;
            }
        }else {
            // Кнопка "+ Добавить" (Прицеп)
            await console.log(`AddVehicleFromDriver[${Num}] ${this.ContactData.Vehicles[Num].VehicleData.strVehicleType} `);
            resOk = await ClickByXPath(this.page, this.xPlusButtonAddTrailer);
            if (!resOk) {
                throw `FAIL => AddVehicleFromDriver =>  Кнопка "+ Добавить" (Прицеп) ClickByXPath(${this.xPlusButtonAddTrailer})`;
            }
        }
            var {Vehicle} = require("../sub_objects/vehicle_obj.js");

            this.ContactData.Vehicles[Num].VehicleData.strSubjectOwner = this.ContactData.strWorkOnCompany;
            let NewVehicle = new Vehicle(this.browser, this.page, this.ContactData.Vehicles[Num].VehicleData);
            //проверка Формы (Тех паспорт)
            resOk = await NewVehicle.CheckRegistrationCertificateNumberForm();
            if (!resOk) {
                throw `FAIL => проверка Формы (Тех паспорт) NewVehicle.CheckRegistrationCertificateNumberForm();`;
            }
            // Ввод тех паспорта и нажатие кнопки
            resOk = await NewVehicle.EnterRegistrationCertificateNumber();
            if (!resOk) {
                throw `FAIL => Ввод тех паспорта и нажатие кнопки NewVehicle.EnterRegistrationCertificateNumber();`;
            }
            // !!!! Потом написать условие для проверки - мы на "ВВОД Гос номера" или уже нашло и вернуло существующую тачку
            //проверка Формы (Гос. номер)
            resOk = await NewVehicle.CheckLicensePlateForm();
            if (!resOk) {
                throw `FAIL => проверка Формы (Гос. номер) NewVehicle.CheckLicensePlateForm();`;
            }
            // Ввод гос номера и нажатие кнопки
            resOk = await NewVehicle.EnterLicensePlateNumber();
            if (!resOk) {
                throw `FAIL => Ввод гос номера и нажатие кнопки NewVehicle.EnterLicensePlateNumber();`;
            }
            // Проверка Формы (Транспорта)
            resOk = await NewVehicle.CheckVehicleForm();
            if (!resOk) {
                throw `FAIL => проверка Формы (Транспорта) NewVehicle.CheckVehicleForm();`;
            }
            // Ввод и выбор "Тип транспорта"
            resOk = await NewVehicle.EnterVehicleType();
            if (!resOk) {
                throw `FAIL => Ввод и выбор "Тип транспорта" NewVehicle.EnterVehicleType();`;
            }
            //-----------------------------------------------------------------------
            // Если "Тягач" , то одна логика заполнения - иначе - другая
            if (this.ContactData.Vehicles[Num].VehicleData.strVehicleType === 'Тягач'){

            }else{ // НЕ "Тягач"  - другая логика заполнения ------------------------

            }//----------------------------------------------------------------------
            // Марка
            resOk = await NewVehicle.EnterCarBrand();
            if (!resOk) {
                throw `FAIL => Ввод и выбор "Марка" NewVehicle.EnterCarBrand();`;
            }

            //Модель
            resOk = await NewVehicle.EnterModel();
            if (!resOk) {
                throw `FAIL => Ввод "Модель" NewVehicle.EnterModel();`;
            }
            // Количество осей
            resOk = await NewVehicle.SetQuantityAxles();
            if (!resOk) {
                throw `FAIL => Ввод "Модель" NewVehicle.SetQuantityAxles();`;
            }
            // Владелец транспорта Кнопки "Компания/Контакт"
            resOk = await NewVehicle.SetOwnerType();
            if (!resOk) {
                throw `FAIL => Ввод "Модель" NewVehicle.SetOwnerType();`;
            }
            // Документ
            resOk = await NewVehicle.EnterDocumentType();
            if (!resOk) {
                throw `FAIL => Ввод "Модель" NewVehicle.EnterDocumentType();`;
            }
            // "Компания/Контакт владельца"

            resOk = await NewVehicle.EnterSubjectOwner();
            if (!resOk) {
                throw `FAIL => Ввод "Модель" NewVehicle.EnterSubjectOwner();`;
            }

            resOk = await NewVehicle.LoadNewFileInVehicle();
            if (!resOk) {
                throw `FAIL => Ввод "Модель" NewVehicle.LoadNewFileInVehicle();`;
            }



        await console.log(`TempStop --- AddVehicleFromDriver`);
await TempStop(this.page);



            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in AddVehicleFromDriver`);
            return false;
        }
    }//async AddVehicleFromDriver()
    //----------------------------------------
    async EnterContactTypeDriver() {
        try { let resOk;
            await WaitRender(this.page);
            // Инпут "Тип контакта"
            //xMultiSelectContactType
            await WaitForElementIsPresentByXPath(4000, this.page, this.xMultiSelectContactType);
            resOk = await ClickByXPath(this.page, this.xMultiSelectContactType);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Инпут "Тип контакта" ClickByXPath(${this.xMultiSelectContactType})`;
            }
            // подождать пока будет активен Селект "Тип контакта"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xMultiSelectContactTypeActive);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => НЕ активен Селект "Тип контакта" ClickByXPath(${this.xMultiSelectContactType})`;
            }
            await WaitRender(this.page);
            // Вводим Тип Контакта
            resOk = await SetTextByXPath(this.page, this.xInputContactType, this.ContactData.strContactType);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Инпут "Тип контакта" Вводим Тип Контакта SetTextByXPath(${this.xInputContactType})`;
            }
            await WaitRender(this.page);
            // Клик по Типу Контакта в ДропДауне
            resOk = await ClickByXPath(this.page, this.xSelectContactType );

            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Инпут "Тип контакта" Клик по Типу Контакта в ДропДауне ClickByXPath(${this.xSelectContactType})`;
            }
            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterContactTypeDriver`);
            return false;
        }
    }//async EnterContactTypeDriver()
    //----------------------------------------
    async EnterContactWorkWith() { // Заполним "Работает на"
        try {
            let resOk;

            // "Работает на" "+"
            resOk = await ClickByXPath(this.page, this.xWorkWithPlus);
            if (!resOk) {
                throw `FAIL => EnterContactWorkWith => "Работает на" "+" ClickByXPath(${this.xWorkWithPlus})`;
            }
            await WaitRender(this.page);
            // Модалка Добавить "Работает на"
            // Кнопка "+ Добавить На компанию"
            resOk = await ClickByXPath(this.page, this.xButtonPlusOnCompany);
            if (!resOk) {
                //await TempStop(this.page);
                throw `FAIL => EnterContactWorkWith => Кнопка "+ Добавить На компанию" ClickByXPath(${this.xButtonPlusOnCompany})`;
            }
            await WaitRender(this.page);
            // Модалка "Найти существующую компанию"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xModalFindExistsCompany);
            if (!resOk) {
                throw `FAIL => EnterContactWorkWith => Модалка "Найти существующую компанию" WaitForElementIsPresentByXPath(${this.xModalFindExistsCompany})`;
            }
            // Инпут в модалке "Найти существующую компанию"
            // this.ContactData.strWorkOnCompany = ``;
            // this.ContactData.strWorkOnCompanyEDRPOU =``;
            resOk = await ClickByXPath(this.page, this.xInputFindExistsCompany);
            if (!resOk) {
                throw `FAIL => EnterContactWorkWith =>Инпут в модалке "Найти существующую компанию" ClickByXPath(${this.xInputFindExistsCompany})`;
            }
            await this.page.waitFor(200);
            resOk = await TypeInPage(this.page, this.ContactData.strWorkOnCompany, 20);
            if (!resOk) {
                throw `FAIL => EnterContactWorkWith =>Инпут в модалке "Найти существующую компанию" TypeInPage(${this.ContactData.strWorkOnCompany})`;
            }
            await WaitRender(this.page);

            // Селект в инпуте в модалке "Найти существующую компанию" Ищем по ЕДРПОУ в Селекте
            resOk = await ClickByXPath(this.page, this.xSelectFindExistsCompany);
            if (!resOk) {
                //await TempStop(this.page);
                throw `FAIL => EnterContactWorkWith => Селект в инпуте в модалке "Найти существующую компанию" ClickByXPath(${this.xSelectFindExistsCompany})`;
            }
            await WaitRender(this.page);
            // Кнопка "Сохранить"
            resOk = await ClickByXPath(this.page, this.xModalFindExistsCompanyButtonSave);
            if (!resOk) {
                throw `FAIL => EnterContactWorkWith => Кнопка "Сохранить" ClickByXPath(${this.xModalFindExistsCompanyButtonSave})`;
            }
            await WaitRender(this.page);
            // Закрыть модалку Добавить "Работает на"
            resOk = await ClickByXPath(this.page, this.xButtonCloseOnCompany);
            if (!resOk) {
                throw `FAIL => EnterContactWorkWith => Закрыть модалку Добавить "Работает на" ClickByXPath(${this.xButtonCloseOnCompany})`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in EnterContactWorkWith`);
            return false;
        }
    }//async EnterContactWorkWith()
    //----------------------------------------
    async CheckEnterContactWorkWith() {
        try {
            let resOk;
            let strGetCompanyName = ``;

            // "Работает на" Данные
            // Должна быть связь с конкретной компанией
            strGetCompanyName = await ElementGetInnerText(this.page, 0, this.xWorkWithData);
            if (strGetCompanyName !== this.ContactData.strWorkOnCompany) {
                await this.page.screenshot({path: PathSS + `screenshot_CheckEnterContactWorkWith.png`, fullPage: true });
                throw `FAIL => "Работает на" Данные: ${strGetCompanyName} !== ${this.ContactData.strWorkOnCompany}`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CheckEnterContactWorkWith`);
            return false;
        }
    }//async CheckEnterContactWorkWith()
    //----------------------------------------
    async ModalCreateContactSaveContact() {
        let returnResult = false;
        try {
            let resOk,WarningText;

            //await this.page.setViewport({width: g_width, height: 1500});
            //await WaitRender(this.page);
            // в Контакт Кнопка "Сохранить и остаться"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xButtonSaveAndStayContact);
            if (!resOk) {
                throw `FAIL => ModalCreateContactSaveContact => в Контакт Кнопка "Сохранить и остаться" WaitForElementIsPresentByXPath(${this.xButtonSaveAndStayContact})`;
            }

            // в Контакт Кнопка "Сохранить"
            //this.xButtonSaveContact = `//button[@type="button"][contains(@class, "primary")][contains(text(), "Сохранить")]`;
            await console.log(`Сохраняем контакт ${this.ContactData.strLastName} ${this.ContactData.strFirstName} ${this.ContactData.strMiddleName}`); // !!!!!!!
            resOk = await ClickByXPath(this.page, this.xButtonSaveContact);
            if (!resOk) {
                await this.page.screenshot({path: PathSS + `screenshot_button_save_contact.png`, fullPage: true });
                await console.log(`${this.xButtonSaveContact}`);
                //await TempStop(this.page);
                throw `FAIL => ModalCreateContactSaveContact => в Контакт Кнопка "Сохранить" ClickByXPathWithScroll(${this.xButtonSaveContact})`;
            }

            WarningText = await WarningsRead(this.page, 4000);

            if (WarningText !== ``){
                // await console.log(`в Контакт Кнопка "Сохранить"`);
                // await console.log(`WarningText=(${WarningText})`);
                if(await SubStrIsPresent('Контакт успешно сохранен!', WarningText)){
                    returnResult = true;
                }else{
                    returnResult = false;
                    await console.log(`FAIL => Не вижу "Контакт успешно сохранен!" \n WarningText=(${WarningText})`);
                    await this.page.screenshot({path: PathSS + `screenshot_WarningsRead_after_button_save_contact.png`, fullPage: true });
                }

                // await this.page.evaluate('document.body.innerHTML = document.body.innerHTML');
                // await this.page.waitFor(500000);
               // throw `FAIL => ModalCreateContactSaveContact => в Контакт Кнопка "Сохранить" WarningsRead`;
            }
           // await WaitRender(this.page);
            await WarningsRemove(this.page, 4000);

            return returnResult;
        } catch (e) {
            await console.log(`${e} \n FAIL in ModalCreateContactSaveContact`);
            return returnResult;
        }
    }//async ModalCreateContactSaveContact()
    //----------------------------------------
    async CreateNewContactFromCompanies() {
        try {
            let resOk;
            resOk = await this.CheckModalCreateContact();
            if (!resOk){
                throw `FAIL => this.CheckModalCreateContact`;
            }

            resOk = await this.MCCEnterPhoneNumber();
            if (!resOk){
                throw `FAIL => this.MCCEnterPhoneNumber`;
            }
            resOk = await this.MCCEnterINN();
            if (!resOk){
                throw `FAIL => this.MCCEnterINN`;
            }
            resOk = await this.MCCClickCheckInBase();
            if (!resOk){
                throw `FAIL => this.MCCClickCheckInBase`;
            }
            // Мы на Форме Создания НОВОГО Контакта
            // Проверим наличие Валидации
            resOk = await this.CheckValidationModalContact();
            if (!resOk){
                throw `FAIL => this.CheckValidationModalContact`;
            }
            // Введём тип Контакта
            resOk = await this.EnterContactType();
            if (!resOk){
                throw `FAIL => this.EnterContactType`;
            }
            // Введём ФИО
            resOk = await this.EnterContactFIO();
            if (!resOk){
                throw `FAIL => this.EnterContactFIO`;
            }

            // Проверим "Работает на" - должно быть заполнено
            resOk = await this.CheckEnterContactWorkWith();
            if (!resOk){
                throw `FAIL => this.CheckEnterContactWorkWith`;
            }
            // Сохраним Контакт
            resOk = await this.ModalCreateContactSaveContact();
            if (!resOk){
                throw `FAIL => this.ModalCreateContactSaveContact`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CreateNewContactFromCompanies`);
            return false;
        }
    }//async CreateNewContactFromCompanies()
    //----------------------------------------
    async CreateNewDriverWithVehicles() {
        try {
            let resOk;
            resOk = await this.CheckModalCreateContact();
            if (!resOk){
                throw `FAIL => this.CheckModalCreateContact`;
            }

            resOk = await this.MCCEnterPhoneNumber();
            if (!resOk){
                throw `FAIL => this.MCCEnterPhoneNumber`;
            }
            resOk = await this.MCCEnterINN();
            if (!resOk){
                throw `FAIL => this.MCCEnterINN`;
            }
            resOk = await this.MCCClickCheckInBase();
            if (!resOk){
                throw `FAIL => this.MCCClickCheckInBase`;
            }
            // Мы на Форме Создания НОВОГО Контакта
            // Проверим Валидацию чистой формы
            resOk = await this.CheckValidationModalContact();
            if (!resOk){
                throw `FAIL => this.CheckValidationModalContact`;
            }
            // Введём Тип контакта Водитель
            resOk = await this.EnterContactType();
            if (!resOk){
                throw `FAIL => this.EnterContactType`;
            }
            // Мы на Форме Создания НОВОГО Контакта Водителя
            // Проверим наличие Валидации
            resOk = await this.CheckValidationModalDriver();
            if (!resOk){
                throw `FAIL => this.CheckValidationModalDriver`;
            }
            // Введём данные в блок "Ключевые данные"
            resOk = await this.EnterContactFIO();
            if (!resOk){
                throw `FAIL => this.EnterContactFIO`;
            }
            // Проверим "Работает на" - должно быть заполнено
            resOk = await this.CheckEnterContactWorkWith();
            if (!resOk){
                throw `FAIL => this.CheckEnterContactWorkWith`;
            }
            // Введём "Номер водительского удостоверения"
            resOk = await this.EnterDriverLicenseNumber();
            if (!resOk){
                throw `FAIL => this.EnterDriverLicenseNumber`;
            }
            // Проверим отсутствие Валидации и Возможность Сохранить
            // ....
            // Добавим Тягач
            resOk = await this.AddVehicleFromDriver(0);
            if (!resOk){
                throw `FAIL => this.AddVehicleFromDriver(0)`;
            }


            await console.log(`TEMP________ CreateNewDriverWithVehicles`);
            await TempStop(this.page);
            // Добавим Прицеп
            resOk = await this.AddVehicleFromDriver(1);
            if (!resOk){
                throw `FAIL => this.AddVehicleFromDriver(1)`;
            }


            // Сохраним Контакт
            resOk = await this.ModalCreateContactSaveContact();
            if (!resOk){
                throw `FAIL => this.ModalCreateContactSaveContact`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CreateNewDriverWithVehicles`);
            return false;
        }
    }//async CreateNewDriverWithVehicles()
    //----------------------------------------
    async CreateNewContactFromLocation() {
        try {
            let resOk;
            resOk = await this.CheckModalCreateContact();
            if (!resOk){
                throw `FAIL => this.CheckModalCreateContact`;
            }

            resOk = await this.MCCEnterPhoneNumber();
            if (!resOk){
                throw `FAIL => this.MCCEnterPhoneNumber`;
            }
            resOk = await this.MCCEnterINN();
            if (!resOk){
                throw `FAIL => this.MCCEnterINN`;
            }
            resOk = await this.MCCClickCheckInBase();
            if (!resOk){
                throw `FAIL => this.MCCClickCheckInBase`;
            }
            // Мы на Форме Создания НОВОГО Контакта
            // Проверим наличие Валидации
            resOk = await this.CheckValidationModalContactFromLocation();
            if (!resOk){
                throw `FAIL => this.CheckValidationModalContactFromLocation`;
            }
            // Введём данные в блок "Ключевые данные"
            resOk = await this.EnterContactFIO();
            if (!resOk){
                throw `FAIL => this.EnterContactKeyData`;
            }
            // Заполним "Работает на"
            resOk = await this.EnterContactWorkWith();
            if (!resOk){
                throw `FAIL => this.EnterContactWorkWith`;
            }
            // Сохраним Контакт
            resOk = await this.ModalCreateContactSaveContact();
            if (!resOk){
                throw `FAIL => this.ModalCreateContactSaveContact`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in CreateNewContactFromLocation`);
            return false;
        }
    }//async CreateNewContactFromLocation()
    //----------------------------------------
    async TemplateTemp() {
        try {
            let resOk;

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp`);
            return false;
        }
    }//async TemplateTemp()


    //----------------------------------------

}// class Contact
//=========================================================
module.exports = {Contact};




