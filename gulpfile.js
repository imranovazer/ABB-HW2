const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const minifyCSS = require('gulp-clean-css');
const jsMinify = require('gulp-js-minify');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});
gulp.task('scripts', function () {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('clean', function () {
    return gulp.src('dist', { allowEmpty: true, read: false })
        .pipe(clean());
});


gulp.task('dev', gulp.series('styles', 'scripts', 'images', function () {

    browserSync.init({
        server: {
            baseDir: '.',
        },
    });

    gulp.watch('src/scripts/*.js', gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch('src/styles/*.scss', gulp.series('styles')).on('change', browserSync.reload);
    gulp.watch('src/images/', gulp.series('images')).on('change', browserSync.reload);
}));

gulp.task('build', gulp.series('clean', 'styles', 'scripts', function () {
    return gulp.src('./*.html')
        .pipe(gulp.dest('dist'));
}));

gulp.task('default', gulp.series('dev'));
