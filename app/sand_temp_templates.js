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
MyFilePath = await SaveTempPictureFromRandomURL(browser, 'TrollFaceURL', -1);
RNum = randomInt(1000, 9999);
strLastName = 'Фамилия'+ RNum;
strFirstName = 'Имя' + RNum;
returnResult = await ContactCNPage.ContactCreateNew(page,0,strLastName,strFirstName, MyFilePath);
await DeleteTempPicture(MyFilePath);


// 6) проверяем наличие тестовой компании
// CodeCompany = '40720837';//40686262//40894612//40864216//40992677//40802689//33322524//33343916//33693475//26388251
CodeCompany = '40465590';//40686262 -//40894612 +//40864216//40992677//40802689//33322524//33343916//33693475//26388251
//38462049//38977165//32603291//35898620//40465590

//StrCompanyCodeArray
CodeCompany = await GetFunnyStr('StrCompanyCodeArray');
returnResult = await CCEPage.CompanyCheckExist(page, CodeCompany);
await console.log('\x1b[38;5;2m', "         CompanyCheckExist(",CodeCompany,")=>", returnResult , '\x1b[0m');
//await page.waitFor(1000111);
// if (!returnResult) { // компания не найдена создадим её
//     returnResult = await CCNPage.CompanyCreateNew(page, CodeCompany);
//     await console.log('\x1b[38;5;2m', "         CompanyCreateNew(",CodeCompany,")=>", returnResult , '\x1b[0m');
//     if (!returnResult) {
//         throw `Не получилось создать компанию (${CodeCompany})`;//<--специальный вызов ошибки!
//     }
// }
// 7) Пробуем отредактировать и сохранить тестовую компанию без обязательных полей
if (returnResult) {
    returnResult = await CWEPage.CompanyWrongEdit(page, CodeCompany);
}


CompanyData1 = {
    strCompanyCode : strCompanyCode,
    strCompanyTypes : [ 'Заказчик' , 'Перевозчик', ], // Заказчик // Перевозчик // Экспедитор
    boolIsOurCompany : false,
    boolNeedCheck : false,
    strManagers : [ LoginDataT.strUserLastName, 'Гриневич'],
    strDelayDays : '7',
    strPaymentCondition : 'По оригиналам банковских дней', // 'По оригиналам календарных дней'

    returnResult : false,
};
CompanyData1 = await CCNV2Page.CompanyCreateNewV2(browser, page, CompanyData1);
await console.log("CompanyData1(",CodeCompany,")=>", CompanyData1);
if (!CompanyData1.returnResult) {

    await console.log(`Не получилось создать компанию (${CodeCompany}) \n`, CompanyData1);
    //throw `Не получилось создать компанию (${CodeCompany})`;//<--специальный вызов ошибки!
}else {
    CompanyData1 = await CCheckNV2Page.CompanyCheckNewV2(page, CompanyData1);
}



// 8) Создаём нового Водителя V2
RNum = randomInt(1000, 9999);
// RNum = 3546;
//await GetFunnyStr('StrFirstNameFunny');
//let tempStrLN = 'ВодФам'+ RNum;
DriverData = {
    typeWork : 0,
    strLastName : await GetFunnyStr('StrLastNameFunny'),//Фамилия
    strFirstName : await GetFunnyStr('StrFirstNameFunny'),//Имя
    strMiddleName : await GetFunnyStr('StrMiddleNameFunny'),//Отчество
    strDriverLicenseNumber : 'DLN' + RNum,
    strCompanyName : 'ТРАНСЛОЙД',

};
DriverData = await DriverCNV2Page.DriverCreateNewV2(browser,page,DriverData);
// 9) Проверяем нового водителя
if (DriverData.returnResult) {
    DriverData = await DriverCheckNV2Page.DriverCheckNewV2(browser, page, DriverData);
}
/*
        // 10) Создаём Транспорт
        RNum = randomInt(1000, 9999);
        strLicensePlate = 'Тест '+ RNum + ' Ном';

        returnResult = await VehicleCNPage.VehicleCreateNew(browser,page,strLicensePlate);
*/
// 10) Создаём Транспорт
RNum = randomInt(1000, 9999);
strLicensePlate = 'TEST'+ RNum + 'NUM';
VehicleData1 = {
    strLicensePlate: strLicensePlate,
    strCarType: 'Тягач',
    strCarBrand: 'DAF',
    strCompanyName : 'ТРАНСЛОЙД',
};
VehicleData1 = await VehicleCNV2Page.VehicleCreateNewV2(browser,page,VehicleData1);
//await console.log("returnResultObject",VehicleData1);
// 11) Проверяем только что созданный Транспорт
if (VehicleData1.returnResult) {
    VehicleData1 = await VehicleCheckNV2Page.VehicleCheckNewV2(browser, page, VehicleData1);
}
//await console.log("returnResultObject",VehicleData1);

// 12) Создаём новую сделку
DealData = {
    //strLicensePlate : 'TEST 3245 NUM',
    // strPointLoading : 'Хераково', //Хреново е //Сучки //Блядово //Хераково //Бодуны //Еблі //(Хуй Хуй)
    // strPointUnLoading : 'Дрочево', //Дрочево //Бухалово //Сискі //Сосуново //Сосунково //Матюково
    strPointLoading : await GetFunnyStr('StrAddressFunny'),
    strPointUnLoading : await GetFunnyStr('StrAddressFunny'),
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
