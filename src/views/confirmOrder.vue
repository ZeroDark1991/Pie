<template>
<div  class="page">
    <mt-header fixed title="确认订单">
      	<mt-button @click="$back('/home')" class="left" slot="left">
            <span class="iconfont">&#xe609;</span> 
        </mt-button>
    </mt-header>

    <div class="container-top">
      <!-- 产品明细 -->
        <div class="block" @click="clear()">
            <mt-cell style="font-weight:bold;" title="产品明细"></mt-cell>
            <mt-cell title="账号平台">{{chosenPlantform}}</mt-cell>
            <mt-cell title="起始时间">{{formateChosenDate}}</mt-cell>
            <mt-cell title="购买时长">{{currentOrder.dayNum}} 天</mt-cell>
        </div>

      <!-- 支付信息 -->
        <div class="block">
            <mt-cell style="font-weight:bold;" title="支付信息"></mt-cell>
            <mt-cell title="订单总额" :value="formatePrice(orderDetail.price)"></mt-cell>            
            <mt-cell
                title="优惠券"
                :value="orderDetail.couponId"
                @click="chooseCoupon()">
                <span class="text-steelgrey">{{chosenCouponValue}}</span> 
            </mt-cell>
            <mt-cell title="应付金额" :value="formatePrice(fact)"></mt-cell>
        </div>
    </div>
      <!-- 去支付 v-if="" -->
    <div class="bottom-bar">
        <div class='text-right bk-white'>
            <span>合计：{{formatePrice(fact)}}</span>
            <a class="goPay bk-green" @click="submitOrder()">立即支付</a>
        </div>
    </div>  
</div>  
</template>

