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
        // Активная Таблица
        this.xActiveTable = `//div[@role="tabpanel"][@aria-hidden="false"]//table[@role="table"]`;
        // поле в шапке "# договора" aria-colindex="4"
        this.xHeaderNumContract = this.xActiveTable + `//th[@role="columnheader"][div[contains(text(),"# договора")]]`;
        // Редактировать Договор "Карандаш" (Num)
        this.xEditContractNum = this.xActiveTable + `//div[@class="edit-icon"]`;
        //Табличное редактирование, вкладка "Договора", первая кнопка "Корзина" (Удаление Договора - первого в таблице)
        this.xFirstDelete = `//table[@role="table"][.//th[@role="columnheader"]/div[contains(text(),"# договора")]]//div[@data-id="0"][@class="delete-icon"]`;
        //Табличное редактирование, вкладка "Договора", кнопки "Корзина" (Удаление Договора) NUM
        this.xNumDelete = `//table[@role="table"][.//th[@role="columnheader"]/div[contains(text(),"# договора")]]//div[@class="delete-icon"]`;
        // Табличное редактирование, кнопка "+ Добавить Договора"
        this.xPlusContract = `//div[@class="tab-pane active"]//div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xPlusContract+= `/button[@type="button"][contains(text(), "Добавить Договора")]`;
        //Модалка договора тайтл "Договор"
        this.xTitleContract = `//div[contains(@id, "company-order-creation")][@class="modal-body"]//h5[contains(text(), "Договор")]`;
        // Чек "Наличие оригинала"
        this.xCheckHaveOriginal = `//label/span[contains(text(),"Наличие оригинала")]`;
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
        // this.xButtonCreateContract=`//div[contains(@id,"company-order-creation")]//button[@type="submit"][contains(text(), "Создать договор")]`;
        this.xButtonCreateContract=`//div[contains(@id,"company-order-creation")]//button[contains(text(), "Создать")][not(contains(text(), "остаться"))]`;
        // Договор Кнопка "Создать договор" Дизейблед
        //this.xButtonCreateContractDisabled=`//div[contains(@id,"company-order-creation")]//button[@type="submit"][@disabled="disabled"]`;
        this.xButtonCreateContractDisabled=`//div[contains(@id,"company-order-creation")]//button[@type="submit"][@disabled="disabled"]`;
        // Кнопка "Редактировать договор"
        this.xButtonEditContract = `//button[contains(text(), "Редактировать договор")]`;
        // Закрыть Таблицу Договора табличное редактирование
