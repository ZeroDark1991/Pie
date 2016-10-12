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

export const setPlantformList = ({dispatch}, data) => {
    dispatch('SET_PLANTFORM_LIST', data)
}

/*
 * set设置
 * 登陆用户信息
 */
export const openSignInPop = ({ dispatch }) => {
	dispatch('OPEN_SIGNIN_POP', true)
}

export const closeSignInPop = ({ dispatch }) => {
	dispatch('CLOSE_SIGNIN_POP', false)
}

export const setUserInfoBasic = ({ dispatch }, data) => {
	dispatch('SET_USERINFO_BASIC', data)
}