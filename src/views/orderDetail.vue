<template>
<div  class="page">
    <mt-header fixed title="订单详情">
      	<mt-button @click="$back('/orderlist')" class="left" slot="left">
            <span class="iconfont">&#xe609;</span> 
        </mt-button>
    </mt-header>

    <div class="container-top">
  
      <!-- 订单状态  v-if=""  -->
        <div v-if="orderDetail.status==40" class="orderStatus bk-green text-center">已完成</div>
        <div v-if="orderDetail.status==10" class="orderStatus bk-green text-center">已支付</div>
        <div v-if="orderDetail.status==-1" class="orderStatus bk-steelgrey text-center">已取消</div>
        <div v-if="orderDetail.status==0" class="orderStatus  bk-steelgrey text-center">未付款</div>

      <!-- 订单详情 -->
        <div>
            <mt-cell title="订单编号" :value="orderDetail.orderId"></mt-cell>
            <mt-cell title="下单时间" :value="orderDetail.orderTime"></mt-cell>
            <mt-cell title="订单总额" :value="orderDetail.total"></mt-cell>
        </div>

      <!-- 产品明细 -->
        <div class="block">
            <mt-cell style="font-weight:bold;" title="产品明细"></mt-cell>
            <mt-cell :title="orderDetail.itemDescription?orderDetail.itemDescription:''"></mt-cell>
        </div>

      <!-- 支付信息 -->
        <div class="block">
            <mt-cell style="font-weight:bold;" title="支付信息"></mt-cell>
            <mt-cell title="应付金额" :value="orderDetail.factTotal"></mt-cell>
            <mt-cell
                title="优惠券"
                class="text-red"
                :value="orderDetail.coupon.amount?'-'+orderDetail.coupon.amount:''">
                <!-- <span class="text-steelgrey">{{chosenCouponValue}}</span> -->
            </mt-cell>
        </div>
    </div>
      <!-- 去支付 v-if="" -->
    <div v-if="orderDetail.status==0" class="bottom-bar">
        <div class='text-right bk-white'>
            <span>合计：{{orderDetail.factTotal}}</span>
            <a class="goPay bk-green" @click="$go('/pay',orderId)">立即支付</a>
        </div>
    </div>  
</div>  
</template>

<script>
import { setChosenCoupon } from '../vuex/actions'
import { clearState } from 'src/util'
export default {
    vuex:{
        getters:{
            couponlist: state => state.couponlist,
            chosenCoupon: state => state.chosencoupon
        },
        actions:{
            setChosenCoupon
        }
    },
	data () {
	    return {
	        backRoute: '',
	        orderDetail:{
                status: null,
                coupon: {},
                itemDescription: null,
                orderId: null,
                orderTime: null,
                total: null,
                factTotal: null
	        },
	        orderId:'',
            activecoupons:[]
	    }
	},
    computed:{
        chosenCouponValue(){
            let activeCouponsAmount = this.activecoupons.length
            if(activeCouponsAmount > 0 && this.chosenCoupon)
                // 根据选中的优惠券的id取出内容
                return this.couponlist.find(item => item.id == this.chosenCoupon)
            else
                // 判断当前订单是否有可用优惠券
                return activeCouponsAmount > 0 ? `${activeCouponsAmount}张可用` : '无可用优惠券'
        }
    },
	methods:{
	    openPOP(){
	        this.popupVisible = true
	    },
        chooseCoupon(){
            if(this.activecoupons.length > 0) this.$go('/activecoupons')
            else return
        },
        clear(){
            clearState(this.orderDetail)
        }
	},
    created(){},
    route: {
        data ({from, to, next}){
            let orderId = to.params.orderId
            // if(from.path){
            //     //微信环境中from.path带上了额外的query属性，所以需要substring之后判断
            //     if(from.path.substring(0,6) == "/order") this.backRoute = '/orderlist'
            //     else this.backRoute = '/home'
            // }
            // else{
            //     this.backRoute = '/home'
            // }
            this.$$get('/app2/powerShop/UserOrderSvr/info',{
                params: {
                    id: orderId
                }
            })
            .then((data)=>{
                console.log(data)
                if(data.obj){
                    let res = data.obj
                    this.orderDetail.status= res.status,
                    this.orderDetail.coupon= res.coupon,
                    this.orderDetail.itemDescription= res.itemDescription,
                    this.orderDetail.orderId= res.orderId,
                    this.orderDetail.orderTime= res.orderTime,
                    this.orderDetail.total= res.total,
                    this.orderDetail.factTotal= res.factTotal                    
                }
            })
        	next()
        },
        deactivate ({ to, next }) {
            // 清除订单内容
            this.clear()
            next()
        }
	} 
}
</script>

<style lang="stylus" scoped>
.orderStatus
    color:#fff
    font-size: .8rem
    height:2.2rem
    line-height:2.2rem
.bottom-bar
	position: absolute
	bottom: 0
	width: 100%
.block
    margin-top:0.5rem
.goPay
    display:inline-block
    margin-left:1rem
    padding:0.6rem 1rem
    color:#fff
.obtn
    display:inline-block
    margin-left:0.5rem
    font-size:0.9rem
    padding:0.2rem 0.8rem
    color:#33d29f
    border:1px solid #33d29f
    border-radius:0.5rem
.orderDBTN
    margin-left:0.5rem
    border:1px solid #33d29f
    color:#33d29f
.mint-cell:before
    height: 1px
.mint-header.is-fixed
    z-index: 100000
</style>