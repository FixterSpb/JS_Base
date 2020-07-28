'use strict';

let slider = {

    items: [],
    itemIndex: 0,

    init() {
        let div = document.querySelector('.slider');
        let items = div.querySelectorAll('.slider__item');
        items.forEach((item, index) => {
            item.style.left = -100 + index * 100 + "%";
            this.items.push(item);
        });
        this.itemIndex = 0;
        document.addEventListener('keyup', event => this.move(event));
        //this.items[0].classList.remove('hide');

    },

    move(event) {
        console.dir(event);
        switch (event.code) {
            case "ArrowLeft":
                this.moveToLeft();
                break;
            case "ArrowRight":
                this.moveToRight();
                break;

        }
    },


    moveToLeft() {
        this.items.forEach(item => {
            let left = parseInt(item.style.left);
            if (left / 100 < this.items.length / 2) {
                item.classList.add('move');
            }
            left -= 100;
            if (left / 100 < -this.items.length / 2) {
                item.classList.remove('move');
                item.style.left = +Math.trunc(this.items.length / 2) * 100 + "%";

            } else {
                item.style.left = left + "%";
            }
        })

    },

    moveToRight() {
        this.items.forEach(item => {
            let left = parseInt(item.style.left);
            if (left / 100 > -this.items.length / 2) {
                item.classList.add('move');
            }
            left += 100;
            if (left / 100 > this.items.length / 2) {
                item.classList.remove('move');
                item.style.left = -Math.trunc(this.items.length / 2) * 100 + "%";

            } else {
                item.style.left = left + "%";
            }
        })
    },
};

slider.init();