/// <binding BeforeBuild='less, min, concat:js, concat:css, resizeImagesGallery, resizeImagesThumbnail' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./"
};

paths.js = paths.webroot + "js/**/*.js";
paths.jsTemplate = paths.webroot + "lib/Template/dist/js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.cssTemplate = paths.webroot + "lib/Template/dist/css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, paths.jsTemplate, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.cssTemplate, paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);


gulp.task("concat:js", function () {
    return gulp.src([
            paths.webroot + 'lib/jquery/dist/jquery.min.js',
            paths.webroot + 'lib/bootstrap/dist/js/bootstrap.min.js',
            paths.webroot + 'lib/jquery-easing-original/jquery.easing.min.js',
            paths.webroot + 'lib/FitText.js/jquery.fittext.js',
            paths.webroot + 'lib/wow/dist/wow.min.js',
            paths.webroot + 'lib/lightgallery/dist/js/lightgallery.min.js',
            paths.webroot + 'lib/lightgallery/dist/js/lg-fullscreen.min.js',
            paths.minJs],
            { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(gulp.dest("."));
});

gulp.task("concat:css", function () {
    return gulp.src([
            paths.webroot + 'lib/bootstrap/dist/css/bootstrap.min.css',
            paths.webroot + 'lib/font-awesome/css/font-awesome.min.css',
            paths.webroot + 'lib/animate.css/animate.min.css',
            paths.webroot + 'lib/lightGallery/dist/css/lightGallery.min.css',
            paths.webroot + 'lib/lightgallery/dist/css/lg-transitions.min.css',
            paths.webroot + 'lib/lightgallery/dist/css/lg-fb-comment-box.min.css',
            paths.minCss],
            { base: "." })
        .pipe(concat(paths.concatCssDest))
        .pipe(gulp.dest("."));
});


//less
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
    return gulp.src('./lib/Template/dist/less/**/*.less')
      .pipe(less({
          paths: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(gulp.dest('./lib/Template/dist/css'));
});

//image resize
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

gulp.task('resizeImagesThumbnail', function () {
    gulp.src(['./images/portfolio/**/*.jpg', "!./images/portfolio/**/*-thumbnail.jpg", "!./images/portfolio/**/*-gallery.jpg"])
      .pipe(imageResize({
          width: 730,
          height: 400,
          crop: true,
          upscale: false
      }))
      .pipe(rename(function (path) { path.basename += "-thumbnail"; }))
      .pipe(gulp.dest(function (file) {
          return file.base;
      }));
});

gulp.task('resizeImagesGallery', function () {
    gulp.src(['./images/portfolio/**/*.jpg', "!./images/portfolio/**/*-gallery.jpg", "!./images/portfolio/**/*-thumbnail.jpg"])
      .pipe(imageResize({
          width: 800,
          height: 600,
          crop: true,
          upscale: false
      }))
      .pipe(rename(function (path) { path.basename += "-gallery"; }))
      .pipe(gulp.dest(function (file) {
          return file.base;
      }));
});
