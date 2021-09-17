let StartBrowser = async () => {
    try {


        await console.log("StartBrowser");
        const puppeteer = require('puppeteer');
        // let width = 1700;
        // let height = 950;
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
            //executablePath: 'node_modules/puppeteer/.local-chromium/mac-722234/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
            executablePath: 'node_modules/puppeteer/.local-chromium/mac-722234/chrome-mac/Chromium-copy2.app/Contents/MacOS/Chromium',
            ignoreHTTPSErrors: true,
            //devtools: true,
            //ignoreDefaultArgs: ['--disable-extensions'],
            args: [`--window-size=${g_width},${g_height+250}`,
                '--allow-running-insecure-content',
                //'--disable-dev-shm-usage',
                // '--proxy-server=https://10.10.10.230',
               // '--user-agent="Mozilla/5.0 (Windows NT 6.1; rv:60.7) Gecko/20100101 Firefox/60.7"',
                '--no-sandbox',
                '--ignore-certificate-errors',
                '--disable-setuid-sandbox',
                //'--disable-dns-over-https',
                '--disable-web-security',
                //'--start-fullscreen',
                //'--disable-web-security',
                //'--disable-safe-dns'
                //'--disable-notifications',
                //'--profile-directory="Default"',
                ],

        });
        // let tempBV = await browser.version();
        // await console.log(`tempBV=${tempBV}`);

// '--dns-prefetch-disable',
//         '--no-sandbox',
//             '--disable-setuid-sandbox',
//
//             '--ignore-certificate-errors',
//             '--allow-running-insecure-content',
        //args: [`--host-rules=MAP dev.cfo.tl.ee 123.456.789.012`],

        // async function init(){
        //     browser = await puppeteer.launch({
        //         //headless: false,
        //         ignoreHTTPSErrors: true,
        //         executablePath: config.executablePath,
        //         args: [
        //             '--no-sandbox',
        //             '--disable-gpu',
        //             '--disable-extensions',
        //             '--dns-prefetch-disable',
        //             '--disable-dev-shm-usage',
        //             '--ignore-certificate-errors',
        //             '--allow-running-insecure-content',
        //             '--enable-features=NetworkService',
        //         ],
        //     }).catch(e => console.error('Error!', e.message));
        // }


        // await console.log("puppeteer.launch");
        // await console.log(browser);

        return browser;
    }catch (e) {
        await console.log(`Ошибка в StartBrowser => ${e}`);
        return false;
    }
};

let BrowserGetPage = async (browser, strPageURL) => {
    try {
        let page,page0,resOk;
        // function sleep(ms) {
        //     return new Promise((resolve) => {
        //         setTimeout(resolve, ms);
        //     });
        // }
        // await sleep(5000);

        // page0 = await browser.newPage();
        // await page0.setViewport({width: g_width, height: g_height});
        // // await page0.goto(`chrome://settings/security?search=dns`);
        // await page0.goto(`chrome://settings/security#:~:text=%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D1%8B%D0%B9%20DNS-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80`);
        //
        // await console.log(`Хуйня0000`);
         //await page0.waitFor(5000);
        // let xDNS = `//cr-toggle[@id="control"][@aria-label="Помочь сделать Интернет безопасным для всех"]//span[@id="knob"]`;
        // //let xDNS = `/html/body/settings-ui//div[2]/settings-main//settings-basic-page//div[1]/settings-section[4]/settings-privacy-page//settings-animated-pages/settings-subpage[3]/settings-security-page//div[1]/settings-radio-group/settings-collapse-radio-button[2]/div[2]/settings-toggle-button[1]//div/cr-toggle//span[1]`;
        // //  /html/body/settings-ui//div[2]/settings-main//settings-basic-page//div[1]/settings-section[4]/settings-privacy-page//settings-animated-pages/settings-subpage[3]/settings-security-page//div[1]/settings-radio-group/settings-collapse-radio-button[2]/div[2]/settings-toggle-button[1]//div/cr-toggle//span[1]
        //
        // resOk = await ClickByXPath(page0,xDNS);
        // if (!resOk){
        //     await console.log(`Хуйня`);
        // }
        // await page0.waitFor(6000);
        // await page0.close();
//await console.log(`----------------------------------------------------------------------------------`);
//await console.log(browser);
        //page = await browser.newPage();
        page = (await browser.pages())[0];
        //await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        //await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36');

        page.on('dialog', async dialog => {
            strDialogMessage = dialog.message();
            await console.log(`АВТО_ПОДТВЕРЖДЕНИЕ:` + dialog.message());
            //await dialog.dismiss()
            await dialog.accept();
        })
        //height = height - 120;
        // let width = 1700;
        // let height = 950;
        //await page.waitFor(6000);
         await page.setViewport({width: g_width, height: g_height});
        await page.goto(strPageURL);
        // await page.setViewport({width: g_width, height: g_height});


        return page;
    }catch (e) {
        await console.log(`Ошибка в BrowserGetPage(${strPageURL})=> ${e} `);
        return false;

    }
};

