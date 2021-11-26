#!/bin/bash

echo -n "Введите номер: "
read VAR

if [[ $VAR -gt 2019 ]]
then
  echo "Переменная ${VAR} больше, чем 2019."
fi
//
0: {key: "id", label: "ID"}
1: {key: "deal_status_id", label: "Статус ID"}
2: {key: "date_loading", label: "Дата загрузки"}
3: {key: "point_loadings", label: "Город (откуда)"}
4: {key: "point_unloading", label: "Город (куда)"}
5: {key: "client_name", label: "Компания (З)"}
6: {key: "client_code", label: "ЕДРПОУ (З)"}
7: {key: "client_legal_entity", label: "Юр. лицо. (З)"}
8: {key: "client_cash_true", label: "Фрахт. нал (З)"}
9: {key: "client_cash_true_payment_form", label: "Ф.О. нал (З)"}
10: {key: "client_cash_false", label: "Фрахт. безнал (З)"}
11: {key: "client_cash_false_payment_form", label: "Ф.О. безнал (З)"}
12: {key: "client_delay", label: "Отсрочка дней. (З)"}
13: {key: "client_dispatching", label: "Сумма дисп. клиента (З)"}
14: {key: "client_dispatcher", label: "Диспетчер"}
15: {key: "client_document_is_order", label: "Заявка (З)"}
16: {key: "client_transportation_number", label: "№ транспортировки (З)"}
17: {key: "docs_track", label: "Трек доков"}
18: {key: "client_document_primary", label: "Первичные доки (З)"}
19: {key: "client_notes_for_doc", label: "Памятка к докам (З)"}
20: {key: "client_document_is_broken_document", label: "Акты боя\недостачи"}
21: {key: "manager_comment_client_docs", label: "Коммент. М. к докам (З)"}
22: {key: "client_document_description", label: "Комментарий к получ. докам (З)"}
23: {key: "client_document_date_send", label: "Дата отправки документа (З)"}
24: {key: "client_document_invoice_number", label: "Номер счета(З)"}
25: {key: "client_document_invoice_date", label: "Дата форм.счета (З)"}
26: {key: "client_rnn", label: "РНН (З)"}
27: {key: "client_rnn_blocked", label: "Блокировка РНН (З)"}
28: {key: "client_document_number_declaration", label: "№ декларации Нов. Поч. (З)"}
29: {key: "client_get_docs_contact", label: "Контакт, подтвердивший получение доков (З)"}
30: {key: "client_get_docs_date", label: "Дата получения доков (З)"}
31: {key: "client_paid", label: "Оплачено (З)"}
32: {key: "client_paid_date", label: "Дата оплаты (З)"}
33: {key: "client_debt", label: "Долг (З)"}
34: {key: "client_expiration_date", label: "Дата просрочки (З)"}
35: {key: "transporter_name", label: "Компания (П)"}
36: {key: "transporter_code", label: "ЕДРПОУ (П)"}
37: {key: "transporter_driver_name", label: "ФИО водителя (П)"}
38: {key: "transporter_driver_phone", label: "Тел. водителя (П)"}
39: {key: "transporter_vehicle_types", label: "Тип транспорта (П)"}
40: {key: "transporter_container_number", label: "№ контейнера (П)"}
41: {key: "transporter_marine_line", label: "Название линии (П)"}
42: {key: "transporter_eco_standard", label: "Стандарт выбросов"}
43: {key: "transporter_max_capacity", label: "Тонаж (П)"}
44: {key: "transporter_volume", label: "Объем (П)"}
45: {key: "transporter_car_brand", label: "Марка авто (П)"}
46: {key: "transporter_numbers", label: "Номера машины/полуприцепа (П)"}
47: {key: "transporter_legal_entity", label: "Юр. лицо. (П)"}
48: {key: "transporter_cash_true", label: "Фрахт. нал (П)"}
49: {key: "transporter_cash_true_payment_form", label: "Ф.О. нал (П)"}
50: {key: "transporter_cash_false", label: "Фрахт. безнал (П)"}
51: {key: "transporter_cash_false_payment_form", label: "Ф.О. безнал (П)"}
52: {key: "transporter_delay", label: "Отсрочка дней. (П)"}
53: {key: "transporter_document_is_order", label: "Заявка (П)"}
54: {key: "transporter_soft_credit_card", label: "№ карты (по софту) (П)"}
55: {key: "transporter_soft_name", label: "ФИО владельца карты (по софту) (П)"}
56: {key: "transporter_date_unloading", label: "Дата выгрузки"}
57: {key: "ttn_track", label: "Трек ТТН"}
58: {key: "transporter_document_ttn", label: "Наличие доков (ТТН, оригиналы) (П)"}
59: {key: "transporter_document_date_send", label: "Дата получения документов (П)"}
60: {key: "transporter_document_number_declaration", label: "№ декларации получ. доков (П)"}
61: {key: "transporter_postage", label: "Затраты на получение (П)"}
62: {key: "transporter_medical_book", label: "Расходы на мед книжку (П)"}
63: {key: "transporter_paid", label: "Оплачено (П)"}
64: {key: "transporter_paid_date", label: "Дата оплаты (П)"}
65: {key: "transporter_debt", label: "Долг (П)"}
66: {key: "transporter_document_invoice_number", label: "Номер счета (П)"}
67: {key: "transporter_document_invoice_date", label: "Дата форм. счета (П)"}
68: {key: "transporter_rnn", label: "РНН (П)"}
69: {key: "teo_company", label: "Компания (ТЭО)"}
70: {key: "teo_freight", label: "Фрахт (ТЭО)"}
71: {key: "teo_payment_form", label: "Ф.О. (ТЭО)"}
72: {key: "teo_paid", label: "Оплачено (ТЭО)"}
73: {key: "teo_paid_date", label: "Дата оплаты (ТЭО)"}
74: {key: "teo_debt", label: "Долг (ТЭО)"}
75: {key: "teo_document_invoice_number", label: "Номер счета (ТЭО)"}
76: {key: "teo_document_invoice_date", label: "Дата форм. счета (ТЭО)"}
77: {key: "teo_rnn", label: "РНН (ТЭО)"}
78: {key: "description", label: "Комментарий"}
79: {key: "mc_comment", label: "Комментарии МЦ"}
80: {key: "inset", label: "Номер вкладки"}
81: {key: "responsible_salesman", label: "Отв. менеджер"}
82: {key: "logistical", label: "Логист"}
83: {key: "commission", label: "Комиссия"}
84: {key: "cargo_type", label: "Груз"}
85: {key: "cargo_cost", label: "Стоимость груза, грн"}
86: {key: "seller_weaving_amount", label: "Сотка продажнику"}
87: {key: "seller_weaving_name", label: "ФИО Продажника"}
88: {key: "logistic_weaving_amount", label: "Сотка логиста"}
89: {key: "logistic_weaving_name", label: "ФИО логиста"}
90: {key: "brokerage_name", label: "ФИО Брокера"}
91: {key: "brokerage", label: "Брокерские"}
92: {key: "department", label: "Направление"}
93: {key: "speedometer_start", label: "Выезд спидометр"}
94: {key: "speedometer_end", label: "Заезд спидометр"}
95: {key: "fuel_remaining", label: "Остаток топлива"}
96: {key: "fin_monitoring", label: "Фин. мониторинг"}
// -----------
0: "id"
1: "deal_status_id"
2: "date_loading"
3: "point_loadings"
4: "point_unloading"
5: "client_name"
6: "client_code"
7: "client_legal_entity"
8: "client_cash_true"
9: "client_cash_true_payment_form"
10: "client_cash_false"
11: "client_cash_false_payment_form"
12: "client_delay"
13: "client_dispatching"
14: "client_dispatcher"
15: "client_document_is_order"
16: "client_transportation_number"
17: "docs_track"
18: "client_document_primary"
19: "client_notes_for_doc"
20: "client_document_is_broken_document"
21: "manager_comment_client_docs"
22: "client_document_description"
23: "client_document_date_send"
24: "client_document_invoice_number"
25: "client_document_invoice_date"
26: "client_rnn"
27: "client_rnn_blocked"
28: "client_document_number_declaration"
29: "client_get_docs_contact"
30: "client_get_docs_date"
31: "client_paid"
32: "client_paid_date"
33: "client_debt"
34: "client_expiration_date"
35: "transporter_name"
36: "transporter_code"
37: "transporter_driver_name"
38: "transporter_driver_phone"
39: "transporter_vehicle_types"
40: "transporter_container_number"
41: "transporter_marine_line"
42: "transporter_eco_standard"
43: "transporter_max_capacity"
44: "transporter_volume"
45: "transporter_car_brand"
46: "transporter_numbers"
47: "transporter_legal_entity"
48: "transporter_cash_true"
49: "transporter_cash_true_payment_form"
50: "transporter_cash_false"
51: "transporter_cash_false_payment_form"
52: "transporter_delay"
53: "transporter_document_is_order"
54: "transporter_soft_credit_card"
55: "transporter_soft_name"
56: "transporter_date_unloading"
57: "ttn_track"
58: "transporter_document_ttn"
59: "transporter_document_date_send"
60: "transporter_document_number_declaration"
61: "transporter_postage"
62: "transporter_medical_book"
63: "transporter_paid"
64: "transporter_paid_date"
65: "transporter_debt"
66: "transporter_document_invoice_number"
67: "transporter_document_invoice_date"
68: "transporter_rnn"
69: "teo_company"
70: "teo_freight"
71: "teo_payment_form"
72: "teo_paid"
73: "teo_paid_date"
74: "teo_debt"
75: "teo_document_invoice_number"
76: "teo_document_invoice_date"
77: "teo_rnn"
78: "description"
79: "mc_comment"
80: "inset"
81: "responsible_salesman"
82: "logistical"
83: "commission"
84: "cargo_type"
85: "cargo_cost"
86: "seller_weaving_amount"
87: "seller_weaving_name"
88: "logistic_weaving_amount"
89: "logistic_weaving_name"
90: "brokerage_name"
91: "brokerage"
92: "department"
93: "speedometer_start"
94: "speedometer_end"
95: "fuel_remaining"
96: "fin_monitoring"
97: "own_weight"
