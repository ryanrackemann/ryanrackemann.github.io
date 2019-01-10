var transformations = {
    href: '#',
    title: 'Transformations',
    descr: 'Little description explaining what this project is',
    tags: ['py']
};
var scraper = {
    href: '#',
    title: 'Web Scraper',
    descr: 'Little description explaining what this project is',
    tags: ['py']
};
var sitemapGenerator = {
    href: '#',
    title: 'Sitemap Generator',
    descr: 'Little description explaining what this project is',
    tags: ['py', 'html']
};
var lineOfBestFit = {
    href: '#',
    title: 'Line of Best Fit',
    descr: 'Little description explaining what this project is',
    tags: ['py']
};
var formBuilder = {
    href: '#',
    title: 'Form Builder',
    descr: 'Little description explaining what this project is',
    tags: ['html', 'php', 'js']
};
var projects = [
    transformations,
    scraper,
    sitemapGenerator,
    lineOfBestFit,
    formBuilder
];

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
        tabheader[i].className = "tab-header w3-leftbar w3-border-orange";
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";
    event.currentTarget.className = "tab-header active w3-leftbar w3-border-teal";
}
document.getElementById("defaultOpen").click();

// Manages the relative projects under each Language Project tab
function fillLang() {
    for (var i = 0; i < projects.length; i++) {
        for (var j = 0; j < projects[i].tags.length; j++) {
            console.log(projects[i].title);
            console.log(projects[i].descr);
            console.log(projects[i].tags[j]);
            document.getElementById(projects[i].tags[j]).innerHTML += '<div class="w3-third">' +
                    '<a href="' + projects[i].href + '" class="nolink">' +
                        '<div class="w3-card-2 w3-black w3-hover-teal w3-hover-shadow w3-margin-bottom">' +
                            '<div class="w3-container">' +
                                '<h3>' + projects[i].title + '</h3>' +
                                '<p>' + projects[i].descr + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                '</div>';
        }
    }
}

window.onload = function() {
    checkUrl();
    fillLang();
}