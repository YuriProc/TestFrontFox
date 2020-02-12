let SavePictureFromURL = async (browser, strPicURL) => {
try {
    // https://sapb1cloud.ru/files/komdir.png

    let page;
    page = await browser.newPage();
    //height = height - 120;
    width = 1200;
    height = 880;
    await page.setViewport({width, height});
    const fs = require('fs');

    let viewSource = await page.goto(strPicURL);


    let i = randomInt(1000, 9999);

    // Проверим, существует ли папка, если нет — создадим её
    const imagesDirectory = './images/';
    if (!fs.existsSync(imagesDirectory)) {
        fs.mkdirSync(imagesDirectory);
    }
    let filePath = imagesDirectory + 'image_' + i + '.png';
    fs.writeFile(filePath, await viewSource.buffer(), function (err) {
        if (err) {
            console.log(err);
            return '';
        }
        console.log("The file was saved!");
    });
    await page.close();

    return filePath;

}catch (e) {
    await console.log(`Ошибка:${e}`);
    return '';
}
};

module.exports.SavePictureFromURL = SavePictureFromURL;