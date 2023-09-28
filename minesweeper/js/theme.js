/**************************************************\
|    Manages setting and retrieving the theme      |
|     from the browser storage and between         |
|     the javascript and front end                 |
\**************************************************/
var themes = {

    /**************************************\
    |    Theme initialization and setup    |
    \**************************************/

    themeStorageKey: 'selectedTheme',
    accentStorageKey: 'themeAccent',

    init: function () {
        this.themeOptions = {
            dark: 'dark',
            light: 'light'
        }
        this.darkTheme = {
            '--main': '#000',
            '--opposite': '#fff',
            '--secondary': '#616467',
            '--transparency': 'rgba(0, 0, 0, 0.75)',
            '--oppositeTransparency': 'rgba(255, 255, 255, 0.75)'
        }
        this.lightTheme = {
            '--main': '#eee',
            '--opposite': '#000',
            '--secondary': '#c1c1c1',
            '--transparency': 'rgba(255, 255, 255, 0.75)',
            '--oppositeTransparency': 'rgba(0, 0, 0, 0.75)'
        }
        this.accents = {
            pink: 'pink',
            teal: 'teal',
            orange: 'orange',
            red: 'red',
            green: 'green'
        }
        this.accentHexes = {
            pink: '#f092dd',
            teal: '#2abec4',
            orange: '#ffa500',
            red: '#e66e6e',
            green: '#7dd07d'
        }
        this.accentVariable = '--accent'
        this.setPreferredTheme()
        this.setPreferredAccent()
        this.setAccentValue()
        this.setThemeValues()
    },

    /**************************************\
    |     Theme controls and handlers      |
    \**************************************/

    // Set current theme in the following order of priority:
    //     1. Browser Storage value
    //     2. Browser color scheme
    //     3. Default: light mode
    setPreferredTheme: function () {
        if (localStorage.getItem(this.themeStorageKey) != null) {
            this.currentTheme = localStorage.getItem(this.themeStorageKey)
        }
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.currentTheme = this.themeOptions.dark
            localStorage.setItem(this.themeStorageKey, this.themeOptions.dark)
        }
        else {
            this.currentTheme = this.themeOptions.light
            localStorage.setItem(this.themeStorageKey, this.themeOptions.light)
        }
    },

    setPreferredAccent: function () {
        if (localStorage.getItem(this.accentStorageKey) != null) {
            this.currentAccent = localStorage.getItem(this.accentStorageKey)
        } else {
            this.currentAccent = 'teal'
        }
        this.setAccentValue()
    },

    // Toggle theme from light -> dark or dark -> light
    switchTheme: function () {
        switch (this.currentTheme) {
            case this.themeOptions.dark:
                this.currentTheme = this.themeOptions.light
                localStorage.setItem(this.themeStorageKey, this.themeOptions.light)
                break
            case this.themeOptions.light:
                this.currentTheme = this.themeOptions.dark
                localStorage.setItem(this.themeStorageKey, this.themeOptions.dark)
                break
        }

        this.setThemeValues()
    },

    // Set all variables for the current theme and update front end
    setThemeValues: function () {
        switch (this.currentTheme) {
            case this.themeOptions.dark:
                this.setDarkThemeVariables()
                $('#theme').attr('checked', true)
                break
            case this.themeOptions.light:
                this.setLightThemeVariables()
                $('#theme').attr('checked', false)
                break
        }
    },

    setDarkThemeVariables: function () {
        for (const darkVariable in this.darkTheme) {
            $(':root').css(darkVariable, this.darkTheme[darkVariable]);
        }
    },

    setLightThemeVariables: function () {
        for (const lightVariable in this.lightTheme) {
            $(':root').css(lightVariable, this.lightTheme[lightVariable]);
        }
    },

    changeAccentValue: function (newAccent) {
        localStorage.setItem(this.accentStorageKey, this.accents[newAccent])
        this.currentAccent = newAccent
        this.setAccentValue()
    },

    setAccentValue: function () {
        $(':root').css(this.accentVariable, this.accentHexes[this.currentAccent])
        $('.accent').removeClass('selected')
        $('.accent.' + this.currentAccent).addClass('selected')
    }
}
