const fs = require('fs');

let SetAllConfigConst = async () => {
    try {
       // const fd = await fs.openSync('config.config', 'r');
        await console.log('\x1b[38;5;2m', 'Open config.config', '\x1b[0m');//readFileSync
        let ContentFromConfigFile = await fs.readFileSync('config.config', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            // console.log('Start file config.config-----------');
            // console.log(data);
            // console.log('End file config.config-------------');
            //
            // global.g_FrontFoxURL = GetConfigConst(data, gname_FrontFoxURL);
            // global.g_ShowActionInBrowser = GetConfigConst(data, gname_ShowActionInBrowser);
            //
            // global.g_TestVar = GetConfigConst(data, gname_TestVar);
            //
            // console.log("------------");
            // console.log("(",gname_FrontFoxURL,")=(",g_FrontFoxURL,")");
            // console.log("(",gname_ShowActionInBrowser,")=(",g_ShowActionInBrowser,")");
            // console.log("(",gname_TestVar,")=(",g_TestVar,")");
            // console.log("------------");
        });

        // await console.log('Start file config.config-----------');
        // await console.log(ContentFromConfigFile);
        // await console.log('End file config.config-------------');

        //global.g_FrontCrmFoxURL = await GetConfigConst(ContentFromConfigFile, gname_FrontCrmFoxURL);

        global.g_FrontCfoFoxURL = await GetConfigConst(ContentFromConfigFile, gname_FrontCfoFoxURL);

        global.g_BackCfoFoxURL = await GetConfigConst(ContentFromConfigFile, gname_BackCfoFoxURL);

        global.g_ShowActionInBrowser = await GetConfigConst(ContentFromConfigFile, gname_ShowActionInBrowser);

        global.g_OutToLogFile = await GetConfigConst(ContentFromConfigFile, gname_OutToLogFile);

        global.g_LogFileName = await GetConfigConst(ContentFromConfigFile, gname_LogFileName);

        global.g_CheckFileName = await GetConfigConst(ContentFromConfigFile, gname_CheckFileName);

        global.g_TestVar = await GetConfigConst(ContentFromConfigFile, gname_TestVar);

        await console.log("------------");
        g_StrOutLog+='----- Переменные из config.config -------\n';

        // await console.log("(",gname_FrontCrmFoxURL,")=(",g_FrontCrmFoxURL,")");
        // g_StrOutLog+=`(${gname_FrontCrmFoxURL})=(${g_FrontCrmFoxURL})\n`;

        await console.log("(",gname_FrontCfoFoxURL,")=(",g_FrontCfoFoxURL,")");
        g_StrOutLog+=`(${gname_FrontCfoFoxURL})=(${g_FrontCfoFoxURL})\n`;

        await console.log("(",gname_BackCfoFoxURL," )=(",g_BackCfoFoxURL,")");
        g_StrOutLog+=`(${gname_BackCfoFoxURL} )=(${g_BackCfoFoxURL})\n`;

        await console.log("(",gname_ShowActionInBrowser,")=(",g_ShowActionInBrowser,")");
        g_StrOutLog+=`(${gname_ShowActionInBrowser})=(${g_ShowActionInBrowser})\n`;

        await console.log("(",gname_OutToLogFile,")=(",g_OutToLogFile,")");
        g_StrOutLog+=`(${gname_OutToLogFile})=(${g_OutToLogFile})\n`;

        await console.log("(",gname_LogFileName,")=(",g_LogFileName,")");
        g_StrOutLog+=`(${gname_LogFileName})=(${g_LogFileName})\n`;

        await console.log("(",gname_CheckFileName,")=(",g_CheckFileName,")");
        g_StrOutLog+=`(${gname_CheckFileName})=(${g_CheckFileName})\n`;

        await console.log("(",gname_TestVar,")=(",g_TestVar,")");
        g_StrOutLog+=`(${gname_TestVar})=(${g_TestVar})\n`;

        await console.log("------------");
        g_StrOutLog+='------------\n';


        return 'OK';
    } catch (err) {
        await console.error("Ошибка: ", 'config.config',err);
        return 'Error';
    }
};



function GetConfigConst(ConfigData , NameConst) {
    let ConfigValue = '';
    let NameConstStr = '';
    let posStartStr,posEndStr;
    let posStartNC,posEndNC;
    let posComment;
    let CurrentString;

    posStartStr = 0;
    do {
        posEndStr = ConfigData.indexOf('\n',posStartStr);
        //Режем на строки по '\n'
        if (posEndStr === -1) {// В конце строки не найден Возврат каретки
            CurrentString = ConfigData.substring(posStartStr);
        }else { // Текущая строка по '\n'
            CurrentString = ConfigData.substring(posStartStr, posEndStr);
        }
        posStartStr = posEndStr + 1;
        // удаляем лишние символы в начале и в конце строки(пробелы, табуляции и т.д.)
        CurrentString = CurrentString.trim();
        // ищем знак комментария '#' и режем всё после него
        posComment = CurrentString.indexOf('#',0);
        if (posComment !== -1) {
            CurrentString = CurrentString.substring(0, posComment);
            CurrentString = CurrentString.trim();
        }
        // ищем знак "=" и перед ним название переменной
        posEndNC = CurrentString.indexOf('=', 0);
        if (posEndNC !== -1){ // Знак "=" присутствует
            // ищем название переменной NameConst
            posStartNC = CurrentString.indexOf(NameConst,0);
            if (posStartNC === 0) { //нашли название (оно должно быть в начале строки)
                NameConstStr = CurrentString.substring(posStartNC, posEndNC);
                NameConstStr = NameConstStr.trim();
                if (NameConstStr === NameConst){ //нашли название (оно должно точно соответствовать названию)
                    posEndNC = posEndNC + 1;
                    ConfigValue = CurrentString.substring(posEndNC);
                    ConfigValue = ConfigValue.trim();
                    let TempConfigValue = ConfigValue.toLowerCase();
                    if (TempConfigValue === "true") {
                        ConfigValue = true;
                    }else if(TempConfigValue === "false") {
                        ConfigValue = false;
                    }
                    return ConfigValue;
                }
            }
        }
    } while (posEndStr !== -1); //повторяет пока истина не станет ложью &&<-AND ; ||<-OR

    return ConfigValue;
}

let GetConfigConstX = async (ConfigData , NameConst) => {
    let ConfigValue;


    return ConfigValue;
}

module.exports.SetAllConfigConst = SetAllConfigConst;
//module.exports.GetConfigConst = GetConfigConst;
