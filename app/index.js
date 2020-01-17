// app/index.js
//console.log('-------- app/index.js  Hello from Node.js ----------------');

let oConfig;
let pageL;
let pageC;
let page;
let browser;


let width = 1200;
let height = 1000;

 //const puppeteer = require('puppeteer');
require('./global_functions').global;



let OpenConfig = require('./open_config');

const fs_log = require('fs');
let SBrowser = require('./tests_modules/login.js');
let LPage = require('./tests_modules/login.js');
let RL = require('./tests_modules/re_login_toster');

let UCNPage = require('./tests_modules/user_create_new');
let UCEPage = require('./tests_modules/user_check_exist');
let CCNPage = require('./tests_modules/company_create_new');
let CCEPage = require('./tests_modules/company_check_exist');
let CWEPage = require('./tests_modules/company_wrong_edit');

let ContactCVPage = require('./tests_modules/contact_check_validation');
let ContactCNPage = require('./tests_modules/contact_create_new');
let DriverCNPage = require('./tests_modules/driver_create_new');
let DriverCNV2Page = require('./tests_modules/driver_create_new_v2');
let DriverCheckNV2Page = require('./tests_modules/driver_check_new_v2');

let VehicleCNPage = require('./tests_modules/vehicle_create_new');
let DealCNPage = require('./tests_modules/deal_create_new');


let readPic = require('./tests_modules/test_save_picture');

let dtStart = new Date(Date.now());
let dtEnd;
let dtAll, strDtAll;
let MyFilePath;
let RNum;
let strLastName,strFirstName,strMiddleName;
let strLicensePlate;