let LoginCrm = async (page, browser, LoginData) => {
    const nameTest = NameFunction() +'"'+ LoginData.strUserLastName+'"';
    try {

    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    let ElPresent;
    let xPath,xButtonAuthorize,xButtonAuthorizeSpinner;
    let resOk;
    let NeedReLogin = true;
    let CountLogin = 0;
    let pLOk;

        //На всякий случай подождём Загрузки Страницы


        while (CountLogin<2 && NeedReLogin) {
            //await console.log(`CountLogin=${CountLogin} ; NeedReLogin=${NeedReLogin}`);
            //На всякий случай подождём Загрузки Страницы
            //await WaitRender(page);


            ElPresent = await WaitForElementIsPresentByXPath(5000, page, '//input[@name="Логин"]');
            if (!ElPresent) {
                throw '     FAIL => WaitForElementIsPresentByXPath(//input[@name="Логин""])\n';
            }
            //await page.waitFor(500);
            //await WaitRender(page);
            // Клик по инпуту ВАШ EMAIL
            // await page.click("input[name=Логин]");
            // //await page.waitFor(200);
            // await page.$eval('input[name=Логин]', el => el.value = '');
            // await page.type("input[name=Логин]", LoginData.strEmail);
            //await page.keyboard.type(LoginData.strEmail, {delay: 30});
            resOk = await SetTextByXPath(page,`//input[@name="Логин"]`,LoginData.strEmail);

            //resOk = await ClickByXPath(page, `//input[@name="Логин"]`);

            //resOk = await TypeByXPath(page,`//input[@name="Логин"]`, LoginData.strEmail );
           //await page.waitFor(500);


            //Клик по инпуту ВАШ ПАРОЛЬ
            // await page.click("input[name=Пароль]");
            // //await page.waitFor(200);
            // await page.$eval('input[name=Пароль]', el => el.value = '');
            // await page.type("input[name=Пароль]", LoginData.strPassword);
            //await page.keyboard.type(LoginData.strPassword, {delay: 30});
            resOk = await SetTextByXPath(page,`//input[@name="Пароль"]`,LoginData.strPassword);

            //await page.waitFor(5000);

            //resOk = await ClickByXPath(page, `//input[@name="Пароль"]`);

            //resOk = await TypeByXPath(page, `//input[@name="Пароль"]`, LoginData.strPassword);
            //await page.waitFor(500);

            //await WaitRender(page);
            //Клик по Кнопке Авторизироваться //button[class=btn]
            xButtonAuthorize = `//button[contains(text(), "Авторизироваться")]`;
            xButtonAuthorizeSpinner = xButtonAuthorize + `[div[@class="fox-spinner"]]`;
            ElPresent = await ClickByXPath(page, xButtonAuthorize);
            if (!ElPresent) {
                throw '     FAIL => ClickByXPath(page, \'//button[contains(text(), "Авторизироваться")]\');\n';
            }

            // await WaitRender(page);
            // resOk = await WarningCheck(page);
            // if(resOk !== ''){
            //     if (LoginData.ResolvedFailLogin) {
            //         return false; //<-------------EXIT !!!
            //     }else{
            //         throw `FAIL => Login WarningCheck"${resOk}"`;
            //     }
            // }

            // Подождём пока не пропадёт спиннер на кнопке "Авторизоваться"
            resOk = await WaitUntilXPathExist(page, 10500, xButtonAuthorizeSpinner);
            if (!resOk) {
                throw `     FAIL => не пропал спиннер на кнопке "Авторизоваться" \n WaitUntilXPathExist(page, 10500, ${xButtonAuthorizeSpinner});\n`;
            }

            //--------------------------------------------
            // myXPath = `//div[@class="notification-content"][contains(text(), "Неверный логин или пароль")]`;
            // ElPresent = await WaitForElementIsPresentByXPath(1000, page, myXPath);
            // if (ElPresent) {
            //     if (LoginData.ResolvedFailLogin) {
            //         await console.log('\x1b[38;5;2m', "         Вижу => (Неверный e-mail или пароль)", '\x1b[0m');
            //         await console.log('\x1b[38;5;2m', "         Будем Логиниться под root'ом и пробовать снова", '\x1b[0m');
            //         g_StatusCurrentTest = 'Пропущен';
            //         await g_SuccessfulTests++;
            //         await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
            //         g_StrOutLog += `=> ${g_StatusCurrentTest} \n`;
            //         return false; //<-------------EXIT !!!
            //
            //     }
            //     await console.log('     FAIL => "Неверный e-mail или пароль"');
            //     throw `FAIL => "Неверный e-mail или пароль"`;
            // }
            //--------------------------------------------

            //await TempStop(page);
            //Проверим наличие иконки ФОКСА = УСПЕШНЫЙ ВХОД)
            xPath = `//img[@src="/img/LogoFoXTop.0890cee9.svg"][@class="logo-menu"]`;
            ElPresent = await WaitForElementIsPresentByXPath(4000, page, xPath);
            if (!ElPresent) {
                await console.log('     Warning => Не вижу class="logo-menu"');
                await TempStop(page);
                g_StrOutLog += `\n => Warning => Не вижу class="logo-menu" \n`;
                throw `FAIL => Не вижу "Не вижу class="logo-menu""`;
            }
            CountLogin++;

            //Дождёмся окончательной загрузки страницы
            //pLOk = await WaitUntilPageLoads(page);
            await WaitRender(page);

            NeedReLogin = await ClickIfExistsUpdated(page);
            //await page.waitFor(1000);


        }//end while (CountLogin<2 && NeedReLogin)

        //Проверим на наличие "Аватарки"
        xPath = `//div[@class="crm-user-avatar"]`;
        ElPresent = await ElementIsPresent(page, xPath);
        if (!ElPresent) {
            throw `     FAIL => После Логина нет аватарки: ElementIsPresent(page, ${xPath}\n`;
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

        // await page.waitFor(3000);
        // await console.log(`await page.keyboard.press('F12');`);
        // //await page.keyboard.sendCharacter(String.fromCharCode(123)); //123 - F12; 32 - пробел; 13 - enter; 8 - Del
        // await page.keyboard.press('F12');
        // await page.keyboard.type('Hello World!');
        // const context = await browser.defaultBrowserContext();
        // await context.overridePermissions(g_FrontCrmFoxURL, ["notifications"]);

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
