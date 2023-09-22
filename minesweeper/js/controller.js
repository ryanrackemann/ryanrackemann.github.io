/********************************************************\
|    Game listeners, view events, and css alterations    |
\********************************************************/
$(function () {

    // Difficulty selection for select box
    $('#difficulty').on('change', function () {
        difficulty.setDifficulty()
    })

    // close lessons learned section
    $('.open-info').on('click', function () {
        $('.info').removeClass('invisible')
    })

    // close lessons learned section
    $('.close-info').on('click', function () {
        $('.info').addClass('invisible')
    })

    // Start game button event
    $('#play').on('click', function () {
        shell.startGame()
    })

    // dig patch
    $('#mineField').on('mousedown', '.patch', function (event) { mineField.dig(event, parseInt($(this).attr('data-row')), parseInt($(this).attr('data-col'))) })
    $('#mineField').on('taphold', '.patch', function (event) { mineField.dig(event, parseInt($(this).attr('data-row')), parseInt($(this).attr('data-col'))) })

    // prevent right click menu on minefield
    $('#mineField').on('contextmenu', function (event) { event.preventDefault() })

    // mine explosion animation clear
    $('#mineField').on('animationend', function() {
        $('#mineField').removeClass('explosion')
    })

    // go back to home screen
    $('#startOver').on('click', function () { shell.startOver() })

    // replay game with the same difficulty
    $('.replay').on('click', function () { shell.replay() })

    // pause game
    $('.pause').on('click', function () {
        mineField.lockControls()
        timer.pause()
    })

    // resume game
    $('.resume').on('click', function () {
        mineField.unlockControls()
        timer.resume()
    })

    // Toggle theme
    $('.theme-toggle').on('change', function () {
        themes.switchTheme()
    })

    // Accent change
    $('.accent').on('click', function () {
        $('.accent').removeClass('selected')
        $(this).addClass('selected')
        themes.changeAccentValue($(this).attr('data-accent'))
    })

    // initialize object literals
    themes.init()
    difficulty.init()
    highScores.init()
    shell.init()
});