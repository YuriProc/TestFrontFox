//'use strict';
class MultiSelect {
    constructor(browser, page, xForward ,LegendText, Required, NeedStr) { // xForward - xPath , предшествующий внутренним (почти всегда пустой ``)
        this.browser = browser;
        this.page = page;
        this.xForward = xForward;
        this.LegendText = LegendText;
        this.Required = Required;
        this.NeedStr = NeedStr;
        // ФилдСет в котором есть этот МультиСелект
        // this.xFieldSet = this.xForward + `//fieldset[legend[contains(text(),"${this.LegendText}")]]`;
        // // if (this.Required) { this.xFieldSet+= `[span[@class="required"]]`; }
        // if (this.Required) { this.xFieldSet = InsertSubStr(this.xFieldSet,this.xFieldSet.length-1,`[span[@class="required"]]`); }
        this.InitLegend(this.LegendText);
        // // Инпут стрелка Вниз
        // this.xMultiSelectArrowDown = this.xFieldSet + `//div[@class="multiselect__select"]`;
        // this.xBoxInput = this.xFieldSet + `//div[@class="multiselect__tags"]`;
        // this.xInput = this.xFieldSet + `//input`;
        // // Спиннер
        // this.xSpinnerNone = this.xFieldSet + `//div[@class="multiselect__spinner"][contains(@style, "display: none")]`;
        // this.xSpinnerPresent = this.xFieldSet + `//div[@class="multiselect__spinner"][not (contains(@style, "display: none"))]`;
        // // ДропДаун Активный
        // this.xDropDownActive = this.xFieldSet + `//div[@class="multiselect__content-wrapper"][not (contains(@style, "display: none"))]`;
        // // ДропДаун Закрытый
        // this.xDropDownClosed = this.xFieldSet + `//div[@class="multiselect__content-wrapper"][contains(@style, "display: none")]`;
        // // Выбор в ДропДауне Нужная Строка Подсвеченная
        // this.xDropDownStrHL = this.xFieldSet + `//li[@class="multiselect__element"]/span[@class="multiselect__option multiselect__option--highlight"]`;
        // this.xDropDownNeedStr = this.xDropDownStrHL + `/span[contains(text(), "${this.NeedStr}")]`;
        // // Крестик Удалить Выбор
        // this.xCrossDel = this.xFieldSet + `//i[@class="icon-cancel"]`;

    }
    //------------------------------------------------------------------------------------
    async InitLegend(LegendText){
        try{let resOk;
            this.LegendText = LegendText;
            // ФилдСет в котором есть этот МультиСелект
            this.xFieldSet = this.xForward + `//fieldset[legend[contains(text(),"${this.LegendText}")]]`;
            if (this.Required) { this.xFieldSet = InsertSubStr(this.xFieldSet,this.xFieldSet.length-1,`[span[@class="required"]]`); }
            // Инпут стрелка Вниз
            this.xMultiSelectArrowDown = this.xFieldSet + `//div[@class="multiselect__select"]`;
            this.xBoxInput = this.xFieldSet + `//div[@class="multiselect__tags"]`;
            this.xInput = this.xFieldSet + `//input`;
            // Спиннер
            this.xSpinnerNone = this.xFieldSet + `//div[@class="multiselect__spinner"][contains(@style, "display: none")]`;
            this.xSpinnerPresent = this.xFieldSet + `//div[@class="multiselect__spinner"][not (contains(@style, "display: none"))]`;
            // ДропДаун Активный
            this.xDropDownActive = this.xFieldSet + `//div[@class="multiselect__content-wrapper"][not (contains(@style, "display: none"))]`;
            // ДропДаун Закрытый
            this.xDropDownClosed = this.xFieldSet + `//div[@class="multiselect__content-wrapper"][contains(@style, "display: none")]`;
            // Выбор в ДропДауне Нужная Строка Подсвеченная
            this.xDropDownStrHL = this.xFieldSet + `//li[@class="multiselect__element"]/span[@class="multiselect__option multiselect__option--highlight"]`;
            // this.xDropDownNeedStr = this.xDropDownStrHL + `/span[contains(text(), "${this.NeedStr}")]`;
            this.InitNeedStr(this.NeedStr);
            // Крестик Удалить Выбор
            this.xCrossDel = this.xFieldSet + `//i[@class="icon-cancel"]`;


            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in InitLegend`);
            return false;
        }
    }//async InitLegend()
    //------------------------------------------------------------------------------------
    async InitNeedStr(NeedStr){
        try{let resOk;
            this.NeedStr = NeedStr;
            this.xDropDownNeedStr = this.xDropDownStrHL + `/span[contains(text(), "${this.NeedStr}")]`;

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in InitNeedStr`);
            return false;
        }
    }//async InitNeedStr()

    //------------------------------------------------------------------------------------
    async OpenDropDown(){
        try{let resOk;
            // Инпут стрелка Вниз
            resOk = await ClickByXPathW(this.page, this.xMultiSelectArrowDown);
            if (!resOk) {
                throw `FAIL => Инпут стрелка Вниз ClickByXPathW(${this.xMultiSelectArrowDown})`;
            }
            // ДропДаун Активный
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownActive);
            if (!resOk) {
                throw `FAIL => ДропДаун Активный WaitForElementIsPresentByXPath(${this.xDropDownActive})`;
            }
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in OpenDropDown`);
            return false;
        }
    }//async OpenDropDown()
    //------------------------------------------------------------------------------------
    async EnterTextToInput(){
        try{let resOk;
            // Ввод Текста в Инпут
            resOk = await SetTextByXPath(this.page, this.xInput, this.NeedStr);
            if (!resOk) {
                throw `FAIL => Ввод Текста в Инпут SetTextByXPath(${this.xInput})`;
            }
            await WaitRender(this.page);
            // Ждём пока пропадёт спиннер
            resOk = await WaitForElementIsPresentByXPath(9000, this.page, this.xSpinnerNone);
            if (!resOk) {
                throw `FAIL => Ждём пока пропадёт спиннер WaitForElementIsPresentByXPath(${this.xSpinnerNone})`;
            }
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in EnterTextToInput`);
            return false;
        }
    }//async EnterTextToInput()
    //------------------------------------------------------------------------------------
    async DropDownClickHighLightStr(){
        try{let resOk;
            // Выбор в ДропДауне Нужная Строка Подсвеченная
            resOk = await ClickByXPathW(this.page, this.xDropDownNeedStr);
            if (!resOk) {
                throw `FAIL => Выбор в ДропДауне Нужная Строка Подсвеченная ClickByXPathW(${this.xMultiSelectArrowDown})`;
            }
            // Ждём закрытия ДропДауна
            // ДропДаун Закрытый
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownClosed);
            if (!resOk) {
                throw `FAIL => ДропДаун Закрытый WaitForElementIsPresentByXPath(${this.xDropDownClosed})`;
            }
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in DropDownClickHighLightStr`);
            return false;
        }
    }//async DropDownClickHighLightStr()
    //------------------------------------------------------------------------------------
    async ClearMultiSelect(){
        try{let resOk;
            // Крестик Удалить Выбор
            resOk = await ClickByXPath(this.page, this.xCrossDel);
            if (!resOk) {
                throw `FAIL => Крестик Удалить Выбор ClickByXPath(${this.xCrossDel})`;
            }
            await WaitRender(this.page);
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in ClearMultiSelect`);
            return false;
        }
    }//async ClearMultiSelect()
    //------------------------------------------------------------------------------------
    async SetData(){ // Все действия по вводу данных в чистый инпут (нет очистки)
        try{let resOk;
            // Открыть ДропДаун
            resOk = await this.OpenDropDown();
            if (!resOk) {
                throw `FAIL => Открыть ДропДаун this.OpenDropDown();`;
            }
            // Ввести Текст в Инпут
            resOk = await this.EnterTextToInput();
            if (!resOk) {
                throw `FAIL => Ввести Текст в Инпут this.EnterTextToInput();`;
            }
            // Выбор в ДропДауне Нужная Строка Подсвеченная
            resOk = await this.DropDownClickHighLightStr();
            if (!resOk) {
                throw `FAIL => Выбор в ДропДауне Нужная Строка Подсвеченная this.DropDownClickHighLightStr();`;
            }
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in SetData`);
            return false;
        }
    }//async SetData()
    //------------------------------------------------------------------------------------
    async SetDataWithChangeLegend(NewLegendText){ // Все действия по вводу данных в чистый инпут (нет очистки)
        try{let resOk;
            // Открыть ДропДаун
            resOk = await this.OpenDropDown();
            if (!resOk) {
                throw `FAIL => Открыть ДропДаун this.OpenDropDown();`;
            }
            // Ввести Текст в Инпут
            resOk = await this.EnterTextToInput();
            if (!resOk) {
                throw `FAIL => Ввести Текст в Инпут this.EnterTextToInput();`;
            }
            // Выбор в ДропДауне Нужная Строка Подсвеченная
            resOk = await ClickByXPathW(this.page, this.xDropDownNeedStr);
            if (!resOk) {
                throw `FAIL => Выбор в ДропДауне Нужная Строка Подсвеченная ClickByXPathW(${this.xMultiSelectArrowDown})`;
            }
            // При выборе в дропдауне значения меняется Легенда самого Дропдауна
            await this.InitLegend(NewLegendText);
            // // Ждём закрытия ДропДауна
            // // ДропДаун Закрытый
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xDropDownClosed);
            // if (!resOk) {
            //     throw `FAIL => ДропДаун Закрытый WaitForElementIsPresentByXPath(${this.xDropDownClosed})`;
            // }
            // --- Ждём Появления НОВОЙ Легенды (Маркер закрытия Дропдауна (он исчезает))
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xFieldSet);
            if (!resOk) {
                throw `FAIL => Ждём Появления НОВОЙ Легенды WaitForElementIsPresentByXPath(${this.xFieldSet})`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in SetDataWithChangeLegend`);
            return false;
        }
    }//async SetDataWithChangeLegend()
    //------------------------------------------------------------------------------------
    async TemplateTemp(){
        try{let resOk;

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp`);
            return false;
        }
    }//async TemplateTemp()

    //------------------------------------------------------------------------------------

}
module.exports = {MultiSelect};
