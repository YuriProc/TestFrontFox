global.g_width = 1700;
global.g_height = 900;
//global.g_tempNum = 0;
global.g_setListener = false;
global.g_tempDataEventListenerFunctionHandle = null;
global.g_tempDataFromEventListener_id = false;
global.g_tempDataFromEventListener_requestUrl_func = ``;
global.g_tempDataFromEventListener_requestUrl = ``;
global.g_tempDataFromEventListener_response = ``;
global.g_tempDataFromEventListener_json = ``;
//---
global.g_tempTimeStart = ``;
//---
global.g_RecEventListener = {
    setListener : false,
    startTime:``,
    timeAll:``,
    EventListenerFunctionHandle : null,
    requestUrlsArrayLength: 0, // 0 .. 10 , 0 - массив очищен
    requestUrls:              [``,``,``,``,``,``,``,``,``,``], // 10 штук // Передаваемый в слушатель реквест для поиска и сравнения
    EventListener_responses:  [``,``,``,``,``,``,``,``,``,``], // 10 штук
    EventListener_jsons:      [``,``,``,``,``,``,``,``,``,``], // 10 штук
    EventListener_requestUrls:[``,``,``,``,``,``,``,``,``,``], // 10 штук // Фактический Реквест на который сработал слушатель

};


global.g_strDialogMessage = ``;
global.g_strDialogInitiator = ``;

global.g_SSNum = 0;
global.g_PathSS = `screenshots/`;

// in file config.config

// global.gname_FrontCrmFoxURL = 'FRONT_CRM_FOX_URL';
// global.g_FrontCrmFoxURL = '';

global.gname_FrontCfoFoxURL = 'FRONT_CFO_FOX_URL';
global.g_FrontCfoFoxURL = '';

global.gname_BackCfoFoxURL = 'BACK_CFO_FOX_URL';
global.g_BackCfoFoxURL = '';

global.gname_ShowActionInBrowser = 'SHOW_ACTION_IN_BROWSER';
global.g_ShowActionInBrowser = true;

global.gname_OutToLogFile = 'OUT_TO_LOG_FILE';
global.g_OutToLogFile = false;

global.gname_LogFileName = 'LOG_FILE_NAME';
global.g_LogFileName = 'test_log.log';

global.gname_CheckFileName = 'CHECK_FILE_NAME';
global.g_CheckFileName = 'test_check.check';

global.gname_TestVar = 'TEST_VAR';
global.g_TestVar = 'test';

// String For Out To Log File
global.g_StartTimeMS = new Date(Date.now());
global.g_StrOutLog = `Start LOG File ${g_StartTimeMS}\n`;

// statuses and counts of tests
global.g_StatusCurrentTest = 'NoStatus';
global.g_LaunchedTests = 0;
global.g_SuccessfulTests = 0;
global.g_FailedTests = 0;
// global.g_NumberCurrentTest = 0;
// global.g_CountTest = 0;

// Объект из массивов URL для фоток

// бутылка в ...
// https://s018.radikal.ru/i523/1712/1b/225524e93f9a.png

