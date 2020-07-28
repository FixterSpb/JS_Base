'use strict';

class Game {
    constructor() {
        this.mapValues = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    }

    init(status, board) {
        this.status = status;
        this.board = board;
    }

    /**
     * Обработчик события клика.
     * @param {number} row строка
     * @param {number} col колонка
     */
    cellClick(row, col) {
        // Если клик не нужно обрабатывать, уходим из функции.
        if (!this.isCorrectClick(row, col)) {
            return;
        }

        // Заполняем ячейку.
        this.board.fillCell(row, col);
        this.mapValues[row][col] = this.status.phase;
        // Если кто-то выиграл, заходим в if.
        if (this.hasWon()) {
            // Ставим статус в "остановлено".
            this.status.setStopped();
            // Сообщаем о победе пользователя.
            this.sayWonPhrase();
        }

        // Меняем фигуру (крестик или нолик).
        this.status.togglePhase();
    }

    /**
     * Проверка был ли корректный клик по ячейке с координатами row, col
     * @param {number} row Строка выбранной ячейки
     * @param {number} col Колонка выбранной ячейки
     * @returns {boolean} Вернет true в случае если статус игры "играем"е и ячейка куда был произведен клик свободна.
     */
    isCorrectClick(row, col) {
        return this.status.isPlaying() && this.isCellEmpty(row, col);
    }

    /**
     * Проверка что в ячейку не ставили значение (крестик или нолик).
     * @param {number} row Строка выбранной ячейки
     * @param {number} col Колонка выбранной ячейки
     * @returns {boolean} Вернет true, если ячейка пуста, иначе false.
     */
    isCellEmpty(row, col) {
        return this.mapValues[row][col] === '';
    }

    /**
     * Проверка есть ли выигрышная ситуация на карте.
     * @returns {boolean} Вернет true, если игра выиграна, иначе false.
     */
    hasWon() {

        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
                this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
                this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

                this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
                this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
                this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

                this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
                this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    }

    /**
     * Проверка есть ли выигрышная ситуация на линии.
     * @param {{x: int, y: int}} a 1-ая ячейка.
     * @param {{x: int, y: int}} b 2-ая ячейка.
     * @param {{x: int, y: int}} c 3-я ячейка.
     * @returns {boolean} Вернет true, если линия выиграна, иначе false.
     */
    isLineWon(a, b, c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    }

    /**
     * Сообщает о победе.
     */
    sayWonPhrase() {
        let figure = this.status.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    }
};