'use strict';

let cart = {

    products: [],
    total: 0,

    /**
     * Метод добавляет товар в корзину
     * @param {HTMLButtonElement} productBn Кнопка, на которую нажали
     */
    add(productBn) {
        console.dir(productBn);
        const productBox = productBn.parentNode;
        console.dir(productBox);
        let id = this.getProductId(productBox);
        let name = this.getProductName(productBox);
        let price = this.getProductPrice(productBox);

        this.insertProducts(id, name, price);

    },

    /**
     * Метод возвращает id товара
     * @param {HTMLDivElement} box Контейнер товара
     * @returns {number}
     */
    getProductId(div) {
        return +div.id;
    },

    /**
     * Метод возвращает название товара
     * @param {HTMLDivElement} box Контейнер товара
     * @returns {string}
     */
    getProductName(div) {
        return div.querySelector('.product__name').innerText;
    },

    /**
     * Метод возвращает цену товара
     * @param {HTMLDivElement} box Контейнер товара
     * @returns {number}
     */
    getProductPrice(div) {
        return parseInt(div.querySelector('.product__price').innerText);
    },

    /**
     * Метод добавляет товар в массив this.products
     * @param {number} id id товара
     * @param {string} name Название товара
     * @param {number} price Цена товара
     */
    insertProducts(id, name, price) {

        let index = this.indexProduct(id);
        if (index !== null) {
            this.products[index].count++;
        } else {
            this.products.push({
                id: id,
                name: name,
                count: 1,
                price: price
            });
        }

        this.total += price;

        console.log(this.products);
        console.log(this.total);
    },

    /**
     * Если в корзине уже есть такой товар метод возвращает его индекс, иначе null
     * @param {number} id id товара
     * @returns {number}
     */
    indexProduct(id) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return i;
            }
        }
        return null;
    }
}