'use strict';

const browsersync = require("browser-sync").create();
const cp = require("child_process");
const del = require("del");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const sass = require('gulp-dart-sass');

function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./_site/"
      },
      port: 3000
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function clean() {
    return del(["./_site/assets/"]);
}

function jekyll() {
    return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
}

function css() {
    return gulp
        .src("./css/**/*.scss")
        .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
        .pipe(gulp.dest("./_site/assets/css/"))
        // .pipe(browsersync.stream());
}

function images() {
    return gulp
      .src("./assets/img/**/*")
      .pipe(newer("./_site/assets/img"))
      .pipe(gulp.dest("./_site/assets/img"));
}

function watchFiles() {
    gulp.watch("./assets/scss/**/*", css);
    gulp.watch(
      [
        "./_includes/**/*",
        "./_layouts/**/*",
        "./_collections/**/*"
      ],
      gulp.series(jekyll, browserSyncReload)
    );
    gulp.watch("./assets/img/**/*", images);
}

const build = gulp.series(clean, jekyll, css);
const watch = gulp.parallel(watchFiles, browserSync);

exports.images = images;
exports.css = css;
exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
