const PLAYER_WHITE = 'white';
const PLAYER_BLACK = 'black';

let mover = {




    //Здесь хранятся клетки доступных ходов.
    avaibleCells: [],
    //Клетка выбранной фигуры
    cellChoiced: {
        x: 0,
        y: 0,
        cell: null,
        setCell(cell) {
            this.cell = cell;
            this.x = +cell.dataset.x;
            this.y = +cell.dataset.y;
            cell.classList.add('cell-active');
        },
        removeCell() {
            this.x = 0;
            this.y = 0;
            this.cell.classList.remove('cell-active');
            this.cell = null;
        },
    },

    //Игрок, который должен ходить
    player: PLAYER_WHITE,

    /**
     * Метод подсвечивает выбранную фигуру и доступные ходы
     * @param {object} event 
     */
    choice(event) {
        console.log(event);
        let cell = event.currentTarget; //Ячейка, в которой находится фигура
        console.dir(cell);
        let figure = cell.firstChild; //Фигура
        console.dir(figure);
        //Проверяем чей ход
        if (this.getFigureColor(figure) != this.player) {
            //Если выбрана фигура не того цвета или фигуры нет в выбранной клетке - прерываем метод
            return;
        } else {
            //Заполняем координаты выбранной фигуры и подсвечиваем клетку
            this.cellChoiced.setCell(cell);

            this.avaibleCells = this.getAvaibleCells(figure);
            this.backlightAvaibleCells();
            console.log(this.avaibleCells);

        }

    },

    /**
     * Метод подсвечивает доступные ходы
     */
    backlightAvaibleCells() {
        for (let i = 0; i < this.avaibleCells.length; i++) {
            this.avaibleCells[i].classList.add('cell-active');
        }
    },

    getAvaibleCells(figure) {
        switch (this.getFigureName(figure)) {
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
     * Метод проверяет можно ли поставить фигуру в клетку cell и добавляет ячейку в cells
     * @param {object} cell добавляемая клетка
     * @param {array} cells массив, куда добакляется клетка
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
        } else if (this.getFigureColor(cell.firstChild) !== this.player) {
            //В клетке фигура противника
            cells.push(cell);
            return false;
        } else {
            //В клетке своя фигура
            return false;
        }

    },

    /**
     * Метод возвращает возможные ходы короля
     * @return {array} Массив из ячеек, в которые можно пойти
     */
    getAvaibleCellsKing() {
        let cells = [];
        let possiblePositions = [{
                //Влево
                x: this.cellChoiced.x - 1,
                y: this.cellChoiced.y,
            },
            { //Влево вврех
                x: this.cellChoiced.x - 1,
                y: this.cellChoiced.y - 1,
            },
            { //Вверх
                x: this.cellChoiced.x,
                y: this.cellChoiced.y - 1,
            },
            { //Вправо вверх
                x: this.cellChoiced.x + 1,
                y: this.cellChoiced.y - 1,
            },
            { //Вправо
                x: this.cellChoiced.x + 1,
                y: this.cellChoiced.y,
            },
            { //Вправо вниз
                x: this.cellChoiced.x + 1,
                y: this.cellChoiced.y + 1,
            },
            { //Вниз
                x: this.cellChoiced.x,
                y: this.cellChoiced.y + 1,
            },
            { //Влево вниз
                x: this.cellChoiced.x - 1,
                y: this.cellChoiced.y + 1,
            }
        ];

        for (let i = 0; i < possiblePositions.length; i++) {
            this.cellAddToCells(document.querySelector(`[data-x="${possiblePositions[i].x}"][data-y="${possiblePositions[i].y}"`), cells);
        }


        //Ракировка вправо
        if (document.querySelector(`[data-x="7"][data-y='${this.cellChoiced.y}'][data-castling='true']`) !== null && //Возможность ракировки
            document.querySelector(`[data-x="6"][data-y="${this.cellChoiced.y}"`).firstChild === null && //Пустая клетка
            document.querySelector(`[data-x="7"][data-y="${this.cellChoiced.y}"`).firstChild === null //Пустая клетка
        ) {

            cells.push(document.querySelector(`[data-x="7"][data-y="${this.cellChoiced.y}"`));
        }

        //Ракировка влево
        if (document.querySelector(`[data-x="3"][data-y='${this.cellChoiced.y}'][data-castling='true']`) !== null && //Возможность ракировки
            document.querySelector(`[data-x="4"][data-y="${this.cellChoiced.y}"`).firstChild === null && //Пустая клетка
            document.querySelector(`[data-x="3"][data-y="${this.cellChoiced.y}"`).firstChild === null && //Пустая клетка
            document.querySelector(`[data-x="2"][data-y="${this.cellChoiced.y}"`).firstChild === null //Пустая клетка
        ) {

            cells.push(document.querySelector(`[data-x="3"][data-y="${this.cellChoiced.y}"`));
        }

        return cells;
    },

    /**
     * Метод возвращает возможные ходы королевы
     * @return {array} Массив из ячеек, в которые можно пойти
     */

    getAvaibleCellsQueen() {

        return [].concat(this.getAvaibleCellsRook(), this.getAvaibleCellsBishop());
    },

    /**
     * Метод возвращает возможные ходы слона
     * @return {array} Массив из ячеек, в которые можно пойти
     */

    getAvaibleCellsBishop() {

        let cells = [];
        //влево вверх
        for (let i = 1; i < config.colsCount; i++) {

            if (!this.cellAddToCells(document.querySelector(`[data-x="${this.cellChoiced.x - i}"][data-y="${this.cellChoiced.y - i}"]`), cells)) {
                break;
            }
        }

        //вправо вверх
        for (let i = 1; i < config.colsCount; i++) {

            if (!this.cellAddToCells(document.querySelector(`[data-x="${this.cellChoiced.x + i}"][data-y="${this.cellChoiced.y - i}"]`), cells)) {
                break;
            }
        }

        //влево вниз
        for (let i = 1; i < config.colsCount; i++) {

            if (!this.cellAddToCells(document.querySelector(`[data-x="${this.cellChoiced.x - i}"][data-y="${this.cellChoiced.y + i}"]`), cells)) {
                break;
            }
        }

        //вправо вниз
        for (let i = 1; i < config.colsCount; i++) {

            if (!this.cellAddToCells(document.querySelector(`[data-x="${this.cellChoiced.x + i}"][data-y="${this.cellChoiced.y + i}"]`), cells)) {
                break;
            }
        }

        return cells;
    },

    /**
     * Метод возвращает возможные ходы коня
     * @return {array} Массив из ячеек, в которые можно пойти
     */
    getAvaibleCellsKnight() {
        let cells = [];
        let possiblePositions = [{
                x: this.cellChoiced.x - 2,
                y: this.cellChoiced.y - 1,
            },
            {
                x: this.cellChoiced.x - 1,
                y: this.cellChoiced.y - 2,
            },
            {
                x: this.cellChoiced.x + 1,
                y: this.cellChoiced.y - 2,
            },
            {
                x: this.cellChoiced.x + 2,
                y: this.cellChoiced.y - 1,
            },
            {
                x: this.cellChoiced.x + 2,
                y: this.cellChoiced.y + 1,
            },
            {
                x: this.cellChoiced.x + 1,
                y: this.cellChoiced.y + 2,
            },
            {
                x: this.cellChoiced.x - 1,
                y: this.cellChoiced.y + 2,
            },
            {
                x: this.cellChoiced.x - 2,
                y: this.cellChoiced.y + 1,
            }
        ];

        for (let i = 0; i < possiblePositions.length; i++) {
            this.cellAddToCells(document.querySelector(`[data-x="${possiblePositions[i].x}"][data-y="${possiblePositions[i].y}"`), cells);
        }

        return cells;
    },

    /**
     * Метод возвращает возможные ходы ладьи
     * @return {array} Массив из ячеек, в которые можно пойти
     */
    getAvaibleCellsRook() {

        let cells = [];
        //По горизонтали влево
        for (let i = this.cellChoiced.x - 1; i > 0; i--) {
            if (!this.cellAddToCells(document.querySelector(`[data-x="${i}"][data-y="${this.cellChoiced.y}"]`), cells)) {
                break;
            }
        }

        //По горизонтали вправо
        for (let i = this.cellChoiced.x + 1; i <= config.colsCount; i++) {
            if (!this.cellAddToCells(document.querySelector(`[data-x="${i}"][data-y="${this.cellChoiced.y}"]`), cells)) {
                break;
            }
        }

        //По вертикали вверх
        for (let i = this.cellChoiced.y - 1; i > 0; i--) {
            if (!this.cellAddToCells(document.querySelector(`[data-x="${this.cellChoiced.x}"][data-y="${i}"]`), cells)) {
                break;
            }
        }

        //По вертикали вниз
        for (let i = this.cellChoiced.y + 1; i <= config.rowsCount; i++) {
            if (!this.cellAddToCells(document.querySelector(`[data-x="${this.cellChoiced.x}"][data-y="${i}"]`), cells)) {
                break;
            }
        }

        return cells;
    },

    /**
     * Метод возвращает возможные ходы пешки
     * @return {array} Массив из ячеек, в которые можно пойти
     */
    getAvaibleCellsPawn() {

        let cells = [];
        let factor = 1;

        if (this.player === PLAYER_BLACK) {
            factor = -1
        }

        //Ход на одну клетку вперед
        let cell = document.querySelector(`[data-x="${this.cellChoiced.x}"][data-y="${this.cellChoiced.y - 1 * factor}"]`);
        if (cell !== null && cell.firstChild == null) {
            cells.push(cell);
            //Первый ход может быть через клетку
            if (this.cellChoiced.y === 7 && this.player === PLAYER_WHITE ||
                this.cellChoiced.y === 2 && this.player === PLAYER_BLACK) {
                cell = document.querySelector(`[data-x="${this.cellChoiced.x}"][data-y="${this.cellChoiced.y - 2 * factor}"]`);
                if (cell !== null && cell.firstChild == null) {
                    cells.push(cell);
                }
            }

        }

        //Возможность срубить противника вперед влево
        cell = document.querySelector(`[data-x="${this.cellChoiced.x - 1}"][data-y="${this.cellChoiced.y - 1 * factor}"]`);
        if (cell !== null && cell.firstChild !== null && this.getFigureColor(cell.firstChild) !== this.player) {
            cells.push(cell);
        }

        //Возможность срубить противника вперед вправо
        cell = document.querySelector(`[data-x="${this.cellChoiced.x + 1}"][data-y="${this.cellChoiced.y - 1 * factor}"]`);
        if (cell !== null && cell.firstChild !== null && this.getFigureColor(cell.firstChild) !== this.player) {
            cells.push(cell);
        }

        return cells;
    },

    getFigureName(figure) {
        if (figure.classList.contains('fa-chess-pawn')) {
            return 'pawn';
        } else if (figure.classList.contains('fa-chess-rook')) {
            return 'rook';
        } else if (figure.classList.contains('fa-chess-knight')) {
            return 'knight';
        } else if (figure.classList.contains('fa-chess-bishop')) {
            return 'bishop';
        } else if (figure.classList.contains('fa-chess-queen')) {
            return 'queen';
        } else if (figure.classList.contains('fa-chess-king')) {
            return 'king';
        }
    },


    /**
     * Метод определяет цвет фигуры
     * @param {object} node 
     */
    getFigureColor(figure) {

        if (figure.classList.contains('chess-color-white')) {
            return PLAYER_WHITE;
        };

        if (figure.classList.contains('chess-color-black')) {
            return PLAYER_BLACK;
        };

        return null;
    },

    /**
     * Метод передвигает фигуру
     * @param {Object} event <td> на который нажали
     */
    move(event) {
        let cell = event.currentTarget; //Клетка назначения
        //Если клетка назначения совпадает с текущим положением фигуры, отменяем ход
        if (cell === this.cellChoiced.cell) {
            this.clearAvaiblaCells();
            this.cellChoiced.removeCell();
            return;
        };
        //Если клетка назначения отсутствует в массиве доступных ходов, завершаем метод
        if (!this.avaibleCells.includes(cell)) {
            console.dir('Недопустимый ход!');
            return;
        };

        //Если в клетке стоит фигура противника - удаляем ее
        if (cell.firstChild !== null) {
            cell.firstChild.remove();
        };

        //Создаем фигуру на новом месте
        let newFigure = document.createElement('i');
        for (let i = 0; i < this.cellChoiced.cell.firstChild.classList.length; i++) {
            newFigure.classList.add(this.cellChoiced.cell.firstChild.classList[i]);
        }
        cell.appendChild(newFigure);

        //Ракировка
        this.moveCastling(cell);

        //Удаляем фигуру со страрой клетки
        this.cellChoiced.cell.firstChild.remove();

        //Очищаем доску от подсветки
        this.clearAvaiblaCells();
        this.cellChoiced.removeCell();

        //Передаем ход другому игроку
        if (this.player === PLAYER_WHITE) {
            this.player = PLAYER_BLACK;
        } else {
            this.player = PLAYER_WHITE;
        };

    },

    moveCastling(cell) {

        let figureName = this.getFigureName(this.cellChoiced.cell.firstChild);

        if (figureName == 'rook') {
            if (this.cellChoiced.x === 1) {
                this.removeCastling([3]);
            } else {
                this.removeCastling([7]);
            }
            return;
        }

        if (cell.dataset.castling !== undefined) {
            //Передвигаем ладью

            let chessColor = 'chess-color-black';
            if (this.player !== PLAYER_BLACK) {
                chessColor = 'chess-color-white';
            }
            //Ракировка влево
            if (cell.dataset.x == 3) {
                document.querySelector(`[data-x='1'][data-y='${this.cellChoiced.y}'`).firstChild.remove();
                document.querySelector(`[data-x='4'][data-y='${this.cellChoiced.y}'`).innerHTML = `<i class = "fas fa-chess-rook ${chessColor}"></i>`;
            }

            //Ракировка вправо
            if (cell.dataset.x == 7) {
                document.querySelector(`[data-x='8'][data-y='${this.cellChoiced.y}'`).firstChild.remove();
                document.querySelector(`[data-x='6'][data-y='${this.cellChoiced.y}'`).innerHTML = `<i class = "fas fa-chess-rook ${chessColor}"></i>`;
            }
        }

        this.removeCastling([3, 7]);
        console.log("Ракировка");
    },

    removeCastling(x) {
        for (let i = 0; i < x.length; i++) {
            this.avaibleCells.forEach(function (cell) {
                if (cell.dataset.castling !== undefined && cell.dataset.x == x[i]) {
                    cell.removeAttribute("data-castling");
                }
            });
        };

    },

    clearAvaiblaCells() {
        for (let i = 0; i < this.avaibleCells.length; i++) {
            this.avaibleCells[i].classList.remove('cell-active');
        }
        this.avaibleCells = [];
    },

    figureIsChoiced() {
        return this.cellChoiced.cell !== null;
    },

}