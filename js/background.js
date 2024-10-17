document.addEventListener("DOMContentLoaded", function() {
    var isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var root = document.documentElement;

    if (isDarkMode) {
        root.style.setProperty('--background-color', '#1a1a1a');
    } else {
        root.style.setProperty('--background-color', 'white');
    }
});
