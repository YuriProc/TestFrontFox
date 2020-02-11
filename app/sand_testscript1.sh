#!/bin/bash

echo -n "Введите номер: "
read VAR

if [[ $VAR -gt 2019 ]]
then
  echo "Переменная ${VAR} больше, чем 2019."
fi