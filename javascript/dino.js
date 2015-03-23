(function(){
  if(typeof window.LastDinosaur === "undefined"){
    window.LastDinosaur = {};
  }

  var BOARD_WIDTH = 30;
  var BOARD_HEIGHT = 10

  var Board = LastDinosaur.Board = function () {
    this.board = [];
    this.dino = new Dino();

    for (var i = 0; i < BOARD_HEIGHT; i++) {
      this.board.push([]);
      for (var j = 0; j < BOARD_WIDTH; j++) {
        this.board[i].push(0);
      }
    }
  };

  Board.prototype.render = function () {


  };

})();
