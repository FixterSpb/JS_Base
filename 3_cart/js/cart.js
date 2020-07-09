'use strict';

/**
 * Объект взаимодействует с корзиной товаров
 */
let cart = {

    totalEl: null, //Ссылка на объект - общую сумму корзины
    total: 0, //Общая сумма корзины
    tableCart: null, //Объект - таблица корзины

    /**
     * Инициализация объекта
     * @param {HTMLDivElement} cartBox Ссылка на элемент - корзину товара
     */
    init(cartBox) {
        this.cartBox = cartBox;
        this.cartInfo = cartBox.querySelector('.cart__info');
    },

    /**
     * Метод отображает/скрывает корзину
     */
    showHide() {
        if (this.isShow()) {
            this.hide();
        } else {
            this.show();
        }
    },

    /**
     * Метод возвращает true, если корзина отображена, иначе false
     */
    isShow() {
        return !this.cartBox.classList.contains('hide');
    },

    /**
     * Метод отображает корзину
     */
    show() {
        this.cartBox.classList.remove('hide');
    },

    /**
     * Метод скрывает корзину
     */
    hide() {
        this.cartBox.classList.add('hide');
    },

    /**
     * Метод добавляет товар в корзину по нажатию на кнопку "Добавить в корзину"
     * @param {HTMLButtonElement} productBn Кнопка, на которую нажали
     */
    add(productBn) {

        if (this.tableCart === null) {
            this.createTableCart();
            this.hideInfo();
        }

        const productBox = productBn.parentNode;
        let id = this.getProductId(productBox);
        let rowProduct = this.getRowProductById(id);

        if (!rowProduct) {
            let name = this.getProductName(productBox);
            let price = this.getProductPrice(productBox);
            this.createRowTableCart(id, name, price);
        } else {
            this.incProductCount(rowProduct);
        }
    },

    /**
     * Метод скрывает надпись "В корзине пока ничего нет"
     */
    hideInfo() {
        this.cartInfo.classList.add('hide');
    },

    /**
     * Метод отображает надпись "В корзине пока ничего нет"
     */
    showInfo() {
        this.cartInfo.classList.remove('hide');
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
     * Метод возвращает обект - строку товара в корзине по его id
     * @param {number} id id товара
     * @returns {HTMLTableRowElement}
     */
    getRowProductById(id) {
        return this.tableCart.querySelector(`[data-id='${id}']`);
    },


    /**
     * Метод создает таблицу корзины на странице
     */
    createTableCart() {
        let divCart = document.querySelector('div.cart');
        this.tableCart = this.createHtmlElement('table', ['cart__table'], "", divCart);
        let tr = this.createHtmlElement('tr', [], "", this.tableCart);

        this.createHtmlElement('th', [], 'Наименование', tr);
        this.createHtmlElement('th', [], 'Цена', tr);
        this.createHtmlElement('th', [], 'Количество', tr);
        this.createHtmlElement('th', [], 'Сумма', tr);
        this.createHtmlElement('th', [], '', tr);
        this.totalEl = this.createHtmlElement('p', ["cart__total"], "", divCart);
    },

    /**
     * Метод вставляет новую строку с товаром в таблицу корзины
     * @param {number} id id товара
     * @param {string} name Наименование товара
     * @param {number} price Цена
     */
    createRowTableCart(id, name, price) {
        const tr = document.createElement('tr');
        tr.dataset.id = id;

        this.createHtmlElement('td', [], name, tr);
        this.createHtmlElement('td', ['text-center'], price + ' руб.', tr, "price");
        let td = this.createHtmlElement('td', ['text-center'], "", tr);

        let button = this.createHtmlElement('i', ["fas", "fa-minus-circle", "cart__bnTable", "cart__bnTable_disable"], "", td);
        button.dataset.action = "decrement";
        this.setButtonClick(button);

        this.createHtmlElement('p', ["cart__count"], "1", td, "count");
        button = this.createHtmlElement('i', ["fas", "fa-plus-circle", "cart__bnTable"], "", td);
        button.dataset.action = "increment";

        this.setButtonClick(button);
        this.createHtmlElement('td', ['text-center'], price + ' руб.', tr, "sum");
        td = this.createHtmlElement('td', ['text-center'], "", tr);
        button = this.createHtmlElement('i', ["fas", "fa-trash-alt", "cart__bnTable"], "", td);
        button.dataset.action = "remove";
        this.setButtonClick(button);

        this.tableCart.insertAdjacentElement('beforeend', tr);
        this.total += price;
        this.totalEl.innerText = `Итого: ${this.total} руб.`;
    },


    /**
     * Метод создает и добавляет новый элемент в конец родителя
     * @param {string} tag Создаваемый тег
     * @param {string[]} classes Массив добавляемых классов
     * @param {string} text Текст в теге
     * @param {HTMLElement} parent Объект-родитель, создаваемого элемента
     * @param {string} dataName атрибут data-name
     */
    createHtmlElement(tag, classes, text, parent, dataName = "") {
        const element = document.createElement(tag);
        classes.forEach(elClass => {
            element.classList.add(elClass);
        });
        element.innerText = text;
        if (dataName !== "") {
            element.dataset.name = dataName;
        }
        parent.insertAdjacentElement('beforeend', element);
        return element;
    },

    /**
     * Метод устанавливает обработчик нажатия мышью на элементах корзины
     * @param {HTMLElement} button Элемент на странице
     */
    setButtonClick(button) {
        button.addEventListener('click', (event) => this.bnTableClick(event));
    },

    /**
     * Метод - обработчик нажатия на элементы массива кнопкой мыши
     * @param {MouseEvent} event Событие нажатия кнопкой мыши на элемент корзины
     */
    bnTableClick(event) {
        let button = event.target;
        let rowProduct = button.parentNode.parentNode;
        console.dir(rowProduct);

        switch (button.dataset.action) {
            case "increment":
                this.incProductCount(rowProduct);
                break;
            case "decrement":
                this.decProductCount(rowProduct);
                break;
            case "remove":
                this.removeProduct(rowProduct);
                break;
        }

    },

    /**
     * Инкремент количества товара в корзине
     * @param {HTMLTableRowElement} rowProduct Строка в таблице корзины
     */
    incProductCount(rowProduct) {
        let priceEl = rowProduct.querySelector(`[data-name='price']`);
        let countEl = rowProduct.querySelector(`[data-name='count']`);
        let sumEl = rowProduct.querySelector(`[data-name='sum']`);

        let price = parseInt(priceEl.innerText);
        let count = parseInt(countEl.innerText);
        let sum = parseInt(sumEl.innerText);

        countEl.innerText = ++count;
        sumEl.innerText = sum + price + ' руб.';

        rowProduct.querySelector(`[data-action='decrement']`).classList.remove('cart__bnTable_disable');

        this.total += price;
        this.totalEl.innerText = `Итого: ${this.total} руб.`;
    },

    /**
     * Декрементирует количества товара в корзине
     * @param {HTMLTableRowElement} rowProduct Строка в таблице корзины
     */
    decProductCount(rowProduct) {
        let priceEl = rowProduct.querySelector(`[data-name='price']`);
        let countEl = rowProduct.querySelector(`[data-name='count']`);
        let sumEl = rowProduct.querySelector(`[data-name='sum']`);

        let price = parseInt(priceEl.innerText);
        let count = parseInt(countEl.innerText);
        let sum = parseInt(sumEl.innerText);

        if (--count === 1) {
            rowProduct.querySelector(`[data-action='decrement']`).classList.add('cart__bnTable_disable');
        } else if (count < 1) {
            return;
        }

        countEl.innerText = count;
        sumEl.innerText = sum - price + ' руб.';

        this.total -= price;
        this.totalEl.innerText = `Итого: ${this.total} руб.`;
    },

    /**
     * Метод удаляет строку с товаром из корзины
     * @param {HTMLTableRowElement} rowProduct Строка в таблице корзины
     */
    removeProduct(rowProduct) {
        let sumEl = rowProduct.querySelector(`[data-name='sum']`);
        let sum = parseInt(sumEl.innerText);
        this.total -= sum;
        this.totalEl.innerText = `Итого: ${this.total} руб.`;
        rowProduct.remove();

        if (this.total === 0) {
            this.hide();
            this.tableCart.remove();
            this.tableCart = null;
            this.totalEl.remove();
            this.totalEl = null;
            this.showInfo();
        }
    },
}