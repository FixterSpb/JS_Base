"use strict";
/*
В этом задании я решил поэкспериментировать с оптимизацией скорости выполнения функций.
*/

/**
 * Функция возвращает массив целых чисел от 0 до maxNumber
 * @param {number} maxNumber 
 * @returns {Array} 
 */
function getArrayOfPrimes(maxNumber) {

    if (maxNumber < 2) {
        return [];
    }
    /*
    Простое число - Натуральное число, имеющее ровно два различных натуральных делителя - единицу и самого себя.
    0 не является натуральным числом, поэтому его нельзя отнести к простым числам
    1 не имеет два различных натуральных делителя, поэтому не является ни просты ни составным.
    Таким образом наименьшее простое число - 2, поэтому первый элемент в arr - 2.
    
    */
    let arr = [2]; //Сюда помещаются простые числа
    let _number = 3;

    let i = 0;

    while (_number <= maxNumber) {

        for (i = 0; i <= arr.length; i++) {
            if (_number % arr[i] == 0 || arr[i] > Math.sqrt(_number)) {
                /*
                Первое условие. Любое составное число можно представить в виде произведения простых, т.е. достаточно проверить, есть ли у числа более двух различных простых делителей. Поэтому, для сокращения числа итераций проверяю, делится ли число на какой-то из элементов массива.
                Второе условие - также для сокращения числа итераций. Чтобы установить простое число или составное, достаточно проверить его делимость на числа от 2 до квадратного корня этого числа.
                */
                break;
            }
        }

        if (arr[i] > Math.sqrt(_number)) {
            arr.push(_number);
        }

        _number++;
    }

    return arr;
}


/**
 * Функция возвращает массив целых чисел от 0 до maxNumber
 * @param {number} maxNumber 
 * @returns {Array} 
 */
function getArrayOfPrimes_1(maxNumber) {

    if (maxNumber < 2) {
        return [];
    }

    let arr = [];
    let _number = 2;

    let i = 2;

    while (_number <= maxNumber) {
        /*
        Перебор делителей от 2 до квадратного корня из проверяемого числа
        */
        for (i = 2; i <= Math.sqrt(_number); i++) {
            if (_number % i == 0) {
                break;
            }
        }

        if (i > Math.sqrt(_number)) {
            arr.push(_number);
        }

        _number++;
    }

    return arr;
}

/**
 * Очень медленная функция, которая возвращает массив целых чисел от 0 до maxNumber
 * @param {number} maxNumber 
 * @returns {Array} 
 */
function getArrayOfPrimes_2(maxNumber) {

    if (maxNumber < 2) {
        return [];
    }

    let arr = [];
    let _number = 2;

    let i = 2;

    while (_number <= maxNumber) {
        /*
        Перебор всех делителей от 2 до проверяемого числа
        */
        for (i = 2; i < _number; i++) {
            if (_number % i == 0) {
                break;
            }
        }

        if (i >= _number) {
            arr.push(_number);
        }

        _number++;
    }

    return arr;
}

getArrayOfPrimes(100).forEach(value => console.log(value));
getArrayOfPrimes_1(100).forEach(value => console.log(value));
getArrayOfPrimes_2(100).forEach(value => console.log(value));

/*
    Думал, что функция getArrayOfPrimes() будет быстрее работать, чем getArrayOfPrimes_1(), но оказалось, что на диапазоне от 0 до 1 000 000 обе функции выполняются за одно и тоже время (у меня приблизительно 10 секунд) :-(. Вероятно это связано с бОльшим числом условий.

    Зато функция getArrayOfPrimes_2() в том же диапазоне выполнялась целых 3,5 минуты!
*/