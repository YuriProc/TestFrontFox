//'use strict';
class Link {
    constructor(page, LinkData) {
        this.page = page;
        this.LinkData = LinkData;
        // Контактные данные "Ссылки"
        this.xLink =`//div[@class="relations__item"]/label[contains(text(),"Ссылки")]`;
        //Табличное редактирование ТАБ "Ссылки"
        this.xTabLink = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Ссылки")]`;
        // Табличное редактирование Кнопка "+ Добавить Ссылки"
        this.xButtonPlusLink = `//div[@class="tab-pane active"]//div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xButtonPlusLink+= `/button[@type="button"][contains(text(), "Добавить Ссылки")]`;
        // Заголовок в Модалке "Ссылки"
        this.xModalTitleLink=`//h5[@class="modal-title"][contains(text(), "Ссылки")]`;
        // Инпут "Ссылка"
        this.xInputLink = `//fieldset[contains(@class,"form-group")][legend[contains(text(), "Ссылка")]]`;
        this.xInputLink+= `//input[@class="custom-input form-control"]`;
        // Дропдаун "Тип ссылки"
        this.xInputLinkTypeDropDown = `//fieldset[contains(@class,"form-group")][legend[contains(text(), "Тип ссылки")]]`;
        this.xInputLinkTypeDropDown+= `//input[@type="search"]`;
        // Дропдаун "Тип ссылки" Выбранный тип
        this.xInputLinkTypeDropDownSelected = `//fieldset[contains(@class,"form-group")][legend[contains(text(), "Тип ссылки")]]`;
        this.xInputLinkTypeDropDownSelected+= `//ul[@role="listbox"]/li[@role="option"][contains(@id, "option-0")]`;
        // Описаниие
        this.xLinkDescription = `//fieldset[contains(@class,"form-group")][legend[contains(text(), "Описание")]]`;
        this.xLinkDescription+= `//textarea[@wrap="soft"][@class="form-control"]`;
        // Кнопка "Сохранить"
        this.xButtonSave =`//div[contains(@id,"company-contact-link-modal")]//button[@type="button"][contains(text(), "Сохранить")]`;
        // Закрыть Таблицу Ссылки
        this.xCloseTable =`//button[@type="button"][@class="close"]`;

    }
    async clickLink(){
        try{ let resOk;
            // Клик по "Ссылки"
            // Контактные данные "Ссылки"
            resOk = await ClickByXPath(this.page, this.xLink);
            if (!resOk){
                throw `FAIL => Контактные данные "Ссылки" ClickByXPath(${this.xLink})`;
            }
            await WaitRender(this.page);
            //Проверка открытия ТАБА Ссылки
            //Табличное редактирование ТАБ "Ссылки"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTabLink);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Табличное редактирование ТАБ "Ссылки"(${this.xTabLink})`;
            }

            return true;
        }catch (e) {
            await console.log(`FAIL in clickLink ${e} \n`);
            return false;
        }
    }//async clickLink()
    //----------------------------------------
    async clickPlusLinkInTable(){
        try{ let resOk;
            // Клик по Кнопке "+ Добавить Ссылки"
            // Табличное редактирование Кнопка "+ Добавить Ссылки"
            resOk = await ClickByXPath(this.page, this.xButtonPlusLink);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Табличное редактирование Кнопка "+ Добавить Ссылки" ClickByXPath(${this.xButtonPlusLink})`;
            }
            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`FAIL in clickPlusLinkInTable ${e} \n`);
            return false;
        }
    }//async clickPlusLinkInTable()
    //----------------------------------------
    async EnterLinkDataInModalAndSave(){
        try{ let resOk;
            await WaitRender(this.page);
            // Заголовок в Модалке "Ссылки"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xModalTitleLink);
            if (!resOk){
                //await TempStop(this.page);
                throw `FAIL => Заголовок в Модалке "Ссылки"  WaitForElementIsPresentByXPath (${this.xModalTitleLink})`;
            }
            // Инпут "Ссылка"
            // resOk = await ClickByXPath(this.page, this.xInputLink);
            // if (!resOk){
            //     throw `FAIL => Инпут "Ссылка" ClickByXPath(${this.xInputLink})`;
            // }
            resOk = await SetTextByXPath(this.page, this.xInputLink, this.LinkData.strLink);
            if (!resOk){
                throw `FAIL => Инпут "Ссылка" TypeByXPath(${this.xInputLink})`;
            }

            //await this.page.waitFor(4000);
            // await this.page.waitFor(200);
            // await this.page.keyboard.type(this.LinkData.strLink, {delay: 20});
            // await this.page.waitFor(200);
            // Дропдаун "Тип ссылки"
            resOk = await ClickByXPath(this.page, this.xInputLinkTypeDropDown);
            if (!resOk){
                throw `FAIL => Клик по Дропдаун "Тип ссылки"(${this.xInputLinkTypeDropDown})`;
            }
            await this.page.waitFor(200);
            await this.page.keyboard.type(this.LinkData.strLinkType, {delay: 30});
            await WaitRender(this.page);
            // Дропдаун "Тип ссылки" Выбранный тип
            resOk = await ClickByXPath(this.page, this.xInputLinkTypeDropDownSelected);
            if (!resOk){
                throw `FAIL => Клик Дропдаун "Тип ссылки" Выбранный тип(${this.xInputLinkTypeDropDownSelected})`;
            }
            await WaitRender(this.page);
            // Описаниие
            resOk = await SetTextByXPath(this.page, this.xLinkDescription, this.LinkData.strDescription);
            if (!resOk){
                throw `FAIL => Модалка "Ссылки" Описаниие SetTextByXPath(${this.xLinkDescription})`;
            }
            // Кнопка "Сохранить"
            resOk = await ClickByXPath(this.page, this.xButtonSave);
            if (!resOk){
                throw `FAIL => Клик по Кнопке "Сохранить"  (${this.xButtonSave})`;
            }
            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`FAIL in EnterLinkDataInModalAndSave ${e} \n`);
            return false;
        }
    }//async EnterLinkDataInModalAndSave()
    //----------------------------------------
    async clickCloseLinkTable(){
        try{ let resOk;
            // Закрыть Таблицу Ссылки
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk) {
                await TempStop(this.page);
                throw `FAIL => Клик Закрываем Модалку Таблицы Ссылки(${this.xCloseTable})`;
            }

            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`FAIL in clickCloseLinkTable ${e} \n`);
            return false;
        }
    }//async clickCloseLinkTable()



    async TemplateTemp(){
        try{ let resOk;

            return true;
        }catch (e) {
            await console.log(`FAIL in TemplateTemp ${e} \n`);
            return false;
        }
    }//async TemplateTemp()
    //----------------------------------------

}// class Link
//=========================================================
module.exports = {Link};
