var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");

var config = {
    images: "img/**/*",
    css: "sass/main.scss",
    cssFiles: "sass/**/*.scss",
    build: "build",
    js: {
        files: [
            "js/jcarousellite.min.js",
            "js/jquery.inview.min.js",
            "js/jquery.mask.min.js",
            "js/ready.js",
            "js/mq.genie.min.js",
        ],
        name: "all.js"
    }
};

gulp.task("images", function () {
    return gulp.src(config.images)
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(gulp.dest(config.images));
});

gulp.task("css", function () {
    return gulp.src(config.css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build));
});

gulp.task("js", function () {
    return gulp.src(config.js.files)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(config.js.name))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build));
});

gulp.task("default", ["css", "js"]);

gulp.task("watch", function () {
    gulp.watch(config.cssFiles, ["css"]);
    gulp.watch(config.js.files, ["js"]);
});
