'use strict';

class Board {

    constructor() {
        this.gameTableEl = document.getElementById('game');
    }

    init(status, game) {

        this.status = status;
        this.game = game;
        this.renderMap();
        this.initEventHandlers();
    }

    /**
     * Вывод ячеек в html.
     */
    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableEl.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    }

    /**
     * Инициализация обработчиков событий.
     */
    initEventHandlers() {
        // Ставим обработчик, при клике на ячейку таблицы вызовется функция game.cellClick.
        let cells = this.gameTableEl.querySelectorAll('td');
        cells.forEach(cell => {
            cell.addEventListener('click', event => {
                this.game.cellClick(+event.target.dataset.row,
                    +event.target.dataset.col);
            })
        })
    }

    /**
     * Заполняет ячейку в которую кликнул пользователь в событии event.
     * @param {number} row номер строки
     * @param {number} col номер столбца
     */
    fillCell(row, col) {

        // Заполняем ячейку и ставим значение в массиве, в свойстве mapValues.
        this.gameTableEl.querySelector(`[data-row='${row}'][data-col='${col}']`).innerText = this.status.phase;
    }
};