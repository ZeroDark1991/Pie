<template>
<div>
	<div class="box">
		<div v-if="imgUrl" class="news_container">
			<img :src="imgUrl" class="news_img bk-grey">
		</div>
		<div class="flex-item text-left">
			<div id="title">{{ title }}</div>
			<div v-if="content" id="content" class="text-tiny">
			    {{ content }}
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
		props:['title', 'imgUrl', 'content']
	}
</script>
<style scoped>
	.news_container{
		vertical-align: middle;
		width: 3rem;
	}
	.news_img{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
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