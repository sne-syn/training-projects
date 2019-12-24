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
        if (targetSlide) {
            track.style.transform = 'translateX( -' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        }
    };

    var updateDots = function (currentDot, targetDot) {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    var hideShowArrows = function (slides, prevButton, nextButton, targetIndex) {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    }
    // when I click left, move slides to the left

    prevButton.addEventListener('click', function (evt) {
        var currentSlide = track.querySelector('.current-slide');
        var currentDot = dotsNav.querySelector('.current-slide');
        var prevSlide = currentSlide.previousElementSibling;
        var prevDot = currentDot.previousElementSibling;
        var prevIndex = slides.indexOf(prevSlide);

        moveToSlide(track, currentSlide, prevSlide);

        if (prevSlide) {
            updateDots(currentDot, prevDot);
        }
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    // when I click right, move slides to the right

    nextButton.addEventListener('click', function (evt) {
        var currentSlide = track.querySelector('.current-slide');
        var currentDot = dotsNav.querySelector('.current-slide');
        var nextSlide = currentSlide.nextElementSibling;
        var nextDot = currentDot.nextElementSibling;
        var nextIndex = slides.indexOf(nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        if (nextSlide) {
            updateDots(currentDot, nextDot);
        }

        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });
    // when I click the nav indicators. move to that slide

    dotsNav.addEventListener('click', function (evt) {
        // what indicatos was clicked on?
        var targetDot = evt.target.closest('button');

        if (!targetDot) return;

        var currentSlide = track.querySelector('.current-slide');
        var currentDot = dotsNav.querySelector('.current-slide');
        var targetIndex = dots.indexOf(evt.target);
        var targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);

    });
})();