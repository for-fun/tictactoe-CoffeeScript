(function() {
  var Game, go;

  Game = (function() {
    var cellAmount, elemX, elemZero, gameWin, winningArray;

    elemZero = 0;

    elemX = 0;

    gameWin = false;

    cellAmount = 0;

    winningArray = [];

    function Game(cellNumber) {
      this.cellNumber = cellNumber;
      winningArray = this.getWinningNumbers(this.cellNumber);
      console.log(winningArray);
      cellAmount = cellNumber * cellNumber;
      this.addElement();
      this.clickElement();
    }

    Game.prototype.addElement = function() {
      var cssWidth, gameWindow, i, _i, _results;
      gameWindow = $('.window');
      cssWidth = this.cellNumber * 100;
      gameWindow.css({
        'width': cssWidth,
        'height': cssWidth
      });
      _results = [];
      for (i = _i = 1; 1 <= cellAmount ? _i <= cellAmount : _i >= cellAmount; i = 1 <= cellAmount ? ++_i : --_i) {
        _results.push(gameWindow.append('<li class="item" data-id=' + i + '></li>'));
      }
      return _results;
    };

    Game.prototype.clickElement = function() {
      var gameWindowLi;
      if (gameWin) {
        return false;
      }
      gameWindowLi = $('.window .item');
      return gameWindowLi.click(function() {
        var $this;
        $this = $(this);
        if ($this.hasClass('zero') === true || $this.hasClass('x') === true) {
          return false;
        }
        console.log('юзер ходит');
        $this.addClass('x');
        elemX++;
        console.log('проверяем ход юзера');
        Game.prototype.checkWinning.call(this);
        return Game.prototype.bot.call(this);
      });
    };

    Game.prototype.getWinningNumbers = function(number) {
      var arr, blockNumber, blockNumberAll, diagonalA, diagonalB, horizontal, i, num, vertical, winArr, _i, _j, _k, _l, _len, _len1, _m, _n, _o, _ref;
      this.number = number;
      blockNumber = this.number;
      blockNumberAll = blockNumber * blockNumber;
      winArr = [];
      horizontal = [];
      vertical = [];
      diagonalA = [];
      diagonalB = [];
      arr = [];
      for (i = _i = 1; 1 <= blockNumberAll ? _i <= blockNumberAll : _i >= blockNumberAll; i = 1 <= blockNumberAll ? ++_i : --_i) {
        arr.push(i);
        if (i % blockNumber === 0) {
          horizontal.push(arr);
          arr = [];
        }
      }
      for (i = _j = 0; 0 <= blockNumber ? _j < blockNumber : _j > blockNumber; i = 0 <= blockNumber ? ++_j : --_j) {
        num = i;
        for (i = _k = 0, _ref = horizontal.length; 0 <= _ref ? _k < _ref : _k > _ref; i = 0 <= _ref ? ++_k : --_k) {
          arr.push(horizontal[i][num]);
        }
        vertical.push(arr);
        arr = [];
      }
      number = blockNumber - 1;
      for (i = _l = 0; 0 <= blockNumber ? _l < blockNumber : _l > blockNumber; i = 0 <= blockNumber ? ++_l : --_l) {
        diagonalA.push(horizontal[i][i]);
      }
      for (i = _m = 0; 0 <= blockNumber ? _m < blockNumber : _m > blockNumber; i = 0 <= blockNumber ? ++_m : --_m) {
        diagonalB.push(horizontal[i][number]);
        number--;
      }
      for (_n = 0, _len = horizontal.length; _n < _len; _n++) {
        i = horizontal[_n];
        winArr.push(i.toString());
      }
      for (_o = 0, _len1 = vertical.length; _o < _len1; _o++) {
        i = vertical[_o];
        winArr.push(i.toString());
      }
      winArr.push(diagonalA.toString());
      winArr.push(diagonalB.toString());
      return winArr;
    };

    Game.prototype.checkWinning = function() {
      var checker, checkerNumber, i, li, num, x, xArr, zero, zeroArr, _i, _j, _len;
      console.log('проверяем ...');
      zeroArr = [];
      xArr = [];
      li = $('.window .item');
      for (i = _i = 0; 0 <= cellAmount ? _i < cellAmount : _i > cellAmount; i = 0 <= cellAmount ? ++_i : --_i) {
        if (li.eq(i).hasClass('zero')) {
          zero = i + 1;
          zeroArr.push(zero);
        }
        if (li.eq(i).hasClass('x')) {
          x = i + 1;
          xArr.push(x);
        }
      }
      checkerNumber = function(mainStr, checkStr) {
        var result;
        console.log(mainStr, ' -- ', checkStr);
        checkStr.split(',').forEach(function(item) {
          return mainStr = mainStr.replace(item + ',', '');
        });
        result = mainStr.split(',').join('').length === 0;
        console.log(' = ', result);
        return result;
      };
      checker = function(num, arr, text) {
        var result;
        if (gameWin) {
          return false;
        }
        num = num + ',';
        result = checkerNumber(num, arr);
        if (result === true) {
          alert(text);
          gameWin = true;
          return location.reload();
        }
      };
      console.log('// ****************');
      console.log('СРАВНИВАЕМ ЧИСЛА');
      for (_j = 0, _len = winningArray.length; _j < _len; _j++) {
        num = winningArray[_j];
        num = num.toString();
        zeroArr = zeroArr.toString();
        xArr = xArr.toString();
        checker(num, zeroArr, 'Вы проиграли :D');
        checker(num, xArr, 'Вы выиграли =)');
      }
      console.log('**************** //');
      if (gameWin) {
        return false;
      }
      if (elemZero + elemX === cellAmount) {
        alert("Ничья!");
        gameWin = true;
        return location.reload();
      }
    };

    Game.prototype.bot = function() {
      var $this, cell, gameWindowLi, getRandomInt;
      console.log('ходит бот');
      if (gameWin) {
        return false;
      }
      getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      gameWindowLi = $('.window .item');
      cell = getRandomInt(0, cellAmount - 1);
      $this = gameWindowLi.eq(cell);
      if ($this.hasClass('zero') === true || $this.hasClass('x') === true) {
        Game.prototype.bot.call(this);
        return false;
      }
      $this.addClass('zero');
      elemZero++;
      console.log('проверяем ход бота');
      console.log('--------------------------');
      return Game.prototype.checkWinning.call(this);
    };

    return Game;

  })();

  go = new Game(4);

  $.fn.preload = function() {
    return this.each(function() {
      return $('<img/>')[0].src = this;
    });
  };

  $(['assets/images/X.png', 'assets/images/0.png']).preload();

}).call(this);
