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
var jade = require('gulp-jade');
var data = require('gulp-data');
var path = require('path');
var combineMq = require('gulp-combine-mq');
var cleanCSS = require('gulp-clean-css');
var fs = require('fs');


var htmlinput = ['./index.html','./components/**/*.html'];
var htmloutput = './public';
var sassinput = ['./sass/**/*.scss','./components/**/*.scss'];
var sassoutput = './public/css';
var sassOptions = {
  errLogToConsole: true,
  // outputStyle: 'expanded',
  outputStyle: 'compact'
};
var jsinput = ['./js/**/*.js','./components/**/*.js'];
var jsoutput = './public/js';
var jadeinput = ['./components/**/*.jade','./daylight/daylight.jade'];
var jadeoutput = './public/';

gulp.task('watch:sass', function () {
    gulp.watch(sassinput, ['sass']);
});

gulp.task('watch:html', function () {
    gulp.watch(htmlinput, ['html']).on('change', browserSync.reload);
});

gulp.task('watch:js', function () {
    gulp.watch(jsinput, ['js']).on('change', browserSync.reload);
});

gulp.task('watch:jade', function () {
    gulp.watch([jadeinput,'./components/**/*.json'], ['jade','html']).on('change', browserSync.reload);
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
    .pipe(combineMq({
        beautify: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(sassoutput))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp
    .src(['./index.html'])
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

gulp.task('jade', function() {
  gulp.src(jadeinput)
    .pipe(data(function(file) {
      return require(file.path.replace('jade','json'));
    }))
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest(jadeoutput));
});

gulp.task('makeJSON',function() {
  gulp.src('./daylight/daylight.jade')
    .pipe(data(function(){
      var theJSON = {};
      function prepareForJSON(contents){
        var parsed = contents.replace(/\n/g,"");
        parsed = parsed.replace(/"/g,'\\"');
        parsed = parsed.replace(/\>\s+\<"/g,'><');
        return parsed;
      }
      var dawn = fs.readFileSync("./public/dawn/dawn.html", 'utf8');
      theJSON.dawn = prepareForJSON(dawn);
      
      var sunrise = fs.readFileSync("./public/sunrise/sunrise.html", 'utf8');
      theJSON.sunrise = prepareForJSON(sunrise);
      
      var sunset = fs.readFileSync("./public/sunset/sunset.html", 'utf8');
      theJSON.sunset = prepareForJSON(sunset);
      
      // console.log("raw",dawn);
      // console.log("parsed", prepareForJSON(dawn));
      // console.log(theJSON);
      // console.log("toJSON",JSON.stringify(theJSON));
      
      return theJSON;
      // return dawn
    }))
    .pipe(jade({pretty:true}))
    .pipe(rename('daylight.js'))
    .pipe(gulp.dest(jadeoutput));
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

gulp.task('watch', ['watch:sass', 'watch:html', 'watch:js', 'watch:jade']);

gulp.task('default', ['sass', 'watch', 'browser-sync']);
