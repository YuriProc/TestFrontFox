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
    let resOk;

        // Если есть (//div[@class="logo__icon"])
        ElPresent = await ElementIsPresent(page, '//div[@class="logo__icon"]');
        if (ElPresent) {
            //Клик по LOGO
            await page.click("div[class=logo__icon]");
            await page.waitFor(500);
            //Клик по ВЫЙТИ
            resOk = await ClickByXPath(page, '//div[@class="logout__icon"]');
            if (!resOk){
                throw '     FAIL => ClickByXPath(//div[@class="logout__icon"])\n';
            }
            await console.log(`     LogOut => LogIn=> "${LoginData.strUserLastName}"`);
            g_StrOutLog+=`\n => LogOut => LogIn=> "${LoginData.strUserLastName}" `;
        }

        //На всякий случай подождём Загрузки Страницы
        //await WaitUntilPageLoads(page);

        // Если есть сообщения, подождём пока они пропадут
        await WaitUntilMessageExist(page);
        //Проверим Наличие (//input[@id="email"])
        ElPresent = await WaitForElementIsPresentByXPath(5000, page, '//input[@id="email"]');
        if (!ElPresent){
            throw '     FAIL => WaitForElementIsPresentByXPath(//input[@id="email"])\n';
        }
        //Клик по инпуту ВАШ EMAIL
        await page.click("input[id=email]");
        await page.$eval('input[id=email]', el => el.value = '');
        await page.type("input[id=email]", LoginData.strEmail);

        //Клик по инпуту ВАШ ПАРОЛЬ
        await page.click("input[id=password]");
        await page.$eval('input[id=password]', el => el.value = '');
        await page.type("input[id=password]", LoginData.strPassword);
        //await page.waitFor(5000);

        //Клик по Кнопке ВОЙТИ //button[class=btn]
        await ClickByXPath(page, "//button[@class='btn'][./span[contains(text(), 'Войти')]]");

        //await page.waitFor(5000);
        //Проверим на наличие сообщения об ОШИБКАХ
        let myXPath = `//div[@class="noty_body"][contains(text(), "Неверный e-mail или пароль")]`;
        ElPresent = await WaitForElementIsPresentByXPath(1000, page, myXPath);
        if (ElPresent){
            if (LoginData.ResolvedFailLogin){
                await console.log('\x1b[38;5;2m', "         Вижу => (Неверный e-mail или пароль)", '\x1b[0m');
                await console.log('\x1b[38;5;2m', "         Будем Логиниться под root'ом и пробовать снова", '\x1b[0m');
                g_StatusCurrentTest = 'Пропущен';
                await g_SuccessfulTests++;
                await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                return false; //<-------------EXIT !!!

            }
            await console.log('     FAIL => "Неверный e-mail или пароль"');
            throw `FAIL => "Неверный e-mail или пароль"`;
        }

        //Проверим на наличие сообщения об УСПЕШНОМ ВХОДЕ (Выполнено!)
        myXPath = `//div[@class="noty_body"][contains(text(), "Выполнено!")]`;
        ElPresent = await WaitForElementIsPresentByXPath(3000, page, myXPath);
        if (!ElPresent){
            await console.log('     Warning => Не вижу "Выполнено!"');
            g_StrOutLog+=`\n => Warning => Не вижу "Выполнено!" \n`;
            //throw `FAIL => Не вижу "Выполнено!"`;
        }
        //Дождёмся окончательной загрузки страницы
        let pLOk = await WaitUntilPageLoads(page);
        //await page.waitForXPath('//div[contains(text(), "Вітаємо вас в системі FOX CRM")]', {timeout: 25000});

        //Проверим на наличие "Вітаємо вас в системі FOX CRM"
        let xPath = '//div[@class="title _text-center"][contains(text(), "Вітаємо вас в системі FOX CRM")]';
        ElPresent = await WaitForElementIsPresentByXPath(2000, page, xPath);
        if (!ElPresent) {
            await console.log('     FAIL => Не вижу "Вітаємо вас в системі FOX CRM"');
            throw `FAIL => Не вижу "Вітаємо вас в системі FOX CRM"`;
        }


        await console.log('\x1b[38;5;2m', "         Вижу => Вітаємо вас в системі FOX CRM", '\x1b[0m');
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
        resOk = await ElementIsPresent(page, xPath);
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
