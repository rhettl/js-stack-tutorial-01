'use strict';
const gulp             = require('gulp');
const ghPages          = require('gulp-gh-pages');
const sass             = require('gulp-sass');
const sourcemaps       = require('gulp-sourcemaps');
const gitignore        = require('gulp-gitignore');
const rm               = require('gulp-rimraf');

gulp.task('gh-pages', function () {
  return gulp.src('./**/**')
    .pipe(gitignore('.gitignore', [
      '.gitignore',
      '.editorconfig',
      'gulpfile.js',
      'package.json',
      'README.md',
      'sample.html'
    ]))
    .pipe(ghPages({}));
});

gulp.task('sass', ['sass:clean'], function () {
  return gulp.src('styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('styles/'));
});
gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(['styles/**/*.scss'], ['sass']);
});
gulp.task('sass:clean', function () {
  return gulp.src('./styles/**/*.css')
    .pipe(rm({force: true}))
    ;
});


gulp.task('watch', ['sass:watch']);
gulp.task('deploy', ['gh-pages']);
gulp.task('default', ['deploy']);
