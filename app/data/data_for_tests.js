//require('../app/global_functions.js');
// require('../app/global_functions_cfo').global;
let SetAllDataVariables = async () => {
    try {

// Юзер 1 Данные для логина
LoginDataT = {
    strUserFirstName: 'Тест',
    strUserLastName: 'Тостер',
    strUserMiddleName: 'Тостерович',
    strLogin: 'test',
    strEmail: 'test@test.com',
    strPassword: '12345',
    //ResolvedFailLogin : true, // <- Можно или нельзя Фейлиться по Email или Пароль
    // Если можно то в случае (Неверный e-mail или пароль) +1 g_SuccessfulTests
    // Если нельзя то в случае (Неверный e-mail или пароль) +1 g_FailedTests
};
LoginDataR = {
    strUserLastName: 'Ярін',
    strUserFirstName: 'Кирило',
    strUserMiddleName: 'Олександрович',
    strEmail: 'yarin.k@transloyd.com',
    strPassword: 'e5oF7',
};
CompanyData1 = {
    strCodeCompany: await GetFunnyStr('StrCompanyCodeArray'),//'41038088'// '35054264',//'38351188', //CodeCompany, //CodeCompany, //38462049 нет сокр названия
    strCompanyID: '', // <= Заполнится автоматически при проверке Компании !!!
    strHref: '', // <= Заполнится автоматически при проверке Компании !!!
    strCompanyName: 'XXX',// <= Заполнится автоматически при создании Компании !!!
    strCompanyTypes: ['Заказчик'],//['Заказчик','Перевозчик','Экспедитор','Контрагент ТО',], //['Заказчик','Перевозчик','Экспедитор','Контрагент ТО',]
    strCargoType: 'Запчастини',
    strCargoPrice: '100500',
    strCargoVehicleType: `Тент`,
    strCargoVehicleCapacity0: `20`,
    strCargoVehicleCapacity1: `22`,
    strCargoVehicleVolume0: `85`,
    strCargoVehicleVolume1: `86`,
    strCargoLoadingTypes: ['Бокова','Задня',],
    boolIsOurCompany: false,
    boolNeedCheck: false,
    strManagers: [LoginDataT.strUserLastName, 'Гриневич'],
    strDelayDays: '7',
    strPaymentCondition: 'По банковским', // 'По календарным'
    ContractData: {
        strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
        strTransportationType: 'По Украине', // 'По Украине', 'Международная'
        strContractOurCompanyIs: 'Перевозчик', // 'Заказчик' , 'Перевозчик'
        strDelayDays: '7',
        strPaymentCondition: 'По банковским', // 'По банковским', 'По календарным'
    },
    LocationData: {
        strAddressFOX: 'Дрочево',
        strAddressTTN: 'Юридический адрес (Для ТТН и заявок) Дрочево',
        strCategory: ['Грузополучатель','Грузоотправитель','Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
        strLoadingTime: '2',
        strUnLoadingTime: '3',
        strLocationType: 'Склад',
        strIndustryType: 'Алкоголь',
        strContactName: 'АА Джамшут ББ',
        strCompanyName: 'ЧЛЕН',//CompanyData1.strCompanyName,//'',
        ContactData: {
            PhoneData: {
                strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                isTelegram: true,
                isViber : true,
                isSkype : true,
                isWhatsApp : true,
                isToplyvo : false,
                isRouming : false,
                isDefault : true,
                isFormer : false,
            },
            strINN: '' + await randomInt(1001001001, 9991999199),
            strContactType: `Кладовщик`,
            strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
            strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
            strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество


        },

    },
    strPhoneNumber: '38050' + await randomInt(1001010, 9989999),
    PhoneData: {
        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
        isTelegram: true,
        isViber : true,
        isSkype : true,
        isWhatsApp : true,
        isToplyvo : false,
        isRouming : false,
        isDefault : true,
        isFormer : false,
    },
    strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
    EmailData: {
        strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
        isSkype: true,
        isDefault : true,
    },
    strUrl: await GetFunnyUrl('Funny_Page_URL'),//'https://natribu.org/',//Funny_Page_URL
    strLink:await GetFunnyUrl('Funny_Page_URL') + '/x='+ await randomInt(1001010, 9989999),
    LinkData: {
        strLink:await GetFunnyUrl('Funny_Page_URL') + '/x='+ await randomInt(1001010, 9989999),
        strLinkType: 'Lardi',
        strDescription: 'Тест описания.',
    },
    strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
    strContractOurCompanyIs: 'Перевозчик',

    returnResult: false,
}; //  CompanyData1
//---------------------------------------------------------------------------------------------------------------------
CompanyData2 = {
    strCodeCompany: await GetFunnyStr('StrCompanyCodeArray'),//'38351188', //CodeCompany, //CodeCompany, //38462049 нет сокр названия
    strCompanyName: '',// <= Заполнится автоматически при создании Компании !!!
    strCompanyTypes: ['Перевозчик',], // Заказчик // Перевозчик // Экспедитор
    boolIsOurCompany: false,
    boolNeedCheck: false,
    strManagers: [LoginDataT.strUserLastName, 'Гриневич'],
    strDelayDays: '7',
    strPaymentCondition: 'По оригиналам банковских дней', // 'По оригиналам календарных дней'
    strPhoneNumber: '38050' + await randomInt(1001010, 9989999),
    strUrl: await GetFunnyUrl('Funny_Page_URL'),//'https://natribu.org/',//Funny_Page_URL
    strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
    strContractOurCompanyIs: 'Заказчик',

    returnResult: false,
}; // CompanyData2
//---------------------------------------------------------------------------------------------------------------------
DriverData = {
    typeWork: 0,
    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
    strDriverLicenseNumber: 'DLN' + RNum,
    strCompanyName: CompanyData2.strCompanyName, //'ТРАНСЛОЙД',
    strCodeCompany: CompanyData2.strCodeCompany,
};
//---------------------------------------------------------------------------------------------------------------------
// Тягач
VehicleData1 = {
    strLicensePlate: 'TE' + await randomInt(1000, 9999) + 'NU',
    strCarType: 'Тягач',
    strCarBrand: 'DAF',
    CompanyData: CompanyData2,//'Перевозчик',
    DriverData: DriverData,
};
//---------------------------------------------------------------------------------------------------------------------
// Прицеп
VehicleData2 = {
    strLicensePlate: 'TE' + await randomInt(1000, 9999) + 'NU',
    strCarType: 'Полуприцеп',
    strCarBrand: 'SCHMITZ',
    CompanyData: CompanyData2,//'Перевозчик',
    DriverData: DriverData,
};
//---------------------------------------------------------------------------------------------------------------------
DealData = {
    //strLicensePlate : 'TEST 3245 NUM',
    // strPointLoading : 'Хераково', //Хреново е //Сучки //Блядово //Хераково //Бодуны //Еблі //(Хуй Хуй)
    // strPointUnLoading : 'Дрочево', //Дрочево //Бухалово //Сискі //Сосуново //Сосунково //Матюково
    strPointLoading: await GetFunnyStr('StrAddress'), //StrAddress //StrAddressFunny
    strPointUnLoading: await GetFunnyStr('StrAddress'), //StrAddress //StrAddressFunny
    strTypeLoad: 'Алкоголь',
    strCargoCost: '100500',
    CompanyClient: CompanyData1,//'ОСНОВА',
    strOurCompanyClient: CompanyData1.strContractOurCompany,//'СТАВАНГЕР',
    ClientFreights: [{
        Amount: '10500',
        Type_0: 'Безготівково',
        Type_1: 'б/н с НДС',
        Currency: 'UAH',
        PaymentTerm: 'По оригиналам',
    },
        {Amount: '2400', Type_0: 'Готівкою', Type_1: 'софт', Currency: 'UAH', PaymentTerm: 'По выгрузке',},
    ],
    TransporterFreights: [{
        Amount: '8400',
        Type_0: 'Безготівково',
        Type_1: 'б/н с НДС',
        Currency: 'UAH',
        PaymentTerm: 'По оригиналам',
    },
        {Amount: '2100', Type_0: 'Готівкою', Type_1: 'софт', Currency: 'UAH', PaymentTerm: 'По выгрузке',},
    ],
    CompanyTransporter: CompanyData2,//'ЛЬВІВКУЛЬТТОВАРИ',
    strOurCompanyTransporter: CompanyData2.strContractOurCompany,//'ТРАНСЛОЙД',
    DriverFullData: DriverData,//'Курганов',
    strLicensePlate1: VehicleData1.strLicensePlate,//'BC3082EE',//DAF BC3082EE
    strLicensePlate2: VehicleData2.strLicensePlate,//'BC7519XO',// KRONE BC7519XO
    strFoxResponsible: 'Тостер',
    strLogistician: 'Тостер',
    strDealID: '',
    strStatus: '',
    returnResult: false,
    returnStr: '',
};
    } catch (e) {

    };

}
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
module.exports.SetAllDataVariables = SetAllDataVariables;
