'use strict';

const del = require("del");
const gulp = require("gulp");
const { series } = require('gulp');
const sass = require('gulp-dart-sass');

function clean(cb) {
    return del(["./_site/assets/css/", './assets/css/']);
    cb;
}

function css(cb) {
    return gulp
        .src("./css/**/*.scss")
        .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
        .pipe(gulp.dest("./_site/assets/css/")) // Used for serving the newly changed css-files when previewing the Jekyll site locally
        .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
        .pipe(gulp.dest('./assets/css/')) // Used for building the css-files for production-use as 'assets' is copied in full when GH-pages builds the site
        cb;
}

function watchFiles(cb) {
    gulp.watch("./css/**/*", css);
    cb;
}

exports.clean = clean
exports.default = series(clean, css)
exports.build = exports.default
exports.watch = series(clean, css, watchFiles)
