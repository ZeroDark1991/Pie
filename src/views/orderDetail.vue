<template>
<div  class="page">
    <mt-header fixed title="订单详情">
      	<mt-button @click="$back(backRoute)" class="left" slot="left">
            <span class="iconfont">&#xe609;</span> 
        </mt-button>
    </mt-header>

    <div class="container-top">
  
      <!-- 订单状态  v-if=""  -->
        <div v-if="orderDetail.status==40" class="orderStatus" style="background:#33d29f;">已完成</div>
        <div v-if="orderDetail.status==10" class="orderStatus" style="background:#33d29f;">已支付</div>
        <div v-if="orderDetail.status==-1" class="orderStatus" style="background:#d7d7d7;">已取消</div>
        <div v-if="orderDetail.status==0" class="orderStatus" style="background:#d7d7d7;">未付款</div>

      <!-- 订单详情 -->
        <div>
            <mt-cell title="订单编号" :value="orderDetail.orderNo"></mt-cell>
            <mt-cell title="下单时间" :value="orderDetail.orderTime"></mt-cell>
            <mt-cell title="订单总额" :value="orderDetail.total"></mt-cell>
        </div>

      <!-- 产品明细 -->
        <div class="block">
            <mt-cell style="font-weight:bold;" title="产品明细"></mt-cell>
            <mt-cell v-for="product in orderDetail.proDetail" :title="product.productName" :value="product.productValue"></mt-cell>
        </div>

      <!-- 支付信息 -->
        <div class="block">
            <mt-cell style="font-weight:bold;" title="支付信息"></mt-cell>
            <mt-cell title="应付金额" :value="orderDetail.factTotal"></mt-cell>
            <mt-cell
                title="优惠券"
                :value="orderDetail.couponId"
                @click="$go('/activecoupons')">
                <span class="text-steelgrey">{{chosenCouponValue}}</span> 
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
import Service from '../service'
import { setChosenCoupon } from '../vuex/actions'
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
	  	       status: 0
	        },
	        orderId:''
	        }
	},
    computed:{
        chosenCouponValue(){
            if(this.couponlist.length > 0 && this.chosenCoupon)
                // 根据选中的优惠券的id取出内容
                let r = this.couponlist.find(item => item.id == this.chosenCoupon)
                return r.content
            else
                return '几张可用'
        }
    },
	methods:{
	    openPOP(){
	        this.popupVisible = true
	    }
	},
    created(){},
    route: {
        data ({from, to, next}){
            if(from.path){
                //微信环境中from.path带上了额外的query属性，所以需要substring之后判断
                if(from.path.substring(0,6) == "/order")
                    this.backRoute = '/orderlist'
                else
                    this.backRoute = '/home'
            }else{
                this.backRoute = '/home'
            }
        	next()
        },
        deactivate ({ to, next }) {
            // 除选择优惠券页面之外，清除当前选中优惠券信息
            if(to.path.substring(0,7) != '/active') this.setChosenCoupon('')
            next()
        }
	} 
}
</script>

<style lang="less" scoped="">
  .orderStatus{
    color:#fff;
    font-size:1rem;
    height:2.5rem;
    line-height:2.5rem;
    text-align:center;
  }
  .bottom-bar{
  	position: absolute;
  	bottom: 0;
  	width: 100%;
  }
  .block{
      margin-top:0.5rem;
  }
  .goPay{
    display:inline-block;
    margin-left:1rem;
    padding:0.6rem 1rem;
    color:#fff;
  }
  .obtn{
    display:inline-block;
    margin-left:0.5rem;
    font-size:0.9rem;
    padding:0.2rem 0.8rem;
    color:#33d29f;
    border:1px solid #33d29f;
    border-radius:0.5rem;
  }
  .orderDBTN{
    margin-left:0.5rem;
    border:1px solid #33d29f;
    color:#33d29f;
  }
  .mint-cell:before{
    height: 1px;
  }
  .mint-header.is-fixed{
    z-index: 100000;
  }

</style>