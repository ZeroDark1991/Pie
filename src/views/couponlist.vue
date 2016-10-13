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
                </order>
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
        <span @click="popupInValideCoupon = false">close</span>
    </mt-popup>
</div>  
</template>

<script>
import Service from '../service'
import Coupon from '../components/coupon.vue'
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
            popupInValideCoupon: false
        }
    },
    components:{
        Coupon
    },
    methods:{
        updateData(){

        },
        CheckInValid(){
            this.$$get('/app2/powerShop/UserCouponSvr/fetchInvalid')
            .then((data)=>{
                console.log(data)
            })
            this.popupInValideCoupon = true
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
</style>