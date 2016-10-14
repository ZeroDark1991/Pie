<template>
<div class="page">
    <mt-header fixed title="我的优惠券">
      	<mt-button @click="$back('/orderdetail','123123')" class="left" slot="left">
            <span class="iconfont">&#xe609;</span>  
        </mt-button>
    </mt-header>
    <!-- data is loading --> 
    <div class="content container-top">
<!--         <div v-if="$loadingRouteData" class="loading">
            <mt-spinner type="triple-bounce" color="#f56f1c" :size="20"></mt-spinner>
        </div> -->
        <template  v-if='activedcoupons.length == 0'>
            <div class="text-center" style="margin-top: 1rem">
                <span>暂无可用优惠券</span>
            </div>            
        </template>
        <template v-else>
            <div v-for='coupon in activedcoupons'>
                <coupon
                    :coupon= "coupon"
                    @click= "chooseCoupon(coupon.id)"
                    >
                </order>
            </div>
        </template>
    </div>  
</div>  
</template>

<script>
import Coupon from 'components/coupon.vue'
import {
    setChosenCoupon
} from '../vuex/actions'
export default {
    vuex:{
        getters: {
            couponlist: state => state.couponlist,
            activedcoupons: state => state.activedcoupons
        },
        actions: {
            setChosenCoupon
        }
    },
    data () {
        return {
        }
    },
    computed:{
        activeCouponlist(){
        	return this.couponlist.map(item => {
                if(item.id) return item
        	})
        }
    },
    components:{
        Coupon
    },
    methods:{
    	chooseCoupon(id){
    		this.setChosenCoupon(id)
    		this.$back('/confirmorder')
    	}
    },
    created(){
        if(this.activedcoupons.length ==0) this.$go('/home')  	
    },
    route: {
        data ({ to,next }) {
            next()
        },
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