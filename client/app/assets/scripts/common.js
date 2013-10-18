(function() {
  var Game, go;

  Game = (function() {
    function Game() {
      this.addElement();
      this.clickElement();
    }

    Game.prototype.addElement = function() {
      var gameWindow, i, _i, _results;
      gameWindow = $('.window');
      _results = [];
      for (i = _i = 1; _i <= 9; i = ++_i) {
        gameWindow.append('<li class="item" data-id=' + i + '></li>');
        _results.push(console.log(i));
      }
      return _results;
    };

    Game.prototype.clickElement = function() {
      var gameWindowLi;
      gameWindowLi = $('.window .item');
      return gameWindowLi.click(function() {
        var $this;
        $this = $(this);
        $this.addClass('zero');
        return console.log(123);
      });
    };

    return Game;

  })();

  go = new Game;

}).call(this);
