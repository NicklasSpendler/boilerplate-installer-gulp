const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const concat = require('gulp-concat');
const babel = require('gulp-babel')
const connect = require("gulp-connect");


function buildJS(){
    gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('js.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
}

function watchJS(){
    gulp.watch('ssrc/js/*.js', buildJS);
}

module.exports = {
    buildJS,
    watchJS
};