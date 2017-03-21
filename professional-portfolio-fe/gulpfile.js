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

//Cleans the dist directory and calls gulp tasks to build all files for production
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts'],
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
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
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
    .pipe(gulp.dest('dist/images'))
});

//Moves any custom font files to the dist directory
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

//Deletes the dist directory
gulp.task('clean:dist', function() {
  return del.sync('dist');
});