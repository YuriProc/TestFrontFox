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
let CCNV2Page = require('./tests_modules/company_create_new_v2');
let CCheckNV2Page = require('./tests_modules/company_check_new_v2');

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
let DealSetStatusPage = require('./tests_modules/deal_set_status');


let readPic = require('./tests_modules/test_save_picture');

let dtStart = new Date(Date.now());
let dtEnd;
let dtAll, strDtAll;
let MyFilePath;
let RNum;
let strLastName,strFirstName,strMiddleName;
let strLicensePlate;
let CompanyData1, CompanyData2;
let VehicleData1, VehicleData2;
let DealData;
let ContactData;
let DriverData, DriverData_1, DriverData_2;

let tempStr;


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
        let strLoginCrmFoxURL = g_FrontCrmFoxURL + '/login';
        page = await LPage.BrowserGetPage(browser, strLoginCrmFoxURL);
        g_NumberCurrentTest = 1;

        let LoginDataR = {
            strUserLastName : 'root',
            strEmail : 'root@root.com',
            strPassword : 'root1234567',
        };
        let LoginDataT = {
            strUserLastName : 'Тостер',
            strEmail : 'test_xxx@test.com',
            strPassword : 'test1234567890',
            //ResolvedFailLogin : true, // <- Можно или нельзя Фейлиться по Email или Пароль
            // Если можно то в случае (Неверный e-mail или пароль) +1 g_SuccessfulTests
            // Если нельзя то в случае (Неверный e-mail или пароль) +1 g_FailedTests
        };


        //------------START Для тестов--------------------------------------------------------------
                // Логинимся под ТОСТЕРОМ
                LoginDataT.ResolvedFailLogin = true;// <- Можно или нельзя Фейлиться по Email или Пароль
                returnResult = await LPage.Login(page, LoginDataT);
                if (!returnResult){ // Если не получилось то логинимся под ROOT`ом
                    returnResult = await LPage.Login(page, LoginDataR);
                    if (!returnResult){ //Если не получилось то FAIL  и выход!!!
                        throw ` FAIL => Login(${LoginDataR.strUserLastName}) !!!`;
                    }
                    returnResult = await UCEPage.CheckUserExist(page, LoginDataT.strUserLastName);
                    if (!returnResult) {    // если его нет то создаём
                        returnResult = await UCNPage.CreateNewUser(page, LoginDataT.strUserLastName);
                        if (!returnResult){ // если не получилось то FAIL и выход !!!
                            throw ` FAIL => CreateNewUser(${LoginDataT.strUserLastName}) !!!`;
                        }
                    }else {
                        throw ` FAIL => User ${LoginDataT.strUserLastName} найден, а залогиниться под ним НЕ УДАЛОСЬ!!!`;
                    }
                    //Попытка Номер 2 !!!
                    LoginDataT.ResolvedFailLogin = false;// <- Можно или нельзя Фейлиться по Email или Пароль
                    returnResult = await LPage.Login(page, LoginDataT);
                    if (!returnResult){
                        throw ` FAIL !!! FAIL !!!=> Login(${LoginDataT.strUserLastName}) !!!`;
                    }
                }
                await console.log('LOGIN OK!!! Можно Дальше Тестить ...');

                //throw 'НЕ ОШИБКА => Тостер ВЫХОД ЗАПЛАНИРОВАННЫЙ OK!!!';

                //CodeCompany = '40465590';//40894612 +//40864216//40992677//40802689//33322524//33343916//33693475//26388251

                //tempStr = '38050' + await randomInt(1001010, 9989999);
                //CodeCompany = await GetFunnyStr('StrCompanyCodeArray');
                CompanyData1 = {
                    strCodeCompany : await GetFunnyStr('StrCompanyCodeArray'),// '35054264',//'38351188', //CodeCompany, //CodeCompany, //38462049 нет сокр названия
                    strCompanyName : '',// <= Заполнится автоматически при создании Компании !!!
                    strCompanyTypes : [ 'Заказчик', ], // Заказчик // Перевозчик // Экспедитор
                    boolIsOurCompany : false,
                    boolNeedCheck : false,
                    strManagers : [ LoginDataT.strUserLastName, 'Гриневич'],
                    strDelayDays : '7',
                    strPaymentCondition : 'По оригиналам банковских дней', // 'По оригиналам календарных дней'
                    strPhoneNumber : '38050' + await randomInt(1001010, 9989999),
                    strUrl : await GetFunnyUrl('Funny_Page_URL'),//'https://natribu.org/',//Funny_Page_URL
                    strContractOurCompany : 'ТРАНСЛОЙД',// СТАВАНГЕР // ТРАНСЛОЙД //
                    strContractOurCompanyIs : 'Перевозчик',

                    returnResult : false,
                };

        // X) проверяем наличие тестовой компании CompanyData1
                returnResult = await CCEPage.CompanyCheckExist(page, CompanyData1.strCodeCompany);
                await console.log('\x1b[38;5;2m', "         CompanyCheckExist(",CompanyData1.strCodeCompany,")=>", returnResult , '\x1b[0m');
        // X) создаём тестовую компанию CompanyData1
                CompanyData1 = await CCNV2Page.CompanyCreateNewV2(browser, page, CompanyData1);
                if (!CompanyData1.returnResult) {
                    throw `Не получилось создать компанию (${CompanyData1.strCodeCompany})`;//<--специальный вызов ошибки!
                }
                //await console.log(`Created => CompanyData1:`, CompanyData1);
        // X) Проверяем созданную тестовую компанию CompanyData1
                CompanyData1 = await CCheckNV2Page.CompanyCheckNewV2(page, CompanyData1);
                if (!CompanyData1.returnResult) {
                    throw `FAIL => CompanyCheckNewV2 (${CompanyData1.strCodeCompany})`;//<--специальный вызов ошибки!
                }


        CompanyData2 = {
            strCodeCompany : await GetFunnyStr('StrCompanyCodeArray'),//'38351188', //CodeCompany, //CodeCompany, //38462049 нет сокр названия
            strCompanyName : '',// <= Заполнится автоматически при создании Компании !!!
            strCompanyTypes : [ 'Перевозчик', ], // Заказчик // Перевозчик // Экспедитор
           boolIsOurCompany : false,
           boolNeedCheck : false,
            strManagers : [ LoginDataT.strUserLastName, 'Гриневич'],
            strDelayDays : '7',
            strPaymentCondition : 'По оригиналам банковских дней', // 'По оригиналам календарных дней'
            strPhoneNumber : '38050' + await randomInt(1001010, 9989999),
            strUrl : await GetFunnyUrl('Funny_Page_URL'),//'https://natribu.org/',//Funny_Page_URL
            strContractOurCompany : 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
            strContractOurCompanyIs : 'Заказчик',

            returnResult : false,
        };
        // X) проверяем наличие тестовой компании CompanyData2
                returnResult = await CCEPage.CompanyCheckExist(page, CompanyData2.strCodeCompany);
                await console.log('\x1b[38;5;2m', "         CompanyCheckExist(",CompanyData2.strCodeCompany,")=>", returnResult , '\x1b[0m');
        // X) создаём тестовую компанию CompanyData2
                CompanyData2 = await CCNV2Page.CompanyCreateNewV2(browser, page, CompanyData2);
                if (!CompanyData2.returnResult) {
                    throw `Не получилось создать компанию (${CompanyData2.strCodeCompany})`;//<--специальный вызов ошибки!
                }
                //await console.log(`Created => CompanyData2:`, CompanyData2);
        // X) Проверяем созданную тестовую компанию CompanyData2
                CompanyData2 = await CCheckNV2Page.CompanyCheckNewV2(page, CompanyData2);
                if (!CompanyData2.returnResult) {
                    throw `FAIL => CompanyCheckNewV2 (${CodeCompany})`;//<--специальный вызов ошибки!
                }


                    RNum = randomInt(1000, 9999);

                    DriverData = {
                        typeWork : 0,
                        strLastName : await GetFunnyStr('StrLastNameFunny'),//Фамилия
                        strFirstName : await GetFunnyStr('StrFirstNameFunny'),//Имя
                        strMiddleName : await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                        strDriverLicenseNumber : 'DLN' + RNum,
                        strCompanyName : CompanyData2.strCompanyName, //'ТРАНСЛОЙД',
                        strCodeCompany : CompanyData2.strCodeCompany,
                    };
        // X) Создаём нового Водителя V2
                    DriverData = await DriverCNV2Page.DriverCreateNewV2(browser,page,DriverData);
                    if (!DriverData.returnResult) {
                        throw `FAIL => DriverCreateNewV2 (${DriverData.strLastName})`;//<--специальный вызов ошибки!
                    }
        // X) Проверяем нового водителя
                    if (DriverData.returnResult) {
                        DriverData = await DriverCheckNV2Page.DriverCheckNewV2(browser, page, DriverData);
                        if (!DriverData.returnResult) {
                            throw `FAIL => DriverCheckNewV2 (${DriverData.strLastName})`;//<--специальный вызов ошибки!
                        }
                    }

                    // Тягач
                    VehicleData1 = {
                        strLicensePlate: 'TEST'+ await randomInt(1000, 9999) + 'NUM',
                        strCarType: 'Тягач',
                        strCarBrand: 'DAF',
                        CompanyData : CompanyData2,//'Перевозчик',
                        DriverData: DriverData,
                    };
        // X) Создаём Транспорт_1 (Тягач)
                    VehicleData1 = await VehicleCNV2Page.VehicleCreateNewV2(browser,page,VehicleData1);
                    if (!VehicleData1.returnResult) {
                        throw `FAIL => VehicleCreateNewV2 (${VehicleData1.strLicensePlate})`;//<--специальный вызов ошибки!
                    }

        // X) Проверяем только что созданный Транспорт_1 (Тягач)
                    if (VehicleData1.returnResult) {
                        VehicleData1 = await VehicleCheckNV2Page.VehicleCheckNewV2(browser, page, VehicleData1);
                        if (!VehicleData1.returnResult) {
                            throw `FAIL => VehicleCheckNewV2 (${VehicleData1.strLicensePlate})`;//<--специальный вызов ошибки!
                        }
                    }
                    // Прицеп
                    VehicleData2 = {
                        strLicensePlate: 'TEST'+ await randomInt(1000, 9999) + 'NUM',
                        strCarType: 'Полуприцеп',
                        strCarBrand: 'SCHMITZ',
                        CompanyData : CompanyData2,//'Перевозчик',
                        DriverData: DriverData,
                    };
        // X) Создаём Транспорт_2 (Прицеп)
                    VehicleData2 = await VehicleCNV2Page.VehicleCreateNewV2(browser,page,VehicleData2);
                    if (!VehicleData2.returnResult) {
                        throw `FAIL => VehicleCreateNewV2 (${VehicleData2.strLicensePlate})`;//<--специальный вызов ошибки!
                    }

        // X) Проверяем только что созданный Транспорт_1 (Прицеп)
                    if (VehicleData2.returnResult) {
                        VehicleData2 = await VehicleCheckNV2Page.VehicleCheckNewV2(browser, page, VehicleData2);
                        if (!VehicleData2.returnResult) {
                            throw `FAIL => VehicleCheckNewV2 (${VehicleData2.strLicensePlate})`;//<--специальный вызов ошибки!
                        }
                    }


        // 12) Создаём новую сделку
        DealData = {
            //strLicensePlate : 'TEST 3245 NUM',
            // strPointLoading : 'Хераково', //Хреново е //Сучки //Блядово //Хераково //Бодуны //Еблі //(Хуй Хуй)
            // strPointUnLoading : 'Дрочево', //Дрочево //Бухалово //Сискі //Сосуново //Сосунково //Матюково
            strPointLoading : await GetFunnyStr('StrAddress'), //StrAddress //StrAddressFunny
            strPointUnLoading : await GetFunnyStr('StrAddress'), //StrAddress //StrAddressFunny
            strTypeLoad : 'Алкоголь',
            strCargoCost : '100500',
            CompanyClient : CompanyData1,//'ОСНОВА',
            strOurCompanyClient : CompanyData1.strContractOurCompany,//'СТАВАНГЕР',
            CompanyTransporter : CompanyData2,//'ЛЬВІВКУЛЬТТОВАРИ',
            strOurCompanyTransporter : CompanyData2.strContractOurCompany,//'ТРАНСЛОЙД',
            DriverFullData : DriverData,//'Курганов',
            strLicensePlate1 : VehicleData1.strLicensePlate,//'BC3082EE',//DAF BC3082EE
            strLicensePlate2 : VehicleData2.strLicensePlate,//'BC7519XO',// KRONE BC7519XO
            strFoxResponsible : 'Тостер',
            strLogistician : 'Тостер',
            strDealID : '',
            strStatus : '',
            returnResult : false,
        };

        //await page.waitFor(11000);
        DealData = await DealCNPage.DealCreateNew(browser,page,DealData);
        if (DealData.returnResult) {

            // 12.1) Проверяем новую сделку
            DealData = await DealCheckNPage.DealCheckNew(browser, page, DealData);
        }
        if(DealData.returnResult) {
            // 12.2) Устанавливаем статус сделки
            DealData.strStatus = 'Экспортировано в фокс';
            DealData = await DealSetStatusPage.DealSetStatus(browser, page, DealData);
        }

      // throw 'НЕ ОШИБКА => Тостер ВЫХОД ЗАПЛАНИРОВАННЫЙ OK!!!';





        //------------END Для тестов------------------------------------------------------------------





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
            if ( g_FailedTests > 0 ) {
                g_StrOutLog+='----------------- Во всём виноваты СракЕндеры ----------------\n';
            }

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
