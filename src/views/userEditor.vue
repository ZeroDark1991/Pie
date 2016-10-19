<template>
<div class="page">
    <mt-header fixed title="个人信息">
      	<mt-button @click="$back('/settings')" class="left" slot="left">
            <span class="iconfont">&#xe609;</span> 
        </mt-button>
    </mt-header>
	<div class="container-top">
		<div class="flex-center">
			<mt-button class='top-gap' type='danger' size='large'
			    style="margin: 2rem 1rem 0 1rem"
			    @click="signOut()">
				切换账号
			</mt-button>
		</div>
	</div>
</div>
</template>
<script>
import {
	setUserInfoBasic,
	dirtyListPush
} from '../vuex/actions'
export default{
	vuex: {
        getters: {
        	basic : state => state.userinfo.basic
        },
        actions: {
        	setUserInfoBasic,
        	dirtyListPush
        }
	},
	data() {
		return {}
	},
	created() {
        if(!this.basic.userId) this.$back('/home')
	},
	methods:{
		signOut(){
            this.$$post('/app2/console/Logout/action')
            .then((data) => {
            	if(data.result == 'success'){
            		this.$Toast('成功退出登录')
            		this.setUserInfoBasic(null)
            		this.dirtyListPush('home')
            		this.$go('/home')
            	}
            })
		}
	}
}
</script>