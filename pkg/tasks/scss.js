const gulp = require("gulp");
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require('gulp-clean-css');
const connect = require("gulp-connect")

function buildSass(){
    return gulp.src("src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
}

function watchSass(){
    gulp.watch('src/scss/*.scss', buildSass);
}

module.exports = {
    buildSass,
    watchSass
};