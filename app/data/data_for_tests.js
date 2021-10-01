//require('../app/global_functions.js');
// require('../app/global_functions_cfo').global;
class DataForTests {
    constructor() {

    }
    async SetAllDataVariables() {
        // Юзер 1 Данные для логина
        this.LoginDataT = {
            strUserFirstName: 'Валентин',//'Валентин',// 'Тест', Синицький Валентин Петрович
            strUserLastName: 'Синицький',//'Синицький',// 'Тостер',
            strUserMiddleName: 'Петрович',//'Петрович',// 'Тостерович',
            strLogin: 'test',
            strEmail: 'sinickiy.v@transpower.app',//'sinickiy.v@transpower.app',//'test@test.com',
            strPassword: '12345',
            //ResolvedFailLogin : true, // <- Можно или нельзя Фейлиться по Email или Пароль
            // Если можно то в случае (Неверный e-mail или пароль) +1 g_SuccessfulTests
            // Если нельзя то в случае (Неверный e-mail или пароль) +1 g_FailedTests
        };//this.LoginDataT
        //--------------------------------------------------------------
        // Юзер 2 Данные для логина
        this.LoginDataR = {
            strUserLastName: 'Ярін',
            strUserFirstName: 'Кирило',
            strUserMiddleName: 'Олександрович',
            strEmail: 'yarin.k@transloyd.com',
            strPassword: 'e5oF7',
        };//this.LoginDataR
        //--------------------------------------------------------------
        //--------------------------------------------------------------
        this.CompanyData1 = {
            strCompanyCode: await GetFunnyStr('StrCompanyCodeArray'),//'41038088'// '35054264',//'38351188', //CodeCompany, //CodeCompany, //38462049 нет сокр названия
            strCompanyID: '', // <= Заполнится автоматически при проверке Компании !!!
            strCompanyHref: '', // <= Заполнится автоматически при проверке Компании !!!
            strCompanyName: 'XXX',// <= Заполнится автоматически при создании Компании !!!
            strCompanyTypes: ['Заказчик'],//['Заказчик','Перевозчик','Экспедитор','Контрагент ТО',], //['Заказчик','Перевозчик','Экспедитор','Контрагент ТО',]
            strCargoType: 'Запчастини',
            strCargoPrice: '100500',
            strCargoVehicleType: `Тент`,
            strCargoVehicleCapacity0: `20`,
            strCargoVehicleCapacity1: `22`,
            strCargoVehicleVolume0: `85`,
            strCargoVehicleVolume1: `86`,
            strCargoLoadingTypes: ['Бокова', 'Задня',],
            boolIsOurCompany: false,
            boolNeedCheck: false,
            strManagers: [this.LoginDataT.strUserLastName, 'Гриневич'],
            ContractData: {
                strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
                strTransportationType: 'По Украине', // 'По Украине', 'Международная'
                strContractOurCompanyIs: 'Перевозчик', // 'Заказчик' , 'Перевозчик'
                strDelayDays: '7',
                strPaymentCondition: 'По банковским', // 'По банковским', 'По календарным'
            },
            LocationData1: {
                strAddressFOX: await GetFunnyStr('StrAddressFunny'),//'Дрочево', 'StrAddress'
                strAddressFOXfromGoogle: ``,
                strAddressTTN: `Юридический адрес (Для ТТН и заявок)`,
                strCategory: ['Грузополучатель', 'Грузоотправитель', 'Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
                strLoadingTime: '2',
                strUnLoadingTime: '3',
                strLocationType: 'Склад',
                strIndustryType: 'Алкоголь',
                strContactName: 'АА Джамшут ББ',
                strCompanyName: 'ЧЛЕН',// Заполнить в перед созданием объекта из CompanyData !!!
                strCompanyCode: ``,// Заполнить в перед созданием объекта из CompanyData !!!
                strLocationName: `Название Локации1`,
                ContactData: {
                    PhoneData: {
                        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                        isTelegram: true,
                        isViber: true,
                        isSkype: true,
                        isWhatsApp: true,
                        isToplyvo: false,
                        isRouming: false,
                        isDefault: true,
                        isFormer: false,
                    },
                    strINN: '' + await randomInt(1001001001, 9991999199),
                    strContactType: `Логист`, // `Логист`,//`Кладовщик`, `Хозяин`, //
                    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                    strWorkOnCompany: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                    strWorkOnCompanyEDRPOU: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                },
            },
            LocationData2: {
                strAddressFOX: await GetFunnyStr('StrAddressFunny'),//'Дрочево', 'StrAddress'
                strAddressFOXfromGoogle: ``,
                strAddressTTN: `Юридический адрес (Для ТТН и заявок)`,
                strCategory: ['Грузополучатель', 'Грузоотправитель', 'Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
                strLoadingTime: '2',
                strUnLoadingTime: '3',
                strLocationType: 'Склад',
                strIndustryType: 'Алкоголь',
                strContactName: 'АА Джамшут ББ',
                strCompanyName: 'ЧЛЕН',// Заполнить в перед созданием объекта из CompanyData !!!
                strCompanyCode: ``,// Заполнить в перед созданием объекта из CompanyData !!!
                strLocationName: `Название Локации2`,
                ContactData: {
                    PhoneData: {
                        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                        isTelegram: true,
                        isViber: true,
                        isSkype: true,
                        isWhatsApp: true,
                        isToplyvo: false,
                        isRouming: false,
                        isDefault: true,
                        isFormer: false,
                    },
                    strINN: '' + await randomInt(1001001001, 9991999199),
                    strContactType: `Логист`, // `Логист`,//`Кладовщик`, // `Хозяин`,
                    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                    strWorkOnCompany: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                    strWorkOnCompanyEDRPOU: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                },
            },
            strPhoneNumber: '38050' + await randomInt(1001010, 9989999),
            PhoneData: {
                strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                isTelegram: true,
                isViber: true,
                isSkype: true,
                isWhatsApp: true,
                isToplyvo: false,
                isRouming: false,
                isDefault: true,
                isFormer: false,
            },
            strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
            EmailData: {
                strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
                isSkype: true,
                isDefault: true,
            },
            strUrl: await GetFunnyUrl('Funny_Page_URL'),//'https://natribu.org/',//Funny_Page_URL
            strLink: await GetFunnyUrl('Funny_Page_URL') + '/x=' + await randomInt(1001010, 9989999),
            LinkData: {
                strLink: await GetFunnyUrl('Funny_Page_URL') + '/x=' + await randomInt(1001010, 9989999),
                strLinkType: 'Lardi',
                strDescription: 'Тест описания.',
            },
            strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
            strContractOurCompanyIs: 'Перевозчик',

            returnResult: false,
        }; //  this.CompanyData1
        //------------------------------------------------------------------------------------------------------------
        this.CompanyData2 = {
            strCompanyCode: await GetFunnyStr('StrCompanyCodeArray'),//'41038088'// '35054264',//'38351188', //CodeCompany, //CodeCompany, //38462049 нет сокр названия
            strCompanyID: '', // <= Заполнится автоматически при проверке Компании !!!
            strCompanyHref: '', // <= Заполнится автоматически при проверке Компании !!!
            strCompanyName: 'XXX',// <= Заполнится автоматически при создании Компании !!!
            strCompanyTypes: ['Перевозчик'],//['Заказчик','Перевозчик','Экспедитор','Контрагент ТО',], //['Заказчик','Перевозчик','Экспедитор','Контрагент ТО',]
            strCargoType: 'Пляшка',//'Запчастини',
            strCargoPrice: '100100',
            strCargoVehicleType: `Тент`,
            strCargoVehicleCapacity0: `20`,
            strCargoVehicleCapacity1: `22`,
            strCargoVehicleVolume0: `85`,
            strCargoVehicleVolume1: `86`,
            strCargoLoadingTypes: ['Бокова', 'Задня',],
            boolIsOurCompany: false,
            boolNeedCheck: false,
            strManagers: [this.LoginDataT.strUserLastName, 'Гриневич'],
            ContractData: {
                strContractOurCompany: 'ПЕРЕВОЗ',//'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
                strTransportationType: 'По Украине', // 'По Украине', 'Международная'
                strContractOurCompanyIs: 'Заказчик', // 'Заказчик' , 'Перевозчик'
                strDelayDays: '3',
                strPaymentCondition: 'По календарным', // 'По банковским', 'По календарным'
            },
            DriverData: { // Водила <------- !!!!!!
                PhoneData: {
                    strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                    isTelegram: true,
                    isViber: true,
                    isSkype: true,
                    isWhatsApp: true,
                    isToplyvo: false,
                    isRouming: false,
                    isDefault: true,
                    isFormer: false,
                },
                strINN: '' + await randomInt(1001001001, 9991999199),
                strContactType: `Водитель`, // `Логист`,//`Кладовщик`, // `Хозяин`,
                strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                strFIO : ``, // <= Заполнится автоматически после создания Водителя из Компании !!!
                strContactID : ``, // <= Заполнится автоматически после создания Водителя из Компании !!!
                strWorkOnCompany: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                strWorkOnCompanyEDRPOU: ``, // Заполнить перед созданием объекта из CompanyData !!!
                strDriverLicenseNumber: `ПРВ` + await randomInt(100001, 999999),
                Vehicles: [
                    {
                        VehicleData: {
                            strLicensePlate: 'FF' + await randomInt(1000, 9999) + 'KK',
                            strVehicleID: ``, // Заполнить ПЕРЕД выполнением Теста
                            strRegistrationCertificateNumber: `XXX` + await randomInt(100000, 999999), // 3+6 !!!!
                            strVehicleType: 'Тягач',
                            strCarBrand: 'DAF', // 'MAN', 'VOLVO', 'IVECO', 'RENAULT', 'SCANIA',
                            strModel: 'XF ' + await randomInt(10, 99) + '.' + await randomInt(100, 999), //'XF 95 430', // 'XF 105.460',
                            strQuantityAxles: '2', // тягач, фургон 1-2 , прицепы 1-3 у остальных нет
                            strTypeOwner: 'Компания', // 'Контакт',
                            strDocument: 'Договор купли-продажи', // 'Неформально', 'По доверенности', 'По тех-пасспорту', 'Договор аренды нотариальный', '', '',
                            strSubjectOwner: '', // Заполнить перед созданием объекта из CompanyData !!!
                        }
                    },
                    {
                        VehicleData: {
                            strLicensePlate: 'PP' + await randomInt(1000, 9999) + 'TT',
                            strVehicleID: ``, // Заполнить ПЕРЕД выполнением Теста
                            strRegistrationCertificateNumber: `ZZZ` + await randomInt(100000, 999999), // 3+6 !!!!
                            strVehicleType: 'Напівпричіп',
                            strVehicleSubType: `Ізотерм`,//`Тент`, // `Реф`, `Ізотерм`, `Цільномет`, // `Контейнеровоз`,  (20,40,45 Футов)
                            strContainerType: `40 футів`, // `20 футів`, `40 футів`, `45 футів`,
                            strVehicleCapacity: `20`,
                            strVehicleVolume: `86`,
                            strLoadingTypes: ['Бокова', 'Задня',], // `Верхня`, `Повна`,
                            strCarBrand: 'SCHMITZ', // 'TRAILOR', 'KOEGEL', 'KRONE', 'WIELTON', 'SCHWARZMULLER',
                            strModel: 'XF ' + await randomInt(10, 99) + '.' + await randomInt(100, 999), //'XF 95 430', // 'XF 105.460',
                            strQuantityAxles: '2', // тягач, фургон 1-2 , прицепы 1-3 у остальных нет
                            strTypeOwner: 'Компания', // 'Контакт',
                            strDocument: 'Договор купли-продажи', // 'Неформально', 'По доверенности', 'По тех-пасспорту', 'Договор аренды нотариальный', '', '',
                            strSubjectOwner: '', // Заполнить перед созданием объекта из CompanyData !!!
                        }
                    },
                ],
            },// Водила <------- !!!!!!
            LocationData1: {
                strAddressFOX: await GetFunnyStr('StrAddressFunny'),//'Дрочево', 'StrAddress'
                strAddressFOXfromGoogle: ``,
                strAddressTTN: `Юридический адрес (Для ТТН и заявок)`,
                strCategory: ['Грузополучатель', 'Грузоотправитель', 'Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
                strLoadingTime: '2',
                strUnLoadingTime: '3',
                strLocationType: 'Склад',
                strIndustryType: 'Алкоголь',
                strContactName: 'АА Джамшут ББ',
                strCompanyName: 'ЧЛЕН',// Заполнить перед AddNewLocation из CompanyData !!!
                strCompanyCode: ``,// Заполнить в AddNewLocation из CompanyData !!!
                strLocationName: `Название Локации1`,
                ContactData: {
                    PhoneData: {
                        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                        isTelegram: true,
                        isViber: true,
                        isSkype: true,
                        isWhatsApp: true,
                        isToplyvo: false,
                        isRouming: false,
                        isDefault: true,
                        isFormer: false,
                    },
                    strINN: '' + await randomInt(1001001001, 9991999199),
                    strContactType: `Логист`, // `Логист`,//`Кладовщик`, `Хозяин`, //
                    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                    strWorkOnCompany: ``, // Заполнить в AddNewLocation из CompanyData !!!
                    strWorkOnCompanyEDRPOU: ``, // Заполнить в AddNewLocation из CompanyData !!!
                },
            },
            LocationData2: {
                strAddressFOX: await GetFunnyStr('StrAddressFunny'),//'Дрочево', 'StrAddress'
                strAddressFOXfromGoogle: ``,
                strAddressTTN: `Юридический адрес (Для ТТН и заявок)`,
                strCategory: ['Грузополучатель', 'Грузоотправитель', 'Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
                strLoadingTime: '2',
                strUnLoadingTime: '3',
                strLocationType: 'Склад',
                strIndustryType: 'Алкоголь',
                strContactName: 'АА Джамшут ББ',
                strCompanyName: 'ЧЛЕН',// Заполнить в AddNewLocation из CompanyData !!!
                strCompanyCode: ``,// Заполнить в AddNewLocation из CompanyData !!!
                strLocationName: `Название Локации2`,
                ContactData: {
                    PhoneData: {
                        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                        isTelegram: true,
                        isViber: true,
                        isSkype: true,
                        isWhatsApp: true,
                        isToplyvo: false,
                        isRouming: false,
                        isDefault: true,
                        isFormer: false,
                    },
                    strINN: '' + await randomInt(1001001001, 9991999199),
                    strContactType: `Логист`, // `Логист`,//`Кладовщик`, // `Хозяин`,
                    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                    strWorkOnCompany: ``, // Заполнить в AddNewLocation из CompanyData !!!
                    strWorkOnCompanyEDRPOU: ``, // Заполнить в AddNewLocation из CompanyData !!!
                },
            },
            strPhoneNumber: '38050' + await randomInt(1001010, 9989999),
            PhoneData: {
                strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                isTelegram: true,
                isViber: true,
                isSkype: true,
                isWhatsApp: true,
                isToplyvo: false,
                isRouming: false,
                isDefault: true,
                isFormer: false,
            },
            strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
            EmailData: {
                strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
                isSkype: true,
                isDefault: true,
            },
            strUrl: await GetFunnyUrl('Funny_Page_URL'),//'https://natribu.org/',//Funny_Page_URL
            strLink: await GetFunnyUrl('Funny_Page_URL') + '/x=' + await randomInt(1001010, 9989999),
            LinkData: {
                strLink: await GetFunnyUrl('Funny_Page_URL') + '/x=' + await randomInt(1001010, 9989999),
                strLinkType: 'Lardi',
                strDescription: 'Тест описания.',
            },
            strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
            strContractOurCompanyIs: 'Перевозчик',

            returnResult: false,
        }; //  this.CompanyData2
        //---------------------------------------------------------------------------
        this.DealData1 = {
            strClientCompanyName : ``, // Заполнить ПЕРЕД выполнением Теста
            strClientCompanyCode : ``, // Заполнить ПЕРЕД выполнением Теста
            strClientCompanyID : ``, // Заполнить ПЕРЕД выполнением Теста
            strOurCompanyWithClient: ``,//CompanyData1.strContractOurCompany,//'СТАВАНГЕР',
            strCargoName: `Поліетилен`, //'Алкоголь',
            strCargoCost: `450000`, //'100500',
            AutoCompleteCargo: true, // false
            strLevelMonitoringMC: 'Максимальный (Ночью на охраняемых)', // 'Автоматически', 'Максимальный (Ночью на охраняемых)', 'Максимальный (Движение ночью разрешено)',
            // 'Средний (Движение ночью разрешено)', 'Низкий', 'Не контролировать', 'Средний (Ночью на охраняемых)', 'Контроль загрузки и выгрузки',

            ClientFreights: [{
                Amount: '10500',
                PaymentForm: `з ПДВ 20%`, // 'без ПДВ', `з ПДВ 0%`, `з ПДВ 20%`, `нал`, `софт`, `топливо`,
                AdditionalConditionPayment: 'По оригіналам',// `Аванс`, `Інше`, `По завантаженню`, `По оригіналам`, `По сканокопіям`, `По ТТН`, ``, ``,
                Currency: 'UAH',
            },
                // {
                //     Amount: '10700',
                //     PaymentForm: `з ПДВ 0%`, // 'без ПДВ', `з ПДВ 0%`, `з ПДВ 20%`, `нал`, `софт`, `топливо`,
                //     AdditionalConditionPayment: 'По завантаженню',// `Аванс`, `Інше`, `По завантаженню`, `По оригіналам`, ``, ``, ``, ``,
                //     Currency: 'UAH',
                // },
            ],
            TransporterFreights: [{
                Amount: '7500',
                PaymentForm: `софт`, // 'без ПДВ', `з ПДВ 0%`, `з ПДВ 20%`, `нал`, `софт`, `топливо`,
                AdditionalConditionPayment: 'По завантаженню',// `Аванс`, `Інше`, `По завантаженню`, `По оригіналам`, ``, ``, ``, ``,
                Currency: 'UAH',
            },
                {
                    Amount: '500',
                    PaymentForm: `софт`, // 'без ПДВ', `з ПДВ 0%`, `з ПДВ 20%`, `нал`, `софт`, `топливо`,
                    AdditionalConditionPayment: 'По оригіналам',// `Аванс`, `Інше`, `По завантаженню`, `По оригіналам`, ``, ``, ``, ``,
                    Currency: 'UAH',
                },
            ],
            PointsLoading : [
                {
                    PointLoading : {
                        strAddressFOX: `Бодуны`,//await GetFunnyStr('StrAddress'),
                        strAddressFOXfromGoogle: ``,

                    }
                },
                {
                    PointLoading : {
                        strAddressFOX: `Хераково`,//await GetFunnyStr('StrAddress'),
                        strAddressFOXfromGoogle: ``,
                    }
                }
            ],
            PointsUnLoading : [
                {
                    PointUnLoading : {
                        strAddressFOX: `Сучки`,//await GetFunnyStr('StrAddress'),
                        strAddressFOXfromGoogle: ``,
                    }
                },
                {
                    PointUnLoading : {
                        strAddressFOX: `Дрочево`,//await GetFunnyStr('StrAddress'),
                        strAddressFOXfromGoogle: ``,
                    }
                }
            ],

            //strLicensePlate : 'TEST 3245 NUM',
            // strPointLoading : 'Хераково', //Хреново е //Сучки //Блядово //Хераково //Бодуны //Еблі //(Хуй Хуй)
            // strPointUnLoading : 'Дрочево', //Дрочево //Бухалово //Сискі //Сосуново //Сосунково //Матюково
            strPointLoading: await GetFunnyStr('StrAddress'), //StrAddress //StrAddressFunny
            strPointUnLoading: await GetFunnyStr('StrAddress'), //StrAddress //StrAddressFunny
          //  CompanyClient: ``,//CompanyData1,//'ОСНОВА',

// Transporter
            strTransporterType: 'Компания', // 'Контакт',
            strTransporterCompanyName : ``, // Заполнить ПЕРЕД выполнением Теста
            strTransporterCompanyCode : ``, // Заполнить ПЕРЕД выполнением Теста
            strTransporterCompanyID : ``, // Заполнить ПЕРЕД выполнением Теста
            strOurCompanyWithTransporter: ``,//CompanyData1.strContractOurCompany,//'СТАВАНГЕР',

            strDriverFullName: ``,// Заполнить ПЕРЕД выполнением Теста
            strDriverPhone: ``,// Заполнить ПЕРЕД выполнением Теста
            strContactDriverID: ``, // Заполнить ПЕРЕД выполнением Теста
            strLicensePlate1: ``,//VehicleData1.strLicensePlate,//'BC3082EE',//DAF BC3082EE
            strVehicleID: ``, // Заполнить ПЕРЕД выполнением Теста
            strLicensePlate2: ``,//VehicleData2.strLicensePlate,//'BC7519XO',// KRONE BC7519XO
            strTrailerID: ``, // Заполнить ПЕРЕД выполнением Теста
            strFoxResponsible: 'Тостер',
            strLogist: 'Тостер',
            strDealID: '',
            strStatus: '',
            returnResult: false,
            returnStr: '',
        };//this.DealData1 -----------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------


    }// SetAllDataVariables()
};// class DataForTests
//===============================================================================================
let SetAllDataVariables = async () => {
    try {
        //
       // strDialogMessage = ``;
// путь к папке скриншотов
       // PathSS = `screenshots/`;


        //--------------------------------------------------------------
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
            strCargoLoadingTypes: ['Бокова', 'Задня',],
            boolIsOurCompany: false,
            boolNeedCheck: false,
            strManagers: [LoginDataT.strUserLastName, 'Гриневич'],
            ContractData: {
                strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
                strTransportationType: 'По Украине', // 'По Украине', 'Международная'
                strContractOurCompanyIs: 'Перевозчик', // 'Заказчик' , 'Перевозчик'
                strDelayDays: '7',
                strPaymentCondition: 'По банковским', // 'По банковским', 'По календарным'
            },
            LocationData1: {
                strAddressFOX: await GetFunnyStr('StrAddressFunny'),//'Дрочево', 'StrAddress'
                strAddressFOXfromGoogle: ``,
                strAddressTTN: `Юридический адрес (Для ТТН и заявок)`,
                strCategory: ['Грузополучатель', 'Грузоотправитель', 'Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
                strLoadingTime: '2',
                strUnLoadingTime: '3',
                strLocationType: 'Склад',
                strIndustryType: 'Алкоголь',
                strContactName: 'АА Джамшут ББ',
                strCompanyName: 'ЧЛЕН',// Заполнить в перед созданием объекта из CompanyData !!!
                strCodeCompany: ``,// Заполнить в перед созданием объекта из CompanyData !!!
                strLocationName: `Название Локации1`,
                ContactData: {
                    PhoneData: {
                        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                        isTelegram: true,
                        isViber: true,
                        isSkype: true,
                        isWhatsApp: true,
                        isToplyvo: false,
                        isRouming: false,
                        isDefault: true,
                        isFormer: false,
                    },
                    strINN: '' + await randomInt(1001001001, 9991999199),
                    strContactType: `Логист`, // `Логист`,//`Кладовщик`, `Хозяин`, //
                    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                    strWorkOnCompany: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                    strWorkOnCompanyEDRPOU: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                },
            },
            LocationData2: {
                strAddressFOX: await GetFunnyStr('StrAddressFunny'),//'Дрочево', 'StrAddress'
                strAddressFOXfromGoogle: ``,
                strAddressTTN: `Юридический адрес (Для ТТН и заявок)`,
                strCategory: ['Грузополучатель', 'Грузоотправитель', 'Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
                strLoadingTime: '2',
                strUnLoadingTime: '3',
                strLocationType: 'Склад',
                strIndustryType: 'Алкоголь',
                strContactName: 'АА Джамшут ББ',
                strCompanyName: 'ЧЛЕН',// Заполнить в перед созданием объекта из CompanyData !!!
                strCodeCompany: ``,// Заполнить в перед созданием объекта из CompanyData !!!
                strLocationName: `Название Локации2`,
                ContactData: {
                    PhoneData: {
                        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                        isTelegram: true,
                        isViber: true,
                        isSkype: true,
                        isWhatsApp: true,
                        isToplyvo: false,
                        isRouming: false,
                        isDefault: true,
                        isFormer: false,
                    },
                    strINN: '' + await randomInt(1001001001, 9991999199),
                    strContactType: `Логист`, // `Логист`,//`Кладовщик`, // `Хозяин`,
                    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                    strWorkOnCompany: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                    strWorkOnCompanyEDRPOU: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                },
            },
            strPhoneNumber: '38050' + await randomInt(1001010, 9989999),
            PhoneData: {
                strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                isTelegram: true,
                isViber: true,
                isSkype: true,
                isWhatsApp: true,
                isToplyvo: false,
                isRouming: false,
                isDefault: true,
                isFormer: false,
            },
            strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
            EmailData: {
                strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
                isSkype: true,
                isDefault: true,
            },
            strUrl: await GetFunnyUrl('Funny_Page_URL'),//'https://natribu.org/',//Funny_Page_URL
            strLink: await GetFunnyUrl('Funny_Page_URL') + '/x=' + await randomInt(1001010, 9989999),
            LinkData: {
                strLink: await GetFunnyUrl('Funny_Page_URL') + '/x=' + await randomInt(1001010, 9989999),
                strLinkType: 'Lardi',
                strDescription: 'Тест описания.',
            },
            strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
            strContractOurCompanyIs: 'Перевозчик',

            returnResult: false,
        }; //  CompanyData1
        //---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
        CompanyData2 = {
            strCodeCompany: await GetFunnyStr('StrCompanyCodeArray'),//'41038088'// '35054264',//'38351188', //CodeCompany, //CodeCompany, //38462049 нет сокр названия
            strCompanyID: '', // <= Заполнится автоматически при проверке Компании !!!
            strHref: '', // <= Заполнится автоматически при проверке Компании !!!
            strCompanyName: 'XXX',// <= Заполнится автоматически при создании Компании !!!
            strCompanyTypes: ['Перевозчик'],//['Заказчик','Перевозчик','Экспедитор','Контрагент ТО',], //['Заказчик','Перевозчик','Экспедитор','Контрагент ТО',]
            strCargoType: 'Пляшка',//'Запчастини',
            strCargoPrice: '100100',
            strCargoVehicleType: `Тент`,
            strCargoVehicleCapacity0: `20`,
            strCargoVehicleCapacity1: `22`,
            strCargoVehicleVolume0: `85`,
            strCargoVehicleVolume1: `86`,
            strCargoLoadingTypes: ['Бокова', 'Задня',],
            boolIsOurCompany: false,
            boolNeedCheck: false,
            strManagers: [LoginDataT.strUserLastName, 'Гриневич'],
            ContractData: {
                strContractOurCompany: 'ПЕРЕВОЗ',//'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
                strTransportationType: 'По Украине', // 'По Украине', 'Международная'
                strContractOurCompanyIs: 'Заказчик', // 'Заказчик' , 'Перевозчик'
                strDelayDays: '3',
                strPaymentCondition: 'По календарным', // 'По банковским', 'По календарным'
            },
            DriverData: { // Водила <------- !!!!!!
                PhoneData: {
                    strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                    isTelegram: true,
                    isViber: true,
                    isSkype: true,
                    isWhatsApp: true,
                    isToplyvo: false,
                    isRouming: false,
                    isDefault: true,
                    isFormer: false,
                },
                strINN: '' + await randomInt(1001001001, 9991999199),
                strContactType: `Водитель`, // `Логист`,//`Кладовщик`, // `Хозяин`,
                strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                strWorkOnCompany: ``, // Заполнить в перед созданием объекта из CompanyData !!!
                strWorkOnCompanyEDRPOU: ``, // Заполнить перед созданием объекта из CompanyData !!!
                strDriverLicenseNumber: `ПРВ` + await randomInt(100001, 999999),
                Vehicles: [
                    {
                        VehicleData: {
                            strLicensePlate: 'FF' + await randomInt(1000, 9999) + 'KK',
                            strRegistrationCertificateNumber: `XXX` + await randomInt(100000, 999999), // 3+6 !!!!
                            strVehicleType: 'Тягач',
                            strCarBrand: 'DAF', // 'MAN', 'VOLVO', 'IVECO', 'RENAULT', 'SCANIA',
                            strModel: 'XF ' + await randomInt(10, 99) + '.' + await randomInt(100, 999), //'XF 95 430', // 'XF 105.460',
                            strQuantityAxles: '2', // тягач, фургон 1-2 , прицепы 1-3 у остальных нет
                            strTypeOwner: 'Компания', // 'Контакт',
                            strDocument: 'Договор купли-продажи', // 'Неформально', 'По доверенности', 'По тех-пасспорту', 'Договор аренды нотариальный', '', '',
                            strSubjectOwner: '', // Заполнить перед созданием объекта из CompanyData !!!
                        }
                    },
                    {
                        VehicleData: {
                            strLicensePlate: 'PP' + await randomInt(1000, 9999) + 'TT',
                            strRegistrationCertificateNumber: `ZZZ` + await randomInt(100000, 999999), // 3+6 !!!!
                            strVehicleType: 'Напівпричіп',
                            strVehicleSubType: `Ізотерм`,//`Тент`, // `Реф`, `Ізотерм`, `Цільномет`, // `Контейнеровоз`,  (20,40,45 Футов)
                            strContainerType: `40 футів`, // `20 футів`, `40 футів`, `45 футів`,
                            strVehicleCapacity: `20`,
                            strVehicleVolume: `86`,
                            strLoadingTypes: ['Бокова', 'Задня',], // `Верхня`, `Повна`,
                            strCarBrand: 'SCHMITZ', // 'TRAILOR', 'KOEGEL', 'KRONE', 'WIELTON', 'SCHWARZMULLER',
                            strModel: 'XF ' + await randomInt(10, 99) + '.' + await randomInt(100, 999), //'XF 95 430', // 'XF 105.460',
                            strQuantityAxles: '2', // тягач, фургон 1-2 , прицепы 1-3 у остальных нет
                            strTypeOwner: 'Компания', // 'Контакт',
                            strDocument: 'Договор купли-продажи', // 'Неформально', 'По доверенности', 'По тех-пасспорту', 'Договор аренды нотариальный', '', '',
                            strSubjectOwner: '', // Заполнить перед созданием объекта из CompanyData !!!
                        }
                    },
                ],
            },// Водила <------- !!!!!!
            LocationData1: {
                strAddressFOX: await GetFunnyStr('StrAddressFunny'),//'Дрочево', 'StrAddress'
                strAddressFOXfromGoogle: ``,
                strAddressTTN: `Юридический адрес (Для ТТН и заявок)`,
                strCategory: ['Грузополучатель', 'Грузоотправитель', 'Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
                strLoadingTime: '2',
                strUnLoadingTime: '3',
                strLocationType: 'Склад',
                strIndustryType: 'Алкоголь',
                strContactName: 'АА Джамшут ББ',
                strCompanyName: 'ЧЛЕН',// Заполнить перед AddNewLocation из CompanyData !!!
                strCodeCompany: ``,// Заполнить в AddNewLocation из CompanyData !!!
                strLocationName: `Название Локации1`,
                ContactData: {
                    PhoneData: {
                        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                        isTelegram: true,
                        isViber: true,
                        isSkype: true,
                        isWhatsApp: true,
                        isToplyvo: false,
                        isRouming: false,
                        isDefault: true,
                        isFormer: false,
                    },
                    strINN: '' + await randomInt(1001001001, 9991999199),
                    strContactType: `Логист`, // `Логист`,//`Кладовщик`, `Хозяин`, //
                    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                    strWorkOnCompany: ``, // Заполнить в AddNewLocation из CompanyData !!!
                    strWorkOnCompanyEDRPOU: ``, // Заполнить в AddNewLocation из CompanyData !!!
                },
            },
            LocationData2: {
                strAddressFOX: await GetFunnyStr('StrAddressFunny'),//'Дрочево', 'StrAddress'
                strAddressFOXfromGoogle: ``,
                strAddressTTN: `Юридический адрес (Для ТТН и заявок)`,
                strCategory: ['Грузополучатель', 'Грузоотправитель', 'Перевозчик'], // ['Грузополучатель','Грузоотправитель','Перевозчик'],
                strLoadingTime: '2',
                strUnLoadingTime: '3',
                strLocationType: 'Склад',
                strIndustryType: 'Алкоголь',
                strContactName: 'АА Джамшут ББ',
                strCompanyName: 'ЧЛЕН',// Заполнить в AddNewLocation из CompanyData !!!
                strCodeCompany: ``,// Заполнить в AddNewLocation из CompanyData !!!
                strLocationName: `Название Локации2`,
                ContactData: {
                    PhoneData: {
                        strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                        isTelegram: true,
                        isViber: true,
                        isSkype: true,
                        isWhatsApp: true,
                        isToplyvo: false,
                        isRouming: false,
                        isDefault: true,
                        isFormer: false,
                    },
                    strINN: '' + await randomInt(1001001001, 9991999199),
                    strContactType: `Логист`, // `Логист`,//`Кладовщик`, // `Хозяин`,
                    strLastName: await GetFunnyStr('StrLastNameFunny'),//Фамилия
                    strFirstName: await GetFunnyStr('StrFirstNameFunny'),//Имя
                    strMiddleName: await GetFunnyStr('StrMiddleNameFunny'),//Отчество
                    strWorkOnCompany: ``, // Заполнить в AddNewLocation из CompanyData !!!
                    strWorkOnCompanyEDRPOU: ``, // Заполнить в AddNewLocation из CompanyData !!!
                },
            },
            strPhoneNumber: '38050' + await randomInt(1001010, 9989999),
            PhoneData: {
                strPhoneNumber: '38067' + await randomInt(1001010, 9989999),
                isTelegram: true,
                isViber: true,
                isSkype: true,
                isWhatsApp: true,
                isToplyvo: false,
                isRouming: false,
                isDefault: true,
                isFormer: false,
            },
            strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
            EmailData: {
                strEmail: 'mail' + await randomInt(1001010, 9989999) + '@test.gmail',
                isSkype: true,
                isDefault: true,
            },
            strUrl: await GetFunnyUrl('Funny_Page_URL'),//'https://natribu.org/',//Funny_Page_URL
            strLink: await GetFunnyUrl('Funny_Page_URL') + '/x=' + await randomInt(1001010, 9989999),
            LinkData: {
                strLink: await GetFunnyUrl('Funny_Page_URL') + '/x=' + await randomInt(1001010, 9989999),
                strLinkType: 'Lardi',
                strDescription: 'Тест описания.',
            },
            strContractOurCompany: 'СТАВАНГЕР',// СТАВАНГЕР // ТРАНСЛОЙД //
            strContractOurCompanyIs: 'Перевозчик',

            returnResult: false,
        }; //  CompanyData2
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
        };// VehicleData2
        //---------------------------------------------------------------------------
        DealData1 = {
            //strLicensePlate : 'TEST 3245 NUM',
            // strPointLoading : 'Хераково', //Хреново е //Сучки //Блядово //Хераково //Бодуны //Еблі //(Хуй Хуй)
            // strPointUnLoading : 'Дрочево', //Дрочево //Бухалово //Сискі //Сосуново //Сосунково //Матюково
            strPointLoading: await GetFunnyStr('StrAddress'), //StrAddress //StrAddressFunny
            strPointUnLoading: await GetFunnyStr('StrAddress'), //StrAddress //StrAddressFunny
            strTypeLoad: 'Алкоголь',
            strCargoCost: '100500',
            CompanyClient: ``,//CompanyData1,//'ОСНОВА',
            strOurCompanyClient: ``,//CompanyData1.strContractOurCompany,//'СТАВАНГЕР',
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
            CompanyTransporter: ``,//CompanyData2,//'ЛЬВІВКУЛЬТТОВАРИ',
            strOurCompanyTransporter: ``,// CompanyData2.strContractOurCompany,//'ТРАНСЛОЙД',
            DriverFullData: ``,//DriverData,//'Курганов',
            strLicensePlate1: ``,//VehicleData1.strLicensePlate,//'BC3082EE',//DAF BC3082EE
            strLicensePlate2: ``,//VehicleData2.strLicensePlate,//'BC7519XO',// KRONE BC7519XO
            strFoxResponsible: 'Тостер',
            strLogist: 'Тостер',
            strDealID: '',
            strStatus: '',
            returnResult: false,
            returnStr: '',
        };
        // DealData1 ---------------------------------------------------------------------------------------------------



//

    } catch (e) {

    };

};// SetAllDataVariables
//---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
module.exports.SetAllDataVariables = SetAllDataVariables;
module.exports = {DataForTests};

