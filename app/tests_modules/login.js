let StartBrowser = async () => {
    try {


        await console.log("StartBrowser");
        const puppeteer = require('puppeteer');
        let width = 1500;
        let height = 1500;
        let StartBrowserInHeadLessMode;
        await console.log('\x1b[38;5;2m', "g_ShowActionInBrowser=>", g_ShowActionInBrowser, '\x1b[0m');
        if (await g_ShowActionInBrowser) {
            StartBrowserInHeadLessMode = false;
            await console.log('\x1b[38;5;2m', "StartBrowserInHeadLessModeF=>", StartBrowserInHeadLessMode, '\x1b[0m');
        } else {
            StartBrowserInHeadLessMode = true;
            await console.log('\x1b[38;5;2m', "StartBrowserInHeadLessModeT=>", StartBrowserInHeadLessMode, '\x1b[0m');
        }

        let browser = await puppeteer.launch({
            //headless: false,
            //headless: true,
            headless: StartBrowserInHeadLessMode,

            slowMo: 0,
            args: [`--window-size=${width},${height}`]
        });
        await console.log("puppeteer.launch");

        return browser;
    }catch (e) {
        await console.log(`Ошибка в StartBrowser => ${e}`);
        return false;
    }
};

let BrowserGetPage = async (browser, strPageURL) => {
    try {
        let page;
        page = await browser.newPage();

        page.on('dialog', async dialog => {
            console.log(`АВТО_ПОДТВЕРЖДЕНИЕ:` + dialog.message())
            //await dialog.dismiss()
            await dialog.accept();
        })
        //height = height - 120;
        let width = 1200;
        let height = 880;
        await page.setViewport({width, height});
        await page.goto(strPageURL);



        return page;
    }catch (e) {
        await console.log(`Ошибка в BrowserGetPage(${strPageURL})=> ${e} `);
        return false;

    }
};

