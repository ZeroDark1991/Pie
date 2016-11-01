const express = require('express')
const app = express()

const Promise = require('bluebird')

const co = require('co')
const OSS = require('ali-oss')

const bodyparser = require('body-parser')
const fs = require('fs')
const path = require('path')
const agent = require('superagent')
const streamBuffers = require('stream-buffers')

const port = 8080
let folderName = 'sayogi_assets/'

const _host = 'http://mail.zhanghaopai.com:8080'
// let boundaryKey = '----' + new Date().getTime()

// const options = {
// 	hostname: 'win.sayogi.cn',
//     port: 80,
//     path: '/yunma',
//     method: 'POST',
//     headers: {
//         'Content-Type':'multipart/form-data; boundary=' + boundaryKey,
//         'Connection':'keep-alive'
//     }
// }

// const _req = http.request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     console.log(res)
//     res.setEncoding('utf8');
//     res.on('data', (chunk) => {
//         console.log(`BODY: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('No more data in response.');
//     });
// });

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/user', (req, res) => {
	let dir = path.join(__dirname, '/validImg/valid.png')
	res.sendFile(dir)
})

app.post('/base', (req, res) => {
	// let b = new Buffer(req.body.base64, 'base64')

	// let dir = path.join(__dirname, '/validImg/base.png')
	// let imgStream = new streamBuffers.ReadableStreamBuffer({
 //        frequency: 10,   // in milliseconds.
 //        chunkSize: 1024  // in bytes.
 //    })
 //    imgStream.put(b)

    let fileName = req.body.filename
    console.log(fileName)

    const client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: '20zm7ZPhdbrT6nmm',
        accessKeySecret: 'qMUs7hvOU9hVf8Hx7PQd1v5ESvCbjg',
        bucket: 'sayoogi'
    })

    co(function* () {
        let stream = fs.createReadStream(path.join(__dirname, fileName))
        let result = yield client.putStream(folderName + fileName, stream)
        console.log(result)
        
        if(result.url){
        	res.json({ success: true, url: result.url })
        	// res.send(result.url)
        }else{
        	res.json({ success: false })
        }
 
    })
    .catch(function (err) {
        console.log(err)
    })

	// let fileTarStream = fs.createWriteStream(dir)
	// imgStream.pipe(fileTarStream)

	// fileTarStream.on('data', (chunk)=>{
 //    	console.log(chunk)
 //    })


    // fs.writeFile(dir, b, (err) => {
    //     if (err) throw err
    //     console.log('It\'s saved!')

    //     // superagent 请求

    //     // let _request = agent
    //     //     .post(`${_host}/yunma`)
    //     //     .set('Content-Type', 'multipart/form-data;boundary=' + boundaryKey)
    //     //     .type('image/png')
            
    //     // imgStream.pipe(_request)    
    //     // imgStream.on('end',() => {
    //     //     _request.end((err, response) => {
    //     // 	    if (err) throw err
    //     //         console.log(response.body)
    //     //         res.json({ success: true, valid: 'wezd', poweredBy: 'Express'})
    //     //     }
    //     // })

    // })

})

app.listen(port,() => {
	console.log('listening at ' + port)
})