"use strict";
let mover = {

    player: PLAYER_WHITE,

    /**
     * Метод выбирает клетку
     * @param {HTMLTableCellElement} cell Выбираемая клетка
     */
    choiceFigure(cell) {

        //Если фигура уже выбрана - завершаем метод
        if (cell === null) {
            return;
        }

        //Если в клетке нет фигуры - завершаем метод
        if (cell.firstChild === null) {
            return;
        }

        if (figureChoiced.getFigureColor(cell.firstChild) !== this.player) {
            return;
        }

        figureChoiced.setCell(cell);
    },

    /**
     * Метод передвигает фигуру
     * @param {HTMLTableCellElement} cell Клетка на которую перемещается фигура
     */
    move(cell) {
        //Если клетка назначения совпадает с текущим положением фигуры, отменяем ход
        if (cell === figureChoiced.cell) {
            figureChoiced.clear();
            return;
        }

        //Если клетка назначения отсутствует в массиве доступных ходов, завершаем метод
        if (!figureChoiced.avaibleCells.includes(cell)) {
            return;
        }

        //Если в клетке стоит фигура противника - удаляем ее
        this.opponentKill(cell);

        //Перемещаем фиругу
        this.figureRepaint(cell);

        //Если ходит пешка - превращаем ее в фигуру
        if (figureChoiced.figureName === 'pawn') {
            this.pawnUpdate(cell);
        }

        //Очищаем доску от подсветки
        figureChoiced.clear();

        //Передаем ход другому игроку
        this.changePlayer()

    },

    /**
     * Метод убирает фигуру противника
     * @param {HTMLTableCellElement} cell Клетка, с которой убирается фигура
     */
    opponentKill(cell) {
        if (cell.firstChild !== null) {
            cell.firstChild.remove();
        }
    },

    /**
     * Метод переносит фигуры
     * @param {HTMLTableCellElement} cell Клетка назначения
     */
    figureRepaint(cell) {
        //Создаем фигуру на новом месте
        let newFigure = document.createElement('i');
        for (let i = 0; i < figureChoiced.figure.classList.length; i++) {
            newFigure.classList.add(figureChoiced.figure.classList[i]);
        }
        cell.appendChild(newFigure);

        //Ракировка
        this.moveCastling(cell);

        //Удаляем фигуру со страрой клетки
        figureChoiced.figure.remove();
    },

    /**
     * Метод осуществляет ракировку в случае возможности.
     * @param {HTMLTableCellElement} cell Клетка назначения
     */
    moveCastling(cell) {

        let figureName = figureChoiced.figureName;

        if (figureName == 'rook') {
            if (figureChoiced.x === 1) {
                this.removeCastling([3]);
            } else {
                this.removeCastling([7]);
            }
            return;
        }

        if (figureName !== 'king') {
            return;
        }

        //Передвигаем ладью
        this.castlingMoveRook(cell);

        //Очищаем признаки возможности ракировки
        this.removeCastling([3, 7]);
    },

    /**
     * Метод передвигает ладью при ракировке
     * @param {HTMLTableCellElement} cell Клетка, в которую передвиается король при ракировке
     */
    castlingMoveRook(cell) {
        if (cell.dataset.castling !== undefined) {
            //Передвигаем ладью

            let chessColor = 'chess-color-white';
            if (this.player === PLAYER_BLACK) {
                chessColor = 'chess-color-black';
            }
            //Ракировка влево
            if (cell.dataset.x == 3) {
                figureChoiced.searchCell(1, figureChoiced.y).firstChild.remove();
                figureChoiced.searchCell(4, figureChoiced.y).innerHTML = `<i class = "fas fa-chess-rook ${chessColor}"></i>`;
            }

            //Ракировка вправо
            if (cell.dataset.x == 7) {
                figureChoiced.searchCell(8, figureChoiced.y).firstChild.remove();
                figureChoiced.searchCell(6, figureChoiced.y).innerHTML = `<i class = "fas fa-chess-rook ${chessColor}"></i>`;
            }
        }
    },

    /**
     * Метод очищает признак возможности ракировки из клеток
     * @param {number[]} x массив с горизонтальными координатами
     */
    removeCastling(x) {
        for (let i = 0; i < x.length; i++) {
            document.querySelectorAll(`[data-y='${figureChoiced.y}'][data-castling='true']`).forEach(function (cell) {
                if (cell.dataset.x == x[i]) {
                    cell.removeAttribute("data-castling");
                }
            });
        }

    },

    /**
     * Метод передает ход другому игроку
     */
    changePlayer() {
        if (this.player === PLAYER_WHITE) {
            this.player = PLAYER_BLACK;
            document.querySelector('.player').innerText = "Ход чёрных";
        } else {
            this.player = PLAYER_WHITE;
            document.querySelector('.player').innerText = "Ход белых";
        }
    },

    /**
     * Метод превращает пешку в фигуру
     * @param {HTMLTableCellElement} cell Клетка, в которой находится пешка
     */
    pawnUpdate(cell) {

        if (cell.dataset.y != 1 &&
            cell.dataset.y != 8) {
            return;
        }

        let div = document.createElement('div');
        div.classList.add('modal');
        div.innerHTML = '<h1 class="player">Выберите фигуру</h1>';
        document.body.appendChild(div);

        let tableCase = '<table><tbody><tr>';
        for (let i = 1; i <= 4; i++) {
            tableCase += `<td data-x="${cell.dataset.x}" data-y="${cell.dataset.y}">${renderer.getFigure(i, 9 - cell.dataset.y)}</td>`
        }

        tableCase += '</tr></tbody></table>';
        div.innerHTML += tableCase;

        let cells = div.querySelectorAll('td');
        cells.forEach(cell => cell.addEventListener('click', event => this.cellCaseFigureClick(event)));

    },

    cellCaseFigureClick(event) {
        let figure = event.currentTarget.firstChild.outerHTML;
        let cell = figureChoiced.searchCell(event.currentTarget.dataset.x, event.currentTarget.dataset.y);
        cell.innerHTML = figure;
        event.path[5].remove();
    }
};