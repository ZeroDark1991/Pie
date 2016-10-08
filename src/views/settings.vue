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
            :title= "userInfo.title"
            :img-url= "userInfo.imgUrl"
            :tel= "userInfo.tel"
            :address= "userInfo.address"
            style= "margin:1.5rem 0;"
            @click= "detail()">
        </avatar-box>
        <div style="margin-top: 2rem;">
            <mt-cell title="优惠券" @click="$go('/couponlist')">
                <span class="iconfont text-red right-gap" slot='icon'>&#xe613;</span>
                <span class="text-steelgrey">666张</span>
                <span class="iconfont icon-fenxiang">&#xe608;</span>
            </mt-cell>
            <mt-cell title="订单列表" @click="$go('/orderlist')">
                <span class="iconfont text-steelgrey right-gap" slot='icon'>&#xe611;</span>
                <span class="iconfont icon-fenxiang">&#xe608;</span>
            </mt-cell>
            <mt-cell title="消息中心" @click="$go('/newslist')">
                <span class="iconfont text-steelgrey right-gap" slot='icon'>&#xe612;</span>
                <span class="iconfont icon-fenxiang">&#xe608;</span>
            </mt-cell>               
        </div>

    </div>  
    <!-- <mt-button class="quit bk-red no-round" type="danger">退出当前账号</mt-button> -->
</div>
</template>

<script>
import Service from '../service'
import IconCell from '../components/iconcell'
import { setUser_store_info } from '../vuex/actions'
import AvatarBox from '../components/AvatarBox'

export default {
	vuex: {
      getters: {
        user_info: state => state.user_store,
      },
      actions: {
        setUser_store_info
      }
  },
  data () {
    return {
        userInfo:{
            title: 'ZeroDarkThirty',
            imgUrl: 'https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg',
            tel: '13859098888',
            address: ''
        }
    }
  },
  components:{
    IconCell,
    AvatarBox
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
