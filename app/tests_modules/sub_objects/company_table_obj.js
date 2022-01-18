//'use strict';
class CompanyTable {
    constructor(page, CompanyData) {
        this.page = page;
        this.CompanyData = CompanyData;
        this.ColumnNumberEDRPOU = ``; // - заполнится в функции CheckInTableEDRPOU
        // Подождать пока Таблица Загрузится
        this.xTableBusy = `//table[@role="table"][@aria-busy="true"]`;
        this.xTableReady = `//table[@role="table"][@aria-busy="false"]`;

        // Верхнее Меню "Компании"
        this.xMenuCompany = `//a[@href="/crm/companies"][contains(text(), "Компании")]`;
        // Верхнее Меню "Компании" Активно
        this.xMenuCompanyActive = `//a[@href="/crm/companies"][contains(text(), "Компании")][@aria-current="page"]`;
        // Фильтр таблицы Компании
        this.xFilterCompanyTable = `//div[@id="navigation-input"][input[@placeholder="Открыть фильтр"]]`;
        // Инпут "ЕДРПОУ"
        this.xInputEDRPOU = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "ЕДРПОУ")]]`;
        this.xInputEDRPOU+= `//input[@name="ЕДРПОУ"]`;
        // Ответственный Крестик Очистить поле
        this.xClearResponsibleField = `//fieldset[legend[contains(text(), "Ответственный")]]//button[@title="Очистить поле"]`;
        // Кнопка "Фильтровать"
        this.xButtonFilter = `//button[@type="submit"][contains(text(), "Фильтровать")]`;
        // Заголовок в таблице содержащий "ЕДРПОУ"
        this.xHeaderEDRPOU = `//th[@role="columnheader"][div[contains(text(),"ЕДРПОУ")]]`;
        // Поле в строке "ЕДРПОУ" - определено в функции CheckInTableEDRPOU
        //this.xFieldInRowEDRPOU = `//td[@aria-colindex="5"][@role="cell"]/a[contains(text(), "111111111111")]`;

    }//constructor
    //----------------------------------------
    async ClickMenuCompanies(){
        try{ let resOk;

            await WaitRender(this.page);
            // Верхнее Меню "Компании"
            resOk = await ClickByXPath(this.page, this.xMenuCompany);
            if (!resOk) {
                throw `FAIL => Верхнее Меню "Компании" ClickByXPath(${this.xMenuCompany})`;
            }
            await WaitRender(this.page);
            // Подождать пока Таблица начнёт грузиться
            await WaitUntilXPathExist( this.page, 12000, this.xTableBusy);

            // Подождать пока Таблица Загрузится
            resOk = await WaitForElementIsPresentByXPath( 21000, this.page, this.xTableReady);
            if (!resOk) {
                throw `FAIL => Подождать #1 пока Таблица Загрузится 21 сек(${this.xTableReady})`;
            }

            await WaitRender(this.page);
            // Верхнее Меню "Компании"
            resOk = await ClickByXPath(this.page, this.xMenuCompany);
            if (!resOk) {
                throw `FAIL => Верхнее Меню "Компании" ClickByXPath(${this.xMenuCompany})`;
            }
            // Подождать пока Таблица Загрузится
            resOk = await WaitForElementIsPresentByXPath( 21000, this.page, this.xTableReady);
            if (!resOk) {
                throw `FAIL => Подождать #2 пока Таблица Загрузится 21 сек(${this.xTableReady})`;
            }
            await WaitRender(this.page);
            // Верхнее Меню "Компании" Активно
            resOk = await WaitForElementIsPresentByXPath( 2000, this.page, this.xMenuCompanyActive);
            if (!resOk) {
                // await console.log(`FAIL => Верхнее Меню "Компании" Активно`);
                // await TempStop(this.page);
                throw `FAIL => Верхнее Меню "Компании" Активно(${this.xMenuCompanyActive})`;
            }

            return true;
        }catch (e) {
            let strMsg = `${e} \n FAIL in ClickMenuCompanies `;
            await ScreenLog(this.page, strMsg, 1);
            return false;
        }
    }//async ClickMenuCompanies()
    //----------------------------------------
    async ClickFilter(){
        try{ let resOk;
            // Фильтр таблицы Компании
            resOk = await ClickByXPath(this.page, this.xFilterCompanyTable);
            if (!resOk) {
                throw `FAIL => Фильтр таблицы Компании ClickByXPath(${this.xFilterCompanyTable})`;
            }
            await WaitRender(this.page);
            // Инпут "ЕДРПОУ"
            resOk = await WaitForElementIsPresentByXPath( 2000, this.page, this.xInputEDRPOU);
            if (!resOk) {
                throw `FAIL => Инпут "ЕДРПОУ" WaitForElementIsPresentByXPath(${this.xInputEDRPOU})`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in ClickFilter `);
            return false;
        }
    }//async ClickFilter()
    //----------------------------------------
    async FilterInTableEDRPOU(strEDRPOU = ``){
        let strFilterEDRPOU;
        try{ let resOk;
            let strUrl = `${g_BackCfoFoxURL}/api/v2/user?page-limit=9999`;
            resOk = await ResponseListener(this.page, strUrl, true);
            resOk = await this.ClickFilter();
            if (!resOk) {
                throw `FAIL => ClickFilter`;
            }
            resOk = await ResponseListenerWaitForResponse(21000);
            if(!resOk){
                throw `FAIL => ResponseListenerWaitForResponse(21000) (${strUrl})`;
            }
            resOk = await ResponseListener(this.page, strUrl, false);
            await WaitRender(this.page);
            await WaitForElementIsPresentByXPath(1500, this.page, this.xClearResponsibleField);
            if(0 < await ElementGetLength(this.page, this.xClearResponsibleField)){
                // Ответственный Крестик Очистить поле
                resOk = await ClickByXPathNum(this.page, 0, this.xClearResponsibleField);
                await WaitRender(this.page);
            }
            // Инпут "ЕДРПОУ"
            if(strEDRPOU === ``){
                strFilterEDRPOU = this.CompanyData.strCompanyCode;
            }else{
                strFilterEDRPOU = strEDRPOU;
            }
            resOk = await SetTextByXPath(this.page, this.xInputEDRPOU, strFilterEDRPOU); //strEDRPOU
            if (!resOk) {
                throw `FAIL => Инпут "ЕДРПОУ" SetTextByXPath(${this.xInputEDRPOU})`;
            }
            await WaitRender(this.page);
            //await ScreenLog(this.page, `Салихов, ЕДРПОУ: (${strEDRPOU})`);
           // await TempStop(this.page, `Салихов`);
            // ставим слушателя
            let strRequest = `${g_BackCfoFoxURL}/api/company?search[code]`;
            resOk = await ResponseListener(this.page, strRequest, true);
            // Кнопка "Фильтровать"
            //await ScreenLog(this.page, `Салихов(${strFilterEDRPOU})`, 3);
            resOk = await ClickByXPath(this.page, this.xButtonFilter);
            if (!resOk) {
                throw `FAIL => Кнопка "Фильтровать" ClickByXPath(${this.xButtonFilter})`;
            }
            resOk =  await ResponseListenerWaitForResponse(21000);
            if(!resOk){
                throw `FAIL => Запрос(${strRequest}) ResponseListenerWaitForResponse(21000 ms)`;
            }
            // await console.log(`g_tempDataFromEventListener_requestUrl=\n${g_tempDataFromEventListener_requestUrl}\n------------`);
            // снимаем слушателя
            resOk = await ResponseListener(this.page, strRequest, false);

            await WaitRender(this.page);
            await WaitRender(this.page);
            //await ScreenLog(this.page, ` #2 Салихов, ЕДРПОУ: (${strEDRPOU})`);
            return true;
        }catch (e) {

            let strMsg = `${e} \n FAIL in FilterInTableEDRPOU(${strFilterEDRPOU})`;
            await ScreenLog(this.page, strMsg, 1);
            return false;
        }
    }//async FilterInTableEDRPOU()
    //----------------------------------------
    async CheckInTableEDRPOU(strEDRPOU = ``){ // Должна быть ТОЛЬКО одна строка с таким ЕДРПОУ
        try{ let resOk;
            // Заголовок в таблице содержащий "ЕДРПОУ"
            resOk = await WaitForElementIsPresentByXPath( 4000, this.page, this.xHeaderEDRPOU);
            if (!resOk) {
                throw `FAIL => Заголовок в таблице содержащий "ЕДРПОУ" WaitForElementIsPresentByXPath(${this.xHeaderEDRPOU})`;
            }
            // найти номер колонки с названием "ЕДРПОУ"
            this.ColumnNumberEDRPOU = await ElementGetAttribute(this.page, 0, `aria-colindex`, this.xHeaderEDRPOU);
            // await console.log(`ColumnNumber=${this.ColumnNumberEDRPOU}`);
            if (this.ColumnNumberEDRPOU === ``){
                throw `FAIL => найти номер колонки с названием "ЕДРПОУ" ColumnNumber === \`\``;
            }
            resOk = await WaitForElementIsPresentByXPath(12000, this.page , this.xTableReady);
            if(!resOk){
                throw `FAIL => Таблица Компаний не прогрузилась за 12 сек`;
            }
            await WaitRender(this.page);
            // Поле в строке "ЕДРПОУ" - определено в функции CheckInTableEDRPOU
            let strNum;
            if(strEDRPOU === ``) {
                strNum = this.CompanyData.strCompanyCode;
            }else{
                strNum = strEDRPOU;
            }
            this.xFieldInRowEDRPOU = `//td[@aria-colindex="${this.ColumnNumberEDRPOU}"][@role="cell"]/a[contains(text(), "${strNum}")]`;// ${strEDRPOU}
            await WaitForElementIsPresentByXPath( 1500, this.page, this.xFieldInRowEDRPOU);
            await WaitRender(this.page);
            // resOk = await WaitForElementIsPresentByXPath( 4000, this.page, this.xFieldInRowEDRPOU);
            // if (!resOk) {
            //     throw `FAIL => Поле в строке "ЕДРПОУ" WaitForElementIsPresentByXPath(${this.xFieldInRowEDRPOU})`;
            // }
            // узнаем сколько таких строк, должна быть ТОЛЬКО ОДНА
            resOk = await ElementGetLength(this.page, this.xFieldInRowEDRPOU);
            // if (resOk !== 1) {
            //     await console.log(`Поле в строке "ЕДРПОУ"=${this.CompanyData.strCompanyCode} , должна быть ТОЛЬКО ОДНА. ElementGetLength !== 1 (${resOk})`);
            //    // throw `FAIL => Поле в строке "ЕДРПОУ"=${this.CompanyData.strCompanyCode} ElementGetLength !== 1 (${resOk})`;
            //     return false;
            // }
            // // Запишем ID Компании в CompanyData.strCompanyID
            // await ScreenLog(this.page, `Салихов(${strNum}) resOk=(${resOk})`, 3);
            return resOk;
        }catch (e) {
            let strMsg = `${e} \n FAIL in CheckInTableEDRPOU`;
            await ScreenLog(this.page, strMsg, 1);
            return false;
        }
    }//async CheckInTableEDRPOU()
    //----------------------------------------
    async GetNewEDRPOU(MaxTry, strEDRPOU){
        let resOk;
        let resNum;
        try{
            // Клик по Компании
            resOk = await this.ClickMenuCompanies();
            if (!resOk) {
                throw `FAIL => this.ClickMenuCompanies`;//<--специальный вызов ошибки!
            }
            for (let i=0 ; i<MaxTry; i++) {
                // Отфильтровать по ЕДРПОУ
                resOk = await this.FilterInTableEDRPOU(strEDRPOU);
                if (!resOk) {
                    throw `FAIL => this.FilterInTableEDRPOU()`;//<--специальный вызов ошибки!
                }

                //Проверить, что в Таблице ТОЛЬКО одна строка с таким ЕДРПОУ
                resNum = await this.CheckInTableEDRPOU(strEDRPOU);
               // await console.log(`resNum=${resNum}`);
                if (resNum === 0) {
                    if( g_tempDataFromEventListener_json.data &&
                        g_tempDataFromEventListener_json.data.data &&
                        g_tempDataFromEventListener_json.data.data.length !== 0){
                        await console.dir(g_tempDataFromEventListener_json.data.data, { showHidden: true, depth: 3, colors: true }); // depth: null - infinity
                        await ScreenLog(this.page, `Салихов(${strEDRPOU}) Data.Length=(${g_tempDataFromEventListener_json.data.data.length})`, 1);
                    }
                    return strEDRPOU; // <- Успешный выход ТУТ !!!
                }else{
                    strEDRPOU = await GetFunnyStr('StrCompanyCodeArray');
                    await console.log(`попытка № ${i+2}`);
                }
            }// for (let i=0 ; i<5; i++)

            return false;
        }catch (e) {
            await console.log(`FAIL in GetNewEDRPOU ${e} \n`);
            return false;
        }
    }//async GetNewEDRPOU(strEDRPOU)
    //----------------------------------------
    async OpenAndCheckCompany(){
        try{ let resOk, xPath, tempHref, tempID;

            await WaitRender(this.page);
            //Клмк на Карандаш в строке, где ЕДРПОУ = strEDRPOU
            xPath = `//tbody[@role="rowgroup"][@class="crm-table__body"]`;
            xPath+= `/tr[@role="row"][td[@aria-colindex="${this.ColumnNumberEDRPOU}"][@role="cell"]/a[contains(text(), "${this.CompanyData.strCompanyCode}")]]`;
            xPath+= `/td[@aria-colindex="1"][@role="cell"]/div/a`;
            // let Q = await ElementGetLength(this.page, xPath);
            // await console.log(`Q=${Q}`);
            tempHref = await ElementGetHref(this.page,0, xPath);
            if (tempHref === ''){
                throw `FAIL => tempHref === '' ElementGetHref(${xPath})`;
            }
            this.CompanyData.strCompanyHref = tempHref;
            //await console.log(`href=${tempHref}`);
            tempID = await GetIDFromHref(tempHref);
            if (tempID === ''){
                throw `FAIL => tempID === '' GetIDFromHref(${tempHref})`;
            }
            if (this.CompanyData.strCompanyID !== ``) {
                this.CompanyData.strCompanyID = tempID;
            }else if(this.CompanyData.strCompanyID !== tempID){
                throw `FAIL => tempID(${tempID}) !== strCompanyID(${this.CompanyData.strCompanyID})`;
            }

            //await console.log(`tempID=${tempID}`);
            //  пока не открывать - не готово
            // resOk = await ClickByXPath(this.page, xPath);
            // if (!resOk) {
            //     throw `FAIL => Кнопка "Карандаш" ClickByXPath(${xPath})`;
            // }




            return true;
        }catch (e) {
            await console.log(`FAIL in OpenAndCheckCompany ${e} \n`);
            return false;
        }
    }//async OpenAndCheckCompany()
    //----------------------------------------
    async TemplateTemp(){
        try{ let resOk;

            return true;
        }catch (e) {
            await console.log(`FAIL in TemplateTemp ${e} \n`);
            return false;
        }
    }//async TemplateTemp()
    //----------------------------------------

}// class CompanyTable
//=========================================================
module.exports = {CompanyTable};
