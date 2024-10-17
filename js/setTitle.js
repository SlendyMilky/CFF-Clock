document.addEventListener("DOMContentLoaded", function() {
    var userLang = navigator.language || navigator.userLanguage;
    var titleElement = document.getElementById("page-title");
    switch (userLang) {
        case 'fr':
            titleElement.textContent = "Horloge CFF";
            break;
        case 'de':
            titleElement.textContent = "SBB Uhr";
            break;
        case 'it':
            titleElement.textContent = "FFS Orologio";
            break;
        default:
            titleElement.textContent = "SBB Clock";
    }
});