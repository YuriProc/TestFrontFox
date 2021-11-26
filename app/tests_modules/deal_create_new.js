let DealCreateNew = async (browser, page, DealData) => {
    let tempAdr = await GetDealMarshrut(DealData);
    const nameTest = NameFunction()+'->"' + tempAdr + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
    g_StrOutLog += `Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);

    let xPath;
    let ElPresent, ElPresent1, ElPresent2, ElPresent3;
    let resOk;
    let MyFilePath = '';
    let returnResult = false;
    try {
        await page.setViewport({width: g_width, height: g_height});
        var {Deal} = require("../tests_modules/sub_objects/deal_obj.js");

        let NewDeal = new Deal(browser, page, DealData);

        // Открытие Формы Создания НОВОЙ сделки
        resOk = await NewDeal.ClickDealPlus();
        if (!resOk) {
            throw `FAIL => Открытие Формы Создания НОВОЙ сделки NewDeal.ClickDealPlus();`;
        }
        // Проверка Формы создания НОВОЙ сделки
        resOk = await NewDeal.CheckFormNewDeal();
        if (!resOk) {
            throw `FAIL => Проверка Формы создания НОВОЙ сделки NewDeal.CheckFormNewDeal();`;
        }

        // Вводим "Компания заказчика *"
        resOk = await NewDeal.EnterClientCompany();
        if (!resOk) {
            throw `FAIL => Вводим "Компания заказчика *"  NewDeal.EnterClientCompany();`;
        }
        // Вводим "Кросс Док"
        resOk = await NewDeal.EnterCrossDoc();
        if (!resOk) {
            DealData.isCrossDoc = false;
            await console.log('\x1b[38;5;1m\t', `Значение "Кросс Док" в данных для тестов установлено в (${DealData.isCrossDoc}) - !!!`, '\x1b[0m');
            // throw `FAIL => Вводим "Кросс Док"  NewDeal.EnterCrossDoc();`;
        }
        // Вводим "Тип Груза"
        resOk = await NewDeal.EnterCargoTypeData();
        if (!resOk) {
            throw `FAIL => Вводим "Тип Груза" NewDeal.EnterCargoTypeData();`;
        }
        // Вводим "Мониторинг (МЦ)"
        resOk = await NewDeal.EnterLevelMonitoringMC();
        if (!resOk) {
            throw `FAIL => Вводим "Мониторинг (МЦ)"  NewDeal.EnterLevelMonitoringMC();`;
        }
        // Добавляем ВСЕ фрахты Заказчика
        resOk = await NewDeal.AddAllClientOrTransporterFreights(1); //1 or 2
        if (!resOk) {
            throw `FAIL => Добавляем ВСЕ фрахты Заказчика NewDeal.AddAllClientOrTransporterFreights();`;
        }
        // Вводим Дополнительные поля
        resOk = await NewDeal.EnterAdditionalFields();
        if (!resOk) {
            throw `FAIL => Вводим Дополнительные поля NewDeal.EnterAdditionalFields();`;
        }

        //await TempStop(page);
        // Вводим "Компания перевозчика *"
        resOk = await NewDeal.EnterTransporterCompany();
        if (!resOk) {
            throw `FAIL => Вводим "Компания перевозчика *"  NewDeal.EnterTransporterCompany();`;
        }

        // Вводим "ФИО водителя *"
        resOk = await NewDeal.EnterDriver();
        if (!resOk) {
            throw `FAIL => Вводим "ФИО водителя *"  NewDeal.EnterDriver();`;
        }

        // Вводим "Автомобиль *"
        resOk = await NewDeal.EnterVehicle();
        if (!resOk) {
            throw `FAIL => Вводим "Автомобиль *"  NewDeal.EnterVehicle();`;
        }

        // Вводим "Прицеп"
        resOk = await NewDeal.EnterTrailer();
        if (!resOk) {
            throw `FAIL => Вводим "Прицеп"  NewDeal.EnterTrailer();`;
        }
        // Добавляем ВСЕ фрахты Перевозчика
        resOk = await NewDeal.AddAllClientOrTransporterFreights(2); //1 or 2
        if (!resOk) {
            throw `FAIL => Добавляем ВСЕ фрахты Перевозчика NewDeal.AddAllClientOrTransporterFreights();`;
        }

        // Вводим все Адреса
        resOk = await NewDeal.EnterAllAddresses();
        if (!resOk) {
            throw `FAIL => Вводим все Адреса NewDeal.EnterAllAddresses();`;
        }
        // Вводим Комментарии
        resOk = await NewDeal.EnterComments();
        if (!resOk) {
            throw `FAIL => Вводим Комментарии NewDeal.EnterComments();`;
        }
        // Вводим Ответственного и Логиста
        resOk = await NewDeal.EnterResponsibleAndLogist();
        if (!resOk) {
            throw `FAIL => Вводим Ответственного и Логиста NewDeal.EnterResponsibleAndLogist();`;
        }
        // await TempStop(page);
        // Сохраняем Сделку и ждём отрисовки таблицы сделок
        resOk = await NewDeal.SaveDealAndWaitTableDeals();
        if (!resOk) {
            throw `FAIL => Сохраняем Сделку и ждём отрисовки таблицы сделок NewDeal.SaveDealAndWaitTableDeals();`;
        }


        // await console.log(`Временно Стоп DealCreateNew`);
        // await TempStop(page);

    //await page.setViewport({width2, height2});

        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        DealData.returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице (Создать Сделку) : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await page.screenshot({path: g_PathSS + `screenshot_DealCreateNew.png`, fullPage: true });
        await console.log(g_PathSS + `screenshot_DealCreateNew.png`);
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${err} => ${g_StatusCurrentTest} \n`;

        DealData.returnResult = false;
        //await page.waitFor(5001111);
    }
   // await page.setViewport({width, height});
    return DealData;//<------------------EXIT !!!

};
//Local functions
//--------------------------------------------------------------------------------------------
let TempLocalFunction;
TempLocalFunction = async function(page, NumFreight, DealData){
    let resOk;

    try {


        return true;
    }catch (e) {
        await console.log(`${e} in TempLocalFunction()`);
        return false;
    }
};// TempLocalFunction = async function(page, NumFreight, DealData){
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//END Local functions
module.exports.DealCreateNew = DealCreateNew;
