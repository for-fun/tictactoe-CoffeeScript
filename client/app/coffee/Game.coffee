class Game
    elem = false
    elemZero = 0
    elemX = 0
    gameWin = false

    winningArray = [
        # по горизонтали
        123,
        456,
        789,
        # по вертикали
        147,
        258,
        369,
        # по диагонали
        159,
        357,
    ]

    constructor: () ->
        @addElement()
        @clickElement()

    addElement: () ->
        gameWindow = $('.window')

        for i in [1..9]
            gameWindow.append('<li class="item" data-id=' + i + '></li>')

    loadImage: () ->
        console.log '11'

    clickElement: () ->
        if (gameWin)
            return false
        gameWindowLi = $('.window .item')
        gameWindowLi.click ->
            $this = $(this)
            if ($this.hasClass('zero') == true || $this.hasClass('x') == true)
                return false
            if (elem)
                $this.addClass('zero')
                elemZero++
                elem = false
            else
                $this.addClass('x')
                elemX++
                elem = true
            if (elemZero + elemX >= 5)
                Game.prototype.checkWinning.call(this);

    checkWinning: (@li) ->

        zeroArr = []
        xArr = []
        li = $('.window .item')

        for i in [0..8]
            if (li.eq(i).hasClass('zero'))
                zero = i + 1
                zeroArr.push(zero)
            if (li.eq(i).hasClass('x'))
                x = i + 1
                xArr.push(x)

        checkerNumber = (mainStr, checkStr) ->
            return checkStr.split('').reduce((a, b) ->
                return a.replace(b, '');
            , mainStr).length == 0

        checker = (num, arr, text) ->
            if (gameWin)
                return false
            result = checkerNumber(num, arr)
            if (result == true)
                alert text
                gameWin = true
                location.reload()

        for num in winningArray
            num = num.toString()
            zeroArr = zeroArr.toString()
            xArr = xArr.toString()

            checker(num, zeroArr, 'Нолик выиграл!!')
            checker(num, xArr, 'Крестик выиграл!!')

        if (gameWin)
            return false
        if (elemZero + elemX == 9)
            alert "Ничья!"
            location.reload()


go = new Game

$.fn.preload = ->
    this.each(->
        $('<img/>')[0].src = this
    )

$(['assets/images/X.png', 'assets/images/0.png']).preload()
