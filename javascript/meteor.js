(function(){
  if(typeof window.LastDinosaur === 'undefined'){
    window.LastDinosaur = {};
  }

  var Meteor = LastDinosaur.Meteor = function (board, smart, type) {
    this.board = board;
    this.type = type;

    if (smart) {
      var posX = this.board.dino.pos[1];
    } else {
      var posX =  Math.floor(Math.random() * 20);
    }

    this.pos = [0, posX];
    this.done = false;
  };

  Meteor.prototype.fall = function (type) {
    this.board.earth[this.pos[0]][this.pos[1]] = 0;
    this.pos[0] += 1;

    if (this.pos[0] >= LastDinosaur.Board.HEIGHT) {
      this.clearLanding();
      this.done = true;
    } else {
      if (this.checkCollision()) { this.board.collision(); }
      if (this.pos[0] === LastDinosaur.Board.HEIGHT - 1) { this.explode(type); }
      this.renderMove();
    }
  };

  Meteor.prototype.checkCollision = function () {
    if (this.board.earth[this.pos[0]][this.pos[1]] === 2){
      return true;
    } else if (((this.type === 'medium') ||
                (this.type === 'big')) &&
                (this.board.earth[this.pos[0]][this.pos[1] + 1] ||
                 this.board.earth[this.pos[0]][this.pos[1] - 1]) === 2) {
      return true;
    } else if ((this.type === 'big' &&
        (this.board.earth[this.pos[0]][this.pos[1] + 2] ||
         this.board.earth[this.pos[0]][this.pos[1] - 2]) === 2)) {
      return true;
    }
    return false;
  };

  Meteor.prototype.renderMove = function () {
    this.board.earth[this.pos[0]][this.pos[1]] = 3;
  };

  Meteor.prototype.explode = function () {
    if (this.type === 'medium' || this.type === 'big') {
      this.board.earth[this.pos[0]][this.pos[1] + 1] = 3;
      this.board.earth[this.pos[0]][this.pos[1] - 1] = 3;
    }
    if (this.type === 'big') {
      this.board.earth[this.pos[0]][this.pos[1] + 2] = 3;
      this.board.earth[this.pos[0]][this.pos[1] - 2] = 3;
      this.board.earth[this.pos[0] - 1][this.pos[1] + 1] = 3;
      this.board.earth[this.pos[0] - 1][this.pos[1] - 1] = 3;
      this.board.earth[this.pos[0] - 1][this.pos[1]] = 3;
    }

  };

  Meteor.prototype.clearLanding = function () {
    if (this.type === 'medium' || this.type === 'big') {
      this.board.earth[this.pos[0] - 1][this.pos[1] + 1] = 0;
      this.board.earth[this.pos[0] - 1][this.pos[1] - 1] = 0;
    }
    if (this.type === 'big') {
      this.board.earth[this.pos[0] - 1][this.pos[1] + 2] = 0;
      this.board.earth[this.pos[0] - 1][this.pos[1] - 2] = 0;
      this.board.earth[this.pos[0] - 1][this.pos[1]] = 0;
      this.board.earth[this.pos[0] - 2][this.pos[1] + 1] = 0;
      this.board.earth[this.pos[0] - 2][this.pos[1] - 1] = 0;
      this.board.earth[this.pos[0] - 2][this.pos[1]] = 0;
    }

  };

})();
