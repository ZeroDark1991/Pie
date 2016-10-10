//Coupons actions
export const setCouponList =({dispatch}, data) => {
	dispatch('SET_COUPONLIST', data)
}
export const setChosenCoupon = ({dispatch}, data) => {
	dispatch('SET_CHOSENCOUPON', data)
}
//Plantforms actions
export const setCurrentPlantform = ({dispatch}, data) => {
    dispatch('SET_CURRENT_PLANTFORM', data)
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