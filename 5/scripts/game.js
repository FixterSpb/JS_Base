'use strict';
renderer.renderBoard();
//Назначаем обработчики нажатия мыши

let cells = document.querySelectorAll('td');
cells.forEach(cell => cell.addEventListener('click', function (event) {
    if (mover.figureIsChoiced()) {
        mover.move(event);
    } else {
        mover.choice(event);
    }

}));