let StartNewBrowser = async (StartBrowserInHeadLessMode=true) => {
    try {
        await console.log("StartNewBrowser");
        const puppeteer = require('puppeteer');



        let browser = await puppeteer.launch({
            headless: false,
            //headless: true,
           // headless: StartBrowserInHeadLessMode,

            slowMo: 0,
            //executablePath: 'node_modules/puppeteer/.local-chromium/mac-722234/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
            // executablePath: 'node_modules/puppeteer/.local-chromium/mac-722234/chrome-mac/Chromium-copy2.app/Contents/MacOS/Chromium',
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
                '--disable-notifications',
                //'--profile-directory="Default"',
            ],

        });
        let tempBV = await browser.version();
        await console.log(`tempBV=${tempBV}`);




        return browser;
    }catch (e) {
        await console.log(`Ошибка в StartNewBrowser => ${e}`);
        return false;
    }
};
let NewBrowserGetPage = async (browser, strPageURL) => {
    try {
        let page,page0,resOk;

        page = (await browser.pages())[0];
        //await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        //await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36');

        page.on('dialog', async dialog => {
            g_strDialogMessage = dialog.message();
            await console.log('\x1b[38;5;3m\t', g_strDialogInitiator + ` => АВТО_ПОДТВЕРЖДЕНИЕ:` + dialog.message() + ` [ OK ]`, '\x1b[0m');
            //await dialog.dismiss()
            await dialog.accept();
        })

        await page.setViewport({width: g_width, height: g_height});
        await page.goto(strPageURL);


        return page;
    }catch (e) {
        await console.log(`Ошибка в NewBrowserGetPage(${strPageURL})=> ${e} `);
        return false;

    }
};
//-----------------------------------------------------------------------------------------------

module.exports.StartNewBrowser = StartNewBrowser;
module.exports.NewBrowserGetPage = NewBrowserGetPage;
