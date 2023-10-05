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
        $('.info').removeClass('hidden')
    })

    // close lessons learned section
    $('.close-info').on('click', function () {
        $('.info').addClass('hidden')
    })

    // Start game button event
    $('#play').on('click', function () {
        shell.startGame()
    })

    // dig patch
    $('main').on('mousedown', '#mineField .patch', function (event) { mineField.dig(event, parseInt($(this).attr('data-row')), parseInt($(this).attr('data-col'))) })
    $('main').on('taphold', '#mineField .patch', function (event) { mineField.dig(event, parseInt($(this).attr('data-row')), parseInt($(this).attr('data-col'))) })

    // prevent right click menu on minefield
    $('main').on('contextmenu', '#mineField', function (event) { event.preventDefault() })

    // mine explosion animation clear
    $('main').on('animationend', '#mineField', function() {
        $('#mineField').removeClass('explosion')
    })

    // go back to home screen
    $('#startOver').on('click', function () { shell.startOver() })

    // replay game with the same difficulty
    $('body').on('click', '.replay', function () { shell.replay() })

    // pause game
    $('body').on('click', '.pause', function () {
        mineField.lockControls()
        timer.pause()
    })

    // resume game
    $('body').on('click', '.resume', function () {
        mineField.unlockControls()
        timer.resume()
    })

    // Toggle theme
    $('.theme-wrapper').on('change', function () {
        themes.switchTheme()
    })

    // Toggle flag override
    $('.flag-toggle-wrapper').on('change', function () {
        mineField.toggleFlagOnlyMode()
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