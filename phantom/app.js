const Promise = require('bluebird')
const shell = require('./shell')
const agent = require('superagent')
const http = require('http')
const crypto = require('crypto')

const host = 'http://mail.zhanghaopai.com:8080'
let data = ''

let genPass = Promise.promisify(crypto.randomBytes)

genPass(6)
.then(pass => {
    return pass.toString('hex')
})
.then(pass => {
    agent
    .get('http://api.51ym.me/UserInterface.aspx')
    .type('form')
    .query({
        action: 'login',
        username: 'gfnb2000',
        password: 'windows834129'
    })
    .end((err, res) => {
        let token = res.text.replace(/success\|/,'')
        console.log(token)
        agent
        .get(`http://api.51ym.me/UserInterface.aspx`)
        .query({
            action: 'getmobile',
            itemid: 1004,
            token: token
        })
        .end((err,res) => {
            if(err){
                console.log('获取号码失败')
                return
            }
            console.log(res.text)
            let tel = res.text.replace(/success\|/,'')
            shell({ tel: tel, pass: pass, token: token })
        })
    })
})
// .then((pass) => {
//     console.log(`password: ${pass}`)
//     agent
//     .get(`${host}/app2/zhanghaopai/NiumaIqiyiSvr/receiveMobile`)
//     .type('form')
//     .end((err, res) => {
//         res.setEncoding('utf8')
//         res.on('data', chunk => {
//             data += chunk
//         })
//         res.on('end', () => {
//             if(data){
//                 let info = JSON.parse(data)
//                 console.log(info)
//                 if(info.result == 'success'){
//                     shell({ tel: info.mobile, pass: pass })
//                 }
//                 else{
//                     console.log('获取手机信息失败')
//                 }
//             }
//         })
//     })    
// })
.catch((e)=>{
    console.log(e.stack)
    console.log(e.message)
})





