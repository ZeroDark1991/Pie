//Order actions
export const setOrderList = ({dispatch}, data) => {
	dispatch('SET_ORDER_LIST', data)
}
export const setCurrentOrder = ({dispatch}, data) => {
	dispatch('SET_CURRENT_ORDER', data)
}

//News actions
export const setNewsList = ({dispatch}, data) => {
	dispatch('SET_NEWS_LIST', data)
}

//Coupons actions
export const setCouponList =({dispatch}, data) => {
	dispatch('SET_COUPON_LIST', data)
}
export const setChosenCoupon = ({dispatch}, data) => {
	dispatch('SET_CHOSENCOUPON', data)
}
export const setActivedCoupons = ({dispatch}, data) => {
	dispatch('SET_ACTIVED_COUPONS', data)
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

/*
 * 脏检查
 */
export const dirtyListPush = ({ dispatch }, data) => {
    dispatch('DIRTYLIST_PUSH', data)
}

export const dirtyListPop = ({ dispatch }, data) => {
    dispatch('DIRTYLIST_POP', data)
}