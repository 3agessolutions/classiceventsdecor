var gulp = require('gulp');
var clean = require('gulp-clean');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var templateCache = require('gulp-angular-templatecache');

var rootPath = './';
var rootAppPath = './app/';

requireDir(rootPath + 'gulp/app');

/** Development steps **/
gulp.task('start-app', function() {
    runSequence('styles', 'files', 'font-img', 'cache', 'scripts');
});

gulp.task('clean', function() {
    return gulp.src([
        rootAppPath + 'css',
        rootAppPath + 'js'
    ]).pipe(clean());
});

gulp.task('cache', function() {
    return gulp.src([
            rootPath + '**/*.html',
            '!' + rootPath + '/app/admin{,/**}',
            '!' + rootPath + '/node_modules{,/**}',
            '!' + rootPath + '/bower_components{,/**}'
        ])
        .pipe(templateCache('mf.template.js', {
            module: 'classicevents'
        }))
        .pipe(gulp.dest(rootPath + 'source/js'));
});

gulp.task('files', function() {
    return gulp.src([
        rootPath + 'source/files/*.jpg'
    ]).pipe(gulp.dest(rootAppPath + 'files'));
});
