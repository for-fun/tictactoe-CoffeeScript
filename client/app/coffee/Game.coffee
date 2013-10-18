class Game

    constructor: () ->
        @addElement()
        @clickElement()

    addElement: () ->
        gameWindow = $('.window')

        for i in [1..9]
            gameWindow.append('<li class="item" data-id=' + i + '></li>')
            console.log i

    clickElement: () ->
        gameWindowLi = $('.window .item')
        gameWindowLi.click ->
            $this = $(this)
            $this.addClass('zero')
            console.log 123

go = new Game