let LoginCrm = async (page, LoginData) => {
    const nameTest = NameFunction() +'"'+ LoginData.strUserLastName+'"';
    try {

    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    let ElPresent;
    let xPath;
    let resOk;
    let NeedReLogin = true;
    let CountLogin = 0;
    let pLOk;

        //На всякий случай подождём Загрузки Страницы
        await WaitUntilPageLoads(page);
        //Если залогинены, то разлогиниться
        ElPresent = await ElementIsPresent(page, '//div[@class="crm-user-avatar"]');
        if (ElPresent) {
            //Клик по LOGO

            //await page.waitFor(500000);

            await page.click("div[class=crm-user-avatar]");
            await page.waitFor(500);
            //Клик по ВЫЙТИ
            xPath = '//div[@class="links__item"][contains(text(), "Выход")]';
            ElPresent = await ElementIsPresent(page, xPath);
            if (ElPresent) {
               resOk = await ClickByXPath(page, xPath);
               if (!resOk){

                   //await page.waitFor(500000);


                   throw `     FAIL => ClickByXPath(${xPath})])\n`;
               }
            }else{
                throw `     FAIL => Пункт "Выход не найден" ElementIsPresent(${xPath})])\n`;
            }
            await console.log(`     LogOut => LogIn=> "${LoginData.strUserLastName}"`);
            g_StrOutLog+=`\n => LogOut => LogIn=> "${LoginData.strUserLastName}" `;
        }

        while (CountLogin<2 && NeedReLogin) {

            //На всякий случай подождём Загрузки Страницы
            await WaitUntilPageLoads(page);


            ElPresent = await WaitForElementIsPresentByXPath(5000, page, '//input[@name="Логин"]');
            if (!ElPresent) {
                throw '     FAIL => WaitForElementIsPresentByXPath(//input[@name="Логин""])\n';
            }
            // Клик по инпуту ВАШ EMAIL
            await page.click("input[name=Логин]");
            await page.$eval('input[name=Логин]', el => el.value = '');
            await page.type("input[name=Логин]", LoginData.strEmail);

            //Клик по инпуту ВАШ ПАРОЛЬ
            await page.click("input[name=Пароль]");
            await page.$eval('input[name=Пароль]', el => el.value = '');
            await page.type("input[name=Пароль]", LoginData.strPassword);
            //await page.waitFor(5000);

            //Клик по Кнопке Авторизироваться //button[class=btn]
            ElPresent = await ClickByXPath(page, `//button[contains(text(), "Авторизироваться")]`);

            if (!ElPresent) {
                throw '     FAIL => ClickByXPath(page, \'//button[contains(text(), "Авторизироваться")]\');\n';
            }

            //await page.evaluate(() => alert('This message is inside an alert box'))

            //await page.waitFor(50000);
            //Проверим на наличие сообщения об ОШИБКАХ
            let myXPath = `//div[@class="notification-content"][contains(text(), "Неверный логин или пароль")]`;
            ElPresent = await WaitForElementIsPresentByXPath(1000, page, myXPath);
            if (ElPresent) {
                if (LoginData.ResolvedFailLogin) {
                    await console.log('\x1b[38;5;2m', "         Вижу => (Неверный e-mail или пароль)", '\x1b[0m');
                    await console.log('\x1b[38;5;2m', "         Будем Логиниться под root'ом и пробовать снова", '\x1b[0m');
                    g_StatusCurrentTest = 'Пропущен';
                    await g_SuccessfulTests++;
                    await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
                    g_StrOutLog += `=> ${g_StatusCurrentTest} \n`;
                    return false; //<-------------EXIT !!!

                }
                await console.log('     FAIL => "Неверный e-mail или пароль"');
                throw `FAIL => "Неверный e-mail или пароль"`;
            }

            //Проверим наличие иконки ФОКСА = УСПЕШНЫЙ ВХОД)

            myXPath = `//img[@src="/img/LogoFoXTop.0890cee9.svg"][@class="logo-menu"]`;
            ElPresent = await WaitForElementIsPresentByXPath(3000, page, myXPath);
            if (!ElPresent) {
                await console.log('     Warning => Не вижу class="logo-menu"');
                g_StrOutLog += `\n => Warning => Не вижу class="logo-menu" \n`;
                throw `FAIL => Не вижу "Не вижу class="logo-menu""`;
            }
            CountLogin++;

            //Дождёмся окончательной загрузки страницы
            pLOk = await WaitUntilPageLoads(page);


            NeedReLogin = await ClickIfExistsUpdated(page);


        }//end while (CountLogin<2 && NeedReLogin)

        //Проверим на наличие "Аватарки"
        ElPresent = await ElementIsPresent(page, '//div[@class="crm-user-avatar"]');
        if (!ElPresent) {

            throw '     FAIL => После Логина нет аватарки: ElementIsPresent(page, \'//div[@class="crm-user-avatar"]\');\n';

        }

        xPath = '//div[@class="user-block"]/span[@class="name"]';
        ElPresent = await ElementIsPresent(page, xPath);
        if (!ElPresent) {

            throw '     FAIL => После Логина нет Имени и Фамилии: //div[@class="user-block"]/span[@class="name"]\n';

        }

        let TextName = await ElementGetInnerText(page, 0, xPath);
        let DataName = LoginData.strUserFirstName + ' ' + LoginData.strUserLastName;
        if(TextName !== DataName) {
            throw `     FAIL => После Логина ${TextName} !== ${DataName} \n`;
        }

        //await page.waitFor(500000);

        //await console.log('\x1b[38;5;2m', `         Вижу => ${TextName}`, '\x1b[0m');
        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        return true; //<-------------EXIT !!!

    }catch (err) {
        await console.log('\x1b[38;5;1m', "На странице ВХОД В СИСТЕМУ произошла ошибка", err, '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
        g_StrOutLog+=`"На странице ВХОД В СИСТЕМУ произошла ошибка" (${err}) \n`;
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        return false; //<-------------EXIT !!!

    }

};
//---------------------------------------------------------------------------------------------
let LoginCfo = async (page, LoginData) => {
    const nameTest = NameFunction() +'"'+ LoginData.strUserLastName+'"';
    let ElPresent;
    let nLength;
    let xPath;
    let xPathFeedBack;
    let resOk;
    let sText;
    try {

        g_StatusCurrentTest = 'Запущен';
        g_LaunchedTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

        //Проверим На какой мы странице
        xPath = `//div[@class="login-page"]`;
        resOk = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOk) {
           throw `FAIL => Не вижу ${xPath}`;
        }

        //Клик по Инпуту Логин
        // //*[@id="__BVID__51"]
        //form/fieldset[1]/div/div/div/div/input
        //xPath = `//input[@id="__BVID__22"]`;
        xPath = `//form[@class="login-form"]/fieldset[1]/div/div/div/div/input`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk){
            throw `FAIL => Клик по Инпуту Логин(${xPath})`;
        }
        resOk = await TypeByXPath(page, xPath, LoginData.strEmail);
        if (!resOk){
            throw `FAIL => TypeByXPath => Инпут Логин(${xPath})`;
        }
        await page.waitFor(500);

        //Клик по Инпуту Пароль
        //xPath = `//input[@id="__BVID__27"]`;
        xPath = `//form[@class="login-form"]/fieldset[2]/div/div/div/div/input`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk){
            throw `FAIL => Клик по Инпуту Пароль(${xPath})`;
        }
        resOk = await TypeByXPath(page, xPath, LoginData.strPassword);
        if (!resOk){
            throw `FAIL => TypeByXPath => Инпут Пароль(${xPath})`;
        }
        await page.waitFor(500);

        //Проверить наличие предупреждений об ошибках

        xPathFeedBack = `//span[@class="custom-invalid-feedback"]`;
        nLength = await ElementGetLength(page, xPathFeedBack);
        if (nLength > 0){
            for (let i = 0; i < nLength; i++){
                sText = await ElementGetInnerText(page, i, xPathFeedBack);
                g_StrOutLog+=`\n => FAIL => "${sText}" `;
                await console.log(`=> FAIL => "${sText}" `);
            }
            throw `Вижу предупреждения об ошибках !!!`;
        }
        //Проверим состояние кнопки
        xPath = `//button[@type="submit"]`;
        sText = await ElementGetDisabled(page, 0, xPath);
        if (sText === 'disabled'){
            throw `FAIL => Кнопка ${xPath} => ${sText}`;
        }
        //Жмём на кнопку
        xPath+=`[contains(text(), "Авторизироваться")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk){
            throw `FAIL => Клик по Кнопке(${xPath})`;
        }
        // //div[@class="notification-content"][contains(text(), "Неверный e-mail или пароль")]
        xPath = `//div[@class="notification-content"][contains(text(), "Неверный e-mail или пароль")]`;
        resOk = await WaitForElementIsPresentByXPath(2000, page, xPath);
        if (resOk){
            await console.log(` FAIL !!! => Вижу ("Неверный e-mail или пароль")`);
        }
        // //img[@class="logo-menu"]
        xPath = `//img[@class="logo-menu"]`;
        resOk = await WaitForElementIsPresentByXPath(5000, page, xPath);
        if (!resOk){
            throw `FAIL !!! => Не вижу ЛОГО значит входа в систему НЕ ПРОИЗОШЛО !!! (наверно)`;
        }



        await console.log("         Вижу => ЛОГО FOX CFO");
        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        return true; //<-------------EXIT !!!

    }catch (err) {
        await console.log('\x1b[38;5;1m', "На странице (login) произошла ошибка", err, '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
        g_StrOutLog+=`"На странице (login) произошла ошибка" (${err}) \n`;
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        return false; //<-------------EXIT !!!

    }

};
//-----------------------------------------------------------------------------------------------

module.exports.StartBrowser = StartBrowser;
module.exports.BrowserGetPage = BrowserGetPage;
module.exports.LoginCrm = LoginCrm;
module.exports.LoginCfo = LoginCfo;
