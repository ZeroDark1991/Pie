<template>
	<div class="sign-in-container">
        <div @click='closeSignInPop()' class="flex-right">
            <i class="iconfont close-btn text-grey">&#xe61c;</i>
        </div>
        <div class="top-gap">
            <mt-field
                label="手机号"
                type="text"
                placeholder="输入手机号"
                :value.sync="account">
            </mt-field>
            <mt-field
                label="验证码"
                type="text"
                placeholder="输入验证码"
                :value.sync="verifyCode">
                <mt-button
                    size='small'
                    style='margin: 10px 0'
                    @click='fetchVerifyCode()'>
                    获取验证码
                </mt-button>
            </mt-field>
        </div>            
        <div class="flex-center top-gap" style="margin-left: 1.2rem;margin-right: 1.2rem;">
        	<mt-button
        	    type='danger' 
        	    size='large'
        	    @click='signin()'
        	    plain>
        	    登录
    	    </mt-button>
        </div>      
	</div>
</template>
<script>
import {
    closeSignInPop,
    setUserInfoBasic,
    setPlantformList,
    setCurrentPlantform
} from '../vuex/actions'
export default {
	vuex:{
		actions:{
			closeSignInPop,
			setUserInfoBasic,
			setPlantformList,
			setCurrentPlantform
		}
	},
	data(){
		return {
			account:'',
			verifyCode: '',
			msgNum: ''
		}
	},
	methods: {
		fetchVerifyCode(){
			if(!this.account) return this.$Toast('先输入手机号')
			
			let formData = { mobile: this.account }
			this.$$post('/app2/console/ShortMsgSvr/loginCheck',formData)
			.then((data)=>{
				if(data){
					console.log(data)
					this.$Toast('发送成功')
					this.msgNum = data.obj.msgNum
				}
			})
		},
		signin(){
			if(!this.account || !this.verifyCode) return this.$Toast('请完整填写信息')
            if(!this.msgNum) return this.$Toast('验证码过期，请重新获取')
            this.$Indicator.open()
			this.$$post('/app2/zhanghaopai/LoginSvr/wx',{
				user: {
					checkCode: this.verifyCode,
					mobile: this.account,
					msgNum: this.msgNum
				}
			})
		    .then((data) => {
		    	console.log(data)
		    	if(data){
		    		this.$Toast('登录成功')
		    		this.closeSignInPop()
                    this.$$get('/app2/zhanghaopai/ChannelSvr/index')
                    .then((data)=>{
                        console.log(data)
                        if(data){
                            if(data.list){
                                this.setPlantformList(data.list) //设置平台信息列表
                                this.setCurrentPlantform(data.list[0]) //设置当前激活平台 默认为第一个
                            }
                        }
                    })
		    	}

                if(data.SU) this.setUserInfoBasic(data.SU)
		    })
		}
	}
}
</script>
<style lang="stylus" scoped>
.sign-in-container
	width 100%
	height 100%
.close-btn
	padding: .6rem
</style>