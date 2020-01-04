'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');

var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var server = require('browser-sync').create();

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

// optimize images   !!!!to change later
gulp.task('imageMin', function (done) {
    gulp.src('source/img/impressions-tablet-1.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
    done();
});

gulp.task('css', function () {
    return gulp.src('source/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('build/css'))
      .pipe(csso())
      .pipe(rename({ suffix: '-min' }))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest('build/css'));
  });

// concat JS 

gulp.task('scripts', function (done) {
    gulp.src('source/js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
    done();
});

gulp.task('default', gulp.series('message', 'copyHtml', 'imageMin', 'css', 'scripts'));

// watch changes
gulp.task('watch', function () {
    gulp.watch('src/js/*.js',  gulp.series('scripts'));
    gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
    gulp.watch('source//img/*', gulp.series('imageMin'));
    gulp.watch('source/*.html', gulp.series('copyHtml'));
  });
  
