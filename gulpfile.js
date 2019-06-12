'use strict';

var gulp 					= require('gulp');
var plumber 				= require('gulp-plumber');
var notify 					= require('gulp-notify');
var sass 					= require('gulp-sass');
// var postcss					= require('gulp-postcss');
// var autoprefixer			= require('autoprefixer');
// var minify					= require('gulp-csso');
// var rename 					= require('gulp-rename');
// var imagemin				= require('gulp-imagemin');
var browserSync 			= require('browser-sync').create();
var errorHandler 			= {
    						errorHandler: notify.onError({
        					title: 'Ошибка в плагине <%= error.plugin %>',
        					message: "Ошибка: <%= error.message %>"
   								 })
							};


//Gulp задачи

gulp.task('style', function() {
	return gulp.src('src/sass/style.scss')
		.pipe(plumber(errorHandler))	
		.pipe(sass())
		// .pipe(postcss([
		// 	autoprefixer]))
		.pipe(gulp.dest('src/css/'))
		// .pipe(minify())
		// .pipe(rename('style.min.css'))
		// .pipe(gulp.dest('src/css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function(){
	return gulp.src('src/img/**/*.{png,jpg,svg}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel:3}),
			imagemin.jpegtran({progressive:true}),
			imagemin.svgo()
			]))
		.pipe(gulp.dest("src/img"));
});

gulp.task('build',  function() {
    browserSync.init({
    	injectChanges: true,
    	server: {baseDir: './src/'}
    });
    gulp.watch('src/sass/**/*', gulp.series('style'));
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/**/*.css').on('change', browserSync.reload);
    gulp.watch('src/sass/**/*.scss').on('change', browserSync.reload);
});



