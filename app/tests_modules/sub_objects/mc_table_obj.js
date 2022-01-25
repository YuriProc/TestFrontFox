class MCTable {
    constructor(browser, page, DealData) {
        this.browser = browser;
        this.page = page;
        this.DealData = DealData;
        // Фильтра "Время приезда на загрузку:" 2шт (length=2)
        this.xFilterTimeInLoad = `//fieldset[legend[contains(text(), "Время приезда на загрузку:")]]//div[@class="custom-date-time-picker"]//input[@class="flatpickr-input"]`;
        // Фильтр "Живой поиск:"
        this.xFilterLiveFind = `//fieldset[legend[contains(text(), "Живой поиск:")]]//div[@class="live-search"]//input[@class="custom-input form-control"]`;
        // Фильтр ДропДаун "Уровень важности:"
        this.xFilterLevelImportance = `//fieldset[legend[contains(text(), "Уровень важности:")]]//div[@class="multiselect crm-select"]//input[@class="multiselect__input"]`;
        // Фильтр ДропДаун "Статус:"
        this.xFilterStatus = `//fieldset[legend[contains(text(), "Статус:")]]//div[@class="multiselect crm-select"]//input[@class="multiselect__input"]`;
        // Кнопка "Фильтровать"
        this.xButtonFilter = `//button[contains(@class, "fox-button__primary")][contains(text(), "Фильтровать")]`;
        // Кнопка "Обновить таблицу"
        this.xButtonRefresh = `//button[@class="manage-buttons__refresh"][@title="Обновить таблицу"]`;
        // Кнопка "Скрыть/отобразить поля"
        this.xButtonSelectFields = `//button[@class="manage-buttons__columns-hider"][@title="Скрыть/отобразить поля"]`;
        // Кнопка "Макс. (Ночью на охраняемых)"
        this.xButtonMCStatus_2 = `//button[@id="mc-status-switcher-2"][contains(text(), "Макс. (Ночью на охраняемых)")]`;
        // Кнопка "Макс. (Движ. ночью разреш.)"
        this.xButtonMCStatus_3 = `//button[@id="mc-status-switcher-3"][contains(text(), "Макс. (Движ. ночью разреш.)")]`;
        // Кнопка "Сред. (Движ. ночью разреш.)"
        this.xButtonMCStatus_5 = `//button[@id="mc-status-switcher-5"][contains(text(), "Сред. (Движ. ночью разреш.)")]`;
        // Кнопка "Низкий"
        this.xButtonMCStatus_6 = `//button[@id="mc-status-switcher-6"][contains(text(), "Низкий")]`;
        // Кнопка "Сред. (Ночью на охраняемых)"
        this.xButtonMCStatus_4 = `//button[@id="mc-status-switcher-4"][contains(text(), "Сред. (Ночью на охраняемых)")]`;
        // Кнопка "Контроль загрузки и выгрузки"
        this.xButtonMCStatus_7 = `//button[@id="mc-status-switcher-7"][contains(text(), "Контроль загрузки и выгрузки")]`;
        // Кнопка "Кроссдок"
        this.xButtonCrossDoc = `//button[@class="crossdoc-changer__button"][@title="Кроссдок"]`;
        // Переключатель "Контроль"
        this.xControlSwitcher = `//div[@class="deals-control-switcher"][//span[contains(text(), "На контроле")]][//span[contains(text(), "Сняты с контроля")]]//input`;
    } // constructor(browser, page, DealData)
    //----------------------------------------
    async CheckMCPage() {
        let resOk;
        let textError = ``;
        try {

            await WaitRender(this.page);

            // Фильтра "Время приезда на загрузку:" 2шт (length=2)
            resOk = await WaitForElementIsPresentByXPath(21000, this.page, this.xFilterTimeInLoad);
            if(!resOk){
                textError+= `\tFail -> Фильтра "Время приезда на загрузку:" WaitForElementIsPresentByXPath(21000, this.page, this.xFilterTimeInLoad);\n`;
            }
            let tLength = await ElementGetLength(this.page, this.xFilterTimeInLoad);
            if(tLength !== 2){
                textError+= `\tFail -> 2 !== ElementGetLength(this.page, this.xFilterTimeInLoad) = (${tLength});\n`;
            }
            // Фильтр "Живой поиск:"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xFilterLiveFind);
            if(!resOk){
                textError+= `\tFail -> Фильтр "Живой поиск:" WaitForElementIsPresentByXPath(500, this.page, this.xFilterLiveFind);\n`;
            }
            // Фильтр ДропДаун "Уровень важности:"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xFilterLevelImportance);
            if(!resOk){
                textError+= `\tFail -> Фильтр ДропДаун "Уровень важности:" WaitForElementIsPresentByXPath(500, this.page, this.xFilterLevelImportance);\n`;
            }
            // Фильтр ДропДаун "Статус:"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xFilterStatus);
            if(!resOk){
                textError+= `\tFail -> Фильтр ДропДаун "Статус:" WaitForElementIsPresentByXPath(500, this.page, this.xFilterStatus);\n`;
            }
            // Кнопка "Фильтровать"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonFilter);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Фильтровать" WaitForElementIsPresentByXPath(500, this.page, this.xButtonFilter);\n`;
            }
            // Кнопка "Обновить таблицу"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonRefresh);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Обновить таблицу" WaitForElementIsPresentByXPath(500, this.page, this.xButtonRefresh);\n`;
            }
            // Кнопка "Скрыть/отобразить поля"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonSelectFields);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Скрыть/отобразить поля" WaitForElementIsPresentByXPath(500, this.page, this.xButtonSelectFields);\n`;
            }
            // Кнопка "Макс. (Ночью на охраняемых)"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_2);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Макс. (Ночью на охраняемых)" WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_2);\n`;
            }
            // Кнопка "Макс. (Движ. ночью разреш.)"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_3);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Макс. (Движ. ночью разреш.)" WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_3);\n`;
            }
            // Кнопка "Сред. (Движ. ночью разреш.)"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_5);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Сред. (Движ. ночью разреш.)" WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_5);\n`;
            }
            // Кнопка "Низкий"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_6);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Низкий" WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_6);\n`;
            }
            // Кнопка "Сред. (Ночью на охраняемых)"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_4);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Сред. (Ночью на охраняемых)" WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_4);\n`;
            }
            // Кнопка "Контроль загрузки и выгрузки"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_7);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Контроль загрузки и выгрузки" WaitForElementIsPresentByXPath(500, this.page, this.xButtonMCStatus_7);\n`;
            }
            // Кнопка "Кроссдок"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xButtonCrossDoc);
            if(!resOk){
                textError+= `\tFail -> Кнопка "Кроссдок" WaitForElementIsPresentByXPath(500, this.page, this.xButtonCrossDoc);\n`;
            }
            // Переключатель "Контроль"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xControlSwitcher);
            if(!resOk){
                textError+= `\tFail -> Переключатель "Контроль" WaitForElementIsPresentByXPath(500, this.page, this.xControlSwitcher);\n`;
            }
            if(textError !== ``){
                throw textError;
            }

            return true;
        } catch (e) {
            // await console.log(`${e} \n FAIL in CheckMCPage`);
            let Msg = `${e} \n FAIL in CheckMCPage`;
            await ScreenLog(this.page, Msg, 1);
            return false;
        }
    }//async CheckMCPage()
    //----------------------------------------

    //----------------------------------------
    async TemplateTemp() {
        let resOk;
        try {


            return true;
        } catch (e) {
            // await console.log(`${e} \n FAIL in TemplateTemp`);
            let Msg = `${e} \n FAIL in TemplateTemp`;
            await ScreenLog(this.page, Msg, 1);
            return false;
        }
    }//async TemplateTemp()

}// class MCTable
//----------------------------------------

//=========================================================
module.exports = {MCTable};
