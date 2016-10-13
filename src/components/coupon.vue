<template>
<div>
	<div class="box text-small">
		<div class="flex-item text-left">
<!-- 			<div id="title">
			    订单编号：{{ coupon.id }}
			    <span v-if='coupon.status' class="text-red"> [{{ coupon.status }}]</span>
			</div> -->
			<div id="title">派派券内容：{{ coupon.name }}</div>
			<div id="title">有效时间至：{{ coupon.endDate }}</div>
		</div>
		<div class="coupon_container">
<!-- 			<div
			    class="text-right text-red price"
			    >
				<span class="text-extra">{{ coupon.price }}</span>
				<span class="text-large">元</span>
			</div> -->
			<div
			    class= "text-right"
			    >
				<img :src="imgUrl" width="40px">
			</div>
		</div>		
	</div>
</div> 	
</template>
<script>
import qiyi from '../assets/qiyi.png'
export default {
	data(){
		return {
			imgUrl: qiyi
		}
	},
	props:['coupon']
}
</script>
<style scoped lang="stylus">
.price
    border-radius 5px
.coupon_container
    width 4rem
.coupon_img
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