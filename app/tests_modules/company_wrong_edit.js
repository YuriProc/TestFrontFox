//
// await page.evaluate(() => {
//     document.querySelector("div[class=form__footer]").scrollIntoView();
// });
// await page.waitFor(1000);
//Клик по кнопке  (Сохранить компанию)
// xPath = "//button[@class='btn'][./span[contains(text(), 'Сохранить компанию')]]";
// resOk = await ClickByXPath(page, xPath);
//
ScrollAndClickSave = async function (page) {
    const MyXPath = "//button[@class='btn'][./span[contains(text(), 'Сохранить компанию')]]";
    const linkHandlers = await page.$x(MyXPath);
    try {
        if (await linkHandlers.length > 0) {
            //  await page.evaluate(() => {
            //      document.querySelector("div[class=form__footer]").scrollIntoView();
            // });
            // await page.waitFor(500);
            await linkHandlers[0].click();
            // await page.waitFor(500);
            if (await ElementIsPresent(page, `//html[@class="nprogress-busy"]`) ){
                await WaitUntilPageLoads(page);
                const OkXPath = '//div[@class="noty_body"][contains(text(), "Успешно сохранено")]';
                if (await WaitUntilElementIsPresentByXPath(5000, page, OkXPath)) {
                    return true;
                }
            }else {
                return false;
            }
        } else {
            return false;
        }
    }catch (e) {
        return false;
    }
    return false;
}
//
let CompanyWrongEdit = async (page, strCodeCompany) => {
    const nameTest = NameFunction()+'->"' + strCodeCompany + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
    g_StrOutLog += `Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let width = 1200;
    let height = 880;
    let widthX = 1200;
    let heightX = 1800;
    let xPath;
    let ElPresent, ElPresent1, ElPresent2, ElPresent3;
    let resOk;
    let returnResult = false;
    await page.setViewport({width, height});

    //await page.setViewport({width2, height2});
    try {
        //Клик по LOGO
        await page.click("div[class=logo__icon]");
        await page.waitFor(500);

        //Клик по пункту КОМПАНИИ
        resOk = await ClickByXPath(page, '//a[@href="/company"]');
                    //await console.log('\x1b[38;5;2m', "ClickByXPath" ,resOk , '\x1b[0m');
        //Ждём загрузки страницы
        resOk = await WaitUntilPageLoads(page);
                    //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads" ,resOk , '\x1b[0m');

        await page.waitFor(500);
        //Клик по Инпуту ЕДРПОУ
        resOk = await ClickByXPath(page, '//input[@placeholder="ЕДРПОУ\\ИНН"]');
        if (!resOk) {
            throw 'ClickByXPath(//input[@placeholder="ЕДРПОУ\\ИНН"])';//<--специальный вызов ошибки!
        }
        //Вводим код Тестовой компании
        resOk = await TypeByXPath(page, '//input[@placeholder="ЕДРПОУ\\ИНН"]',strCodeCompany);
        //Ждём загрузки страницы
        resOk = await WaitUntilPageLoads(page);
                //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads" ,resOk , '\x1b[0m');
        //проверяем что нет надписи (//b[contains(text(), "Ничего не найдено")])
        resOk = await ElementIsPresent(page,'//b[contains(text(), "Ничего не найдено")]');
        if (resOk) {
            throw `Компании с таким ЕДРПОУ (${strCodeCompany}) нет в базе`;//<--специальный вызов ошибки!
        }
        await page.waitFor(500);
        // Клик по кнопке Редактировать table__option
        resOk = await ClickByXPath(page, '//a[@class="table__option"]');
        if (!resOk) {
            throw `Кнопки Редактировать на странице не найдено`;//<--специальный вызов ошибки!
        }

        await page.setViewport({width:widthX, height:heightX});
        resOk = await WaitUntilPageLoads(page);
                //await console.log('\x1b[38;5;2m', "После Редактировать WaitUntilPageLoads" ,resOk , '\x1b[0m');
        //Проверяем наличие на странице Характерных элементов
        resOk = await ElementIsPresent(page,'//label[@class="select__label"][contains(text(), "Тип компании")]');
                //await console.log('\x1b[38;5;2m', "Тип компании ElementIsPresent" ,resOk , '\x1b[0m');
        //Удаляем обязательные поля и пробуем сохранить компанию => сохранение не должно получиться!!!
        await console.log('\x1b[38;5;2m', "     Удаляем обязательные поля и пробуем сохранить компанию!!!", '\x1b[0m');

        //  "//div[./div[./input[@name='managers']]]"
        //await page.waitFor(5000);
        //resOk = await ClickByXPath(page, "//div[./div[./input[@name='managers']]]");
        //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[1]/div/div/div/div[2]/div[1]/span/i
        //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[1]/div/div/div/div[2]/input
        //[./div[./input[@name='managers']]]

        //Очищаем Тип Компании
        xPath = "//div[./input[@name='company_types']]/div[1]/span/i[@class='multiselect__tag-icon']";
        resOk = true;
        while (resOk) {
            resOk = await ClickByXPath(page, xPath);
        }
        //Очищаем Ответственный
        xPath = "//div[./input[@name='managers']]/div[1]/span/i[@class='multiselect__tag-icon']";
        resOk = true;
        while (resOk) {
            resOk = await ClickByXPath(page, xPath);
        }
                //await console.log('\x1b[38;5;2m', "Ответственный ClickByXPath" ,resOk , '\x1b[0m');

        //Очищаем Отсрочка Дней Оплаты
        //input[@id='delay_days']
        //await page.click("input[id=delay_days]");

        resOk = await ClickByXPath(page, "input[@id='delay_days']");
        //Очищаем значение
        await page.$eval('input[id=delay_days]', el => el.value = '');
        await page.type("input[id=delay_days]", ' ');
        //await page.keyboard.press('Enter', {delay: 100});
        //await console.log('\x1b[38;5;2m', "Очистили Отсрочка Дней Оплаты" , '\x1b[0m');
        //await page.waitFor(1000);
        //await page.waitFor(5000);
        // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[6]/div[2]/div/div/div/div[2]
        // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[6]/div[2]/div/div/div/div[1]/div[2]/input
        //Очищаем Условие Оплаты
        xPath = "//div[@class='select__clear']";
        resOk = await ClickByXPath(page, xPath);

        //await console.log('\x1b[38;5;2m', "Условие Оплаты ClickByXPath" ,resOk , '\x1b[0m');

        // await console.log('\x1b[38;5;2m', "Жмём кнопку Сохранить компанию", '\x1b[0m');
        // await page.waitFor(2000);
        //Жмём кнопку Сохранить компанию
        xPath = "//button[@class='btn'][./span[contains(text(), 'Сохранить компанию')]]";
        // resOk = await ClickByXPath(page, xPath);-------------------------------------------------------------
        // await page.waitFor(1000);
        //resOk = await ClickByXPath(page, xPath);
        resOk = await ScrollAndClickSave(page);//<-----------------------!!!
        // await console.log('\x1b[38;5;2m', "Нажали кнопку Сохранить компанию", resOk, '\x1b[0m');
        // await page.waitFor(2000);
        if (resOk) { //если Получилось то тест провален
            throw `Сохранение Без Всех Обязательных Полей !!!`;//<--специальный вызов ошибки!
        }

        //Заполняем Тип Компании
        //Клик по инпуту Тип компании
        xPath = "//div[@class='multiselect__tags'][./input[@name='company_types']]";
        resOk = await ClickByXPath(page, xPath);
        //Выбираем Заказчик
        await page.waitFor(500);
        resOk = await ClickByXPath(page, '//span[contains(text(), "Заказчик") ]');
        await console.log('\x1b[38;5;2m', "     Выбираем Заказчик", '\x1b[0m');
        await page.waitFor(500);
        //Жмём кнопку Сохранить компанию
        xPath = "//button[@class='btn'][./span[contains(text(), 'Сохранить компанию')]]";
        //resOk = await ClickByXPath(page, xPath);
        resOk = await ScrollAndClickSave(page);//<-----------------------!!!
        // await console.log('\x1b[38;5;2m', "Нажали кнопку Сохранить компанию", resOk, '\x1b[0m');
        // await page.waitFor(2000);
        if (resOk) { //если Получилось то тест провален
            throw `Сохранение Только с Тип Компании !!!`;//<--специальный вызов ошибки!
        }

        //заполняем Ответственный
        //Клик по инпуту Ответственный
        xPath = "//div[./div[./input[@name='managers']]]";
        //xPath = "//div[@class='multiselect__tags'][./input[@name='managers']]";
        resOk = await ClickByXPath(page, xPath);
        //await page.waitFor(5001111);
        //Выбираем Первого в списке
        await page.waitFor(1000);
        try {
            // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[5]/div/div/div/div[2]/input
            // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[5]/div/div/div/div[3]/ul/li[1]/span/span
            // //*[@id="app"]/div/main/div/div/div[2]/div[2]/div/div[1]/div[2]/div[5]/div/div/div/div[3]/ul/li[2]/span/span
            xPath = "//div[./div[@class='multiselect__tags'][./input[@name='managers']]]/div/ul/li/span/span";
            let linkManagers = await page.$x(xPath);
            if (await linkManagers.length < 1 ) {
                throw `Список Ответственных Пуст Нечего Выбрать !!!`;
            }

            let TextF = await page.evaluate(elm => elm.textContent, linkManagers[0]);
            TextF = await TextF.trim();
            await linkManagers[0].click();
            await console.log('\x1b[38;5;2m', "     Выбрали Ответственного", TextF , '\x1b[0m');
        }catch (e) {
            throw `Не получилось выбрать Ответственного ${e}`;
        }
        await page.waitFor(500);
        //Жмём кнопку Сохранить компанию
        xPath = "//button[@class='btn'][./span[contains(text(), 'Сохранить компанию')]]";
        //resOk = await ClickByXPath(page, xPath);
        resOk = await ScrollAndClickSave(page);//<-----------------------!!!
        if (resOk) { //если Получилось то тест провален
            throw `Сохранение Только с Тип Компании и Ответственный!!!`;//<--специальный вызов ошибки!
        }
        //Вводим Отсрочка Дней Оплаты 7
        await page.$eval('input[id=delay_days]', el => el.value = '');
        await page.type("input[id=delay_days]", '7');
        await console.log('\x1b[38;5;2m', "     Отсрочка Дней Оплаты 7", '\x1b[0m');
        //Жмём кнопку Сохранить компанию
        xPath = "//button[@class='btn'][./span[contains(text(), 'Сохранить компанию')]]";
        //resOk = await ClickByXPath(page, xPath);
        resOk = await ScrollAndClickSave(page);//<-----------------------!!!
        if (resOk) { //если Получилось то тест провален
            throw `Сохранение Только с Тип Компании ,Ответственный, Отсрочка !!!`;//<--специальный вызов ошибки!
        }
        //Выбираем Условие Оплаты
        //Клик по инпуту Условие оплаты
        await ClickByXPath(page, "//div[./input[@name='payment_condition']]");
        await page.waitFor(500);
        // Выбираем тип (По оригиналам банковских дней)
        await ClickByXPath(page, '//span[contains(text(), "По оригиналам банковских дней") ]');
        await console.log('\x1b[38;5;2m', "     Условие оплаты -> По оригиналам банковских дней", '\x1b[0m');
        await page.waitFor(500);
        //проверяем наличие КРАСНЫХ полей на странице
        xPath = '//span[@class="element__error"]';
        ElPresent = await ElementIsPresent(page, xPath);
        if(ElPresent) {
            await console.log('\x1b[38;5;1m', "     --> !!! Вижу Незаполненные Поля=>", xPath, '\x1b[0m');
            throw 'myException: Незаполненные Поля. ХЗ почему.';//<--специальный вызов ошибки!!!
        }
        //Скролл до ФУТЕРА
        // await page.evaluate(() => {
        //     document.querySelector("div[class=form__footer]").scrollIntoView();
        // });
        // await page.waitFor(1000);
        //Клик по кнопке  (Сохранить компанию)
        xPath = "//button[@class='btn'][./span[contains(text(), 'Сохранить компанию')]]";
        // resOk = await ClickByXPath(page, xPath);
        // await page.waitFor(1000);
        // resOk = await ClickByXPath(page, xPath);
        resOk = await ScrollAndClickSave(page);//<-----------------------!!!
        if (!resOk) {
                throw `Сохранение со ВСЕМИ Обязательными полями Не получилось !!!`;//<--специальный вызов ошибки!
            }
        // //Жмём кнопку Сохранить компанию
        // xPath = "//button[@class='btn'][./span[contains(text(), 'Сохранить компанию')]]";
        // resOk = await ClickByXPath(page, xPath);//если Получилось то тест ТЕПЕРЬ УДАЧНО ПРОЙДЕН!!!
        // if (!resOk) {
        //     throw `Сохранение со ВСЕМИ Обязательными полями Не получилось !!!`;//<--специальный вызов ошибки!
        // }
        await console.log('\x1b[38;5;2m', "  -->  OK !!!", resOk, '\x1b[0m');

        //await page.waitFor(5001111);


        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        returnResult = true;

    } catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Компании : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> Ошибка ${err} => ${g_StatusCurrentTest} \n`;
        returnResult = false;
        //await page.waitFor(5001111);
    }
    await page.setViewport({width, height});
    return returnResult;//<------------------EXIT !!!

};

module.exports.CompanyWrongEdit = CompanyWrongEdit;