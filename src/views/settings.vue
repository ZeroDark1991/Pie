<template>
<div class="page">
    <mt-header fixed title="我的">
      <mt-button @click="$back('/home')" class="left" slot="left">
        <span class="iconfont">&#xe609;</span> 
      </mt-button>
    </mt-header>
    <!-- Cell -->
    <div class="container-top">
      <mt-cell title="清除缓存" :value="cache" @click="cleanCache()"></mt-cell>
      <mt-cell title="反馈" @click="go('/feedback')" is-link>
      </mt-cell>
      <mt-cell title="分享" @click="share()">
          <span class="iconfont icon-fenxiang">&#xe614;</span>
      </mt-cell>
      <mt-cell title="客服" @click="callAsistant()">
          <span class="iconfont icon-tel">&#xe606;</span>
      </mt-cell>
      <mt-cell title="安全选项" @click="go('/safety_options')" is-link>
      </mt-cell>
      <mt-cell title="更多" @click="go('/more')" is-link>
      </mt-cell>
      
    </div>  
    <mt-button class="quit bk-red no-round" type="danger">退出当前账号</mt-button>
</div>
</template>

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

<script>
import Service from '../service'
import { Toast } from 'mint-ui'
import IconCell from '../components/iconcell'
import { setUser_store_info } from '../vuex/actions'

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
		  count: 2,
		  showLoader: true,
      cache: "0kb"
    }
  },
  components:{
    IconCell,
  },
  methods:{
    quit(){//退出账号
      let self = this;
      //调退账号接口
      return Service(this, 'sayogi', 'Logout', '')
        .then((data) => {
          if(!data) return;
          self.$Toast("账号已退出");
          self.setUser_store_info({});
          app_show_login_f("login_callback_f");
        })
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
