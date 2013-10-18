class Game
    elem = true
    elemZero = 0
    elemX = 0

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

        checker = (mainStr, checkStr) ->
            return checkStr.split('').reduce((a, b) ->
                return a.replace(b, '');
            , mainStr).length == 0

        for num in winningArray
            num = num.toString()
            zeroArr = zeroArr.toString()
            xArr = xArr.toString()

            zeroResult = checker(num, zeroArr)
            xResult = checker(num, xArr)

            if (zeroResult == true)
                alert "Нолик выиграл!"
                location.reload()
            if (xResult == true)
                alert "Крестик выиграл!"
                location.reload()

        if (elemZero + elemX == 9)
            alert "Ничья!"
            location.reload()


go = new Game

$.fn.preload = ->
    this.each(->
        $('<img/>')[0].src = this
    )

$(['assets/images/X.png', 'assets/images/0.png']).preload()
