var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
sass = require('gulp-sass'),
watch = require('gulp-watch'),
px2rem = require('gulp-px2rem'),
cssmin = require('gulp-minify-css');

gulp.task('browser-sync', ['sass-pc', 'sass-wap'], function(){
  browserSync.init({
    server:{
    	baseDir:'./demo'
    }
  });
  
  gulp.watch('./src/global.pc.scss', [ 'sass-pc' ]);
  gulp.watch('./src/global.wap.scss', [ 'sass-wap' ]);
});

gulp.task('sass-pc', function(){
  return gulp.src('./src/global.pc.scss')
      .pipe( sass() )
      .pipe( cssmin() )
      .pipe( gulp.dest( './demo' ) )
      .pipe( browserSync.stream() );
});

gulp.task('sass-wap', function(){
	return gulp.src('./src/global.wap.scss')
      .pipe( sass() )
      .pipe( px2rem({ replace: true, rootValue: 64 }, { map: true }) )
      .pipe( cssmin() )
    	.pipe( gulp.dest( './demo' ) )
      .pipe( browserSync.stream() );
});