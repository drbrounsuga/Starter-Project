/* jshint node: true */
'use strict';

// nmp modules: https://www.npmjs.com/
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync');


gulp.task('concatScripts', function(){
  gulp.src([
           'src/js/resources/jquery-1.11.3.js',
           'src/js/resources/scripts.js'
           ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('src/js/'));
});


gulp.task('minifyScripts', function(){
  gulp.src('src/js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('dist/js/'));
});


gulp.task('compileSass', function(){
  gulp.src('src/sass/app.sass')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(rename('app.min.css'))
  .pipe(sourcemaps.write('./maps/'))
  .pipe(gulp.dest('dist/css/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});


gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});


gulp.task('watchSass', ['browserSync'], function () {
  gulp.watch(['src/sass/**/*.sass', 'src/sass/**/*.scss'], ['build']);
});


gulp.task('build', function(){
  console.log('Building...');
  runSequence('concatScripts', 'minifyScripts', 'compileSass');
});


gulp.task('default', ['watchSass'], function(){
  console.log('Watching...');
});
