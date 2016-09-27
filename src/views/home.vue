<template>
<div class="page">
	<div class="cushion">
		<!-- Header -->
		<mt-header fixed title="个人中心">
			<mt-button slot="left">&nbsp;</mt-button>
			<!-- <mt-button slot="right" @click="go('/my_cars')"> -->
			<mt-button slot="right" @click="$go('/settings')">
				<span class="text-white" style="font-size:.7rem; padding: .5rem .3rem .5rem 1.2rem;">
				    <i class="iconfont">&#xe61f;</i>
				</span>
			</mt-button>
		</mt-header>

		<div class="container-top">

		</div>
	</div>
</div>
</template>

<script>
// Ajax request module, return a Promise
import Service from '../service'
import SwRadio from '../components/radio'
import {
	setUser_store_info,
	setVipuser_store_info,
	setUser_su_store_info
} from '../vuex/actions'

export default {
	vuex: {
		getters: {
			user_info: state => state.user_store,
			vipuser_info: state => state.vipuser_store,
			su_store_info: state => state.user_su_store
		},
		actions: {
			setUser_store_info,
			setVipuser_store_info,
			setUser_su_store_info
		}
  	},
	data () {
		return {
			img:[
			    'http://sayoogi.oss-cn-hangzhou.aliyuncs.com/SayogiClient_Assets/Center/gerenrizhi.png',
			    'http://sayoogi.oss-cn-hangzhou.aliyuncs.com/SayogiClient_Assets/Center/weizhangcishu.png'
			    ],
			recodeCount: "0", //个人日志数量
			userCoupncount: "0", //优惠券数量
			carCount: "0", //车辆数量
			carinfo: "车牌号暂无",
			loginBtn: false,
			linkArr: ['/activity'],
			nickName: '',
			hasLoaded: false,
			userId: null,
			avatarSrc: 'http://img.sayogi.cn/user_no_login_v1.0.png',
			breachUrl: ''
		}
	},
	methods: {
		goBreach(){
			var info = {'url':this.breachUrl}
			console.log(this.breachUrl)
			app_get_h5_info(info)
		},
		changeAvatar() {
			this.sheetVisible = true
		},
		photoShow(id) {
			let self = this
			self.avatarSrc = id
		}
	},
	created(){
		let self = this
		self.$Indicator.open()
		return Service.bind(this)('sayogi', 'UserInfo', '')
			.then((data) => {
				self.$Indicator.close()
				self.hasLoaded = true

				self.avatarSrc = 'http://img.sayogi.cn/user_no_login_v1.0.png'
				if(!data) return
				if (data.vipuser) {
					self.setVipuser_store_info(data.vipuser)
				}
				if(!data.user){ //若未登录
					self.loginBtn = true//显示登录按钮
					self.avatarSrc = 'http://img.sayogi.cn/user_no_login_v1.0.png'
					// self.recordCount = "0"; //违章次数
					self.carCount = "0" //车辆数量
					self.recodeCount = "0" //个人日志数量
					self.userCoupncount = "0" //优惠券数量
				}else {
					self.breachUrl = data.url
                    self.loginBtn = false
                    self.nickName = data.user.nickName?data.user.nickName:data.user.loginName
					self.userId = data.SU.userId
					// self.recordCount = data.recordCount;
					self.recodeCount = data.recodeCount
					self.carCount = data.carCount
					self.userCoupncount = data.userCoupncount
					self.carinfo = data.carinfo?data.carinfo.plateNum:'车牌号暂无'
					//存储到store
					self.setUser_store_info(data.user)
					self.setUser_su_store_info(data.SU)
					if(data.user.avatarFileId){
						let dpr = window.devicePixelRatio  //设备像素比
			            let w = 80*dpr
			            let h = w
			            var img = this.$imgHandler(data.user.avatarFileId, data.user._avatarFileId_fileExtend,"", w, h)
			            self.avatarSrc = img
					}else {
						self.avatarSrc = 'http://img.sayogi.cn/user_no_login_v1.0.png'
					}
				}
		})
	},
	route: {
		data ({ to, next }) {

			let self = this;
			//Hook-function which triggers before rendered
            next()
		},
	    deactivate ({ next }) {
            //Triggers when component destroys
            next()
	    },
		canDeactivate ({ next, to, abort }) {
			//Triggers when component destroys
            next()
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cushion {
	bottom: 2.5rem;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}

.avatar {
	padding-top: .8rem;
	padding-bottom: .6rem;
}

.avatar .avatarImg{
	display: block;
	margin: 0 auto;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
}

.button_Bar {
	display: -webkit-box;
	display: flex;
	padding: .5rem 2rem;
	background: #fff;
}

.button_Bar_item {
	display: block;
	-webkit-box-flex: 1;
	flex: 1;
	-webkit-tap-highlight-color: transparent;
	text-align: center;
}

.button_Bar_item ul {
	margin: 0 auto;
	padding-bottom: .4rem;
	width: 4.5rem;
	background: #f7f7f7;
}

.button_Bar_item ul li:first-child {
	font-size: 1.2rem;
}

.text-mygrey {
	color: #a3a3a3 !important;
}

.edit_name {
	position: absolute;
	right: -1.8rem;
}
.mint-actionsheet{
	bottom: 2.5rem;
}
.mint-cell::before {
    color: #d9d9d9;
    content: " ";
    width: 100%;
    height: 1;
    border-bottom: 1px solid;
    bottom: 0;
    left: 0;
    position: absolute;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
}
</style>
