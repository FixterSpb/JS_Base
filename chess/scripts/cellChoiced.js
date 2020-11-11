'use strict';
/**
 * Объект хранит информацию о выбранной ячейке
 */

figureChoiced = {
    //координаты
    x: 0,
    y: 0,
    //клетка, в которой находится фигура
    cell: null,

    //фигура
    figure: null,

    //имя фигуры
    figureName: "",

    /**
     * Метод проверяет выбираемую клетку и заносит в структуру объекта
     * @param {node} cell Выбираемая клетка на доске
     * @returns {boolean} true, если клетка выбрана, если структура уже заполнена или в клетке нет фигуры - false
     */
    setCell(cell) {

        //Если фигура уже выбрана - возвращаем false
        if (cell === null) {
            return false;
        };

        //Если в клетке нет фигуры - возвращаем false
        if (cell.firstChild === null) {
            return false;            
        }else{
            this.cell = cell;
            this.figure = cell.firstChild;
            this.x = cell.dataset.x;
            this.y = cell.dataset.y;
        }

    }

}