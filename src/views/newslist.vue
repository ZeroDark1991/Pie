<template>
	<div class="page">
	    <mt-header fixed title="消息中心">
            <mt-button @click="$back('/settings')" class="left" slot="left">
                <span class="iconfont">&#xe609;</span> 
            </mt-button>
            <mt-button @click="updateData()" slot="right">
                <span class="iconfont">&#xe610;</span> 
            </mt-button>
        </mt-header>
		<div class="container-top">
		    <div v-if='newslist.length == 0 && dataupdated' class="text-center" style="margin-top: 1rem">
                <span>暂无新消息</span>
		    </div>
		    <div v-else>
			    <div v-for='news in newslist'>
		            <news
                        :title= "news.subject"
                        :img-url= "news.imgUrl"
                        :content= "news.content"
                        @click= "$go('/newsdetail', news.affairId)"
                        >
                    </news>
			    </div>
		    </div>

		</div>
	</div>
</template>
<script>
import news from 'components/news.vue'
import {
    setNewsList
} from '../vuex/actions'

export default {
    vuex: {
        getters: {
            newslist: state => state.newslist
        },
        actions: {
            setNewsList
        }
    },
	data(){
		return {
            dataupdated: false, // 数据加载完前不显示 ‘暂无消息’
            newslistmock:[
                {
                	id:111,
                	imgUrl: 'https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg',
                	title: '新订单通知',
                	content: '你有一张新的在线订单，点击查看....'
                }
            ]
		}
	},
	methods:{
        updateData(){
            this.$$get('/app2/console/UserAffairSvr/list', {
                params: {
                    topNum: '100'
                }
            })
            .then((data)=>{
                console.log(data)
                this.dataupdated = true
                data.list
                ? this.setNewsList(data.list)
                : this.setNewsList([])
            })
        }
	},
	components:{
		news
	},
	route:{
		data({next}){
            this.updateData()
			next()
		}
	}
}
</script>