'use strict';

window.addEventListener('load', () => {

    const status = new Status();
    const board = new Board();
    const game = new Game();

    board.init(status, game);
    game.init(status, board);
    //game

});