"use strict";

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('message', function(done) {
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
gulp.task('minify', function (done) {
    gulp.src('source/js/*.js')
    .pipe(uglify())
      .pipe(gulp.dest('build/js'));
        done();
});

// compile Sass
gulp.task('sass', function (done) {
    gulp.src('source/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('build/css'));
        done();
});

gulp.task('run', gulp.series('message', 'copyHtml', 'imageMin', 'minify', 'sass'));