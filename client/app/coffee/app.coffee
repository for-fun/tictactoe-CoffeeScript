gameWindow = $('.window')

for i in [1..9]
    gameWindow.append('<li class="item" data-id=' + i + '></li>')
    console.log i

gameWindowLi = $('.window .item')

gameWindowLi.click ->
    $this = $(this)
    $this.addClass('zero')
    console.log 123