// in file config.config

global.gname_FrontCrmFoxURL = 'FRONT_CRM_FOX_URL';
global.g_FrontCrmFoxURL = '';

global.gname_FrontCfoFoxURL = 'FRONT_CFO_FOX_URL';
global.g_FrontCfoFoxURL = '';

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
global.g_StrStartTime = `${new Date(Date.now())}`;
global.g_StrOutLog = `Start LOG File ${g_StrStartTime}\n`;

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
        'https://c7.hotpng.com/preview/250/312/876/cat-mobile-phones-troll-ripndip-telephone-cat-thumbnail.jpg'
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



    ],
    'Contract_1_URL': [
        'https://lh6.googleusercontent.com/proxy/GGnRZL242s_hMJtmXqSObMmC8d9ffCw8omGNq2n-nXI8fppeu1yz6AFoywtsJo1W84CRJX3NKBlnfk9kmj6FlldBq7j2Ok12wQ6ZpEpYIUaf',
        'https://oreldes.ru/assets/images/stage-2.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4phOrz77RtihDocgkmyI0Syg6t2HdaIda7B6s_Ek2V01dpvAkwQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBgUYKqoSoL5zJzRaoQLZ2T9_gXdxr1cdvgt3c8j6_6S_s7mXKmg&s',
        'https://lh5.googleusercontent.com/proxy/LSgbkqzobsGF2VyTrIKx5pnKo5iFcriaDlvc6LIsL7nehS7CEeFCm_jMv0D4DxpEZavMCQU',
        'https://lh5.googleusercontent.com/proxy/LSgbkqzobsGF2VyTrIKx5pnKo5iFcriaDlvc6LIsL7nehS7CEeFCm_jMv0D4DxpEZavMCQU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQd_Wid7Af-dLWoEiWxJIP-qBp31w2j5or2Y5PPX8c4q8XHLjay',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvRohBd-JHjsmH6ioF3QkN1rKymtYWdWBS1YzoZ_iGdHsAtd_r',
        'http://patstalom.com/uploads/images/f/3/0/e/30/432f711aad.jpg',



    ],
    'Funny_Page_URL': [
        'https://natribu.org/',
        'https://zello.com/channels/k/16qp?nomobile=1',
        'https://alkrylov.livejournal.com/490097.html',
        'https://www.youtube.com/watch?v=PN7RNXJZ39M',
        'http://lurkmore.to/%D0%9F%D0%9D%D0%A5',

    ],
};

global.g_ArraySTR = {
    'StrCompanyCodeArray' : [ //38462049//38977165//32603291//35898620//40465590
        //'38462049', // '36486577' // no short name'32734101'
        // '19292382' <-не перебуває в процесі припинення, свідоцтво про державну реєстрацію недійсне
        '38977165', '32603291', '35898620', '40465590', '41298780', '30225667', '13416966', '13318100',
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
        '43180243', '39943268', '34181278', '33293221', '42523349', '33423205', '39518351', '37487304',
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
        '38212864',
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
    'StrAddressFunny' : [
        'Хреновое',
        //'Хреново',
        'Сучки',
        'Блядово',
        'Хераково',
        'Бодуны',
        //'Еблі',
        'Пердаку',
        //'Ебано',
        'Дрочево',
        'Бухалово',
        'Сискі',
        'Сосуново',
        'Стояково',
        'Сосунково',
        'Матюково',
        'Пердухово',
        'Мамедова Щель',
        'Драченино',
        'Бухарино',
        'Мошонки',
        'Кончинка',
        'Мусорка',
        'Галимый',
        'Дуркино',
        'Задово',
        'Дидилдіно',
        'Засосная',
        'Лобково',
        'Парашино',
        'Синяки',
        'Тупилкин',
        'Орево',
        'Подсосное',
        'Косяковка',
        'Коноплево',
        'Какино',
    ],
    'StrFirstNameFunny' : [ //Имя
        'Никодим',
        'Спиридон',
        'Кондрат',
        'Архелох',
        'Ананий',
        'Евлампий',
        'Соломон',
        'Арнольд',
        'Трофим',
        'Ашот',
        'Графон',
        'Лаврентий',
        'Абрам',
        'Андрей',
        'Сидор',
        'Дормидонт',
        'Махмуд',
        'Сруль',
        'Акакий',
        'Аристарх',
    ],
    'StrLastNameFunny' : [ //Фамилия
        'Сквиртобрызгов',
        'Кабздец',
        'Штемпель',
        'Цицик',
        'Голодняк',
        'Бляхер',
        'Евробляхер',
        'Гексель',
        'Байда',
        'Каюк',
        'Криворучко',
        'Дроссель',
        'Шумахер',
        'Воровайко',
        'Доренко',
        'Мартышко',
        'Сракоблудный',
        'Тугодумов',
        'Драчук',
        'Поднасралов',
        'Сивоконь',
        'Бздырь',
        'Ишаков',
        'Тугосралов',
        'Слабодрыщенко',
        'Серняев',
        'Наливайко',
        'Чобля',
        'Пересунько',
        'Пердак',
        'Пиптик',
        'Шалавин',
        'Готовченко',
        'Цицькин',
        'Кидалов',
        'Голубцов',
        'Сторчак',
        'Синяков',
        'Жопоклюев',
        'Присунько',
        'Лоховцев',
        'Франкенштейн',
        'Байда',
        'Шнырь',
        'Черкаш',
        'Бухарин',
        'Упоротый',
        'Сивоконь',
        'Коротицын',
        'Карачун',

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

