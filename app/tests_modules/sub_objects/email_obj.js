//'use strict';
class Email {
    constructor(page, EmailData) {
        this.page = page;
        this.EmailData = EmailData;
        // Контактные данные "E-mail"
        this.xEmail =`//div[@class="relations__item"]/label[contains(text(),"E-mail")]`;
        //Табличное редактирование ТАБ "Email"
        this.xTabEmail = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Email")]`;
        // Табличное редактирование Кнопка "+ Добавить Email"
        this.xButtonPlusEmail = `//div[@class="tab-pane active"]/div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xButtonPlusEmail+= `/button[@type="button"][contains(text(), "Добавить Email")]`;
        // Заголовок в Модалке "E-mail адрес"
        this.xModalTitleEmailAddress=`//h5[@class="modal-title"][contains(text(), "E-mail адрес")]`;
        // Инпут "E-mail адрес"
        this.xInputEmailAddress =`//input[@placeholder="Введите E-mail"][@name="E-mail адрес"]`;
        // Чек Бокс "Skype"
        this.xCheckBoxSkype =`//span[@class="fox-checkbox-label"][contains(text(), "Skype")]`;
        // Чек Бокс "Email по дефолту"
        this.xCheckBoxDefault =`//span[@class="fox-checkbox-label"][contains(text(), "Email по дефолту")]`;
        // Кнопка "Сохранить"
        this.xButtonSave =`//div[contains(@id,"company-contact-email-modal")]//button[@type="button"][contains(text(), "Сохранить")]`;
        // Закрыть Таблицу Email
        this.xCloseTable =`//button[@type="button"][@class="close"]`;



    }

    async clickEmail(){
        try{ let resOk;
            // Клик по  E-mail
            // Контактные данные " E-mail "
            resOk = await ClickByXPath(this.page, this.xEmail);
            if (!resOk){
                throw `FAIL => Контактные данные " E-mail " ClickByXPath(${this.xEmail})`;
            }
            await WaitRender(this.page);
            //Проверка открытия ТАБА Email
            //Табличное редактирование ТАБ "Email"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTabEmail);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Табличное редактирование ТАБ "Email"(${this.xTabEmail})`;
            }

            return true;
        }catch (e) {
            await console.log(`FAIL in clickEmail ${e} \n`);
            return false;
        }
    }//async clickEmail()
    //----------------------------------------
    async clickPlusEmailInTable(){
        try{ let resOk;
            // Клик по Кнопке "+ Добавить Email"
            // Табличное редактирование Кнопка "+ Добавить Email"
            resOk = await ClickByXPath(this.page, this.xButtonPlusEmail);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Табличное редактирование Кнопка "+ Добавить Email" ClickByXPath(${this.xButtonPlusEmail})`;
            }
            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`FAIL in clickPlusEmailInTable ${e} \n`);
            return false;
        }
    }//async clickPlusEmailInTable()
    //----------------------------------------
    async EnterEmailDataInModalAndSave(){
        try{ let resOk;
            await WaitRender(this.page);
            // Заголовок в Модалке "E-mail адрес"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xModalTitleEmailAddress);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Заголовок в Модалке "E-mail адрес"  WaitForElementIsPresentByXPath (${this.xModalTitleEmailAddress})`;
            }
            // Инпут "E-mail адрес"
            resOk = await ClickByXPath(this.page, this.xInputEmailAddress);
            if (!resOk){
                throw `FAIL => Инпут "E-mail адрес" ClickByXPath(${this.xInputEmailAddress})`;
            }
            await this.page.waitFor(200);
            await this.page.keyboard.type(this.EmailData.strEmail, {delay: 20});

            // Чек Бокс "Skype"
            if (this.EmailData.isSkype) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxSkype);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "Skype"  (${this.xCheckBoxSkype})`;
                }
            }
            // Чек Бокс "Email по дефолту"
            if (this.EmailData.isDefault) {
                resOk = await ClickByXPath(this.page, this.xCheckBoxDefault);
                if (!resOk){
                    throw `FAIL => Клик по ЧекБоксу "Email по дефолту"  (${this.xCheckBoxDefault})`;
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
            await console.log(`FAIL in EnterEmailDataInModalAndSave ${e} \n`);
            return false;
        }
    }//async EnterEmailDataInModalAndSave()
    //----------------------------------------
    async clickCloseEmailTable(){
        try{ let resOk;
            // Закрыть Таблицу Email
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk) {
                throw `FAIL => Клик Закрываем Модалку Таблицы Email(${this.xCloseTable})`;
            }

            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`FAIL in clickCloseEmailTable ${e} \n`);
            return false;
        }
    }//async clickCloseEmailTable()
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



}// class Email
//=========================================================
module.exports = {Email};
