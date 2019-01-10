// Controls tabs for Projects section
function getProjects(event, name) {
    // Declare all variables
    var i, tabcontent, tabheader;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tabheader" and remove the class "active"
    tabheader = document.getElementsByClassName("tab-header");
    for (i = 0; i < tabheader.length; i++){
        tabheader[i].className = "tab-header inactive";
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";
    event.currentTarget.className = "tab-header active";
}
document.getElementById("defaultOpen").click();

window.onload = function() {
    checkUrl();
}