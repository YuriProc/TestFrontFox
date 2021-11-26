class DatePicker {
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;
        this.Num = -1; // заполнится после первого клика
        this.Value = ``; // заполнится после выбора Даты
        // xPath for Click To Open DatePicker
        this.xClickToOpen = ``; // <-- Заполнить ПЕРЕД первым Кликом
        // Активный Дейт Пикер (Раскрытый)
        this.xActiveDatePicker = `//div[contains(@class, "custom-date-time-picker")]`;
        this.xActiveDatePicker+= `[div[@class="flatpickr-wrapper"]/input[@class="flatpickr-input active"]]`;
        // Все дни
        this.xAllDays = this.xActiveDatePicker + `//span[contains(@class, "flatpickr-day")]`;
        // Текущий день
        this.xCurrentDay = this.xActiveDatePicker + `//span[contains(@class, "flatpickr-day today")]`;
        // Выбранный день
        this.xSelectedDay = this.xActiveDatePicker + `//span[contains(@class, "flatpickr-day") and (contains(@class, "selected"))]`;
        // Инпут Часы
        this.xHours = this.xActiveDatePicker + `//input[@aria-label="Hour"]`;
        // Инпут Минуты
        this.xMinutes = this.xActiveDatePicker + `//input[@aria-label="Minute"]`;

    } // constructor(browser, page)
    //----------------------------------------
    //----------------------------------------
    async OpenDatePicker(Num, xPathToOpen) {
        let resOk;
        try {
            this.Num = Num;
            this.xClickToOpen = xPathToOpen;
            // Клик Раскрыть ДейтПикер
            resOk = await ClickByXPathWNum(this.page, this.Num, this.xClickToOpen);
            if(!resOk){
                throw `FAIL => Клик Раскрыть ДейтПикер  ClickByXPathWNum(${this.Num}, ${this.xClickToOpen})`;
            }
            // Раскрытый Дейт Пикер
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xActiveDatePicker);
            if (!resOk) {
                throw `FAIL => Раскрытый Дейт Пикер WaitForElementIsPresentByXPath(${this.xActiveDatePicker})`;
            }
            this.Value = await ElementGetValue(this.page, this.Num, this.xClickToOpen);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in OpenDatePicker`);
            return false;
        }
    }//async OpenDatePicker()
     //----------------------------------------
    async ClickToCurrentDate() {
        let resOk;
        try { // ДейтПикер уже раскрыт
            // Раскрытый Дейт Пикер
            resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xActiveDatePicker);
            if (!resOk) {
                throw `FAIL => Раскрытый Дейт Пикер WaitForElementIsPresentByXPath(${this.xActiveDatePicker})`;
            }
            // Клик Текущий день
            resOk = await ClickByXPathW(this.page, this.xCurrentDay);
            if(!resOk){
                throw `FAIL => Клик Текущий день ClickByXPathW(${this.xCurrentDay})`;
            }
            // await WaitRender(this.page);
            this.Value = await ElementGetValue(this.page, this.Num, this.xClickToOpen);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ClickToCurrentDate`);
            return false;
        }
    }//async ClickToCurrentDate()
    //----------------------------------------
    async ClickNextOfCurrentDate(Offset) {
        let resOk;
        let lenDays;
        let numNextDay = -1;
        let tempAttributeValue;
        try {
            lenDays = await ElementGetLength(this.page, this.xAllDays);
            if(lenDays < 30) {
                await console.log(`!!! Warning -> lenDays=(${lenDays}) < 30`);
            }else {
                // await console.log(`lenDays=(${lenDays})`);
            }

            for(let i=0; i < lenDays; i++){
                tempAttributeValue = await ElementGetAttribute(this.page, i, `class`, this.xAllDays);
                // await console.log(`class="${tempAttributeValue}"`);
                if(await SubStrIsPresent(`today`, tempAttributeValue)){
                    numNextDay = i + Offset;
                    break;
                }
            }
            if (numNextDay === -1){
                throw `FAIL => numNextDay=(${numNextDay})`;
            }
            // Клик по следующему за текущим дню
            resOk = await ClickByXPathWNum(this.page, numNextDay, this.xAllDays);
            if(!resOk){
                throw `FAIL => Клик по следующему за текущим дню ClickByXPathWNum(${numNextDay}, ${this.xAllDays})`;
            }
            // await WaitRender(this.page);
            this.Value = await ElementGetValue(this.page, this.Num, this.xClickToOpen);
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ClickNextOfCurrentDate`);
            return false;
        }
    }//async ClickNextOfCurrentDate()
     //----------------------------------------
    async SetTime(strHours, strMinutes) {
        let resOk;
        try {
            // Инпут Часы
            resOk = await ClickByXPathW(this.page, this.xHours);
            resOk = await SetTextByXPath(this.page, this.xHours, strHours);
            if(!resOk){
                throw `FAIL => Инпут Часы SetTextByXPath(${this.xHours})`;
            }
            // Инпут Минуты
            resOk = await ClickByXPathW(this.page, this.xMinutes);
            resOk = await SetTextByXPath(this.page, this.xMinutes, strMinutes);
            if(!resOk){
                throw `FAIL => Инпут Минуты SetTextByXPath(${this.xMinutes})`;
            }
            await this.page.keyboard.press('Enter');
            //await WaitRender(this.page);
            this.Value = await ElementGetValue(this.page, this.Num, this.xClickToOpen);
            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in SetTime`);
            return false;
        }
    }//async SetTime()

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

}// class DatePicker
//----------------------------------------

//=========================================================
module.exports = {DatePicker};
