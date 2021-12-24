let CompanyTableGetNewEDRPOU = async (browser, page, MaxTry, strEDRPOU = ``) => {
    let nameTest = NameFunction()+'->"' + strEDRPOU + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;


    let resOk;

    try{
        await page.setViewport({width: g_width, height: g_height});

        let {CompanyTable} = require("../tests_modules/sub_objects/company_table_obj.js");
        let CompanyData; // пустышка
        let NewCompanyTable = new CompanyTable( page , CompanyData);
        if(strEDRPOU === ``){
            strEDRPOU = await GetFunnyStr('StrCompanyCodeArray');
        }

        resOk = await NewCompanyTable.GetNewEDRPOU(MaxTry, strEDRPOU);
        if(resOk === false){
            throw 'NewCompanyTable.GetNewEDRPOU() FAIL!"';//<--специальный вызов ошибки!
        }
        nameTest = NameFunction()+'->"' + resOk + '"';

        g_StatusCurrentTest = 'Пройден';
        await g_SuccessfulTests++;
        await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        //await page.waitFor(11000);
        return resOk;//<------------------EXIT !!!

    }catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Компании : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        return false;//<------------------EXIT !!!
        //await page.waitFor(5001111);
    }

};
module.exports.CompanyTableGetNewEDRPOU = CompanyTableGetNewEDRPOU;
