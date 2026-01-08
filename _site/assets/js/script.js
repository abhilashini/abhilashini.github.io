document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        if (window.location.hash.startsWith('#img-')) {
            window.location.hash = '#_';
        }
    }
});