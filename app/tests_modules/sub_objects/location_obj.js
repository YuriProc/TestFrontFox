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
        // Кнопка "+ Добавить Локации"
        this.xButtonPlusLocations = `//div[@class="tab-pane active"]/div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xButtonPlusLocations+= `/button[@type="button"][contains(text(), "Добавить Локации")]`;
        // Кнопка "Перейти в таблицу локаций"
        this.xButtonGoToTableLocations = `//div[@class="tab-pane active"]/div[@class="data-table-manager__tab-footer d-flex"]`;
        this.xButtonGoToTableLocations+= `/div[@class="d-flex"]/a[@href="/crm/locations"][contains(text(), "Перейти в таблицу локаций")]`;
        // Верхнее меню Кнопка "Еще..."
        this.xMenuButtonMore = `//button[@aria-controls="menu"][@type="button"][contains(text(), "Еще...")]`;
        // Верхнее меню "Локации +"
        this.xMenuLocationsPlus = `//a[@href="/crm/location"][@class="info__add"]`;

        // Кнопка "Назад к списку локаций"
        this.xBackToListLocations = `//a[@href="/crm/locations"][@class="crm-view__back-to-page"][contains(text(), "Назад к списку локаций")]`;
        // Заголовок "Создание локации"
        this.xHeaderCreateLocation = `//h3[@class="crm-view__title"][contains(text(), "Создание локации")]`;
        // * Инпут "Адрес для маршрута в фоксе"
        this.xInputAddressFOX = `//div[@class="crm-location-manage__card"]/fieldset[legend[contains(text(), "Адрес для маршрута в фоксе")]]`;
        this.xInputAddressFOX+= `//input[@placeholder="Введіть місцезнаходження"]`;
        // Дропдаун адресов Гугла // Добавить `[contains(text(), "XXXX")]`
        this.xDropDownGoogleAddress = `//div[@class="pac-container pac-logo"]/div[@class="pac-item"]/span[@class="pac-item-query"]/span[@class="pac-matched"]`;
        // Инпут "Фактическое местоположение по гуглу"
        this.xInputAddressFact = `//div[@class="crm-location-manage__card"]/fieldset[legend[contains(text(), "Фактическое местоположение по гуглу")]]`;
        this.xInputAddressFact+= `//input[@placeholder="Нажмите на карту для заполнения местоположения"]`;
        // Область Карты []
        this.xMapArea = `//div[@id="js-location-select-map"][@class="crm-location-manage__map"]`;
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
        // * Инпут "Контакты"
        this.xInputContacts = ``;
        // Кнопка "Создать контакт"
        this.xButtonCreateContact = ``;
        // * Инпут "Компании"
        this.xInputCompanies = ``;
        // Инпут "Название"
        this.xInputLocationName = ``;
        // Кнопка "Сохранить"
        this.xButtonSaveLocation = ``;







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
            await console.log(`FAIL in clickLocation ${e} \n`);
            return false;
        }
    }//async clickLocation()
    //----------------------------------------
    async clickGoToTableLocations(){
        try{ let resOk;


            //this.pageTableLocations = ''; // новая страница таблицы Локаций
            //await page.waitForSelector('#goto');            // ожидаем загрузку объекта
            //const link = await this.page.$x(this.xButtonGoToTableLocations);             // объявляем объект

            const newPagePromise = new Promise(x => this.browser.once('targetcreated', target => x(target.page())));    // объявляем промис

            // Кнопка "Перейти в таблицу локаций" // кликаем, открывается новая СТРАНИЦА
            resOk = await ClickByXPath(this.page, this.xButtonGoToTableLocations);
            if (!resOk) {
                throw `FAIL => Кнопка "Перейти в таблицу локаций"(${this.xButtonGoToTableLocations})`;
            }

            this.pageTableLocations = await newPagePromise;           // объявляем новую СТРАНИЦУ/окно, теперь с ней можно работать

            let width = 1700;
            let height = 950;
            await this.pageTableLocations.setViewport({width, height});

            await WaitRender(this.pageTableLocations);

            return true;
        }catch (e) {
            await console.log(`FAIL in clickGoToTableLocations ${e} \n`);
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
            resOk = await ClickByXPath(this.pageTableLocations, this.xMenuLocationsPlus);
            if (!resOk) {
                // await console.log(`FAIL resOk in Верхнее меню "Локации +"`);
                // await TempStop(this.pageTableLocations);
                throw `FAIL => Кнопка Верхнее меню "Локации +"(${this.xMenuLocationsPlus})`;
            }

            await WaitRender(this.pageTableLocations);

            return true;
        }catch (e) {
            await console.log(`FAIL in clickMenuLocationsPlus ${e} \n`);
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
            // * Инпут "Адрес для маршрута в фоксе"
            resOk = await ClickByXPath(this.pageTableLocations, this.xInputAddressFOX);
            if (!resOk) {
                // await console.log(`FAIL resOk Инпут "Адрес для маршрута в фоксе"`);
                // await TempStop(this.pageTableLocations);
                throw `FAIL => Инпут "Адрес для маршрута в фоксе"(${this.xInputAddressFOX})`;
            }
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strAddressFOX, 20);
            if (!resOk) {
                // await console.log(`FAIL Инпут "Адрес для маршрута в фоксе" TypeInPage`);
                // await TempStop(this.pageTableLocations);
                throw `FAIL => Инпут "Адрес для маршрута в фоксе" TypeInPage`;
            }
            await WaitRender(this.pageTableLocations);
            // Дропдаун адресов Гугла // Добавить `[contains(text(), "XXXX")]`
            resOk = await ClickByXPathNum(this.pageTableLocations, 0 ,this.xDropDownGoogleAddress);
            if (!resOk) {
                throw `FAIL => Дропдаун адресов Гугла(${this.xDropDownGoogleAddress})`;
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
                await console.log(element);

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
            await this.page.waitFor(200);
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strLocationType,20);
            if (!resOk) {
                throw `FAIL => * ДропДаун "Тип локации" TypeInPage(${this.xInputLocationType})`;
            }
            await this.page.waitFor(200);

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
            await this.page.waitFor(200);
            resOk = await TypeInPage(this.pageTableLocations, this.LocationData.strIndustryType,20);
            if (!resOk) {
                throw `FAIL => * ДропДаун "Вид промышленности" TypeInPage(${this.xInputIndustryType})`;
            }
            await this.page.waitFor(200);

            // Селект в ДропДауне "Вид промышленности"
            this.xSelectIndustryType+= `[contains(text(), "${this.LocationData.strIndustryType}")]`;
            resOk = await ClickByXPath(this.pageTableLocations, this.xSelectIndustryType);
            if (!resOk) {
                throw `FAIL => Селект в ДропДауне "Вид промышленности" ClickByXPath(${this.xSelectIndustryType})`;
            }



            await console.log(`EnterNewDataInLocation`);
            await TempStop(this.pageTableLocations);


            return true;
        }catch (e) {
            await console.log(`FAIL in EnterNewDataInLocation ${e} \n`);
            return false;
        }
    }//async EnterNewDataInLocation()
     //----------------------------------------

    async clickSaveLocation(){
        try{ let resOk;

            // Кнопка "Назад к списку локаций"

            resOk = await ClickByXPath(this.pageTableLocations, this.xBackToListLocations);
            if (!resOk) {
                throw `FAIL => Кнопка "Назад к списку локаций"(${this.xBackToListLocations})`;
            }

            await WaitRender(this.pageTableLocations);


            await this.pageTableLocations.close();// например, закрыть

            return true;
        }catch (e) {
            await console.log(`FAIL in clickSaveLocation ${e} \n`);
            return false;
        }
    }//async clickSaveLocation()
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
            await console.log(`FAIL in clickCloseLocationTable ${e} \n`);
            return false;
        }
    }//async clickCloseLocationTable()
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


}// class Location
//=========================================================
module.exports = {Location};
