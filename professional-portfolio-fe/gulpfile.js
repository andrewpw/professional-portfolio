var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  console.log("hello hi hey");
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
});