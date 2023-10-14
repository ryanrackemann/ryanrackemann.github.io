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
            $('#start, .accents, .info-link').removeClass('hidden')
        },
        hide: function () {
            $('#start, .accents, .info-link').addClass('hidden')
        }
    },

    playScreen: {
        show: function () {
            $('#stats, #startOver').removeClass('hidden')
            $('header').addClass('playHeader')
        },
        hide: function () {
            $('#stats, #game, #mineField, #lose, #win, #newRecordWrapper, #startOver, .gameover-message').addClass('hidden')
            $('header').removeClass('playHeader')
        }
    },

    /**************************************************\
    |          Start and Play screen triggers          |
    \**************************************************/

    startGame: function () {
        this.startScreen.hide()
        this.playScreen.show()
        this.renderGameTemplate()
        mineField.init()
        mineField.drawField()
        highScores.displayStatBarRecord()
        timer.clear()
    },

    startOver: function () {
        this.derenderGameTemplate()
        timer.deactivateTimer()
        this.playScreen.hide()
        this.startScreen.show()
        mineField.clearField()
    },

    replay: function () {
        this.derenderGameTemplate()
        this.renderGameTemplate()
        mineField.clearField()
        timer.clear()
        this.clearGameResults()
        highScores.displayStatBarRecord()
        mineField.init()
        mineField.drawField()
    },

    clearGameResults: function () {
        $('#lose, #win, #newRecordWrapper, .gameover-message, .newRecordWrapper').addClass('hidden')
        $('#game, #mineField').removeClass('hidden')
    },

    derenderGameTemplate: function () {
        $('#game').remove()
    },

    renderGameTemplate: function () {
        var template = $('#gameTemplate').html()
        $('main').append(template)
        $('#game, #mineField').removeClass('hidden')
    },

    resetFlagToggle: function () {
        $('#flagToggle').attr('checked', false)
    }
}