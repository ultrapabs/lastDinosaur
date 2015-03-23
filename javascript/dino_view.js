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
      console.log("left!");
    } else if (event.keyCode === 39) {
      console.log("right!");
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
        } else {
          html += '<li></li>';
        }
      }
      html += '</ul>';
    }
    this.$el.html(html);
  };

  View.prototype.step = function () {

  };

})();
