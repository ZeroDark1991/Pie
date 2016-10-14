<template>
<div class="page">
    <mt-header fixed title="消息详情">
        <mt-button @click="$back('/newslist')" class="left" slot="left">
            <span class="iconfont">&#xe609;</span> 
        </mt-button>
    </mt-header>
    <div class="container-top">
        <h1
            style= "font-weight: bold; padding:1rem 1rem 0 1rem"
            class= "text-extra">
            {{newsInfoHolder.subject}}
        </h1>
        <p
            v-text= "newsInfoHolder.content"
            style= "padding: .5rem 1rem">
        </p>
    </div> 
</div>  
</template>

<script>
export default {
    data () {
        return {
                newsInfo: null
            }
    },
    methods:{
        updateData(id){
            this.$$get('/app2/console/UserAffairSvr/info',{
                params: {
                    id: id
                }
            })
            .then((data)=>{
                if(data.obj) this.newsInfo = data.obj
            })
        }
    },
    created(){
    },
    computed:{
        newsInfoHolder(){
            return this.newsInfo
            ? this.newsInfo
            : { subject: '', content: '' }
        }
    },
    route: {
        data ({from, to, next}){
            let newsId = to.params.newsId
            this.updateData(newsId)
            next()
        },
        deactivate ({ next }) {
            this.newsInfo = null
            next()
        }
    } 
}
</script>

<style lang='stylus' scoped>
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
.mint-cell:before
    height 1px
.mint-header.is-fixed
    z-index 100000
</style>