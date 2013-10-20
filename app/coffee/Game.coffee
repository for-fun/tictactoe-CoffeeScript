class Game
    elemZero = 0
    elemX = 0
    gameWin = false
    cellAmount = 0

    winningArray = []

    constructor: (@cellNumber) ->
        winningArray = @getWinningNumbers(@cellNumber);
        cellAmount = cellNumber * cellNumber
        @addElement()
        @clickElement()

    addElement: () ->
        gameWindow = $('.window')
        cssWidth = @cellNumber * 100
        console.log cssWidth
        gameWindow.css({'width': cssWidth, 'height': cssWidth})
        for i in [1..cellAmount]
            gameWindow.append('<li class="item" data-id=' + i + '></li>')

    clickElement: () ->
        if (gameWin)
            return false
        gameWindowLi = $('.window .item')

        gameWindowLi.click ->
            $this = $(this)
            if ($this.hasClass('zero') == true || $this.hasClass('x') == true)
                return false
            $this.addClass('x')
            elemX++
            Game.prototype.checkWinning.call(this);
            Game.prototype.bot.call(this);

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

        for i in [0...cellAmount]
            if (li.eq(i).hasClass('zero'))
                zero = i + 1
                zeroArr.push(zero)
            if (li.eq(i).hasClass('x'))
                x = i + 1
                xArr.push(x)

        checkerNumber = (mainStr, checkStr) ->
            checkStr.split(',').forEach (item) ->
                mainStr = mainStr.replace(item + ',', '')
            return mainStr = mainStr.split(',').join('').length == 0

        checker = (num, arr, text) ->
            if (gameWin)
                return false
            num = num + ','
            result = checkerNumber(num, arr)
            if (result == true)
                alert text
                gameWin = true
                location.reload()

        for num in winningArray
            num = num.toString()
            zeroArr = zeroArr.toString()
            xArr = xArr.toString()

            checker(num, zeroArr, 'Вы проиграли :D')
            checker(num, xArr, 'Вы выиграли =)')

        if (gameWin)
            return false
        if (elemZero + elemX == cellAmount)
            alert "Ничья!"
            gameWin = true
            location.reload()

    bot: () ->
        if (gameWin)
            return false
        getRandomInt = (min, max) ->
            Math.floor(Math.random() * (max - min + 1)) + min

        gameWindowLi = $('.window .item')
        cell = getRandomInt(0, cellAmount - 1)
        console.log cell
        $this = gameWindowLi.eq(cell)
        if ($this.hasClass('zero') == true || $this.hasClass('x') == true)
            Game.prototype.bot.call(this)
            return false
        $this.addClass('zero')
        elemZero++
        Game.prototype.checkWinning.call(this);


go = new Game(4)

$.fn.preload = ->
    this.each(->
        $('<img/>')[0].src = this
    )
$(['assets/images/X.png', 'assets/images/0.png']).preload()