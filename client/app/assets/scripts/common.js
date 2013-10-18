(function() {
  var gameWindow, gameWindowLi, i, _i;

  gameWindow = $('.window');

  for (i = _i = 1; _i <= 9; i = ++_i) {
    gameWindow.append('<li class="item" data-id=' + i + '></li>');
    console.log(i);
  }

  gameWindowLi = $('.window .item');

  gameWindowLi.click(function() {
    var $this;
    $this = $(this);
    $this.addClass('zero');
    return console.log(123);
  });

}).call(this);
