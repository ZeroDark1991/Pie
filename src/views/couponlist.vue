<template>
<div class="page">
    <mt-header fixed title="我的优惠券">
      	<mt-button @click="$back('/settings')" class="left" slot="left">
            <span class="iconfont">&#xe609;</span>  
        </mt-button>
    </mt-header>
    <!-- data is loading --> 
    <div class="content container-top">
<!--         <div v-if="$loadingRouteData" class="loading">
            <mt-spinner type="snake" color="#555" :size="26"></mt-spinner>
        </div> -->
        <template  v-if='couponlist.length == 0 && !$loadingRouteData'>
            <div class="text-center" style="margin-top: 2rem;height: 3rem">
                <span>暂无可用优惠券</span>
            </div>            
        </template>
        <template v-else>
            <div v-for='coupon in couponlist'>
                <coupon
                    :coupon= "coupon"
                    >
                </coupon>
            </div>
        </template>
        <div v-if="!$loadingRouteData" class="flex-center" style="margin: 1rem">
            <span class="text-grey" @click="CheckInValid()">
                查看失效券>>
            </span>
        </div>
    </div>
    <mt-popup
        :visible.sync="popupInValideCoupon"
        position="right"
        style="width:100%;height: 100%">
        <mt-header fixed title="失效优惠券">
            <mt-button @click="popupInValideCoupon = false" class="left" slot="left">
                <span class="iconfont">&#xe609;</span>  
            </mt-button>
        </mt-header>
        <div
            class="container-top invalid-container"
            v-infinite-scroll="loadMoreInvalid()"
            infinite-scroll-disabled="InValideCoupons.loading"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="20">
            <coupon
                v-for="item in InValideCoupons.list"
                :coupon= "item"
                :invalid= "true"
                >
            </coupon>
            <div v-show="loading" style="padding: 1rem 0">
                <mt-spinner class="flex-center" type="snake"></mt-spinner>
                <div class="flex-center">加载中..</div>
            </div>
            <div
                class="text-center text-grey top-gap"
                v-if="InValideCoupons.page.currentPage == InValideCoupons.page.maxPage">
                没有更多了
            </div>
        </div>        
    </mt-popup>
</div>  
</template>

<script>
import Coupon from 'components/coupon.vue'
import { setCouponList } from '../vuex/actions'
export default {
    vuex:{
        getters: {
            couponlist: state => state.couponlist,
        },
        actions: {
            setCouponList
        }
    },
    data () {
        return {
            popupInValideCoupon: false,
            loading: true, // 底部加载锁 
            InValideCoupons:{
                list:[],
                page:{
                    currentPage: 1,
                    maxPage: '',
                },
            }
        }
    },
    components:{
        Coupon
    },
    methods:{
        updateData(){

        },
        CheckInValid(){
            // 第一次请求过期数据
            this.$$get('/app2/powerShop/UserCouponSvr/fetchInvalid')
            .then((data)=>{
                if(data.list) this.InValideCoupons.list = data.list
                if(data.page){
                    this.InValideCoupons.page.currentPage = data.page.currentPage
                    this.InValideCoupons.page.maxPage = data.page.maxPage
                    this.loading = false
                }
            })
            this.popupInValideCoupon = true
        },
        loadMoreInvalid(){
            // 滚动到底部触发加载
            // 达到最大页面数量时无效
            if(this.InValideCoupons.page.currentPage >= this.InValideCoupons.page.maxPage) return
            console.log('trigger loadmore function')
            this.loading = true
            this.$$get('/app2/powerShop/UserCouponSvr/fetchInvalid',{
                params: {
                    'page.currentPage': ++this.InValideCoupons.page.currentPage
                }
            })
            .then((data)=>{
                console.log(data)
                if(data.list){
                    this.InValideCoupons.list = this.InValideCoupons.list.concat(data.list)
                    this.InValideCoupons.page.maxPage = data.page.maxPage
                    // DOM更新之后再关闭打开loading锁 防止更新数据时多次触发
                    this.$nextTick(() => this.loading = false) 
                }
            })
        }
    },
    created(){
    },
    route: {
        data ({ to,next }) {
            this.$$get('/app2/powerShop/UserCouponSvr/listUnused')
            .then((data)=>{
                if(data.list) this.setCouponList(data.list)
                next()
            })
        },
        deactivate ({ next }) {
            //Triggers when component destroys
            next()
        }
    }  
}
</script>

<style scoped lang="stylus">
.loadingRouteData
    position absolute
    width 100%
    height 100%
.loading
    margin: 5px auto
    width 2rem
.invalid-container
    background-color #f2f2f2    
</style>