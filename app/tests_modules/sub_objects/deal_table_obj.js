class DealTable {
    constructor(browser, page, DealData) {
        this.browser = browser;
        this.page = page;
        this.DealData = DealData;
        // Пункт меню "Сделки"
        this.xMenuItemDeals = `//a[@href="/cfo"]`;
        // Таблица Сделок Готова
        this.xTableDeals = `//div[@class="speedyTable"]`;
        this.xTableDealsBusy = this.xTableDeals + `[//span[@class="spinner-border"]]`;
        // Открыть Фильтр
        this.xDealFilter = `//div[@id="navigation-input"]/input[@placeholder="Открыть фильтр"]`;
        // Панель Фильтра
        this.xFilterPanel = `//div[@id="name_filter"]`;
        // Добавить поле
        this.xAddField = `//div[@class="add-new-field"][contains(text(), "Добавить поле")]`;
        // ФилдСет "Добавить поле"
        this.xFieldSetAddField = `//fieldset[legend[contains(text(), "Добавить поле")]]`;
        // стрелка раскрытие списка
        this.xAddFieldArrowDown = this.xFieldSetAddField + `//div[@class="multiselect__select"]`;
        // Раскрытый список
        this.xAddFieldOpenedList = this.xFieldSetAddField + `//div[@class="multiselect__content-wrapper"][not (contains(@class,"display: none"))]`;
        // Инпут "Добавить поле"
        this.xAddFieldInput = this.xFieldSetAddField + `//input[@placeholder="Выберите или введите"]`;
        // Инпут "Добавить поле" Спиннер Поиска
        this.xAddFieldSpinner = this.xFieldSetAddField + `//div[@class="multiselect__spinner"][@style="display: none;"]`;
        // "Добавить поле" ДропДаун нужная сторока +[text()="${Name}"] or [contains(text(), "${Name}")]]
        this.xAddFieldNeedStr = this.xFieldSetAddField + `//li[@class="multiselect__element"]/span/span`;
        // Фильтр Кнопка "Фильтровать"
        this.xFilterButtonFilter = `//button[contains(@class, "fox-button__primary")][contains(text(), "Фильтровать")]`;
        // Фильтр Кнопка со спиннером
        this.xFilterButtonSpinner = `//footer[contains(@class, "filter-footer filter-top-footer")]/button/div[@class="fox-spinner"]`;
        // Фильтр Кнопка "Сбросить"
        this.xFilterButtonDiscard = `//button[contains(@class, "fox-button__text")][contains(text(), "Сбросить")]`;
        // Таблица ---------------------
        this.xTable = `//div[@data-qa-table="speedy_table"]`;
        //--------------
        const {DataCfoFields} = require("../../data/data_cfo_fields.js");
        this.CFO = new DataCfoFields(browser, page);


    } // constructor(browser, page, DealData)
    //----------------------------------------
    async ClickMenuDeals() {
        let resOk;
        try {
            await ScrollByXPathNum(this.page, `//div[@id="crm-top-header"]`);
            // Пункт меню "Сделки"
            resOk = await WaitForElementIsPresentByXPath(12000, this.page, this.xMenuItemDeals);
            if (!resOk) {
                throw `FAIL => Пункт меню "Сделки" WaitForElementIsPresentByXPath(${this.xMenuItemDeals})`;
            }
            // Пункт меню "Сделки" Клик
            resOk = await ClickByXPath(this.page, this.xMenuItemDeals);
            if (!resOk) {
                throw `FAIL => Пункт меню "Сделки" Клик ClickByXPath(${this.xTableDealsBusy})`;
            }
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ClickMenuDeals`);
            return false;
        }
    }//async ClickMenuDeals()
    //----------------------------------------
    async TableDealsReady() {
        let resOk;
        try { // Ждём отрисовки таблицы сделок
            resOk = await WaitForElementIsPresentByXPath(12000, this.page, this.xTableDeals);
            if (!resOk) {
                throw `FAIL => Ждём отрисовки таблицы сделок WaitForElementIsPresentByXPath(${this.xTableDeals})`;
            }
            await ScrollByXPathNum(this.page, `//div[@id="crm-top-header"]`);
            // Ждём пока пропадёт спиннер таблицы сделок
            resOk = await WaitUntilXPathExist(this.page, 11000, this.xTableDealsBusy);
            if (!resOk) {
                throw `FAIL => Ждём пока пропадёт спиннер таблицы сделок WaitUntilXPathExist(${this.xTableDealsBusy})`;
            }
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in TableDealsReady`);
            return false;
        }
    }//async TableDealsReady()
    //----------------------------------------
    async OpenFilter() {
        let resOk;
        try {
            // Открыть Фильтр
            resOk = await ClickByXPath(this.page, this.xDealFilter);
            if (!resOk) {
                throw `FAIL => Открыть Фильтр ClickByXPath(${this.xDealFilter})`;
            }
            //await WaitRender(this.page);
            // Панель Фильтра
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xFilterPanel);
            if (!resOk) {
                throw `FAIL => Панель Фильтра WaitForElementIsPresentByXPath(${this.xFilterPanel})`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in OpenFilter`);
            return false;
        }
    }//async OpenFilter()
    //----------------------------------------
    async AddFilterFieldOld(FieldName, FieldValue) {
        let resOk;
        try {
            // Добавить поле
            resOk = await ClickByXPathW(this.page, this.xAddField);
            if (!resOk) {
                throw `FAIL => Добавить поле ClickByXPathW(${this.xAddField})`;
            }
            // ФилдСет "Добавить поле"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xFieldSetAddField);
            if (!resOk) {
                throw `FAIL => ФилдСет "Добавить поле" WaitForElementIsPresentByXPath(${this.xFieldSetAddField})`;
            }
            // стрелка раскрытие списка
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xAddFieldArrowDown);
            if (!resOk) {
                throw `FAIL => Добавить поле раскрытие списка WaitForElementIsPresentByXPath(${this.xAddFieldArrowDown})`;
            }
            // стрелка раскрытие списка
            resOk = await ClickByXPath(this.page, this.xAddFieldArrowDown);
            if (!resOk) {
                throw `FAIL => Добавить поле раскрытие списка ClickByXPath(${this.xAddFieldArrowDown})`;
            }
            // Раскрытый список
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xAddFieldOpenedList);
            if (!resOk) {
                throw `FAIL => "Добавить поле" Раскрытый список WaitForElementIsPresentByXPath(${this.xAddFieldOpenedList})`;
            }
            // Инпут "Добавить поле"
            resOk = await SetTextByXPath(this.page, this.xAddFieldInput, FieldName);
            if (!resOk) {
                throw `FAIL => Инпут "Добавить поле" (${FieldName})SetTextByXPath(${this.xAddFieldInput})`;
            }
            // Инпут "Добавить поле" Спиннер Поиска
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xAddFieldSpinner);
            if (!resOk) {
                throw `FAIL => Инпут "Добавить поле" Спиннер Поиска WaitForElementIsPresentByXPath(${this.xAddFieldSpinner})`;
            }
            // "Добавить поле" ДропДаун нужная сторока +`[text()="${Name}"]` or `[contains(text(), "${Name}")]]`
            let tempX = this.xAddFieldNeedStr + `[text()="${FieldName}"]`;
            resOk = await ClickByXPathW(this.page, tempX);
            if (!resOk) {
                throw `FAIL => "Добавить поле" ДропДаун нужная сторока ClickByXPath(${tempX})`;
            }
            let xInputField = `//fieldset[legend[contains(text(), "${FieldName}")]]//input`;
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, xInputField);
            if (!resOk) {
                throw `FAIL => Инпут "Добавить поле" Значение WaitForElementIsPresentByXPath(${xInputField})`;
            }
            await console.log(`this.DealData.strDealID=(${this.DealData.strDealID})`);
            await console.log(`FieldValue=(${FieldValue})`);

            // TypeByXPath
            // SetTextByXPath .toString()
            resOk = await SetTextByXPath(this.page, xInputField, this.DealData.strDealID);
            if (!resOk) {
                throw `FAIL => Инпут "Добавить поле" Значение SetTextByXPath(${xInputField})`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in AddFilterFieldOld(${FieldName}, ${FieldValue})`);
            return false;
        }
    }//async AddFilterFieldOld(FieldName, FieldValue)
     //----------------------------------------
    async AddFilterField(FieldName, FieldValue) {
        let resOk;
        try {
            // Добавить поле
            resOk = await ClickByXPathW(this.page, this.xAddField);
            if (!resOk) {
                throw `FAIL => Добавить поле ClickByXPathW(${this.xAddField})`;
            }

            // await console.log(`this.DealData.strDealID=(${this.DealData.strDealID})`);
            // await console.log(`FieldValue=(${FieldValue})`);
            const {MultiSelect} = require("../sub_objects/drop_down_obj.js");
            //(browser, page, xForward ,LegendText, Required, NeedStr)
            let FilterField = new MultiSelect(this.browser, this.page, ``, `Добавить поле`, false, FieldName);
            resOk = await FilterField.SetDataWithChangeLegend(FieldName);
            if (!resOk) {
                throw 'FAIL => FilterField.SetDataWithChangeLegend(); = FAIL!"';//<--специальный вызов ошибки!
            }



            // TypeByXPath
            // SetTextByXPath .toString()
            // resOk = await SetTextByXPath(this.page, xInputField, this.DealData.strDealID);
            resOk = await SetTextByXPath(this.page, FilterField.xInput, FieldValue);
            if (!resOk) {
                throw `FAIL => Инпут "Добавить поле" Значение SetTextByXPath(${FilterField.xInput})`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in AddFilterField(${FieldName}, ${FieldValue})`);
            return false;
        }
    }//async AddFilterField(FieldName, FieldValue)
    //----------------------------------------
    async PressFilterButton() {
        let resOk;
        try {
            // Фильтр Кнопка "Фильтровать"
            resOk = await ClickByXPathW(this.page, this.xFilterButtonFilter);
            if (!resOk) {
                throw `FAIL => Фильтр Кнопка "Фильтровать" ClickByXPathW(${this.xFilterButtonFilter})`;
            }
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in PressFilterButton`);
            return false;
        }
    }//async PressFilterButton()
    //----------------------------------------
    async DealTableFilterByField(FieldName, FieldValue) {
        let resOk;
        try {
            // Открыть Фильтр
            resOk = await this.OpenFilter();
            if (!resOk) {
                throw `FAIL => Открыть Фильтр this.OpenFilter();`;
            }
            // Добавить поле для Фильтрации
            resOk = await this.AddFilterField(FieldName, FieldValue);
            if (!resOk) {
                throw `FAIL => Добавить поле для Фильтрации this.AddFilterField();`;
            }
            // Нажать Кнопку Фильтровать
            resOk = await this.PressFilterButton();
            if (!resOk) {
                throw `FAIL => Нажать Кнопку Фильтровать this.PressFilterButton();`;
            }
            // Фильтр Кнопка со спиннером
            resOk = await WaitUntilXPathExist(this.page,19000, this.xFilterButtonSpinner);
            if (!resOk) {
                throw `FAIL => Фильтр Кнопка со спиннером WaitUntilXPathExist(${this.xFilterButtonSpinner});`;
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in DealTableFilterByField`);
            return false;
        }
    }//async DealTableFilterByField(FieldName, FieldValue)
    //----------------------------------------
    async TableDealCheckOneCurrentDeal(AllFLen) {
        let resOk;
        let ColValue,DValue;
        try {

            let AllFLen = this.CFO.Fields.length;
            let LenColName,LenColValue;
            let ColName;
            let C,resC,sC;
            //AllFLen = 13;
            for(let i=0 ; i < AllFLen; i++){
                ColName = this.CFO.Fields[i][0];
                LenColName = ColName.length;
                LenColName = 42 - LenColName;

                ColValue = await this.CFO.GetCellValue(0, ColName);
                C = FRGB(0,1,4,1);
                DValue = await this.GetDealValue(i);

                if(ColValue === DValue){
                    C = FRGB(0,1,4,1);
                    await console.log(`${C}${ColName} = ${'.'.repeat(LenColName)}(${ColValue})${FRGB()}`);
                }else if (DValue === `*skipped*`) {
                    C = FRGB(0,1,1,1);
                    await console.log(`${C}${ColName} = ${'.'.repeat(LenColName)}(${ColValue})${FRGB()}`);
                }else{
                    C = FRGB(0,4,1,1);
                    await console.log(`${C}!!!->${ColName} = ${'.'.repeat(LenColName)}(${ColValue})!=(${DValue})${FRGB()}`);
                }

            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in TableDealCheckOneCurrentDeal`);
            return false;
        }
    }//async TableDealCheckOneCurrentDeal()
    //----------------------------------------
    async GetDealValue(NCF) { // NCF - Number CFO Field
        let resOk;
        let DName,DLogic;
        try {
            DLogic = this.CFO.Fields[NCF][4];
            if(DLogic === '='){
                DName = this.CFO.Fields[NCF][3];
                return this.DealData[DName];
            }else if(DLogic === '1' || DLogic === 1){
                return await this.GetDealCustomValue(this.CFO.Fields[NCF][1]);

            }else if (DLogic === ''){
                return '*skipped*';
            }


            return ``;
        } catch (e) {
            await console.log(`${e} \n FAIL in GetDealValue(${NCF})`);
            return '';
        }
    }//async GetDealValue()
    //----------------------------------------
    async GetDealCustomValue(IName) {
        let resOk;
        let DValue = ``;
        try {
            switch (IName) {
                case "date_loading":
                    DValue = this.DealData.PointsLoading[0].PointLoading.strInDate;
                    break;
                case "point_loadings":
                    DValue = await this.GetDealInOutStrPoints(0); // 0 - In / 1 - Out
                    break;
                case "point_unloading":
                    DValue = await this.GetDealInOutStrPoints(1); // 0 - In / 1 - Out
                    break;
                case "client_cash_true":
                    DValue = await this.GetDealFreightsAmount(0,0); // 0 - Client , 0 - Cash
                    break;
                case "client_cash_true_payment_form":
                    DValue = await this.GetDealFreightsPaymentForm(0,0); // 0 - Client , 0 - Cash
                    break;
                case "client_cash_false":
                    DValue = await this.GetDealFreightsAmount(0,1); // 0 - Client , 1 - CashLess
                    break;
                case "client_cash_false_payment_form":
                    DValue = await this.GetDealFreightsPaymentForm(0,1); // 0 - Client , 1 - CashLess
                    break;

                case "client_debt":
                    DValue = `не заполнено`;
                    break;
                default:
                    throw `FAIL => Не найден столбец таблицы CFO GetDealCustomValue(${IName});`;

            } // switch (IName)

            return DValue;
        } catch (e) {
            await console.log(`${e} \n FAIL in GetDealCustomValue`);
            return ``;
        }
    }//async GetDealCustomValue()
    //----------------------------------------
    async GetDealInOutStrPoints(InOut) { // InOut =0 - In / =1 - Out
        let resValue = ``;
        let lengthPArray;
        let addrKey;
        let tempArray = {};
        try {
            if (InOut === 0){
                lengthPArray = this.DealData.PointsLoading.length;
            }else if(InOut === 1){
                lengthPArray = this.DealData.PointsUnLoading.length;
            }else{
                throw ` ошибка внутренняя InOut !== 0 || 1 (${InOut})`;
            }
            for (let i = 0; i < lengthPArray; ++i)
            {
                if (InOut === 0){
                    addrKey = this.DealData.PointsLoading[i].PointLoading.strAddressFOX;
                }else {
                    addrKey = this.DealData.PointsUnLoading[i].PointUnLoading.strAddressFOX;
                }
                if (tempArray[addrKey] !== undefined)
                    ++tempArray[addrKey];
                else
                    tempArray[addrKey] = 1;
            }// for (let i = 0; i < lengthPArray; ++i)
            let n = 0;
            for (let key in tempArray){
                if (n !== 0){
                    resValue+= `; `;
                }
                resValue+= key;
                if (tempArray[key] > 1){
                    resValue+= ` (${tempArray[key]})`;
                }
                n++;
            }
            return resValue;
        } catch (e) {
            await console.log(`${e} \n FAIL in GetDealInOutStrPoints(${InOut})`);
            return ``;
        }
    }//async GetDealInOutStrPoints()
    //----------------------------------------
    async GetDealFreightsAmount(CT,CCL) { // CL - Client/Transporter (0,1) , CCL - Cash/CashLess (0,1)
        let resOk;
        let resValue = ``;
        let keyFreights = ``;
        let lengthFArray;
        let Amount = 0;
        let tempArray = {};
        try {
            if (CT === 0){
                keyFreights = `ClientFreights`;
            }else if(CT === 1){
                keyFreights = `TransporterFreights`;
            }else{
                throw ` ошибка внутренняя CT !== 0 || 1 (${CT})`;
            }
            lengthFArray = this.DealData[keyFreights].length;
            if (CCL !== 0 && CCL !== 1){
                throw ` ошибка внутренняя CCL !== 0 || 1 (${CCL})`;
            }
            for (let i = 0; i < lengthFArray; ++i)
            {
                if(CCL === 0){ // `нал`, `софт`, `топливо`,
                    if (this.DealData[keyFreights][i].PaymentForm === `нал` ||
                        this.DealData[keyFreights][i].PaymentForm === `софт` ||
                        this.DealData[keyFreights][i].PaymentForm === `топливо` ){
                        Amount+= Number(this.DealData[keyFreights][i].Amount);
                    }
                }else{ // 'без ПДВ', `з ПДВ 0%`, `з ПДВ 20%`
                    if (this.DealData[keyFreights][i].PaymentForm === `без ПДВ` ||
                        this.DealData[keyFreights][i].PaymentForm === `з ПДВ 0%` ||
                        this.DealData[keyFreights][i].PaymentForm === `з ПДВ 20%` ){
                        Amount+= Number(this.DealData[keyFreights][i].Amount);
                        //await console.log(`this.DealData[keyFreights][i].Amount=(${this.DealData[keyFreights][i].Amount})`);
                    }
                }
            }// for (let i = 0; i < lengthPArray; ++i)
            if (Amount === 0 ){
                resValue = ``;
            }else {
               // console.log(new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2}).format(Amount));
                //console.log(Amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& '));
                // Это разделитель тысяч и две цифры после запятой
                resValue = Amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
            }
            return resValue;
        } catch (e) {
            await console.log(`${e} \n FAIL in GetDealFreightsAmount(${CT}, ${CCL})`);
            return ``;
        }
    }//async GetDealFreightsAmount(CT,CCL)
    //-----------------------------------
    async GetDealFreightsPaymentForm(CT,CCL) { // CL - Client/Transporter (0,1) , CCL - Cash/CashLess (0,1)
        let resOk;
        let resValue = ``;
        let keyFreights = ``;
        let lengthFArray;
        let tempKey;
        let strPF = ``;
        let tempArray = {};
        try {
            if (CT === 0){
                keyFreights = `ClientFreights`;
            }else if(CT === 1){
                keyFreights = `TransporterFreights`;
            }else{
                throw ` ошибка внутренняя CT !== 0 || 1 (${CT})`;
            }
            lengthFArray = this.DealData[keyFreights].length;
            if (CCL !== 0 && CCL !== 1){
                throw ` ошибка внутренняя CCL !== 0 || 1 (${CCL})`;
            }
            for (let i = lengthFArray - 1; i >= 0 ; --i)
            {
                if(CCL === 0){ // `нал`, `софт`, `топливо`,
                    if (this.DealData[keyFreights][i].PaymentForm === `нал` ||
                        this.DealData[keyFreights][i].PaymentForm === `софт` ||
                        this.DealData[keyFreights][i].PaymentForm === `топливо` ){
                        tempKey = this.DealData[keyFreights][i].PaymentForm;
                    }
                }else{ // 'без ПДВ', `з ПДВ 0%`, `з ПДВ 20%`
                    if (this.DealData[keyFreights][i].PaymentForm === `без ПДВ` ||
                        this.DealData[keyFreights][i].PaymentForm === `з ПДВ 0%` ||
                        this.DealData[keyFreights][i].PaymentForm === `з ПДВ 20%` ){
                        tempKey = this.DealData[keyFreights][i].PaymentForm;
                    }
                }
                if (tempKey === undefined){
                    continue;
                }
                if (tempArray[tempKey] !== undefined)
                    ++tempArray[tempKey];
                else
                    tempArray[tempKey] = 1;
            }// for (let i = 0; i < lengthPArray; ++i)
            let n = 0;
            for (let key in tempArray){
                if (n !== 0 && CCL !== 1){  // && CCL !== 1 - Временно, пока не пофиксят выдачу на фронте
                    resValue+= `; `;
                }
                resValue+= key;
                n++;
            }
            return resValue;
        } catch (e) {
            await console.log(`${e} \n FAIL in GetDealFreightsPaymentForm(${CT}, ${CCL})`);
            return ``;
        }
    }//async GetDealFreightsPaymentForm(CT,CCL)
    //----------------------------------------
    async Temp(nStart = 0) {
        let resOk;
        let temp;
        try {

            let tempLen = this.CFO.Fields.length;
            let tempLenColName;
            let tempColName;
            let n = 0;
            let Color,sC;
            for(let i=nStart ; i < tempLen; i++){
                tempColName = this.CFO.Fields[i][0];
                tempLenColName = tempColName.length;
                tempLenColName = 42 - tempLenColName;
                temp = await this.CFO.GetCellValue(0, tempColName);
                Color = FRGB(0,1,1,1);
                //await console.log(`${tempColName} = ${Color}${'.'.repeat(tempLenColName)}\x1b[0m(${temp})`);
                await console.log(`${tempColName} = ${Color}${'.'.repeat(tempLenColName)}${FRGB()}(${temp})`);
            }


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in Temp`);
            return false;
        }
    }//async Temp()
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

}// class DealTable
//----------------------------------------

//=========================================================
module.exports = {DealTable};
