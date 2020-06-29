'use strict';

function onClick(element) {
    console.log(element);
    let modal = document.querySelector('.modal');
    let content = document.querySelector('.content');
    if (element.target.nodeName === 'DIV') {
        modal.classList.add('hide');
        content.insertAdjacentHTML("beforeend", "<p>Произведено нажатие вне модального окна</p>");
    } else if (element.target.nodeName === 'A') {
        switch (element.target.innerText) {
            case 'Показать модальное окно':
                modal.classList.remove('hide');
                break;
            case 'Ок':
                modal.classList.add('hide');
                content.insertAdjacentHTML("beforeend", "<p>Была нажата кнопка Ок</p>");
                break;
            case 'Отмена':
                modal.classList.add('hide');
                content.insertAdjacentHTML("beforeend", "<p>Была нажата кнопка Отмена</p>");
                break;
        }
    }
    element.stopPropagation();
}

let buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', onClick));

document.querySelector('.modal').addEventListener('click', onClick);