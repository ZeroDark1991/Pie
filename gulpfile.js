var gulp = require('gulp')
var sftp = require('gulp-sftp')
var rootDev = '120.26.77.94',
    passDev = '123123FFFfff',
    dirDev = '/web/workspace/powerbos/wx/zhanghaopai';

gulp.task('deploy',function(){
	gulp.src('dist/static/css/*.css')
		.pipe(sftp({
			host: '118.178.129.34',
			user: 'root',
			pass: 'npc3#3com20161007',
			remotePath: '/web/static/css'
		}))

	gulp.src('dist/static/img/*')
	    .pipe(sftp({
		    host: '118.178.129.34',
		    user: 'root',
		    pass: 'npc3#3com20161007',
		    remotePath: '/web/static/img'
	    }))	

	gulp.src('dist/static/js/*.js')
		.pipe(sftp({
			host: '118.178.129.34',
			user: 'root',
			pass: 'npc3#3com20161007',
			remotePath: '/web/static/js'
		}))	

	gulp.src('dist/*')
		.pipe(sftp({
			host: '118.178.129.34',
			user: 'root',
			pass: 'npc3#3com20161007',
			remotePath: '/web'
		}))		
})

gulp.task('deployDev',function(){
	gulp.src('dist/static/css/*.css')
		.pipe(sftp({
			host: rootDev,
			user: 'root',
			pass: passDev,
			remotePath: dirDev + '/static/css'
		}))

	gulp.src('dist/static/img/*')
	    .pipe(sftp({
		    host: rootDev,
		    user: 'root',
		    pass: passDev,
		    remotePath: dirDev + '/static/img'
	    }))	

	gulp.src('dist/static/js/*.js')
		.pipe(sftp({
			host: rootDev,
			user: 'root',
			pass: passDev,
			remotePath: dirDev + '/static/js'
		}))	

	gulp.src('dist/*')
		.pipe(sftp({
			host: rootDev,
			user: 'root',
			pass: passDev,
			remotePath: dirDev
		}))		
})