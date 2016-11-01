var sys = require('system')
var casper = require('casper').create({
    // clientScripts:  [
    //     'http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js',
    // ],
    verbose: true,
    logLevel: "debug",
    viewportSize:{width:1280, height:720}
})

var host = 'http://win.sayogi.cn'
var testhost = 'http://localhost:8080'
var api = '/app2/console/DistinguishSvr/windows'
var testapi = '/base'

var globalArgs = sys.args
var params = {}

if(globalArgs.length <= 4){
    console.log('未传入参数')
}else{
    globalArgs.forEach(function(item, index) {
        if(index > 3){
            var p = item.replace(/\-/g,'').split('=')
            params[p[0]] = p[1]
        }
    })
}

var tel = params.tel, pass = params.pass, token = params.token;
console.log('tel ===== '+ tel)
console.log('pass ===== '+ pass)
// Opens casperjs homepage
casper.start('http://passport.iqiyi.com/pages/register/index.action')

// casper.then(function(){
// 	this.click('div.usrTx-register a')
// })

casper.wait(1000, function() {
    this.echo("I've waited for a second.")
})

// casper.then(function(){
//     this.click('span.free-yzm-get a')
// })

casper.then(function(){
    console.log(this.getTitle())
    var filename = 'validImg/valid' + ((new Date()).getMilliseconds() + Math.floor(Math.random()*100)) + '.png'
    this.captureSelector(filename, 'div.yzmPicBox')
    var base = this.captureBase64('png', 'div.yzmPicBox')
    var data = this.evaluate(function(local, base, filename) {
        return __utils__.sendAJAX(local, 'POST', { base64: base, filename: filename }, false)
    },
    {
        local: testhost + testapi,
        base: base,
        filename: filename
    })
    var reqUrl = JSON.parse(data).url

    console.log(reqUrl)
    var result = this.evaluate(function(url, valid) {
        return __utils__.sendAJAX(valid+'?url='+url+'&codetype=1004', 'GET', null, false)
    },{
        url: reqUrl,
        valid: host + '/app2/console/DistinguishSvr/windowsUrl'
    })

    console.log('valid-code callback: ======= ' + result)
    if(result.code){
        this.sendKeys('input#j-mail', tel)
        this.sendKeys('input#j-passwd', pass)
        this.sendKeys('input.J_code-phoder', pass)
        this.click('span.free-yzm-get a')
        console.log('==== @@@@  获取短信准备 @@@@ ====')
    }
})

casper.wait(2000, function() {
    this.echo("I've waited for 2 seconds.")
})

casper.then(function(){
    var ifReady = this.evaluate(function(){
        return __utils__.visible('span.free-yzm-get a')
    })
    if(ifReady){
        console.log('==== @@@@  短信已发出  @@@@ ====')
        var message = this.evaluate(function(tel,token){
            var url = '/app2/zhanghaopai/NiumaIqiyiSvr/receiveSMCodeForIqiyi?mobile=' + tel
            return __utils__.sendAJAX(url,'GET',null,false)
        },{
            tel: tel,
            token: token
        })
        console.log('短信验证码为：' + message)
        if(message){
            this.sendKeys('div.freeYzmGetBox input.text0', message)
            this.click('div.bindBlock a.site-btn')
        }
    }
})

casper.wait(2000, function() {
    this.echo("I've waited for 2 seconds.")
})

casper.then(function(){
	console.log(this.getCurrentUrl())
})

casper.run()