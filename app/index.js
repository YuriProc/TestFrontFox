// app/index.js
//console.log('-------- app/index.js  Hello from Node.js ----------------');

let oConfig, oDataVariables;

let page, pageCfo;
let browser;


let width = 1700;
let height = 950;

 //const puppeteer = require('puppeteer');
require('./global_functions').global;
require('./global_functions_cfo').global;

let OpenConfig = require('./open_config');
let OpenVariables = require('./data/data_for_tests.js');

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

let CfoDealCheckNPage = require('./tests_modules/cfo_deal_check_new');


let readPic = require('./tests_modules/test_save_picture');

let dtStart = new Date(Date.now());
let dtEnd;
let dtAll, strDtAll;
let MyFilePath;
let RNum;
let strLastName,strFirstName,strMiddleName;
let strLicensePlate;


let tempStr;
let returnResult = false;


let OpenFox = async () => {
    try { let resOk;
        let CodeCompany;
        oConfig = await OpenConfig.SetAllConfigConst();
        //oDataVariables = await OpenVariables.SetAllDataVariables();
        let {DataForTests} = require("./data/data_for_tests.js");
        let Data = new DataForTests();
        await Data.SetAllDataVariables();
        resOk = await DeleteAllScreenshots(g_PathSS);
        if(!resOk){
            await console.log('\x1b[38;5;1m', `Ошибка удаления файлов Скринов (${g_PathSS})`, '\x1b[0m');
        }else {
            await console.log('\x1b[38;5;2m', `OK все файлы скринов удалены (${g_PathSS})`, '\x1b[0m');
        }
        if (oConfig === "OK") {
            await console.log('\x1b[38;5;2m', "Load Config", oConfig, '\x1b[0m');
            fs_log.writeFileSync(g_CheckFileName, `-1`);
        } else {
            throw 'Ошибка OpenConfig !!!';//<--специальный вызов ошибки!
        }
        g_StrOutLog += `Тесты ========================================\n`;
        browser = await LPage.StartBrowser();

        //let strLoginCrmFoxURL = g_FrontCrmFoxURL + '/login';
        let strLoginCrmFoxURL = g_FrontCfoFoxURL;// g_FrontCrmFoxURL;
        page = await LPage.BrowserGetPage(browser, strLoginCrmFoxURL);


        g_NumberCurrentTest = 1;


        RNum = randomInt(1000, 9999);



    if(true){    // <-temp!!!!!
        //------------START Для тестов--------------------------------------------------------------
        // https://blog.listratenkov.com/webstorm-ide-hot-keys/

        // Логинимся под ТОСТЕРОМ
        Data.LoginDataT.ResolvedFailLogin = false;//true;// <- Можно или нельзя Фейлиться по Email или Пароль
        returnResult = await LPage.LoginCrm(page, browser, Data.LoginDataT);
        if (!returnResult) { // Если не получилось то логинимся под ROOT`ом
            if(Data.LoginDataT.ResolvedFailLogin){
            returnResult = await LPage.LoginCrm(page, browser, Data.LoginDataR);
            if (!returnResult) { //Если не получилось то FAIL  и выход!!!
                throw ` FAIL => LoginCrm(${Data.LoginDataR.strUserLastName}) !!!`;
            }
            returnResult = await UCEPage.CheckUserExist(page, Data.LoginDataT.strUserLastName);
            if (!returnResult) {    // если его нет то создаём
                returnResult = await UCNPage.CreateNewUser(page, Data.LoginDataT);
                if (!returnResult) { // если не получилось то FAIL и выход !!!
                    throw ` FAIL => CreateNewUser(${Data.LoginDataT.strUserLastName}) !!!`;
                }
            } else {
                throw ` FAIL => User ${Data.LoginDataT.strUserLastName} найден, а залогиниться под ним НЕ УДАЛОСЬ!!!`;
            }
            //Попытка Номер 2 !!!
            Data.LoginDataT.ResolvedFailLogin = false;// <- Можно или нельзя Фейлиться по Email или Пароль
            returnResult = await LPage.LoginCrm(page, Data.LoginDataT);
            if (!returnResult) {
                throw ` FAIL !!! FAIL !!!=> LoginCrm(${Data.LoginDataT.strUserLastName}) !!!`;
            }

            }else{
                throw ` FAIL !!! FAIL !!!=> LoginCrm(${Data.LoginDataT.strUserLastName}) !!!`;
            }
        }
        await console.log('LOGIN OK!!! Можно Дальше Тестить ...');




// await TempStop(page, `---- BEFORE -----`);
        //--------

        //throw 'НЕ ОШИБКА => Тостер ВЫХОД ЗАПЛАНИРОВАННЫЙ OK!!!';

        //CodeCompany = '40465590';//40894612 +//40864216//40992677//40802689//33322524//33343916//33693475//26388251



        // X) проверяем наличие тестовой компании CompanyData1
       // returnResult = await CCEPage.CompanyCheckExist(page, CompanyData1.strCompanyCode);
       // await console.log('\x1b[38;5;2m', "         CompanyCheckExist(", CompanyData1.strCompanyCode, ")=>", returnResult, '\x1b[0m');
        // X) создаём тестовую компанию CompanyData1 43257059

        for(let i=1;i<=1000;i++) {

             await Data.SetAllDataVariables(); // <---- OK





await console.log(`NumTests=${i}`);
           // await WaitMS(5000);
            Data.DealData1.strDealID = `33066`;
            Data.DealData1.strStatusID = `2`;
            Data.DealData1.strClientCompanyName = `ПРАТ "ВО "СТАЛЬКАНАТ-СІЛУР"`;//4316
            Data.DealData1.strClientCompanyID = `4316`;
            Data.DealData1.strClientCompanyCode = `26209430`;
            Data.DealData1.strOurCompanyWithClient = `ТОВ "ТРАНСЛОЙД"`;
            Data.DealData1.ClientFreights[0].Amount = `500`;
            //Data.DealData1.PointsLoading[0].PointLoading.strAddressFOX = `Херсон`;
            Data.DealData1.PointsLoading[0].PointLoading.strInDate = `26.07.2021 08:00`;
            Data.DealData1.PointsUnLoading[1].PointUnLoading.strOutDate = `29.07.2021 15:00`;

            Data.DealData1 = await DealCheckNPage.DealCheckNew(browser, page, Data.DealData1);
            await TempStop(page);
           //==========
          //    Data.CompanyData1.strCompanyCode = `40253046`;
            Data.CompanyData1 = await CCNV2Page.CompanyCreateNewV2(browser, page, Data.CompanyData1);
            // await TempStop(page);

            if (!Data.CompanyData1.returnResult) {
                //throw `Не получилось создать компанию (${Data.CompanyData1.strCompanyCode})`;//<--специальный вызов ошибки!
                await console.log(`Ошибки при создании компании (${Data.CompanyData1.strCompanyCode})`);
            }
            await WaitRender(page);
            // X) Проверяем созданную тестовую компанию CompanyData2
            Data.CompanyData1 = await CCheckNV2Page.CompanyCheckNewV2(browser, page, Data.CompanyData1);
            if (!Data.CompanyData1.returnResult) {
                throw `FAIL => CompanyCheckNewV2 (${Data.CompanyData1.strCompanyCode})`;//<--специальный вызов ошибки!
            }

            // X) создаём тестовую компанию CompanyData2
          //  Data.CompanyData2.strCompanyCode = '00190928';//'14180856';//'43092634';//'14180856';
            Data.CompanyData2 = await CCNV2Page.CompanyCreateNewV2(browser, page, Data.CompanyData2);
            if (!Data.CompanyData2.returnResult) {
                //throw `Не получилось создать компанию (${Data.CompanyData2.strCompanyCode})`;//<--специальный вызов ошибки!
                await console.log(`Не получилось создать компанию (${Data.CompanyData2.strCompanyCode})`);
            }
            // X) Проверяем созданную тестовую компанию CompanyData2
            Data.CompanyData2 = await CCheckNV2Page.CompanyCheckNewV2(browser, page, Data.CompanyData2);
            if (!Data.CompanyData2.returnResult) {
                throw `FAIL => CompanyCheckNewV2 (${Data.CompanyData2.strCompanyCode})`;//<--специальный вызов ошибки!
            }
// Создаём новую сделку
//            // Client
//             Data.CompanyData1.strCompanyName = `ТОВ "ТРАНСАГЕНТСТВО ДЕРЕВО"`;//`ТОВ "БЕЛ ПЛЮС ГРУП"`;//`ТОВ "ФРЕЙМ РЕНТАЛ"`;//`ПП "ПРИМ АГРО"`;//`ТОВ "МЕГАЛАТ"`;//`ПП "ВЛА-ДЕН"`; // `ПП "ВЛА-ДЕН"`; // ТОВ "ОМЕГА"// <-временно тут
//             Data.CompanyData1.strCompanyCode = `35917653`;//`42329394`;//`39311015`; // `39061081`;//`14180856`; // '14180856'; // 30982361
//             Data.CompanyData1.strCompanyID = `18576`;// `15774`;
//             Data.CompanyData1.ContractData.strContractOurCompany = `СТАВАНГЕР`;
//             Data.CompanyData1.strCargoType = `Запчастини`;
//             Data.CompanyData1.strCargoCost = `100500`;
//             Data.CompanyData1.LocationData1.strAddressFOX = `Сискі`;
//             Data.CompanyData1.LocationData1.strAddressFOXfromGoogle = `Сискі, Польща`;
//             Data.CompanyData1.LocationData2.strAddressFOX = `Лобково`;
//             Data.CompanyData1.LocationData2.strAddressFOXfromGoogle = `Лобково, Московская обл., 143151`;
//
//
//             // Transporter
//             Data.CompanyData2.strCompanyName = `ТОВ "ФРЕЙМ РЕНТАЛ"`;//`АТ "ПОКРОВСЬКИЙ ГЗК"`;//`ТОВ "ФОКС ТРАНС"`;//`ПП "ВЛА-ДЕН"`; // `ПП "ВЛА-ДЕН"`; // <-временно тут
//             Data.CompanyData2.strCompanyCode = `39311015`;//`00190928`; //38215221`;//`14180856`; // '14180856';
//             Data.CompanyData2.strCompanyID = `6652`;// `12970`;
//             Data.CompanyData2.ContractData.strContractOurCompany = `ПЕРЕВОЗ`;
//             Data.CompanyData2.DriverData.strLastName = `Гендальф`;
//             Data.CompanyData2.DriverData.strFirstName = `Графон`;
//             Data.CompanyData2.DriverData.strMiddleName = `Алибабаевич`;
//             Data.CompanyData2.DriverData.strContactID = `38576`;
//             Data.CompanyData2.DriverData.PhoneData.strPhoneNumber = `380676182637`;
//             Data.CompanyData2.DriverData.Vehicles[0].VehicleData.strLicensePlate = `FF1252KK`;
//             Data.CompanyData2.DriverData.Vehicles[0].VehicleData.strVehicleID = `62899`;
//             Data.CompanyData2.DriverData.Vehicles[1].VehicleData.strLicensePlate = `PP6961TT`;
//             Data.CompanyData2.DriverData.Vehicles[1].VehicleData.strVehicleID = `62900`;

            Data.DealData1.strClientCompanyName = Data.CompanyData1.strCompanyName;
            Data.DealData1.strClientCompanyCode = Data.CompanyData1.strCompanyCode;
            Data.DealData1.strClientCompanyID = Data.CompanyData1.strCompanyID;
            Data.DealData1.strOurCompanyWithClient =  Data.CompanyData1.ContractData.strContractOurCompany// `СТАВАНГЕР`;
            Data.DealData1.strCargoType = Data.CompanyData1.strCargoType;
            Data.DealData1.strCargoCost = Data.CompanyData1.strCargoCost;
            Data.DealData1.PointsLoading[0].PointLoading.strAddressFOX = Data.CompanyData1.LocationData1.strAddressFOX;
            Data.DealData1.PointsLoading[0].PointLoading.strAddressFOXfromGoogle = Data.CompanyData1.LocationData1.strAddressFOXfromGoogle;
            Data.DealData1.PointsLoading[0].PointLoading.fromCompany = true;
            Data.DealData1.PointsLoading[1].PointLoading.strAddressFOX = `Херсон`;
            Data.DealData1.PointsLoading[1].PointLoading.strAddressFOXfromGoogle = `вулиця Домобудівельна, Херсон, Херсонська область, Україна, 73000`;
            Data.DealData1.PointsLoading[1].PointLoading.fromCompany = false;
            Data.DealData1.PointsUnLoading[0].PointUnLoading.strAddressFOX = Data.CompanyData1.LocationData2.strAddressFOX;
            Data.DealData1.PointsUnLoading[0].PointUnLoading.strAddressFOXfromGoogle = Data.CompanyData1.LocationData2.strAddressFOXfromGoogle;
            Data.DealData1.PointsUnLoading[0].PointUnLoading.fromCompany = true;
            Data.DealData1.PointsUnLoading[1].PointUnLoading.strAddressFOX = `Одеса`;
            Data.DealData1.PointsUnLoading[1].PointUnLoading.strAddressFOXfromGoogle = `Хутірська вулиця, 70, Одеса, Одеська область, Україна, 65000`;
            Data.DealData1.PointsUnLoading[1].PointUnLoading.fromCompany = false;
            Data.DealData1.strResponsibleFOX = `Тестін Сергій`;
            Data.DealData1.strLogist = Data.LoginDataT.strUserLastName + ` ` + Data.LoginDataT.strUserFirstName + ` ` + Data.LoginDataT.strUserMiddleName;


            Data.DealData1.PointsUnLoading[0].PointUnLoading.strAddressFOXfromGoogle = Data.CompanyData1.LocationData2.strAddressFOXfromGoogle;
            Data.DealData1.strTransporterCompanyName = Data.CompanyData2.strCompanyName; // Заполнить ПЕРЕД выполнением Теста
            Data.DealData1.strTransporterCompanyCode = Data.CompanyData2.strCompanyCode; // Заполнить ПЕРЕД выполнением Теста
            Data.DealData1.strTransporterCompanyID = Data.CompanyData2.strCompanyID; // Заполнить ПЕРЕД выполнением Теста
            Data.DealData1.strOurCompanyWithTransporter = Data.CompanyData2.ContractData.strContractOurCompany; //`ПЕРЕВОЗ`;// `ТОВ "ТРАНСПАУЕР"`;//CompanyData2.ContractData.strContractOurCompany,//'СТАВАНГЕР',
            Data.DealData1.strOurCompanyWithTransporter = Data.CompanyData2.ContractData.strContractOurCompany;//'СТАВАНГЕР',
            Data.DealData1.strDriverFullName = Data.CompanyData2.DriverData.strLastName + ` `
                                             + Data.CompanyData2.DriverData.strFirstName + ` `
                                             + Data.CompanyData2.DriverData.strMiddleName;
            Data.DealData1.strContactDriverID = Data.CompanyData2.DriverData.strContactID;
            Data.DealData1.strDriverPhone = Data.CompanyData2.DriverData.PhoneData.strPhoneNumber;
            Data.DealData1.strLicensePlate1 = Data.CompanyData2.DriverData.Vehicles[0].VehicleData.strLicensePlate;
            Data.DealData1.strVehicleID = Data.CompanyData2.DriverData.Vehicles[0].VehicleData.strVehicleID;
            Data.DealData1.strLicensePlate2 = Data.CompanyData2.DriverData.Vehicles[1].VehicleData.strLicensePlate;
            Data.DealData1.strTrailerID = Data.CompanyData2.DriverData.Vehicles[1].VehicleData.strVehicleID;

            Data.DealData1 = await DealCNPage.DealCreateNew(browser, page, Data.DealData1);
        } // for(let i=1;i<=1000;i++) --------------------------------------------------------------
            //await TempStop(page);
            if (Data.DealData1.returnResult) {

                //12.1) Проверяем новую сделку
                Data.DealData1 = await DealCheckNPage.DealCheckNew(browser, page, Data.DealData1);

            }


            if(!g_ShowActionInBrowser){
                await browser.close();
            }
            fs_log.writeFileSync(g_LogFileName, g_StrOutLog);
            await TempStop(page, `---- Здесь index -----`);
            if (Data.DealData1.returnResult) {
                // 12.2) Устанавливаем статус сделки
                //Data.DealData1.strStatus = 'Экспортировано в фокс';
                //Data.DealData1 = await DealSetStatusPage.DealSetStatus(browser, page, Data.DealData1);
            }

// await console.log(`index TempStop`);
// await TempStop(page);
   //     } // for(let i=1;i<=1000;i++) --------------------------------------------------------------



        //await console.log(`Created => CompanyData1:`, CompanyData1);
        // X) Проверяем созданную тестовую компанию CompanyData1
        CompanyData1 = await CCheckNV2Page.CompanyCheckNewV2(browser, page, CompanyData1);
        if (!CompanyData1.returnResult) {
            throw `FAIL => CompanyCheckNewV2 (${CompanyData1.strCompanyCode})`;//<--специальный вызов ошибки!
        }



        // X) проверяем наличие тестовой компании CompanyData2
        returnResult = await CCEPage.CompanyCheckExist(page, CompanyData2.strCompanyCode);
        await console.log('\x1b[38;5;2m', "         CompanyCheckExist(", CompanyData2.strCompanyCode, ")=>", returnResult, '\x1b[0m');
        // X) создаём тестовую компанию CompanyData2
        CompanyData2 = await CCNV2Page.CompanyCreateNewV2(browser, page, CompanyData2);
        if (!CompanyData2.returnResult) {
            throw `Не получилось создать компанию (${CompanyData2.strCompanyCode})`;//<--специальный вызов ошибки!
        }
        //await console.log(`Created => CompanyData2:`,  CompanyData2);
        // X) Проверяем созданную тестовую компанию CompanyData2
        CompanyData2 = await CCheckNV2Page.CompanyCheckNewV2(page, CompanyData2);
        if (!CompanyData2.returnResult) {
            throw `FAIL => CompanyCheckNewV2 (${CodeCompany})`;//<--специальный вызов ошибки!
        }


        // X) Создаём нового Водителя V2
        DriverData = await DriverCNV2Page.DriverCreateNewV2(browser, page, DriverData);
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


        // X) Создаём Транспорт_1 (Тягач)
        VehicleData1 = await VehicleCNV2Page.VehicleCreateNewV2(browser, page, VehicleData1);
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

        // X) Создаём Транспорт_2 (Прицеп)
        VehicleData2 = await VehicleCNV2Page.VehicleCreateNewV2(browser, page, VehicleData2);
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


        //await page.waitFor(11000);
        DealData = await DealCNPage.DealCreateNew(browser, page, DealData);
        if (DealData.returnResult) {

            // 12.1) Проверяем новую сделку
            DealData = await DealCheckNPage.DealCheckNew(browser, page, DealData);
        }
        if (DealData.returnResult) {
            // 12.2) Устанавливаем статус сделки
            DealData.strStatus = 'Экспортировано в фокс';
            DealData = await DealSetStatusPage.DealSetStatus(browser, page, DealData);
        }

        // throw 'НЕ ОШИБКА => Тостер ВЫХОД ЗАПЛАНИРОВАННЫЙ OK!!!';

        //CFO Start -------------------------------------------------------------
    } // <--- temp!!!!!!!
        let strLoginCfoFoxURL = g_FrontCfoFoxURL + '/login';
        pageCfo = await LPage.BrowserGetPage(browser, strLoginCfoFoxURL);
        returnResult = await LPage.LoginCfo(pageCfo, LoginDataT);
        //await console.log(`LoginCfo returnResult=${returnResult}`);
        if (!returnResult) { // Если не получилось то логинимся под ROOT`ом
            await console.log(`FAIL => LoginCfo ${LoginDataT.strEmail}`);
            //await TempStop(pageCfo);
            throw `FAIL => LoginCfo ${LoginDataT.strEmail}`;
        }

        DealData = await CfoDealCheckNPage.CfoDealCheckNew(browser, pageCfo, DealData);
        if(!DealData.returnResult) {
            let tStr = `FAIL => CfoDealCheckNew ${DealData.returnStr}`;
            await console.log(tStr);
            //await TempStop(pageCfo);
            throw tStr;
        }

        //CFO END   -------------------------------------------------------------



        //------------END Для тестов------------------------------------------------------------------





    }catch (err0) {
        await console.log('\x1b[38;5;1m', "Ошибка:",err0, '\x1b[0m');
        g_StrOutLog+=`Ошибка: ${err0}\n`;
        await console.log('\x1b[38;5;1m', "Все остальные тесты не будут запущены!!! ", '\x1b[0m');
        g_StrOutLog+=`Все остальные тесты не будут запущены!!! \n`;
    }


    //await page.waitFor(5000);
    await browser.close();

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
