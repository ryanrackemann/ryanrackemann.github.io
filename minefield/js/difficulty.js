/**************************************************\
|    Manages setting and retrieving difficulty     |
|     from the browser storage and between         |
|     the javascript and front end                 |
\**************************************************/
var difficulty = {
    // Key for storing the selected difficulty in the browser storage
    storageKey: 'selectedDifficulty',
    gridSizeStorageKey: 'customGridSize',

    // Constant definitions for consistent access by other objects
    difficulties: {
        easy: 'easy',
        medium: 'medium',
        hard: 'hard'
    },

    // Initialize the difficulty by pulling from storage. Otherwise, default to easy
    init: function () {
        if (localStorage.getItem(this.storageKey) != null) {
            $('#difficulty').val(localStorage.getItem(this.storageKey))
        }
        else {
            $('#difficulty').val('easy')
        }

        if (localStorage.getItem(this.gridSizeStorageKey) != null) {
            $('#gridSize').val(localStorage.getItem(this.gridSizeStorageKey))
        }
        else {
            $('#gridSize').val(10)
        }
    },

    // Pull and return the difficulty chosen in the select field
    getDifficulty: function () {
        return $('#difficulty').val()
    },

    // Sets the selected difficulty in local storage
    setDifficulty: function () {
        localStorage.setItem(this.storageKey, $('#difficulty').val())
    },

    // Sets the custom grid size in local storage
    setCustomGridSize: function () {
        localStorage.setItem(this.gridSizeStorageKey, $('#gridSize').val())
    }
}
