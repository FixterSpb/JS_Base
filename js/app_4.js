"use strict";

const products = [{
        id: 3,
        price: 127,
        photos: [
            "1.jpg", "2.jpg",
        ]
    },
    {
        id: 5,
        price: 499,
        photos: []
    },
    {
        id: 10,
        price: 26,
        photos: [
            "3.jpg"
        ]
    },
    {
        id: 8,
        price: 78,
    },
];
console.log(products.length);
let products1 = products.filter(product => ("photos" in product && product.photos.length > 0));
console.log("Товары, у которых есть фотографии:");
console.log(products1);

console.log("Отсортированный по цене массив продуктов: ");
let products2 = products.sort((a, b) => a.price - b.price);
console.log(products2);