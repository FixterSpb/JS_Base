'use strict';

let slider = {

    items: [], //массив элементов слайдера


    /**
     * Инициализация слайдера
     */
    init() {
        let div = document.querySelector('.slider');
        let items = div.querySelectorAll('.slider__item');

        if (items.length === 1) {
            return; //Из одной картинки слайдер не получится
        }

        if (items.length === 2) {
            //Если в слайдере всего две картинки - дублируем,
            //иначе будет появляться белый экран
            div.innerHTML += div.innerHTML;
            items = div.querySelectorAll('.slider__item');
        }

        //Заполнение элементов массива
        this.setItems(items);

        //Обработчики событий
        this.setEventListener();
    },

    /**
     * Заполнение массива слайдов
     * @param {HTMLDivElement[]} items Массив слайдов из HTML
     */
    setItems(items) {
        items.forEach((item, index) => {
            //Назначение горизонтальных координат каждому элементу
            item.style.left = -100 + index * 100 + "%";
            this.items.push(item);
        });
    },

    /**
     * Назначение обработчиков событий
     */
    setEventListener() {
        window.addEventListener('load', event => this.loadComplite(event));
        document.addEventListener('keyup', event => this.move(event));
        document.querySelector('i.fas.fa-chevron-circle-left.slider-leftArrow').addEventListener('click', () => this.moveToLeft());
        document.querySelector('i.fas.fa-chevron-circle-right.slider-rightArrow').addEventListener('click', () => this.moveToRight());
    },

    /**
     * Метод отображает картинки и прячет иконку загрузки после полной загрузки страницы
     * @param {Event} event Событие загрузки страницы
     */
    loadComplite(event) {
        console.log(event);
        this.items.forEach(item => {
            item.classList.remove('hide');
        });
        document.querySelector('.fas.fa-spinner.fa-spin').classList.add('hide');
        document.querySelector('i.fas.fa-chevron-circle-left.slider-leftArrow').classList.remove('hide');
        document.querySelector('i.fas.fa-chevron-circle-right.slider-rightArrow').classList.remove('hide');
    },

    /**
     * Метод двигает картинки слайдера стрелками клавиатуры
     * @param {*} event 
     */
    move(event) {
        switch (event.code) {
            case "ArrowLeft":
                this.moveToLeft();
                break;
            case "ArrowRight":
                this.moveToRight();
                break;
        }
    },


    /**
     * Метод двигает картинки влево
     */
    moveToLeft() {
        this.items.forEach(item => {
            let left = parseInt(item.style.left);

            if (left === 100) {
                item.classList.add('move');
            }

            left -= 100;
            if (left < -100) {
                item.classList.remove('move');
                item.style.left = this.items.length * 100 - 200 + "%";

            } else {
                item.style.left = left + "%";
            }
        })

    },

    /**
     * Метод двигает картинки вправо
     */
    moveToRight() {
        this.items.forEach(item => {
            let left = parseInt(item.style.left);
            if (left === -100) {
                item.classList.add('move');
            }
            left += 100;
            if (left > this.items.length * 100 - 200) {
                item.classList.remove('move');
                item.style.left = "-100%";
            } else {
                item.style.left = left + "%";
            }
        })
    },
};

slider.init();