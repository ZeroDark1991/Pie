require('shelljs/global')

module.exports = function(arg){
    if(test('-f','hello.js')){
    	if(Object.prototype.toString.call(arg) == '[object Object]'){

    		let params = Object.keys(arg).map(item => `--${item}=${arg[item]}`).join(' ')

    	    // exec("phantomjs hello.js")
    	    exec(`casperjs casper.js --web-security=no ${params}`)
    	}
    }
}
