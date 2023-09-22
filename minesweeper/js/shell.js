/**************************************************\
|  Manages the state of the user in the shell      |
|   for transitions between start and play screens |
\**************************************************/
const shell = {

    // Start the shell state on the start screen with the play screen hidden
    init: function () {
        this.startScreen.show()
        this.playScreen.hide()
    },

    /**************************************************\
    |          Start and Play screen handlers          |
    \**************************************************/

    startScreen: {
        show: function () {
            $('#start, .accents, .info-link').removeClass('invisible')
        },
        hide: function () {
            $('#start, .accents, .info-link').addClass('invisible')
        }
    },

    playScreen: {
        show: function () {
            $('#stats, #game, #mineField, .flag-toggle-wrapper').removeClass('invisible')
            $('header').addClass('playHeader')
        },
        hide: function () {
            $('#stats, #game, #mineField, #lose, #win, #newHighScore, #startOver, .flag-toggle-wrapper, .gameover-message').addClass('invisible')
            $('header').removeClass('playHeader')
        }
    },

    /**************************************************\
    |          Start and Play screen triggers          |
    \**************************************************/

    startGame: function () {
        mineField.init()
        mineField.drawField()
        highScores.displayStatBarRecord()
        timer.clear()
        this.startScreen.hide()
        this.playScreen.show()
    },

    startOver: function () {
        timer.deactivateTimer()
        this.playScreen.hide()
        this.startScreen.show()
        mineField.clearField()
    },

    replay: function () {
        mineField.clearField()
        timer.clear()
        this.clearGameResults()
        highScores.displayStatBarRecord()
        mineField.init()
        mineField.drawField()
    },

    clearGameResults: function () {
        $('#lose, #win, #newHighScore, #startOver, .gameover-message, .newRecordWrapper').addClass('invisible')
    }
}