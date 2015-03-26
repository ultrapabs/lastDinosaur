(function(){
  if(typeof window.LastDinosaur === 'undefined'){
    window.LastDinosaur = {};
  }

  var Board = LastDinosaur.Board = function () {
    this.counter = 1;
    this.smartMeteor = true;
    this.earth = Board.freshEarth();
    this.dino = new LastDinosaur.Dino(this);
    this.generateMeteor();
  };

  Board.WIDTH = 20;
  Board.HEIGHT = 10;

  Board.freshEarth = function () {
    var earth = [];

    for (var i = 0; i < Board.HEIGHT; i++) {
      earth.push([]);
      for (var j = 0; j < Board.WIDTH; j++) {
        earth[i].push(0);
      }
    }

    return earth;
  };


  Board.prototype.collision = function () {
    this.dino.alive = false;
  };

  Board.prototype.generateMeteor = function (type) {
    if (this.smartMeteor) {
      this.meteor = new LastDinosaur.Meteor(this, true, type);
      this.smartMeteor = false;
    } else {
      this.meteor = new LastDinosaur.Meteor(this, false, type);
      this.smartMeteor = true;
    }
  };

  Board.prototype.timeToFall = function () {
    return ((this.counter < 150 && this.counter % 5 === 0) ||
    (this.counter >= 150 && this.counter < 300 && this.counter % 4 === 0) ||
    (this.counter >= 300 && this.counter < 450 && this.counter % 3 === 0) ||
    (this.counter >= 450 && this.counter % 2 === 0) ||
    (this.counter >= 600));
  }

  Board.prototype.step = function () {
    if (this.meteor.done) {
      var type = 'small';
      if (this.counter > 600) {
        type = 'big';
      } else if (this.counter > 300) {
        type = 'medium';
      }
      this.generateMeteor(type);
    }
    if (this.timeToFall()) {
      this.meteor.fall();
    }

    this.counter++;
  }

})();
