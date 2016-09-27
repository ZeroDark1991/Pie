/*
 * set设置、add添加
 * 洗车订单与其他订单
 */
export const setProductlist_Wash = ({ dispatch }, arr) => {
    dispatch('SET_PRODUCTLIST_WASH', arr)
}

export const addProduct_Wash = ({ dispatch }, arr) => {
    dispatch('ADD_PRODUCT_WASH', arr)
}

export const setProductlist_Rest = ({ dispatch }, arr) => {
    dispatch('SET_PRODUCTLIST_REST', arr)
}

export const addProduct_Rest = ({ dispatch }, arr) => {
    dispatch('ADD_PRODUCT_REST', arr)
}
export const changeProduct_Wash = ({ dispatch }, index,status,orderStatus) => {
    dispatch('CHANGE_PRODUCT_WASH',  index,status,orderStatus)
}

export const changeProduct_Rest = ({ dispatch },  index,status,orderStatus) => {
    dispatch('CHANGE_PRODUCT_REST',  index,status,orderStatus)
}
/*
 * set设置
 * 车辆信息、品牌、车型
 */
export const setCar_store_info = ({ dispatch }, data) => {
	dispatch('SET_CAR_STORE_INFO', data)
}

export const setCar_store_selected_brand = ({ dispatch }, data) => {
	dispatch('SET_CAR_STORE_SELECTED_BRAND', data)
}

export const setCar_store_selected_model = ({ dispatch }, data) => {
	dispatch('SET_CAR_STORE_SELECTED_MODEL', data)
}


/*
 * set设置
 * 登陆用户信息
 */
export const setUser_store_info = ({ dispatch }, data) => {
	dispatch('SET_USER_STORE_INFO', data)
}
export const setUser_su_store_info = ({ dispatch }, data) => {
    dispatch('SET_USER_SU_STORE_INFO', data)
}
/* vip信息*/
export const setVipuser_store_info = ({ dispatch }, data) => {
    dispatch('SET_VIPUSER_STORE_INFO', data)
}