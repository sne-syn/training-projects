'use strict';

(function () {

    var track = document.querySelector('.carousel__track');
    var slidesGroup = track.querySelectorAll('.carousel__slide');
    var nextButton = document.querySelector('.carousel__button--right');
    var prevButton = document.querySelector('.carousel__button--left');
    var dotsNav = document.querySelector('.carousel__nav');
    var dotsGroup = dotsNav.querySelectorAll('.carousel__indicator');

    var slides = [];
    var dots = [];


    var fillArray = function (array, groupElement) {
        groupElement.forEach(function (element) {
            array.push(element);
        });
    };

    fillArray(slides, slidesGroup);
    fillArray(dots, dotsGroup);

    var slideWidth = slides[0].getBoundingClientRect().width;

    // arrange the slides next to one another

    var setSlidePosition = function (slide, index) {
        slide.style.left = slideWidth * index + 'px';
    };

    slides.forEach(setSlidePosition);


    var moveToSlide = function (track, currentSlide, targetSlide) {
        track.style.transform = 'translateX( -' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };
    // when I click left, move slides to the left

    prevButton.addEventListener('click', function (evt) {
        var currentSlide = track.querySelector('.current-slide');
        var prevSlide = currentSlide.previousElementSibling;

        moveToSlide(track, currentSlide, prevSlide);
    });

    // when I click right, move slides to the right

    nextButton.addEventListener('click', function (evt) {
        var currentSlide = track.querySelector('.current-slide');
        var nextSlide = currentSlide.nextElementSibling;

        moveToSlide(track, currentSlide, nextSlide);
    });
    // when I click the nav indicators. move to that slide

    dotsNav.addEventListener('click', function (evt) {
        // what indicatos was clicked on?

        
    });
    console.log(slides);
    console.log(dots);
})();