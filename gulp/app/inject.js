var gulp = require('gulp');
var inject = require('gulp-inject');
var rootPath = './';
var rootAppPath = './app/';

gulp.task('inject', function() {
    console.log('---inject-scss started---');
    return gulp.src(rootPath + 'index.php')
        .pipe(inject(gulp.src([
            rootAppPath + 'css/style.css'
        ], {
            read: false
        }), {
            starttag: '<!-- inject:style:{{ext}} -->'
        }))
        .pipe(inject(gulp.src([
            rootAppPath + 'js/app.js'
        ], {
            read: false
        }), {
            starttag: '<!-- inject:script:{{ext}} -->'
        }))
        .pipe(inject(gulp.src([
            rootAppPath + 'js/vendor.js'
        ], {
            read: false
        }), {
            starttag: '<!-- inject:vendor:{{ext}} -->'
        }))
        .pipe(gulp.dest(rootAppPath));
});