global.g_ArrayURL = {
    'TrollFaceURL'  : [
        'https://i.pinimg.com/474x/b3/df/2d/b3df2d48524d4e18ac7041d1a463d533.jpg',
        'https://cdn190.picsart.com/230633688092212.png?r1024x1024',
        'https://c7.hotpng.com/preview/109/835/772/internet-troll-rage-comic-trollface-smiley-troll-thumbnail.jpg',
        'https://c7.hotpng.com/preview/410/732/840/rage-comic-internet-troll-internet-meme-desktop-wallpaper-picture-troll-face-png-thumbnail.jpg',
        'https://data.topquizz.com/distant/quizz/big/3/5/7/9/109753_aed7a28302.jpg',
        'https://www.memesmonkey.com/images/memesmonkey/6a/6a584bd506df92a1f1b2aa930a126ad7.jpeg',
        'https://c7.hotpng.com/preview/974/294/484/league-of-legends-internet-meme-lol-deviantart-lol-transparent-png-thumbnail.jpg',
        'https://c7.hotpng.com/preview/146/301/204/rage-comic-internet-meme-trollface-know-your-meme-face-thumbnail.jpg',
        'https://c7.hotpng.com/preview/250/312/876/cat-mobile-phones-troll-ripndip-telephone-cat-thumbnail.jpg',
        'https://sun9-79.userapi.com/c10314/g35763097/a_6b3c370a.jpg',
        'https://demotivation.me/images/20090611/wmk7b3b0xj5h.jpg',
        'https://static10.tgstat.ru/channels/_0/80/8011b2fa69888065bf932add0aacf054.jpg',
        'https://i.pinimg.com/236x/5d/57/bc/5d57bc5576c04566921e261086cbb86f.jpg',
        'https://image.freepik.com/free-vector/cool-warrior-logo_10051-117.jpg',
    ],
    'DriverFaceURL': [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK0ZMv9e4BR6dc8964TN4u2hB5wXTUXLAqldJgAyQE88OdZbI4&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQru55lQUy4eqiq74wySVj3IawVb_ZP458yVYun2OsxxXZlMDEM&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_EeAOYrhr3_LP46AIgFK4Y7CmeN9E8Sdptu2B7Cgp2GEREjOP&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdTjNdxdEbhLJtB7uDryZzAoBJ6b6BriPNixrkcmh0P8AwiP3G&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7VY5erz5R0nmIL3tog0gRhkctvGNKeCgs8HLul50r4KHUinJeBg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDIE3Wxvdo10mWaUsjYMfs3Y7V4_ka91CQ8NpVoYRL4qGOnxlssw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyaoP7p-hDi3jg-xmOoiDjkcYtkQjk1Bmv-gGdFhb25GUHyC6E5w&s',
        'https://i.dlpng.com/static/vector/596610_thumb.jpg',
        'https://st4.depositphotos.com/11953928/25111/v/450/depositphotos_251115372-stock-illustration-box-truck-man-delivery-shipping.jpg',

    ],
    'ManFaceURL': [
        //бородатый
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8NA3_0NpKQabSoCn7ndCU_apqW7GcpPyjnB8pLJLoLC9wvO9&s',
        //
        'https://capacitacionintegral.mx/wp-content/uploads/2016/11/reserva-exitosa350.png',
        'https://sapb1cloud.ru/files/komdir.png',
        'https://www.callproof.com/wp-content/uploads/2012/10/cartoonsalespeople.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN6K5aQpMCdJeL_iqZNP_PHPJGscmMYxwpe8DEeLtgQG0l_ZE1&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNCw7mHIZNl0AonzNnyUmHkeYC-zEMjmoGDGNjwNEYRbKf8aNr&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn_by8RShFnXlJCNle_RhWbKnrGQaZa9xmsIQITUpDJc30_qet&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wH_4r7MEiOBMCEjSV1xRds69tijAFpf4BpV2xGD9GtEOlmucVg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBuKjVkSTa0HrvUL3iBUzavrQ_kCZqe90ZL5cLsSigWvlLhelIyg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAJmmQepPRB1cmaU9wuWKiy07PABvw9vB-_GK1UO9GRou_1IMQ&s',
    ],
    'DriverDocURL': [
        //'https://lh3.googleusercontent.com/pPd3R5r_isMlAxZT-M2xx8q-J2P1BKuBmxkERYv_IOEAdb_cs9EhZ-gqhMRzOCf1_fosKw=s130',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8KgKxL8zD-2POxgBVtfs3VJ3rR4j4xWa8BruUXm2gRYF_ypOVzg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGO44uyP58nKPJHzeE7Uy_OsDOtBqCE32sY4AJLWlo675dpmS&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYfo3GGyFyEWEsqlXSvY-CTe6_cu_EVulKb5j5cEBiKmaNwpUpA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT6Sfo8h3E05QA0c3qN9M3u7c6z7NUNNp3X3Ssop-xtT5McRT5lQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Uh6vtHUDHq-No1YxiQrdLqGq3HO9-vKK57xnneidyImpk_At3Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaHJuBCUwP7cr4z1b7pT71XVEDrE-Y7dy4eO7GKJL2awdOJ2n6A&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnxOkc4RtGL6-qNBGc8DFxjo-EMRhzvzCV6x4PNcLID96jKO8K&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvdrQHfbf091IZ8ufXYc7MYjC7eWO4nUXMxeuqmiPwzK7prsHOg&s',
      /*  'https://images.ua.prom.st/134876410_w640_h640_voditelskoe-udostoverenie-usik.jpg',
        'https://www.lifecz.ru/data/attachments/7/7858-15559ba384022a76bbff0af0cc0d65c4.jpg',
        'https://images.ua.prom.st/133164651_w640_h640_voditelskoe-udostoverenie-lobanov.jpg',

       */
    ],
    'LogoURL' : [

        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTECLmmkCmxQguEJpQ9B_uLoT2FrnPx7ojsG9_QB-h334CTediI',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR43ANdL8QVdVT00tgJJr50i5t9PsoP2D0HlYPXvZsRUCFVu472',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRO42JjuwtTVQm23ZTJ3W4s38kDFPUs33CSSO_42YhvhOEkNtZs',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZ1Yw4fw3F92Fs9IGY6xQavZ5v5UrQTllySTNM6hFm8uo8sII0',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRICZJ3WCQQ6mPbNnGncv4yw9V9f22oEJ5snMMe9sD75JvoNozh',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ95RBQMeQWEcFxUlGY1jO1BHRpGbeMRn-P3BNCXYQkJ48rLdns',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTejWKSvyiSWrn9CViuurhwk9VCDGUgDtJbtQkh6Cz3DfztuFhC',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhrqg0tDFP75PuBLo7o2UPoxzxRY85kuuOgvwlQokHY531MYdP',
        'https://images-na.ssl-images-amazon.com/images/I/61nGYc5e7tL._SL500_AA300_.png',
        'https://cameralabs.org/media/lab15/post/02-15/16/logotipy-kompaniy-kurezy_2.jpg',
        'https://avatanplus.com/files/resources/original/579274da88854156141875bf.png',
        'https://i1.i.ua/prikol/pic/3/1/397413.jpg',
        'https://avtoshark.com/wp-content/uploads/2020/12/shildik-krug-harlej-%E2%84%962.jpg',
        'https://i1.i.ua/prikol/pic/3/1/397413_380848.jpg',



    ],
    'Contract_1_URL': [
        'https://diletant.media/upload/medialibrary/c5b/c5b25a724cc62642151667bee79b56cf.jpg',
        'https://oreldes.ru/assets/images/stage-2.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4phOrz77RtihDocgkmyI0Syg6t2HdaIda7B6s_Ek2V01dpvAkwQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBgUYKqoSoL5zJzRaoQLZ2T9_gXdxr1cdvgt3c8j6_6S_s7mXKmg&s',
        'https://lh5.googleusercontent.com/proxy/LSgbkqzobsGF2VyTrIKx5pnKo5iFcriaDlvc6LIsL7nehS7CEeFCm_jMv0D4DxpEZavMCQU',
        'https://img.cataloxy.ru/upload/board/829/10781/shutochnyy-dogovor-s-samim-soboy_107805777.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQd_Wid7Af-dLWoEiWxJIP-qBp31w2j5or2Y5PPX8c4q8XHLjay',
        'https://i1.stat01.com/1/807/8068198/afacdb/dogovor-teshhi-i-zata.jpg',
        'http://patstalom.com/uploads/images/f/3/0/e/30/432f711aad.jpg',



    ],
    'Funny_Page_URL': [
        'https://natribu.org/',
        'https://zello.com/channels/k/16qp?nomobile=1',
        'https://alkrylov.livejournal.com/490097.html',
        'https://www.youtube.com/watch?v=PN7RNXJZ39M',
        'http://lurkmore.to/%D0%9F%D0%9D%D0%A5',
        'https://www.youtube.com/watch?v=FpVmGCo79R4',

    ],
};