<script>
import {
	setChosenCoupon,
	setActivedCoupons,
    openSignInPop
} from '../vuex/actions'
import { clearState } from 'src/util'
export default {
    vuex:{
        getters:{
            couponlist: state => state.couponlist,
            chosenCoupon: state => state.chosencoupon,
            currentPlantform: state => state.plantform.currentPlantform,
            currentOrder: state => state.currentorder,
            plantformList: state => state.plantform.plantformList,
            activedcoupons: state => state.activedcoupons
        },
        actions:{
            setChosenCoupon,
            setActivedCoupons,
            openSignInPop
        }
    },
	data () {
	    return {
            orderDetail: {
	    	    price: '',
                factPay: '',
            },
            pay: {
                appId: '',
                timeStamp: '',
                nonceStr: '',
                package: '',
                signType: 'MD5',
                paySign: ''
            }
	    }
	},
    computed:{
        chosenCouponValue(){
            let activeCouponsAmount = this.activedcoupons.length
            if(activeCouponsAmount > 0 && this.chosenCoupon)
                // 根据选中的优惠券的id取出内容
                return this.activedcoupons.find(item => item.ucId == this.chosenCoupon).name
            else
                // 判断当前订单是否有可用优惠券
                return activeCouponsAmount > 0 ? `${activeCouponsAmount}张可用` : '无可用优惠券'
        },
        chosenPlantform(){
        	if(this.currentPlantform)
        	    return this.currentPlantform.name        		
        	else return ''
        },
        formateChosenDate(){
        	if(this.currentOrder.startDate){
        	    let tar = this.currentOrder.startDate
        	    let r = `${tar.getFullYear()}-${tar.getMonth()+1}-${tar.getDate()}`
        	    return r        		
        	}
        	else return ''
        },
        fact(){
            return this.orderDetail.factPay ? this.orderDetail.factPay : this.orderDetail.price
        }
    },
	methods:{
        chooseCoupon(){
            if(this.activedcoupons.length > 0) this.$go('/activedcoupons')
            else return
        },
        clear(){
            clearState(this.pay)
        },
        formatePrice(p){
            if(!p) return ''
            else return `￥ ${p}`
        },
        onBridgeReady(){
            let self = this
            self.$Indicator.open()
            let opt = self.pay
            alert(opt.appId)
            WeixinJSBridge.invoke('getBrandWCPayRequest',opt,
                function(res){
                    self.$Indicator.close()

                    if(res.err_msg == "get_brand_wcpay_request:fail" ) {
                        alert('fail')
                    }
                    if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
                        alert('cancel')
                        self.$back('/orderlist')
                    }
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        self.$Toast('支付成功')
                        self.$back('/home?paysuccess=1')
                    }
                }
            ); 
        },    
        wxPay(){
            if (typeof WeixinJSBridge == "undefined"){
                alert('WeixinJSBridge 无法获取')
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                }
            }else{
                this.onBridgeReady();
            }
        },
        submitOrder(){
            let c = this.currentPlantform
            let o = this.currentOrder
            if(!c.channelId || !o.startDate || !o.dayNum){
                this.$Toast('请先选择产品明细')
                this.$go('/home')
            }
            else{
                this.$Indicator.open()
                this.$$post('/app2/zhanghaopai/UserAccount/wxPay', {
                    channelId: c.channelId,
                    startDate: this.formateChosenDate,
                    dayNum: o.dayNum,
                    ucId: this.chosenCoupon
                })
                .then((data) => {
                    this.$Indicator.close()
                    if(data){
                        let g = data.package
                        if(g){
                            alert(g.appId)
                            this.pay.appId= g.appId,
                            this.pay.timeStamp= g.timeStamp,
                            this.pay.nonceStr= g.nonceStr,
                            this.pay.package= g.package,
                            this.pay.signType= g.signType,
                            this.pay.paySign= g.paySign

                            this.wxPay()
                        }
                    }
                })
            }
        }
	},
    created(){
    	// handle 刷新该页面的情况
        if(!this.currentPlantform.channelId) this.$go('/home')
    },
    route: {
        data ({from, to, next}){
        	if(from.path.substring(0,7) != '/active' && this.currentPlantform.channelId){
        	    this.$$get('/app2/zhanghaopai/UserAccount/couponList',{
        		    params: {
        			    startDate: this.formateChosenDate,
        			    channelId: this.currentPlantform.channelId,
        			    dayNum: this.currentOrder.dayNum
        		    }
        	    })
        	    .then((data) => {
        		    console.log(data)
        		    if(data.price) this.orderDetail.price = data.price.price
        		    if(data.couponList) this.setActivedCoupons(data.couponList)
        	    })        		
        	}
            if(from.path.substring(0,7) == '/active' && this.chosenCoupon){
                this.$$get('/app2/zhanghaopai/UserAccount/orderTotal', {
                    params: {
                        channelId: this.currentPlantform.channelId,
                        ucId: this.chosenCoupon,
                        dayNum: this.currentOrder.dayNum,
                        startDate: this.formateChosenDate,
                    }
                })
                .then((data)=>{
                    if(data.factPay) this.orderDetail.factPay = data.factPay
                })
            }
        	next()
        },
        deactivate ({ to, next }) {
            // 除选择优惠券页面之外，清除当前选中优惠券信息
            if(to.path.substring(0,7) != '/active'){
                this.setActivedCoupons('')
            	this.setChosenCoupon('')
            	this.orderDetail.price = ''
            }
            next()
        }
	} 
}
</script>

<style lang="stylus" scoped>
.orderStatus
    color #fff
    font-size 1rem
    height 2.5rem
    line-height 2.5rem
    text-align center
.bottom-bar
	position  absolute
	bottom  0
	width  100%
.block
    margin-top 0.5rem
.goPay
    display inline-block
    margin-left 1rem
    padding 0.6rem 1rem
    color #fff
.obtn
    display inline-block
    margin-left 0.5rem
    font-size 0.9rem
    padding 0.2rem 0.8rem
    color #33d29f
    border 1px solid #33d29f
    border-radius 0.5rem
.orderDBTN
    margin-left 0.5rem
    border 1px solid #33d29f
    color #33d29f
.mint-cell before
    height 1px
</style>