import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* @params
 * car_store: 存储车辆管理 => 增加车辆里需要的信息
 * 
 * productlist_wash: 洗车订单列表
 * productlist_rest: 其他订单列表
 */

const state = {
    user_store:null,
    user_su_store:null,
    vipuser_store:null,
    car_store: {
        info: null,
        selected_brand: null,
        selected_model: null,
    }
}

const mutations = {
    //用户
    ['SET_USER_STORE_INFO'] (state, data) {
        state.user_store = data
    },
    ['SET_USER_SU_STORE_INFO'] (state, data) {
        state.user_su_store = data
    },
    //用户vip
    ['SET_VIPUSER_STORE_INFO'] (state, data) {
        state.vipuser_store = data
    },
    //车
    ['SET_CAR_STORE_INFO'] (state, data) {
        state.car_store.info = data
    },
    ['SET_CAR_STORE_SELECTED_BRAND'] (state, data) {
        state.car_store.selected_brand = data
    },
    ['SET_CAR_STORE_SELECTED_MODEL'] (state, data) {
        state.car_store.selected_model = data
    },
    //洗车
    ['SET_PRODUCTLIST_WASH'] (state, arr) {
        state.productlist_wash = arr
    },
    ['ADD_PRODUCT_WASH'] (state, arr) {
        let newArr = state.productlist_wash.concat(arr)
        state.productlist_wash = newArr
    },
    ['CHANGE_PRODUCT_WASH'] (state,index,status,orderStatus) {
        state.productlist_wash[index].status = status;
        state.productlist_wash[index].orderStatus = orderStatus;
    },
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true
})
