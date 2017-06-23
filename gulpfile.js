var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var optimize = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

/* browser sync : Synchronizes browser */
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});

/* sass : Preprocess SASS to CSS */
gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

/* babelEs5 : es5 transpile */
gulp.task('babelEs5', function() {
    return gulp.src('app/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('app/js/es5'))
});

/* uglifyJs : uglify JS*/
gulp.task('uglifyJs', function() {
    return gulp.src('app/js/es5/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
});

/* optimize : Optimize css */
gulp.task('optimize', function(){
    return gulp.src('app/*.html')
        .pipe(optimize())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

/* imageMin : Minify images- */
gulp.task('imageMin', function(){
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({ /* cache image min */
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

/* fonts : Copy fonts to dist */
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

/* clean : Clean dist directory */
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

/* FOR DEVELOPMENT */
/* watch : Watches SASS files and calls sass task if there is a change */
gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('default', function (callback) {
    runSequence('clean:dist', ['sass', 'babelEs5', 'uglifyJs', 'optimize', 'imageMin', 'fonts','browserSync', 'watch'], callback)
});

/* FOR BUILD */
/* build : Executes all build tasks. */
gulp.task('build', function (callback) {
    runSequence('clean:dist', ['sass', 'babelEs5', 'uglifyJs', 'optimize', 'imageMin', 'fonts'], callback )
});

