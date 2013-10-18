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
        359,
    ]

    constructor: () ->
        @addElement()
        @clickElement()

    addElement: () ->
        gameWindow = $('.window')

        for i in [1..9]
            gameWindow.append('<li class="item" data-id=' + i + '></li>')

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

        console.log 'zero', zeroArr
        console.log 'x', xArr


        elementsNumber = 0

        checker = (mainStr, checkStr) ->
            mainStr = mainStr.split('')
            checkStr = checkStr.split('')
            return mainStr.split('').reduce( (a, b) ->
                return a.replace(RegExp(b), '')
            , checkStr).length == 0

        return true

go = new Game
