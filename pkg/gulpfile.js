const connect = require("gulp-connect");
const { watchHTML, htmlTask } = require("./pkg/tasks/html");
const { buildSass, watchSass } = require("./pkg/tasks/scss");
const { buildJS, watchJS } = require("./pkg/tasks/js");
const { imageTask, watchImage } = require("./pkg/tasks/img")
const { mediaTask, watchMedia } = require("./pkg/tasks/media")


function watch(){
    watchHTML();
    watchSass();
    watchJS();
    watchImage();
    watchMedia();
    connect.server({
        livereload: true,
        root: "dist"
    });
}

function build(done) {
    htmlTask();
    buildSass();
    buildJS();
    imageTask();
    mediaTask();
    done();
}

exports.default = watch;
exports.build = build;