var page = require('webpage').create()
var sys = require('system')
var quit = function(){
	phantom.exit()
}
page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
}
// page.onResourceReceived = function(response) {
//   console.log('Receive ' + JSON.stringify(response, undefined, 4));
// };
page.onConsoleMessage = function(msg) {
    console.log(msg)
}
page.open('http://www.imooc.com',function (status){
	console.log(status)
	setTimeout(function (){
	    page.includeJs('//cdn.bootcss.com/jquery/2.0.1/jquery.min.js',function (){
            page.evaluate(function (){
            	console.log(document.title)
    	        $('.item').first().click()
            })
            
            // setInterval(function(){
        	   //  if(res == false) quit()
            // },1000)
	    })        
	},5000)
})