'use strict';
let renderer = {
    /**
     * Метод рисует игровое шахматное поле и фигры на нем.
     */
    renderBoard() {
        let result = this.generateBoard();
        document.body.insertAdjacentHTML("afterbegin", result);
        //this.renderUserPosition(player);
    },

    /**
     * Метод генерирует игровое поле на основании размеров в конфиге.
     * @returns {string} сгенерированный html-код таблицы(игрового поля).
     */
    generateBoard() {
        const COLOR_WHITE = 'class="cell-white"';
        const COLOR_BLACK = 'class="cell-black"';
        let board = "";
        for (let y = 0; y <= config.rowsCount + 1; y++) {
            board += "<tr>";
            for (let x = 0; x <= config.colsCount + 1; x++) {
                if (x === 0 || y === 0 || y === config.rowsCount + 1 ||
                    x === config.colsCount + 1) {
                    board += `<th data-head-x="${x}" data-head-y="${y}">${this.getSymbolHead(x, y)}</th>`;
                    continue;
                }

                if ((x + y) % 2 == 0) {
                    board += `<td ${COLOR_WHITE}' `;
                } else {
                    board += `<td ${COLOR_BLACK}' `;
                }
                board += `data-x="${x}" data-y="${y}">${this.getFigure(x, y)}</i></td>`;
            }

            board += "</tr>";
        }
        return `<table><tbody>${board}</tbody></table>`;
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

    // /**
    //  * Если ячейка с переданными координатами есть, то возвращается ее объект,
    //  * а иначе null.
    //  * @param {{x: number, y: number}} position объект с координатами.
    //  * @returns {HTMLTableCellElement|null} объект ячейки если есть, в противном случае null.
    //  */
    // getSquare(position) {
    //     return document.querySelector(`[data-x="${position.x}"][data-y="${position.y}"]`);
    // },

    // /**
    //  * Метод рисует расположение пользвателя для указанной координаты.
    //  * Для этого он добавляет тегу td класс ".user".
    //  * @param {{x: number, y: number}} position
    //  */
    // renderUserPosition(position) {
    //     let square = this.getSquare(position);
    //     square.classList.add("user");
    // },

    // /**
    //  * Метод удаляет пользователя с игрового поля. У тега td удаляет
    //  * класс ".user".
    //  */
    // clearUserPosition() {
    //     document.querySelector(".user").classList.remove("user");
    // }
};