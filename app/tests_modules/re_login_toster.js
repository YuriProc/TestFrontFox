let ReLoginToster = async (page) => {
    const nameTest = 'ReLoginToster';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    let ElPresent;
    try {
        ElPresent = await ElementIsPresent(page, '//div[@class="logo__icon"]');
        if (ElPresent) {
            //Клик по LOGO
            await page.click("div[class=logo__icon]");
            await page.waitFor(500);

            //Клик по ВЫЙТИ
            await ClickByXPath(page, '//div[@class="logout__icon"]');
            //await page.click("div[class=logout__label has-open]");
        }else{
            ElPresent = await WaitUntilElementIsPresentByXPath(5000, page, '//input[@id="email"]');
            if (!ElPresent){
                throw 'WaitUntilElementIsPresentByXPath(//input[@id="email"])';
            }
        }

        //Клик по инпуту ВАШ EMAIL

        // ElPresent = WaitUntilElementIsPresentByXPath(5000, page, '//input[@id="email"]');
        // if (ElPresent){
        //     await console.log('\x1b[38;5;2m', "         Вижу => input[id=email]" , '\x1b[0m');
        // }else {
        //     await console.log('\x1b[38;5;2m', "         НЕ Вижу => input[id=email]" , '\x1b[0m');
        // }
        await page.waitFor(2000);
        await page.click("input[id=email]");
        await page.type("input[id=email]", "test@test.com");
        //  id="email"
        // if (await ClickByXPath(page, '//input[@id="email"]') ){
        //     await console.log('\x1b[38;5;2m', "         Вижу => input[id=email]" , '\x1b[0m');
        // }else {
        //     await console.log('\x1b[38;5;2m', "         НЕ Вижу => input[id=email]" , '\x1b[0m');
        // }
        // await TypeByXPath(page, '//input[@id="email"]', "test@test.com");
        //
        // await page.waitFor(1000);

        //Клик по инпуту ВАШ ПАРОЛЬ
        await page.click("input[id=password]");
        await page.type("input[id=password]", 'test1234567890');

        //Клик по Кнопке ВОЙТИ //button[class=btn]
        await ClickByXPath(page, "//button[@class='btn'][./span[contains(text(), 'Войти')]]");

        let pLOk = await WaitUntilPageLoads(page);

        await page.waitForXPath('//div[contains(text(), "Вітаємо вас в системі FOX CRM")]', {timeout: 25000});

        let xPath = '//div[@class="title _text-center"][contains(text(), "Вітаємо вас в системі FOX CRM")]';
        ElPresent = await ElementIsPresent(page, xPath);

        if (ElPresent) {
            await console.log('\x1b[38;5;2m', "         Вижу => Вітаємо вас в системі FOX CRM", '\x1b[0m');
            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            return true; //<-------------EXIT !!!
        } else {
            g_StatusCurrentTest = 'Провален !!!';
            await g_FailedTests++;
            await console.log('\x1b[38;5;1m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            return false; //<-------------EXIT !!!
        }
    }catch (err) {
        await console.log('\x1b[38;5;1m', "На странице ВХОД В СИСТЕМУ произошла ошибка", err, '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        return false; //<-------------EXIT !!!

    }

}

module.exports.ReLoginToster = ReLoginToster;