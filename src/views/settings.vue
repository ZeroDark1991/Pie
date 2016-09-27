<template>
<div class="page">
    <mt-header fixed title="设置">
        <mt-button @click="back('/home')" class="left" slot="left">
            <span class="iconfont">&#xe602;</span> 
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
    <mt-button v-show="!!user_info.userId" class="quit bk-red no-round" @click="quit()" type="danger">退出当前账号</mt-button>
    
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
    go (link) {
        let self = this;
        self.$transfer.go(self, link)
    },
    back (link) {
      let self = this;
		  self.$transfer.back(self, link)
    },
    cleanCache() {	
      let self = this;
		  self.$MessageBox.confirm('确认清除缓存?')
  		  .then(action => {
          //调清除缓存接口
          if(!Pointers.Settings) Pointers.Settings = self;
          app_clear_cache("clear_cache_callback_f");
  		  })
    },
    moreInfo(){
      let self = this;
      self.$Toast('没更多了')
    },
    share(){
      let self = this;
      //调分享接口
      if(!Pointers.Settings) Pointers.Settings = self;
      app_share_f("share_callback_f"); 
    },
    callAsistant(){
      let self = this;
  		self.$MessageBox({
  			message: '客服电话：4001692828',
  			showConfirmButton: true,
  			showCancelButton: true,
  			confirmButtonText: '拨打',
  			confirmButtonClass: 'text-cyan'
  		})
  		.then(action => {
        // console.log(action);
        let self = this;
        if (action == "confirm") {
          if(!Pointers.Settings) Pointers.Settings = self;
          app_call_tel("4001692828","call_tell_callback_f");//调拨打电话接口
        }
  		})
    },
    quit(){//退出账号
      let self = this;
      //调退账号接口
      return Service(this, 'sayogi', 'Logout', '')
        .then((data) => {
          if(!data) return;
          console.log(data);
          if(!Pointers.Settings) Pointers.Settings = self;
          self.$Toast("账号已退出");
          self.setUser_store_info({});
          app_show_login_f("login_callback_f");
        })
    }
  },
  route: {
    data ({next}) {
  		setTimeout(()=>{
  			next({count:3})
  		},1000)
      //显示缓存
      let self = this;
      if(!Pointers.Settings) Pointers.Settings = self;
      // app_show_cache("show_cache_callback_f");
      try {
        app_show_cache("show_cache_callback_f");
      } catch(e) {
        console.log(e);
      }
    },
    deactivate ({ next }) {
      //Triggers when component destroys
      let self = this;
      Pointers.Settings = null;
      next()
    }
  }
}
</script>
