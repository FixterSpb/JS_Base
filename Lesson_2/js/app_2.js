"use strict";
let a = 2;
let x = 1 + (a *= 2);
alert(`x = ${x}\na = ${a}`);

/*
    1. Сначала выполняются скобки a *= 2 == 4. После выполнения инструкции a == 4.
    2. 1 + 4 == 5
    3. x = 5

*/