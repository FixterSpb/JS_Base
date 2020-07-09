'use strict';

let products = {

    /**
     * Инициализация объекта
     * @param {cart} cart Ссылка на объект - корзину товара
     */
    init(cart) {
        this.cart = cart;
        //Создаем товары на странице
        this.createProducts();
        document.querySelector('.button-cart').addEventListener('click', () => cart.showHide());
        document.querySelector('.cart__bn-close').addEventListener('click', () => cart.showHide());
    },

    /**
     * Метод вставляет перечень товаров на страницу
     */
    createProducts() {
        for (let i = 1; i <= 12; i++) {
            let price = Math.trunc(1000 * Math.random()) + 300;
            this.createProduct(i, 'Товар ' + i, 'img/product_middle_' + i + '.png', price);
        }
    },

    /**
     * Метод добавляет товар на страницу
     * @param {number} id id товара
     * @param {sting} productName Название товара
     * @param {string} imgSrc Ссылка на изображение товара
     * @param {number} productPrice Цена
     */
    createProduct(id, productName, imgSrc, productPrice) {
        products = document.querySelector('section.products');
        //Создаем контейнер товара
        const product = document.createElement('div');

        product.classList.add('product');
        product.id = id;

        const name = document.createElement('h4');
        name.classList.add('product__name');
        name.innerText = productName;
        product.insertAdjacentElement('beforeend', name);

        const img = document.createElement('img');
        img.src = imgSrc;
        product.insertAdjacentElement('beforeend', img);

        const price = document.createElement('p');
        price.classList.add('product__price');
        price.innerText = productPrice + 'руб.';
        product.insertAdjacentElement('beforeend', price);

        const button = document.createElement('button');
        button.classList.add('product__button');
        button.innerText = "Добавить в корзину";
        product.insertAdjacentElement('beforeend', button);

        products.insertAdjacentElement('beforeend', product);

        //Назначение обработчика нажатия кнопки
        button.addEventListener('click', event => this.cart.add(event.target));
    },
}