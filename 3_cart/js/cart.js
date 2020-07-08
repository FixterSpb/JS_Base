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
     * @param {HTMLDivElement} div Контейнер товара
     * @returns {number}
     */
    getProductId(div) {
        return div.id;
    },

    /**
     * Метод возвращает название товара
     * @param {HTMLDivElement} div Контейнер товара
     * @returns {string}
     */
    getProductName(div) {
        return div.querySelector('.product__name').innerText;
    },

    /**
     * Метод возвращает цену товара
     * @param {HTMLDivElement} div Контейнер товара
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

        let index = this.getIndexFromProducts(id);
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

        console.log(`Индекс: ${index}`);

        this.total += price;
        this.updateHtmlTable(index);

        console.log(this.products);
        console.log(this.total);
    },

    /**
     * Если в корзине уже есть такой товар метод возвращает его индекс, иначе null
     * @param {number} id id товара
     * @returns {number}
     */
    getIndexFromProducts(id) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return i;
            }
        }
        return null;
    },

    /**
     * Метод обновляет таблицу корзины на странице 
     * @param {number} index Индекс товара в массеве products
     */
    updateHtmlTable(index = null) {
        let table = this.getHtmlTable();
        console.dir(table);
        let tr;
        let td;
        if (index !== null) {
            tr = table.querySelector(`[data-id='${this.products[index].id}']`);
            tr.cells[2].innerText = this.products[index].count;
            return;
        }

        index = this.products.length - 1;
        tr = document.createElement('tr');
        tr.dataset.id = this.products[index].id;

        td = document.createElement('td');
        td.innerText = this.products[index].name;
        tr.insertAdjacentElement('beforeend', td);

        td = document.createElement('td');
        td.innerText = this.products[index].price;
        tr.insertAdjacentElement('beforeend', td);

        td = document.createElement('td');
        td.innerText = this.products[index].count;
        tr.insertAdjacentElement('beforeend', td);

        td = document.createElement('td');
        td.innerText = this.products[index].count * this.products[index].price;
        tr.insertAdjacentElement('beforeend', td);

        td = document.createElement('td');
        tr.insertAdjacentElement('beforeend', td);

        table.insertAdjacentElement('beforeend', tr);
    },

    /**
     * Метод возвращает ссылку на HTML таблицу корзины
     */

    getHtmlTable() {
        let table = document.querySelector('.cart__table');
        if (table !== null) {
            return table;
        }

        let divCart = document.querySelector('div.cart');

        table = document.createElement('table');
        table.classList.add('cart__table');

        let tr = document.createElement('tr');
        table.insertAdjacentElement('beforeend', tr);

        let th = document.createElement('th');
        th.innerText = "Наименование";
        tr.insertAdjacentElement('beforeend', th);

        th = document.createElement('th');
        th.innerText = "Цена";
        tr.insertAdjacentElement('beforeend', th);

        th = document.createElement('th');
        th.innerText = "Количество";
        tr.insertAdjacentElement('beforeend', th);

        th = document.createElement('th');
        th.innerText = "Сумма";
        tr.insertAdjacentElement('beforeend', th);

        th = document.createElement('th');
        tr.insertAdjacentElement('beforeend', th);

        divCart.insertAdjacentElement('beforeend', table);

        return table;
    }

}