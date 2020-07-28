'use strict';
renderer.renderBoard();
//Назначаем обработчики нажатия мыши



let cells = document.querySelectorAll('td');
cells.forEach(cell => cell.addEventListener('click', function (event) {

    if (figureChoiced.figureIsChoiced()) {
        mover.move(event.currentTarget);
    } else {
        mover.choiceFigure(event.currentTarget);
    }
}));