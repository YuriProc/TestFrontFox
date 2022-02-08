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
        // Таблица "Очередь на прозвон ------------------------------------- "
        this.xTableListCall = `//section[@class="call-live-order"][div[@class="call-live-order__header"][contains(text(), "Очередь на прозвон")]]`;
        // Тикет на прозвон
        this.xCallItem = `//div[@class="call-live-order__item"]`;
        // Дата/Время прозвона InnerText
        this.xCallItemDateTime = this.xCallItem + `/div[@class="importance"]`;
        // ФИО Водителя
        this.xCallItemFIO = this.xCallItem + `/div[@class="main-info"]/div[@class="name"]`;
        // Кнопка "Звонок"
        this.xCallItemButtonCall = this.xCallItem + `/div[@class="main-info"]/button[contains(text(), "Звонок")]`;
        // ------------------------------------- Таблица "Очередь на прозвон ------------------------------------- "
        // Сделка МЦ вверху ---------------------------------------
        // Кнопки Статусы Комментариев [Num]
        this.xButtonMCStatusesComment = `//div[@class="mc-statuses"]/div[@class="mc-statuses__status"]`;
        // ПодСтатусы Комментариев +[contains(text(), "")];
        this.xSubStatuses = `//div[@class="mc-statuses__sub-status"]`;
        // Поле Комментарий
        this.xTextComment = `//textarea[@name="comment-description"]`;
        // Инпут "Текущее местоположение:"
        this.xFieldSetCurrentLocation = `//fieldset[legend[contains(text(), "Текущее местоположение:")]]`;
        this.xCurrentLocation = this.xFieldSetCurrentLocation + `//input[@name="comment-current-location-name"]`;
        // Найденные Адреса Google
        this.xGoogleContainer = `//div[@class="pac-container pac-logo"]`;
        // [Num]
        this.xGoogleItem = this.xGoogleContainer + `/div[@class="pac-item"]`;
        // Кнопка "Сохранить" Активная
        this.xButtonSave = `//form[@class="mc-comments-form"]//button[contains(text(), "Сохранить")][not (contains(@disabled, "disabled"))]`;
        // --------------------------------------- Сделка МЦ вверху ---------------------------------------
        // Таблица "МЦ - сделки" загруженная
        this.xTableMC = `//section[@id="mc-main-table"][@class="crm-table"]/div/div/table[@aria-busy="false"]`;
        // Заголовки "МЦ таблицы" 29 шт. // + `[contains(text(), "")]` ;
        this.xTableMCHeaders = this.xTableMC + `/thead/tr/th[@role="columnheader"]/div`; // + `[contains(text(), "")]` ;
        // Заголовки "МЦ таблицы" текст заголовков 29 шт.
        this.arrayHeaders = [`№ сделки`,`Последний статус`,`Последний подстатус`,`Кроссдок`,`Уровень важности мониторинга`,
                             `След. звонок водителю`,`Дата загрузки`,`Время выезда с загрузки`,`Дата выгрузки`,`ФИО водителя`,
                             `Груз`,`Стоимость груза`,`Маршрут`,`Компания заказчика`,`Тел. водителя`,`Номера машины/прицепа`,
                             `Марка авто`,`Тип транспорта`,`Тонаж`,`Объем`,`№ вкладки`,`Компания перевоза`,`Юр. лицо с перевозом`,
                             `Юр. лицо с заказчиком`,`Ответсвенный продажник`,`Логист`,`Последний звонок водителю`,`Последний адрес`,
                             `Дата постановки на контроль`,];
        // Модалка "Настройка полей таблицы -------------------------------------"
        this.xModalFieldsSetting = `//div[contains(@id, "mc-table-fields-manager")][@class="modal-content"][//h5[contains(text(), "Настройка полей таблицы")]]`;
        // Кнопка "Отменить все"
        this.xButtonFieldsUnSelectAll = this.xModalFieldsSetting + `//button[contains(text(), "Отменить все")]`;
        // Кнопка "Выбрать все"
        this.xButtonFieldsSelectAll = this.xModalFieldsSetting + `//button[contains(text(), "Выбрать все")]`;
        // Кнопка "Применить"
        this.xButtonFieldsApply = this.xModalFieldsSetting + `//button[contains(text(), "Применить")]`;
        // ------------------------------------- Модалка "Настройка полей таблицы"

    } // constructor(browser, page, DealData)
    //----------------------------------------
    async CheckMCPage() {
        let resOk;
        let LengthHeaders, tempXP, strHead, numHeaderError, strHeaderProblem;
        let textError = ``;
        try {

            await WaitRender(this.page);
            resOk = await this.CheckFilters();
            if(!resOk){
                textError+= `\tFail -> МЦ - проверка наличия фильтров this.CheckFilters();\n`;
            }
            resOk = await this.CheckButtonsLevelMonitoring();
            if(!resOk){
                textError+= `\tFail -> МЦ - проверка наличия кнопок "Уровень мониторинга" this.CheckButtonsLevelMonitoring();\n`;
            }
            // Таблица "Очередь на прозвон"
            resOk = await WaitForElementIsPresentByXPath(500, this.page, this.xTableListCall);
            if(!resOk){
                textError+= `\tFail -> Таблица "Очередь на прозвон" WaitForElementIsPresentByXPath(500, this.page, this.xTableListCall);\n`;
            }
            // "Передёрнуть поля ))) "
            resOk = await this.ReselectAllFields();
            // Проверить Заголовки таблицы МЦ
            resOk = await this.CheckHeadersTableMC();
            if(!resOk){
                resOk = await this.ReselectAllFields();
                if(!resOk){
                    textError+= `\tFail -> Перевыбор полей таблицы: Модалка "Настройка полей таблицы"  this.ReselectAllFields();\n`;
                }else {
                    resOk = await this.CheckHeadersTableMC();
                    if(!resOk){
                        textError+= `\tFail -> ПОВТОРНАЯ ПРОВЕРКА ПОЛЕЙ ТАБЛИЦЫ МЦ this.CheckHeadersTableMC();\n`;
                    }else {
                        await console.log('\x1b[38;5;2m\t', `ПОВТОРНАЯ ПРОВЕРКА ПОЛЕЙ ТАБЛИЦЫ МЦ - OK !!!`, '\x1b[0m');
                    }
                }
            }else {
                await console.log('\x1b[38;5;2m\t', `Проверка полей таблицы МЦ - OK !!!`, '\x1b[0m')
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
    async CheckFilters() {
        let resOk;let textError = ``;
        try {
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
            if(textError !== ``){
                throw textError;
            }
            return true;
        } catch (e) {
            // await console.log(`${e} \n FAIL in CheckFilters`);
            let Msg = `${e} \n FAIL in CheckFilters`;
            await ScreenLog(this.page, Msg, 1);
            return false;
        }
    }//async CheckFilters()
    //----------------------------------------
    async CheckButtonsLevelMonitoring() {
        let resOk;let textError = ``;
        try {
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
            // await console.log(`${e} \n FAIL in CheckButtonsLevelMonitoring`);
            let Msg = `${e} \n FAIL in CheckButtonsLevelMonitoring`;
            await ScreenLog(this.page, Msg, 1);
            return false;
        }
    }//async CheckButtonsLevelMonitoring()
    //----------------------------------------
    async CheckHeadersTableMC() {
        let resOk;let textError = ``;let LengthHeaders, strHead, tempXP;
        try {
            // Таблица "МЦ - сделки" загруженная
            resOk = await WaitForElementIsPresentByXPath(5500, this.page, this.xTableMC);
            if(!resOk){
                textError+= `\tFail -> Таблица "МЦ - сделки" WaitForElementIsPresentByXPath(5500, this.page, this.xTableMC);\n`;
            }
            if(this.arrayHeaders.length !== 29){
                textError+= `\tВнутренняя Ошибка тестовых данных -> this.arrayHeaders.length !== 29 (${this.arrayHeaders.length}) ;\n`;
            }
            // Заголовки "МЦ таблицы" 29 шт. // + `[contains(text(), "")]` ;
            LengthHeaders = await ElementGetLength(this.page, this.xTableMCHeaders);
            if (LengthHeaders !== 29){
                textError+= `\tFail -> Заголовки "МЦ таблицы" 29 шт. ElementGetLength(this.page, this.xTableMCHeaders)=(${LengthHeaders})!==(29);\n`;
            } // if (LengthHeaders !== 29)

            for (let nT=0;nT<LengthHeaders;nT++){
                // Заголовки из Таблицы МЦ ищем в тестовых Данных
                let HeaderFind=false;
                strHead = await ElementGetInnerText(this.page, nT, this.xTableMCHeaders);
                strHead = strHead.trim();
                for(let nA=0;nA<this.arrayHeaders.length;nA++){
                    if(strHead === this.arrayHeaders[nA]){
                        HeaderFind = true;
                        break; // <- Выход из текущего цикла
                    }
                }// for(let nA=0;nA<this.arrayHeaders.length;nA++)
                if(!HeaderFind){
                    textError+= `\tFail -> Лишний Заголовок "МЦ таблицы" (${strHead}) <- !!! \n`;
                    await HoverByXPathNum(this.page, nT, this.xTableMCHeaders);
                    await ScreenLog(this.page, `Лишний Заголовок "МЦ таблицы" (${strHead})`, 1);
                }
            }// for (let nT=0;nT<LengthHeaders;nT++)

            // Заголовки "МЦ таблицы" текст заголовков 29 шт.
            for(let i=0; i<29; i++){
                // Заголовки из Тестовых Данных ищем в таблице МЦ
                tempXP = this.xTableMCHeaders + `[contains(text(), "${this.arrayHeaders[i]}")]`;
                resOk = await WaitForElementIsPresentByXPath(500, this.page, tempXP);
                if(!resOk){
                    textError+= `\tFail -> Заголовки "МЦ таблицы" заголовок(${this.arrayHeaders[i]})-Отсутствует !!! WaitForElementIsPresentByXPath(500, this.page, tempXP);\n`;
                }
            }
            if(textError !== ``){
                throw textError;
            }

            return true;
        } catch (e) {
            // await console.log(`${e} \n FAIL in CheckHeadersTableMC`);
            let Msg = `${e} \n FAIL in CheckHeadersTableMC`;
            await ScreenLog(this.page, Msg, 1);
            return false;
        }
    }//async CheckHeadersTableMC()
    //----------------------------------------
    async ReselectAllFields() {
        let resOk;let textError = ``;
        try {
            // Кнопка "Скрыть/отобразить поля"
            resOk = await ClickByXPath(this.page, this.xButtonSelectFields);
            if(resOk){
                await WaitRender(this.page);
                // Модалка "Настройка полей таблицы"
                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xModalFieldsSetting);
                if(resOk){
                    await WaitRender(this.page);
                    // Кнопка "Отменить все"
                    resOk = await ClickByXPath(this.page, this.xButtonFieldsUnSelectAll);
                    await WaitRender(this.page);
                    // Кнопка "Выбрать все"
                    resOk = await ClickByXPath(this.page, this.xButtonFieldsSelectAll);
                    await WaitRender(this.page);
                    // Кнопка "Применить"
                    let strUrls = [`${g_BackCfoFoxURL}/api/mc`,];
                    resOk = await ClickByXPath(this.page, this.xButtonFieldsApply, strUrls, 21000);
                    if(!resOk){
                        throw `Fail -> Модалка "Настройка полей таблицы" Кнопка "Применить" ClickByXPath(this.page, this.xButtonFieldsApply, strUrls, 21000);`;
                    }
                }else {
                    textError+= `\tFail -> Модалка "Настройка полей таблицы" WaitForElementIsPresentByXPath(1000, this.page, this.xModalFieldsSetting);\n`;
                }
            }else {
                textError+= `\tFail -> Кнопка "Скрыть/отобразить поля" ClickByXPath(this.page, this.xButtonSelectFields);\n`;
            }
            if(textError !== ``){
                throw textError;
            }

            return true;
        } catch (e) {
            // await console.log(`${e} \n FAIL in ReselectAllFields`);
            let Msg = `${e} \n FAIL in ReselectAllFields`;
            await ScreenLog(this.page, Msg, 1);
            return false;
        }
    }//async ReselectAllFields()
    //----------------------------------------
    async ClearMCCallList() {
        let resOk;
        let EnableTicketCall = true;
        let strUrls = [`${g_BackCfoFoxURL}/api/auth-user`,
                       `${g_BackCfoFoxURL}/api/deal/`,
                       `${g_BackCfoFoxURL}/api/deal-mc-comment`,
                       `${g_BackCfoFoxURL}/api/locations?type=companies&type_id=`,];
        let strUrlsSave;
        try {
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xCallItemButtonCall);
            if(!resOk){
                await console.log(`Очередь на прозвон пустая - это подозрительно`);
                return true;
            }else{
                EnableTicketCall = true;
            }
            while (EnableTicketCall){
                await WaitRender(this.page);
                // Кнопка "Звонок"
                // resOk = await ScrollByXPathNum(this.page, this.xCallItemButtonCall, 0);
                resOk = await HoverByXPath(this.page, this.xCallItemButtonCall, 0);
                await WaitRender(this.page);

                resOk = await ClickByXPathNum(this.page, 0, this.xCallItemButtonCall, strUrls, 11000);
                if(!resOk){
                    throw `Fail -> Кнопка "Звонок" ClickByXPathNum(this.page, 0, this.xCallItemButtonCall, strUrls, 11000);`;
                }
                let strFIO = g_RecEventListener.EventListener_jsons[1].data.driver.contact.full_name;
                let strID = `` + g_RecEventListener.EventListener_jsons[1].data.id;
                await console.log(`Deal(${strID}): FIO=(${strFIO})`);
                await WaitRender(this.page);
                // await MCSetAllIcons(this.page);
                // await WaitRender(this.page);
                // Сделка в МЦ ОТКРЫТА Проверить Данные и Форму
                // Заполняем комментарий
                // Кнопки Статусы Комментариев [Num]
                resOk = await ClickByXPathNum(this.page, 0, this.xButtonMCStatusesComment);
                if(!resOk){
                    throw `Fail -> Кнопки Статусы Комментариев [Num] ClickByXPathNum(this.page, 0, this.xButtonMCStatusesComment);`;
                }
                await WaitRender(this.page);
                // Выехал с выгрузки
                // ПодСтатусы Комментариев +[contains(text(), "")];
                let tempXP = this.xSubStatuses + `[contains(text(), "Выехал с выгрузки")]`;
                resOk = await HoverByXPath(this.page, tempXP);
                await WaitRender(this.page);
                resOk = await ClickByXPath(this.page, tempXP);
                // Поле Комментарий
                resOk = await SetTextByXPath(this.page, this.xTextComment, `Выехал с выгрузки - очистка очереди на прозвон`);
                //
                const {MCCallTimeInput} = require("../sub_objects/mc_call_time_input_obj.js");
                let NewMCCallTimeInput = new MCCallTimeInput(this.browser, this.page, `Время след. звонка:`);
                resOk = await NewMCCallTimeInput.OpenInput();
                resOk = await NewMCCallTimeInput.SelectNearestFreeTime();
                let strTimeFirstCall = await NewMCCallTimeInput.ClickConfirm();

                // Инпут "Текущее местоположение:"
                resOk = await SetTextByXPath(this.page, this.xCurrentLocation, `Херсон`);
                // Найденные Адреса Google [Num]
                resOk = await WaitForElementIsPresentByXPath(5500, this.page, this.xGoogleItem);
                resOk = await ClickByXPathNum(this.page, 0 , this.xGoogleItem);
                if(!resOk){
                    throw `Fail -> Найденные Адреса Google [Num] ClickByXPathNum(this.page, 0 , this.xGoogleItem);`;
                }
                await WaitRender(this.page);
                // Кнопка "Сохранить" Активная
                resOk = await WaitForElementIsPresentByXPath(1000, this.page,  this.xButtonSave);
                strUrlsSave = [`${g_BackCfoFoxURL}/api/deal-mc-comment`, // POST
                               `${g_BackCfoFoxURL}/api/deal-mc-comment`, // GET
                               `${g_BackCfoFoxURL}/api/mc?page=`];       // GET
                resOk = await ClickByXPath(this.page,  this.xButtonSave, strUrlsSave , 5500);
                if(!resOk){
                    throw `Fail -> Сохранение Комментария МЦ -> ClickByXPath(this.page,  this.xButtonSave, strUrlsSave , 5500);`;
                }
                // await consoleClearUpLine();
                // await MCSetAllIcons(this.page);

                // Сохранили Комментарий
                await WaitRender(this.page);
                await consoleClearUpLine();
                let C0 = FRGB();
                let C1 = FRGB(0, 0,3,0);
                let C2 = FRGB(0, 0,1,0);
                let C3 = FRGB(0, 0,4,0);
                let S1 = `Deal(${strID}) (${strFIO})`;
                let L1 = 65 - S1.length;
                let S2 = `Время=(${strTimeFirstCall})`;
                let L2 = 25 - S2.length;
                S1 = S1 + C2 + '.'.repeat(L1) + C1 + S2 + ' '.repeat(L2) + `- Ok`;
                await console.log(C1, '\t', `Deal(${C3}${strID}${C1}) (${C3}${strFIO}${C1})${C2}${'.'.repeat(L1)}${C1}Время=(${C3}${strTimeFirstCall}${C1}) - Ok`, C0);

                resOk = await WaitForElementIsPresentByXPath(1000, this.page, this.xCallItemButtonCall);
                if(!resOk){
                    await HoverByXPath(this.page, this.xTableListCall);
                    await console.log(`Очередь на прозвон Очищена`);
                    EnableTicketCall = false;
                }else{
                    EnableTicketCall = true;
                }


// await WaitStop(`MC Table`);


            }// while (EnableTicketCall)

            return true;
        } catch (e) {
            // await console.log(`${e} \n FAIL in ClearMCCallList`);
            let Msg = `${e} \n FAIL in ClearMCCallList`;
            await ScreenLog(this.page, Msg, 1);
            return false;
        }
    }//async ClearMCCallList()
    //----------------------------------------
    async ReleaseCallTime() { // Освободить время звонка
        let resOk;
        let NowTime = Date.now();
        try {


            return true;
        } catch (e) {
            // await console.log(`${e} \n FAIL in ReleaseCallTime`);
            let Msg = `${e} \n FAIL in ReleaseCallTime`;
            await ScreenLog(this.page, Msg, 1);
            return false;
        }
    }//async ReleaseCallTime()
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
