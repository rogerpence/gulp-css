const gulp = require('gulp');
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
};

gulp.task('purgecss', () => {
  const whitelist = [];
  const whitelistPatterns = [/^js/];
  return gulp
      .src('project/**/*.css')
      .pipe(purgecss({
          content: ['project/**/*.html'],
          whitelist: whitelist,
          whitelistPatterns: whitelistPatterns,
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ["html"]
            },
          ],          
       }))
      .pipe(gulp.dest('build/'))
});

gulp.task('buildcss', () => {
  return gulp
    .src('build/**/*.css')
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/public'))
}); 

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

gulp.task('build', gulp.series(['purgecss']));
