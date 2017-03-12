/**

*/

var gulp = require('gulp');

//自动编译 压缩LESS
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
gulp.task('style',function(){
	gulp.src('src/css/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dest/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

//合并JS文件
var concat = require('gulp-concat');
gulp.task('script',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dest/js'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

//压缩HTML
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true
	}))
	.pipe(gulp.dest('dest/'))
	.pipe(browserSync.reload({  //内容变化时刷新页面
		stream: true
	}));

});

//配置本地服务器
var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server: ['dest']  //根目录
	}, 
	function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});

	//监听
	gulp.watch('src/css/*.less',['style']);
	gulp.watch('src/js/*.js',['script']);
	gulp.watch('src/*.html',['html']);

});