//!!!!!!!!!!!!!! не стабильно нужно чекать сообщения в чипсах !!!!!!!!
        this.xCloseTable=`//button[@type="button"][@class="close"]`;



        // Сообщения
        this.warnContractSuccessfullyCreated = `Договор успешно создан`;
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
    async findContract(strNumContract){
        let resOk;let strNumPosHeader;
        let strNumPosContract;
        //Блок "Контактные данные" пункт "Договор" открытое табличное редактирование
        try {
            // поле в шапке "# договора" aria-colindex="4"
            strNumPosHeader = await ElementGetAttribute(this.page,0, `aria-colindex`, this.xHeaderNumContract);
            if(strNumPosHeader === ``){
                throw `FAIL => Блок "Контактные данные" пункт "Договор" поле в шапке "# договора" не найдено(${this.xHeaderNumContract})`;
            }
            //[contains(text(),"${strNumContract}")]
            let tempX = this.xActiveTable + `//tr[@role="row"]//td[@role="cell"][@aria-colindex="${strNumPosHeader}"]`;
            // await console.log(`tempX=${tempX}`);
            let linkHandlers = await this.page.$x(tempX);
            let tempLength = await linkHandlers.length;
            // await console.log(`tempLength=${tempLength}`);
            let tempPos = -1;
            let PropInnerText;
            for(let i = 0; i < tempLength; i++){
                PropInnerText = await this.page.evaluate(elm => elm.innerText, linkHandlers[i]);
                // await console.log(`PropInnerText(${i})=${PropInnerText}`);
                if(PropInnerText === strNumContract){
                    tempPos = i;
                }
            }// for(let i = 0; i < tempLength; i++){
            if(tempPos === -1){
                throw `FAIL => Блок "Контактные данные" пункт "Договор" не найдена строка с договором №(${strNumContract})`;
            }

            return tempPos;
        }catch (e) {
            await console.log(`${e} in findContract(${strNumContract})`);
            return -1;
        }
    } //async findContract(strNumContract)
    //---------------------------------------------
    async openContract(numPos){
        //Блок "Контактные данные" пункт "Договор" открытое табличное редактирование
        try {
            let resOk;
            // Редактировать Договор "Карандаш" (Num)
            resOk = await ClickByXPathNum(this.page, numPos, this.xEditContractNum);
            if (!resOk) {
                throw `FAIL => Редактировать Договор "Карандаш" ClickByXPathNum(${numPos})(${this.xEditContractNum})`;
            }
            //Модалка договора тайтл "Договор"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xTitleContract);
            if (!resOk) {
                throw `FAIL => Модалка договора тайтл "Договор" WaitForElementIsPresentByXPath(${this.xTitleContract})`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} in openContract`);
            return false;
        }
    } //async openContract()
    //---------------------------------------------
    async EditContractAddOriginalAndSave(){
        //Открыта Модалка "Договор"
        try {
            let resOk;
            // Клик по "Наличие оригинала"
            // Чек "Наличие оригинала"
            resOk = await ClickByXPath(this.page, this.xCheckHaveOriginal);
            if (!resOk) {
                throw `FAIL => Чек "Наличие оригинала" ClickByXPath(${this.xCheckHaveOriginal})`;
            }
            // кнопка "Редактировать договор" должна успеть Задизейблиться
            await WaitRender(this.page);
            // раздизейблить кнопку "Редактировать договор"
            // Кнопка "Редактировать договор"
            resOk = await ElementRemoveAttribute(this.page, 0, `disabled`, this.xButtonEditContract);
            if (!resOk) {
                throw `FAIL => раздизейблить кнопку "Редактировать договор" ElementRemoveAttribute(${this.xButtonEditContract})`;
            }
            resOk = await ClickByXPath(this.page, this.xButtonEditContract);
            if (!resOk) {
                throw `FAIL => Кнопка "Редактировать договор" ClickByXPath(${this.xButtonEditContract})`;
            }
            // await WaitRender(this.page);

            let strWarn = await WarningsRead(this.page, 4000, false);
            if (strWarn === ``) {
                await console.log('\x1b[38;5;3m\t', `??? Странно нет сообщений после сохраниния Договора ???`, '\x1b[0m');
            }else {
                if (! await SubStrIsPresent(this.warnContractSuccessfullyCreated, strWarn)) {
                    await console.log('\x1b[38;5;1m\t', `FAIL -> После создания договора есть ошибка (${strWarn}) - FAIL !!!`, '\x1b[0m');
                    throw `Неизвестная ошибка создания Договора`;
                } else {
                    await console.log('\x1b[38;5;2m\t', `"Редактировать договор" (${strWarn}) - OK !`, '\x1b[0m');
                }
            }

            return true;
        }catch (e) {
            await console.log(`${e} in EditContractAddOriginalAndSave`);
            return false;
        }
    } //async EditContractAddOriginalAndSave()
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
            let resOk, QElem, QElemX, strWarning;
            await WaitRender(this.page);
            //Табличное редактирование, вкладка "Договора", первая кнопка "Корзина" (Удаление Договора - первого в таблице)
            // this.xDelete
            //Табличное редактирование, вкладка "Договора", кнопки "Корзина" (Удаление Договора) NUM
            // this.xNumDelete
            QElem = await ElementGetLength(this.page, this.xNumDelete);
            let QRetryWrong = 0; let QTry = 5;
            while(QElem>0 && QTry>QRetryWrong && QElem>QRetryWrong) {
                //await console.log(`QElem ${QElem}`);
                g_strDialogInitiator = `Удаление Договора`;
                resOk = await ClickByXPathNum(this.page, QRetryWrong, this.xNumDelete);
                if (!resOk){
                    await this.page.screenshot({path: g_PathSS + `screenshot_FAIL_del_contract.png`, fullPage: true });
                    await console.log(g_PathSS + `screenshot_FAIL_del_contract.png`);
                    // await TempStop(this.page);
                    throw `FAIL => Табличное редактирование, вкладка "Договора", первая кнопка "Корзина" (Удаление Договора - первого в таблице)(${this.xNumDelete})`;
                }
                // await WaitRender(this.page);
                strWarning = await WarningsRead(this.page, 2000,false);
                await WarningsRemove(this.page);
                await WaitRender(this.page);
                QElemX = QElem;
                //await console.log(`QElemX ${QElemX}`);
                QElem = await ElementGetLength(this.page, this.xNumDelete);
               // await console.log(`QElem ${QElem}`);
                if (QElem === QElemX){
                    //await console.log(`QElem ${QElem} : QElemX ${QElemX}`);
                    QRetryWrong++;
                    await console.log('\x1b[38;5;1m\t', `Warning !!! - (${strWarning}) - Warning !!!`, '\x1b[0m');
                    await this.page.screenshot({path: g_PathSS + `screenshot_NOT_del_contract.png`, fullPage: true });
                    await console.log(g_PathSS + `screenshot_NOT_del_contract.png`);
                    await WarningsRemove(this.page);
                    await WaitRender(this.page);
                }
            }
            // Нельзя удалить договор, у которого есть оригиналы!
            return true;
        }catch (e) {
            await console.log(`${e}`);
            return false;
        }
    }// async deleteAllContracts()
    //---------------------------------------------
    async AddNewContract(){
        let resOk;

        try {
            let strUrls = [
                `${g_BackCfoFoxURL}/api/company?filter[is_our]=true&page-limit=9999`,
                `${g_BackCfoFoxURL}/api/v2/payment-condition`,
            ];
            resOk = await ResponsesListener(this.page, strUrls, true, strUrls.length);
            // Табличное редактирование, кнопка "+ Добавить Договора"
            resOk = await ClickByXPath(this.page, this.xPlusContract);
            if (!resOk) {
                throw `FAIL => Табличное редактирование, кнопка "+ Добавить Договора"(${this.xPlusContract})`;
            }
            // Ждём завершения всех запросов по открытию Модалки договора
            resOk = await ResponsesListenerWaitForAllResponses(31000);
            if(!resOk){
                throw `Fail -> ResponsesListenerWaitForAllResponses(31000)(${strUrls})`;
            }
            // Снимаем слушателя
            resOk = await ResponsesListener(this.page, strUrls, false, strUrls.length);

            //Модалка договора тайтл "Договор"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTitleContract);
            if (!resOk){
                throw `FAIL => Модалка договора тайтл "Договор"(${this.xTitleContract})`;
            }
            await WaitRender(this.page);
            //ДропДаун "От какой фирмы работаем с контактом" ?? Компанией
            // await ClickByXPath(this.page, this.xOurCompanyInput);
            // await this.page.waitFor(200);
            // await this.page.keyboard.type(this.ContractData.strContractOurCompany, {delay: 20});
            // // Выбор нашей компании в Дропдауне
            // resOk = await ClickByXPath(this.page, this.xOurCompanySelect);
            // if (!resOk){
            //     //await TempStop(page);
            //     throw `FAIL => Выбор нашей компании в Дропдауне(${this.xOurCompanySelect})`;
            // }
            // await WaitUntilPageLoads(this.page);
            const {MultiSelect} = require("../sub_objects/drop_down_obj.js");
            //(browser, page, xForward ,LegendText, Required, NeedStr)
            let OurCompanySelect = new MultiSelect(this.browser, this.page, ``, `От какой фирмы работаем с`, true, this.ContractData.strContractOurCompany);
            resOk = await OurCompanySelect.SetData();
            if (!resOk) {
                throw 'FAIL => OurCompanySelect.SetData(); = FAIL!"';//<--специальный вызов ошибки!
            }

            //Договор Инпут "Условие оплаты"

            // await ClickByXPath(this.page, this.xPaymentConditionInput);
            // await WaitUntilPageLoads(this.page);
            // //Договор ДропДаун Селект "Условие оплаты"
            // resOk = await ClickByXPath(this.page, this.xPaymentConditionSelect);
            // if (!resOk){
            //     throw `FAIL => Договор ДропДаун Селект "Условие оплаты"(${this.xPaymentConditionSelect})`;
            // }
            let PaymentConditionSelect = new MultiSelect(this.browser, this.page, ``, `Условие оплаты`, true, this.ContractData.strPaymentCondition);
            resOk = await PaymentConditionSelect.SetData();
            if (!resOk) {
                throw 'FAIL => PaymentConditionSelect.SetData(); = FAIL!"';//<--специальный вызов ошибки!
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
            resOk = await WaitUntilXPathExist(this.page, 12000, this.xButtonCreateContractDisabled);
            if(!resOk){
                await console.log(`WaitUntilXPathExist(${this.xButtonCreateContractDisabled})`);
                let strPSS = g_PathSS + `screenshot_ButtonCreateContract.png`;
                await this.page.screenshot({path: strPSS, fullPage: true});
                await console.log(`Скриншот: ${strPSS}`);
            }
            resOk = await WarningsClick(this.page);
            if (resOk !== '') {
                if ( await SubStrIsPresent(this.warnContractSuccessfullyCreated, resOk) ) {

                } else {
                throw ` FAIL => После Содания Договора есть Ошибка:(${resOk})`;
                }
            }
            //await console.log(`Кнопка "Создать договор"раздизейблилась--------`);
            //await WaitUntilPageLoads(this.page);
            //Ждём в таблице ПЕРВЫЙ договор
            resOk = await WaitForElementIsPresentByXPath(12000, this.page, this.xFirstDelete);
            if (!resOk) {
                throw `FAIL => Ждём в таблице ПЕРВЫЙ договор(${this.xFirstDelete})`;
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
