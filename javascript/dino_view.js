(function(){
  if(typeof window.LastDinosaur === "undefined"){
    window.LastDinosaur = {};
  }

  var View = LastDinosaur = function ($el) {
    this.$el = $el;

    this.board = new LastDinosaur.Board();

  };





})();
