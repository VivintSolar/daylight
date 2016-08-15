var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var compress = require('compression');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');

var htmlinput = ['./index.html','./components/**/*.html'];
var htmloutput = './public';
var sassinput = ['./sass/**/*.scss','./components/**/*.scss'];
var sassoutput = './public/css';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  // outputStyle: 'compressed'
};
var jsinput = ['./js/**/*.js','./components/**/*.js'];
var jsoutput = './public/js';

gulp.task('watch:sass', function () {
    gulp.watch(sassinput, ['sass']);
});

gulp.task('watch:html', function () {
    gulp.watch(htmlinput, ['html']).on('change', browserSync.reload);
});

gulp.task('watch:js', function () {
    gulp.watch(jsinput, ['js']).on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp
    .src(['./sass/daylight.scss'])
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(sassoutput))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp
    .src(['./index.html','./components/sunrise/sunrise.html','./components/sunset/sunset.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(htmloutput));
});

gulp.task('js', function() {
  return gulp.src(jsinput)
  .pipe(concat('daylight.js'))
  .pipe(uglify({preserveComments: 'some'}))
  .pipe(rename('daylight.min.js'))
  .pipe(gulp.dest(jsoutput));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        // ghostMode: false,
        server: {
            baseDir: "./public",
            middleware: function(req,res,next){
                var gzip = compress();
                gzip(req,res,next);
            }
        }
    });
});

gulp.task('watch', ['watch:sass', 'watch:html', 'watch:js']);

gulp.task('default', ['sass', 'watch', 'browser-sync']);
