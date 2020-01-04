"use strict";

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var server = require("browser-sync").create();

gulp.task('message', function (done) {
    done();
    return console.log('Gulp is running...');
});

// copy all HTML files
gulp.task('copyHtml', function (done) {
    gulp.src('source/*.html')
        .pipe(gulp.dest('build'));
    done();
});

// optimize images
gulp.task('imageMin', function (done) {
    gulp.src('source/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
    done();
});

// minify JS
// gulp.task('minify', function (done) {
//     gulp.src('source/js/*.js')
//     .pipe(uglify())
//       .pipe(gulp.dest('build/js'));
//         done();
// });

// compile Sass
gulp.task('sass', function (done) {
    gulp.src('source/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
    done();
});

// concat JS 

gulp.task('scripts', function (done) {
    gulp.src('source/js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
    done();
});

gulp.task('default', gulp.series('message', 'copyHtml', 'imageMin', 'sass', 'scripts'));

gulp.task("watch", function () {
    gulp.watch('src/js/*.js',  gulp.series('scripts'));
    gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('sass'));
    gulp.watch('source//img/*', gulp.series('imageMin'));
    gulp.watch("source/*.html", gulp.series('copyHtml'));
  });
  
