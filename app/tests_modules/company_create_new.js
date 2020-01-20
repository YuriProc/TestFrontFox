let CompanyCreateNew = async (page, strCodeCompany) => {
    const nameTest = NameFunction()+'->"' + strCodeCompany + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1200;
    let height = 880;
    let xPath;
    let ElPresent,ElPresent1,ElPresent2,ElPresent3;
    let findCreatedCompanyOk = false;
    await page.setViewport({width, height});
    try{
        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);
        //await page.click("a[href='/company']");
        let linkCompany = await page.$x('//a[@href="/company"]');
        await linkCompany[0].click();
        //Ждём загрузки страницы

        let pLOk = await WaitUntilPageLoads(page);
        //await console.log('\x1b[38;5;2m', "PageLoadOk =>", pLOk, '\x1b[0m');
        //Ждём появления тайтла компании( на экране должен появиться список всех компаний)
        await page.waitForXPath('//div[@class="head__title"]', {visible: true, timeout: 12000});
        await page.waitForXPath("//div[contains(text(), 'Компании')]", {timeout: 12000});
        //Клик по кнопке создать
        let linkButtonCreate = await page.$x("//span[contains(text(), 'Создать')]");
        await linkButtonCreate[0].click();
        //Ждём загрузки страницы
        pLOk = await WaitUntilPageLoads(page);
        //await console.log('\x1b[38;5;2m', "PageLoadOk2  =>", pLOk, '\x1b[0m');
        //Ждём появления тайтла Создать компанию
        await page.waitForXPath('//div[@class="head__title"][contains(text(), "Создать компанию")]', {visible: true, timeout: 15000});
        //await console.log('\x1b[38;5;2m', "Вижу => Создать компанию", '\x1b[0m');
        await page.waitForXPath('//label[@class="element__label"][contains(text(), "ЕДРПОУ\\ИНН ")]', {visible: true, timeout: 15000});
        //await console.log('\x1b[38;5;2m', "Вижу => ЕДРПОУ\\ИНН ", '\x1b[0m');
        await page.waitForXPath('//input[@id="code"]', {visible: true, timeout: 15000});
        //await console.log('\x1b[38;5;2m', "Вижу => input[@id=\"code\"] ", '\x1b[0m');
        await page.click("input[id=code]");
        // Вводим код ЕДРПОУ
        await page.type("input[id=code]",strCodeCompany);
        // Жмём проверить в базе
        let linkButtonVerifyInBase = await page.$x("//span[contains(text(), 'Проверить в базе')]");
        await linkButtonVerifyInBase[0].click();
        //await console.log('\x1b[38;5;2m', "Кликнул => span[contains(text(), 'Проверить в базе')] ", '\x1b[0m');
        //Ждём загрузки страницы
        pLOk = await WaitUntilPageLoads(page);
        //await console.log('\x1b[38;5;2m', "PageLoadOk3  =>", pLOk, '\x1b[0m');

        xPath = '//div[@class="noty_body"][contains(text(), "Данная компания уже создана!")]';
        ElPresent = await ElementIsPresent(page, xPath);

        if(ElPresent) {
            await console.log('\x1b[38;5;2m', "     Вижу => Данная компания уже создана!", '\x1b[0m');
        }else{

            //Вы ввели некоректный ЕДРПОУ компании!
            //Данные не найдены!
            xPath = '//div[@class="noty_body"][contains(text(), "Вы ввели некоректный ЕДРПОУ компании!")]';
            ElPresent = await ElementIsPresent(page, xPath);
            xPath = '//div[@class="noty_body"][contains(text(), "Данные не найдены!")]';
            ElPresent1 = await ElementIsPresent(page, xPath);
            if(ElPresent || ElPresent1) {
                await console.log('\x1b[38;5;2m', "Вижу =>",xPath, '\x1b[0m');
                g_StatusCurrentTest = 'Провален !!!';
                await g_FailedTests++;
                await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                findCreatedCompanyOk = false;
                //await page.waitFor(5001111);
                return findCreatedCompanyOk;//<------------------EXIT !!!
            }else{
                await console.log('\x1b[38;5;2m', "         Кажется это новая компания, но это не точно.", '\x1b[0m');
            }
        }
        //Опять Ждём Загрузки Страницы
        pLOk = await WaitUntilPageLoads(page);
        //await console.log('\x1b[38;5;2m', "PageLoadOk4  =>", pLOk, '\x1b[0m');

        await page.waitForXPath('//label[@class="select__label"][contains(text(), "Тип компании")]', {visible: true, timeout: 2000});

        //Ждём появление Инпута ТИП КОМПАНИИ
        await page.waitForXPath('//input[@name="company_types"]', {visible: true, timeout: 2000});
        //Сука по этому XPath нельзя кликнуть , он перекрыт Span "Выберите"
        // Хитрый XPath выбрать родителя содержащего конкретного ребёнка
        //("//div[./div[@class='MyClassName1' and text()='MyText']]")
        // const linkHandlers = await page.$x("//div[./input[@name='company_types']]");// <--работает!!!
        // linkHandlers[0].click();// <--работает!!!

        //Проверяем заполнено ли поле тип компании
        //проверяем по наличию на странице span(Заказчик, Перевозчик, Экспедитор) class="multiselect__tag
        ElPresent1 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Заказчик")]]');
        ElPresent2 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Перевозчик")]]');
        ElPresent3 = await ElementIsPresent(page, '//span[@class="multiselect__tag"][./span[contains(text(), "Экспедитор")]]');
        if(ElPresent1 || ElPresent2 || ElPresent3) {
            await console.log('\x1b[38;5;2m', "     --> поле тип компании заполнено", '\x1b[0m');

        }else {
            // Ввожу ТИП КОМПАНИИ
            //Клик по Инпуту ТИП КОМПАНИИ
            await ClickByXPath(page, "//div[./input[@name='company_types']]");

            // Выбираем тип( Заказчик )
            await page.waitFor(500);
            await ClickByXPath(page, '//span[contains(text(), "Заказчик") ]');
            await console.log('\x1b[38;5;2m', "    --> Выбрали тип( Заказчик )", '\x1b[0m');
            await page.waitFor(500);

        }


        //Проверяем заполнено ли поле Ответственный
        //проверяем по наличию на странице span(Выберите из списка или введите фамилию для поиска)
        ElPresent1 = await ElementIsPresent(page, '//span[contains(text(), "Выберите из списка или введите фамилию для поиска")]');
        if (ElPresent1){
            //Значит Ответственный не выбран
            //Клик по Инпуту Ответственный
            //await ClickByXPath(page, "//div[./input[@name='managers']]");
            await ClickByXPath(page, "//div[./div[./input[@name='managers']]]");

            // Выбираем ответственного менеджера
            await page.waitFor(500);
            let linkManagers = await page.$x("//li[@class='multiselect__element']");
            await linkManagers[3].click();
            await console.log('\x1b[38;5;2m', "     --> Выбрали ответственного менеджера [3]", '\x1b[0m');
            await page.waitFor(1000);
        }else {
            await console.log('\x1b[38;5;2m', "     --> поле Ответственный заполнено", '\x1b[0m');
        }



        //Клик по инпуту Отсрочка дней оплаты
        //await console.log('\x1b[38;5;2m', "Клик по инпуту Отсрочка дней оплаты", '\x1b[0m');
        await page.click("input[id=delay_days]");
        //Очищаем значение
        await page.$eval('input[id=delay_days]', el => el.value = '');
        //await page.keyboard.press('Enter', {delay: 100});

        await page.type("input[id=delay_days]", '7');
        await console.log('\x1b[38;5;2m', "     --> Отсрочка дней оплаты Написали 7", '\x1b[0m');
        //await page.waitFor(11111500);
        //Прверяем заполнено ли поле условие оплаты
        //class="multiselect__single"
        ElPresent1 = await ElementIsPresent(page, '//span[@class="multiselect__single"][contains(text(), "По оригиналам банковских дней")]');
        ElPresent2 = await ElementIsPresent(page, '//span[@class="multiselect__single"][contains(text(), "По оригиналам календарных дней")]');
        if (ElPresent1 || ElPresent2) {
            await console.log('\x1b[38;5;2m', "     --> Вижу поле условие оплаты заполнено", '\x1b[0m');
        }else {
            //Клик по инпуту Условие оплаты
            await ClickByXPath(page, "//div[./input[@name='payment_condition']]");
            await page.waitFor(500);
            // Выбираем тип (По оригиналам банковских дней)
            await ClickByXPath(page, '//span[contains(text(), "По оригиналам банковских дней") ]');
            await console.log('\x1b[38;5;2m', '     --> Выбрали "По оригиналам банковских дней"', '\x1b[0m');
            await page.waitFor(1000);
        }
        //Скролл до ФУТЕРА
        //await console.log('\x1b[38;5;2m', "div[class=form__footer]=> scrollIntoView", '\x1b[0m');
        await page.evaluate(() => {
            //document.querySelector('.nav-worker_threads').scrollIntoView();
            document.querySelector("div[class=form__footer]").scrollIntoView();
        });
        await page.waitFor(1000);
        //Клик по кнопке  (Сохранить компанию)
        await console.log('\x1b[38;5;2m', "     --> Клик по кнопке  (Сохранить компанию)  =>", '\x1b[0m');
        await ClickByXPath(page, "//span[contains(text(), 'Сохранить компанию')]");
        await page.waitFor(500);
        //Проверяем на ошибки обязательных полей
        xPath = '//span[@class="element__error"]';
        ElPresent = await ElementIsPresent(page, xPath);
        if(ElPresent) {
            await console.log('\x1b[38;5;1m', "     --> !!! Вижу Незаполненные Поля=>", xPath, '\x1b[0m');
            throw 'myException: Незаполненные Поля. ХЗ почему.';//<--специальный вызов ошибки!!!
        }else {

            //Ждём начала прогрузки страницы
            //await page.waitForSelector(`html[class=nprogress-busy]`, { timeout: 2000});
            await WaitUntilElementIsPresentByXPath(1000, page, '//html[@class="nprogress-busy"]');
            //Ждём и проверяем Успешно сохранено //Успешно сохранено
            xPath = '//div[@class="noty_body"][contains(text(), "Успешно сохранено")]';
            ElPresent = await WaitUntilElementIsPresentByXPath(11000, page, xPath);
            if (ElPresent) {
                await console.log('\x1b[38;5;2m', "Вижу =>", xPath, '\x1b[0m');

                g_StatusCurrentTest = 'Пройден';
                await g_SuccessfulTests++;
                await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                findCreatedCompanyOk = true;
                //await page.waitFor(11000);
                return findCreatedCompanyOk;//<------------------EXIT !!!

            }else {
                await console.log('\x1b[38;5;1m', "Не Вижу =>", xPath, '\x1b[0m');
                await console.log('\x1b[38;5;1m', "!!!! На странице Компании что то пошло не так !!!" , '\x1b[0m');
                g_StatusCurrentTest = 'Провален !!!';
                await g_FailedTests++;
                await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
                g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
                findCreatedCompanyOk = false;
                //await page.waitFor(11000);
                return findCreatedCompanyOk;//<------------------EXIT !!!
            }
        }
        //await page.waitFor(9000);





        findCreatedCompanyOk = false;
        //await page.waitFor(5001111);

    }catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Компании : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        findCreatedCompanyOk = false;
        //await page.waitFor(5001111);
    }



    return findCreatedCompanyOk;//<------------------EXIT !!!
};

module.exports.CompanyCreateNew = CompanyCreateNew;