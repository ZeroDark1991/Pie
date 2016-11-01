var gulp = require('gulp')
var sftp = require('gulp-sftp')

var rootPro = '118.178.129.34',
    passPro = '123123FFFfff',
    dirPro = '/web';

var rootDev = '120.26.77.94',
    passDev = '123123FFFfff',
    dirDev = '/web/workspace/powerbos/wx/zhanghaopai';

gulp.task('deployNginx', function(){
	gulp.src('server/nginx.conf')
	    .pipe(sftp({
			host: rootPro,
			user: 'root',
			pass: passPro,
			remotePath: '/etc/nginx'	    	
	    }))

	gulp.src('server/proxy.conf')
        .pipe(sftp({
		    host: rootPro,
		    user: 'root',
		    pass: passPro,
		    remotePath: '/etc/nginx/conf.d'	    	
        }))
})

gulp.task('deploy',function(){
	gulp.src('dist/static/css/*.css')
		.pipe(sftp({
			host: rootPro,
			user: 'root',
			pass: passPro,
			remotePath: dirPro+'/static/css'
		}))

	gulp.src('dist/static/img/*')
	    .pipe(sftp({
		    host: rootPro,
		    user: 'root',
		    pass: passPro,
		    remotePath: dirPro+'/static/img'
	    }))	

	gulp.src('dist/static/js/*.js')
		.pipe(sftp({
			host: rootPro,
			user: 'root',
			pass: passPro,
			remotePath: dirPro+'/static/js'
		}))	

	gulp.src('dist/*')
		.pipe(sftp({
			host: rootPro,
			user: 'root',
			pass: passPro,
			remotePath: dirPro
		}))		
})

gulp.task('deployPages',function(){
	gulp.src('web_page/dist/*')
		.pipe(sftp({
			host: rootPro,
			user: 'root',
			pass: passPro,
			remotePath: dirPro+'/web_page/dist'
		}))

	gulp.src('web_page/imgs/*')
		.pipe(sftp({
			host: rootPro,
			user: 'root',
			pass: passPro,
			remotePath: dirPro+'/web_page/imgs'
		}))

	gulp.src('web_page/share/*')
		.pipe(sftp({
			host: rootPro,
			user: 'root',
			pass: passPro,
			remotePath: dirPro+'/web_page/share'
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