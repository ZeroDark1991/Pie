var gulp = require('gulp')
var babel = require("gulp-babel")
var rename = require("gulp-rename")
var uglify = require('gulp-uglify')

gulp.task("share",function(){
	return gulp.src('share/share.js')
	    .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname:'.min.js' }))
	    .pipe(gulp.dest('dist'))
})

gulp.watch('share/share.js',['share'])