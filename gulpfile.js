var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});


/*
Custom code from Lions Den Mobile locted here
*/
var replace = require('replace');
var replaceFiles = ['./config.xml'];
var gulp = require('gulp');
var bump = require('gulp-bump');
var pkg = require('./package.json');
var file = require('gulp-file');


gulp.task('set-version', function() {
    return file('version.js', 'version="' + pkg.version + '"', {
            src: true
        })
        .pipe(gulp.dest('./www/js/'))
});

// Basic usage:
// Will patch the version
gulp.task('bump', function() {
    gulp.src('./package.json')
        .pipe(bump({
            type: 'patch'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function() {
    gulp.src('./package.json')
        .pipe(bump({
            type: 'minor'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function() {
    gulp.src('./package.json')
        .pipe(bump({
            type: 'major'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('set-dev', function() {
    var Config = require('cordova-config');
    // Load and parse the config.xml
    var config = new Config('config.xml');
    config.setName(pkg.name + " DEV");
    config.setID(pkg.appId + "1234");
    // Write the config file
    config.writeSync();
});

gulp.task('set-prod', function() {
    var Config = require('cordova-config');
    // Load and parse the config.xml
    var config = new Config('config.xml');
    config.setName(pkg.name);
    config.setID(pkg.appId);
    // Write the config file
    config.writeSync();
});
