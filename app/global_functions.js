// async function WaitUntilPageLoads(page) {
//     let cssSelector = `//html[@class="nprogress-busy"]`;
//     try {
//         await page.waitForSelector(cssSelector, { timeout: 35000});
//         return true;
//     } catch (e) {
//         return false;
//     }
// }
// if (Date.now() - startCallback < 10) {
//     // ничего не делать
// }
//-----------------------------------------------------------------------------------
WaitUntilPageLoads  = async function (page) {
    let cssSelector = `html[class=nprogress-busy]`;

    let startTime = Date.now();
    try {
        // Ждём селектор (html[class=nprogress-busy])
        await page.waitForSelector(cssSelector, { timeout: 2000});

        // Теперь ждём пока не пропадёт селектор (html[class=nprogress-busy])
        while (await page.$(cssSelector) !== null){
            // Если прошло больше 35 сек то выход!!!
            if(Date.now() - startTime > 35000) {
                await console.log('page NOT load > 35 sec');
                return false;
            }
        }
        //await console.log('page load');
        return true;
    } catch (e) {
        //await console.log('\x1b[38;5;2m', "WaitUntilPageLoads => error=>",e, '\x1b[0m');
        return false;
    }
}
//-----------------------------------------------------------------------------------
WaitUntilElementIsPresentByXPath  = async function (timeMS, page, MyXPath) {
    let startTime = Date.now();
    let linkHandlers;
    while (true) {
        await page.waitFor(100);
        linkHandlers = await page.$x(MyXPath);
        if (linkHandlers.length > 0) {
            return true;
        }
        if( (Date.now() - startTime) > timeMS ) {
            //await console.log('Element:',MyXPath,' Not Present >', timeMS, 'ms');
            return false;
        }
    }
}

