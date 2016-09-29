var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var inject = require('gulp-inject'); //Start by adding the plugin to your gulpfile
var htmlmin = require('gulp-htmlmin');
var babel = require("gulp-babel");
var UglifyJS = require("uglify-js");

gulp.task('dist', function() {
   gulp.src('app/index.html')
     .pipe(inject(gulp.src(['app/js/analytics.js']), { // This is the file that has the content that will be injected into index.html
       starttag: '<!-- inject:analytics -->', // Here we tell the location in which we want the injection to occur
       transform: function (filePath, file) {
         return file.contents.toString('utf8'); // Return file contents as string
         }
     }))
        .pipe(usemin({
            assetsDir: 'app',
            css: [minifyCss(), 'concat'],
            js: [babel(), 'concat'],
            html: [ htmlmin({
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              decodeEntities: true,
              minifyCSS: true,
              minifyJS: true,
              processConditionalComments: true,
              removeAttributeQuotes: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeOptionalTags: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              removeTagWhitespace: true,
              sortAttributes: true,
              sortClassName: true,
              useShortDoctype: true
             }) ]
        }))
      .pipe(gulp.dest('dist')); // This is the destination of the final product
});

gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('imgmin', function() {
	return gulp.src('app/img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/sass/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);

});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    port: 3022
  });
});
