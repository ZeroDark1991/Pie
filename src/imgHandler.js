export default function(id, extend, _seq, width, height, type='png'){
	/* @params
	 * 文件id 扩展名extend 宽度width 高度height
	 * 版本戳 _seq
	 * 转换图片格式type（选填）
	 */
	 
	if(!width || !height){
		console.log('未设置宽高')
		return
	}

	let imgUrl

	if(!extend){
		imgUrl = "http://img.sayogi.cn/product_sort_v1.0.png"+"@"+width+"w_"+height+"h_1e_1c_90Q."+type
	}else{
		imgUrl = _seq?"http://img.sayogi.cn/"+id+"_"+_seq+"."+extend+"@"+width+"w_"+height+"h_1e_1c_90Q."+type
					:"http://img.sayogi.cn/"+id+"."+extend+"@"+width+"w_"+height+"h_1e_1c_90Q."+type
	}
	
	return imgUrl
}