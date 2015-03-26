(function(){
  if(typeof window.LastDinosaur === "undefined"){
    window.LastDinosaur = {};
  }

  var BOARD_WIDTH = 20;
  var BOARD_HEIGHT = 10;

  var Dino = LastDinosaur.Dino = function (board) {
    this.board = board;
    this.alive = true;
    this.pos = [9,0];
    this.board.earth[9][0] = 2;
  };

  Dino.prototype.move = function (direction) {
    this.board.earth[this.pos[0]][this.pos[1]] = 0;
    if (direction === 'right' && this.pos[1] < 19) {
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

  var Meteor = LastDinosaur.Meteor = function (board, smart) {
    this.board = board;
    if (smart) {
      var posX = this.board.dino.pos[1];
    } else {
      var posX =  Math.floor(Math.random() * 20);
    }

    this.pos = [0, posX];
  };

  Meteor.prototype.fall = function (type) {
    this.board.earth[this.pos[0]][this.pos[1]] = 0;
    this.pos[0] += 1;

    if (this.pos[0] >= BOARD_HEIGHT) {
      this.clearLanding(type);
      this.board.generateMeteor();
    } else {
      if (this.checkCollision(type)) { this.board.collision(); }

      if (this.pos[0] === BOARD_HEIGHT - 1) { this.explode(type); }
      this.renderMove();
    }
  };

  Meteor.prototype.fall3 = function () {
    this.board.earth[this.pos[0]][this.pos[1]] = 0;
    this.pos[0] += 1;
    var type = 'big';

    if (this.pos[0] >= BOARD_HEIGHT) {
      this.clearLanding(type);
      this.board.generateMeteor();
    } else {
      if (this.checkCollision(type)) { this.board.collision(); }

      if (this.pos[0] === BOARD_HEIGHT - 1) { this.explode(type); }
      this.renderMove();
    }
  };

  Meteor.prototype.checkCollision = function (type) {
    if (this.board.earth[this.pos[0]][this.pos[1]] === 2){
      return true;
    } else if (type === 'medium' &&
        (this.board.earth[this.pos[0]][this.pos[1] + 1] ||
         this.board.earth[this.pos[0]][this.pos[1] - 1]) === 2) {
      return true;
    } else if (type === 'big' &&
        (this.board.earth[this.pos[0]][this.pos[1] + 2] ||
         this.board.earth[this.pos[0]][this.pos[1] - 2]) === 2) {
      return true;
    }
    return false;
  };

  Meteor.prototype.renderMove = function () {
    this.board.earth[this.pos[0]][this.pos[1]] = 3;
  };

  Meteor.prototype.explode = function (type) {

    if (type === 'medium' || type === 'big') {
      this.board.earth[this.pos[0]][this.pos[1] + 1] = 3;
      this.board.earth[this.pos[0]][this.pos[1] - 1] = 3;
    }
    if (type === 'big') {
      this.board.earth[this.pos[0]][this.pos[1] + 2] = 3;
      this.board.earth[this.pos[0]][this.pos[1] - 2] = 3;
      this.board.earth[this.pos[0] - 1][this.pos[1] + 1] = 3;
      this.board.earth[this.pos[0] - 1][this.pos[1] - 1] = 3;
      this.board.earth[this.pos[0] - 1][this.pos[1]] = 3;
    }

  };

  Meteor.prototype.clearLanding = function (type) {

    if (type === 'medium' || type === 'big') {
      this.board.earth[this.pos[0] - 1][this.pos[1] + 1] = 0;
      this.board.earth[this.pos[0] - 1][this.pos[1] - 1] = 0;
    }
    if (type === 'big') {
      this.board.earth[this.pos[0] - 1][this.pos[1] + 2] = 0;
      this.board.earth[this.pos[0] - 1][this.pos[1] - 2] = 0;
      this.board.earth[this.pos[0] - 1][this.pos[1]] = 0;
      this.board.earth[this.pos[0] - 2][this.pos[1] + 1] = 0;
      this.board.earth[this.pos[0] - 2][this.pos[1] - 1] = 0;
      this.board.earth[this.pos[0] - 2][this.pos[1]] = 0;
    }

  };

  var Board = LastDinosaur.Board = function () {
    this.counter = 1;
    this.smartMeteor = true;
    this.earth = Board.freshEarth();
    this.dino = new LastDinosaur.Dino(this);
    this.generateMeteor();
  };

  Board.freshEarth = function () {
    var earth = [];

    for (var i = 0; i < BOARD_HEIGHT; i++) {
      earth.push([]);
      for (var j = 0; j < BOARD_WIDTH; j++) {
        earth[i].push(0);
      }
    }

    return earth;
  };

  Board.prototype.collision = function () {
    this.dino.alive = false;
  };

  Board.prototype.generateMeteor = function () {
    if (this.smartMeteor) {
      this.meteor = new Meteor(this, true);
      this.smartMeteor = false;
    } else {
      this.meteor = new Meteor(this, false);
      this.smartMeteor = true;
    }
  };

})();
