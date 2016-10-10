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
        <template  v-if='activeCouponlist.length == 0'>
            <div class="text-center" style="margin-top: 1rem">
                <span>暂无可用优惠券</span>
            </div>            
        </template>
        <template v-else>
            <div v-for='coupon in activeCouponlist'>
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
import Coupon from '../components/coupon.vue'
import { setCouponList, setChosenCoupon } from '../vuex/actions'
export default {
    vuex:{
        getters: {
            couponlist: state => state.couponlist,
        },
        actions: {
            setCouponList,
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
    		this.$back('/orderdetail','123123')
    	}
    },
    created(){
    	if(this.couponlist.length == 0)
    		//取得所有的优惠券 存入store
    	    this.setCouponList([
                {
                    id: '001',
                    type: '',
                    content: '爱奇艺2元抵用券',
                    date: '2016.9.1-2016.12.1'
                },
                {
                    id: '002',
                    type: '',
                    content: '爱奇艺0.2元抵用券',
                    date: '2016.9.1-2016.12.1'
                }                
            ])    	
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