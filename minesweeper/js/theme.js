/**************************************************\
|    Manages setting and retrieving the theme      |
|     from the browser storage and between         |
|     the javascript and front end                 |
\**************************************************/
var themes = {

    /**************************************\
    |    Theme initialization and setup    |
    \**************************************/

    storageKey: 'selectedTheme',

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
            '--oppositeTransparency': 'rgba(255, 255, 255, 0.75)',
            '--accent': '#156265'
        }
        this.lightTheme = {
            '--main': '#eee',
            '--opposite': '#000',
            '--secondary': '#c1c1c1',
            '--transparency': 'rgba(255, 255, 255, 0.75)',
            '--oppositeTransparency': 'rgba(0, 0, 0, 0.75)',
            '--accent': '#2abec4'
        }
        this.setPreferredTheme()
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
        if (localStorage.getItem(this.storageKey) != null) {
            this.currentTheme = localStorage.getItem(this.storageKey)
        }
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log('prefers dark')
            this.currentTheme = this.themeOptions.dark
            localStorage.setItem(this.storageKey, this.themeOptions.dark)
        }
        else {
            console.log('prefers light')
            this.currentTheme = this.themeOptions.light
            localStorage.setItem(this.storageKey, this.themeOptions.light)
        }
    },

    // Toggle theme from light -> dark or dark -> light
    switchTheme: function () {
        switch (this.currentTheme) {
            case this.themeOptions.dark:
                this.currentTheme = this.themeOptions.light
                localStorage.setItem(this.storageKey, this.themeOptions.light)
                break
            case this.themeOptions.light:
                this.currentTheme = this.themeOptions.dark
                localStorage.setItem(this.storageKey, this.themeOptions.dark)
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
}
