<template>
<div>
	<div class="box">
		<div class="avatar_container">
			<img :src="imgUrl" class="avatar_img">
		</div>
		<div class="flex-item text-left">
			<div id="title">{{title}}</div>
			<div id="tel">
			    <i class="iconfont text-large">&#xe607;</i>
			    {{tel}}
			</div>
<!-- 			<div id="address">
			<i class="iconfont text-extra">&#xe61b;</i>
			{{address}}
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
		props:['title', 'imgUrl', 'tel', 'address']
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
		padding: .9rem;
		background-color: #fff;
		position:relative;
		margin: .5rem 0;
	}
	.flex-item{
		flex: 1 1 auto;
	}
	.avatar_container{
		vertical-align: middle;
	}
	.avatar_img{
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		margin-right: 1.2rem; 
	}
	#title{
		margin-bottom: .2rem;
		font-size: .9rem;
	}
	#tel, #address{
		margin-bottom: .2rem;
	    color: #606060;
	    vertical-align: middle;
	}
</style>