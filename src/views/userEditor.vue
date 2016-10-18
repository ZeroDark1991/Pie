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
export default{
	vuex: {
        getters: {
        	basic : state => state.userinfo.basic
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
            this.$Toast('switch account')
		}
	}
}
</script>