"use strict";

/**
 * Функция возвращает принимает целое число в диапазоне [0, 999], раскладывает на разряды и возвращает объект.

 * @param {Number} _number 
 * @returns {object} {
 * units - единицы,
 * tens - десятки,
 * hundreds - сотни,
 * }
 */

function NumberToObject(_number) {
    if (!Number.isInteger(_number) || _number > 999 || _number < 0) {
        return {}
    }

    return {
        units: _number % 10,
        tens: Math.floor(_number / 10) % 10,
        hundreds: Math.floor(_number / 100),
    }
}

let _number = Number(prompt("Введите число"));
console.log(_number);
console.log(NumberToObject(_number));