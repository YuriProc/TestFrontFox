let DealCheckNewInTable = async (browser, page, DealData) => {
    let tempAdr = await GetDealMarshrut(DealData);
    const nameTest = NameFunction()+'->"'+'ID:'+DealData.strDealID +
                                    '=>' + tempAdr +'"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
    g_StrOutLog += `Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    let xPath;
    let ElPresent, ElPresent1, ElPresent2, ElPresent3;
    let resOk;
    let MyFilePath = '';
    let returnResult = false;
    let enableError = false;
    try {
        await page.setViewport({width: g_width, height: g_height});
// Открыть НовоСозданную сделку и проверить ВСЕ ранее введённые поля
        const {DealTable} = require("../tests_modules/sub_objects/deal_table_obj.js");
        //Клик по пункту меню Сделки

        let NewDealTable = new DealTable(browser, page, DealData);
        //Клик по пункту меню Сделки
        resOk = await NewDealTable.ClickMenuDeals();
        if (!resOk) {
            throw `FAIL => Клик по пункту меню Сделки NewDealTable.ClickMenuDeals();`;
        }

        // Ждём пока таблица сделок будет готова
        resOk = await NewDealTable.TableDealsReady();
        if (!resOk) {
            throw `FAIL => Ждём пока таблица сделок будет готова NewDealTable.TableDealsReady();`;
        }
        // Добавить поле
        resOk = await NewDealTable.DealTableFilterByField(`ID`, DealData.strDealID);
        if (!resOk) {
            throw `FAIL => Добавить поле NewDealTable.DealTableFilterByField(ID, ${DealData.strDealID});`;
        }
        // Проверить текущую сделку в таблице сделок
        resOk = await NewDealTable.TableDealCheckOneCurrentDeal(); // после фильтра по ID должна быть ТОЛЬКО ОДНА строка
        // if (!resOk) {
        //     throw `FAIL => Проверить текущую сделку в таблице сделок NewDealTable.TableDealCheckOneCurrentDeal();`;
        // }


        // resOk = await NewDealTable.Temp(tempLenF); // temp
        // if (!resOk) {
        //     throw `FAIL => NewDealTable.Temp();`;
        // }


        // if (!GetTempStr.includes(DealData.strLogistician)) {
        //     enableError = true;
        //     g_StrOutLog+=`     FAIL => ("ЛОГІСТ")["${DealData.strLogistician}" Не найдено в =>"${GetTempStr}"]\n`;
        //     //throw `     FAIL => ("ЛОГІСТ")["${DealData.strLogistician}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
        // }
        // //await TempStop(page);
        // if (enableError){
        //     throw `При проверке Ранее Созданной Сделки Были Несоответствия Данных`;
        // }
        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        DealData.returnResult = true;

    } catch (e) {
        let SErr = `!!!! Ошибка на странице (${e}) `;
        await ScreenLog(page, SErr, 1);
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${e} => ${g_StatusCurrentTest} \n`;
        DealData.returnResult = false;
        //await page.waitFor(5001111);
    }
    return DealData;//<------------------EXIT !!!

};//==============================================================================
let NewDealSetStatusInTable = async (browser, page, DealData) => {
    let tempAdr = await GetDealMarshrut(DealData);
    const nameTest = NameFunction()+'->"'+'ID:'+DealData.strDealID +
        '=>' + tempAdr +'"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
    g_StrOutLog += `Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    let xPath;
    let ElPresent, ElPresent1, ElPresent2, ElPresent3;
    let resOk;
    let MyFilePath = '';
    let returnResult = false;
    let enableError = false;
    try {
        await page.setViewport({width: g_width, height: g_height});
        // Сделка отфильтрована в предыдущем тесте

        const {DealTable} = require("../tests_modules/sub_objects/deal_table_obj.js");
        //Клик по пункту меню Сделки

        let NewDealTable = new DealTable(browser, page, DealData);
        //Клик по пункту меню Сделки
        resOk = await NewDealTable.ClickMenuDeals();
        if (!resOk) {
            throw `FAIL => Клик по пункту меню Сделки NewDealTable.ClickMenuDeals();`;
        }

        // Ждём пока таблица сделок будет готова
        resOk = await NewDealTable.TableDealsReady();
        if (!resOk) {
            throw `FAIL => Ждём пока таблица сделок будет готова NewDealTable.TableDealsReady();`;
        }
        // Добавить поле
        resOk = await NewDealTable.DealTableFilterByField(`ID`, DealData.strDealID);
        if (!resOk) {
            throw `FAIL => Добавить поле NewDealTable.DealTableFilterByField(ID, ${DealData.strDealID});`;
        }
        // Проверить текущую сделку в таблице сделок
        resOk = await NewDealTable.ClickTwoStatus(DealData.strDealID); // после фильтра по ID должна быть ТОЛЬКО ОДНА строка
        // if (!resOk) {
        //     throw `FAIL => Проверить текущую сделку в таблице сделок NewDealTable.TableDealCheckOneCurrentDeal();`;
        // }


        // resOk = await NewDealTable.Temp(tempLenF); // temp
        // if (!resOk) {
        //     throw `FAIL => NewDealTable.Temp();`;
        // }


        // if (!GetTempStr.includes(DealData.strLogistician)) {
        //     enableError = true;
        //     g_StrOutLog+=`     FAIL => ("ЛОГІСТ")["${DealData.strLogistician}" Не найдено в =>"${GetTempStr}"]\n`;
        //     //throw `     FAIL => ("ЛОГІСТ")["${DealData.strLogistician}" Не найдено в =>"${GetTempStr}"]`;//<--специальный вызов ошибки!
        // }
        // //await TempStop(page);
        // if (enableError){
        //     throw `При проверке Ранее Созданной Сделки Были Несоответствия Данных`;
        // }
        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        DealData.returnResult = true;

    } catch (e) {
        let SErr = `!!!! Ошибка на странице (${e}) `;
        await ScreenLog(page, SErr, 1);
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${e} => ${g_StatusCurrentTest} \n`;
        DealData.returnResult = false;
        //await page.waitFor(5001111);
    }
    return DealData;//<------------------EXIT !!!

};

module.exports.DealCheckNewInTable = DealCheckNewInTable;
module.exports.NewDealSetStatusInTable = NewDealSetStatusInTable;
