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