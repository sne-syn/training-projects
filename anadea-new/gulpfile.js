'use strict';

var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var server = require("browser-sync").create();
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
// var svgstore = require('svgstore');

gulp.task('message', function (done) {
    done();
    return console.log('Gulp is running...');
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('copy', function () {
    return gulp.src([
            'source/img/**',
            'source/js/**',
            'source/*.ico'
        ], {
            base: 'source'
        })
        .pipe(gulp.dest('build'));
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

// gulp.task('sprite', function () {
//   return gulp.src('source/img/sprite-*.svg')
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename('sprite.svg'))
//     .pipe(gulp.dest('build/img'));
// });

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
        .pipe(rename({
            suffix: '-min'
        }))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('default', gulp.series(
    'message',
    'clean',
    'copy',
    'copyHtml',
    'imageMin',
    'css'
));

// watch changes
gulp.task('watch', function () {
    gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
    gulp.watch('source//img/*', gulp.series('imageMin'));
    gulp.watch('source/*.html', gulp.series('copyHtml'));
});