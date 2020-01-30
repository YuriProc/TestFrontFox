// in file config.config
global.gname_FrontFoxURL = 'FRONT_FOX_URL';
global.g_FrontFoxURL = '';

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
    ]
};

global.g_ArraySTR = {
    'StrAddressFunny' : [
        'Хреновое',
        //'Хреново',
        'Сучки',
        'Блядово',
        'Хераково',
        'Бодуны',
        'Еблі',
        'Ебано',
        'Дрочево',
        'Бухалово',
        'Сискі',
        'Сосуново',
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
        'Ефрем',
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
        'Шумахер',
        'Воровайко',
        'Пидоренко',
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
        'Шалавин',
        'Готовченко',
        'Цицькин',
        'Кидалов',
        'Пидорец',
        'Сторчак',
        'Синяков',
        'Жопоклюев',
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

