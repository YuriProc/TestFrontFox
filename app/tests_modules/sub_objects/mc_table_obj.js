class MCTable {
    constructor(browser, page, DealData) {
        this.browser = browser;
        this.page = page;
        this.DealData = DealData;
    } // constructor(browser, page, DealData)
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

}// class MCTable
//----------------------------------------

//=========================================================
module.exports = {MCTable};
