"use strict";

// Конструктор в стиле es5

function Product(name, price) {
    this.name = name;
    this.price = price;
}

Product.prototype.make25PercentDiscount = function () {
    this.price *= 0.75;
}

const product = new Product("Name", 500);

console.log(product);
product.make25PercentDiscount();
console.log(product);

//Конструктор в стиле es6

class Product_es6 {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    make25PercentDiscount() {
        this.price *= 0.75;
    }
}

const product1 = new Product_es6("Name", 500);

console.log(product1);
product1.make25PercentDiscount();
console.log(product1);