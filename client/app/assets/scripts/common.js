(function() {
  var Game, go;

  Game = (function() {
    var elem, elemX, elemZero, winningArray;

    elem = true;

    elemZero = 0;

    elemX = 0;

    winningArray = [123, 456, 789, 147, 258, 369, 159, 357];

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

    Game.prototype.loadImage = function() {
      return console.log('11');
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
      var checker, i, num, x, xArr, xResult, zero, zeroArr, zeroResult, _i, _j, _len;
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
      checker = function(mainStr, checkStr) {
        return checkStr.split('').reduce(function(a, b) {
          return a.replace(b, '');
        }, mainStr).length === 0;
      };
      for (_j = 0, _len = winningArray.length; _j < _len; _j++) {
        num = winningArray[_j];
        num = num.toString();
        zeroArr = zeroArr.toString();
        xArr = xArr.toString();
        zeroResult = checker(num, zeroArr);
        xResult = checker(num, xArr);
        if (zeroResult === true) {
          alert("Нолик выиграл!");
          location.reload();
        }
        if (xResult === true) {
          alert("Крестик выиграл!");
          location.reload();
        }
      }
      if (elemZero + elemX === 9) {
        alert("Ничья!");
        return location.reload();
      }
    };

    return Game;

  })();

  go = new Game;

  $.fn.preload = function() {
    return this.each(function() {
      return $('<img/>')[0].src = this;
    });
  };

  $(['assets/images/X.png', 'assets/images/0.png']).preload();

}).call(this);
