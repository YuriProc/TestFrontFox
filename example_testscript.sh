#!/bin/bash

cat test1_check.check
echo
result=$(grep -wc "0" test1_check.check)
echo $result
VAR="2"
if [[ $result -gt 0 ]]
then
  echo "Все тесты прошли УДАЧНО "
 exit 0
else
  result_two=$(grep -wc "\-1" test1_check.check)
  NUM=$(cat test1_check.check)
  if [[ $result_two -gt 0 ]]
  then
    echo "Тесты завершились АВАРИЙНО !!! Значение из файла test1_check.ceck = [ ${NUM} ]"
    echo "!!! ДИМОН ЧЁ С СЕРВАКОМ ?"
    echo "!!! ДИМОН ЧЁ С СЕРВАКОМ ?"
    echo "!!! ДИМОН ЧЁ С СЕРВАКОМ ?"
  else
    echo "Были Упавшие Тесты!!! В количестве ${NUM} штук."
  fi
  exit 1
fi

#запускать bash имя_этого_файла  <- работает отлично
#на сервере sh имя_этого_файла  <- НЕ корректно работает !!!