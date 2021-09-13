//'use strict';
class Vehicle {
    constructor(browser, page, VehicleData) {
        this.browser = browser;
        this.page = page;

        this.VehicleData = VehicleData;
        // MCC - ModalCreateContact
        // Заголовок ВСЕЙ Модалки
        this.xModalHeader = `//div[contains(@id, "add-vehicle-modal")]/header/h5[contains(text(), "Создание нового автомобиля")]`;
        // Хеадер "Контакт"
        // Чек "Не стандарт"
        this.xCheckNotStandart = `//div[contains(@id, "check-license-plate")]//label[contains(text(), "Не стандарт")]`;
        // Инпут "Серия и номер тех. паспорта"
        this.xInputTaxNumber = `//fieldset[legend[contains(text(), "Серия и номер тех. паспорта")]]/input`;
        // Кнопка "Проверить в базе"
        this.xButtonCheckInBaseDisabled = `//div[contains(@id, "check-license-plate")]//button[contains(text(), "Проверить в базе")][@disabled="disabled"]`;
        this.xButtonCheckInBase = `//div[contains(@id, "check-license-plate")]//button[contains(text(), "Проверить в базе")]`;

    }//constructor(browser, page, VehicleData)
    //----------------------------------------


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

}// class Vehicle
//=========================================================
module.exports = {Vehicle};


