<template>
<div>
	<div class="box text-small">
		<div class="flex-item text-left">
			<div id="title">
			    订单编号：{{ order.orderId }}
			    <span v-if='order.status' class="text-red"> [{{ order._status }}]</span>
			</div>
			<div id="title">下单时间：{{ order.orderTime }}</div>
			<div id="title">产品明细：{{ order.itemDescription }}</div>
		</div>
		<div class="order_container">
			<div
			    class="text-right text-red price"
			    >
				<span class="text-extra">{{ order.factTotal }}</span>
				<span class="text-large">元</span>
			</div>
<!-- 			<div
			    v-if= "order.coupon"
			    class= "text-right text-red"
			    style= "margin-top: .3rem"
			    >
				<span class="iconfont text-small">&#xe603;</span>
				<span class="text-small">{{order.coupon}}</span>
			</div> -->
		</div>		
	</div>
</div> 	
</template>
<script>
	export default {
		data(){
			return {}
		},
		props:['order']
	}
</script>
<style scoped lang='stylus'>
.price
    border-radius 5px
.order_container
    width 4rem
.order_img
    width 2rem
    height 2rem
    border-radius 50%
    margin-right 1.2rem
#title
	margin-bottom .2rem
#content
	margin-bottom .2rem
    color #777
    vertical-align middle
</style>