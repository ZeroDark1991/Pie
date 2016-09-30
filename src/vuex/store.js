import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/* @params
 * car_store: 存储车辆管理 => 增加车辆里需要的信息
 * 
 * 
 */
 
const today = new Date()
const currentdate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: today.getHours()
}

const state = {
    user_store:null,
    car_store: {
        info: null,
        selected_brand: null,
        selected_model: null,
    },
    dirty: {
        newslist: true,
    },
    currentdate,
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
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true
})
