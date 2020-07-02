'use strict';
/**
 * Объект хранит информацию о выбранной ячейке
 */

let figureChoiced = {
    //координаты
    x: 0,
    y: 0,
    //клетка, в которой находится фигура
    cell: null,

    //фигура
    figure: null,

    //имя фигуры
    figureName: "",

    //цвет фигуры
    figureColor: "",

    //Массив хранит доступные для хода клетки
    avaibleCells: [],

    /**
     * Метод проверяет выбираемую клетку и заносит в структуру объекта
     * @param {node} cell Выбираемая клетка на доске
     * @returns {boolean} true, если клетка выбрана, если структура уже заполнена или в клетке нет фигуры - false
     */
    setCell(cell) {


        //Заполняем структуру
        this.cell = cell;
        this.figure = cell.firstChild;
        this.x = +cell.dataset.x;
        this.y = +cell.dataset.y;
        this.figureName = this.getFigureName();
        this.figureColor = this.getFigureColor();
        this.avaibleCells = this.getAvaibleCells();
        //Подсвечиваем клетку, в которой стоит фигура
        cell.classList.add('cell-active');
        //Подсвечиваем доступные клетки
        this.backlightAvaibleCells();


    },

    /**
     * Метод очищает объект
     */
    clear() {
        this.x = 0;
        this.y = 0;
        this.figure = null;
        this.figureName = "";
        this.figureColor = "";
        this.cell.classList.remove('cell-active');
        this.cell = null;
        this.backlightAvaibleCells(false);
        this.avaibleCells = [];
    },

    /**
     * Метод возвращает имя фигуры
     * @param {node} figure Фигура
     */
    getFigureName() {
        if (this.figure.classList.contains('fa-chess-pawn')) {
            return 'pawn';
        } else if (this.figure.classList.contains('fa-chess-rook')) {
            return 'rook';
        } else if (this.figure.classList.contains('fa-chess-knight')) {
            return 'knight';
        } else if (this.figure.classList.contains('fa-chess-bishop')) {
            return 'bishop';
        } else if (this.figure.classList.contains('fa-chess-queen')) {
            return 'queen';
        } else if (this.figure.classList.contains('fa-chess-king')) {
            return 'king';
        }
    },

    /**
     * Метод возвращает цвет фигуры
     * @param {HTMLElement} figure Фигура, цвет которой надо определить
     * @returns {string} PLAYER_WHITE или PLAYER_BLACK
     */
    getFigureColor(figure = this.figure) {

        if (figure.classList.contains('chess-color-white')) {
            return PLAYER_WHITE;
        };

        if (figure.classList.contains('chess-color-black')) {
            return PLAYER_BLACK;
        };
    },

    /**
     * Метод возвращает массив клеток, доступных для хода
     */
    getAvaibleCells() {
        let cells = [];
        switch (this.figureName) {
            case 'pawn':
                return this.getAvaibleCellsPawn();
            case 'rook':
                return this.getAvaibleCellsRook();
            case 'knight':
                return this.getAvaibleCellsKnight();
            case 'bishop':
                return this.getAvaibleCellsBishop();
            case 'queen':
                return this.getAvaibleCellsQueen();
            case 'king':
                return this.getAvaibleCellsKing();
        };
    },

    /**
     * Метод возвращает возможные ходы пешки
     * @return {array} Массив из клеток, в которые можно пойти
     */
    getAvaibleCellsPawn() {

        let cells = [];
        let factor = 1;

        if (this.figureColor === PLAYER_BLACK) {
            factor = -1
        }

        //Ход вперед
        let cell = this.searchCell(this.x, this.y - 1 * factor);
        if (cell !== null && cell.firstChild == null) {
            //Клетка пустая, на нее можно встать
            cells.push(cell);

            //Первый ход может быть через клетку
            if (this.y === 7 && this.figureColor === PLAYER_WHITE ||
                this.y === 2 && this.figureColor === PLAYER_BLACK) {
                //Находим клетку, которая "через клетку"
                cell = this.searchCell(this.x, this.y - 2 * factor);
                //проверяем существование клетки и наличие в ней фигуры
                if (cell !== null && cell.firstChild == null) {
                    cells.push(cell);
                }
            }

        }

        //Возможность срубить противника
        let x = this.x - 1;
        do {
            cell = this.searchCell(x, this.y - 1 * factor);
            if (cell !== null &&
                cell.firstChild !== null &&
                this.getFigureColor(cell.firstChild) !== this.figureColor) {

                cells.push(cell);
            }

            x += 2;
        } while (x <= this.x + 1);

        return cells;
    },

    /**
     * Метод возвращает возможные ходы ладьи
     * @returns {HTMLTableCellElement[]} Массив доступных клеток
     */
    getAvaibleCellsRook() {

        let cells = [];
        //По горизонтали влево
        for (let i = this.x - 1; i > 0; i--) {
            if (!this.cellAddToCells(this.searchCell(i, this.y), cells)) {
                break;
            }
        }

        //По горизонтали вправо
        for (let i = this.x + 1; i <= config.colsCount; i++) {
            if (!this.cellAddToCells(this.searchCell(i, this.y), cells)) {
                break;
            }
        }

        //По вертикали вверх
        for (let i = this.y - 1; i > 0; i--) {
            if (!this.cellAddToCells(this.searchCell(this.x, i), cells)) {
                break;
            }
        }

        //По вертикали вниз
        for (let i = this.y + 1; i <= config.rowsCount; i++) {
            if (!this.cellAddToCells(this.searchCell(this.x, i), cells)) {
                break;
            }
        }

        return cells;
    },

    /**
     * Метод возвращает возможные ходы коня
     * @returns {HTMLTableCellElement[]} Массив доступных клеток
     */
    getAvaibleCellsKnight() {
        let cells = [];
        //Массив содержит координаты всех возможных ход, в том числе несуществующие клетки
        let possiblePositions = [{
                x: this.x - 2,
                y: this.y - 1,
            },
            {
                x: this.x - 1,
                y: this.y - 2,
            },
            {
                x: this.x + 1,
                y: this.y - 2,
            },
            {
                x: this.x + 2,
                y: this.y - 1,
            },
            {
                x: this.x + 2,
                y: this.y + 1,
            },
            {
                x: this.x + 1,
                y: this.y + 2,
            },
            {
                x: this.x - 1,
                y: this.y + 2,
            },
            {
                x: this.x - 2,
                y: this.y + 1,
            }
        ];

        //Из массива координат получаем массив доступных клеток
        for (let i = 0; i < possiblePositions.length; i++) {
            this.cellAddToCells(this.searchCell(possiblePositions[i].x, possiblePositions[i].y), cells);
        }

        return cells;
    },

    /**
     * Метод возвращает возможные ходы слона
     * @returns {HTMLTableCellElement[]} Массив доступных клеток
     */
    getAvaibleCellsBishop() {

        let cells = [];
        //влево вверх
        for (let i = 1; i < config.colsCount; i++) {

            if (!this.cellAddToCells(this.searchCell(this.x - i, this.y - i), cells)) {
                break;
            }
        }

        //вправо вверх
        for (let i = 1; i < config.colsCount; i++) {

            if (!this.cellAddToCells(this.searchCell(this.x + i, this.y - i), cells)) {
                break;
            }
        }

        //влево вниз
        for (let i = 1; i < config.colsCount; i++) {

            if (!this.cellAddToCells(this.searchCell(this.x - i, this.y + i), cells)) {
                break;
            }
        }

        //вправо вниз
        for (let i = 1; i < config.colsCount; i++) {

            if (!this.cellAddToCells(this.searchCell(this.x + i, this.y + i), cells)) {
                break;
            }
        }

        return cells;
    },

    /**
     * Метод возвращает возможные ходы королевы
     * @returns {HTMLTableCellElement[]} Массив доступных клеток
     */
    getAvaibleCellsQueen() {
        return [].concat(this.getAvaibleCellsRook(), this.getAvaibleCellsBishop());
    },

    /**
     * Метод возвращает возможные ходы короля
     * @returns {HTMLTableCellElement[]} Массив доступных клеток
     */
    getAvaibleCellsKing() {
        let cells = [];

        for (let x = this.x - 1; x <= this.x + 1; x++) {
            for (let y = this.y - 1; y <= this.y + 1; y++) {
                this.cellAddToCells(this.searchCell(x, y), cells);
            }
        }

        this.cellsForCastlingPushCells(cells);

        return cells;
    },

    /**
     * Метод проверяет возможность ракировки и добавляет соответствующие клетки в массив
     * @param {HTMLTableCellElement[]} cells массив, куда добавляются клетки ракировки
     */
    cellsForCastlingPushCells(cells) {
        //Ракировка вправо
        if (document.querySelector(`[data-x="7"][data-y='${this.y}'][data-castling='true']`) !== null && //Возможность ракировки
            this.searchCell(6, this.y).firstChild === null && //Пустая клетка
            this.searchCell(7, this.y).firstChild === null //Пустая клетка
        ) {

            cells.push(this.searchCell(7, this.y));
        }

        //Ракировка влево
        if (document.querySelector(`[data-x="3"][data-y='${this.y}'][data-castling='true']`) !== null && //Возможность ракировки
            this.searchCell(4, this.y).firstChild === null && //Пустая клетка
            this.searchCell(3, this.y).firstChild === null && //Пустая клетка
            this.searchCell(2, this.y).firstChild === null //Пустая клетка
        ) {

            cells.push(this.searchCell(3, this.y));
        }
    },

    /**
     * Метод проверяет можно ли поставить фигуру в клетку cell и добавляет ячейку в cells
     * @param {HTMLTableCellElement} cell добавляемая клетка
     * @param {HTMLTableCellElement[]} cells массив, куда добавляется клетка
     * @returns {boolean} true - если клетка пустая, false - если клетка не существует или в ней стоит фигура
     */
    cellAddToCells(cell, cells) {
        if (cell === null) {
            //клетка не существует
            return false;
        }
        if (cell.firstChild == null) {
            //Пустая клетка
            cells.push(cell);
            return true;
        } else if (this.getFigureColor(cell.firstChild) !== this.figureColor) {
            //В клетке фигура противника
            cells.push(cell);
            return false;
        } else {
            //В клетке своя фигура
            return false;
        }

    },

    /**
     * Метод возвращает клетку с заданными координатами
     * @param {number} x Горизонтальная координата
     * @param {number} y Вертикальная координата
     * @returns {HTMLTableCellElement[]} Найденная ячейкка или null
     */
    searchCell(x, y) {
        return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    },

    /**
     * Метод подсвечивает/убирает подсветку доступных клеток
     * @param {boolean} backlight true - подсветить, false - брать подсветку
     */
    backlightAvaibleCells(backlight = true) {
        for (let i = 0; i < this.avaibleCells.length; i++) {
            if (backlight) {
                this.avaibleCells[i].classList.add('cell-active');
            } else {
                this.avaibleCells[i].classList.remove('cell-active');
            }

        }
    },

    /**
     * Метод определяет выбрана ли фигура
     * @returns {boolean} true - фигура выбрана, иначе false
     */
    figureIsChoiced() {
        return this.cell !== null;
    },
}