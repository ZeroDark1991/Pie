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
    userinfo: {
        signinPop: false,
        basic: '',
    },
    couponlist: [],
    dirty: {
        newslist: true,
    },
    plantform: {
        currentPlantform: {
            name: '爱奇艺',
            bought: true
        },
        plantformList: []
    },
    currentdate: today,
    chosencoupon: ''
}

const mutations = {
    //用户
    ['OPEN_SIGNIN_POP'](state, data){
        state.userinfo.signinPop = data
    },
    ['CLOSE_SIGNIN_POP'](state, data){
        state.userinfo.signinPop = data
    },
    ['SET_USERINFO_BASIC'](state, data){
        state.userinfo.basic = data
    },      
    //plantform
    ['SET_CURRENT_PLANTFORM'] (state, data){
        state.plantform.currentPlantform = data
    },
    ['SET_PLANTFORM_LIST'] (state, data){
        state.plantform.plantformList = data
    },    
    //coupons
    ['SET_COUPONLIST'] (state, data){
        state.couponlist = data
    },
    ['SET_CHOSENCOUPON'] (state, data){
        state.chosencoupon = data
    }
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true
})
