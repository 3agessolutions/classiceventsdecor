var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var merge = require('merge-stream');
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');


var rootPath = './';
var rootAppPath = './app/';


gulp.task('scripts', function() {
    runSequence('js-bower-move', 'js-app-move', function() {
        console.log('----completed js tk');
        gulp.src(rootPath + 'index.php')
            .pipe(inject(gulp.src([
                rootAppPath + 'css/style.css'
            ], {
                read: false
            }), {
                starttag: '<!-- inject:style:{{ext}} -->',
                ignorePath: 'app',
                addRootSlash: false
            }))
            .pipe(inject(gulp.src([
                rootAppPath + 'js/app.js'
            ], {
                read: false
            }), {
                starttag: '<!-- inject:script:{{ext}} -->',
                ignorePath: 'app',
                addRootSlash: false
            }))
            .pipe(inject(gulp.src([
                rootAppPath + 'js/vendor.js'
            ], {
                read: false
            }), {
                starttag: '<!-- inject:vendor:{{ext}} -->',
                ignorePath: 'app',
                addRootSlash: false
            }))
            .pipe(gulp.dest(rootAppPath));
    });
});

gulp.task('js-bower-move', function() {
    return gulp.src(mainBowerFiles())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(rootAppPath + 'js'));
});

gulp.task('js-app-move', function() {
    var appJs = gulp.src([rootPath + 'source/js/**/*.js'])
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(rootAppPath + 'js'));

    return appJs;
});
