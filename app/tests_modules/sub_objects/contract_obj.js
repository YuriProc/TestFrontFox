//'use strict';
let method = Animal.prototype;

function Animal(age) {
    this._age = age;
}

method.getAge = function() {
    return this._age;
};




class Jack{
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} пердит !!!`);

    }
}

class Contract{
    constructor( page , ContractData) {
        this.page = page;
        this.ContractData = ContractData;
        //Блок "Контактные данные" пункт "Договор"
        this.xContract = `//div[contains(@class, "crm-view__section-block")]/div[@class="container-fluid"]//div[@class="relations__item"]/label[contains(text(), "Договор")]`;
        //Табличное редактирование, вкладка "Договора" (Активная)
        this.xTabContracts = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Договора")]`;
        //Табличное редактирование, вкладка "Договора", первая кнопка "Корзина" (Удаление Договора - первого в таблице)
        this.xDelete = `//table[@role="table"][.//th[@role="columnheader"]/div[contains(text(),"# договора")]]//div[@data-id="0"][@class="delete-icon"]`;
        // Табличное редактирование, кнопка "+ Добавить Договора"
        this.xPlusContract = `//div[@class="tab-pane active"]/div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xPlusContract+= `/button[@type="button"][contains(text(), "Добавить Договора")]`;
        //Модалка договора тайтл "Договор"
        this.xTitleContract = `//div[contains(@id, "company-order-creation")][@class="modal-body"]//h5[contains(text(), "Договор")]`;
        //ДропДаун "От какой фирмы работаем с контактом" ?? Компанией
        this.xOurCompanyInput =`//fieldset[./legend[contains(text(), "От какой фирмы работаем с")]]//div[@class="multiselect__select"]`;
        // Выбор нашей компании в Дропдауне
        this.xOurCompanySelect =`//fieldset[./legend[contains(text(), "От какой фирмы работаем с")]]//span[contains(text(), "${this.ContractData.strContractOurCompany}")]`;
        //Договор Инпут "Условие оплаты"
        this.xPaymentConditionInput =`//fieldset[./legend[contains(text(), "Условие оплаты")]]//div[@class="multiselect__select"]`;
        //Договор ДропДаун Селект "Условие оплаты"
        this.xPaymentConditionSelect=`//fieldset[./legend[contains(text(), "Условие оплаты")]]//span[contains(text(), "${this.ContractData.strPaymentCondition}")]`;
        // Договор Отсрочка Инпут
        this.xPaymentDelay=`//fieldset[./legend[contains(text(), "Отсрочка")]]//input[@name="Отсрочка"][@type="number"]`;
        // Договор Кнопка "Создать договор"
        this.xButtonCreateContract=`//div[contains(@id,"company-order-creation")]//button[@type="submit"][contains(text(), "Создать договор")]`;
        // Договор Кнопка "Создать договор" Дизейблед
        this.xButtonCreateContractDisabled=`//div[contains(@id,"company-order-creation")]//button[@type="submit"][@disabled="disabled"]`;
        // Закрыть Таблицу Договора табличное редактирование