let OpenFox = async () => {
    try {
        let returnResult = false;
        let CodeCompany;
        oConfig = await OpenConfig.SetAllConfigConst();
        if (oConfig === "OK") {
            await console.log('\x1b[38;5;2m', "Load Config", oConfig, '\x1b[0m');
            fs_log.writeFileSync(g_CheckFileName, `-1`);
        }else{
            throw 'Ошибка OpenConfig !!!';//<--специальный вызов ошибки!
        }
        g_StrOutLog+=`Тесты ========================================\n`;
        browser = await SBrowser.StartBrowser();
        page = await SBrowser.BrowserGetPage(browser);
        g_NumberCurrentTest = 1;

        //------------START Для тестов--------------------------------------------------------------
/*
                returnResult = await LPage.LoginPage(page);
                // 2) Проверяем наличие Тостера
                let strUserLastNameT = 'Тостер';//Тостер
                returnResult = await UCEPage.CheckUserExist(page, strUserLastNameT);

                if (!returnResult) {    // если его нет то создаём
                    returnResult = await UCNPage.CreateNewUser(page, strUserLastNameT);
                }
*/

                //returnResult = await RL.ReLoginToster(page);

                // RNum = randomInt(1000, 9999);
                // strLicensePlate = 'Тест '+ RNum + ' Ном';
                //
                // returnResult = await VehicleCNPage.VehicleCreateNew(browser,page,strLicensePlate);
             //   returnResult = await DealCNPage.DealCreateNew(browser,page,strLicensePlate);
             //   if (!returnResult) {    // если не получилось перелогиниться то всё остальное будет пропущено
             //       throw 'Не получилось DealCreateNew';//<--специальный вызов ошибки!
             //   }
                //
                //

    /*            // 8) Создаём нового Водителя V2
               RNum = randomInt(1000, 9999);
               RNum = 3546;
        //let strDriverLicenseNumber = 'DLN' + randomInt(1000, 9999) + strLastName;
               let tempStrLN = 'ВодФам'+ RNum;
               let DriverData = {
                   typeWork : 0,
                   strLastName : tempStrLN,
                   strFirstName : 'ВодИмя' + RNum,
                   strMiddleName : 'ВодОтч' + RNum,
                   strDriverLicenseNumber : 'DLN' + tempStrLN,
                   strCompanyName : 'ТРАНСЛОЙД',

               };

                // strLastName = 'ВодФам'+ RNum;
                // strFirstName = 'ВодИмя' + RNum;
                // strMiddleName = 'ВодОтч' + RNum;
  //              returnResult = await DriverCNV2Page.DriverCreateNewV2(browser,page,DriverData);
                returnResult = await DriverCheckNV2Page.DriverCheckNewV2(browser,page,DriverData);

*/
        // 10) Создаём Транспорт
 /*       RNum = randomInt(1000, 9999);
        strLicensePlate = 'Тест '+ RNum + ' Ном';

        returnResult = await VehicleCNPage.VehicleCreateNew(browser,page,strLicensePlate);

                throw 'НЕ ОШИБКА => Тостер ВЫХОД ЗАПЛАНИРОВАННЫЙ OK!!!';
*/

        //------------END Для тестов------------------------------------------------------------------

        //  1) Логинимся под Рутом
        returnResult = await LPage.LoginPage(page);
        if (!returnResult){
            throw 'root LoginPage !!!';//<--специальный вызов ошибки!
        }


        let strUserLastName = 'Тостер';//Тостер

        // 2) Проверяем наличие Тостера
        returnResult = await UCEPage.CheckUserExist(page, strUserLastName);

        if (!returnResult) {    // если его нет то создаём
            returnResult = await UCNPage.CreateNewUser(page, strUserLastName);
        }

        // 3) перелогиниваемся под Тостером
        returnResult = await RL.ReLoginToster(page);
        if (!returnResult) {    // если не получилось перелогиниться то всё остальное будет пропущено
            throw 'Не получилось перелогиниться под Тостером';//<--специальный вызов ошибки!
        }
        // 4) проверяем валидацию при создании Контакта
        returnResult = await ContactCVPage.ContactCheckValidation(page);

        // 5) Тест на создание Нового Контакта

        //DriverFaceURL //TrollFaceURL //ManFaceURL //DriverDocURL
        MyFilePath = await SaveTempPictureFromRandomURL(browser, 'TrollFaceURL');
        RNum = randomInt(1000, 9999);
        strLastName = 'Фамилия'+ RNum;
        strFirstName = 'Имя' + RNum;
        returnResult = await ContactCNPage.ContactCreateNew(page,0,strLastName,strFirstName, MyFilePath);
        await DeleteTempPicture(MyFilePath);


        // 6) проверяем наличие тестовой компании
        CodeCompany = '40720837';//40686262//40894612//40864216//40992677//40802689//33322524//33343916//33693475//26388251
        returnResult = await CCEPage.CompanyCheckExist(page, CodeCompany);
        await console.log('\x1b[38;5;2m', "         CompanyCheckExist(",CodeCompany,")=>", returnResult , '\x1b[0m');
        //await page.waitFor(1000111);
        if (!returnResult) { // компания не найдена создадим её
            returnResult = await CCNPage.CompanyCreateNew(page, CodeCompany);
            await console.log('\x1b[38;5;2m', "         CompanyCreateNew(",CodeCompany,")=>", returnResult , '\x1b[0m');
            if (!returnResult) {
                throw `Не получилось создать компанию (${CodeCompany})`;//<--специальный вызов ошибки!
            }
        }
        // 7) Пробуем отредактировать и сохранить тестовую компанию без обязательных полей
        returnResult = await CWEPage.CompanyWrongEdit(page, CodeCompany);

        // 8) Создаём нового Водителя V2
        RNum = randomInt(1000, 9999);
       // RNum = 3546;

        let tempStrLN = 'ВодФам'+ RNum;
        let DriverData = {
            typeWork : 0,
            strLastName : tempStrLN,
            strFirstName : 'ВодИмя' + RNum,
            strMiddleName : 'ВодОтч' + RNum,
            strDriverLicenseNumber : 'DLN' + tempStrLN,
            strCompanyName : 'ТРАНСЛОЙД',

        };
        returnResult = await DriverCNV2Page.DriverCreateNewV2(browser,page,DriverData);
        // 9) Проверяем нового водителя
        returnResult = await DriverCheckNV2Page.DriverCheckNewV2(browser,page,DriverData);

        // 10) Создаём Транспорт
        RNum = randomInt(1000, 9999);
        strLicensePlate = 'Тест '+ RNum + ' Ном';

        returnResult = await VehicleCNPage.VehicleCreateNew(browser,page,strLicensePlate);

    }catch (err0) {
        await console.log('\x1b[38;5;1m', "Ошибка:",err0, '\x1b[0m');
        g_StrOutLog+=`Ошибка: ${err0}\n`;
        await console.log('\x1b[38;5;1m', "Все остальные тесты не будут запущены!!! ", '\x1b[0m');
        g_StrOutLog+=`Все остальные тесты не будут запущены!!! \n`;
    }


    await page.waitFor(5000);
    browser.close();

    dtEnd = new Date(Date.now());
    dtAll = dtEnd - dtStart;
    strDtAll = msToHHMMSS(dtAll);

    if (g_OutToLogFile) {
        try {
            await console.log( "-------------------------------------------------------------------" );

            await console.log('\x1b[38;5;2m', "Запись LOG файла:", g_LogFileName, "  == START ==",'\x1b[0m');

            g_StrOutLog+=`============================================\n`;
            g_StrOutLog+=`-> Всего тестов запущено : ${g_LaunchedTests}   ===========\n`;
            g_StrOutLog+=`+++++++++ Удачно пройдено: ${g_SuccessfulTests}   +++++++++++\n`;
            g_StrOutLog+=`--------------- Провалено: ${g_FailedTests}   -----------\n`;

            g_StrOutLog+='----------------- END   FOX TESTS ----------------\n';
            g_StrOutLog+=`End Log File | Прошло времени: ${strDtAll}\n`;

            fs_log.writeFileSync(g_CheckFileName, `${g_FailedTests}`);
            fs_log.writeFileSync(g_LogFileName, g_StrOutLog);
            await console.log('\x1b[38;5;2m', "Запись LOG файла:", g_LogFileName, "  +++ OK +++", '\x1b[0m');
        }catch (errWriteFile) {
            await console.log('\x1b[38;5;1m', "Запись LOG файла:", g_LogFileName, "Ошибка ->", errWriteFile ,'\x1b[0m');
        }
    }
    return "Скрипты отработали";

};

OpenFox().then((value) => {

    console.log(value); // Получилось!
    console.log('\x1b[38;5;2m', "Прошло времени:", strDtAll, '\x1b[0m');
    console.log('-----------------','\x1b[38;5;3m',  '  g_LaunchedTests:', g_LaunchedTests, '\x1b[0m', '----------------');
    console.log('-----------------','\x1b[38;5;2m',  'g_SuccessfulTests:', global.g_SuccessfulTests, '\x1b[0m', '----------------');
    console.log('-----------------','\x1b[38;5;1m',  '    g_FailedTests:', g_FailedTests, '\x1b[0m', '----------------');



});
