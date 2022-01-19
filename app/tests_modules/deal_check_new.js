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
let NewDealSetStatusInTable = async (browser, page, DealData, LoginData) => {
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
    let resultRecord = {
        resOk: false,
        message: ``,
    };
    let MyFilePath = '';
    let returnResult = false;
    let enableError = true;
    let NumTry = 0;
    let NumErrorNoTimeFirstCall = 0;
    let NumErrorTimeFirstCallIsBusy = 0;
    let NumErrorNoFileTransporter = 0;
    let NumErrorNoEmailTransporter = 0;
    let NumErrorTimeFirstCallCannotBeInThePast = 0;
    let NumNeedCheckDriverDocs = 0;


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
        // Попытка перевести сделку во второй статус


        while (enableError) { // -------------------------------------
            resOk = await NewDealTable.ClickTwoStatus(DealData.strDealID, NumTry, resultRecord); // после фильтра по ID должна быть ТОЛЬКО ОДНА строка
            if (!resOk) {
                throw `FAIL => Попытка перевести сделку во второй статус NewDealTable.ClickTwoStatus(${DealData.strDealID}, resultRecord);`;
            }
            NumTry++;

            // await console.log(`resultRecord.resOk=${resultRecord.resOk}`);
            if(resultRecord.message === `Статус сделки успешно изменен!`){
                await console.log('\x1b[38;5;2m\t', `Перевод сделки во второй статус=${resultRecord.message}`, '\x1b[0m');
            }else {
                await console.log('\x1b[38;5;3m\t', `Перевод сделки во второй статус=${resultRecord.message}`, '\x1b[0m');
            }

            let {Deal} = require("../tests_modules/sub_objects/deal_obj.js");
            let NewDeal = new Deal(browser, page, DealData);

            switch (resultRecord.message) { // текст с Бека. На фронте  "Ошибка обновления статуса сделки! " + Бек
                case "Не указано время первого звонка":
                    NumErrorNoTimeFirstCall++;
                    if(NumErrorNoTimeFirstCall > 1){
                        await console.log('\x1b[38;5;1m\t', `WARNING !!! Количество таких ошибок (${NumErrorNoTimeFirstCall}) -> Перевод сделки во второй статус=${resultRecord.message}`, '\x1b[0m')
                    }
                    if(NumErrorNoTimeFirstCall > 3){
                        throw `FAIL !!! Количество таких ошибок (${NumErrorNoTimeFirstCall}) -> Перевод сделки во второй статус=${resultRecord.message}`;
                    }
                    // Открыть сделку и выбрать время первого звонка Водителю
                    resOk = await NewDealTable.ClickDealID(DealData.strDealID, resultRecord); // после фильтра по ID должна быть ТОЛЬКО ОДНА строка
                    if (!resOk) {
                        throw `FAIL => Открыть сделку NewDealTable.ClickDealID(${DealData.strDealID}, resultRecord);`;
                    }
                    // Установить время первого звонка
                    resOk = await NewDeal.SetTimeFirstCall();
                    if(!resOk){
                        throw `FAIL => Не указано время первого звонка -> Установить время первого звонка NewDeal.SetTimeFirstCall();`;
                    }

                    break;
                case "Время первого прозвона занято, выберите другое время!":
                    NumErrorTimeFirstCallIsBusy++;
                    if(NumErrorTimeFirstCallIsBusy > 1){
                        await console.log('\x1b[38;5;1m\t', `WARNING !!! Количество таких ошибок (${NumErrorTimeFirstCallIsBusy}) -> Перевод сделки во второй статус=${resultRecord.message}`, '\x1b[0m')
                    }
                    if(NumErrorTimeFirstCallIsBusy > 3){
                        throw `FAIL !!! Количество таких ошибок (${NumErrorTimeFirstCallIsBusy}) -> Перевод сделки во второй статус=${resultRecord.message}`;
                    }
                    // Открыть сделку и выбрать ДРУГОЕ время первого звонка Водителю
                    resOk = await NewDealTable.ClickDealID(DealData.strDealID, resultRecord); // после фильтра по ID должна быть ТОЛЬКО ОДНА строка
                    if (!resOk) {
                        throw `FAIL => Время первого прозвона занято -> Открыть сделку NewDealTable.ClickDealID(${DealData.strDealID}, resultRecord);`;
                    }
                    resOk = await NewDeal.SetTimeFirstCall();
                    if(!resOk){
                        throw `FAIL => Время первого прозвона занято -> Установить время первого звонка NewDeal.SetTimeFirstCall();`;
                    }
                    break;
                case "Выбраное время следующего звонка водителю не может быть в прошлом!":
                    NumErrorTimeFirstCallCannotBeInThePast++;
                    if(NumErrorTimeFirstCallCannotBeInThePast > 3){
                        throw `FAIL !!! Количество таких ошибок (${NumErrorTimeFirstCallCannotBeInThePast}) -> Перевод сделки во второй статус=${resultRecord.message}`;
                    }
                    // Открыть сделку и выбрать ДРУГОЕ время первого звонка Водителю
                    resOk = await NewDealTable.ClickDealID(DealData.strDealID, resultRecord); // после фильтра по ID должна быть ТОЛЬКО ОДНА строка
                    if (!resOk) {
                        throw `FAIL => Время первого прозвона не может быть в прошлом! -> Открыть сделку NewDealTable.ClickDealID(${DealData.strDealID}, resultRecord);`;
                    }
                    resOk = await NewDeal.SetTimeFirstCall();
                    if(!resOk){
                        throw `FAIL => Время первого прозвона не может быть в прошлом! -> Установить время первого звонка NewDeal.SetTimeFirstCall();`;
                    }

                    break;
                case "У перевозчика не полная контактная информация! Нехватает: email-а":
                    NumErrorNoEmailTransporter++;
                    if(NumErrorNoEmailTransporter > 1){
                        throw `FAIL !!! Количество таких ошибок (${NumErrorNoEmailTransporter}) -> Перевод сделки во второй статус=${resultRecord.message}`;
                    }
                    // Открыть Перевозчика и добавить email
                    throw `не дописано Открыть Перевозчика и добавить email`;
                    break;
                case "Документы водителя требуют проверки!":
                    NumNeedCheckDriverDocs++;
                    if(NumNeedCheckDriverDocs > 1){
                        throw `FAIL !!! Количество таких ошибок (${NumNeedCheckDriverDocs}) -> Перевод сделки во второй статус=${resultRecord.message}`;
                    }
                    // Открыть новый экземпляр Браузера и залогиниться под Парфёновой

                    resOk = await SetDriverCheck(LoginData, DealData.objTransporterCompany.DriverData);

                    break;
                case "Нельзя передать сделку под контроль МЦ без подписанной Заявки с Перевозчиком! Загрузите файл !":
                    NumErrorNoFileTransporter++;
                    if(NumErrorNoFileTransporter > 1){
                        throw `FAIL !!! Количество таких ошибок (${NumErrorNoFileTransporter}) -> Перевод сделки во второй статус=${resultRecord.message}`;
                    }
                    // Скролл до кнопки "Заявка (П) и загрузка файла"
                    resOk = await NewDealTable.AddDealOrderTransporter(DealData.strDealID, resultRecord); // после фильтра по ID должна быть ТОЛЬКО ОДНА строка
                    if (!resOk) {
                        throw `FAIL => Открыть Модалку Файлов "Заявка (П)" NewDealTable.ClickDealID(${DealData.strDealID}, resultRecord);`;
                    }
                    //await TempStop(page);
                    // resOk = await NewDeal.SetTimeFirstCall();
                    break;
                case "Статус сделки успешно изменен!":
                    enableError = false;
                    break;
                default:
                    enableError = false;// на всякий пожарный случай )))
                    // Какая то хуета случилась
                    throw `FAIL !!! НЕИЗВЕСТНОЕ СООБЩЕНИЕ -> Перевод сделки во второй статус=${resultRecord.message}`;
                    break;

            }// switch (resultRecord.message)

        } // while (enableError) -------------------------------------------
        let strTmpError = `БАГ !!! -> При переводе статуса сделки не было требования о`;
        if(NumErrorNoTimeFirstCall < 1){
            await console.log('\x1b[38;5;1m\t', `${strTmpError}б Установке Времени Первого звонка Водителю !!!`, '\x1b[0m');
        }
        if(NumErrorNoFileTransporter < 1) {
            await console.log('\x1b[38;5;1m\t', `${strTmpError} Подписанной Заявке с Перевозчиком !!!`, '\x1b[0m');
        }
        if(NumNeedCheckDriverDocs < 1){
            await console.log('\x1b[38;5;1m\t', `${strTmpError} Проверке документов Водителя !!!` , '\x1b[0m');
        }


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

}; // ТЕСТ let NewDealSetStatusInTable = async (browser, page, DealData)

