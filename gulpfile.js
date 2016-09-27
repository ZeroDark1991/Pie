var gulp = require('gulp')
var sftp = require('gulp-sftp')

gulp.task('deploy',function(){
	gulp.src('dist/static/css/*.css')
		.pipe(sftp({
			host: '120.26.77.94',
			user: 'root',
			pass: '123123FFFfff',
			remotePath: '/web/workspace/powerbos/wap_sayogi_custom/center/static/css'
		}))

	gulp.src('dist/static/img/*')
	.pipe(sftp({
		host: '120.26.77.94',
		user: 'root',
		pass: '123123FFFfff',
		remotePath: '/web/workspace/powerbos/wap_sayogi_custom/center/static/img'
	}))	

	gulp.src('dist/static/js/*.js')
		.pipe(sftp({
			host: '120.26.77.94',
			user: 'root',
			pass: '123123FFFfff',
			remotePath: '/web/workspace/powerbos/wap_sayogi_custom/center/static/js'
		}))	

	gulp.src('dist/*')
		.pipe(sftp({
			host: '120.26.77.94',
			user: 'root',
			pass: '123123FFFfff',
			remotePath: '/web/workspace/powerbos/wap_sayogi_custom/center'
		}))		
})

gulp.task('deployQa',function(){
	gulp.src('dist/static/css/*.css')
		.pipe(sftp({
			host: '121.40.250.161',
			user: 'root',
			pass: '123123FFFfff',
			remotePath: '/web/workspace/powerbos/wap_sayogi_custom/center/static/css'
		}))

	gulp.src('dist/static/img/*')
	.pipe(sftp({
		host: '121.40.250.161',
		user: 'root',
		pass: '123123FFFfff',
		remotePath: '/web/workspace/powerbos/wap_sayogi_custom/center/static/img'
	}))	

	gulp.src('dist/static/js/*.js')
		.pipe(sftp({
			host: '121.40.250.161',
			user: 'root',
			pass: '123123FFFfff',
			remotePath: '/web/workspace/powerbos/wap_sayogi_custom/center/static/js'
		}))	

	gulp.src('dist/*')
		.pipe(sftp({
			host: '121.40.250.161',
			user: 'root',
			pass: '123123FFFfff',
			remotePath: '/web/workspace/powerbos/wap_sayogi_custom/center'
		}))		
})