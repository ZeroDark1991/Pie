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
            <mt-spinner type="triple-bounce" color="#f56f1c" :size="20"></mt-spinner>
        </div> -->
        <template  v-if='couponlist.length == 0'>
            <div class="text-center" style="margin-top: 1rem">
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
    </div>  
</div>  
</template>

<script>
import Service from '../service'
import Coupon from '../components/coupon.vue'
export default {
    data () {
        return {
            couponlist:[
                {
                    type: '',
                    content: '爱奇艺2元抵用券',
                    date: '2016.9.1-2016.12.1'
                },
                {
                    type: '',
                    content: '爱奇艺0.2元抵用券',
                    date: '2016.9.1-2016.12.1'
                }                
            ]
        }
    },
    components:{
        Coupon
    },
    methods:{
    },
    created(){
    },
    route: {
        data ({ to,next }) {
            // return Service.bind(this)('powerShop', 'UserCouponFetch', '')
            // .then((data) => {
            //     console.log(data)
            //     //Write callBack codes here!
            // })
            next()
        },//页面加载完成执行
        deactivate ({ next }) {
            //Triggers when component destroys
            next()
        }
    }  
}
</script>

<style scoped lang="stylus">
.loading
    margin-top -0.5rem
    margin-bottom 1rem
</style>