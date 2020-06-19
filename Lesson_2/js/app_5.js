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

/**
 * Функция сложения двух чисел
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */
const sum = (a, b) => a + b;

/**
 * Функция разности двух чисел
 * @param {Number} a Уменьшаемое
 * @param {Number} b Вычитаемое
 * @returns {Number} 
 */
const difference = (a, b) => a - b;

/**
 * Функция умножения двух чисел
 * @param {Number} a Первый множитель
 * @param {Number} b Второй множитель
 * @returns {Number} 
 */
const multiplication = (a, b) => a * b;

/**
 * Функция отношения двух чисел
 * @param {Number} a Делимое
 * @param {Number} b Делитель
 * @returns {Number} 
 */
const division = (a, b) => a / b;

/**
 * Функция выполняет математическую операцию над аргументами arg1 и arg2
 * 
 * @param {Number} arg1 Первый аргумент
 * @param {Number} arg2 Второй аргумент
 * @param {String} operation Операция над аргументами. Допустимые значения:
 * "+" - сложение (arg1 + arg2);
 * "-" - вычитание (arg1 - arg2);
 * "*" или латинская "x" - умножение (arg1 * arg2);
 * "/" или ":" - деление (arg1 / arg2);
 * @returns {Number}
 */
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case "+":
            return sum(arg1, arg2);
        case "-":
            return difference(arg1, arg2);
        case "/":
        case ":":
            return division(arg1, arg2);
        case "*":
        case "x":
            return multiplication(arg1, arg2);
        default:
            throw ("Неизвестная операция");
    }
}

const min = -100,
    max = 101;
let a = mathRandom(min, max),
    b = mathRandom(min, max);

console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`a + b = ${mathOperation(a, b, "+")}`);
console.log(`a - b = ${mathOperation(a, b, "-")}`);
console.log(`a / b = ${mathOperation(a, b, "/")}`);
console.log(`a : b = ${mathOperation(a, b, ":")}`);
console.log(`a x b = ${mathOperation(a, b, "x")}`);
console.log(`a * b = ${mathOperation(a, b, "*")}`);
console.log(`a * b = ${mathOperation(a, b, "**")}`);