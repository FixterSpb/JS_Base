"use strict";
/**Функция возвращает случайное число в диапазоне от min до max
 * 
 * @param {Number} min минимальное значение диапазона
 * @param {Number} max максимальное значение диапазона (это число не включается в диапазон)
 * @returns {Number} 
 */
function mathRandom(min, max) {
    return Math.trunc(Math.random() * (max - min)) + min;
}

const min = -100,
    max = 101

let a = mathRandom(min, max),
    b = mathRandom(min, max);

if (a >= 0 && b >= 0) { //Оба числа неотрицательные
    alert(`a = ${a}\nb = ${b}\na - b = ${a - b}`); //Выводим сами числа и их разность
} else if (a < 0 && b < 0) { // Оба числа отрицательные
    alert(`a = ${a}\nb = ${b}\na x b = ${a * b}`); //Выводим сами числа и их произведение
} else { // Если первые два условия не выполнились, значит числа разных знаков!
    alert(`a = ${a}\nb = ${b}\na + b = ${a + b}`); //Выводим сами числа и их сумму
}