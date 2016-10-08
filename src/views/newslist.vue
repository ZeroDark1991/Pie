<template>
	<div class="page">
	    <mt-header fixed title="消息中心">
            <mt-button @click="$back('/settings')" class="left" slot="left">
                <span class="iconfont">&#xe609;</span> 
            </mt-button>
            <mt-button @click="reload()" slot="right">
                <span class="iconfont">&#xe610;</span> 
            </mt-button>
        </mt-header>
		<div class="container-top">

		    <div v-if='newslist.length == 0' class="text-center" style="margin-top: 1rem">
                <span>暂无新消息</span>
		    </div>

		    <div v-else>
			    <div v-for='news in newslist'>
		            <news
                        :title= "news.title"
                        :img-url= "news.imgUrl"
                        :content= "news.content"
                        @click= "$go('/newsdetail', news.id)"
                        >
                    </news>
			    </div>
		    </div>

		</div>
	</div>
</template>
<script>
    import news from '../components/news.vue'

	export default {
		data(){
			return {
                newslist:[
                    {
                    	id:111,
                    	imgUrl: 'https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg',
                    	title: '新订单通知',
                    	content: '你有一张新的在线订单，点击查看....'
                    },
                    {
                    	id:112,
                    	imgUrl: 'https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg',
                    	title: '新订单通知',
                    	content: '你有一张新的在线订单，点击查看.'
                    }
                ]
			}
		},
		methods:{
            reload(){
            	this.$Toast('Page Reloading')
            }
		},
		components:{
			news
		},
		route:{
			data({next}){
				next()
			}
		}
	}
</script>