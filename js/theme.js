var themes = {

    /**************************************\
    |    Theme initialization and setup    |
    \**************************************/

    themeStorageKey: 'selectedTheme',

    init: function () {
        this.themeOptions = {
            dark: 'dark',
            light: 'light'
        }
        this.darkTheme = {
            '--main': '#e4e4e4',
            '--alt': '#171717',
            '--accent': '#212121'
        }
        this.lightTheme = {
            '--main': '#000',
            '--alt': '#fff',
            '--accent': '#eee'
        }

        this.setPreferredTheme();
        this.setThemeValues();
    },

    /**************************************\
    |     Theme controls and handlers      |
    \**************************************/

    // Set current theme in the following order of priority:
    //     1. Browser Storage value
    //     2. Browser color scheme
    //     3. Default: light mode
    setPreferredTheme: function () {
        if (localStorage.getItem(this.themeStorageKey) !== null) {
            this.currentTheme = localStorage.getItem(this.themeStorageKey);
        }
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.currentTheme = this.themeOptions.dark;
            localStorage.setItem(this.themeStorageKey, this.themeOptions.dark);
        }
        else {
            this.currentTheme = this.themeOptions.light;
            localStorage.setItem(this.themeStorageKey, this.themeOptions.light);
        }
    },

    // Toggle theme from light -> dark or dark -> light
    switchTheme: function () {
        this.currentTheme = this.currentTheme === this.themeOptions.dark ? this.themeOptions.light : this.themeOptions.dark;
        localStorage.setItem(this.themeStorageKey, this.currentTheme);
        this.setThemeValues();
    },

    // Set all variables for the current theme and update front end
    setThemeValues: function () {
        switch (this.currentTheme) {
            case this.themeOptions.dark:
                this.setDarkThemeVariables();
                $('#theme').prop('checked', true);
                break;
            case this.themeOptions.light:
                this.setLightThemeVariables();
                $('#theme').prop('checked', false);
                break;
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
    }
}