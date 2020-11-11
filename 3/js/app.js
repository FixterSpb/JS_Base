'use strict';

function onClick(element) {
    if (element.target !== element.currentTarget) {
        return;
    }
    let modal = document.querySelector('.modal');
    let content = document.querySelector('.content');
    if (element.target.nodeName === 'DIV') {
        modalHide(modal);
        content.insertAdjacentHTML("beforeend", "<p>Произведено нажатие вне модального окна</p>");
    } else if (element.target.nodeName === 'BUTTON') {
        switch (element.target.innerText) {
            case 'Показать модальное окно':
                modalShow(modal);
                break;
            case 'Ок':
                modalHide(modal);
                content.insertAdjacentHTML("beforeend", "<p>Была нажата кнопка Ок</p>");
                break;
            case 'Отмена':
                modalHide(modal);
                content.insertAdjacentHTML("beforeend", "<p>Была нажата кнопка Отмена</p>");
                break;
        }
    }
    element.stopPropagation();
}

function modalHide(element) {
    element.classList.add('hide');
}

function modalShow(element) {
    element.classList.remove('hide');
}

let buttons = document.querySelectorAll('.button');
buttons.forEach((button) => button.addEventListener('click', onClick));

document.querySelector('.modal').addEventListener('click', onClick);