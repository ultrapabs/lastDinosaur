(function(){
  if(typeof window.LastDinosaur === "undefined"){
    window.LastDinosaur = {};
  }

  var View = LastDinosaur.View = function ($el) {
    this.$el = $el;
    this.bestScore = 0;
    this.resetGame();

    $(window).on("keydown", this.moveDino.bind(this));
    $(window).on("keydown", this.userRestart.bind(this));
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

    for (var i = 1; i < board.earth.length; i++) {
      html += '<ul class="board group">';
      for (var j = 0; j < board.earth[0].length; j++) {
        if (board.earth[i][j] === 2) {
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

  View.prototype.updateScore = function (score) {
    if (score >= this.bestScore) { this.bestScore = score; }

    $(".score").html('<li class="current">Current Score: ' + score + '</li>');
    $(".score").append('<li class="best">Best Score: ' + this.bestScore + '</li>');
  };

  View.prototype.resetGame = function () {
    this.board = new LastDinosaur.Board();
    this.renderEarth(this.board);
    this.intervalId = window.setInterval(this.step.bind(this), 100);
  };

  View.prototype.gameOver = function () {
    window.clearInterval(this.intervalId);
    var html = '<ul class="game-over">';
    html += ('<li>' + this.endMessage() + '</li>');
    html += '<li>Press P to play again.</li>';
    html += '</ul>';
    this.$el.html(html);

    this.intervalId = window.setInterval(function(){}, 100);
  };

  View.prototype.userRestart = function (event) {
    if (event.keyCode === 80 && !this.board.dino.alive) {
      window.clearInterval(this.intervalId);
      this.resetGame();
    }
  };

  View.prototype.endMessage = function () {
    if (this.board.counter < 600) {
      return 'Try harder.';
    } else if (this.board.counter < 900) {
      return 'You must improve!';
    } else if (this.board.counter < 1500) {
      return 'This is why there are no more dinosaurs.'
    } else if (this.board.counter < 2100) {
      return "Littlefoot's mom still did better than you.";
    } else {
      return 'Paleontologists will sing of your endeavors. Rejoice!';
    }
  };

  View.prototype.step = function () {

    if (!this.board.dino.alive) {
      this.gameOver();
    } else {
      if (this.board.counter >= 1200) {
        this.board.meteor.fall3();
      } else if (this.board.counter >= 900 && this.board.counter % 2 === 0) {
        this.board.meteor.fall2();
      } else if (this.board.counter >= 600 && this.board.counter < 900 && this.board.counter % 3 === 0) {
        this.board.meteor.fall2();
      } else if (this.board.counter >= 300 && this.board.counter < 600 && this.board.counter % 4 === 0) {
        this.board.meteor.fall();
      } else if (this.board.counter < 300 && this.board.counter % 5 === 0) {
        this.board.meteor.fall();
      }

      this.board.counter++;
      this.updateScore(this.board.counter);
      this.renderEarth(this.board);
    }
  };

})();
