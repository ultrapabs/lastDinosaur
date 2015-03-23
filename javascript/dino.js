(function(){
  if(typeof window.LastDinosaur === "undefined"){
    window.LastDinosaur = {};
  }

  var BOARD_WIDTH = 20;
  var BOARD_HEIGHT = 10;

  var Dino = LastDinosaur.Dino = function (board) {

  };

  var Board = LastDinosaur.Board = function () {
    this.earth = Board.freshEarth();
    this.dino = new LastDinosaur.Dino(this);
  };

  Board.freshEarth = function () {
    var earth = [];

    for (var i = 0; i < BOARD_HEIGHT; i++) {
      earth.push([]);
      for (var j = 0; j < BOARD_WIDTH; j++) {
        if (i > BOARD_HEIGHT - 3) {
          earth[i].push(1);
        } else {
          earth[i].push(0);
        }
      }
    }

    return earth;
  };

  Board.prototype.render = function () {
    var earth = freshEarth();
  };

})();
