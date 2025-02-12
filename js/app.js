$(document).ready(function () {
    // Initialize the BadgeList module
    BadgeList.init('.badges-minimize');
    themes.init();
    $('.theme-wrapper').on('change', function () {
        themes.switchTheme()
    })
});
  