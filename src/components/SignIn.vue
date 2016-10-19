<template>
	<div class="sign-in-container">
        <div @click='closeSignInPop()' class="flex-right">
            <i class="iconfont close-btn text-grey">&#xe61c;</i>
        </div>
        <div class="logo-box flex-center top-gap">
        	<img class="logo" alt="" :src="logo">
        </div>
        <div class="top-gap">
            <div class="flex-center bk-white" style="margin:0 1.2rem;border-radius: 7px 7px 0 0">
            	<div
            	    class="flex-left"
            	    style="width: 100%;
            	        padding: .3rem .1rem;
            	        border: 1px solid #ddd;
            	        border-radius: 7px 7px 0 0">
            		<!-- <div class="unit-1-4 sitebox sign-box-item">手机号</div> -->
            		<div class="unit-3-4 sitebox sign-box-item">
            		    <input
            		        type="text"
            		        style="width: 100%"
            		        placeholder="输入手机号"
            		        v-model='account'>
            		</div>
            	</div>
            </div>
            <div class="flex-center bk-white"
                style="margin:0 1.2rem;border-radius: 0 0 7px 7px">
            	<div
            	    class="flex-left"
            	    style="width: 100%;
            	        padding: .3rem .1rem;
            	        border:1px solid #ddd;
            	        border-radius: 0 0 7px 7px;
            	        border-top: none;">
            		<!-- <div class="unit-1-4 sitebox sign-box-item">验证码</div> -->
            		<div class="unit-1-2 sitebox sign-box-item">
            		    <div style="width: 100%" class='flex-left'>
            		        <div>
            		            <input
            		                type="text"
            		                style="width:100%"
            		                placeholder="输入验证码"
            		                v-model="verifyCode">
            		        </div>        			    
            		    </div>
            		</div>
            		<div class="unit-1-2 sitebox sign-box-item text-right">
                                <span 
                                    class="text-green"
                                    @click='fetchVerifyCode()'>
                                    {{ btnText }}
                                </span>            			
            		</div>
            	</div>
            </div>
<!--             <mt-field
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
                    :disabled = 'btnDisable'
                    @click='fetchVerifyCode()'>
                    {{ btnText }}
                </mt-button>
            </mt-field> -->
        </div>            
        <div class="flex-center" style="margin:3rem 1.2rem 0 1.2rem">
        	<mt-button
        	    type='primary' 
        	    size='large'
        	    @click='signin()'>
        	    登录
    	    </mt-button>
        </div>      
	</div>
</template>
<script>
import logo from 'assets/pi-logo.png'
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
			msgNum: '',
			btnText: '获取验证码',
			btnDisable: false,
			logo: logo
		}
	},
	methods: {
		fetchVerifyCode(){
			if(!this.account) return this.$Toast('先输入手机号')
			if(!(/^1[0345789]\d{9}$/.test(this.account))) return this.$Toast('手机号格式有误')
		    this.btnDisable = true
            let c = 60
		    let timer = setInterval(()=>{
                this.btnText = `${--c}s重新获取`
                if(c==0){
                	clearInterval(timer)
                	this.btnDisable = false
                	this.btnText = '获取验证码'
                }
		    },1000)

			let formData = { mobile: this.account }
			this.$$post('/app2/console/ShortMsgSvr/loginCheck',formData)
			.then((data) => {
				if(data){
					console.log(data)
					this.$Toast('发送成功')
					this.msgNum = data.obj.msgNum
				}
				else{
					clearInterval(timer)
					this.btnDisable = false
					this.btnText = '获取验证码'
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
                    .then((data) => {
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
.logo-box
    padding 1rem 0
.logo
    width 4.5rem
    height 100%
.sign-in-container
	width 100%
	height 100%
	background-color rgba(140,170,140,.1)
.close-btn
	padding .7rem 1rem
.sign-box-container
    border 1px solid #eee
.sign-box{
	width:100%;
	border:1px solid #eee;
}
.sign-box-item{
    height: 2rem
    line-height 1.6rem
    padding: .2rem .5rem
}
</style>