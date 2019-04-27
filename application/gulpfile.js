const gulp = require('gulp');
const rename = require('gulp-rename');

gulp.task('css', function() {
    const postcss = require('gulp-postcss');
    const tailwindcss = require('tailwindcss');
  
    return gulp
      .src('style.css')
      .pipe(postcss([
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
      ]))
      .pipe(rename('tailwind.css'))
      .pipe(gulp.dest('project/'));
});
  
function watchFiles() {
  gulp.watch(['./style.css', './tailwind.config.js'], {}, gulp.series(['css']));
} 
  
gulp.task('default', gulp.series(['css', watchFiles]));  