//-----------------------------------------------------------------------------------
ElementIsPresent = async function (page , MyXPath) {
    const linkHandlers = await page.$x(MyXPath);
    if (linkHandlers.length > 0) {
        return true;
    }else{
        return false;
    }
};
//-----------------------------------------------------------------------------------
ElementGetLength = async function (page , MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        return linkHandlers.length;
    }catch (e) {
        return -1;
    }
};
ElementGetCheckedNum = async function (page , MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length;
        let PropC;
        if ( MaxL > 0 ) {
            let i = 0;
            do{
                PropC = await page.evaluate(elm => elm.checked, linkHandlers[i]);
                if (PropC) {
                    return i;
                }
                i++;
            }while (i < MaxL);

            return -1;
        } else {
            return -1;
        }
    }catch (e) {
        return -1;
    }
};
ElementGetValue = async function (page , Num, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropValue;
        if (Num > MaxL){
            return '';
        }else{
            PropValue = await page.evaluate(elm => elm.value, linkHandlers[Num]);
            return PropValue;
        }
    }catch (e) {
        return '';
    }
};
ElementGetInnerText = async function (page , Num, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropInnerText;
        if (Num > MaxL){
            return '';
        }else{
            PropInnerText = await page.evaluate(elm => elm.innerText, linkHandlers[Num]);
            return PropInnerText;
        }
    }catch (e) {
        return '';
    }
};
ElementGetHref = async function (page , Num, MyXPath) {
    try {
        const linkHandlers = await page.$x(MyXPath);
        const MaxL = linkHandlers.length -1 ;
        let PropInnerText;
        if (Num > MaxL){
            return '';
        }else{
            PropInnerText = await page.evaluate(elm => elm.href, linkHandlers[Num]);
            return PropInnerText;
        }
    }catch (e) {
        return '';
    }
};
ElementIsChecked = async function (page , Num, MyXPath) {
  try {
      const linkHandlers = await page.$x(MyXPath);
      let PropChecked = await page.evaluate(elm => elm.checked, linkHandlers[Num]);
      return PropChecked;
  }catch (e) {
      return undefined;
  }
};
//-----------------------------------------------------------------------------------
ClickByXPath = async function (page , MyXPath) {
    const linkHandlers = await page.$x(MyXPath);
    try {
        if (await linkHandlers.length > 0) {
            //await linkHandlers[0].click({ clickCount:20, delay: 500 });
            await linkHandlers[0].click();
            //await page.evaluate(el => el.click(), linkHandlers[0]);
            return true;
        } else {
            return false;
        }
    }catch (e) {
        return false;
    }
}
ClickByXPathNum = async function (page ,Num ,MyXPath) {
    const linkHandlers = await page.$x(MyXPath);
    try {
        if (await linkHandlers.length >= Num) {
            //await linkHandlers[0].click({ clickCount:20, delay: 500 });
            await linkHandlers[Num - 1].click();
            //await page.evaluate(el => el.click(), linkHandlers[0]);
            return true;
        } else {
            return false;
        }
    }catch (e) {
        return false;
    }
}
//-----------------------------------------------------------------------------------
ClickByXPathWithScroll = async function (timeMS, page , MyXPath) {
    let startTime = await Date.now();
    const elHandle = await page.$x(MyXPath);
    try {
        if (await elHandle.length > 0) {

            await page.evaluate(el => el.scrollIntoView(), elHandle[0]);
            await page.waitFor(500);
            while (!await ClickByXPath(page, MyXPath)) {
                await page.waitFor(100);
                if( (await Date.now() - startTime) > timeMS ) {
                    //await console.log('Element:',MyXPath,' Not Present >', timeMS, 'ms');
                    return false;
                }
            }
            return true;
        }else {
            return false;
        }
    }catch (e) {
        return false;
    }
}
//-----------------------------------------------------------------------------------
// ClickByXPath = async function (page , MyXPath) {
//     const linkHandlers = await page.$x(MyXPath);
//     try {
//         if (await linkHandlers.length > 0) {
//             await linkHandlers[0].scrollIntoView;
//             await page.waitFor(1000);
//             await linkHandlers[0].click();
//             return true;
//         } else {
//             return false;
//         }
//     }catch (e) {
//         await console.log('Element:',MyXPath,' Error', e, 'ms');
//         return false;
//     }
//}
//-----------------------------------------------------------------------------------
TypeByXPath = async function (page , MyXPath, MyText) {
    const linkHandlers = await page.$x(MyXPath);
    if (linkHandlers.length > 0) {
        linkHandlers[0].type(MyText);
        return true;
    }else{
        return false;
    }

}
//-----------------------------------------------------------------------------------
NameFunction = function() {
    return NameFunction.caller.name;
}
//-----------------------------------------------------------------------------------
randomInt = function(low, high) {
    return Math.floor(Math.random() * (high + 1 - low) + low);
}
//-----------------------------------------------------------------------------------
msToHHMMSS = function(ms_num) {
    let sec_num =Math.floor(ms_num / 1000);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    //return hours+':'+minutes+':'+seconds;
    //return 'Ч:'+hours+' М:'+minutes+' С:'+seconds;
    return hours+' час, '+minutes+' мин, '+seconds+' сек';
}
//-----------------------------------------------------------------------------------
SaveTempPictureFromURL = async function(browser, strPicURL, MyFileName) {
    // https://sapb1cloud.ru/files/komdir.png
    let page;
    let filePath;
    page = await browser.newPage();

    let width = 1200;
    let height = 880;
    await page.setViewport({width, height});
    const fs = require('fs');
    try {
        let viewSource = await page.goto(strPicURL);
        let StatusX = await viewSource._status;
        //await console.log('StatusX:',StatusX,':');
        if (StatusX !== 200 ) {
            throw 'StatusX !== 200' // <- специальный вызов ошибки !!!
        }
        // Проверим, существует ли папка, если нет — создадим её
        const imagesDirectory = './temp_images/';
        if (!fs.existsSync(imagesDirectory)) {
            fs.mkdirSync(imagesDirectory);
        }

        filePath = imagesDirectory + MyFileName;
        fs.writeFileSync(filePath, await viewSource.buffer(), async function (err) {
            if (err) {
                await console.log(err);
                await page.close();
                return '';
            }
            await console.log("The file was saved!");
        });
    }catch (e) {
        filePath = '';
    }
    await page.close();

    return filePath;
};
SaveTempPictureFromRandomURL = async function(browser, MyArrayName) {
    let RandNum;
    let MyFilePath;
    let strPicURL;
    let NumTry = 0;
    let MaxTry = g_ArrayURL[MyArrayName].length;
    do {
        NumTry++;
        RandNum = await randomInt(0, g_ArrayURL[MyArrayName].length - 1);
        strPicURL = g_ArrayURL[MyArrayName][RandNum];
        //strPicURL = g_ArrayURL[MyArrayName][0];
        //await console.log('\x1b[38;5;2m', `         g_ArrayURL['TrollFaceUrl'][${RandNum}]`, strPicURL, '\x1b[0m');
        MyFilePath = await SaveTempPictureFromURL(browser, strPicURL, 'temp_picture.png');
    }while ((MyFilePath === '')&&(NumTry < MaxTry) );
    //await console.log('MyFilePath:',MyFilePath,':');
    return MyFilePath;
};
//-----------------------------------------------------------------------------------
InsertPhoto = async function(browser , page, MyArrayName, MyXPath) {
    let MyFilePath = await SaveTempPictureFromRandomURL(browser, 'DriverDocURL');
    if (MyFilePath !== '') {
        //let xpDriverLicensePhoto = '//div[@class="zone"][./div[contains(text(), "Тех. Паспорт")]]/div[@id="dropzone"]';
        //await ClickByXPath(page, MyXPath);
        await page.waitFor(1000);
        let [fileChooserDPhoto] = await Promise.all([
            //ClickByXPath(page, MyXPath),
            //page.waitFor(500),
            page.waitForFileChooser(),
            //page.waitFor(500),
            ClickByXPathWithScroll(2000 ,page, MyXPath)
            //page.waitFor(500),
        ]);
        //await ClickByXPath(page, MyXPath);
        await fileChooserDPhoto.accept([MyFilePath]);
        await page.waitFor(3000);
        //await DeleteTempPicture(MyFilePath);
        //await fileChooser.cancel();
        //await page.waitFor(1111500);
        //let Href = await ElementGetHref(page,0, '//div[@class="dz-image"]/a[@target="_blank"]');
        //let Href = await ElementGetHref(page,0, '//a[@target="_blank"]');



        return '';
    }

    return '';
};
//-----------------------------------------------------------------------------------
DeleteTempPicture = async function(MyFileName) {
    const fs = require('fs');
    if (fs.existsSync(MyFileName)) {
        fs.unlinkSync(MyFileName);
    }

};
//-----------------------------------------------------------------------------------
TrimCompanyName = async function(strCompanyName) {
    let pos;
    pos = strCompanyName.indexOf(' ', 0);
    strCompanyName = strCompanyName.slice(pos);
    strCompanyName = strCompanyName.trim();
    return strCompanyName;
};
//-----------------------------------------------------------------------------------
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return 'Ч:'+hours+' М:'+minutes+' С:'+seconds;
}
//-----------------------------------------------------------------------------------
// const linkHandlers = await page.$x("//a[contains(text(), 'Some text')]");
//
// if (linkHandlers.length > 0) {
//     await linkHandlers[0].click();
// } else {
//     throw new Error("Link not found");
// }