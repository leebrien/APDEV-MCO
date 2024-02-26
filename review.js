

window.addEventListener('scroll', () => {
    const userIcon = document.querySelector('.user-button img');
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 0) {
        userIcon.classList.add('scrolled');
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        userIcon.classList.remove('scrolled');
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var reviewLink = document.getElementById('review-link');
    var currentLocation = window.location.href;
    if (currentLocation.indexOf('review') !== -1) {
        reviewLink.classList.add('active-link');
    }
});
