<template>
<div class="page">
    <mt-header fixed title="我的">
        <mt-button @click="$back('/home')" class="left" slot="left">
            <span class="iconfont">&#xe609;</span> 
        </mt-button>
    </mt-header>
    <!-- Cell -->
    <div class="container-top">
        <avatar-box
            :title= "userInfo.loginName"
            :img-url= "userInfo.imgUrl"
            :tel= "userInfo.mobile"
            style= "margin:1.5rem 0;"
            @click= "detail()">
        </avatar-box>
        <div style="margin-top: 2rem;">
            <mt-cell title="优惠券" @click="linkblock?$Toast('请先登录'):$go('/couponlist')">
                <span class="iconfont text-red right-gap" slot='icon'>&#xe613;</span>
                <!-- <span class="text-steelgrey">666张</span> -->
                <span class="iconfont icon-fenxiang">&#xe608;</span>
            </mt-cell>
            <mt-cell title="订单列表" @click="linkblock?$Toast('请先登录'):$go('/orderlist')">
                <span class="iconfont text-steelgrey right-gap" slot='icon'>&#xe611;</span>
                <span class="iconfont icon-fenxiang">&#xe608;</span>
            </mt-cell>
            <mt-cell title="消息中心" @click="linkblock?$Toast('请先登录'):$go('/newslist')">
                <span class="iconfont text-steelgrey right-gap" slot='icon'>&#xe612;</span>
                <span class="iconfont icon-fenxiang">&#xe608;</span>
            </mt-cell>               
        </div>

        <div
            v-if="!basicInfo.loginName"
            class="flex-center"
            style="margin: 2rem 1rem 0 1rem">
            <mt-button size='large' type='danger' @click="openSignInPop()">
                登  录
            </mt-button>
        </div>

    </div>  
    <!-- <mt-button class="quit bk-red no-round" type="danger">退出当前账号</mt-button> -->
</div>
</template>

<script>
import Service from '../service'
import IconCell from '../components/iconcell'
import AvatarBox from '../components/AvatarBox'
import {
    openSignInPop,
    setUserInfoBasic
} from '../vuex/actions'

export default {
	vuex: {
        getters: {
            basicInfo: state => state.userinfo.basic,
        },
        actions: {
            openSignInPop,
            setUserInfoBasic
        }
    },
    data () {
        return {
        }
    },
    created(){
        if(!this.basicInfo.loginName){
            this.$$get('/app2/console/UserSvr/userInfo')
            .then((data)=>{
                if(data.SU) this.setUserInfoBasic(data.SU)
            })
        }
    },
    components:{
        IconCell,
        AvatarBox
    },
    computed: {
        userInfo(){
            if(this.basicInfo) return this.basicInfo
            
            let defaultUserInfo =  {
                loginName: '当前未登录',
                imgUrl: 'http://img5.2345.com/duoteimg/zixunImg/local/2013/02/27/13619289854109.jpg',
                mobile: ''
            }

            return defaultUserInfo
        },
        linkblock(){
            return this.basicInfo.loginName
            ? false
            : true
        }
    },
    methods:{
        quit(){//退出账号
        
        },
        detail(){
            this.$Toast('invoke detail page')
        }
    },
    route: {
        data ({next}) {
            next()
        },
        deactivate ({ next }) {
            //Triggers when component destroys
            next()
        }
    }
}
</script>

<style scoped>
  .quit{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
  }
  .iconfont{
    font-size:0.8rem;
  }
</style>
