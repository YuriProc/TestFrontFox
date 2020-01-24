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

let LPage = require('./tests_modules/login.js');


let UCNPage = require('./tests_modules/user_create_new');
let UCEPage = require('./tests_modules/user_check_exist');
let CCNPage = require('./tests_modules/company_create_new');
let CCEPage = require('./tests_modules/company_check_exist');
let CWEPage = require('./tests_modules/company_wrong_edit');

let ContactCVPage = require('./tests_modules/contact_check_validation');
let ContactCNPage = require('./tests_modules/contact_create_new');
let ContactCNV2Page = require('./tests_modules/contact_create_new_v2');


let DriverCNPage = require('./tests_modules/driver_create_new');
let DriverCNV2Page = require('./tests_modules/driver_create_new_v2');
let DriverCheckNV2Page = require('./tests_modules/driver_check_new_v2');

let VehicleCNPage = require('./tests_modules/vehicle_create_new');
let VehicleCNV2Page = require('./tests_modules/vehicle_create_new_v2');
let VehicleCheckNV2Page = require('./tests_modules/vehicle_check_new_v2');

let DealCNPage = require('./tests_modules/deal_create_new');
let DealCheckNPage = require('./tests_modules/deal_check_new');


let readPic = require('./tests_modules/test_save_picture');

let dtStart = new Date(Date.now());
let dtEnd;
let dtAll, strDtAll;
let MyFilePath;
let RNum;
let strLastName,strFirstName,strMiddleName;
let strLicensePlate;
let VehicleData;
let ContactData;

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
        browser = await LPage.StartBrowser();
        page = await LPage.BrowserGetPage(browser);
        g_NumberCurrentTest = 1;

        let LoginDataR = {
            strUserLastName : 'root',
            strEmail : 'root@root.com',
            strPassword : 'root1234567',
        };
        let LoginDataT = {
            strUserLastName : 'Тостер',
            strEmail : 'test@test.com',
            strPassword : 'test1234567890',
        };

        //------------START Для тестов--------------------------------------------------------------

/*
        returnResult = await LPage.Login(page, LoginDataT);
        if (!returnResult){
            returnResult = await LPage.Login(page, LoginDataR);
            if (!returnResult){
                throw ` FAIL => Login(${LoginDataR.strUserLastName}) !!!`;
            }
            returnResult = await UCEPage.CheckUserExist(page, LoginDataT.strUserLastName);
            if (!returnResult) {    // если его нет то создаём
                returnResult = await UCNPage.CreateNewUser(page, LoginDataT.strUserLastName);
                if (!returnResult){
                    throw ` FAIL => CreateNewUser(${LoginDataT.strUserLastName}) !!!`;
                }
            }else {
                throw ` FAIL => User ${LoginDataT.strUserLastName} найден, а залогиниться под ним НЕ УДАЛОСЬ!!!`;
            }
            //Попытка Номер 2 !!!
            returnResult = await LPage.Login(page, LoginDataT);
            if (!returnResult){
                throw ` FAIL !!! FAIL !!!=> Login(${LoginDataT.strUserLastName}) !!!`;
            }
        }
        await console.log('LOGIN OK!!! Можно Дальше Тестить ...');

        throw 'НЕ ОШИБКА => Тостер ВЫХОД ЗАПЛАНИРОВАННЫЙ OK!!!';

                ContactData = {

                };
                // 5) Тест на создание Нового Контакта

                //DriverFaceURL //TrollFaceURL //ManFaceURL //DriverDocURL
                MyFilePath = await SaveTempPictureFromRandomURL(browser, 'TrollFaceURL');
                RNum = randomInt(1000, 9999);
                strLastName = 'Фамилия'+ RNum;
                strFirstName = 'Имя' + RNum;
                returnResult = await ContactCNV2Page.ContactCreateNewV2(page,0,strLastName,strFirstName, MyFilePath);
                await DeleteTempPicture(MyFilePath);


        throw 'НЕ ОШИБКА => Тостер ВЫХОД ЗАПЛАНИРОВАННЫЙ OK!!!';
        */
        //------------END Для тестов------------------------------------------------------------------

        //  1) Логинимся под Рутом
        returnResult = await LPage.Login(page, LoginDataR);
        if (!returnResult){
            throw 'root LoginPage !!!';//<--специальный вызов ошибки!
        }

        // 2) Проверяем наличие Тостера
        returnResult = await UCEPage.CheckUserExist(page, LoginDataT.strUserLastName);

        if (!returnResult) {    // если его нет то создаём
            returnResult = await UCNPage.CreateNewUser(page, LoginDataT.strUserLastName);
        }

        // 3) перелогиниваемся под Тостером
        returnResult = await LPage.Login(page, LoginDataT);
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
        DriverData.returnResult = await DriverCNV2Page.DriverCreateNewV2(browser,page,DriverData);
        // 9) Проверяем нового водителя
        if (DriverData.returnResult) {
            DriverData.returnResult = await DriverCheckNV2Page.DriverCheckNewV2(browser, page, DriverData);
        }
