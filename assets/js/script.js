document.addEventListener('DOMContentLoaded', function() {
    // Existing Escape logic
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            if (window.location.hash.startsWith('#img-')) {
                window.location.hash = '#_';
            }
        }
    });

    // Simple Back to Top logic
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});