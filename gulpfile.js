var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var del = require("del");

// подключение конфигурации
var config = require("./config.json");

// сжатие изображение с перезаписью изначальных
gulp.task("images", function () {
    return gulp.src(config.images)
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(gulp.dest(config.imagesBase));
});

// обработка SASS
gulp.task("css", function () {
    return gulp.src(config.css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build));
});

// сжатие JS
gulp.task("js", function () {
    return gulp.src(config.js.files)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(config.js.name))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build));
});

// удаление папки сборки
gulp.task("clean", function () {
    del(config.build);
});

gulp.task("default", ["css", "js"]);

gulp.task("watch", function () {
    gulp.watch(config.cssFiles, ["css"]);
    gulp.watch(config.js.files, ["js"]);
});
