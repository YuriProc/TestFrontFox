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
        'https://lh3.googleusercontent.com/ebzamlRVVoWMgTpd3LLwvfmwaTAdE58clqKqTglf200U6dAfZncDInULnk0x7m9Re2Vl=s85',
        'https://lh3.googleusercontent.com/sHs_ZFKZu5kZF6-SyZkMwbXGQCGp1XCkdqwFdt9Mlc4JK86qHmw_nw_jVIg7gL9A_a1nakg=s85',
        'https://lh3.googleusercontent.com/0p-5i0NcYo0V0ImXGA6gkkvuJUWCY8gP2BXmZtikXskdHrJeUzDim0KhC6vUaAd5-wgKwA=s85',
        'https://lh3.googleusercontent.com/zQNwmM2aWlfMj02youXtn8Gd758ImBbes-PPHZhl7J8OUXVal1U6NVMsTlmvZBAe7uV9SQ=s113',
        'https://lh3.googleusercontent.com/nwY4ejwOei4kCDdQxMDDpUlc2MDYyOufoYYdhMOO6eytlTqpANR1Ohv4HehgYkqmFc6O2bc=s85',
        'https://lh3.googleusercontent.com/N9UJXYci6KruoYlAReI_tVhroeJ41z91PGI8lL5KEr-1ww_SboNEd2Jk9-qsPJxvTrVcSHM=s88',
        'https://lh3.googleusercontent.com/8rz1frhOd5f3JKSYVy5PY2_K3HmxEW3E4pyRP6Zc1PcoLJM92xBK2l5aZ4Gy7HezM6DjNiQ=s94',
        'https://lh3.googleusercontent.com/p7FwCo-yEqCL-E5o__w8MRwWAXrummGMRldzf62HH0OzD40rkWY5iXuJKaEaypcA17qrqQ=s85',
        'https://lh3.googleusercontent.com/vC2YtXyBLWUnOYZqFX45NPK3fpmZf6iF5_ILv6XQht13yGTskq2Klxv-jxls26GygISxFA=s85'
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
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwJUJhGC0rQDd06P4UZyip6Yi1HLaDRONCo0P2ODXTGxyzF7s7GA&s',
        'https://lh3.googleusercontent.com/eXpKMwV0qBJyFhbq4FDr7DA8jxnPSszygWQMDpqImEZQG1OhIZQWnzVwMuDirG8perGjQQA=s113',
        'https://lh3.googleusercontent.com/rfXD5c2f-DVghTt7RFZw4DV5vd_V9YH9RI-TXrKq-7fY5LdchPGHbSr8oqW4W0gRaqBjig=s85',
        'https://lh3.googleusercontent.com/SRtW4Qiyc9_muQVbKA3gxHYLq9-hGk8x6hRuXeS_x_NGNdDJyGmyS1g_a5w72Q9sTPk98Q=s86',
        'https://lh3.googleusercontent.com/xuoJxQNWw31fkzuWiPsfRNIFBYTRVerPoFMHVquvXyQupdfSh8XpTAo1CTugKfx4U-Gi-g=s86',
        'https://lh3.googleusercontent.com/lRuEnpdVa2qKy-CJ-LIB-h5nM1ZZ7J-ya-gZxfNeHLqrVyYOPQUmA63bLd3daSgT-L_xtg=s85',
        'https://lh3.googleusercontent.com/N8SeFRPA-wGUoyOh3TNODBBvJJetakexugKo1mrzhxi3rZUkZox9i0510NqZcKpAcJHZ=s128',
        'https://lh3.googleusercontent.com/7IJHBnL2eoas4MHkOFoX1Njyp8LMlK90pe3EQzX-QW3uyvxDA_J0-SlDqikP06uQDxS77Q=s85',
        'https://lh3.googleusercontent.com/p-BzyhHEborSvGQU7p3ketf2lEBCRwWPUZqpwANlJqTzusP0jqxM_nODHXNvkvii7Ud2bQ4=s90',
        'https://lh3.googleusercontent.com/bllObAMCMvWHazlw2r_kKXJZKb-7wEXFahvnOi7QtgUi05TOVTG4ZnF6Vl8mEvrqIStXlg=s85',
        'https://lh3.googleusercontent.com/l_kX9VHYo4MN7IDK3e9E6PfL3OgJC08OG1RKKRmRQkHZnX1U_M-caBL2PwPUXLrWu1yD42Y=s85',
        'https://lh3.googleusercontent.com/rdaBN3FsksNaYZMMaypFdRStOggxL7PrCznrYVTvVSORyM2zzH5gmwv_18f6eP8fmp-diA=s85',
        'https://lh3.googleusercontent.com/t2_z_fcNx6AuXuuTCi2mI7WIUM6wMCz1S3fpw5mulZVEt4DN66JTivXqa5RX8FM6PQYy=s85',
        'https://lh3.googleusercontent.com/CnGT6PJDuGARpRJLiKOKHZTudxnRlroBSegCVw1TG0JUj9RlZByuj-vaDjkSfVZ5baF9OPQ=s85',
        'https://lh3.googleusercontent.com/C9WldjGk1LTitwxSwzWHb9sq6AHZIjuUL4Ui86pd24a1r6vm30FSjBokW_o-LsiHWMEqesc=s85',
        'https://lh3.googleusercontent.com/ji7Ciq3p9ffZSU9pggDvUA42as25ORO8Hz1mzcyUL-fzptgi07bRh61x-v4QcROD78p3GA=s128',
        'https://lh3.googleusercontent.com/M04BzqVB-8vD6IeJInrmaljJzifJy0R-wYD-xnFb8QXZgETZzi2NBMGbH06QlP0VH2rurg=s85',
        'https://lh3.googleusercontent.com/7qEaAe0aB4xLsuDrbuftESMzgexo8W0dfiv3VP2fMEY443Ajls4J9Ypuncn9D04VF_h5=s143',
        'https://lh3.googleusercontent.com/Br7ejv_hDzwO_bScL_ZUhNTGNOBX2Bbb0ID2Mmg4k_IpaZ0a-6HX2iEyXWEk4Lx5_F5r=s128',
        'https://lh3.googleusercontent.com/V7xAf9BWCDfXwmPPImAJtrg8jc6xGshxBen_KvoxR78FUNQaTfEH1iidefqrciM7d1NugQ=s85',
        'https://lh3.googleusercontent.com/TOfxofMR-4ktuoeh7bbNyoHT_la2zJwb1c4rjpA3h85UmDke2kuADYnD6rOTU7Nsn1YP2g=s85',
        'https://lh3.googleusercontent.com/Q7gywS1rHycFC15wRLMnkhQkWkBmYWOgXI4rBY6DnG1XXxKR4J-vaCu0nvS32T2zJxob=s85',
    ],
    'Contract_1_URL': [
        'https://lh6.googleusercontent.com/proxy/GGnRZL242s_hMJtmXqSObMmC8d9ffCw8omGNq2n-nXI8fppeu1yz6AFoywtsJo1W84CRJX3NKBlnfk9kmj6FlldBq7j2Ok12wQ6ZpEpYIUaf',
        'https://oreldes.ru/assets/images/stage-2.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4phOrz77RtihDocgkmyI0Syg6t2HdaIda7B6s_Ek2V01dpvAkwQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBgUYKqoSoL5zJzRaoQLZ2T9_gXdxr1cdvgt3c8j6_6S_s7mXKmg&s',
        'https://lh5.googleusercontent.com/proxy/LSgbkqzobsGF2VyTrIKx5pnKo5iFcriaDlvc6LIsL7nehS7CEeFCm_jMv0D4DxpEZavMCQU',
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
        //'38462049', // '36486577'
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
        '42513964', '36801621', '40077964', '41759577', '42287648', '42507259', '32734101', '36471115',
        '37562573', '35906353', '31944484', '30379714', '38572710', '40455623', '35215826', '33919753',
        '38393909', '22946114', '37760073', '42118593', '37967753', '42895534', '42832364', '43151741',
        '39311015', '42186841', '43257059', '40162180', '40276126', '40278778', '40971327', '43445178',
    ],
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
        'Присунько',
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