global.g_ArraySTR = {
    'StrCompanyCodeArray' : [ //38462049//38977165//32603291//35898620//40465590
        //'38462049', // '36486577' // no short name'32734101'
        // '19292382' <-не перебуває в процесі припинення, свідоцтво про державну реєстрацію недійсне
        // '13416966' ,<- зареєстровано, свідоцтво про державну реєстрацію недійсне
        '38977165', '32603291', '35898620', '40465590', '41298780', '30225667', /*'13416966',*/ '13318100',
        '22460038', '39803312', '41685542', '41038088', '41719450', '33836080', '33128355', '38436952',
        '39695504', '42620617', '32811552', '36186964', '38473135', '40899034', '42842304', '39811449',
        '14180856', '41900270', '24907124', '42587622', '42749512', '38689788', '35662674', '36476600',
        '34631928', '30936708', '38919763', '39392073', '41030864', '34723662', '42395561', '41068620',
        '32542590', '39291387', '37213019', '42369065', '33752415', '35054264', '37035091', '39008997',
        '39343329', '40253046', '40664034', '40731854', '41056421', '32071177', '34968985', '34361469',
        '35492773', '35121765', '33801531', '32752560', '35671595', '35909752', '36978261', '38232645',
        '38651885', '39392796', '39439184', '39577132', '40572043', '41251935', '42464650', '43046991',
        '35430555', '38981852', '30547665', '36258200', '33721161', '36753620', '37663067', '40323825',
        '42368460', '42299543', '34380786', '34801331', '35898641', '40022543', '33927607', '35315000',
        '43180243', '39943268', '34181278', '33293221', /*'42523349',*/ '33423205', /*'39518351',*/ '37487304',
        '41626005', '42602962', '39790162', '23269992', '35917653', '37441123', '40225155', '37260760',
        '42002969', '39193995', '39279925', '41017540', '42472530', '42643524', '42895728', '25412465',
        '36246405', '41110263', '41467509', '37157981', '41340705', '37089346', '38351188', '41518914',
        '42513964', '36801621', '40077964', '41759577', '42287648', '42507259', '40494526', '36471115',
        '37562573', '35906353', '31944484', '30379714', '38572710', '40455623', '35215826', '33919753',
        '38393909', '22946114', '37760073', '42118593', '37967753', '42895534', '42832364', '43151741',
        '39311015', '42186841', '43257059', '40162180', '40276126', '40278778', '40971327', '43445178',
        '38168622', '42329394', '36154775', '40158519', '30488558', '31867211', '38885174', '00383001',
        '34865966', '35829431', '36953687', '36412827', '41876217', '42372900', '20465289', '41112150',
        '34057400', '41269680', '37696134', '37361279', '38239373', '38825272', '39116638', '42228907',
        '39123540', '40646256', '34961633', '40407669', '42316432', '33685380', '40967067', '39501613',
        '38212864', '31541444', '30648461', '33609996', '36197798', '31416332', '32237983', '42966589',
        '32994117', '20804048', '31195969', '36098276', '35958396', '38922535', '32443697', '32462463',
        '24881353', '31631679', '43505781', '37130226', '34311199', '42209816', '34561547', '43704975',
        '13723177', '39040674', '42673758', '40947187', '33051565', '33300364', '36421347', '35592183',
        '35403699', '37550213', '36501212', '41475829', '38547044', '44590768', '43358379', '43154449',
        '43932613', '38674860', '42800311', '42696005', '42696026', '42220507', '34663352', '40455288',
        '41454154', '44572995', '43061669', '43928497', '40611815', '41141731', '38937232', '42932633',
        '42951986', '42667990', '21624682', '13604509', '33562204', '41661652', '36990320', '40940584',
        '33579663', '42250513', '40769610', '35220726', '42807998', '43125114', '41148130', '38241864',
        '37034318', '41156622', '21527125', '34984975', '44230221', '38356118', '44386260', '38569581',
        '41505198', '05388606', '39192284', '43135007', '35652341', '26404350', '42484719', '38313891',
        '25261061', '44255005', '25066477', '35425906', '39652455', '36288125', '44509923', '38346822',
        '33676418', '33726589', '32553508', '31201584', '30387388', '20531998', '34490728', '33866754',
        '33731761', '34359230', '34559700', '34817383', '32775017', '21984207', '33407102', '30050202',
        '32536959', '34543664', '31287656', '44422675', '36206220', '30607341', '33979042', '33546989',
        '44580042', '34558948', '33879894', '44501636', '34423777', '35571231', '44575631', '32872264',
/*Моя*/ '38933939',
        '42068946', '40681547', '38312437', '24167064', '34989884', '20875278', '36715538', '33188670',
    ],
    'StrFopCompanyCodeArray' : [
        '',
    ],
    'StrAddress' : [
        'Київ',
        'Одеса',
        'Херсон',
        'Харків',
        'Львів',
        'Хуст',
        'Дніпро',
        'Черкаси',
        'Малехів',
        'Біла Церква',
        'Кривий Ріг',
        'Виноградне',
        'Житомир',
        'Миколаїв',
        'Тернопіль',
        'Чайки',
        'Кропивницький',
        'Бердичів',
        'Гостомель',
        'Нова Каховка',
        'Вінниця',
        'Вознесенськ',
        'Южноукраїнськ',
        'Мішково-Погорілове',
        'Івано-Франківськ',
        'Полтава',
        'Квітневе',
        'Бориспіль',
        'Краматорськ',
        'Суми',
        'Ізмаїл',
        'Моршин',
        'Рубіжне',
        'Запоріжжя',
        'Стрий',
        'Бахмут',
        'Квітневе',
        'Дрогобич',
        'Мукачево',
        'Олешки',
        'Великодолинське',

    ],
    'StrContactType' : [ // ------------------------------------------------------------------------
        'Заказчик',
        'Перевозчик',
        'Экспедитор',
        'Контрагент ТО',
        'HR менеджер',
        'Админ',
        'Брокер',
        'Бухгалтер',
        'Бухгалтер отправка доков',
        'Бывший сотрудник',
        'Водитель',
        'Глава отдела закупок',
        'Глава отдела логистики',
        'Глава отдела продаж',
        'Глава транспортного отдела',
        'Деловод',
        'Директор',
        'Диспетчер',
        'Заместитель директора',
        'Исполнительный директор',
        'Касса',
        'Кладовщик',
        'Клиент',
        'Координатор',
        'Логист',
        'Логист ВЭД',
        'Менеджер',
        'Мониторинг центр',
        'Ответственный за получение доков',
        'Продажник',
        'Сотрудник',
        'Удалённый Клиент',
        'Фин. Менеджер',
        'ФО',
        'ФОП',
        'Хозяин',
        'Юрист',
    ], // StrContactType // ------------------------------------------------------------------------
    'StrOurCompanyArray' : [
        'ТОВ "ТРАНСЛОЙД"', 'ТОВ "СТАВАНГЕР"', 'ТОВ "ОБРАТКА"', 'ТОВ "ПЕРЕВОЗ"', 'ТОВ "ТРАНСПАУЕР"', 'ТОВ "ТРАНСБЛУМЕНТАЛЬ"',
    ],
    'StrLevelMonitoringMC' : [
        // 'Автоматически',
        'Максимальный (Ночью на охраняемых)',
        'Максимальный (Движение ночью разрешено)',
        'Средний (Движение ночью разрешено)',
        'Низкий',
        // 'Не контролировать',
        'Средний (Ночью на охраняемых)',
        'Контроль загрузки и выгрузки',
    ], // 'StrLevelMonitoringMC' -------------------------------------------------------------------
    'StrCargoTypeArray' : [
        'Алкоголь', 'Будматеріали', 'Запчастини', 'Метал', 'Напої', 'Пиломатеріали', 'Пляшка', 'Продукти',// 'Добрива',
        'Побутова техніка', 'Обладнання', 'ТНВ', 'Труби', 'Пошта', 'Вода', 'ЛГВ',
    ],
    'StrArrayNumberInSet' : [
        'KF01',
        'KF02',
        'KF03',
        'KF04',
        'KF05',
        'KF21',
        'KF22',
        'KF23',
        'KF24',
        'KF25',
    ],
    'StrArrayCarBrandAuto' : [
        'DAF', 'MAN', 'VOLVO', 'IVECO', 'RENAULT', 'SCANIA', 'MERCEDES-BENZ',
    ],
    'StrArrayCarBrandVehicle' : [
        'SCHMITZ', 'TRAILOR', 'KOEGEL', 'KRONE', 'WIELTON', 'SCHWARZMULLER', 'LIFTLUX', 'LAMBERET', 'BERGER',
    ],
    'StrArrayVehicleSubType' : [
        `Тент`, `Реф`, `Ізотерм`, `Цільномет`,
    ],
    'StrAddressFunny' : [
        'Хреново',
        'Бабенки',
        'Бешенцево',
        'Бельдяжки',
        'Бухарино',
        'Блядово',
        'Бодуны',
        'Бухалово',
        'Бибики',
        'Ваня',
        'Вагина',
        'Грива',
        'Горбатка',
        'Горшки',
        'Галимый',
        'Дно Псковська область',
        'Дуркино',
        'Дурой',
        'Дидилдіно',
        'Драченино',
        'Дрочево',
        'Ебен',
        'Еблі',
        'Задово',
        'Засосная',
        'Ебано',
        'Факія',
        'Косяковка',
        'Коноплево',
        'Кукишево',
        'Козлы',
        'Козюльки',
        'Какино',
        'Кончинка',
        'Конец',
        'Кривошляпы',
        'Лох',
        'Лохово',
        'Лобково',
        'Лобок',
        'Матюково',
        'Мамедова Щель',
        'Мочилки',
        'Мошонки',
        'Мусорка',
        'Мухоедово',
        'Недомерки',
        'Орево',
        'Опочка',
        'Пердухово',
        'Пронюхлово',
        'Пиздри',
        'Пьяньково',
        'Подмой',
        'Подсосное',
        'Попки',
        'Пердаку',
        'Пиксяси',
        'Парашино',
        'Сосуново',
        'Синяк',
        'Стояково',
        'Сосунково',
        'Сискі',
        'Синюха',
        'Синяки',
        'Сучки',
        'Тупилкин',
        'Трах',
        'Торчилово',
        'Упорово',
        'Укурей',
        'Улёты',
        'Чіхуахуа',
        'Хачики',
        'Херонея',
        'Хреновое',
        'Хохотуй',
        'Холуй',
        'Хренище',
        'Хераково',
        'Шняки',
        'Ширяевка',
        'Шалоболино',
    ],
    'StrFirstNameFunny' : [ //Имя
        'Акакий',
        'Аристарх',
        'Ашот',
        'Архелох',
        'Ананий',
        'Арнольд',
        'Абрам',
        'Андрей',
        'Никодим',
        'Спиридон',
        'Кондрат',
        'Евлампий',
        'Соломон',
        'Трофим',
        'Графон',
        'Лаврентий',
        'Сидор',
        'Дормидонт',
        'Махмуд',
        'Сруль',
    ],
    'StrLastNameFunny' : [ //Фамилия
        'Альдебаран',
        'Байда',
        'Бляхер',
        'Бухарин',
        'Бздырь',
        'Воровайко',
        'Голодняк',
        'Готовченко',
        'Гендальф',
        'Голубцов',
        'Гексель',
        'Дроссель',
        'Доренко',
        'Долбочёс',
        'Драчук',
        'Евробляхер',
        'Ёксель',
        'Жопоклюев',
        'Заднеприводный',
        'Засос',
        'Ишаков',
        'Йух',
        'Каюк',
        'Криворучко',
        'Кабздец',
        'Косяков',
        'Кидалов',
        'Карачун',
        'Кендюх',
        'Лоховцев',
        'ЛиСиЦин',
        'Мартышко',
        'Мошонкин',
        'Мух',
        'Наливайко',
        'Отсос',
        'Паразит',
        'Поднасралов',
        'Педрищенко',
        'Пересунько',
        'Присунько',
        'Пердак',
        'Пендаль',
        'Пиптик',
        'Писькаструй',
        'Пихарь',
        'Робокоп',
        'Сквиртобрызгов',
        'Сракоблудный',
        'Слабодрыщенко',
        'Сивоконь',
        'Серняев',
        'Сторчак',
        'Синяков',
        'Торчёк',
        'Трешак',
        'Тугодумов',
        'Тугосралов',
        'Трахтенберг',
        'Упоротый',
        'Ушлёпок',
        'Франкенштейн',
        'Хрямзель',
        'Цицик',
        'Цицькин',
        'Чаморошный',
        'Чекушкин',
        'Черкаш',
        'Чобля',
        'Шмаровоз',
        'Шумахер',
        'Шелудивый',
        'Шнырь',
        'Шалавин',
        'Штемпель',
        'Ягодичный',
    ],
    'StrMiddleNameFunny' : [ //Отчество
        'Ананасович',
        'Наумович',
        'Андреевич',
        'Сергеевич',
        'Денисович',
        'Иванович',
        'Варфоломеевич',
        'Петрович',
        'Алибабаевич',
        'Мухамедович',
        'Вениаминович',
        'Данилович',
        'Егорович',
        'Фёдорович',
        'Прохорович',
        'Вениаминович',
        'Акакиевич',
        'Аристархович',
        'Хулиович',
        'Хуанович',
        'Педрович',
        'Перкосракович',
        'Леонардович',
        'Виссарионович',
        'Элеваторович',
        'Луиджиевич',
        'Тараканович',
        'Водилович',

    ],
};

