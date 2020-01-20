let VehicleCreateNewV2 = async (browser, page, VehicleData) => {
    const nameTest = NameFunction()+'->"' + VehicleData.strLicensePlate + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
    g_StrOutLog += `Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1200;
    let height = 900;
    let widthX = 1200;
    let heightX = 1800;
    let xPath;
    let ElPresent, ElPresent1, ElPresent2, ElPresent3;
    let resOk;
    let MyFilePath = '';
    VehicleData['returnResult'] = false;
    await page.setViewport({width, height});

    //await page.setViewport({width2, height2});
    try {
        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);

        //Клик по пункту Транспорт
        resOk = await ClickByXPath(page, '//a[@href="/vehicle"][contains(text(), "Транспорт")]');
        if (!resOk) {
            throw 'ClickByXPath(//a[@href="/vehicle"][contains(text(), "Транспорт")])';//<--специальный вызов ошибки!
        }

        //Ждём загрузки страницы
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("Создать транспорт")';//<--специальный вызов ошибки!
        }

        //Проверяем наличие на странице Характерных элементов (Транспортные стредства)
        resOk = await WaitUntilElementIsPresentByXPath(1000, page,'//div[@class="head__title"][contains(text(), "Транспортные стредства")]');
        if (!resOk) {
            throw 'Not ElementIsPresent(class="head__title""Транспортные стредства")';//<--специальный вызов ошибки!
        }

        //Клик по кнопке Создать
        resOk = await ClickByXPath(page, '//span[contains(text(), "Создать")]');
        if (!resOk) {
            throw 'ClickByXPath(//span[contains(text(), "Создать")])';//<--специальный вызов ошибки!
        }
        let NumTryDropZone = 0;
        do { // DROP_ZONE_PHANTOM_BAG
            NumTryDropZone++;
            resOk = await WaitUntilPageLoads(page);
            if (!resOk) {
                throw 'WaitUntilPageLoads("Создать транспорт")';//<--специальный вызов ошибки!
            }
            //Проверяем наличие на странице Характерных элементов (Создать транспорт)
            resOk = await ElementIsPresent(page, '//div[@class="head__title"][contains(text(), "Создать транспорт")]');
            if (!resOk) {
                throw 'Not ElementIsPresent(class="head__title""Создать транспорт")';//<--специальный вызов ошибки!
            }
//---------------

            //Клик по инпуту Номерной знак
            let xpLicensePlate = '//input[@id="license_plate"]';
            resOk = await ClickByXPath(page, xpLicensePlate);
            if (!resOk) {
                throw `ClickByXPath(${xpLicensePlate})`;//<--специальный вызов ошибки!
            }
            //Вводим Номерной знак
            resOk = await TypeByXPath(page, xpLicensePlate, VehicleData.strLicensePlate);
            if (!resOk) {
                throw `TypeByXPath(${xpLicensePlate})`;//<--специальный вызов ошибки!
            }
            await page.waitFor(500);
            //Клик по кнопке Проверить в базе
            let xpButtonCheckInBase = '//button[@class="btn"][./span[contains(text(), "Проверить в базе")]]';
            resOk = await ClickByXPath(page, xpButtonCheckInBase);
            if (!resOk) {
                throw `ClickByXPath(${xpButtonCheckInBase})`;//<--специальный вызов ошибки!
            }
            // Ждём загрузки страницы
            resOk = await WaitUntilPageLoads(page);
            if (!resOk) {
                throw 'WaitUntilPageLoads("(Создать транспорт)(Проверить в базе)")';//<--специальный вызов ошибки!
            }

            // Ждём появление ДропЗоны
            //resOk = await WaitUntilElementIsPresentByXPath(2000, page, '//div[@id="dropzone"]');
            resOk = await WaitUntilElementIsPresentByXPath(12000, page, '//span[@class="tab__title"][contains(text(), "Тех. Паспорт")]');
            if (!resOk) {
                //await page.waitFor(9990000);
                //throw `ElementNotPresent(DropZone)('//span[@class="tab__title"][contains(text(), "Тех. Паспорт")]'])`;//<--специальный вызов ошибки!
                await console.log(`ElementNotPresent(DropZone) попытка ${NumTryDropZone}` );
                g_StrOutLog+=`=> ElementNotPresent(DropZone) попытка ${NumTryDropZone} \n`;
                if (NumTryDropZone < 2){
                    await page.reload(); //<--------ПЕРЕЗАГРУЗКА страницы
                }else {
                    throw `ElementNotPresent(DropZone)('//span[@class="tab__title"][contains(text(), "Тех. Паспорт")]'])`;//<--специальный вызов ошибки!
                }
            }
        }while (!resOk && (NumTryDropZone < 2) ); //повторяет пока истина не станет ложью &&<-AND ; ||<-OR
        //Проверяем наличие характерных элементов (Марка автомобиля )
        resOk = await ElementIsPresent(page,'//label[@class="search__label"][contains(text(), "Марка автомобиля ")]');
        if (!resOk) {
            throw 'ElementNotPresent(class="search__label""Марка автомобиля ")';//<--специальный вызов ошибки!
        }

        //await page.waitFor(1111113000);
        //Клик по инпуту Марка автомобиля
        let xpCarBrand = '//div[@data-vv-name="car_brand"]/div/input';
        resOk = await ClickByXPath(page, xpCarBrand);
        if (!resOk) {
            throw `ClickByXPath(${xpCarBrand})`;//<--специальный вызов ошибки!
        }
        //Вводим Марка автомобиля
        resOk = await TypeByXPath(page, xpCarBrand, VehicleData.strCarBrand);
        if (!resOk) {
            throw `TypeByXPath(${xpLicensePlate})`;//<--специальный вызов ошибки!
        }
        //Ждём пока найдёт марку автомобиля
        resOk = await WaitUntilPageLoads(page);
        if (!resOk) {
            throw 'WaitUntilPageLoads("(Find)(Марка автомобиля)")';//<--специальный вызов ошибки!
        }
        //Проверим выпадающий список
        let xpItemCarBrand = '//div[@class="search__item"][1]';// <--- Тут Нумерация с 1 !!!

        let strFirstItemList = await ElementGetInnerText(page , 0, xpItemCarBrand); // <--- Num Нумерация с 0 !!!
        //await console.log('strFirstItemList=(', strFirstItemList ,')');
        if ( !strFirstItemList.includes(VehicleData.strCarBrand) ){
            throw `Марка Автомобиля ввели: "${VehicleData.strCarBrand}" , нашли: "${strFirstItemList}" `;
        }

        //Выбираем из списка

        resOk = await ClickByXPath(page, xpItemCarBrand);
        if (!resOk) {
            throw `ClickByXPath(${xpItemCarBrand})`;//<--специальный вызов ошибки!
        }
        // Вставляем Фото тех пас

        /*
        MyFilePath = await SaveTempPictureFromRandomURL(browser, 'DriverDocURL');
        if (MyFilePath !== '') {
            let xpDriverLicensePhoto = '//div[@class="zone"][./div[contains(text(), "Тех. Паспорт")]]/div[@id="dropzone"]';
            //await ClickByXPath(page, xpDriverLicensePhoto);
            await page.waitFor(500);
            let [fileChooserDPhoto] = await Promise.all([
                //ClickByXPath(page, xpDriverLicensePhoto),
                //page.waitFor(500),
                page.waitForFileChooser(),
                //page.waitFor(500),
                ClickByXPath(page, xpDriverLicensePhoto)
                //page.waitFor(500),
            ]);
            await fileChooserDPhoto.accept([MyFilePath]);
            await page.waitFor(3000);
            //await DeleteTempPicture(MyFilePath);
            //await fileChooser.cancel();
            //await page.waitFor(1111500);
        }

        */
        let xpDriverLicensePhoto = '//div[@class="zone"][./div[contains(text(), "Тех. Паспорт")]]/div[@id="dropzone"]';
        let PhotoURL = await InsertPhoto(browser, page , 'DriverDocURL', xpDriverLicensePhoto);



        //Клик по селекту инпуту
        let xpSelectType = '//div[@class="multiselect__tags"][./input[@name="car_type"]]';
        resOk = await ClickByXPath(page, xpSelectType);
        if (!resOk) {
            throw `ClickByXPath(${xpSelectType})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(600);
        //Выбираем Тягач

        // VehicleData.strCarType
        let xpItemType = '//div[./div[@class="multiselect__tags"][./input[@name="car_type"]]]';
        xpItemType = xpItemType + '/div[@class="multiselect__content-wrapper"]/ul/li/span/span[contains(text(), ';
        xpItemType = xpItemType + `"${VehicleData.strCarType}")]`;
            resOk = await ClickByXPath(page, xpItemType);
        if (!resOk) {
            throw `ClickByXPath(${VehicleData.strCarType})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(1000);
        //Клик по инпуту КОМПАНИЯ
        let xpCompanies = '//div[@class="multiselect__tags"][./input[@name="companies"]]';
        resOk = await ClickByXPath(page, xpCompanies);
        if (!resOk) {
            throw `ClickByXPath(${xpCompanies})`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        // 'ТРАНСЛОЙД'
        resOk = await TypeByXPath(page, xpCompanies, VehicleData.strCompanyName);
        if (!resOk) {
            throw `TypeByXPath(${xpCompanies})`;//<--специальный вызов ошибки!
        }
        resOk = await WaitUntilPageLoads(page);
        //await page.waitFor(1111500);
        if (!resOk) {
            throw `WaitUntilPageLoads("поиск ${VehicleData.strCompanyName}")`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);

        let xpItemTransloyd = '//div[@data-vv-as="Компания"]/div[@class="multiselect__content-wrapper"]/ul/li[@class="multiselect__element"][2]';
        resOk = await ClickByXPath(page, xpItemTransloyd);
        if (!resOk) {
            throw `ClickByXPath(ТОВ ТРАНСЛОЙД)`;//<--специальный вызов ошибки!
        }

        //Жмём на кнопку Создать
        let xpButtonCreateContact = '//button[@class="btn"][./span[contains(text(), "Создать")]]';
        resOk = await ClickByXPathWithScroll(2000 ,page, xpButtonCreateContact);
        if (!resOk) {
            throw 'ClickByXPath([....] "Создать контакт")';//<--специальный вызов ошибки!
        }
        // Проверяем есть ли валидируемые незаполненные поля
        xPath = '//span[@class="element__error"]';
        resOk = await WaitUntilElementIsPresentByXPath(500,page,xPath);
        if (resOk) {
            let linkHandlers = await page.$x(xPath);
            await console.log('\x1b[38;5;2m', "     Вижу валидируемые незаполненные поля" ,linkHandlers.length,"шт" , '\x1b[0m');
            if (linkHandlers.length < 3){
                throw `Валидируемых незаполненных полей ${linkHandlers.length} < 3 `;//<--специальный вызов ошибки!
            }
        }
        resOk = await WaitUntilPageLoads(page);
        //await page.waitFor(1111500);
        if (!resOk) {
            throw 'WaitUntilPageLoads("СОХРАНИТЬ КОНТАКТ Водитель")';//<--специальный вызов ошибки!
        }
        //Ждём Успешно сохранено
        resOk = await WaitUntilElementIsPresentByXPath(2000,page,'//div[@class="noty_body"][contains(text(), "Успешно сохранено")]');
        if (!resOk) {
            await console.log('\x1b[38;5;2m', "     Не вижу (Успешно сохранено)" , '\x1b[0m');
            throw `Отсутствует (Успешно сохранено)`;//<--специальный вызов ошибки!
        }

        resOk = await WaitUntilPageLoads(page);
        /*if (!resOk) {
            throw 'WaitUntilPageLoads("Редактировать КОНТАКТ Водитель")';//<--специальный вызов ошибки!
        }*/
        let Href = await ElementGetHref(page,0, '//div[@class="dz-image"]/a');
        //await console.log('PhotoURL(',Href,')');

        VehicleData['strHrefPhotoURL'] = Href;
        if (!resOk) {
            VehicleData['strFuck'] = Href;
        }
        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        VehicleData.returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице (Создать транспорт) : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${err} => ${g_StatusCurrentTest} \n`;
        VehicleData.returnResult = false;
        //await page.waitFor(5001111);
    }


    await page.setViewport({width, height});
    return VehicleData;//<------------------EXIT !!!

};

module.exports.VehicleCreateNewV2 = VehicleCreateNewV2;