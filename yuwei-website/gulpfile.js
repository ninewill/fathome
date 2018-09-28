var gulp = require('gulp');
var sass = require('gulp-sass');

//(1)
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
//監看深度到下一層
//(2)
// gulp.task('watch', function () {
//   gulp.watch(['./sass/*.scss', './sass/**/*.scss'], ['sass']);
// });

// (3)瀏覽器同步
gulp.task('default', ['sass'], function () {

  browserSync.init({
    server: {
      //根目錄
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(["sass/*.scss", "sass/**/*.scss"], ['sass']).on('change', reload);
  gulp.watch("*.html").on('change', reload);
  gulp.watch("js/*.js").on('change', reload);
  gulp.watch("3dfac/css/*.css").on('change', reload);
  // gulp.watch("images/*").on('change', reload);
});

//(4)
// gulp.task('default' ,['sass' , 'watch']);