var gulp = require('gulp')
var sftp = require('gulp-sftp')

gulp.task('deploy',function(){
	gulp.src('dist/static/css/*.css')
		.pipe(sftp({
			host: '120.26.225.222',
			user: 'root',
			pass: 'npc3#3com20161007',
			remotePath: '/web/pie/static/css'
		}))

	gulp.src('dist/static/img/*')
	    .pipe(sftp({
		    host: '120.26.225.222',
		    user: 'root',
		    pass: 'npc3#3com20161007',
		    remotePath: '/web/pie/static/img'
	    }))	

	gulp.src('dist/static/js/*.js')
		.pipe(sftp({
			host: '120.26.225.222',
			user: 'root',
			pass: 'npc3#3com20161007',
			remotePath: '/web/pie/static/js'
		}))	

	gulp.src('dist/*')
		.pipe(sftp({
			host: '120.26.225.222',
			user: 'root',
			pass: 'npc3#3com20161007',
			remotePath: '/web/pie'
		}))		
})