
let StartBrowser = async () => {
    await console.log("StartBrowser");
    const puppeteer = require('puppeteer');
    let width = 1200;
    let height = 1500;
    let StartBrowserInHeadLessMode;
    await console.log('\x1b[38;5;2m', "g_ShowActionInBrowser=>" ,g_ShowActionInBrowser , '\x1b[0m');
    if (await g_ShowActionInBrowser) {
        StartBrowserInHeadLessMode = false;
        await console.log('\x1b[38;5;2m', "StartBrowserInHeadLessModeF=>" ,StartBrowserInHeadLessMode , '\x1b[0m');
    }else {
        StartBrowserInHeadLessMode = true;
        await console.log('\x1b[38;5;2m', "StartBrowserInHeadLessModeT=>" ,StartBrowserInHeadLessMode , '\x1b[0m');
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
};

let BrowserGetPage = async (browser) => {
    let strLoginURL = g_FrontFoxURL+'/login';
    let page;
    page = await browser.newPage();
    //height = height - 120;
    width = 1200;
    height = 880;
    await page.setViewport({width, height});
    await page.goto(strLoginURL);

    return page;
};

let LoginPage = async (page) => {
    const nameTest = NameFunction()+'->"' + 'root' + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;


    let returnResult = false;
    //let strLoginURL = g_FrontFoxURL+'/login';

    let width = 1200;
    let height = 880;
    //let page;
    try {
        // page = await browser.newPage();
        // //height = height - 120;
        await page.setViewport({width, height});
        // await page.goto(strLoginURL);
                //console.log("page.goto->", strLoginURL);
        await page.click("input[id=email]");
// await page.type("input[id=email]", "grinevich@transloyd.com");
//'name' => 'root',
//             'email' => 'root@root.com',
//             'password' => 'root1234567'
        await page.type("input[id=email]", "root@root.com");
// console.log("grinevich@transloyd.com");
        //console.log("page.type(input[id=email])->", "root@root.com");
        await page.click("input[id=password]");

// await page.type("input[id=password]", '1');
        await page.type("input[id=password]", 'root1234567');
        //console.log("page.type(input[id=password])->", "***********");
        await page.click("button[class=btn]");
        //console.log("page.click(button[class=btn])->", "Войти");
        await page.waitFor(500);
        try {
            await page.waitForXPath('//div[contains(text(), "Неверный e-mail или пароль")]', {timeout: 2000});
            await console.error('\x1b[38;5;1m', "Ошибка!!! Вход не выполнен: неверный email или пароль !!!", '\x1b[0m');
            g_StatusCurrentTest = 'Провален !!!';
            await g_FailedTests++;
            await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> Ошибка!!! Вход не выполнен: неверный email или пароль !!! => ${g_StatusCurrentTest} \n`;
            returnResult = false;
            //process.exit(0);
        }catch (errOk) {
            
        }
        try {
            await page.waitForXPath('//div[contains(text(), "Выполнено")]', {timeout: 25000});
            await page.waitForXPath('//div[contains(text(), "Вітаємо вас в системі FOX CRM")]', {timeout: 25000});
            //await console.log('\x1b[38;5;2m', "Вітаємо вас в системі FOX CRM", '\x1b[0m');
            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> Вітаємо вас в системі FOX CRM => ${g_StatusCurrentTest} \n`;
            returnResult = true;
        } catch (err) {
            //Так и должно быть!
            await console.error('\x1b[38;5;1m', "Ошибка!!! Нет Приветствия \"Вітаємо вас в системі FOX CRM\" !!!", '\x1b[0m');
            g_StatusCurrentTest = 'Провален !!!';
            await g_FailedTests++;
            await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> Ошибка!!! Нет Приветствия (Вітаємо вас в системі FOX CRM) => ${g_StatusCurrentTest} \n`;
            returnResult = false;
            //process.exit(0);
        }
    }catch (e) {
        //Так и должно быть!
        await console.error('\x1b[38;5;1m', "Ошибка!!! Ошибка на странице /login !!!",e, '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка!!!  Ошибка на странице /login !!! => ${g_StatusCurrentTest} \n`;
        returnResult = false;
        //process.exit(0);

    }

 return returnResult;
};
module.exports.StartBrowser = StartBrowser;
module.exports.BrowserGetPage = BrowserGetPage;
module.exports.LoginPage = LoginPage;