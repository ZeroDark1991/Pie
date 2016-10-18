
export const get = function(uri, options){
    // 全局progressing bar
    this.$Progress.start()
    return this.$http.get(uri, options)
    .then(
        (res) => successHandler.bind(this)(res),
        (res) => errorHandler.bind(this)(res)
    )
}

export const post = function(uri, body, options){
    this.$Progress.start()

    // 后端无法直接接受json格式
    // post方式在请求体中发送json时，content-type会设置成json 覆盖掉全局中设置的common headers
    // 需要每次加入[content-type:application/x-www-form-urlencoded;]请求头

    let config = {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }

    if(options && typeof options == 'object'){
        if(options.headers){
            //合并options中传入的headers
            options.headers = Object.assign({},config.headers,options.headers)
        }
        Object.assign(config, options)
    }

    return this.$http.post(uri, body, config)
    .then(
        (res) => successHandler.bind(this)(res),
        (res) => errorHandler.bind(this)(res)
    )
}

function successHandler({ data }){
    this.$Indicator.close()
    this.$Progress.finish()
    let res = JSON.parse(data)
    let result = res.result
    let errorCode = parseInt(res.errorCode)

    if(result == "faild"){
        this.$Toast(res.message)
        if(errorCode <= 20){
            this.$Toast('请先登录')
            if(this.openSignInPop){
                this.openSignInPop()
            }
        }
        return false
    }
    return res
}

function errorHandler({ data }){
    this.$Indicator.close()
    this.$Progress.fail()
    this.$Toast('连接超时')
    this.$Indicator.close()
    return false
}