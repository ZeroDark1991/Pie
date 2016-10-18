export const clearState = function(tar){
    let keys = Object.keys(tar)
    if(keys.length == 0) return
    keys.forEach(function(item){
        if(Object.prototype.toString.call(tar[item]) == '[object Object]'){
            clearState(tar[item])
        }
        else
            tar[item] = null
    })
}

export const caculateDate = {
	one : 60*60*24,
	plus(val, plusNum, origin, max=30){
        let ruler = origin || new Date()
        // 当前日期小于指标日期
        let valid = (val - ruler)/(this.one*1000) < max
        if(valid){
        	return new Date((val/1000+this.one*plusNum)*1000)
        }
        else{
        	return false
        }
	},
	minus(val, minusNum, origin, max=0){
        let ruler = origin || new Date()
        // 目标日期必须大于当前日期 或相隔指定的max值
        let valid = (val - ruler)/(this.one*1000) > 0
        if(valid){
        	return new Date((val/1000-this.one*minusNum)*1000)
        }
        else{
        	return false
        }
	}
}