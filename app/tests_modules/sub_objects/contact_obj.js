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
        // Поле в плашке Валидации "Работает на"
        this.xValidatorContactWorkWith = this.xValidatorField + `/p[contains(text(), "Работает на")]`;
        // Кнопка "Заполните все поля для сохранения!"
        this.xButtonSaveDisabled = `//button[@type="button"][@disabled="disabled"][contains(@class, "disabled")]`;
        this.xButtonSaveDisabled+= `[contains(text(), "Заполните все поля для сохранения!")]`;
        // Инпут "Тип контакта"
        this.xInputContactType = `//fieldset[legend[contains(text(), "Тип контакта")]][//input[@placeholder="Выберите тип контакта"]]//div[@class="multiselect__tags"]`;
        // Селект в Инпут "Тип контакта"
        this.xSelectContactType =`//li[@class="multiselect__element"]/span[@class="multiselect__option multiselect__option--highlight"]`;
        this.xSelectContactType+=`/span[contains(text(), "${this.ContactData.strContactType}")]`;

        // strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
        //     strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
        //     strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
        // Инпут "Фамилия"
        this.xLastName = `//input[@name="Фамилия"]`;
        // Инпут "Имя"
        this.xFirstName = `//input[@name="Имя"]`;
        // Инпут "Отчество"
        this.xMiddleName = `//input[@name="Отчество"]`;
        // "Работает на" "+"
        this.xWorkWithPlus = `//div[@class="relations__item"][label[contains(text(), "Работает на")]]`;
        this.xWorkWithPlus+= `//div[@class="add-button"]/i[@class="icon-plus"]`;


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
            await console.log(`FAIL in CheckModalCreateContact ${e} \n`);
            return false;
        }
    }//async CheckModalCreateContact()
    //----------------------------------------
    async MCCEnterPhoneNumber() {
        try { let resOk;

            // * Инпут "Номер телефона" Клик
            resOk = await ClickByXPath(this.page, this.xMCCInputPhoneNumber);
            if (!resOk) {
                throw `FAIL => MCCEnterPhoneNumber => * Инпут "Номер телефона" ClickByXPath(${this.xMCCInputPhoneNumber})`;
            }
            await this.page.waitFor(200);
            // * Инпут "Номер телефона" Ввод
            resOk = await TypeInPage(this.page, this.ContactData.PhoneData.strPhoneNumber,20 );
            if (!resOk) {
                throw `FAIL => MCCEnterPhoneNumber => * Инпут "Номер телефона" TypeInPage(${this.ContactData.PhoneData.strPhoneNumber})`;
            }
            await this.page.waitFor(200);
            return true;
        } catch (e) {
            await console.log(`FAIL in MCCEnterPhoneNumber ${e} \n`);
            return false;
        }
    }//async MCCEnterPhoneNumber()
    //----------------------------------------
    async MCCEnterINN() {
        try { let resOk;
            // Инпут "ИНН" Клик
            resOk = await ClickByXPath(this.page, this.xMCCInputINN);
            if (!resOk) {
                throw `FAIL => MCCEnterINN => * Инпут "ИНН" ClickByXPath(${this.xMCCInputINN})`;
            }
            await this.page.waitFor(200);
            // Инпут "ИНН" Ввод
            resOk = await TypeInPage(this.page, this.ContactData.strINN,20 );
            if (!resOk) {
                throw `FAIL => MCCEnterINN => * Инпут "ИНН" TypeInPage(${this.ContactData.strINN})`;
            }
            await this.page.waitFor(200);
            return true;
        } catch (e) {
            await console.log(`FAIL in MCCEnterINN ${e} \n`);
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
            await console.log(`FAIL in MCCClickCheckInBase ${e} \n`);
            return false;
        }
    }//async MCCClickCheckInBase()

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
            // Кнопка "Заполните все поля для сохранения!"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xButtonSaveDisabled);
            if (!resOk) {
                resErrorText+= `FAIL => Кнопка "Заполните все поля для сохранения!" (${this.xButtonSaveDisabled}) \n`;
            }
            if(resErrorText !==``){
                throw resErrorText; // Ошибки валидации => ВЫХОД
            }


            return true;
        } catch (e) {
            await console.log(`FAIL in CheckValidationModalContactFromLocation ${e} \n`);
            return false;
        }
    }//async CheckValidationModalContactFromLocation()
     //----------------------------------------
    async EnterContactKeyData() {
        try { let resOk;
            // Инпут "Тип контакта"
            resOk = await ClickByXPath(this.page, this.xInputContactType);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Инпут "Тип контакта" ClickByXPath(${this.xInputContactType})`;
            }
            await this.page.waitFor(200);
            resOk = await TypeInPage(this.page, this.ContactData.strContactType, 20);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Инпут "Тип контакта" TypeInPage(${this.ContactData.strContactType})`;
            }
            await this.page.waitFor(200);
            // Селект в Инпут "Тип контакта"
            resOk = await ClickByXPath(this.page, this.xSelectContactType);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Селект в Инпут "Тип контакта" ClickByXPath(${this.xSelectContactType})`;
            }
            // Инпут "Фамилия"
            resOk = await TypeByXPath(this.page, this.xLastName, this.ContactData.strLastName);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Инпут "Фамилия" TypeByXPath(${this.xLastName})`;
            }
            // Инпут "Имя"
            resOk = await TypeByXPath(this.page, this.xFirstName, this.ContactData.strFirstName);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Инпут "Имя" TypeByXPath(${this.xFirstName})`;
            }
            // Инпут "Отчество"
            resOk = await TypeByXPath(this.page, this.xMiddleName, this.ContactData.strMiddleName);
            if (!resOk) {
                throw `FAIL => EnterContactKeyData => Инпут "Отчество" TypeByXPath(${this.xMiddleName})`;
            }

            return true;
        } catch (e) {
            await console.log(`FAIL in EnterContactKeyData ${e} \n`);
            return false;
        }
    }//async EnterContactKeyData()
    //----------------------------------------
    async EnterContactWorkWith() { // Заполним "Работает на"
        try {
            let resOk;

            // "Работает на" "+"
            resOk = await ClickByXPath(this.page, this.xWorkWithPlus);
            if (!resOk) {
                throw `FAIL => EnterContactWorkWith => "Работает на" "+" ClickByXPath(${this.xWorkWithPlus})`;
            }

            // this.xWorkWithPlus = `//div[@class="relations__item"][label[contains(text(), "Работает на")]]`;
            // this.xWorkWithPlus+= `//div[@class="add-button"]/i[@class="icon-plus"]`;

            return true;
        } catch (e) {
            await console.log(`FAIL in EnterContactWorkWith ${e} \n`);
            return false;
        }
    }//async EnterContactWorkWith()
    //----------------------------------------
    async TemplateTemp() {
        try {
            let resOk;

            return true;
        } catch (e) {
            await console.log(`FAIL in TemplateTemp ${e} \n`);
            return false;
        }
    }//async TemplateTemp()


    //----------------------------------------

}// class Contact
//=========================================================
module.exports = {Contact};




