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

const min = -100,
    max = 101;
let a = mathRandom(min, max),
    b = mathRandom(min, max);

console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`a + b = ${sum(a, b)}`);
console.log(`a - b = ${difference(a, b)}`);
console.log(`a x b = ${multiplication(a, b)}`);
console.log(`a / b = ${division(a, b)}`);


/*Функции с обязательным return*/

/**
 * Функция сложения двух чисел
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */
function sum1(a, b) {
    return a + b;
}

/**
 * Функция разности двух чисел
 * @param {Number} a Уменьшаемое
 * @param {Number} b Вычитаемое
 * @returns {Number} 
 */
function difference1(a, b) {
    return a - b;
}

/**
 * Функция умножения двух чисел
 * @param {Number} a Первый множитель
 * @param {Number} b Второй множитель
 * @returns {Number} 
 */
function multiplication1(a, b) {
    return a * b;
}

/**
 * Функция отношения двух чисел
 * @param {Number} a Делимое
 * @param {Number} b Делитель
 * @returns {Number} 
 */
function division1(a, b) {
    return a / b;
}

console.log(`a + b = ${sum1(a, b)}`);
console.log(`a - b = ${difference1(a, b)}`);
console.log(`a x b = ${multiplication1(a, b)}`);
console.log(`a / b = ${division1(a, b)}`);