export default function(sys, action, json){
    return this.$http.post('/app', json, {
        headers: {
			'sys'    : sys,
			'type'   : action,
			'Content-Type'   : "application/x-www-form-urlencoded;charset=utf-8",
			'appKey' : 'd1efc217bc816feeed3d0524cc3b8ecd', 
			'appSercret' : '2/GIAD798eD92L8QkLEQqQ'
        }
    })
    .then(({ data }) => {
    	let res = JSON.parse(data)
    	let result = res.result
    	let errorCode = parseInt(res.errorCode)

    	if(result == "faild"){
			this.$Toast(res)
			if(errorCode<=20){
				this.$Toast('请先登录')
			}
			return false
    	}
		return res
	},({ data }) => {
        this.$Toast('连接超时')
        this.$Indicator.close()
        return false
    })
}