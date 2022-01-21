let TempSetPass = async (show = false) => {
    let NewBrowser, NewPage, xPath, resOk;
    try {
        let NewB = require('../tests_modules/login.js');
        let TempShow = g_ShowActionInBrowser;
        g_ShowActionInBrowser = show;
        NewBrowser = await NewB.StartBrowser();
        g_ShowActionInBrowser = TempShow;
        // let strURLpgA = `http://10.10.10.232/pgadmin4/login`;
        let strURLpgA = `http://10.10.10.232/pgadmin4/login?next=%2Fpgadmin4%2Fbrowser%2F`;
        NewPage = await NewB.BrowserGetPage(NewBrowser, strURLpgA);
        let LoginDataPGA = {
            strEmail: 'efremov@localhost',
            strPassword: 'Hector093',
        }
        let PData = {
            LoginDataPGA: LoginDataPGA,
        }
        let {PGA} = require("../tests_modules/sub_objects/pga_obj.js");
        let NewPGA = new PGA(NewBrowser, NewPage, PData);
        resOk = await NewPGA.LoginPGA();

        await WaitRender(NewPage);

        resOk = await NewPGA.ExpandServers();
        resOk = await NewPGA.ExpandDev();

        await TempStop(NewPage, `PGA - STOP`);
        // await WaitMS(5000);
        // let {Contact} = require('../tests_modules/sub_objects/contact_obj.js');
        // let NewContact = new Contact(NewBrowser, NewPage, ContactData);
        // // Клик по пункту верхнего меню "Водители"
        // let xMenuDrivers = `//a[@href="/crm/drivers"][contains(text(), "Водители")]`;
        // resOk = await ClickByXPath(NewPage, xMenuDrivers, );

        // Переход по Линку на контакт Водителя
        // await console.log(`ContactData.strLink=(${ContactData.strLink})`);
        let strUrls = [
            `${g_BackCfoFoxURL}/api/auth-user`,
            `${g_BackCfoFoxURL}/api/personal-stats`,
            `${g_BackCfoFoxURL}/api/contact-type`,
            `${g_BackCfoFoxURL}/api/constructor/contact/${ContactData.strContactID}`,
        ];
        resOk = await ResponsesListener(NewPage, strUrls, true, strUrls.length);
        await NewPage.goto(ContactData.strLink);
        resOk = await ResponsesListenerWaitForAllResponses(31000);
        // Снимаем слушателя
        await ResponsesListener(NewPage, strUrls, false, strUrls.length);
        if(!resOk){
            throw `Fail -> ResponsesListenerWaitForAllResponses(31000)`;
        }
        await WaitRender(NewPage);
        await NewPage.evaluate(pageCursor, false); // true - BIG курсор )))
        await WaitRender(NewPage);
        return true;
    }catch (e) {
        await console.log(`Ошибка в StartNewBrowser => ${e}`);
        return false;
    }
};

//-----------------------------------------------------------------------------------------------

module.exports.TempSetPass = TempSetPass;