//!!!!!!!!!!!!!! не стабильно нужно чекать сообщения в чипсах !!!!!!!!
        this.xCloseTable=`//button[@type="button"][@class="close"]`;




    }//constructor( page , CompanyData)
    //---------------------------------------------
    async clickContract(){
        //Блок "Контактные данные" пункт "Договор" клик - открыть табличное редактирование
        try {
            let resOk;
            resOk = await ClickByXPath(this.page, this.xContract);
            if (!resOk) {
                throw `FAIL => Блок "Контактные данные" пункт "Договор" клик - открыть табличное редактирование(${this.xContract})`;
            }
            //Табличное редактирование, вкладка "Договора" (Активная)
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xTabContracts);
            if (!resOk) {
                throw `FAIL => Табличное редактирование, вкладка "Договора" (Активная)(${this.xTabContracts})`;
            }
            return true;
        }catch (e) {
            await console.log(`${e}`);
            return false;
        }
    } //async clickContract()
    //---------------------------------------------
    async clickCloseContractTable(){
        // Закрыть Таблицу Договора табличное редактирование
        try {
            let resOk;
            //Табличное редактирование, вкладка "Договора" (Активная)
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xTabContracts);
            if (!resOk) {
                throw `FAIL => Табличное редактирование, вкладка "Договора" (Активная)(${this.xTabContracts})`;
            }
            // Клик по Закрыть Таблицу Договора табличное редактирование
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk) {
                throw `FAIL => Клик по Закрыть Таблицу Договора табличное редактирование(${this.xCloseTable})`;
            }
            await WaitRender(this.page);
            return true;
        }catch (e) {
            await console.log(`${e}`);
            return false;
        }
    } //async clickCloseContractTable()
    //---------------------------------------------
    async deleteAllContracts(){
        try {
            let resOk, QElem;
            await WaitRender(this.page);
            //Табличное редактирование, вкладка "Договора", первая кнопка "Корзина" (Удаление Договора - первого в таблице)
            QElem = await ElementGetLength(this.page, this.xDelete);
            while(QElem>0) {
                await console.log(`deleteAllContracts ${QElem}`);
                resOk = await ClickByXPathNum(this.page, 0, this.xDelete);
                if (!resOk){
                    await this.page.screenshot({path: PathSS + `screenshot_del_contract.png`});
                    await console.log(PathSS + `screenshot_del_contract.png`);
                    await TempStop(this.page);
                    throw `FAIL => Табличное редактирование, вкладка "Договора", первая кнопка "Корзина" (Удаление Договора - первого в таблице)(${this.xDelete})`;
                }
                await WaitUntilPageLoads(this.page);
                QElem = await ElementGetLength(this.page, this.xDelete);
            }
            return true;
        }catch (e) {
            await console.log(`${e}`);
            return false;
        }
    }// async deleteAllContracts()
    //---------------------------------------------
    async AddNewContract(){
        // Табличное редактирование, кнопка "+ Добавить Договора"
        try {
            let resOk;
            resOk = await ClickByXPath(this.page, this.xPlusContract);
            if (!resOk) {
                throw `FAIL => Табличное редактирование, кнопка "+ Добавить Договора"(${this.xPlusContract})`;
            }
            //Модалка договора тайтл "Договор"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTitleContract);
            if (!resOk){
                throw `FAIL => Модалка договора тайтл "Договор"(${this.xTitleContract})`;
            }
            //ДропДаун "От какой фирмы работаем с контактом" ?? Компанией
            await ClickByXPath(this.page, this.xOurCompanyInput);
            await this.page.waitFor(200);
            await this.page.keyboard.type(this.ContractData.strContractOurCompany, {delay: 20});
            // Выбор нашей компании в Дропдауне
            resOk = await ClickByXPath(this.page, this.xOurCompanySelect);
            if (!resOk){
                //await TempStop(page);
                throw `FAIL => Выбор нашей компании в Дропдауне(${this.xOurCompanySelect})`;
            }
            await WaitUntilPageLoads(this.page);
            //Договор Инпут "Условие оплаты"

            await ClickByXPath(this.page, this.xPaymentConditionInput);
            await WaitUntilPageLoads(this.page);
            //Договор ДропДаун Селект "Условие оплаты"
            resOk = await ClickByXPath(this.page, this.xPaymentConditionSelect);
            if (!resOk){
                throw `FAIL => Договор ДропДаун Селект "Условие оплаты"(${this.xPaymentConditionSelect})`;
            }
            // Договор Отсрочка Инпут
            await ClickByXPath(this.page, this.xPaymentDelay);
            if (!resOk){
                throw `FAIL => Договор Отсрочка Инпут(${this.xPaymentDelay})`;
            }
            await WaitUntilPageLoads(this.page);
            await this.page.keyboard.type(this.ContractData.strDelayDays, {delay: 20});
            //await WaitUntilPageLoads(this.page);
            //await this.page.waitFor(2000);
            // Договор Кнопка "Создать договор"
            resOk = await ClickByXPath(this.page, this.xButtonCreateContract);
            if (!resOk){
                throw `FAIL => Договор Кнопка "Создать договор"(${this.xButtonCreateContract})`;
            }
            //await console.log(`Кнопка "Создать договор"`);
            //await WaitUntilPageLoads(this.page);

            //await this.page.waitFor(2000);
            //await WarningCheck(this.page);
            // подождать пока не пропадёт disabled="disabled" у button type="submit"
            // Договор Кнопка "Создать договор" Дизейблед
            await WaitUntilXPathExist(this.page, 4000, this.xButtonCreateContractDisabled);
            resOk = await WarningCheck(this.page);
            if (resOk !== '') {
                if ( await SubStrIsPresent('Договор успешно создан', resOk) ) {

                } else {
                throw ` FAIL => После Содания Договора есть Ошибка:(${resOk})`;
                }
            }
            //await console.log(`Кнопка "Создать договор"раздизейблилась--------`);
            //await WaitUntilPageLoads(this.page);
            //Ждём в таблице ПЕРВЫЙ договор
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xDelete);
            if (!resOk) {
                throw `FAIL => Ждём в таблице ПЕРВЫЙ договор(${this.xDelete})`;
            }

            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`${e}`);
            return false;
        }

    }//async AddNewContract()
    //---------------------------------------------
}// class Contract
//================================================================
let AddNewContract = async  function( page , CompanyData){
    try {
        let xPath, resOk;
        await WaitUntilPageLoads(page);
    }catch (e) {
        await console.log(e);
        return false;
    }
}; // AddNewContract = async  function( page , CompanyData){
//--------


module.exports = {Animal, Jack, Contract, AddNewContract};
