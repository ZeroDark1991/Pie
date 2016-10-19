import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
const today = new Date()
const tdArr = [today.getFullYear(), today.getMonth()+1, today.getDate()]

const state = {
    userinfo: {
        signinPop: false,
        basic: '',
    },
    couponlist: [],
    activedcoupons: [],
    chosencoupon: '',
    newslist: [],
    orderlist: [],
    currentorder: {
        startDate: '',
        dayNum: '',
        channelId: '',
    },
    plantform: {
        currentPlantform: {
            name: '爱奇艺',
            bought: true
        },
        plantformList: []
    },
    currentdate: today,
    today: today,
    dirty: []
}

const mutations = {
    // 用户
    ['OPEN_SIGNIN_POP'](state, data){
        state.userinfo.signinPop = data
    },
    ['CLOSE_SIGNIN_POP'](state, data){
        state.userinfo.signinPop = data
    },
    ['SET_USERINFO_BASIC'](state, data){
        state.userinfo.basic = data
    },
    // plantform
    ['SET_CURRENT_PLANTFORM'] (state, data){
        state.plantform.currentPlantform = data
    },
    ['SET_PLANTFORM_LIST'] (state, data){
        state.plantform.plantformList = data
    },
    // orders
    ['SET_ORDER_LIST'] (state, data){
        state.orderlist = data
    },
    ['SET_CURRENT_ORDER'] (state, data){
        state.currentorder = data
    },
    // coupons
    ['SET_COUPON_LIST'] (state, data){
        state.couponlist = data
    },
    ['SET_CHOSENCOUPON'] (state, data){
        state.chosencoupon = data
    },
    ['SET_ACTIVED_COUPONS'] (state, data){
        state.activedcoupons = data
    },    
    // news
    ['SET_NEWS_LIST'] (state, data){
        state.newslist = data
    },
    // dirty check
    ['DIRTYLIST_PUSH'] (state, data){
        state.dirty.push(data)
    },
    ['DIRTYLIST_POP'] (state, data){
        let index = state.dirty.indexOf(data)
        state.dirty.splice(index, 1)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true
})
