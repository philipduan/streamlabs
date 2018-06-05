const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');

gulp.task('js', function() {
  return gulp
    .src('./src/js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('css', function() {
  return gulp
    .src('./src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dest/css/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function() {
  gulp.watch('./src/css/*.css', ['css', 'reload']);
  gulp.watch('./src/js/*.js', ['js', 'reload']);
  gulp.watch('./index.html', ['reload']);
});

gulp.task('reload', function() {
  browserSync.reload();
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return (
    gulp
      .src(['./src/script/*.js', '!node_modules/**'])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  );
});

gulp.task('default', ['watch', 'browser-sync']);
