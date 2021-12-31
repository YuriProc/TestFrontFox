class DataCfoFields {
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;
        // Поля в таблице CFO/  this.Fields[3][1]
        this.xTable = `//div[@data-qa-table="speedy_table"]`;
        this.Fields = [// [``, ``, X]  X= 1 || `1` - custom logic; else `/a` - part of XPATH
 // ['ColName' , 'IName', 'X' , 'DDF']
            ['№',                                          'id',                                      '1',  'strDealID',  '=',  ''],
            ['Статус ID',                                  'deal_status_id',                          '1',  'strStatusID',  '=',  ''],
            ['Дата загрузки',                              'date_loading',                             '',  'PointsLoading[0].PointLoading.strInDate',  '1',  ''],
            ['Город (откуда)',                             'point_loadings',                           '',  'PointsLoading[0+X].PointLoading.strAddressFOX',  '1',  ''],
            ['Город (куда)',                               'point_unloading',                          '',  'PointsUnLoading[0+X].PointUnLoading.strAddressFOX',  '1',  ''],
            ['Компания (З)',                               'client_name',                            '/a',  'strClientCompanyName',  '=',  ''],
            ['ЕДРПОУ (З)',                                 'client_code',                              '',  'strClientCompanyCode',  '=',  ''],
            ['Юр. лицо. (З)',                              'client_legal_entity',                      '',  'strOurCompanyWithClient',  '=',  ''],
            ['Фрахт. нал (З)',                             'client_cash_true',                         '',  'ClientFreights[X].Amount',  '1',  ''],
            ['Ф.О. нал (З)',                               'client_cash_true_payment_form',            '',  'ClientFreights[X].PaymentForm',  '1',  ''],
            ['Фрахт. безнал (З)',                          'client_cash_false',                        '',  'ClientFreights[X].Amount',  '1',  ''],
            ['Ф.О. безнал (З)',                            'client_cash_false_payment_form',           '',  'ClientFreights[X].PaymentForm',  '1',  ''],
            ['Отсрочка дней. (З)',                         'client_delay',                             '',  'strClientDelay',  '=',  ''],
            ['Сумма дисп. клиента (З)',                    'client_dispatching',                       '',  '',  '',  ''],
            ['Диспетчер',                                  'client_dispatcher',                        '',  '',  '',  ''],
            ['Заявка (З)',                                 'client_document_is_order',          '/button',  '',  '',  ''],
            ['№ транспортировки (З)',                      'client_transportation_number',             '',  'strNumberTransportation',  '=',  ''],
            ['Трек доков',                                 'docs_track',                               '',  '',  '',  ''],
            ['Первичные доки (З)',                         'client_document_primary',                  '',  '',  '',  ''],
            ['Памятка к докам (З)',                        'client_notes_for_doc',                     '',  '',  '',  ''],
            ['Акты боя\недостачи',                         'client_document_is_broken_document','/button',  '',  '',  ''],
            ['Коммент. М. к докам (З)',                    'manager_comment_client_docs',              '',  '',  '',  ''],
            ['Комментарий к получ. докам (З)',             'client_document_description',              '',  '',  '',  ''],
            ['Дата отправки документа (З)',                'client_document_date_send',                '',  '',  '',  ''],
            ['Номер счета(З)',                             'client_document_invoice_number',           '',  '',  '',  ''],
            ['Дата форм.счета (З)',                        'client_document_invoice_date',             '',  '',  '',  ''],
 //---->    ['РНН (З)',                                    'client_rnn',                               '',  '',  '',  ''],  // <------- Hidden
            ['Блокировка РНН (З)',                         'client_rnn_blocked',                       '',  '',  '',  ''],
            ['№ декларации Нов. Поч. (З)',                 'client_document_number_declaration',       '',  '',  '',  ''],
            ['Контакт, подтвердивший получение доков (З)', 'client_get_docs_contact',                  '',  '',  '',  ''],
            ['Дата получения доков (З)',                   'client_get_docs_date',                     '',  '',  '',  ''],
            ['Оплачено (З)',                               'client_paid',                              '',  '',  '',  ''],
            ['Дата оплаты (З)',                            'client_paid_date',                         '',  '',  '',  ''],
            ['Долг (З)',                                   'client_debt',                              '',  '',  '1',  '1'],
            ['Дата просрочки (З)',                         'client_expiration_date',                   '',  '',  '',  ''],
            ['Компания (П)',                               'transporter_name',                       '/a',  'strTransporterCompanyName',  '=',  ''],
            ['ЕДРПОУ (П)',                                 'transporter_code',                         '',  'strTransporterCompanyCode',  '=',  ''],
            ['ФИО водителя (П)',                           'transporter_driver_name',                '/a',  'strDriverFullName',  '=',  ''],
            ['Тел. водителя (П)',                          'transporter_driver_phone',                 '',  'strDriverPhone',  '=',  ''],
            ['Тип транспорта (П)',                         'transporter_vehicle_types',                '',  'strVehicleSubType',  '=',  ''],
            ['№ контейнера (П)',                           'transporter_container_number',             '',  '',  '',  ''],
            ['Название линии (П)',                         'transporter_marine_line',                  '',  '',  '',  ''],
            ['Стандарт выбросов',                          'transporter_eco_standard',                 '',  '',  '',  ''],
            ['Тонаж (П)',                                  'transporter_max_capacity',                 '',  'strVehicleMaxCapacity',  '=',  ''],
            ['Объем (П)',                                  'transporter_volume',                       '',  'strVehicleVolume',  '=',  ''],
            ['Марка авто (П)',                             'transporter_car_brand',                    '',  'strCarBrand',  '=',  ''],
            ['Номера машины/полуприцепа (П)',              'transporter_numbers',                     '1',  'strLicensePlate_1+2',  '1',  ''],
            ['Юр. лицо. (П)',                              'transporter_legal_entity',                 '',  'strOurCompanyWithTransporter',  '=',  ''],
            ['Фрахт. нал (П)',                             'transporter_cash_true',                    '',  'TransporterFreights[X].Amount',  '1',  ''],
            ['Ф.О. нал (П)',                               'transporter_cash_true_payment_form',       '',  'TransporterFreights[X].PaymentForm',  '1',  ''],
            ['Фрахт. безнал (П)',                          'transporter_cash_false',                   '',  'TransporterFreights[X].Amount',  '1',  ''],
            ['Ф.О. безнал (П)',                            'transporter_cash_false_payment_form',      '',  'TransporterFreights[X].PaymentForm',  '1',  ''],
            ['Отсрочка дней. (П)',                         'transporter_delay',                        '',  'strTransporterDelay',  '=',  ''],
            ['Заявка (П)',                                 'transporter_document_is_order',     '/button',  '',  '',  ''],
            ['№ карты (по софту) (П)',                     'transporter_soft_credit_card',             '',  '',  '',  ''],
            ['ФИО владельца карты (по софту) (П)',         'transporter_soft_name',                    '',  '',  '',  ''],
            ['Дата выгрузки',                              'transporter_date_unloading',               '',  'PointsUnLoading[Max].PointUnLoading.strInDate',  '1',  ''],
            ['Трек ТТН',                                   'ttn_track',                                '',  '',  '',  ''],
            ['Наличие доков (ТТН, оригиналы) (П)',         'transporter_document_ttn',                 '',  '',  '',  ''],
            ['Дата получения документов (П)',              'transporter_document_date_send',           '',  '',  '',  ''],
            ['№ декларации получ. доков (П)',              'transporter_document_number_declaration',  '',  '',  '',  ''],
            ['Затраты на получение (П)',                   'transporter_postage',                      '',  '',  '',  ''],
            ['Расходы на мед книжку (П)',                  'transporter_medical_book',                 '',  '',  '',  ''],
            ['Оплачено (П)',                               'transporter_paid',                         '',  '',  '',  ''],
            ['Дата оплаты (П)',                            'transporter_paid_date',                    '',  '',  '',  ''],
            ['Долг (П)',                                   'transporter_debt',                         '',  '',  '1',  ''],
            ['Номер счета (П)',                            'transporter_document_invoice_number',      '',  '',  '',  ''],
            ['Дата форм. счета (П)',                       'transporter_document_invoice_date',        '',  '',  '',  ''],
            ['РНН (П)',                                    'transporter_rnn',                          '',  '',  '',  ''],
            ['Компания (ТЭО)',                             'teo_company',                            '/a',  '',  '',  ''],
            ['Фрахт (ТЭО)',                                'teo_freight',                              '',  '',  '',  ''],
            ['Ф.О. (ТЭО)',                                 'teo_payment_form',                         '',  '',  '',  ''],
            ['Оплачено (ТЭО)',                             'teo_paid',                                 '',  '',  '',  ''],
            ['Дата оплаты (ТЭО)',                          'teo_paid_date',                            '',  '',  '',  ''],
            ['Долг (ТЭО)',                                 'teo_debt',                                 '',  '',  '',  ''],
            ['Номер счета (ТЭО)',                          'teo_document_invoice_number',              '',  '',  '',  ''],
            ['Дата форм. счета (ТЭО)',                     'teo_document_invoice_date',                '',  '',  '',  ''],
            ['РНН (ТЭО)',                                  'teo_rnn',                                  '',  '',  '',  ''],
            ['Комментарий',                                'description',                              '',  '',  '',  ''],
            ['Комментарии МЦ',                             'mc_comment',                        '/button',  '',  '',  ''],
            ['Номер вкладки',                              'inset',                                    '',  'strNumberInSet',  '=',  ''],
            ['Отв. менеджер',                              'responsible_salesman',                     '',  'strResponsibleFOX_inTable',  '=',  ''],
            ['Логист',                                     'logistical',                               '',  'strLogist_inTable',  '=',  ''],
            ['Комиссия',                                   'commission',                               '',  '',  '1',  ''],
            ['Груз',                                       'cargo_type',                               '',  'strCargoType',  '=',  ''],
            ['Тоннаж клиента',                             'own_weight',                               '',  'strCargoWeight',  '=',  ''],
            ['Стоимость груза, грн',                       'cargo_cost',                               '',  'strCargoCost',  '=',  ''],
            ['Сотка продажнику',                           'seller_weaving_amount',                    '',  '',  '',  ''],
            ['ФИО Продажника',                             'seller_weaving_name',                      '',  '',  '',  ''],
            ['Сотка логиста',                              'logistic_weaving_amount',                  '',  '',  '',  ''],
            ['ФИО логиста',                                'logistic_weaving_name',                    '',  '',  '',  ''],
            ['ФИО Брокера',                                'brokerage_name',                           '',  '',  '',  ''],
            ['Брокерские',                                 'brokerage',                                '',  '',  '',  ''],
            ['Направление',                                'department',                               '',  '',  '',  ''],
            ['Выезд спидометр',                            'speedometer_start',                        '',  '',  '',  ''],
            ['Заезд спидометр',                            'speedometer_end',                          '',  '',  '',  ''],
            ['Остаток топлива',                            'fuel_remaining',                           '',  '',  '',  ''],
            ['Фин. мониторинг',                            'fin_monitoring',                           '',  '',  '',  ''],
        ];

    }
    //-----------------------------
    async GetNumElemInArray(ColName, Num=0) { // Num = 0 или 1 !!!
        try{
            let len = this.Fields.length;
            for(let i = 0; i < len; i++){
                if(this.Fields[i][Num]=== ColName){
                    return i;
                }
            }
            return -1;
        }catch (e) {
            await console.log(`FAIL !!! Внутренняя ошибка в GetNumElemInArray(${ColName}, ${Num})`);
            return -1;
        }
    }// async #GetNumElemInArray(ColName, Num=1) { // Num = 0 или 1 !!!
    //-----------------------------
    async GetCellValue(NumRow,ColName, getXP=false) {
        let Value;
        const cnPref = `column speedyKey_`;
        const hRow = `hiddenRow`;
        let NumCol;
        let SubArrLen, arrItem3;
        let xPath;
        let IName;
        let GetHeaderXP = async (IName, ColName) => {
            let tX = this.xTable + `//div[@data-field="${IName}"][contains(@class,"${cnPref+IName}")][div[@class="head"][contains(text(), "${ColName}")]]`;
            let tC = await ElementGetClass(this.page, NumRow, tX);
            if(await SubStrIsPresent(hRow, tC)){
                //await ScrollByXPathNum(this.page, tX, NumRow);
                await HoverByXPathNum(this.page, NumRow, tX);
                await WaitRender(this.page)
            }
            return tX;
        }
        try{
            NumCol = await this.GetNumElemInArray(ColName);
            if(NumCol === -1){
                throw `FAIL !!! не найден Заголовок столбца (${ColName})`;
            }
            IName = this.Fields[NumCol][1];
            SubArrLen = this.Fields[NumCol].length;
            //await console.log(`ColName=(${ColName}) NumCol=(${NumCol}) IName=(${IName}) SubArrLen=(${SubArrLen}) `);
            arrItem3 = this.Fields[NumCol][2];
            if(arrItem3 === ``){ // [``, ``, X]  X= `` - standard logic;
                xPath = await GetHeaderXP(IName, ColName);
                xPath+= `//div[contains(@class, "cell")]`;
                if(getXP){
                    return xPath;
                }
                Value = await ElementGetInnerText(this.page, NumRow, xPath);
                return Value;
            }else if(arrItem3 === 1 || arrItem3 === `1`) {// [``, ``, X]  X= 1 || `1` - custom logic; else `/a` - part of XPATH
                switch (ColName) {
                    case "№":
                        // xPath = this.xTable + `//div[@data-field="${IName}"][@class="${cnPref + IName}"][//span[contains(text(), "${ColName}")]]//a`;
                        xPath = this.xTable + `//div[@data-field="${IName}"][@class="${cnPref + IName}"]//a`;
                        Value = await ElementGetInnerText(this.page, NumRow, xPath);
                        // await console.log(`"№" xPath=(${xPath}) NumRow=(${NumRow}) Value=(${Value}) `);
                        // await console.log(`xPath=(${xPath})`);
                        break;
                    case "Статус ID": // `В обработке` / `Заключена` 1/2
                        xPath = await GetHeaderXP(IName, ColName);
                        xPath += `//div[@class="deal-status-switcher"]//button[@disabled="disabled"]/span`;
                        Value = await ElementGetInnerText(this.page, NumRow, xPath);
                        // await console.log(`Value=(${Value})`);
                        if (Value === `В обработке`) {
                            Value = `1`;
                        } else if (Value === `Заключена`) {
                            Value = `2`;
                        } else {
                            throw `FAIL => Не известный "Статус ID" = (${Value}) GetCellValue(${ColName});`;
                        }
                        if(getXP){
                            xPath = await GetHeaderXP(IName, ColName);
                            xPath += `//div[@class="deal-status-switcher"]//button[not (contains(@disabled, "disabled"))]`;
                            // return xPath;
                        }
                        break;
                    case "Номера машины/полуприцепа (П)":
                        xPath = await GetHeaderXP(IName, ColName);
                        xPath += `//div[contains(@class, "cell")]`;
                        Value = await ElementGetInnerText(this.page, NumRow, xPath + `/a[1]`);
                        // await console.log(`1---(${Value})`);
                        Value+= await ElementGetInnerText(this.page, NumRow, xPath + `/a[2]`);
                        // await console.log(`2---(${Value})`);
                        break;
                    default:
                        throw `FAIL => Не найден столбец таблицы CFO GetCellValue(${ColName});`;
                }// switch (ColName)
            }else if(arrItem3 === `/a` || arrItem3 === `/button`){
                xPath = await GetHeaderXP(IName, ColName);
                xPath += `//div[contains(@class, "cell")]${arrItem3}`;
                Value = await ElementGetInnerText(this.page, NumRow, xPath);
            }else{
                throw '\x1b[38;5;1m', `FAIL Внутренняя ошибка=> this.Fields не правильно заполнен => this.Fields[${NumCol}][2]=(${arrItem3});`, '\x1b[0m' ;
            }
            if (Value !== ``){
                Value = Value.trim();
            }
            if(getXP){
                return xPath;
            }
            return Value;// <------- ТУТ Вывод значения !!!!
        }catch (e) {
            await console.log(`${e} \n \`FAIL !!! Внутренняя ошибка в GetCellValue(${NumRow})(${ColName}) data_cfo_fields.js`);
            return ``;
        }
    } // async GetCellValue(NumRow,ColName)
    // -------------------------

}
module.exports = {DataCfoFields};
