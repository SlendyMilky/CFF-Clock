document.addEventListener("DOMContentLoaded", function() {
    var userLang = navigator.language || navigator.userLanguage;
    var titleElement = document.getElementById("page-title");
    userLang = userLang.slice(0, 2).toLowerCase(); // fr-CH, de-CH, it-CH -> fr, de, it
    document.documentElement.lang = userLang;
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