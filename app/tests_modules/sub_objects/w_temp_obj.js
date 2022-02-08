class TempClass {
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;

    } // constructor(browser, page)
    //----------------------------------------

    //----------------------------------------
    async TemplateTemp() {
        let resOk;
        try {

            return true;
        } catch (e) {
            await console.log(`${e} \n FAIL in TemplateTemp(class TempClass)`);
            return false;
        }
    }//async TemplateTemp()

}// class TempClass
//----------------------------------------

//=========================================================
module.exports = {TempClass};
