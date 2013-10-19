class Game
    elem = false
    elemZero = 0
    elemX = 0
    gameWin = false

    winningArray = []

    constructor: (@cellNumber) ->
        winningArray = @getWinningNumbers(@cellNumber);
        console.log winningArray
        @addElement()
        @clickElement()

    addElement: () ->
        gameWindow = $('.window')

        for i in [1..9]
            gameWindow.append('<li class="item" data-id=' + i + '></li>')

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

    getWinningNumbers: (@number) ->
        blockNumber = @number
        blockNumberAll = blockNumber * blockNumber

        winArr = []
        horizontal = []
        vertical = []
        diagonalA = []
        diagonalB = []

        arr = []

        for i in [1..blockNumberAll]
            arr.push(i)
            if (i % blockNumber == 0)
                horizontal.push(arr)
                arr = []

        for i in [0...blockNumber]
            num = i
            for i in [0...horizontal.length]
                arr.push(horizontal[i][num])
            vertical.push(arr)
            arr = []

        number = blockNumber - 1
        for i in [0...blockNumber]
            diagonalA.push(horizontal[i][i])

        for i in [0...blockNumber]
            diagonalB.push(horizontal[i][number])
            number--

        for i in horizontal
            winArr.push(i.toString())

        for i in vertical
            winArr.push(i.toString())

        winArr.push(diagonalA.toString())
        winArr.push(diagonalB.toString())

        return winArr

    checkWinning: () ->
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


go = new Game(3)

$.fn.preload = ->
    this.each(->
        $('<img/>')[0].src = this
    )

$(['assets/images/X.png', 'assets/images/0.png']).preload()





