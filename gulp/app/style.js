var gulp = require('gulp');
var concat = require('gulp-concat');
var gzip = require('gulp-gzip');
var inject = require('gulp-inject');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');

var rootPath = './';
var rootAppPath = './app/';

gulp.task('styles', function() {
    runSequence('concat-scss', 'compile-css', function(){

    });
});

gulp.task('compile-css', function() {
    console.log('---compile-scss started---');
    return gulp.src([
            rootPath + 'source/scss/style.scss'
        ]).pipe(sass({
            style: 'expanded'
        }).on('error', sass.logError))
        .pipe(minify())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(rootAppPath + 'css'));
});

gulp.task('concat-scss', function() {
    console.log('---concat-scss started---');
    return gulp.src([
            rootPath + 'source/scss/theme/fonts.scss',
            rootPath + 'source/scss/theme/mixin.scss',
            rootPath + 'source/scss/common/*.scss',
            rootPath + 'source/js/**/*.scss',
        ])
        .pipe(concat('style.scss'))
        //.pipe(gzip())
        .pipe(gulp.dest(rootPath + 'source/scss'));
});

gulp.task('font-img', function() {
    gulp.src([rootPath + 'source/scss/fonts/**'])
        .pipe(gulp.dest(rootAppPath + 'css/fonts'));
    return gulp.src([rootPath + 'source/scss/imgs/**'])
        .pipe(gulp.dest(rootAppPath + 'css/imgs'));

});
