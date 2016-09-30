<template>
<div>
	<div class="box text-tiny">
		<div class="flex-item text-left">
			<div id="title">订单编号：{{ order.id }}</div>
			<div id="title">下单时间：{{ order.time }}</div>
			<div id="title">产品明细：{{ order.detail }}</div>
		</div>
		<div class="order_container">
			<div
			    class="text-center text-white bk-red text-extra price"
			    >
				{{ order.price }} 元
			</div>
			<div
			    v-if= "order.coupon"
			    class= "text-center text-red"
			    style= "margin-top: .3rem"
			    >
				<span class="iconfont text-small">&#xe603;</span>
				<span class="text-small">{{order.coupon}}</span>
			</div>
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
<style scoped>
	.box{
		/*
         * flex-direction: 主轴方向;
         * flex-wrap: 换行;
         * justify-content: 主轴方向对齐;
         * align-items: 交叉轴方向对齐;
		 */
		display: -webkit-flex;
		display: flex;
		flex-direction: row; 
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		padding: .8rem .5rem;
		background-color: #fff;
		position:relative;
	}
	.box:active{
		background-color: #eee;
	}
	.box:after{
        color: #d9d9d9;
        content: " ";
        width: 100%;
        height: 1;
        border-top: 1px solid;
        left: 0;
        position: absolute;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        transform: scaleY(.5);
    }
    .box:after {
    	bottom: 0;
    }
    .price{
    	border-radius: 5px;
    	font-weight: lighter;
    	padding: .2rem 0
    }
	.flex-item{
		flex: 1 1 auto;
	}
	.order_container{
		vertical-align: middle;
		width: 4rem;
	}
	.order_img{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		margin-right: 1.2rem; 
	}
	#title{
		margin-bottom: .2rem;
	}
	#content{
		margin-bottom: .2rem;
	    color: #777;
	    vertical-align: middle;
	}
</style>