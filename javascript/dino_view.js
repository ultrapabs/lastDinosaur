(function(){
  if(typeof window.LastDinosaur === "undefined"){
    window.LastDinosaur = {};
  }

  var View = LastDinosaur.View = function ($el) {
    this.$el = $el;

    this.board = new LastDinosaur.Board();
    this.renderEarth(this.board);

    this.intervalId = window.setInterval(this.step.bind(this), 100);

    $(window).on("keydown", this.moveDino.bind(this));
  };

  View.prototype.moveDino = function (event) {
    if (event.keyCode === 37) {
      this.board.dino.move('left');
    } else if (event.keyCode === 39) {
      this.board.dino.move('right');
    }
  };

  View.prototype.renderEarth = function (board) {
    var html = '';

    for (var i = 0; i < board.earth.length; i++) {
      html += '<ul class="group">';
      for (var j = 0; j < board.earth[0].length; j++) {
        if (board.earth[i][j] === 1) {
          html += '<li class="earth"></li>';
        } else if (board.earth[i][j] === 2) {
          html += '<li class="dino"></li>';
        } else if (board.earth[i][j] === 3){
            html += '<li class="meteor"></li>';
        } else {
          html += '<li></li>';
        }
      }
      html += '</ul>';
    }
    this.$el.html(html);
  };

  View.prototype.step = function () {
    if (this.board.counter >= 1200) {
      this.board.meteor.fall();
    } else if (this.board.counter >= 900 && this.board.counter % 2 === 0) {
      this.board.meteor.fall();
    } else if (this.board.counter >= 600 && this.board.counter < 900 && this.board.counter % 3 === 0) {
      this.board.meteor.fall();
    } else if (this.board.counter >= 300 && this.board.counter < 600 && this.board.counter % 4 === 0) {
      this.board.meteor.fall();
    } else if (this.board.counter < 300 && this.board.counter % 5 === 0) {
      this.board.meteor.fall();
    }
    console.log(this.board.counter);
    this.board.counter++;
    this.renderEarth(this.board);
  };

})();
