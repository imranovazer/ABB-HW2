const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minifyCSS = require('gulp-clean-css');
const jsMinify = require('gulp-js-minify');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
// const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

// Development task
gulp.task('dev', ['styles', 'scripts'], function () {
    // Start the server
    browserSync.init({
        server: {
            baseDir: './dist',
        },
    });

    // Watch for changes in *.js and *.scss files
    gulp.watch('src/js/*.js', ['scripts']).on('change', browserSync.reload);
    gulp.watch('src/scss/**/*.scss', ['styles']).on('change', browserSync.reload);
});

// Build task
gulp.task('build', ['clean', 'styles', 'scripts'], function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Clean task - Clears the dist folder
gulp.task('clean', function () {
    return gulp.src('dist', { allowEmpty: true, read: false })
        .pipe(clean());
});

// Compile SCSS files into CSS, add vendor prefixes, and remove unused CSS code
gulp.task('styles', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Concatenate and minify JavaScript files
gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Optimize and copy images to dist/img folder
// gulp.task('images', function () {
//     return gulp.src('src/img/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/img'));
// });

// Default task
gulp.task('default', ['dev']);
