function toggleMenu() {
    var opener = document.getElementById("menuOpener");
    var items = document.getElementsByClassName("tab-header");
    if (opener.classList.contains("drop-closed")){
        for (var i = 0; i < items.length; i++) {
            items[i].style = 'display: block';
        }
        opener.classList.remove("drop-closed");
        opener.classList.add("drop-open");
    }
    else {
        for (var i = 0; i < items.length; i++) {
            items[i].style = '';
        }
        opener.classList.remove("drop-open");
        opener.classList.add("drop-closed");
    }
}