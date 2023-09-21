/**************************************************\
|  Game timer event handling and front end control |
\**************************************************/
var timer = {
  started: false,

  // Start the timer initially
  start: function (resume = false) {
    this.runTimerAnimation()
    if (!this.started) {
      if (!resume) {
        this.started = true
        this.secondsElapsed = 0
        this.showPauseElements()
      }
      this.interval = setInterval(function () {timer.increment()}, 1000)
    } else if (resume) {
      this.interval = setInterval(function () {timer.increment()}, 1000)
    }
  },

  // Clear the timer and associated settings
  clear: function () {
    this.stop()
    this.secondsElapsed = 0
    this.setViews()
  },

  // Stop the timer with a pause parameter to avoid changing the game state
  stop: function (pause = false) {
    this.stopTimerAnimation()
    if (!pause) {
      this.started = false
    }
    clearInterval(this.interval)
  },

  // Handle the pause-specific events
  pause: function () {
    this.hidePauseElements()
    this.showResumeElements()
    this.stop(true)
  },

  // Resume the timer from a paused state
  resume: function () {
    this.hideResumeElements()
    this.showPauseElements()
    this.start(true)
  },

  // Increment the timer and update the front end accordingly
  increment: function () {
    this.secondsElapsed++
    this.setViews()
  },

  // Set the front end to match the current timer
  setViews: function () {
    let formattedTime = this.secondsToClockFormat(this.secondsElapsed)
    $('#timer').text(formattedTime)
  },

  // Get the seconds that have elapsed for the current timer
  getSeconds: function () {
    return this.secondsElapsed
  },

  // Get a formatted version of the current time elapsed
  getFormatted: function () {
    return this.secondsToClockFormat(this.secondsElapsed)
  },

  // Format the seconds integer parameter and return a formatted time in format: 'hh:mm:ss' or 'mm:ss'
  secondsToClockFormat: function (seconds) {
    const remainingSeconds = seconds % 60
    const minutes = Math.floor(seconds / 60)
    let hours = 0

    if (minutes > 60) {
      hours = Math.floor(minutes / 60)
    }

    let formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`

    formattedTime = hours > 0 ? `${String(hours)}:` + formattedTime : formattedTime

    return formattedTime
  },

  // Deactivate the timer elements for the front end
  deactivateTimer: function () {
    this.hidePauseElements()
    this.hideResumeElements()
    this.stopTimerAnimation()
    this.stop()
  },

  hidePauseElements: function () {
    $('.pause').addClass('invisible')
  },

  showPauseElements: function () {
    $('.pause').removeClass('invisible')
  },

  hideResumeElements: function () {
    $('.resume').addClass('invisible')
    $('.pausedOverlay').addClass('invisible')
  },

  showResumeElements: function () {
    $('.resume').removeClass('invisible')
    $('.pausedOverlay').removeClass('invisible')
  },

  stopTimerAnimation: function () {
    $('.timerWrapper .fa-clock').removeClass('fa-fade')
  },

  runTimerAnimation: function () {
    $('.timerWrapper .fa-clock').addClass('fa-fade')
  }
}