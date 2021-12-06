//'use strict';
class Location {
    constructor(browser ,page, LocationData) {
        this.browser = browser;
        this.page = page;
        this.pageTableLocations = ''; // новая страница таблицы Локаций
        this.LocationData = LocationData;
        // Контактные данные "Локация"
        this.xLocation =`//div[@class="relations__item"]/label[contains(text(),"Локация")]`;
        //Табличное редактирование ТАБ "Локации"
        this.xTabLocations = `//li[@role="presentation"]/a[@role="tab"][@aria-selected="true"][contains(text(),"Локации")]`;
        //Табличное редактирование, вкладка "Локации", первая кнопка "Корзина" (Удаление Локации - первой в таблице)
        this.xFirstButtonDelete = `//table[@role="table"][.//th[@role="columnheader"]/div[contains(text(),"Тип локации")]]//div[@data-id="0"][@class="delete-icon"]`;
        this.xAllButtonDelete = `//table[@role="table"][.//th[@role="columnheader"]/div[contains(text(),"Тип локации")]]//div[@class="delete-icon"]`;
        // Кнопка "+ Добавить Локации"
        this.xButtonPlusLocations = `//div[@class="tab-pane active"]/div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xButtonPlusLocations+= `/button[@type="button"][contains(text(), "Добавить Локации")]`;
        //Проверка открытия модалки "Найти сущ. локацию"
        this.xModalHeaderFindExistsLocation = `//div[@id="MODAL::ADD_LOCATION_TO_COMPANY::SHOW___BV_modal_content_"]`;
        this.xModalHeaderFindExistsLocation+= `[header[@class="modal-header"]/h5[@class="modal-title"][contains(text(), "Найти сущ. локацию")]]`;
        // инпут "Введите адресс"
        this.xInputEnterAddress = this.xModalHeaderFindExistsLocation + `//input[@placeholder="Введите адресс"][@class="multiselect__input"]`;
        // Селект "Введите адресс"  + `[contains(text(), "XXX")]`;
        this.xSelectEnterAddress = this.xModalHeaderFindExistsLocation + `//li[@class="multiselect__element"]/span/span`;
        //this.xSelectEnterAddress = `//li[@class="multiselect__element"]/span/span`;
        // Дождаться появления пропадания спиннера
        this.xSpinnerNotPresent = this.xModalHeaderFindExistsLocation + `//div[@class="multiselect__spinner"][@style="display: none;"]`;
        // Кнопка "Добавить"
        this.xButtonAdd = this.xModalHeaderFindExistsLocation + `//button[contains(text(), "Добавить")][@type="button"]`;
        // Кнопка "Перейти в таблицу локаций"
        this.xButtonGoToTableLocations = `//div[@class="tab-pane active"]/div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xButtonGoToTableLocations+= `/div[@class="d-flex"]/a[@href="/crm/locations"][contains(text(), "Перейти в таблицу локаций")]`;
        // Проверить , что мы на таблице локаций !!!!
        //section[@id="crm-table-location"]//table[@role="table"][@aria-busy="false"]//th[@role="columnheader"][@aria-colindex="4"]/div[contains(text(), "Тип локации")]
        this.xTableLocationReady = `//section[@id="crm-table-location"]//table[@role="table"][@aria-busy="false"]`;
        this.xTableLocationColumnHeader_4 = this.xTableLocationReady + `//th[@role="columnheader"][@aria-colindex="4"]/div[contains(text(), "Тип локации")]`;
            // Верхнее меню Кнопка "Еще..."
        this.xMenuButtonMore = `//button[@aria-controls="menu"][@type="button"][contains(text(), "Еще...")]`;
        // Верхнее меню "Локации"
        this.xMenuLocations = `//a[@href="/crm/locations"]`;
        // Верхнее меню "Локации +"
        this.xMenuLocationsPlus = `//a[@href="/crm/location"][@class="info__add"]`;

        // Кнопка "Назад к списку локаций"
        this.xBackToListLocations = `//a[@href="/crm/locations"][@class="crm-view__back-to-page"][contains(text(), "Назад к списку локаций")]`;
        // Заголовок "Создание локации"
        this.xHeaderCreateLocation = `//h3[@class="crm-view__title"][contains(text(), "Создание локации")]`;
        //  Проверить , что спиннер исчез на форме Создания локации
        this.xSpinnerCreateLocation = `//form[@novalidate="novalidate"]//span[@class="spinner-border"]`;
        // Заголовок "Редактирование локации"
        this.xHeaderEditLocation = `//h3[@class="crm-view__title"][contains(text(), "Редактирование локации")]`;
        // * Инпут "Адрес для маршрута в фоксе"
        this.xInputAddressFOX = `//div[@class="crm-location-manage__card"]/fieldset[legend[contains(text(), "Адрес для маршрута в фоксе")]]`;
        this.xInputAddressFOX+= `//input`;
        // Дропдаун адресов Гугла // Добавить `[contains(text(), "XXXX")]`
        this.xDropDownGoogleAddress = `//div[@class="pac-container pac-logo"]/div[@class="pac-item"]/span[@class="pac-item-query"]/span[@class="pac-matched"]`;
        // Инпут "Фактическое местоположение по гуглу"
        this.xInputAddressFact = `//div[@class="crm-location-manage__card"]/fieldset[legend[contains(text(), "Фактическое местоположение по гуглу")]]`;
        this.xInputAddressFact+= `//input[@placeholder="Нажмите на карту для заполнения местоположения"]`;
        // Область Карты []
        this.xMapArea = `//div[@id="js-location-select-map"][@class="crm-location-manage__map"]`;
        // Карта кнопка уменьшить (-)
        this.xButtonMinus = `//button[@aria-label="Зменшити"]`;
        // Инпут "Юридический адрес (Для ТТН и заявок)"
        this.xInputAddressTTN = `//div[@class="crm-location-manage__card"]/fieldset[legend[contains(text(), "Юридический адрес (Для ТТН и заявок)")]]`;
        this.xInputAddressTTN+= `//input[@placeholder="Введите адресс для ТТН"]`;
        // Категория * одна из трёх кнопок // Добавить `[contains(text(), "XXXX")]`
        this.xButtonXXX = `//button[@type="button"]/span`;
        // Кнопка "Грузополучатель"
        this.xButtonCargoIn = `//button[@type="button"]/span[contains(text(), "Грузополучатель")]`;
        // Кнопка "Грузоотправитель"
        this.xButtonCargoOut = `//button[@type="button"]/span[contains(text(), "Грузоотправитель")]`;
        // Кнопка "Перевозчик"
        this.xButtonTransporter = `//button[@type="button"]/span[contains(text(), "Перевозчик")]`;

        // Инпут "Время на загрузку" // LocationData.strLoadingTime
        this.xInputLoadTime = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Время на загрузку")]]//input`;
        // Инпут "Время на выгрузку" // LocationData.strUnLoadingTime
        this.xInputUnLoadTime = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Время на выгрузку")]]//input`;

        // * ДропДаун "Тип локации"
        //this.xInputLocationType = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Тип локации")]]//input`;
        this.xInputLocationType = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Тип локации")]]//div[@class="multiselect__tags"]`;

        // Селект в ДропДауне "Тип локации"
        //`//span[contains(@class, "highlight")]/span[contains(text(), "Склад")]`; ${LocationData.strLocationType}
        this.xSelectLocationType = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Тип локации")]]`;
        this.xSelectLocationType+= `//span[contains(@class, "highlight")]/span`; // + [contains(text(), "${LocationData.strLocationType}")]
        // * ДропДаун "Вид промышленности"
        //this.xInputIndustryType = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Вид промышленности")]]//input`;
        this.xInputIndustryType = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Вид промышленности")]]//div[@class="multiselect__tags"]`;

        // Селект в ДропДауне "Вид промышленности"
        //`//span[contains(@class, "highlight")]/span[contains(text(), "Алкоголь")]`; ${LocationData.strIndustryType}
        this.xSelectIndustryType = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Вид промышленности")]]`;
        this.xSelectIndustryType+= `//span[contains(@class, "highlight")]/span`; // + [contains(text(), "${LocationData.strIndustryType}")]
        // ФилдСет "Контакты *"
        this.xFieldSetContacts = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Контакты")][span[@class="required"][contains(text(),"*")]]]`;
        // * Инпут ДропДаун "Контакты"
        //this.xInputContacts = this.xFieldSetContacts + `//div[@class="multiselect__tags"][input[@placeholder="Выберите контакты компании"]]`;
        this.xInputInputContacts = this.xFieldSetContacts + `//div[@class="multiselect__tags"]/input[@placeholder="Выберите контакты компании"]`;
        this.xInputContacts = this.xFieldSetContacts + `//div[@class="multiselect__tags"]`;
        // Спиннер в * Инпут ДропДаун "Контакты"
        this.xInputContactsSpinnerDisabled = this.xFieldSetContacts + `//div[@class="multiselect__spinner"][@style="display: none;"]`;
        // ДропДаун "Контакты" раскрытый
        this.xDropDownContactsOpened = this.xFieldSetContacts + `//div[@class="multiselect__content-wrapper"][not (contains(@style, "display: none"))]`;
        // ДропДаун "Контакты" закрытый
        this.xDropDownContactsClosed = this.xFieldSetContacts + `//div[@class="multiselect__content-wrapper"][contains(@style, "display: none")]`;

        // * Селект ДропДаун "Контакты" + [contains(text(), "XXX")];
        this.xSelectContacts = this.xFieldSetContacts + `//li[@class="multiselect__element"]/span[@class="multiselect__option"]/span`;

        // Кнопка "Создать контакт"
        this.xButtonCreateContact = `//div[contains(@class, "create-contact")][contains(text(), "Создать контакт")]`;

        // ФилдСет "Компании *"
        this.xFieldSetCompanies = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Компании")][span[@class="required"][contains(text(),"*")]]]`;
        // * Инпут "Компании" //LocationData.strCompanyName
        this.xInputCompanies = this.xFieldSetCompanies + `//div[@class="multiselect__tags"]`;
        this.xInputInputCompanies = this.xInputCompanies + `/input`;
        // Селект в ДропДауне "Компании" ${LocationData.strCompanyName}
        this.xSelectCompanies = this.xFieldSetCompanies + `//span[contains(@class, "multiselect__option")]`; // + [contains(text(), "${LocationData.strCompanyName}")]
        this.xSelectCompanies+= `[contains(text(), "${this.LocationData.strCompanyCode}")]`;
        // ФилдСет "Название"
        this.xFieldSetLocationName = `//fieldset[contains(@class, "form-group")][legend[contains(text(), "Название")]]`;
        // Инпут "Название"
        this.xInputLocationName = this.xFieldSetLocationName + `//textarea[@type="text"]`;
        // Кнопка "Сохранить"
        this.xButtonSaveLocation = `//button[@type="submit"][contains(text(), "Сохранить")]`;
        // Кнопка "Сохранить" Активная
        this.xButtonSaveLocationActive = `//button[@type="submit"][contains(text(), "Сохранить")][not(contains(@disabled, "disabled"))]`;







        // Закрыть Таблицу Локации
        this.xCloseTable =`//button[@type="button"][@class="close"]`;

    }
    async clickLocation(){
        try{ let resOk;

            // Клик по "Локация"
            // Контактные данные "Локация"
            resOk = await ClickByXPath(this.page, this.xLocation);
            if (!resOk){
                throw `FAIL => Контактные данные "Локация" ClickByXPath(${this.xLocation})`;
            }
            await WaitRender(this.page);
            //Проверка открытия ТАБА Локации
            //Табличное редактирование ТАБ "Локации"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xTabLocations);
            if (!resOk){
                await console.log(`FAIL in clickLocation `);
                await TempStop(this.page);
                throw `FAIL => Табличное редактирование ТАБ "Локации"(${this.xTabLocations})`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in clickLocation`);
            return false;
        }
    }//async clickLocation()
    //----------------------------------------
    async deleteAllLocations(){
        try {
            let resOk, QElem;
            await WaitRender(this.page);
            //Табличное редактирование, вкладка "Локации", первая кнопка "Корзина" (Удаление Локации - первой в таблице)
            QElem = await ElementGetLength(this.page, this.xAllButtonDelete);
            while(QElem>0) {
                await console.log(`deleteAllLocations ${QElem}`);
                resOk = await ClickByXPathNum(this.page, 0, this.xFirstButtonDelete);
                if (!resOk){
                    await this.page.screenshot({path: g_PathSS + `screenshot_del_location.png`, fullPage: true });
                    await console.log(g_PathSS + `screenshot_del_location.png`);
                    // !!!!!!!! ???????
                    await TempStop(this.page);
                    throw `FAIL => Табличное редактирование, вкладка "Локации", первая кнопка "Корзина" (Удаление Локации - первой в таблице)(${this.xDelete})`;
                }
                await WaitUntilPageLoads(this.page);
                QElem = await ElementGetLength(this.page, this.xAllButtonDelete);
            }
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in deleteAllLocations`);
            return false;
        }
    }// async deleteAllLocations()
    //---------------------------------------------
    async clickPlusAddLocations(){
        try{ let resOk;

            // Кнопка "+ Добавить Локации"
            resOk = await ClickByXPath(this.page, this.xButtonPlusLocations);
            if (!resOk){
                throw `FAIL => Кнопка "+ Добавить Локации" ClickByXPath(${this.xLocation})`;
            }
            await WaitRender(this.page);
            //Проверка открытия модалки "Найти сущ. локацию"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xModalHeaderFindExistsLocation);
            if (!resOk){
                throw `FAIL => Проверка открытия модалки "Найти сущ. локацию"(${this.xModalHeaderFindExistsLocation})`;
            }
            // инпут "Введите адресс"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xInputEnterAddress);
            if (!resOk){
                throw `FAIL => Проверка открытия модалки "Найти сущ. локацию" инпут "Введите адресс"(${this.xInputEnterAddress})`;
            }
            // Кнопка "Добавить"
            resOk = await WaitForElementIsPresentByXPath(4000 , this.page, this.xButtonAdd);
            if (!resOk){
                throw `FAIL => Проверка открытия модалки "Найти сущ. локацию" Кнопка "Добавить"(${this.xButtonAdd})`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in clickPlusAddLocations`);
            return false;
        }
    }//async clickPlusAddLocations()
    //----------------------------------------
    async EnterExistsAddressAndPressAdd(){
        try{ let resOk;


            // инпут "Введите адресс"
            resOk = await TypeByXPath(this.page, this.xInputEnterAddress, this.LocationData.strAddressFOX);
            if (!resOk){
                throw `FAIL => Модалка "Найти сущ. локацию" инпут "Введите адресс" TypeByXPath(${this.LocationData.strAddressFOX})`;
            }
            await WaitRender(this.page);
            // Дождаться появления пропадания спиннера
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSpinnerNotPresent);
            await WaitRender(this.page);

            // Селект "Введите адресс"  + `[contains(text(), "XXX")]`;
            this.xSelectEnterAddress+= `[contains(text(), "${this.LocationData.strAddressFOX}")]`;
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xSelectEnterAddress);
            resOk = await ClickByXPathNum(this.page, 0,this.xSelectEnterAddress);
            if (!resOk){
                // await console.log(`${this.xSelectEnterAddress}`);
                // await TempStop(this.page);

                throw `FAIL => Модалка "Найти сущ. локацию" Селект "Введите адресс" ClickByXPathNum(${this.xSelectEnterAddress})`;
            }
            await WaitRender(this.page);
            g_strDialogMessage = ``;
            // Кнопка "Добавить"
            resOk = await ClickByXPath(this.page, this.xButtonAdd);
            if (!resOk){
                throw `FAIL => Модалка "Найти сущ. локацию" Кнопка "Добавить"(${this.xButtonAdd})`;
            }
            await WaitRender(this.page);
            await console.log(`strDialogMessage:(${g_strDialogMessage})`);


            //await TempStop(this.page);
            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in EnterExistsAddressAndPressAdd`);
            return false;
        }
    }//async EnterExistsAddressAndPressAdd()
     //----------------------------------------
    async EnterDataInExistsLocation(){
        try{ let resOk;
            // Заголовок "Редактирование локации"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xHeaderEditLocation);
            if (!resOk) {
                throw `FAIL => Заголовок "Редактирование локации"(${this.xHeaderEditLocation})`;
            }
            await WaitRender(this.page);
            // * Инпут "Адрес для маршрута в фоксе"
           // ElementGetValue = async function (page , Num, MyXPath) {

                resOk = await ElementGetValue(this.page, 0, this.xInputAddressFOX);
            this.LocationData.strAddressFOXfromGoogle = resOk;
            //await console.log(`strAddressFOXfromGoogle:(${resOk})`);
            //  if (!resOk) {
            //     await this.page.screenshot({path: PathSS + 'screenshot_address_location.png', fullPage: true });
            //     // await console.log(`FAIL resOk Инпут "Адрес для маршрута в фоксе"`);
            //     // await TempStop(this.pageTableLocations);
            //     throw `FAIL => Инпут "Адрес для маршрута в фоксе" ClickByXPath(${this.xInputAddressFOX})`;
            // }
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strAddressFOX, 20);
            if (!resOk) {
                // await console.log(`FAIL Инпут "Адрес для маршрута в фоксе" TypeInPage`);
                // await TempStop(this.pageTableLocations);
                throw `FAIL => Инпут "Адрес для маршрута в фоксе" TypeInPage`;
            }

            // Дропдаун адресов Гугла // Добавить `[contains(text(), "XXXX")]`
            resOk = await WaitForElementIsPresentByXPath(4000, this.pageTableLocations ,this.xDropDownGoogleAddress);
            if (!resOk) {
                throw `FAIL => Дропдаун адресов Гугла WaitForElementIsPresentByXPath(${this.xDropDownGoogleAddress})`;
            }
            await WaitRender(this.pageTableLocations);
            let tempLength = await ElementGetLength(this.pageTableLocations, this.xDropDownGoogleAddress);
            let tempRand = await randomInt(0 ,tempLength-1);
            resOk = await ClickByXPathNum(this.pageTableLocations, tempRand ,this.xDropDownGoogleAddress);
            if (!resOk) {
                throw `FAIL => Дропдаун адресов Гугла ClickByXPathNum(${tempRand})(${this.xDropDownGoogleAddress})`;
            }
            await WaitRender(this.pageTableLocations);
            // Область Карты []
            resOk = await ClickByXPath(this.pageTableLocations, this.xMapArea);
            if (!resOk) {
                throw `FAIL => Область Карты ClickByXPath(${this.xMapArea})`;
            }
            await WaitRender(this.pageTableLocations);
            // Инпут "Юридический адрес (Для ТТН и заявок)"
            resOk = await TypeByXPath(this.pageTableLocations, this.xInputAddressTTN, this.LocationData.strAddressTTN);
            if (!resOk) {
                throw `FAIL => Инпут "Юридический адрес (Для ТТН и заявок)"(${this.xInputAddressTTN})`;
            }

            // strCategory: ['Грузополучатель','Грузоотправитель','Перевозчик']
            // Категория * одна из трёх кнопок // Добавить `[contains(text(), "XXXX")]`
            // this.xButtonXXX
            // let LC = length(this.LocationData.strCategory);
            // for (let i= 0; i<LC; i++ ) {}
            await this.LocationData.strCategory.forEach(async(element) => {
                //await console.log(element);

                resOk = await ClickByXPath(this.pageTableLocations, this.xButtonXXX + `[contains(text(), "${element}")]`);
                if (!resOk) {
                    throw `FAIL => Категория * одна из трёх кнопок(${this.xButtonXXX})`;
                }

            });

            // Инпут "Время на загрузку" // LocationData.strLoadingTime
            resOk = await TypeByXPath(this.pageTableLocations, this.xInputLoadTime, this.LocationData.strLoadingTime);
            if (!resOk) {
                throw `FAIL => Инпут "Время на загрузку"(${this.xInputLoadTime})`;
            }

            // Инпут "Время на выгрузку" // LocationData.strUnLoadingTime
            resOk = await TypeByXPath(this.pageTableLocations, this.xInputUnLoadTime, this.LocationData.strUnLoadingTime);
            if (!resOk) {
                throw `FAIL => Инпут "Время на загрузку"(${this.xInputUnLoadTime})`;
            }

            // * ДропДаун "Тип локации"
            // Клик, Тайп, Выбор
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputLocationType);
            if (!resOk) {
                // await console.log(`ДропДаун "Тип локации"`);
                // await TempStop(this.pageTableLocations);

                throw `FAIL => * ДропДаун "Тип локации" ClickByXPath(${this.xInputLocationType})`;
            }
            await this.pageTableLocations.waitFor(200);
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strLocationType,20);
            if (!resOk) {
                throw `FAIL => * ДропДаун "Тип локации" TypeInPage(${this.xInputLocationType})`;
            }
            await this.pageTableLocations.waitFor(200);

            // Селект в ДропДауне "Тип локации"
            this.xSelectLocationType+= `[contains(text(), "${this.LocationData.strLocationType}")]`;
            resOk = await ClickByXPath(this.pageTableLocations, this.xSelectLocationType);
            if (!resOk) {
                throw `FAIL => Селект в ДропДауне "Тип локации" ClickByXPath(${this.xSelectLocationType})`;
            }

            // * ДропДаун "Вид промышленности"
            // Клик, Тайп, Выбор
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputIndustryType);
            if (!resOk) {
                throw `FAIL => * ДропДаун "Вид промышленности" ClickByXPath(${this.xInputIndustryType})`;
            }
            await this.pageTableLocations.waitFor(200);
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strIndustryType,20);
            if (!resOk) {
                throw `FAIL => * ДропДаун "Вид промышленности" TypeInPage(${this.xInputIndustryType})`;
            }
            await this.pageTableLocations.waitFor(200);

            // Селект в ДропДауне "Вид промышленности"
            this.xSelectIndustryType+= `[contains(text(), "${this.LocationData.strIndustryType}")]`;
            resOk = await ClickByXPath(this.pageTableLocations, this.xSelectIndustryType);
            if (!resOk) {
                throw `FAIL => Селект в ДропДауне "Вид промышленности" ClickByXPath(${this.xSelectIndustryType})`;
            }
            await this.pageTableLocations.waitFor(200);
            //Создаём НОВЫЙ Контакт через Локацию
            // Кнопка "Создать контакт"
            resOk = await ClickByXPath(this.pageTableLocations, this.xButtonCreateContact);
            if (!resOk) {
                throw `FAIL => Кнопка "Создать контакт" ClickByXPath(${this.xButtonCreateContact})`;
            }
            await WaitRender(this.pageTableLocations);

            var {Contact} = require("../sub_objects/contact_obj.js");
            let NewContact = new Contact(this.browser, this.pageTableLocations , this.LocationData.ContactData);

            resOk = await NewContact.CreateNewContactFromLocation();
            if (!resOk){
                throw `FAIL => NewContact.CreateNewContactFromLocation`;
            }
            await WaitRender(this.pageTableLocations);
            // * Инпут "Компании" //LocationData.strCompanyName
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputCompanies);
            if (!resOk) {
                throw `FAIL => Инпут "Компании" ClickByXPath(${this.xInputCompanies})`;
            }
            await this.pageTableLocations.waitFor(200);
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strCompanyName ,20);
            if (!resOk) {
                throw `FAIL => Инпут "Компании" TypeInPage(${this.xInputCompanies})`;
            }
            await WaitRender(this.pageTableLocations);
            // Селект в ДропДауне "Компании" ${LocationData.strCompanyName} вводим Name - выдаёт "Name (Code)"
            // this.xSelectCompanies + [contains(text(), "${LocationData.strCompanyName}")] or strCompanyCode
            resOk = await ClickByXPath(this.pageTableLocations, this.xSelectCompanies);
            if (!resOk) {
                await this.page.screenshot({path: g_PathSS + 'screenshot_select_company_type.png', fullPage: true });
                await console.log(`Селект в ДропДауне "Компании" ClickByXPath`);
                //await TempStop(this.pageTableLocations);
                throw `FAIL => Селект в ДропДауне "Компании" ClickByXPath(${this.xSelectCompanies})`;
            }
            await this.pageTableLocations.waitFor(200);
            // Инпут "Название"
            resOk = await TypeByXPath(this.pageTableLocations, this.xInputLocationName, this.LocationData.strLocationName );
            if (!resOk) {
                throw `FAIL => Инпут "Название" TypeByXPath(${this.xInputLocationName})`;
            }
            await this.pageTableLocations.waitFor(200);


            // await console.log(`EnterNewDataInLocation`);
            // await TempStop(this.pageTableLocations);


            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in EnterDataInExistsLocation`);
            return false;
        }
    }//async EnterDataInExistsLocation()
    //----------------------------------------
    async clickGoToTableLocations(){
        try{ let resOk;


            //this.pageTableLocations = ''; // новая страница таблицы Локаций
            //await page.waitForSelector('#goto');            // ожидаем загрузку объекта
            //const link = await this.page.$x(this.xButtonGoToTableLocations);             // объявляем объект

            const newPagePromise = new Promise(x => this.browser.once('targetcreated', target => x(target.page())));    // объявляем промис
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // Кнопка "Перейти в таблицу локаций" // кликаем, открывается новая СТРАНИЦА
            resOk = await ClickByXPath(this.page, this.xButtonGoToTableLocations);
            if (!resOk) {
                throw `FAIL => Кнопка "Перейти в таблицу локаций"(${this.xButtonGoToTableLocations})`;
            }
            this.pageTableLocations = await newPagePromise;           // объявляем новую СТРАНИЦУ/окно, теперь с ней можно работать
            this.pageTableLocations = await GetNewPage(this.browser, this.pageTableLocations, 2);// <- подстраховка
            if (!this.pageTableLocations) {
                throw `FAIL => this.pageTableLocations=(${this.pageTableLocations})`;
            }

            // let width = 1700;
            // let height = 950;
            await this.pageTableLocations.bringToFront();
            await this.pageTableLocations.setViewport({width: g_width, height: g_height});

            await WaitRender(this.pageTableLocations);
            // !!!!!!! Курсор !!!!!
            await this.pageTableLocations.evaluate(pageCursor);
            // !!!!!
            // Проверить , что мы на таблице локаций !!!!
            resOk = await WaitForElementIsPresentByXPath(5000, this.pageTableLocations, this.xTableLocationReady);
            if (!resOk) {
                let strPath = g_PathSS + 'screenshot_xTableLocationReady.png';

                await this.pageTableLocations.screenshot({path: strPath, fullPage: true });
                await console.log(` screenshot= ${strPath}`);
                await this.pageTableLocations.waitFor(2000);
                throw `FAIL => Проверить , что мы на таблице локаций !!!!(${this.xTableLocationReady})`;
            }
            // Проверить , что мы на таблице локаций и есть заголовок столбца №4 "Тип локации"!!!!
            resOk = await WaitForElementIsPresentByXPath(5000, this.pageTableLocations, this.xTableLocationColumnHeader_4);
            if (!resOk) {
                let strPath = g_PathSS + 'screenshot_xTableLocationColumnHeader_4.png';

                await this.pageTableLocations.screenshot({path: strPath, fullPage: true });
                await console.log(` screenshot= ${strPath}`);
                await this.pageTableLocations.waitFor(2000);
                throw `FAIL => Проверить , что мы на таблице локаций и есть заголовок столбца №4 "Тип локации"!!!! \n (${this.xTableLocationColumnHeader_4})`;
            }


            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in clickGoToTableLocations`);
            return false;
        }
    }//async clickGoToTableLocations()
    //----------------------------------------
    async clickMenuLocationsPlus(){
        try{ let resOk, resOk1, resOk2;

            await WaitRender(this.pageTableLocations);
            // Мы на странице таблицы Локаций
            // Верхнее меню "Локации +"
            // Проверить видима ли кнопка Верхнее меню "Локации +"
            resOk = await ElementIsVisible(this.pageTableLocations, this.xMenuLocationsPlus);
            if (!resOk) { // Если "Локации +" не видно, значит она в "Еще..."
                // Верхнее меню Кнопка "Еще..."
                resOk1 = await ClickByXPath(this.pageTableLocations, this.xMenuButtonMore);
                if (!resOk1) { // если кнопки "Еще..." нет, то ошибка и вываливаем
                    // await console.log(`FAIL resOk1 in Верхнее меню Кнопка "Еще..."`);
                    // await TempStop(this.pageTableLocations);
                    throw `FAIL => Верхнее меню Кнопка "Еще..."(${this.xMenuButtonMore})`;
                }
                await WaitRender(this.pageTableLocations);
            }
            // Верхнее меню "Локации +"
            resOk = await HoverByXPath(this.pageTableLocations, this.xMenuLocations);
            await WaitRender(this.pageTableLocations);
            resOk = await ClickByXPath(this.pageTableLocations, this.xMenuLocationsPlus);
            if (!resOk) {
                // await console.log(`FAIL resOk in Верхнее меню "Локации +"`);
                // await TempStop(this.pageTableLocations);
                throw `FAIL => Кнопка Верхнее меню "Локации +"(${this.xMenuLocationsPlus})`;
            }

            //await WaitRender(this.pageTableLocations);

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in clickMenuLocationsPlus`);
            return false;
        }
    }//async clickMenuLocationsPlus()
    //----------------------------------------
    async EnterNewDataInLocation(){
        try{ let resOk;
            // Заголовок "Создание локации"
            resOk = await WaitForElementIsPresentByXPath(4000, this.pageTableLocations, this.xHeaderCreateLocation);
            if (!resOk) {
                throw `FAIL => Заголовок "Создание локации"(${this.xHeaderCreateLocation})`;
            }
        //  Проверить , что спиннер исчез на форме Создания локации
            //  Проверить , что спиннер исчез на форме Создания локации
            resOk = await WaitUntilXPathExist(this.pageTableLocations,5000, this.xSpinnerCreateLocation);
            if (!resOk) {
                let strPath = g_PathSS + 'screenshot_xSpinnerCreateLocation.png';
                await this.pageTableLocations.screenshot({path: strPath, fullPage: true });
                await console.log(` screenshot= ${strPath}`);
                throw `FAIL => Проверить , что спиннер исчез на форме Создания локации(${this.xSpinnerCreateLocation})`;
            }

            await WaitRender(this.pageTableLocations);

            // * Инпут "Адрес для маршрута в фоксе"
            await WaitForElementIsPresentByXPath(4000, this.pageTableLocations, this.xInputAddressFOX);
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputAddressFOX);
            if (!resOk) {
                await this.page.screenshot({path: g_PathSS + 'screenshot_address_location.png', fullPage: true });
                // await console.log(`FAIL resOk Инпут "Адрес для маршрута в фоксе"`);
                // await TempStop(this.pageTableLocations);
                throw `FAIL => Инпут "Адрес для маршрута в фоксе" ClickByXPath(${this.xInputAddressFOX})`;
            }
            //resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strAddressFOX, 20);
            resOk = await SetTextByXPath(this.pageTableLocations, this.xInputAddressFOX, this.LocationData.strAddressFOX);
            if (!resOk) {
                // await console.log(`FAIL Инпут "Адрес для маршрута в фоксе" TypeInPage`);
                // await TempStop(this.pageTableLocations);
                throw `FAIL => Инпут "Адрес для маршрута в фоксе" TypeInPage`;
            }

            // установим слушатель на Респонс // /api/address
            resOk = await ResponseListener(this.pageTableLocations, `${g_BackCfoFoxURL}/api/address`, true);

            // Дропдаун адресов Гугла // Добавить `[contains(text(), "XXXX")]`
            resOk = await WaitForElementIsPresentByXPath(4000, this.pageTableLocations ,this.xDropDownGoogleAddress);
            if (!resOk) {
                throw `FAIL => Дропдаун адресов Гугла WaitForElementIsPresentByXPath(${this.xDropDownGoogleAddress})`;
            }
            await WaitRender(this.pageTableLocations);
            let tempLength = await ElementGetLength(this.pageTableLocations, this.xDropDownGoogleAddress);
            let tempRand = await randomInt(0 ,tempLength-1);

            resOk = await ClickByXPathNum(this.pageTableLocations, tempRand ,this.xDropDownGoogleAddress);
            if (!resOk) {
                throw `FAIL => Дропдаун адресов Гугла ClickByXPathNum(${tempRand})(${this.xDropDownGoogleAddress})`;
            }
            await WaitRender(this.pageTableLocations);
            // потом , сразу может быть не тот язык, птом Google переводит через ~1 сек
            // resOk = await ElementGetValue(this.pageTableLocations, 0, this.xInputAddressFOX);
            // this.LocationData.strAddressFOXfromGoogle = resOk;
            // Удалим слушатель на Респонс // /api/address
            resOk = await ResponseListener(this.pageTableLocations, `${g_BackCfoFoxURL}/api/address`, false);
            if(g_tempDataFromEventListener_json && g_tempDataFromEventListener_json.data) {
                //await console.dir(pageVehicleCard, { showHidden: true, depth: 3, colors: true }); // depth: null - infinity
                //await console.dir(g_tempDataFromEventListener_json);
                this.LocationData.strAddressFOX = g_tempDataFromEventListener_json.data.short_address;
            }

            // if(!g_ShowActionInBrowser){
            //     await this.browser.close();
            // }
            // await TempStop(this.pageTableLocations, `Тест ------ location_obj.js -------`);
            // await console.log(`strAddressFOXfromGoogle:(${resOk})`);
            // Область Карты []
            // Карта кнопка уменьшить (-)
            resOk = await WaitForElementIsPresentByXPath(7000, this.pageTableLocations, this.xButtonMinus);
            if (!resOk) {
                throw `FAIL => Карта кнопка уменьшить (-) WaitForElementIsPresentByXPath(${this.xButtonMinus})`;
            }

            resOk = await ClickByXPath(this.pageTableLocations, this.xButtonMinus);
            if (!resOk) {
                throw `FAIL => Карта кнопка уменьшить (-) ClickByXPath(${this.xButtonMinus})`;
            }
            await WaitRender(this.pageTableLocations);
            let MapAreaHandles = await this.pageTableLocations.$x(this.xMapArea);
            if (MapAreaHandles.length < 1){
                throw `FAIL => Область Карты (MapAreaHandles.length ${MapAreaHandles.length} < 1) (${this.xMapArea})`;
            }
            const Box = await MapAreaHandles[0].boundingBox();
            let RX = Box.x + Box.width / 20 + await randomInt(0, Box.width * 0.8);
            let RY = Box.y + Box.height / 10 + await randomInt(0, Box.height * 0.85);

            await MouseClickXY(this.pageTableLocations, RX, RY);
            await WaitRender(this.pageTableLocations);
            // resOk = await ClickByXPath(this.pageTableLocations, this.xMapArea);
            // if (!resOk) {
            //     throw `FAIL => Область Карты ClickByXPath(${this.xMapArea})`;
            // }
            // await WaitRender(this.pageTableLocations);
            // Инпут "Юридический адрес (Для ТТН и заявок)"
            this.LocationData.strAddressTTN+= ` `+ this.LocationData.strAddressFOX;
            resOk = await SetTextByXPath(this.pageTableLocations, this.xInputAddressTTN, this.LocationData.strAddressTTN);
            if (!resOk) {
                throw `FAIL => Инпут "Юридический адрес (Для ТТН и заявок)"(${this.xInputAddressTTN})`;
            }

            // strCategory: ['Грузополучатель','Грузоотправитель','Перевозчик']
            // Категория * одна из трёх кнопок // Добавить `[contains(text(), "XXXX")]`
            // this.xButtonXXX
            // let LC = length(this.LocationData.strCategory);
            // for (let i= 0; i<LC; i++ ) {}
            await this.LocationData.strCategory.forEach(async(element) => {
                // await console.log(element);
                resOk = await ClickByXPath(this.pageTableLocations, this.xButtonXXX + `[contains(text(), "${element}")]`);
                if (!resOk) {
                    throw `FAIL => Категория * одна из трёх кнопок(${this.xButtonXXX})`;
                }
            });

            // Инпут "Время на загрузку" // LocationData.strLoadingTime
            await ClickByXPath(this.pageTableLocations, this.xInputLoadTime);
            resOk = await SetTextByXPath(this.pageTableLocations, this.xInputLoadTime, this.LocationData.strLoadingTime);
            if (!resOk) {
                throw `FAIL => Инпут "Время на загрузку"(${this.xInputLoadTime})`;
            }

            // Инпут "Время на выгрузку" // LocationData.strUnLoadingTime
            await ClickByXPath(this.pageTableLocations, this.xInputUnLoadTime);
            resOk = await SetTextByXPath(this.pageTableLocations, this.xInputUnLoadTime, this.LocationData.strUnLoadingTime);
            if (!resOk) {
                throw `FAIL => Инпут "Время на загрузку"(${this.xInputUnLoadTime})`;
            }
            await this.pageTableLocations.waitFor(100);
            // * ДропДаун "Тип локации"
            // Клик, Тайп, Выбор
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputLocationType);
            if (!resOk) {

                throw `FAIL => * ДропДаун "Тип локации" ClickByXPath(${this.xInputLocationType})`;
            }
            await this.pageTableLocations.waitFor(200);
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strLocationType,20);
            if (!resOk) {
                throw `FAIL => * ДропДаун "Тип локации" TypeInPage(${this.xInputLocationType})`;
            }
            await this.pageTableLocations.waitFor(200);

            // Селект в ДропДауне "Тип локации"
            this.xSelectLocationType+= `[contains(text(), "${this.LocationData.strLocationType}")]`;
            resOk = await ClickByXPath(this.pageTableLocations, this.xSelectLocationType);
            if (!resOk) {
                throw `FAIL => Селект в ДропДауне "Тип локации" ClickByXPath(${this.xSelectLocationType})`;
            }

            // * ДропДаун "Вид промышленности"
            // Клик, Тайп, Выбор
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputIndustryType);
            if (!resOk) {
                throw `FAIL => * ДропДаун "Вид промышленности" ClickByXPath(${this.xInputIndustryType})`;
            }
            await this.pageTableLocations.waitFor(200);
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strIndustryType,20);
            if (!resOk) {
                throw `FAIL => * ДропДаун "Вид промышленности" TypeInPage(${this.xInputIndustryType})`;
            }
            await this.pageTableLocations.waitFor(200);

            // Селект в ДропДауне "Вид промышленности"
            this.xSelectIndustryType+= `[contains(text(), "${this.LocationData.strIndustryType}")]`;
            resOk = await ClickByXPath(this.pageTableLocations, this.xSelectIndustryType);
            if (!resOk) {
                throw `FAIL => Селект в ДропДауне "Вид промышленности" ClickByXPath(${this.xSelectIndustryType})`;
            }
            await this.pageTableLocations.waitFor(200);
            // * Инпут ДропДаун "Контакты"
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputContacts);
            if (!resOk) {
                throw `FAIL => * Инпут ДропДаун "Контакты" ClickByXPath(${this.xInputContacts})`;
            }
            await this.pageTableLocations.waitFor(200);
            let ContactFN = this.LocationData.ContactData.strLastName;  //Фамилия
            ContactFN+= ` `+this.LocationData.ContactData.strFirstName; //Имя
            ContactFN+= ` `+this.LocationData.ContactData.strMiddleName;//Отчество

            resOk = await SetTextByXPath(this.pageTableLocations,this.xInputInputContacts, ContactFN); //TypeInPage
            if (!resOk) {
                throw `FAIL => * Инпут ДропДаун "Контакты" SetTextByXPath(${ContactFN})`;
            }
            // Спиннер в * Инпут ДропДаун "Контакты"

            await WaitRender(this.pageTableLocations);
            await WaitForElementIsPresentByXPath(5000, this.pageTableLocations, this.xInputContactsSpinnerDisabled);
            await WaitRender(this.pageTableLocations);

            // * Селект ДропДаун "Контакты" + [contains(text(), "XXX")];
            this.xSelectContacts+= `[contains(text(), "${ContactFN} -")]`;


            await WaitForElementIsPresentByXPath(5000, this.pageTableLocations, this.xSelectContacts);


            resOk = await ClickByXPath(this.pageTableLocations, this.xSelectContacts);
            if (!resOk) {
                await this.page.screenshot({path: g_PathSS + 'screenshot_SelectContacts.png', fullPage: true });
                await console.log(`* Селект ДропДаун "Контакты" ClickByXPath`);

                //await TempStop(this.pageTableLocations);
                throw `FAIL => * Селект ДропДаун "Контакты" ClickByXPath(${this.xSelectContacts})`;
            }

            // Ждём пока закроется ДропДаун
            // ДропДаун "Контакты" закрытый
            resOk = await WaitForElementIsPresentByXPath(2000, this.pageTableLocations, this.xDropDownContactsClosed);


            //Создаём НОВЫЙ Контакт через Локацию
            // Кнопка "Создать контакт"
            // resOk = await ClickByXPath(this.pageTableLocations, this.xButtonCreateContact);
            // if (!resOk) {
            //     throw `FAIL => Кнопка "Создать контакт" ClickByXPath(${this.xButtonCreateContact})`;
            // }
            // await WaitRender(this.pageTableLocations);

            // var {Contact} = require("../sub_objects/contact_obj.js");
            // let NewContact = new Contact(this.browser, this.pageTableLocations , this.LocationData.ContactData);

            // resOk = await NewContact.CreateNewContactFromLocation();
            // if (!resOk){
            //     throw `FAIL => NewContact.CreateNewContactFromLocation`;
            // }
            await WaitRender(this.pageTableLocations);
            // * Инпут "Компании" //LocationData.strCompanyName
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputCompanies);
            if (!resOk) {
                throw `FAIL => Инпут "Компании" ClickByXPath(${this.xInputCompanies})`;
            }
            await this.pageTableLocations.waitFor(200);
            resOk = await SetTextByXPath(this.pageTableLocations, this.xInputInputCompanies, this.LocationData.strCompanyName);
            if (!resOk) {
                throw `FAIL => Инпут "Компании" TypeInPage(${this.xInputCompanies})`;
            }
            await WaitRender(this.pageTableLocations);

            await WaitForElementIsPresentByXPath(5000, this.pageTableLocations, this.xSelectCompanies);
            // Селект в ДропДауне "Компании" ${LocationData.strCompanyName} вводим Name - выдаёт "Name (Code)"
            // this.xSelectCompanies + [contains(text(), "${LocationData.strCompanyName}")] or strCompanyCode
            resOk = await ClickByXPath(this.pageTableLocations, this.xSelectCompanies);
            if (!resOk) {
                await this.page.screenshot({path: g_PathSS + 'screenshot_select_company_type.png', fullPage: true });
                await console.log(`Селект в ДропДауне "Компании" ClickByXPath`);
                //await TempStop(this.pageTableLocations);
                throw `FAIL => Селект в ДропДауне "Компании" ClickByXPath(${this.xSelectCompanies})`;
            }
            await this.pageTableLocations.waitFor(200);
            resOk = await ElementGetValue(this.pageTableLocations, 0, this.xInputAddressFOX);
            this.LocationData.strAddressFOXfromGoogle = resOk;
            // Инпут "Название"
            this.LocationData.strLocationName+= ` ` + this.LocationData.strAddressFOX;
            resOk = await SetTextByXPath(this.pageTableLocations, this.xInputLocationName, this.LocationData.strLocationName );
            if (!resOk) {
                throw `FAIL => Инпут "Название" TypeByXPath(${this.xInputLocationName})`;
            }
            await this.pageTableLocations.waitFor(200);


            // await console.log(`EnterNewDataInLocation`);
            // await TempStop(this.pageTableLocations);


            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in EnterNewDataInLocation`);
            return false;
        }
    }//async EnterNewDataInLocation()
     //----------------------------------------

    async clickSaveLocation(){
        let strWarning = ``;
        try{ let resOk;

            // // Кнопка "Назад к списку локаций"
            //
            // resOk = await ClickByXPath(this.pageTableLocations, this.xBackToListLocations);
            // if (!resOk) {
            //     throw `FAIL => Кнопка "Назад к списку локаций"(${this.xBackToListLocations})`;
            // }

            // Кнопка "Сохранить" Активная
            resOk = await ClickByXPath(this.pageTableLocations, this.xButtonSaveLocationActive);
            if (!resOk) {
                let strPath = g_PathSS + 'screenshot_xButtonSaveLocation.png';

                await this.pageTableLocations.screenshot({path: strPath, fullPage: true });
                await console.log(` screenshot= ${strPath}`);
                await this.pageTableLocations.waitFor(2000);

                throw `FAIL => Кнопка "Сохранить" ClickByXPath(${this.xButtonSaveLocationActive})`;
            }
            // Локация с таким адресом и фактическим адресом существуют!
            strWarning = await WarningsRead(this.pageTableLocations, 2000);
            if( await SubStrIsPresent('Локация с таким адресом и фактическим адресом существуют!', strWarning)){
                await console.log('\x1b[38;5;1m\t', `Warning ( ${strWarning} ) - Warning !!!`, '\x1b[0m');
                // Подбор Точки на карте
                resOk = await this.RetrySelectPointAndSaveLocation();
                if (!resOk) {
                        throw `FAIL => Подбор Точки на карте this.RetrySelectPointAndSaveLocation();`;
                    }
            }else{
                if( await SubStrIsPresent('Локация успешно сохранена!', strWarning)) {
                    await console.log('\x1b[38;5;2m\t', `Сообщение (${strWarning}) - OK !!!`, '\x1b[0m');
                }else{
                    await console.log('\x1b[38;5;1m\t', `WARNING !!! - Неизвестное сообщение (${strWarning}) - WARNING !!!`, '\x1b[0m');
                }
            }
            await console.log('\x1b[38;5;2m\t', `Сохранили Локацию: ${this.LocationData.strAddressFOX} - OK`, '\x1b[0m');
            await console.log('\x1b[38;5;2m\t', `Адрес Google: ${this.LocationData.strAddressFOXfromGoogle} - OK`, '\x1b[0m');
            await WaitRender(this.pageTableLocations);

            await this.pageTableLocations.close();// например, закрыть

            return true;
        }catch (e) {
            await this.pageTableLocations.close();// например, закрыть
            await console.log(`${e} \n FAIL in clickSaveLocation`);
            return false;
        }
    }//async clickSaveLocation()
    //----------------------------------------
    async RetrySelectPointAndSaveLocation(Count = 5){
        try{ let resOk;
            // Область Карты []
            // resOk = await ClickByXPath(this.pageTableLocations, this.xMapArea);
            // if (!resOk) {
            //     throw `FAIL => Область Карты ClickByXPath(${this.xMapArea})`;
            // }
            // Убрать Варнинги
            resOk = await WarningsRemove(this.pageTableLocations);
            if (!resOk){
                await console.log('\x1b[38;5;1m\t', `WARNING !!! - FAIL - WarningsRemove (${resOk}) - WARNING !!!`, '\x1b[0m');
            }
            resOk = await WaitForElementIsPresentByXPath(7000, this.pageTableLocations, this.xButtonMinus);
            if (!resOk) {
                throw `FAIL => Карта кнопка уменьшить (-) WaitForElementIsPresentByXPath(${this.xButtonMinus})`;
            }

            for(let i=0;i<Count;i++) {
                // Карта кнопка уменьшить (-)
                resOk = await ClickByXPath(this.pageTableLocations, this.xButtonMinus);
                if (!resOk) {
                    throw `FAIL => Кнопка уменьшить ClickByXPath(${this.xButtonMinus})`;
                }
                await WaitRender(this.pageTableLocations);
            }// for(let i=0;i<Count;i++)
            let MapAreaHandles = await this.pageTableLocations.$x(this.xMapArea);
            const Box = await MapAreaHandles[0].boundingBox();
            let RX;
            let RY;
            let tempX1 = `//input[@id="js-location-coords"]`;
            let tempStr1;
            let tempStr2;
            tempStr1 = await ElementGetValue(this.pageTableLocations, 0, tempX1);
            tempStr2 = await ElementGetValue(this.pageTableLocations, 0, tempX1);
            while (tempStr1 === tempStr2) {

                RX = Box.x + Box.width / 20 + await randomInt(0, Box.width * 0.8);
                RY = Box.y + Box.height / 10 + await randomInt(0, Box.height * 0.85);

                // await this.pageTableLocations.mouse.click(RX, RY);
                await MouseClickXY(this.pageTableLocations, RX, RY);
                await WaitRender(this.pageTableLocations);
                tempStr2 = await ElementGetValue(this.pageTableLocations, 0, tempX1);
                // await console.log(`tempStr1=(${tempStr1})`);
                // await console.log(`tempStr2=(${tempStr2})`);
            }
            await WarningsRemove(this.pageTableLocations);

            resOk = await ClickByXPath(this.pageTableLocations, this.xButtonSaveLocationActive);
            let strWarning = await WarningsRead(this.pageTableLocations, 2000);
            if( await SubStrIsPresent('Локация успешно сохранена!', strWarning)) {
                await console.log('\x1b[38;5;2m\t', `Сообщение (${strWarning}) - OK !`, '\x1b[0m');
            }else{
                throw `FAIL => Warning (${strWarning})`;
            }

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in RetrySelectPointAndSaveLocation`);
            return false;
        }
    }//async RetrySelectPointAndSaveLocation()
    //----------------------------------------
    async clickCloseLocationTable(){
        try{ let resOk;
            // Закрыть Таблицу Локации
            resOk = await ClickByXPath(this.page, this.xCloseTable);
            if (!resOk) {
                throw `FAIL => Клик Закрываем Модалку Таблицы Локации(${this.xCloseTable})`;
            }

            await WaitRender(this.page);

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in clickCloseLocationTable`);
            return false;
        }
    }//async clickCloseLocationTable()
    //----------------------------------------
    async TemplateTemp(){
        try{ let resOk;

            return true;
        }catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp`);
            return false;
        }
    }//async TemplateTemp()
    //----------------------------------------


}// class Location
//=========================================================
module.exports = {Location};
