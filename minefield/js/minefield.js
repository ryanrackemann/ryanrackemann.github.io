/**************************************************\
|    Handles all interactions with the minefield   |
|     including the Minefield game creation,     |
|     destruction for new games,                   |
|     game events like digging and flagging,       |
|     and keeps track of all game states           |
\**************************************************/
var mineField = {

  /************************************\
  |    Game initialization and setup   |
  \************************************/

  // Constant definitions for consistent access by other objects to check against this.surveyStatus[]
  surveyStatuses: {
    flag: 'flag',
    diggable: 'diggable',
    dug: 'dug'
  },

  // Constant definitions for consistent access by other objects to check against this.underground[]
  markers: {
    flag: '<i class="fa-solid fa-flag fa-fade"></i>',
    mine:  '<i class="fa-solid fa-land-mine-on fa-bounce"></i>',
    explosion:  '<i class="fa-solid fa-explosion fa-beat-fade"></i>'
  },

  // Initialize all game settings in preparation for the first dig
  init: function () {
    // underground list for whether the patch is a 💣 or #
    this.underground = []
    // surveyStatus list to keep track of flags and dug patches
    this.surveyStatus = []
    // settings will contain: the number of rows, columns, 💣, and 🚩
    this.settings = {}
    this.setSettings()
  },

  // Initialize settings based on difficulty
  setSettings: function () {
    switch (difficulty.getDifficulty()) {
      case difficulty.difficulties.easy:
        this.settings = {
          rows: 8,
          cols: 10,
          mines: 10,
          flags: 10
        }
        break
      case difficulty.difficulties.medium:
          this.settings = {
          rows: 13,
          cols: 16,
          mines: 40,
          flags: 40
        }
        break
      case difficulty.difficulties.hard:
          this.settings = {
          rows: 16,
          cols: 30,
          mines: 99,
          flags: 99
        }
        break
    }

    // Set remaining flags tracker to the set number of flags for the current difficulty
    $('#remainingFlags').text(this.settings.flags)

    // Set unique game guid
    if (this.currentGameId > 0) {
      this.currentGameId++
    } else {
      this.currentGameId = 1
    }

    $('#game').attr('data-game-id', this.currentGameId)

    // Responsiveness improvement to match the larger of col/row to the larger of width/height of the screen
    if ($(document).height() > $(document).width()) {
      if (this.settings.cols > this.settings.rows) {
        let newCols = this.settings.rows
        this.settings.rows = this.settings.cols
        this.settings.cols = newCols
      }
    }
    
    this.offsetSize = $('header').height()

    // Multiplier to impact the size of the mineField
    this.gameSizeRatio = 0.9
    this.gameSizeMax = 1200
    // Represents win/loss
    this.loser = false
    // Tells whether the board has been initialized and the state of the game
    this.fieldDrawn = false
    // Marks whether or not high scores/wins should be recorded
    this.trackRecords = true
    // Represents whether or not the next click is the first dig
    this.firstDig = true
    // A count of how many patches have been dug to assist in determining win condition
    this.digCount = 0
    // State tracker for explosion animation on game loss
    this.lit = false
    // Represents the locked/unlocked status of the game board for pause/unpause
    this.locked = false
    // Flagging only toggle
    this.disableFlagOnlyMode()
    // Hide flagging
    this.hideFlagging()

    // Index modifications to access neighbors of a given patch
    this.neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ]
  },

  // set all 💣 on the minefield game board and set 💣 neighbors accordingly
  plantMines: function (firstDigRow, firstDigCol) {
    // set all field points to nothing
    for (let row = 0; row < this.settings.rows; row++) {
        this.underground[row] = []
        this.surveyStatus[row] = []
        for (let col = 0; col < this.settings.cols; col++) {
            this.underground[row][col] = 0
            this.surveyStatus[row][col] = this.surveyStatuses.diggable
        }
    }

    var mines = this.settings.mines

    // plant 💣
    while (mines > 0) {
        // Get random row and column position
        newMineRow = Math.floor(Math.random() * this.settings.rows)
        newMineCol = Math.floor(Math.random() * this.settings.cols)

        // Add a 💣 if there is currently no 💣
        if (this.underground[newMineRow][newMineCol] != this.markers.mine && !this.inMineVicinity(newMineRow, newMineCol, firstDigRow, firstDigCol)) {
            this.underground[newMineRow][newMineCol] = this.markers.mine
            this.surveyStatus[newMineRow][newMineCol] = this.surveyStatuses.diggable
            this.incrementNeighbors(newMineRow, newMineCol)
            mines--
        }
    }
  },

  // increment all non-💣 neighbors when a 💣 is placed
  incrementNeighbors: function (row, col) {
      for (let [neighborRowOffset, neighborColOffset] of this.neighbors) {
          currNeighborRow = row + neighborRowOffset
          currNeighborCol = col + neighborColOffset
          if (this.onMineField(currNeighborRow, currNeighborCol) && Number.isInteger(this.underground[currNeighborRow][currNeighborCol])) {
              this.underground[currNeighborRow][currNeighborCol]++
          }
      }
  },

  // Draw the mineField for the front end
  drawField: function () {
      // Generate HTML elements for the field
      for (let row = 0; row < this.settings.rows; row++) {
        // Create the new patch to be dug
        const rowDiv = $('<div>').addClass('row')
        for (let col = 0; col < this.settings.cols; col++) {
          const cellDiv = $('<div>')
            .attr('id', row + '_' + col)
            .addClass('patch diggable hover')
          cellDiv.attr('data-row', row)
          cellDiv.attr('data-col', col)

          // Calculate patch sizes
          var squareSize

          var maxSquareHeight = Math.floor(
            (($(document).height() - this.offsetSize) * this.gameSizeRatio) / this.settings.rows
          )

          var maxSquareWidth = Math.floor(
            ($(document).width() * this.gameSizeRatio) / this.settings.cols
          )

          squareSize = maxSquareWidth > maxSquareHeight ? maxSquareHeight : maxSquareWidth
          cellDiv.width(squareSize)
          cellDiv.height(squareSize)
          cellDiv.css('line-height', squareSize + 'px')

          rowDiv.append(cellDiv)
        }
        $('#mineField').append(rowDiv)
      }

      // Update the status of the field
      this.fieldDrawn = true
  },

  // Clear out the minefield for a new game
  clearField: function () {
      this.underground = []
      this.surveyStatus = []
      $('#mineField .row').remove()
  },

  /************************************\
  |    Game interactions and events    |
  \************************************/

  // Handle the dig event when a user clicks a patch on the mineField
  dig: function (event, row, col) {
    // Prevent actions if the game is paused or it's not the first dig and the game is over, or if it's not the first dig and the spot has been dug
    if (this.locked || (!this.firstDig && (this.loser || this.surveyStatus[row][col] == this.surveyStatuses.dug))){
      return
    }
    if (this.flagOnlyMode) {
      // Handle flag event
      this.flagOrUnflag(row, col)
      return
    }

    switch (event.which) {
        case 1: // Left click
          // Handle first dig and initialize game state
          if (this.firstDig) {
            // Show flagging
            this.showFlagging()
            // Begin the timer
            timer.start()
            // Plant all mines and update the mine neighbor statuses
            this.plantMines(row, col)
            // Mark that all following digs are not the initial dig
            this.firstDig = false
          } else if (this.isFlag(row, col)) {
            // Prevent flagging before the game is started
            return
          }

          // Handle mine click event
          if (this.underground[row][col] == this.markers.mine) {
            // Trigger game over
            this.gameOver(false)
          } else {
            // Reveal the clicked area
            this.revealPaths(row, col)
          }
          break
        case 3: // Right click
          // Handle flag event
          this.flagOrUnflag(row, col)
          break
    }
  },

  // Reveal all 8 safe neighbors. If any don't neighbor mines (0), repeat on those neighbors
  revealPaths: function (row, col) {
    queue = []
    // Enqueue the initial selected patch onto the queue
    queue.push([row, col])

    // Process the queue
    while (queue.length > 0) {
      currCoords = queue.shift()
      currRow = parseInt(currCoords[0])
      currCol = parseInt(currCoords[1])
      // Reveal the initial patch
      this.revealSafePatch(currRow, currCol)

      // If the current location is 0, handle all neighbors
      if (this.underground[currRow][currCol] == 0) {
        for (let [x, y] of this.neighbors) {
          neighborRow = currRow + x
          neighborCol = currCol + y
          // Validate the mine field boundaries
          if (this.onMineField(neighborRow, neighborCol)) {
            if (this.surveyStatus[neighborRow][neighborCol] != this.surveyStatuses.dug && this.underground[neighborRow][neighborCol] != this.markers.mine) {
              // Enqueue the neighbor that needs to be revealed
              queue.push([neighborRow, neighborCol])
            }
          }
        }
      }
    }
  },

  // Reveal the current patch at location row, col
  revealSafePatch: function (row, col) {
    // Make sure that the location isn't dug
    if (this.isDiggable(row, col) || this.isFlag(row, col)) {
      if (this.isFlag(row, col))
      {
        this.removeFlag(row, col)
      }

      // Update the survey status of the newly dug patch
      this.surveyStatus[row][col] = this.surveyStatuses.dug

      // Update the front end based on the dig action
      let patch = $(this.getCellId(row, col))
      patch.removeClass('diggable')
      patch.addClass('dug' + this.underground[row][col])
      patch.html(this.underground[row][col])

      // Update the counter that drives the win condition
      this.digCount++

      // Check the win condition now that the current patch has been dug
      if (this.digCount + this.settings.mines == (this.settings.cols * this.settings.rows)) {
        this.gameOver(true)
      }
    }
  },

  // Mark the location at row, col as a flag. If already flagged, unflag the location
  flagOrUnflag: function (row, col) {
    // Prevent first dig flagging
    if (!this.firstDig) {
      if (this.surveyStatus[row][col] == this.surveyStatuses.diggable && this.settings.flags > 0) {
        // Add the flag since there isn't one
        this.addFlag(row, col)
      } else if (this.surveyStatus[row][col] == this.surveyStatuses.flag) {
        // Remove the flag since there is one
        this.removeFlag(row, col)
      }
    }
  },

  // Add the flag at location row, col
  addFlag: function (row, col) {
    $(this.getCellId(row, col)).html(this.markers.flag)
    this.surveyStatus[row][col] = this.surveyStatuses.flag
    this.settings.flags--
    $('#remainingFlags').text(this.settings.flags)
  },

  // Remove the flag at location row, col
  removeFlag: function (row, col) {
    $(this.getCellId(row, col)).empty()
    this.surveyStatus[row][col] = this.surveyStatuses.diggable
    this.settings.flags++
    $('#remainingFlags').text(this.settings.flags)
  },

  hideFlagging: function () {
    $('.flag-toggle-wrapper').addClass('hidden')
  },

  showFlagging: function () {
    $('.flag-toggle-wrapper').removeClass('hidden')
  },

  toggleFlagOnlyMode: function () {
    if (this.firstDig) {
      return
    }
    this.flagOnlyMode = !this.flagOnlyMode
    $('#flagToggle').attr('checked', this.flagOnlyMode)
  },

  disableFlagOnlyMode: function () {
    this.flagOnlyMode = false
    $('#flagToggle').attr('checked', this.flagOnlyMode)
  },

  // Handle the win/loss event
  gameOver: function (isWin) {
    this.hideFlagging()
    timer.stop()
    let currentGameId = this.currentGameId

    // Remove active game elements
    $('.diggable').removeClass('hover')
    timer.deactivateTimer()

    if (!isWin) {
      // Trigger front end animation
      this.minesTriggered(currentGameId)

      this.loser = true
      // wait to show win/lose until explosion animation ends
      setTimeout( function(){
        $('[data-game-id="' + currentGameId + '"] #lose').removeClass('hidden')
        $('[data-game-id="' + currentGameId + '"] .gameover-message').removeClass('hidden')
      }, 2700)
    } else {
      // Update high scores if records are being kept
      if (this.trackRecords) {
        highScores.checkHighScore()
      }

      $('[data-game-id="' + currentGameId + '"] #win').removeClass('hidden')
      $('[data-game-id="' + currentGameId + '"] .gameover-message').removeClass('hidden')
    }
  },

  // set off all 💣 on the mineField game board
  minesTriggered: function (currentGameId) {
    for (let row = 0; row < this.settings.rows; row++) {
      for (let col = 0; col < this.settings.cols; col++) {
        if (this.underground[row][col] == this.markers.mine) {
          let patch = $(this.getCellId(row, col))
          patch.html(this.markers.mine)
          patch.removeClass('diggable')
          patch.addClass('mine')
        }
      }
    }

    // light fuse for front-end animation
    const fuse = setInterval(() => {
      if (this.lit) {
        $('[data-game-id="' + currentGameId + '"] .mine').css('opacity', '0.9')
      } else {
        $('[data-game-id="' + currentGameId + '"] .mine').css('opacity', '1')
      }
      this.lit = !this.lit
    }, 200)

    setTimeout(() => {
      clearInterval(fuse)
      $('[data-game-id="' + currentGameId + '"] .mine').css('opacity', '1')
      $('[data-game-id="' + currentGameId + '"] .mine').html(this.markers.explosion)
      $('[data-game-id="' + currentGameId + '"] #mineField').addClass('explosion')
    }, 2000)
  },

  // Trigger this from the code behind to play the game
  autoPlay: function (win = true, trackRecords = false, intervalTime = 20) {
    this.trackRecords = trackRecords
    if (!this.fieldDrawn) {
      console.log('user must be on field to sweep mines')
      return
    }

    let solveOrder = []
    let numberOfPatches = this.settings.rows * this.settings.cols

    for (var i = 1; i <= numberOfPatches; i++) {
      solveOrder.push(i)
    }

    // Shuffle the array to randomize the order
    for (var i = solveOrder.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = solveOrder[i]
        solveOrder[i] = solveOrder[j]
        solveOrder[j] = temp
    }

    function processNumericPatch(index) {
      if (index < solveOrder.length) {
        let numericPatch = solveOrder[index]
        let row = Math.ceil(numericPatch / mineField.settings.cols) - 1
        let col = numericPatch % mineField.settings.cols

        var patch = $(mineField.getCellId(row, col))
        if (mineField.firstDig) {
          // create left click event (1)
          var leftClickEvent = $.Event('click', { which: 1 })
          mineField.dig(leftClickEvent, row, col)
        } else if (win && mineField.isMine(row, col)) {
          if (!mineField.isFlag(row, col)) {
            // create right click event (3)
            var rightClickEvent = $.Event('click', { which: 3 })
            mineField.dig(rightClickEvent, row, col)
          }
        } else {
          if (mineField.isFlag(row, col)) {
            mineField.removeFlag(row, col)
          }
          // create left click event (1)
          var leftClickEvent = $.Event('click', { which: 1 })
          mineField.dig(leftClickEvent, row, col)
        }

        setTimeout(function () {
          // Call the next iteration after 1 second
          processNumericPatch(index + 1)
        }, intervalTime) // 1000 milliseconds = 1 second
      }
    }

    // Start the loop with the first index (0)
    processNumericPatch(0)
  },

  // Lock the mineField. Accessed by timer
  lockControls: function () {
    this.locked = true
  },

  // Unlock the mineField. Accessed by timer
  unlockControls: function () {
    this.locked = false
  },


  /************************************\
  |       Utilities and helpers        |
  \************************************/

  // Return the jQuery cell id (e.g. "#1_1", "#3_5", etc.)
  getCellId: function (row, col) {
    return '#' + row + '_' + col
  },

  // Check if the row and column exist in the constraints of the current mine field
  onMineField: function (row, col) {
      return row >= 0 && row < this.settings.rows && col >= 0 && col < this.settings.cols
  },

  // check if the target position contains or has a neighboring 💣
  inMineVicinity: function (targetRow, targetCol, patchRow, patchCol) {
      if (patchRow == targetRow && patchCol == targetCol)
      {
          return true
      }

      for (let [neighborRowOffset, neighborColOffset] of this.neighbors) {
          currNeighborRow = patchRow + neighborRowOffset
          currNeighborCol = patchCol + neighborColOffset
          if (currNeighborRow == targetRow && currNeighborCol == targetCol) {
              return true
          }
      }
      return false
  },

  // Check if the patch at row, col is of status: diggable
  isDiggable: function (row, col) {
    return this.surveyStatus[row][col] == this.surveyStatuses.diggable
  },

  // Check if the patch at row, col is of status: dug
  isDug: function (row, col) {
    return this.surveyStatus[row][col] == this.surveyStatuses.dug
  },

  // Check if the patch at row, col is of status: mine
  isMine: function (row, col) {
    return this.underground[row][col] == this.markers.mine
  },

  // Check if the patch at row, col is of status: flag
  isFlag: function (row, col) {
    return this.surveyStatus[row][col] == this.surveyStatuses.flag
  }
}