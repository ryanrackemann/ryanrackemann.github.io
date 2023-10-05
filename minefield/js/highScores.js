/**************************************************\
|    Manages setting and retrieving highScores     |
|     from the browser storage and between         |
|     the javascript and front end                 |
\**************************************************/

var highScores = {

  /*********************************************************\
  |   Record times and win count initialization and setup   |
  \*********************************************************/
  easyRecordTime: -1,
  easyWinCount: 0,
  mediumRecordTime: -1,
  mediumWinCount: 0,
  hardRecordTime: -1,
  hardWinCount: 0,

  init: function () {
    this.getStoredScores()
    this.displayScores()
  },

  /*********************************************************\
  |         Setters for high scores and win counts          |
  \*********************************************************/

  // Check the current stats to see if there is a new high score
  checkHighScore: function() {
    let newRecord = false
    let formattedTime = timer.getFormatted()
    switch (difficulty.getDifficulty()) {
      case 'easy':
        if (timer.secondsElapsed < this.easyRecordTime || this.easyRecordTime == -1)
        {
          newRecord = true
          this.easyRecordTime = timer.secondsElapsed
          $('.easyRecordTime').text(formattedTime)
          localStorage.setItem('easyRecordTime', this.easyRecordTime)
        }
        this.easyWinCount++
        $('.easyWinCount').text(this.easyWinCount)
        localStorage.setItem('easyWinCount', this.easyWinCount)
        break
      case 'medium':
        if (timer.secondsElapsed < this.mediumRecordTime || this.mediumRecordTime == -1)
        {
          newRecord = true
          this.mediumRecordTime = timer.secondsElapsed
          $('.mediumRecordTime').text(formattedTime)
          localStorage.setItem('mediumRecordTime', this.mediumRecordTime)
        }
        this.mediumWinCount++
        $('.mediumWinCount').text(this.mediumWinCount)
        localStorage.setItem('mediumWinCount', this.mediumWinCount)
        break
      case 'hard':
        if (timer.secondsElapsed < this.hardRecordTime || this.hardRecordTime == -1)
        {
          newRecord = true
          this.hardRecordTime = timer.secondsElapsed
          $('.hardRecordTime').text(formattedTime)
          localStorage.setItem('hardRecordTime', this.hardRecordTime)
        }
        this.hardWinCount++
        $('.hardWinCount').text(this.hardWinCount)
        localStorage.setItem('hardWinCount', this.hardWinCount)
        break
    }
    if (newRecord) {
      $('.highScore').text(formattedTime)
      $('.highScores, .highScoreWrapper, #newHighScore, #newRecordWrapper').removeClass('hidden')
    }
  },

  // Retrieve any stored scores from the browser local storage
  getStoredScores: function () {
    this.easyRecordTime = localStorage.getItem('easyRecordTime') != null ? localStorage.getItem('easyRecordTime') : this.easyRecordTime
    this.easyWinCount = localStorage.getItem('easyWinCount') != null ? localStorage.getItem('easyWinCount') : this.easyWinCount
    this.mediumRecordTime = localStorage.getItem('mediumRecordTime') != null ? localStorage.getItem('mediumRecordTime') : this.mediumRecordTime
    this.mediumWinCount = localStorage.getItem('mediumWinCount') != null ? localStorage.getItem('mediumWinCount') : this.mediumWinCount
    this.hardRecordTime = localStorage.getItem('hardRecordTime') != null ? localStorage.getItem('hardRecordTime') : this.hardRecordTime
    this.hardWinCount = localStorage.getItem('hardWinCount') != null ? localStorage.getItem('hardWinCount') : this.hardWinCount
  },

  /*********************************************************\
  |          High score and win count handlers              |
  \*********************************************************/

  // Display the scores to the front end
  displayScores: function () {
    if (this.easyWinCount > 0) {
      $('.easyWinCount').text(this.easyWinCount)
      $('.easyRecordTime').text(timer.secondsToClockFormat(this.easyRecordTime))
    }

    if (this.mediumWinCount > 0) {
      $('.mediumWinCount').text(this.mediumWinCount)
      $('.mediumRecordTime').text(timer.secondsToClockFormat(this.mediumRecordTime))
    }

    if (this.hardWinCount > 0) {
      $('.hardWinCount').text(this.hardWinCount)
      $('.hardRecordTime').text(timer.secondsToClockFormat(this.hardRecordTime))
    }
  },

  // Display the record time to the game stat bar based on difficulty selected
  displayStatBarRecord: function () {
    let formattedRecord = ''
    switch (difficulty.getDifficulty()) {
      case 'easy':
        if (this.easyWinCount > 0) {
          formattedRecord = timer.secondsToClockFormat(this.easyRecordTime)
        }
        break
      case 'medium':
        if (this.mediumWinCount > 0) {
          formattedRecord = timer.secondsToClockFormat(this.mediumRecordTime)
        }
        break
      case 'hard':
        if (this.hardWinCount > 0) {
          formattedRecord = timer.secondsToClockFormat(this.hardRecordTime)
        }
        break
    }

    if (formattedRecord != '') {
      $('.highScoreWrapper').removeClass('hidden')
    }
    else {
      $('.highScoreWrapper').addClass('hidden')
    }
    $('.highScore').text(formattedRecord)
  },

  /*********************************************************\
  |          High score and win count utilities             |
  \*********************************************************/

  // Check if the current difficulty has an associated high score
  hasHighScore: function () {
    switch (difficulty.getDifficulty()) {
      case 'easy':
        if (this.easyWinCount > 0) {
          return true
        }
      case 'medium':
        if (this.mediumWinCount > 0) {
          return true
        }
      case 'hard':
        if (this.hardWinCount > 0) {
          return true
        }
    }
    return false
  },

  // Get the current high score based on the difficulty
  getCurrentHighScore: function () {
    let currentHighScoreFormatted = '--:--'
    switch (difficulty.getDifficulty()) {
      case 'easy':
        if (this.easyWinCount > 0) {
          currentHighScoreFormatted = secondsToClockFormat(this.easyRecordTime)
        }
        break
      case 'medium':
        if (this.mediumWinCount > 0) {
          currentHighScoreFormatted = secondsToClockFormat(this.mediumRecordTime)
        }
        break
      case 'hard':
        if (this.hardWinCount > 0) {
          currentHighScoreFormatted = secondsToClockFormat(this.hardRecordTime)
        }
        break
    }
    $('.highScore').text(currentHighScoreFormatted)
  }
}