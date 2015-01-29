var gulp = require('gulp'),
// gulp modules
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglifyJs = require('gulp-uglify');

/**
 * Installation tasks
 */
gulp.task('install-bower', function () {
    return bower();
});

gulp.task('install', ['install-bower']);

/**
 * Build javascripts tasks
 */
gulp.task('build-javascript-goboo-adapter.js', function () {
    return gulp.src(
        [
            'sources/javascripts/goboo.js',
            'sources/javascripts/goboo.Adapter.js',
            'sources/javascripts/goboo.Booking.js',
            'sources/javascripts/goboo.Mode.js',
            'sources/javascripts/goboo.Slot.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('goboo-adapter.js'))
        .pipe(uglifyJs())
        .pipe(sourcemaps.write('.', {sourceRoot: 'sources'}))
        .pipe(gulp.dest('dist/javascripts'));
});

gulp.task('build-javascript-goboo-adapter.with-deps.js', function () {
    return gulp.src(
        [
            'bower_components/date-w3c-format/Date.toW3CString.js',
            'sources/javascripts/goboo.js',
            'sources/javascripts/goboo.Adapter.js',
            'sources/javascripts/goboo.Booking.js',
            'sources/javascripts/goboo.Mode.js',
            'sources/javascripts/goboo.Slot.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('goboo-adapter.with-deps.js'))
        .pipe(uglifyJs())
        .pipe(sourcemaps.write('.', {sourceRoot: 'sources'}))
        .pipe(gulp.dest('dist/javascripts'));
});

gulp.task('build-javascripts', [
    'build-javascript-goboo-adapter.js',
    'build-javascript-goboo-adapter.with-deps.js'
]);

/**
 * Global build tasks
 */
gulp.task('default', ['build-javascripts']);

// alias
gulp.task('build', ['build-javascripts']);
