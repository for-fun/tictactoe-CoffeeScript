(function() {
  var Game, go;

  Game = (function() {
    var elem, elemX, elemZero, winningArray;

    elem = true;

    elemZero = 0;

    elemX = 0;

    winningArray = [123, 456, 789, 147, 258, 369, 159, 359];

    function Game() {
      this.addElement();
      this.clickElement();
    }

    Game.prototype.addElement = function() {
      var gameWindow, i, _i, _results;
      gameWindow = $('.window');
      _results = [];
      for (i = _i = 1; _i <= 9; i = ++_i) {
        _results.push(gameWindow.append('<li class="item" data-id=' + i + '></li>'));
      }
      return _results;
    };

    Game.prototype.clickElement = function() {
      var gameWindowLi;
      gameWindowLi = $('.window .item');
      return gameWindowLi.click(function() {
        var $this;
        $this = $(this);
        if ($this.hasClass('zero') === true || $this.hasClass('x') === true) {
          return false;
        }
        if (elem) {
          $this.addClass('zero');
          elemZero++;
          elem = false;
        } else {
          $this.addClass('x');
          elemX++;
          elem = true;
        }
        if (elemZero + elemX >= 5) {
          return Game.prototype.checkWinning.call(this);
        }
      });
    };

    Game.prototype.checkWinning = function(li) {
      var checker, elementsNumber, i, x, xArr, zero, zeroArr, _i;
      this.li = li;
      zeroArr = [];
      xArr = [];
      li = $('.window .item');
      for (i = _i = 0; _i <= 8; i = ++_i) {
        if (li.eq(i).hasClass('zero')) {
          zero = i + 1;
          zeroArr.push(zero);
        }
        if (li.eq(i).hasClass('x')) {
          x = i + 1;
          xArr.push(x);
        }
      }
      console.log('zero', zeroArr);
      console.log('x', xArr);
      elementsNumber = 0;
      checker = function(mainStr, checkStr) {
        mainStr = mainStr.split('');
        checkStr = checkStr.split('');
        return mainStr.split('').reduce(function(a, b) {
          return a.replace(RegExp(b), '');
        }, checkStr).length === 0;
      };
      return true;
    };

    return Game;

  })();

  go = new Game;

}).call(this);
