"use strict";

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass'),
	maps = require('gulp-sourcemaps'),
	pump = require('pump'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	del = require('del');

gulp.task("concatScripts", function() {
	return gulp.src([
		'src/js/main.js'])
	.pipe(maps.init())
	.pipe(concat("scripts.js"))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("src/js"));
});

gulp.task('minifyScripts', ['concatScripts'], function (cb) {
  pump([
        gulp.src('src/js/scripts.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('compileSass', () =>
    sass('src/scss/styles.scss', {
    	sourcemap: true,
    	style: 'compressed'
    })
    .pipe(autoprefixer({browsers: ['last 10 versions']}))
    .on('error', sass.logError)
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/css'))
);

gulp.task('watchFiles', ['compileSass' ,'concatScripts'], function() {
	gulp.watch('src/scss/**/*.scss', ['compileSass']);
	gulp.watch('src/js/main.js', ['concatScripts']);
});

gulp.task('clean', function() {
	del(['dist', 'src/css/styles.css', 'src/js/scripts.js']);
});

gulp.task('build',['compileSass'], function() {
	return gulp.src(['src/css/styles.css', 'src/*.html', 'src/img/**', 'src/fonts/**'], {base: './src'})
	.pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles'], function() {
	browserSync.init({
        server: "./src"
    });
    gulp.watch(['src/*.html', 'src/css/styles.css', 'src/js/scripts.js']).on('change', browserSync.reload);
});

gulp.task('default',['clean'], function() {
	gulp.start('build');
});