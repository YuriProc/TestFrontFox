//'use strict';
class Phone {
    constructor(page, PhoneData) {
        this.page = page;
        this.PhoneData = PhoneData;
        // Контактные данные "Телефон"
        this.xPhone =`//div[@class="relations__item"]/label[contains(text(),"Телефон")]`;
        //Табличное редактирование ТАБ "Телефон"
        this.xTabPhone = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Телефоны")]`;
        // Табличное редактирование Кнопка "+ Добавить Телефоны"
        this.xButtonPlusPhone = `//div[@class="tab-pane active"]//div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xButtonPlusPhone+= `/button[@type="button"][contains(text(), "Добавить Телефоны")]`;
        // Заголовок в Модалке "Номер телефона"
        this.xModalTitlePhoneNumber=`//h5[@class="modal-title"][contains(text(), "Номер телефона")]`;
        // Инпут "Введите номер телефона"
        this.xInputPhoneNumber =`//input[@placeholder="Введите номер телефона"][@name="phone"]`;
        // Чек Бокс "Telegram"
        this.xCheckBoxTelegram =`//span[@class="fox-checkbox-label"][contains(text(), "Telegram")]`;
        // Чек Бокс "Viber"
        this.xCheckBoxViber =`//span[@class="fox-checkbox-label"][contains(text(), "Viber")]`;
        // Чек Бокс "Skype"
        this.xCheckBoxSkype =`//span[@class="fox-checkbox-label"][contains(text(), "Skype")]`;
        // Чек Бокс "WhatsApp"
        this.xCheckBoxWhatsApp =`//span[@class="fox-checkbox-label"][contains(text(), "WhatsApp")]`;
        // Чек Бокс "Toplyvo"
        this.xCheckBoxToplyvo =`//span[@class="fox-checkbox-label"][contains(text(), "Toplyvo")]`;
        // Чек Бокс "Роуминг"
        this.xCheckBoxRouming =`//span[@class="fox-checkbox-label"][contains(text(), "Роуминг")]`;
        // Чек Бокс "Телефон по умолчанию"
        this.xCheckBoxDefault =`//span[@class="fox-checkbox-label"][contains(text(), "Телефон по умолчанию")]`;
        // Кнопка "Сохранить"
        this.xButtonSave =`//div[contains(@id,"company-contact-phone-modal")]//button[@type="submit"][contains(text(), "Сохранить")]`;
        // Закрыть Таблицу Телефоны
        this.xCloseTable =`//button[@type="button"][@class="close"]`;





    }
    //------------------------------------
    async clickPhone(){
        try{ let resOk;

            // Клик по Телефон
            // Контактные данные "Телефон"
            resOk = await ClickByXPath(this.page, this.xPhone);
            if (!resOk){
                throw `FAIL => Контактные данные "Телефон" ClickByXPath(${this.xPhone})`;
            }
            await WaitRender(this.page);
            //Проверка открытия ТАБА Телефон
            //Табличное редактирование ТАБ "Телефон"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTabPhone);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Табличное редактирование ТАБ "Телефон"(${this.xTabPhone})`;
            }

            return true;
        }catch (e) {
            await console.log(`FAIL in clickPhone ${e} \n`);
            return false;
        }
    }//async clickPhone()
    //--------------------------------------
    async clickPlusPhoneInTable(){
        try{ let resOk;
            // Клик по Кнопке "+ Добавить Телефоны"
            // Табличное редактирование Кнопка "+ Добавить Телефоны"
            resOk = await ClickByXPath(this.page, this.xButtonPlusPhone);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Табличное редактирование Кнопка "+ Добавить Телефоны" ClickByXPath(${this.xButtonPlusPhone})`;
            }
            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`FAIL in clickPlusPhoneInTable ${e} \n`);
            return false;
        }
    }//async clickPlusPhoneInTable()
    //--------------------------------------
    async EnterPhoneDataInModalAndSave(){
        try{ let resOk;
            await WaitRender(this.page);
            // Заголовок в Модалке "Номер телефона"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xModalTitlePhoneNumber);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Заголовок в Модалке "Номер телефона"  WaitForElementIsPresentByXPath (${this.xModalTitlePhoneNumber})`;
            }
            // Инпут "Введите номер телефона"
            // resOk = await ClickByXPath(this.page, this.xInputPhoneNumber);
            // if (!resOk){
            //     throw `FAIL => Инпут "Введите номер телефона" ClickByXPath(${this.xInputPhoneNumber})`;
            // }
            // await this.page.waitFor(200);
            // await this.page.keyboard.type(this.PhoneData.strPhoneNumber, {delay: 20});


            resOk = await SetTextByXPath(this.page, this.xInputPhoneNumber, this.PhoneData.strPhoneNumber);
            if (!resOk){
                throw `FAIL => Инпут "Введите номер телефона" ClickByXPath(${this.xInputPhoneNumber})`;
            }

            // Чек Бокс "Telegram"
            if (this.PhoneData.isTelegram) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxTelegram);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "Telegram"  (${this.xCheckBoxTelegram})`;
                }
            }
            // Чек Бокс "Viber"
            if (this.PhoneData.isViber) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxViber);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "Viber"  (${this.xCheckBoxTelegram})`;
                }
            }
            // Чек Бокс "Skype"
            if (this.PhoneData.isSkype) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxSkype);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "Skype"  (${this.xCheckBoxSkype})`;
                }
            }
            // Чек Бокс "WhatsApp"
            if (this.PhoneData.isWhatsApp) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxWhatsApp);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "WhatsApp"  (${this.xCheckBoxWhatsApp})`;
                }
            }
            // Чек Бокс "Toplyvo"
            if (this.PhoneData.isToplyvo) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxToplyvo);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "Toplyvo"  (${this.xCheckBoxToplyvo})`;
                }
            }
            // Чек Бокс "Роуминг"
            if (this.PhoneData.isRouming) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxRouming);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "Роуминг"  (${this.xCheckBoxRouming})`;
                }
            }
            // Чек Бокс "Телефон по умолчанию"
            if (this.PhoneData.isDefault) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxDefault);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "Телефон по умолчанию"  (${this.xCheckBoxDefault})`;
                }
            }
            // Кнопка "Сохранить"
            resOk = await ClickByXPath(this.page, this.xButtonSave);
            if (!resOk){
                throw `FAIL => Клик по Кнопке "Сохранить"  (${this.xButtonSave})`;
            }
            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`FAIL in EnterPhoneDataInModalAndSave ${e} \n`);
            return false;
        }
    }//async EnterPhoneDataInModalAndSave()
    //--------------------------------------
    async clickClosePhoneTable(){
        try{ let resOk;
            // Закрыть Таблицу Телефоны
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk) {
                throw `FAIL => Клик Закрываем Модалку Таблицы Телефоны(${this.xCloseTable})`;
            }

            await WaitRender(this.page);


            return true;
        }catch (e) {
            await console.log(`FAIL in clickClosePhoneTable ${e} \n`);
            return false;
        }
    }//async clickClosePhoneTable()
    //--------------------------------------
    async TemplateTemp(){
        try{ let resOk;

            return true;
        }catch (e) {
            await console.log(`FAIL in TemplateTemp ${e} \n`);
            return false;
        }
    }//async TemplateTemp()
    //----------------------------------------
}// class Phone
//=========================================================

module.exports = {Phone};
