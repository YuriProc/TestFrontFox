let MC_Clear_Call_List = async (LoginData, DealData) => {
    const nameTest = NameFunction()+'->"' + "МЦшник: " + LoginData.strUserLastName + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    let NewBrowser, NewPage, resOk;
    let width = 1900;
    let height = 880;
    let xPath;
    let tStr;

    try{
        let NewB = require('../tests_modules/login.js');
        NewBrowser = await NewB.StartBrowser();
        NewPage = await NewB.BrowserGetPage(NewBrowser, g_FrontCfoFoxURL);
        resOk = await NewB.LoginCrm(NewPage, NewBrowser, LoginData);
        if(!resOk){
            throw `FAIL -> NewB.LoginCrm(NewPage, NewBrowser, LoginData);`;
        }

        await WaitRender(NewPage);
        await NewPage.setViewport({width: g_width, height: g_height});
        // await MCSetAllIcons(NewPage);
        // await WaitRender(NewPage);
        // await WaitStop(`Icons`);
        // Проверка URL
        let strPageURL = await NewPage.url();
        tStr = g_FrontCfoFoxURL + `/monitoring-center`;
        if (strPageURL !== tStr){
            throw `FAIL -> После Логина МЦ, URL страницы (${strPageURL}) не равен (${tStr})`;
        }
        let {MCTable} = require('../tests_modules/sub_objects/mc_table_obj.js');
        let NewMCTable = new MCTable( NewBrowser, NewPage , DealData);
        resOk = await NewMCTable.CheckMCPage();
        if(!resOk){
            // throw `Fail -> NewMCTable.CheckMCPage();`;
            await console.log('\x1b[38;5;1m\t', `Проверка таблицы МЦ - Ошибки !!!`, '\x1b[0m');
        }else {
            await console.log('\x1b[38;5;2m\t', `Проверка таблицы МЦ - OK !!!`, '\x1b[0m');
        }
        // Очистить очередь на прозвон (полностью)
        resOk = await NewMCTable.ClearMCCallList();
        await WaitStop(`MMMMCCCC---------`);



 // await TempStop(NewPage , `CheckMCPage`);






        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest, "]=>", g_StatusCurrentTest, '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
       // await NewBrowser.close();
        return true;// <----------------------------- EXIT OK!!!

    }catch (err) {
        console.log('\x1b[38;5;1m', "!!!! Ошибка на странице МЦ : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;

    }
   // await NewBrowser.close();
    return false;// <----------------------------- EXIT FAILED FALSE!!!
};

module.exports.MC_Clear_Call_List = MC_Clear_Call_List;
