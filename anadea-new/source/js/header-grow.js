'use strict';

(function () {
   var X_SMALL_SCREEN = window.matchMedia("(max-width: 765px)");
    var SMALL_SCREEN = window.matchMedia("(min-width: 766px)");
    var LARGE_SCREEN = window.matchMedia("(min-width: 1199px)");

    var changeLogoOnScroll = function () {
        var headerLogo = document.querySelector('.header__logo-block');
        var icon = headerLogo.querySelector('.header__logo-icon');
        var nav = document.querySelector('.nav');
        var yCoord = window.pageYOffset;

        if (yCoord < 100 && SMALL_SCREEN.matches) {
            icon.style = "display: block";
        }
        if (yCoord < 100 && LARGE_SCREEN.matches) {
            headerLogo.style = 'padding: 84px 20px 23px';
            icon.style = "display: block";
            nav.style = "margin-top: 35px";
        }
        if (yCoord > 100 || X_SMALL_SCREEN.matches) {
            headerLogo.style = "padding: 9px 0 21px";
            icon.style = "display: none;";
            nav.style = "margin: 0";
        }
    };
    
    window.addEventListener('scroll', changeLogoOnScroll);
})();