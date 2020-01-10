const gulp = require('gulp');
const connect = require("gulp-connect");
const imagemin = require('gulp-imagemin')
const recompress = require('imagemin-jpeg-recompress')

function imageTask(){
    gulp.src('src/img/**/*')
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            recompress({
                min: 30,
                max: 50,
                target: 0.5
            })
        ]))
        .pipe(gulp.dest("dist/img"))
        .pipe(connect.reload());
}

function watchImage(){
    return gulp.watch("src/img/**/*", { ignoreInitial: false}, imageTask);
}

module.exports = {
    imageTask,
    watchImage
};