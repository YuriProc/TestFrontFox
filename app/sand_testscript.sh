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
 NUM=$(cat test1_check.check)
  echo "Были Упавшие Тесты!!! Значение из файла test1_check.ceck = [ ${NUM} ]"
  exit 1
fi
