const EventEmitter = require('events')
class _Promise extends EventEmitter{
	constructor(){
		super()
	}
	
	then(fufillHander, errorHandler, progressHandler){
        if(Object.prototype.toString.call(fufillHander) == '[object Function]'){
        	this.once('success',fufillHander)
        }
    	this.once('error',errorHandler)
    	this.on('progress',progressHandler)
	}
}

class Deferred {
	constructor(){
		this.state = 0
		this._Promise = new _Promise()
	}

	resolve(obj){
		this._Promise.emit('success',obj)
	}

	reject(err){
		this._Promise.emit('err',err)
	}

	progress(chunk){
		this._Promise.emit('progress',chunk)
	}
}

const promisify = function(tar) {
    let deferred = new Deferred()
    let result = ''

    tar.setEncoding = 'utf8'
    tar.on('data', chunk => {
    	result += chunk
    	deferred.progress(chunk)
    })

    tar.on('error', err => {
    	deferred.reject(err)
    })

    tar.on('end', () => {
    	deferred.resolve(result)
    })

    return deferred._Promise
}

const fs = require('fs')
let test = fs.createReadStream('hello.js')

promisify(test)
.then(res => {
	console.log(res)
}, err => {
	console.log(err)
}, chunk => {
	console.log(chunk)
})

