class PGA {
    constructor(browser, page, PData) {
        this.browser = browser;
        this.page = page;
        this.PData = PData;
        this.xLoginEmailInput = `//input[@name="email"]`;
        this.xLoginPasswordInput = `//input[@name="password"]`;
        this.xLoginButton = `//button[@value="Login"][contains(text(), "Login")]`;
        this.xTree = `//div[@class="wcPanelTabContent"][@id="0"]//div[@class="pg-panel-content"]/div[@id="tree"]`;
        this.xLevel_0 = this.xTree + `/ul[@class="aciTreeUl"]/li`;
        // div[@class="aciTreeLine"][@aria-expanded="false"] or true
        this.xServers = this.xLevel_0 + `/div[@class="aciTreeLine"]/div[@class="aciTreeEntry"][//span[@class="aciTreeText"][contains(text(), "Servers")]]`;
        this.xServersExpanded = this.xLevel_0 + `/div[@class="aciTreeLine"][@aria-expanded="true"]/div[@class="aciTreeEntry"][//span[@class="aciTreeText"][contains(text(), "Servers")]]`;
        this.xServersButton = this.xServers + `/span[@class="aciTreeButton"]`;
        // this.xDev = this.xLevel_0 + `/ul/li[//span[@class="aciTreeText"][text()="dev"]]`;
        this.xDev = this.xLevel_0 + `/ul/li[//span[@class="aciTreeText"][.='dev']]`;
        // //ul/li[div/div/div/span/span[@class="aciTreeText"][.='dev']]/div/div/div/span[@class="aciTreeButton"];
        // //span[@class="aciTreeText"][.='dev']
        // //span[@class="aciTreeText"][.='dev']/parent::span/preceding-sibling::span[@class="aciTreeButton"]
        // //span[@class="aciTreeText"][.='dev']/../preceding-sibling::span[@class="aciTreeButton"]
        // //span[@class="aciTreeText"][.='dev']/..//../span[@class="aciTreeButton"]
        // this.xDev = this.xLevel_0 + `/ul/li[/div/div/div/span/span/span[@class="aciTreeText"][.="dev"]]`;
        // this.xDev = `//span[@class="aciTreeText"][contains(text(), "dev")]`;
        // this.xDev = `//span[@class="aciTreeText"][.='dev']`;
        this.xDevExpanded = this.xDev + `/div[@class="aciTreeLine"][@aria-expanded="true"]`;
        //this.xDevButton = this.xDev + `//span[@class="aciTreeButton"]`;
        this.xDevButton = `//span[@class="aciTreeText"][.='dev']/..//../span[@class="aciTreeButton"]`;
    } // constructor(browser, page, PData)
    //----------------------------------------
    async LoginPGA() {
        let resOk;
        try {
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xLoginEmailInput);
            if(!resOk){
                throw `FAIL WaitForElementIsPresentByXPath(5000, this.page, this.xLoginEmailInput);`;
            }
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xLoginPasswordInput);
            if(!resOk){
                throw `FAIL WaitForElementIsPresentByXPath(5000, this.page, this.xLoginPasswordInput);`;
            }
            resOk = await WaitForElementIsPresentByXPath(5000, this.page, this.xLoginButton);
            if(!resOk){
                throw `FAIL WaitForElementIsPresentByXPath(5000, this.page, this.xLoginButton);`;
            }
            resOk = await SetTextByXPath(this.page, this.xLoginEmailInput, this.PData.LoginDataPGA.strEmail);
            await WaitRender(this.page);
            resOk = await SetTextByXPath(this.page, this.xLoginPasswordInput, this.PData.LoginDataPGA.strPassword);
            await WaitRender(this.page);
            //await WaitMS(3000);
            let strUrls = [
                `http://10.10.10.232/pgadmin4/browser/master_password`,
                `http://10.10.10.232/pgadmin4/browser/nodes/`,
                `http://10.10.10.232/pgadmin4/settings/store`,
                `http://10.10.10.232/pgadmin4/preferences/get_all`,
                `http://10.10.10.232/pgadmin4/settings/get_tree_state/`,
                `http://10.10.10.232/pgadmin4/settings/store`,
                `http://10.10.10.232/pgadmin4/misc/bgprocess`,
                // `http://10.10.10.232/pgadmin4/settings/save_tree_state/`,
                // `http://10.10.10.232/pgadmin4/misc/cleanup`,
            ];
            resOk = await ClickByXPath(this.page, this.xLoginButton, strUrls, 15000);
            if(!resOk){
                throw `FAIL ClickByXPath(this.page, this.xLoginButton, strUrls, 15000);`;
            }

            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in LoginPGA`);
            return false;
        }
    }//async LoginPGA()
    //----------------------------------------
    async ExpandServers() {
        let resOk;
        try {
            // ждём появления кнопки раскрытия пункта "Servers"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xServersButton);
            if(!resOk){
                throw `FAIL WaitForElementIsPresentByXPath(4000, this.page, this.xServersButton);`;
            }
            resOk = await ClickByXPath(this.page, this.xServersButton);
            if(!resOk){
                throw `FAIL ClickByXPath(this.page, this.xServersButton);`;
            }
            // ждём пока пункт "Servers" раскроется
            // resOk = await WaitForElementIsPresentByXPath(2000, this.page, this.xServersExpanded);
            // if(!resOk){
            //     throw `FAIL WaitForElementIsPresentByXPath(2000, this.page, this.xServersExpanded);`;
            // }
            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ExpandServers`);
            return false;
        }
    }//async ExpandServers()
    //----------------------------------------
    async ExpandDev() {
        let resOk;
        try {
            // ждём появления кнопки раскрытия пункта "dev"
            resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xDevButton);
            if(!resOk){
                throw `FAIL WaitForElementIsPresentByXPath(4000, this.page, xDevButton.xDev);`;
            }
            resOk = await ClickByXPath(this.page, this.xDevButton);
            if(!resOk){
                throw `FAIL ClickByXPath(this.page, this.xDevButton);`;
            }
            // ждём пока пункт "dev" раскроется
            // resOk = await WaitForElementIsPresentByXPath(4000, this.page, this.xDevExpanded);
            // if(!resOk){
            //     throw `FAIL WaitForElementIsPresentByXPath(4000, this.page, this.xDevExpanded);`;
            // }
            await WaitRender(this.page);

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in ExpandDev`);
            return false;
        }
    }//async ExpandDev()


    //----------------------------------------


    //----------------------------------------
    async TemplateTemp() {
        let resOk;
        try {


            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp`);
            return false;
        }
    }//async TemplateTemp()

}// class PGA
//----------------------------------------

//=========================================================
module.exports = {PGA};