/*
        // 10) Создаём Транспорт
        RNum = randomInt(1000, 9999);
        strLicensePlate = 'Тест '+ RNum + ' Ном';

        returnResult = await VehicleCNPage.VehicleCreateNew(browser,page,strLicensePlate);
*/
        // 10) Создаём Транспорт
        RNum = randomInt(1000, 9999);
        strLicensePlate = 'TEST '+ RNum + ' NUM'
        VehicleData = {
            strLicensePlate: strLicensePlate,
            strCarType: 'Тягач',
            strCarBrand: 'DAF',
            strCompanyName : 'ТРАНСЛОЙД',
        };
        VehicleData = await VehicleCNV2Page.VehicleCreateNewV2(browser,page,VehicleData);
        //await console.log("returnResultObject",VehicleData);
        // 11) Проверяем только что созданный Транспорт
        if (VehicleData.returnResult) {
            VehicleData = await VehicleCheckNV2Page.VehicleCheckNewV2(browser, page, VehicleData);
        }
        //await console.log("returnResultObject",VehicleData);

        // 12) Создаём новую сделку
        let DealData = {
            //strLicensePlate : 'TEST 3245 NUM',
            // strPointLoading : 'Хераково', //Хреново е //Сучки //Блядово //Хераково //Бодуны //Еблі //(Хуй Хуй)
            // strPointUnLoading : 'Дрочево', //Дрочево //Бухалово //Сискі //Сосуново //Сосунково //Матюково
            strPointLoading : await GetFunnyRandomAddress('StrAddressFunny'),
            strPointUnLoading : await GetFunnyRandomAddress('StrAddressFunny'),
            strTypeLoad : 'Алкоголь',
            strCargoCost : '100500',
            strCompanyClient : 'ОСНОВА',
            strOurCompanyClient : 'СТАВАНГЕР',
            strCompanyTransporter : 'ЛЬВІВКУЛЬТТОВАРИ',
            strOurCompanyTransporter : 'ТРАНСЛОЙД',
            strDriverMiddleName : 'Курганов',
            strLicensePlate1 : 'BC3082EE',//DAF BC3082EE
            strLicensePlate2 : 'BC7519XO',// KRONE BC7519XO
            strFoxResponsible : 'Тостер',
            strLogistician : 'Тостер',
            strDealID : '',
            returnResult : false,
        };

        //await page.waitFor(11000);
        DealData = await DealCNPage.DealCreateNew(browser,page,DealData);
        if (DealData.returnResult) {

            // 12.1) Проверяем новую сделку
            DealData = await DealCheckNPage.DealCheckNew(browser, page, DealData);
        }



    }catch (err0) {
        await console.log('\x1b[38;5;1m', "Ошибка:",err0, '\x1b[0m');
        g_StrOutLog+=`Ошибка: ${err0}\n`;
        await console.log('\x1b[38;5;1m', "Все остальные тесты не будут запущены!!! ", '\x1b[0m');
        g_StrOutLog+=`Все остальные тесты не будут запущены!!! \n`;
    }


    //await page.waitFor(5000);
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

            //g_StrOutLog+='----------------- END   FOX TESTS ----------------\n';
            g_StrOutLog+='----------------- Во всём виноваты СракЕндеры ----------------\n';
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
