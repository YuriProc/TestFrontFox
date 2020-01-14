# TestFrontFox
Тестирование Fox через фронт:
1) brew install node.
2) npm i puppeteer.
3) переименовать файл config.config.example в config.config
4) в файле config.config:
    * FRONT_FOX_URL = http://localhost:8080 <-прописать актуальный URL фронта.
    * задать SHOW_ACTION_IN_BROWSER = true/false <- запускать или нет браузер для визуального контроля действий Puppeteer'а.
    * OUT_TO_LOG_FILE = true/false
    * LOG_FILE_NAME = test1_log.log <-своё имя лог файла.
    * CHECK_FILE_NAME = test1_check.check <- своё имя чек файла.
                    
                    В этом файле будет ОДНО число:
                     -1 = непредвиденная ошибка.
                     0  = Все тесты прошли без ошибок.
                   { 1 .. number } = количество провалившихся тестов. 

5) **npm start**.
