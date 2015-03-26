(function(){
  if(typeof window.LastDinosaur === 'undefined'){
    window.LastDinosaur = {};
  }

  var Dino = LastDinosaur.Dino = function (board) {
    this.board = board;
    this.alive = true;
    this.pos = [9,0];
    this.board.earth[9][0] = 2;
  };

  Dino.prototype.move = function (direction) {
    this.board.earth[this.pos[0]][this.pos[1]] = 0;
    if (direction === 'right' && this.pos[1] < LastDinosaur.Board.WIDTH - 1) {
      this.pos[1] += 1;
    } else if (direction === 'left' && this.pos[1] > 0) {
      this.pos[1] -= 1;
    }
    if (this.board.earth[this.pos[0]][this.pos[1]] === 3) {
      this.board.collision();
    } else {
      this.board.earth[this.pos[0]][this.pos[1]] = 2;
    }
  };

})();
