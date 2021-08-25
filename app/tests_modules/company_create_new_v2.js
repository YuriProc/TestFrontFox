
let CompanyCreateNewV2 = async (browser, page, CompanyData) => {
    const nameTest = NameFunction()+'->"' + CompanyData.strCodeCompany + '"';
    g_StatusCurrentTest = 'Запущен';
    g_LaunchedTests++;
    await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
    g_StrOutLog+=`Тест[ ${nameTest} ]=> ${g_StatusCurrentTest} `;

    //await page.waitFor(500);
    // let width = 1700;
    // let height = 950;
    let resOk;
    let xPath, MyXPath, xpLogoPhoto, PhotoURL, xPathPhones, xPathUrlS;
    let tStr, strTT, strInnerText, strAlreadyCreated, strNotCorrect, strNotFind, strErrorActivity;
    let strCompanyTypesFromPage;
    let QLength;
    let strCheck;
    let Selector;
    let ElPresent;
    let ElPresent1,ElPresent2,ElPresent3,ElPresent4;
    //let TypesCompPres = [false,false,false,false];
    let findCreatedCompanyOk = false;
    try {
    await page.setViewport({width: g_width, height: g_height});


        var {Company} = require("../tests_modules/sub_objects/company_obj.js");
        let NewCompany = new Company(browser, page , CompanyData);
        resOk = await NewCompany.ClickCompanyCreateNewPlus();
        if (!resOk) {
            throw 'NewCompany.ClickCompanyCreateNewPlus(); = FAIL!"';//<--специальный вызов ошибки!
        }

// КОМПАНИЯ ДОЛЖНА БЫТЬ УЖЕ СОЗДАНА
        // Проверка открытой формы
        resOk = await NewCompany.CheckCompanyForm();
        if (!resOk) {
            throw 'NewCompany.CheckCompanyForm(); = FAIL!"';//<--специальный вызов ошибки!
        }

        // resOk = await NewCompany.AddNewCompanyTypes();
        // if (!resOk) {
        //     throw 'NewCompany.AddNewCompanyTypes(); = FAIL!"';//<--специальный вызов ошибки!
        // }
        //
        // resOk = await NewCompany.CheckBossPresent();
        // if (!resOk) {
        //     throw 'NewCompany.CheckBossPresent(); = FAIL!"';//<--специальный вызов ошибки!
        // }
        //
        // resOk = await NewCompany.AddNewCargoTypes();
        // if (!resOk) {
        //     throw 'NewCompany.AddNewCargoTypes(); = FAIL!"';//<--специальный вызов ошибки!
        // }
        //
        // resOk = await NewCompany.AddNewPhoneNumber();
        // if (!resOk){
        //     throw `FAIL => AddNewPhoneNumber`;
        // }
        //
        // resOk = await NewCompany.AddNewEmail();
        // if (!resOk){
        //     throw `FAIL => AddNewEmail`;
        // }
        //
        // resOk = await NewCompany.AddNewLink();
        // if (!resOk){
        //     throw `FAIL => AddNewLink`;
        // }
        //
        // resOk = await NewCompany.AddNewContract();
        // if (!resOk){
        //     throw `FAIL => AddNewContract`;
        // }

        resOk = await NewCompany.AddNewLocation();
        if (!resOk){
            throw `FAIL => AddNewLocation`;
        }

// СОХРАНИТЬ КОМПАНИЮ ---------------------------------------

        await WaitRender(page);
        xPath=`//main[contains(@class, "company-body")]//button[contains(@class, "fox-button__primary")][contains(text(), "Сохранить")]`;
        resOk = await ClickByXPath(page, xPath);
        if (!resOk) {
            throw `FAIL => Клик СОХРАНИТЬ КОМПАНИЮ (${xPath})`;
        }

        await WaitRender(page);
        // await console.log('СОХРАНИТЬ КОМПАНИЮ');
        // await TempStop(page);

// Компания успешно сохранена!

        let WarningText = await WarningCheck(page);
        if(WarningText === 'Компания успешно сохранена!'){
            resOk = true;
        }else{
            resOk = false;
        }

        if (resOk) {
            //await console.log('\x1b[38;5;2m', "Вижу =>", xPath, '\x1b[0m');

            g_StatusCurrentTest = 'Пройден';
            await g_SuccessfulTests++;
            await console.log('\x1b[38;5;2m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            CompanyData.returnResult = true;
            //await page.waitFor(11000);
            return CompanyData;//<------------------EXIT !!!
        }else {
            //await console.log('\x1b[38;5;1m', "Не Вижу =>", xPath, '\x1b[0m');
            await console.log('\x1b[38;5;1m', "!!!! На странице Компании что то пошло не так !!!" , '\x1b[0m');
            await console.log('\x1b[38;5;1m', `WarningText = ${WarningText}` , '\x1b[0m');
            g_StatusCurrentTest = 'Провален !!!';
            await g_FailedTests++;
            await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
            g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
            CompanyData.returnResult = false;
            //await page.waitFor(11000);
            return CompanyData;//<------------------EXIT !!!
        }

    }catch (err) {
        await console.log('\x1b[38;5;1m', "!!!! Ошибка на странице Компании : ",err , '\x1b[0m');
        g_StatusCurrentTest = 'Провален !!!';
        await g_FailedTests++;
        await console.log('\x1b[38;5;1m', "Тест[", nameTest,"]=>" ,g_StatusCurrentTest , '\x1b[0m');
        g_StrOutLog+=`=> ${g_StatusCurrentTest} \n`;
        CompanyData.returnResult = false;
        //await page.waitFor(5001111);
    }

    return CompanyData;//<------------------EXIT !!!
};// End Test CompanyCreateNewV2

// LocalFunctions---------------------------------------------------------------------------------------------
//--------
//--------
let XFUNCTIONS;
XFUNCTIONS = async  function( page , CompanyData){
    try {
        let xPath, resOk;
        await WaitUntilPageLoads(page);

        await WaitUntilPageLoads(page);

        return true;
    }catch (e) {
        await console.log(e);
        return false;
    }
};
//--------
// End LocalFunctions---------------------------------------------------------------------------------------------
module.exports.CompanyCreateNewV2 = CompanyCreateNewV2;
