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
            // Верхнее Меню "Компании"
            resOk = await ClickByXPath(this.page, this.xMenuCompany);
            if (!resOk) {
                throw `FAIL => Верхнее Меню "Компании" ClickByXPath(${this.xMenuCompany})`;
            }
            await WaitRender(this.page);
            // Подождать пока Таблица начнёт грузиться
            await WaitUntilXPathExist( this.page, 5000, this.xTableBusy);

            // Подождать пока Таблица Загрузится
            resOk = await WaitForElementIsPresentByXPath( 2000, this.page, this.xTableReady);
            if (!resOk) {
                throw `FAIL => Подождать пока Таблица Загрузится(${this.xTableReady})`;
            }


            // Верхнее Меню "Компании"
            resOk = await ClickByXPath(this.page, this.xMenuCompany);
            if (!resOk) {
                throw `FAIL => Верхнее Меню "Компании" ClickByXPath(${this.xMenuCompany})`;
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
            await console.log(`${e} \n FAIL in ClickMenuCompanies `);
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
    async FilterInTableEDRPOU(){
        try{ let resOk;
            resOk = await this.ClickFilter();
            if (!resOk) {
                throw `FAIL => ClickFilter`;
            }
            // Инпут "ЕДРПОУ"
            resOk = await SetTextByXPath(this.page, this.xInputEDRPOU, this.CompanyData.strCompanyCode); //strEDRPOU
            if (!resOk) {
                throw `FAIL => Инпут "ЕДРПОУ" TypeByXPath(${this.xInputEDRPOU})`;
            }
            // Кнопка "Фильтровать"
            resOk = await ClickByXPath(this.page, this.xButtonFilter);
            if (!resOk) {
                throw `FAIL => Кнопка "Фильтровать" ClickByXPath(${this.xButtonFilter})`;
            }
            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in FilterInTableEDRPOU`);
            return false;
        }
    }//async FilterInTableEDRPOU()
    //----------------------------------------
    async CheckInTableEDRPOU(){ // Должна быть ТОЛЬКО одна строка с таким ЕДРПОУ
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

            // Поле в строке "ЕДРПОУ" - определено в функции CheckInTableEDRPOU
            this.xFieldInRowEDRPOU = `//td[@aria-colindex="${this.ColumnNumberEDRPOU}"][@role="cell"]/a[contains(text(), "${this.CompanyData.strCompanyCode}")]`;// ${strEDRPOU}
            resOk = await WaitForElementIsPresentByXPath( 4000, this.page, this.xFieldInRowEDRPOU);
            if (!resOk) {
                throw `FAIL => Поле в строке "ЕДРПОУ" WaitForElementIsPresentByXPath(${this.xFieldInRowEDRPOU})`;
            }
            // узнаем сколько таких строк, должна быть ТОЛЬКО ОДНА
            resOk = await ElementGetLength(this.page, this.xFieldInRowEDRPOU);
            if (resOk !== 1) {
                await console.log(`Поле в строке "ЕДРПОУ"=${this.CompanyData.strCompanyCode} , должна быть ТОЛЬКО ОДНА. ElementGetLength !== 1 (${resOk})`);
               // throw `FAIL => Поле в строке "ЕДРПОУ"=${this.CompanyData.strCompanyCode} ElementGetLength !== 1 (${resOk})`;
                return false;
            }
            // Запишем ID Компании в CompanyData.strCompanyID

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in CheckInTableEDRPOU`);
            return false;
        }
    }//async CheckInTableEDRPOU()
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
