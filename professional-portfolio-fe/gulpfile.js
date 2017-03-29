var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

//runs sass and browserSync together, then watch
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch', callback)
});

//Cleans the static directory and calls gulp tasks to build all files for production
gulp.task('build', function(callback) {
  runSequence(
    'clean:static',
    'sass',
    ['useref', 'images', 'fonts', 'angular'],
    callback
  )
});

//Reloads the browser when called
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
});

//Preprocesses scss into css and then calls the browserSync task to reload the browser automatically after the changes
gulp.task('sass', function() {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//Useref concatenates any js or css files that are inside the <!--build --> tag on the index page
//uglify and cssnano minify the js and css files respectively as determined by gulpIf
gulp.task('useref', function() {
  return gulp.src(['app/**/*.html', '!app/bower_components/**'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('../professional-portfolio/src/main/resources/static'))
});

//Watches for changes to scss, html or js files and runs the appropriate task when changes are detected
//
gulp.task('watch', function() {
  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/*.js', browserSync.reload);
});

//Minifies images and saves them to a local cache so they do not need to be minified again
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('../professional-portfolio/src/main/resources/static'))
});

//Moves any custom font files to the static directory
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('../professional-portfolio/src/main/resources/static'))
});

//Moves angular files to the static directory
gulp.task('angular', function() {
  return gulp.src(['app/app.module.js', 'app/app.routes.js'])
    .pipe(gulp.dest('../professional-portfolio/src/main/resources/static'))
});

//Deletes the static directory
gulp.task('clean:static', function() {
  return del.sync('../professional-portfolio/src/main/resources/static', {force: true});
});