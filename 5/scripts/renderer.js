'use strict';
let renderer = {
    /**
     * Метод рисует игровое шахматное поле и фигры на нем.
     */
    renderBoard() {
        let result = this.generateBoard();
        let plaeyrText = document.querySelector('.player');

        document.body.insertAdjacentHTML("afterend", result);
        //this.renderUserPosition(player);
    },

    /**
     * Метод генерирует игровое поле на основании размеров в конфиге.
     * @returns {string} сгенерированный html-код таблицы(игрового поля).
     */
    generateBoard() {

        let board = "";
        for (let y = 0; y <= config.rowsCount + 1; y++) {

            board += "<tr>";
            for (let x = 0; x <= config.colsCount + 1; x++) {

                //Заголовки строк и столбцов
                if (this.generateHead(x, y)) {
                    board += `<th data-head-x="${x}" data-head-y="${y}">${this.getSymbolHead(x, y)}</th>`;
                    continue;
                }
                board += this.getTd(x, y);
            }

            board += "</tr>";
        }
        return `<table><tbody>${board}</tbody></table>`;
    },

    /**
     * Метод возвращает сформированную ячейку td
     * @param {number} x координата
     * @param {number} y координата
     */

    getTd(x, y) {
        const COLOR_WHITE = 'class="cell-white"';
        const COLOR_BLACK = 'class="cell-black"';

        if ((x + y) % 2 == 0) {
            return `<td ${COLOR_WHITE}' data-x="${x}" data-y="${y}" ${this.castling(x, y)}>${this.getFigure(x, y)}</i></td>`;
        } else {
            return `<td ${COLOR_BLACK}' data-x="${x}" data-y="${y}" ${this.castling(x, y)}>${this.getFigure(x, y)}</i></td>`;
        }
    },

    /**
     * Метод возвращает строку, указывающую на возможность ракировки
     * @param {number} x координата
     * @param {number} y координата
     * 
     */
    castling(x, y) {
        if (x === 3 && y === 1 ||
            x === 3 && y === 8 ||
            x === 7 && y === 1 ||
            x === 7 && y === 8) {
            return "data-castling='true'";
        } else {
            return '';
        }
    },

    /**
     * Метод определяет является ли ячейка заголовком
     * @param {number} x координата
     * @param {number} y координата
     * @returns {boolean}
     */
    generateHead(x, y) {
        return x === 0 || y === 0 || y === config.rowsCount + 1 || x === config.colsCount + 1;
    },

    /**
     * Метод возвращает символ координаты поля. Цифры по вертикали, буквы по горизонтали
     * @param {Number} x координата по горизонтали
     * @param {Number} y координата по вертикали
     * @returns {string} 
     */
    getSymbolHead(x, y) {
        if (x === 0 && y === 0 ||
            x === 0 && y === config.rowsCount + 1 ||
            x === config.colsCount + 1 && y == config.rowsCount + 1 ||
            x === config.colsCount + 1 && y === 0) {
            return '';
        }

        if (y === 0 || y == config.rowsCount + 1) {
            return String.fromCharCode("@".charCodeAt(0) + x);
        }

        if (x === 0 || x == config.colsCount + 1) {
            return config.rowsCount - y + 1;
        }
    },

    /**
     * Метод возвращает иконку фигуры по координатам
     * @param {*} x 
     * @param {*} y 
     */
    getFigure(x, y) {

        if (y > 2 && y < 7) {
            /* Это для проверки ходов
            if (y == 5 && x == 4) {
                return `<i class = "fas fa-chess-king chess-color-white"></i>`;
            };
            if (y == 6 && x == 3) {
                return `<i class = "fas fa-chess-king chess-color-black"></i>`;
            };*/
            return '';
        }
        let chessColor = 'chess-color-black';
        if (y >= 7) {
            chessColor = 'chess-color-white';
        }
        if (y === 2 || y === 7) {
            return `<i class = "fas fa-chess-pawn ${chessColor}"></i>`;
        } else {
            switch (x) {
                case 1:
                case 8:
                    return `<i class = "fas fa-chess-rook ${chessColor}"></i>`;
                case 2:
                case 7:
                    return `<i class="fas fa-chess-knight ${chessColor}"></i>`;
                case 3:
                case 6:
                    return `<i class="fas fa-chess-bishop ${chessColor}"></i>`;
                case 4:
                    return `<i class="fas fa-chess-queen ${chessColor}"></i>`;
                case 5:
                    return `<i class="fas fa-chess-king ${chessColor}"></i>`;
                default:
                    return "";
            }
        }

    }

};