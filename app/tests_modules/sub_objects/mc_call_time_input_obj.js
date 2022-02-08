class MCCallTimeInput {
    constructor(browser, page, legend) { // legend = `Время первого прозвона` или `Время след. звонка:`
        this.browser = browser;
        this.page = page;
        // Время первого прозвона/Время след. звонка:
        // this.xFieldSetFirstCallTime = `//fieldset[legend[contains(text(),"Время первого прозвона")]]`;
        // this.xFieldSetFirstCallTime = `//fieldset[legend[contains(text(),"Время след. звонка:")]]`;
        this.xFieldSetFirstCallTime = `//fieldset[legend[contains(text(),"${legend}")]]`;

        this.xFirstCallTimeWrapper = this.xFieldSetFirstCallTime + `//div[@class="fox-book-time-input__wrapper"]`;
        this.xFirstCallTimeInput = this.xFirstCallTimeWrapper + `/div[@id="fox-book-time-input-target"]`;
        this.xFirstCallTimeButton = this.xFieldSetFirstCallTime + `//button[contains(text(),"Подтвердить")]`;
        this.xFirstCallTimeButtonActive = this.xFirstCallTimeButton + `[not(contains(@disabled, "disabled"))]`;

        this.xFirstCallTimePresentDay = this.xFieldSetFirstCallTime + `//div[@class="sub-title"]`;
        // свободное время
        this.xFirstCallTimeItemActive = this.xFieldSetFirstCallTime + `//div[@class="book-time-picker__item"][not(contains(@class , "disabled"))]`;
        // времена звонков
        this.xFirstCallTimeItem = this.xFieldSetFirstCallTime + `//div[@class="book-time-picker__item"]`;
        // Скролл на час
        this.xFirstCallTimeHourAdd = this.xFieldSetFirstCallTime + `//div[@class="handle-change-hours-btn add"]`;
        // Скролл на День
        this.xFirstCallTimeDayAdd = this.xFieldSetFirstCallTime + `//div[@class="handle-date-btn add"]`;
        // Выбранное время
        this.xSelectedTime = this.xFieldSetFirstCallTime + `//span[@class="hours-data-item"]`;
        // Массив Urls
        this.strUrls = [
            `${g_BackCfoFoxURL}/api/list-of-call-times/`,
        ];

    } // constructor(browser, page)
   //----------------------------------------
    async OpenInput() {
        let resOk;
        try {
            // Иногда нужен Скролл до этого Инпута перед кликом на него
            // resOk = await ScrollByXPathNum(this.page, this.xFirstCallTimeInput);
            resOk = await HoverByXPath(this.page, this.xFirstCallTimeInput);
            if(!resOk){
                // throw `Fail -> ScrollByXPathNum(this.page, this.xFirstCallTimeInput);`;
                throw `Fail -> HoverByXPath(this.page, this.xFirstCallTimeInput);`;
            }

            // Раскрыть Дейт Пикер "Время первого прозвона" / "Время след. звонка:"
            resOk = await ClickByXPath(this.page, this.xFirstCallTimeInput, this.strUrls, 31000);
            if(!resOk){
                throw `Fail -> Раскрыть Дейт Пикер "Время первого прозвона" / "Время след. звонка:" ClickByXPath(this.page, this.xFirstCallTimeInput, this.strUrls, 31000);`;
            }
            await WaitRender(this.page);
            // Скролл до кнопки, ибо в сделке не влазит на экран
            // resOk = await ScrollByXPathNum(this.page, this.xFirstCallTimeButton);
            resOk = await HoverByXPath(this.page, this.xFirstCallTimeButton);
            if (!resOk){
               // throw `Fail -> ScrollByXPathNum(this.page, this.xFirstCallTimeButton);`;
                throw `Fail -> HoverByXPath(this.page, this.xFirstCallTimeButton);`;
            }

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in OpenInput(class MCCallTimeInput)`);
            return false;
        }
    }//async OpenInput()
    //----------------------------------------
    async SelectNearestFreeTime() {
        let resOk; let resultTime;
        try {
            // Проверка что на ДейтПикере есть свободное время
            let NumClickHour = 0;
            let NumClickDay = 0;
            let MaxTry = false;
            let FreeTime;
            let NumItem;
            // В Сегодняшнем Дне нельзя выбирать первое свободное время (1/5 может упасть)(если минуты равны текущему времени)
            let strPresentDay = await ElementGetInnerText(this.page, 0, this.xFirstCallTimePresentDay);
            if (await SubStrIsPresent(`Сегодня`, strPresentDay)){
                NumItem = 1; // Обезопасим себя от ошибки
            }else {
                NumItem = 0;
            }
            FreeTime = await WaitForElementIsPresentByXPathNum(500, NumItem,this.page, this.xFirstCallTimeItemActive);

            while (!FreeTime && !MaxTry){
                NumItem = 0;
                if (NumClickHour > 3) {
                    // Добавить День
                    resOk = await ClickByXPath(this.page, this.xFirstCallTimeDayAdd, this.strUrls, 31000);
                    NumClickDay++;
                    NumClickHour = 0;
                }else{
                    // Добавить Час
                    resOk = await ClickByXPath(this.page, this.xFirstCallTimeHourAdd, this.strUrls, 31000);
                    NumClickHour++;
                }
                await WaitRender(this.page);
                if(NumClickDay > 3){
                    MaxTry = true;
                }
                FreeTime = await WaitForElementIsPresentByXPathNum(500, 0,this.page, this.xFirstCallTimeItemActive);

            }// while (!FreeTime && !MaxTry)

            // Клик по свободному времени
            resOk = await ClickByXPathNum(this.page, NumItem, this.xFirstCallTimeItemActive);
            if (!resOk) {
                throw `FAIL -> Не нашли свободного времени`;
            }
            await WaitRender(this.page);

            // Выбранное время
            resultTime = await ElementGetInnerText(this.page, 0, this.xSelectedTime);


            return resultTime;
        } catch (e) {
            await console.log(`${e} \n FAIL in SelectNearestFreeTime(class MCCallTimeInput)`);
            return ``;
        }
    }//async SelectNearestFreeTime()
     //----------------------------------------
    async SelectNeededFreeTime(strNeedTime) {
        let resOk; let resultTime;
        try {
            // Проверка что на ДейтПикере есть свободное время
            let NumClickHour = 0;
            let NumClickDay = 0;
            let MaxTry = false;
            let FreeTime;
            let NumItem;
            // В Сегодняшнем Дне нельзя выбирать первое свободное время (1/5 может упасть)(если минуты равны текущему времени)
            let strPresentDay = await ElementGetInnerText(this.page, 0, this.xFirstCallTimePresentDay);
            if (await SubStrIsPresent(`Сегодня`, strPresentDay)){
                NumItem = 1; // Обезопасим себя от ошибки
            }else {
                throw `Fail -> В ДейтПикере не авто выбран сегодняшний день`;
            }
            // xPath нужного времени звонка
            let xTime = this.xFirstCallTimeItem + `[contains(text(), "${strNeedTime}")]`;

            resOk = await WaitForElementIsPresentByXPathNum(500, 0,this.page, xTime);
            if(!resOk){ // проверить следующий час
                // Добавить Час
                resOk = await ClickByXPath(this.page, this.xFirstCallTimeHourAdd, this.strUrls, 31000);
                if (!resOk){
                    throw `Fail -> Добавить Час ClickByXPath(this.page, this.xFirstCallTimeHourAdd, this.strUrls, 31000);`;
                }
                resOk = await WaitForElementIsPresentByXPathNum(500, 0,this.page, xTime);
                if (!resOk){
                    throw `Fail -> В Дейт пикере не найдено нужное время даже в интервале следующего часа WaitForElementIsPresentByXPathNum(500, 0,this.page, xTime);`;
                }
            }
            // проверить что время свободно
            let xTimeActive = xTime + `[not(contains(@class , "disabled"))]`;
            resOk = await WaitForElementIsPresentByXPathNum(500, 0,this.page, xTimeActive);
            if(!resOk){
                await console.log(`\tНужное время Занято - Нужно освободить его в таблице МЦ`);
                return ``;
            }

            // Клик по свободному времени
            resOk = await ClickByXPathNum(this.page, 0, xTimeActive);
            if (!resOk) {
                throw `FAIL -> Не удалось выбрать нужное свободное время ClickByXPathNum(this.page, 0, xTimeActive);`;
            }
            await WaitRender(this.page);

            // Выбранное время
            resultTime = await ElementGetInnerText(this.page, 0, this.xSelectedTime);
            if (resultTime !== strNeedTime){
                throw `Fail -> resultTime !== strNeedTime (${resultTime})!==(${strNeedTime})`;
            }


            return resultTime;
        } catch (e) {
            await console.log(`${e} \n FAIL in SelectNeededFreeTime(class MCCallTimeInput)`);
            return ``;
        }
    }//async SelectNeededFreeTime()
    //----------------------------------------
    async ClickConfirm() {
        let resOk;let strTimeFirstCall;
        try {
            // Нажать на кнопку "Подтвердить"
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xFirstCallTimeButtonActive);
            if(!resOk){
                throw `FAIL -> Нажать на кнопку "Подтвердить" WaitForElementIsPresentByXPath(2000, this.page, this.xFirstCallTimeButtonActive);`;
            }
            resOk = await ClickByXPath(this.page, this.xFirstCallTimeButtonActive);
            if(!resOk){
                throw `FAIL -> Нажать на кнопку "Подтвердить" ClickByXPath(this.page, this.xFirstCallTimeButtonActive);`;
            }
            await WaitRender(this.page);
            strTimeFirstCall = await ElementGetInnerText(this.page, 0, this.xFirstCallTimeInput);

            return strTimeFirstCall;
        } catch (e) {
            await console.log(`${e} \n FAIL in ClickConfirm(class MCCallTimeInput)`);
            return ``;
        }
    }//async ClickConfirm()
    //----------------------------------------


    //----------------------------------------
    async TemplateTemp() {
        let resOk;
        try {

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp(class MCCallTimeInput)`);
            return false;
        }
    }//async TemplateTemp()

}// class MCCallTimeInput
//----------------------------------------

//=========================================================
module.exports = {MCCallTimeInput};
