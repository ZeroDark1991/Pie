<template>
<div class="page">
    <mt-header fixed title="消息详情">
        <mt-button @click="$back('/newslist')" class="left" slot="left">
            <span class="iconfont">&#xe609;</span> 
        </mt-button>
    </mt-header>
    <div class="container-top">
        <p v-text="content"></p>
    </div> 
</div>  
</template>

<script>
import Service from '../service'
export default {
    data () {
        return {
                title: '',
                content: '',
            }
    },
    methods:{
    },
    created(){
    },
    route: {
        data ({from, to, next}){
            this.title = to.params.newsId
            this.content = '文字内容'
            next()
        },
        deactivate ({ next }) {
            this.title = ''
            this.content = ''
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