SetDriverCheck = async function(LoginData, ContactData){
    let xPath, resOk;
    try {
        let NewB = require('../tests_modules/login.js');
        let NewBrowser = await NewB.StartBrowser();
        let NewPage = await NewB.BrowserGetPage(NewBrowser, g_FrontCfoFoxURL);
        resOk = await NewB.LoginCrm(NewPage, NewBrowser, LoginData);
        await WaitRender(NewPage);
       // await WaitMS(5000);
        let {Contact} = require('../tests_modules/sub_objects/contact_obj.js');
        let NewContact = new Contact(NewBrowser, NewPage, ContactData);
        // // Клик по пункту верхнего меню "Водители"
        // let xMenuDrivers = `//a[@href="/crm/drivers"][contains(text(), "Водители")]`;
        // resOk = await ClickByXPath(NewPage, xMenuDrivers, );

        // Переход по Линку на контакт Водителя
        // await console.log(`ContactData.strLink=(${ContactData.strLink})`);
        let strUrls = [
            `${g_BackCfoFoxURL}/api/auth-user`,
            `${g_BackCfoFoxURL}/api/personal-stats`,
            `${g_BackCfoFoxURL}/api/contact-type`,
            `${g_BackCfoFoxURL}/api/constructor/contact/${ContactData.strContactID}`,
        ];
        resOk = await ResponsesListener(NewPage, strUrls, true, strUrls.length);
        await NewPage.goto(ContactData.strLink);
        resOk = await ResponsesListenerWaitForAllResponses(31000);
        // Снимаем слушателя
        await ResponsesListener(NewPage, strUrls, false, strUrls.length);
        if(!resOk){
            throw `Fail -> ResponsesListenerWaitForAllResponses(31000)(${strUrls})`;
        }
        await WaitRender(NewPage);

        //await WaitMS(5000);

        let xNeedCheck = `//span[@class="fox-checkbox-label"][contains(text(), "Требует проверки")]`;
        await WaitForElementIsPresentByXPath(5000, NewPage, xNeedCheck);
        resOk = await HoverByXPathNum(NewPage, 0, xNeedCheck);
        await WaitRender(NewPage);
        resOk = await ClickByXPath(NewPage, xNeedCheck);
        if(!resOk){
            throw `Fail -> Снять Пометку "Требует проверки" ClickByXPath(${xNeedCheck})`;
        }
        await WaitRender(NewPage);

        let xButtonSaveContact = `//div[@class="crm-contact__store"]//button[@type="button"][contains(@class, "primary")][contains(text(), "Сохранить")]`;


        // await ScreenLog(NewPage, "Новый Браузер", 3);
        resOk = await ClickByXPath(NewPage, xButtonSaveContact);
        if(!resOk){
            throw `Fail -> Сохранить контакт Водителя ClickByXPath(${xButtonSaveContact})`;
        }


        // await ScreenLog(NewPage, "Новый Браузер", 3);
        await WaitRender(NewPage);
        await NewBrowser.close();
        return true;
    }catch (e) {
        await console.log(e);
        await ScreenLog(NewPage, "Новый Браузер -> SetDriverCheck", 1);
        return false;
    }
}; // SetDriverCheck

module.exports.DealCheckNewInTable = DealCheckNewInTable;
module.exports.NewDealSetStatusInTable = NewDealSetStatusInTable;
