<template>
<div class="page">
	<div class="container">
        <!-- banner栏开始 -->
	    <div class="mediabox">
            <div class="flex-center site-box">
                <span
                    class="site-box text-extra text-white text-center"
                    style= "padding: .4rem 0;line-height: 1"
                    @click="popupForPlantform = true">
                    {{currentPlantform.name}}
                    <br/>
                    <i class="iconfont">&#xe60f;</i>
                </span>
		        <span
		            class="setting-button"
                    @click= "toPageRequiresSignin('/settings')">
		            <i class="iconfont text-white" style="font-size:1.2rem">&#xe60b;</i>
		        </span>
	        </div>	
            <div class="tap-box-container flex-center site-box">
                <div
                    class="tap-box text-center"
                    style="padding: .8rem 0;vertical-align: middle "
                    @click='sumbitOrder()'>
        		    <i
        		        class="iconfont text-white"
        		        style="font-size: 4rem"
        		        v-text="currentPlantform.account?'&#xe617;':'&#xe61a;'"
        		        >
        		    </i>
                </div>
            </div>
    	    <div class="flex-center site-box text-white text-large">
    	        <span v-text="currentPlantform.account?'已购买':'点击来个账号'"></span>
    	    </div>            	    
	    </div>
        <!-- banner栏结束 -->
        <!-- 订单表单栏开始 -->
        <div class="form—field" v-show='!currentPlantform.account'>
 <!--            <mt-field
                label="起始时间"
                type="datetime"
                :value="formatDate"
                :readonly="true"
                >
            </mt-field>

            <field-progress :title="'购买天数'">
            	<mt-range
            	    slot='value'
                    :value.sync="currentOrder.dayNum"
                    :min="1"
                    :max="7"
                    :step="1"
                    :bar-height="4">
                        <div style="padding: 0 .2rem" slot="start">1</div>
                        <div style="padding: 0 .2rem" slot="end">7</div>
                </mt-range>
                <span
                    class="mint-cell-label text-red text-large"
                    slot='label'
                    style='margin-top: 8px'
                    >
                    {{currentOrder.dayNum}} 天
                </span>
            </field-progress> -->
            <field-progress :title="'起始时间'">
                <div class="flex-center" slot="value">
                    <div class="change-day-btn iconfont text-normal">
                        <span
                            class= "bk-grey change-day-icon text-deepgrey"
                            @click= 'updateStartDay(0)'>
                            &#xe60e;
                        </span>
                    </div>
                    <div class="flex-center" style="min-width: 100px"> {{formatDate}}</div>
                    <div class="change-day-btn iconfont text-normal">
                        <span
                            class= "bk-grey change-day-icon text-deepgrey"
                            @click= 'updateStartDay(1)'>
                            &#xe60d;
                        </span>
                    </div>
                </div>
            </field-progress>             
            <field-progress :title="'购买天数'">
                <div class="flex-center" slot="value">
                    <div class="change-day-btn iconfont text-normal">
                        <span
                            class= "bk-grey change-day-icon text-deepgrey"
                            @click= 'updateDayNum(0)'>
                            &#xe60e;
                        </span>
                    </div>
                    <div class="flex-center text-steelblue" style="min-width: 100px">
                        {{currentOrder.dayNum}} 天
                    </div>
                    <div class="change-day-btn iconfont text-normal">
                        <span
                            class= "bk-grey change-day-icon text-deepgrey"
                            @click= 'updateDayNum(1)'>
                            &#xe60d;
                        </span>
                    </div>
                </div>
            </field-progress>            
        </div>
        <!-- 订单表单栏结束 -->
        <div v-show='currentPlantform.account'>
            <!-- 账号信息栏开始 -->
            <div class="accout-area">
                <mt-field
                    label="账号"
                    type="text"
                    :value="currentAccount.accountId"
                    :readonly="true">
                </mt-field>
                <mt-field
                    label="密码"
                    type="text"
                    :readonly="true"
                    :value="currentAccount.loginPwd">
                </mt-field>
                <mt-field
                    label="起始时间"
                    type="text"
                    :readonly="true"
                    :value="currentAccount.startDate">
                </mt-field>
                <mt-field
                    label="结束时间"
                    type="text"
                    :readonly="true"
                    :value="currentAccount.endDate">
                </mt-field>      	
            </div>
            <!-- 账号信息栏结束 -->
            <!-- 分享栏开始 -->
            <div class="share-area top-gap">
        	    <div class="flex-center">
        		    <i class="iconfont text-green sharebtn" @click="shareToFriends()">&#xe615;</i>
        		    <i class="iconfont text-green sharebtn" @click="shareOnMoments()">&#xe616;</i>
        	    </div>
                <div class="flex-center">
                	<span class='text-tiny' style="padding: .5rem 0">
                		分享账号，领取一天免费账号券
                	</span>
                </div>        	    
            </div>
            <!-- 分享栏结束 -->
        </div>    
	</div>
	<!-- switch plantforms begins -->
	<mt-popup class="mint-popup-1" :visible.sync="popupForPlantform">
        <div
            class= 'pop-opts text-large mint-popup-1-item'
            v-for= "item in plantformList"
            @click= 'switchPlantform(item.channelId)'
            >
        	{{ item.name }}
        </div>
    </mt-popup>
	<!-- switch plantforms ends -->
    <!-- choose date & duration begins -->
<!--     <mt-datetime-picker
        :visible.sync = "popupForDateTime"
        :start-date = "currentdate"
        :end-date = "enddate"
        type = "date"
        :value.sync = "currentOrder.startDate"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日">
    </mt-datetime-picker> -->
    <!-- choose date & duration ends -->
</div>
</template>

<script>
import FieldProgress from 'components/FieldProgress.vue'
import {
	setCurrentPlantform,
    openSignInPop,
    setPlantformList,
    setUserInfoBasic,
    setCurrentOrder
} from '../vuex/actions'
import { caculateDate } from 'src/util'

export default {
	vuex: {
		getters: {
			currentdate: state => state.currentdate,
            plantformList: state => state.plantform.plantformList,
			currentPlantform: state => state.plantform.currentPlantform,
            userInfoBasic: state => state.userinfo.basic
		},
		actions: {
            setPlantformList,
			setCurrentPlantform,
            openSignInPop,
            setUserInfoBasic,
            setCurrentOrder
		}
  	},
  	components:{
  		FieldProgress
  	},
	data () {
		return {
			pickerVisible: true,
			popupForPlantform: false,
			popupForDateTime: false,
            // 天数与起始日期双向绑定，所以currentOrder不放在store里
            currentOrder: {
                startDate: this.currentdate,
                dayNum: 1,
            }
		}
	},
	methods: {
        updateIndexData(){
            this.$$get('/app2/zhanghaopai/ChannelSvr/index')
            .then((data)=>{
                console.log(data)
                if(data){
                    if(data.list){
                        this.setPlantformList(data.list) //设置平台信息列表
                        this.setCurrentPlantform(data.list[0]) //设置当前激活平台 默认为第一个
                        this.currentOrder.channelId = data.list[0].channelId
                    }
                    if(data.SU) this.setUserInfoBasic(data.SU)
                }
            })            
        },
        // 选择天数
        updateDayNum(type){
            switch(type){
                case 0:
                    if(this.currentOrder.dayNum > 1)
                        this.currentOrder.dayNum--
                    break
                case 1:
                    if(this.currentOrder.dayNum < 7)
                        this.currentOrder.dayNum++
                    else
                        this.$Toast('最大购买天数为7天')
                    break
            }
        },
        // 选择开始日期
        updateStartDay(type){
            let cur = this.currentOrder.startDate
            let today = this.currentdate
            switch(type){
                case 0:
                    let resM = caculateDate.minus(cur, 1, today)
                    if(resM)
                        this.currentOrder.startDate = resM
                    else
                        this.$Toast('超过选择范围')
                    break
                case 1:
                    let resP = caculateDate.plus(cur, 1, today)
                    if(resP)
                        this.currentOrder.startDate = resP
                    else
                        this.$Toast('超过选择范围')
                    break
            }
        },
		sumbitOrder(){
			if(this.currentPlantform.account) return
            let c = this.currentOrder
            this.setCurrentOrder(Object.assign({},c))
            this.toPageRequiresSignin('/confirmorder')
		},
        //切换平台
		switchPlantform(chosen){
            // 根据选中的channelID 取出信息列表中对应的平台 设置为当前激活平台
			let target = this.plantformList.find(item => item.channelId == chosen)
			this.setCurrentPlantform(target)
			this.popupForPlantform = false
		},
		shareToFriends(){
            this.$Toast('share to your friends!')
		},
		shareOnMoments(){
			this.$Toast('share on your moments!')
		},
        toPageRequiresSignin(page){
            if(!this.userInfoBasic.userId){
                this.openSignInPop(true)
                return
            }
            this.$go(page)
        }
	},
	created(){
        this.updateIndexData()
    },
	computed:{
        formatDate(){
        	//format currentDay
            let origin = this.currentOrder.startDate
        	let d = [origin.getFullYear(), origin.getMonth()+1, origin.getDate()]
        	return d.join('-')
        },
        enddate(){
        	let curDate = new Date(this.currentdate)
        	let r = new Date((curDate/1000+86400*20)*1000) //一个月日期区间
        	return r
        },
        currentAccount(){
            if(this.currentPlantform.account){
                return this.currentPlantform.account
            }
            else {
                return {
                    accountId: null,
                    loginPwd: null,
                    startDate: null,
                    endDate: null
                }
            }
        }
	},
	route: {
		data ({ to, next }) {
            console.log(to)
			if(to.query.paysuccess == 1){
                this.updateIndexData()
            }
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
<style scoped lang="stylus">
border-radius()
    -webkit-border-radius: arguments
    -moz-border-radius: arguments
    border-radius: arguments
.mediabox
    margin 0
    padding 1rem 0 2rem 0
    background #0083ff
    background linear-gradient(to bottom, #00b2d3, #0083ff)
.mint-popup-1
	width 60%
	text-align center
	padding .3rem 0
	border-radius(8px)
	top 68px
	transform translate3d(-50%,0,0)
.tap-box-container
	padding: 1rem 0
.tap-box
	width 160px
	height 160px
	border-radius(50%)
	background-color transparent
	border 1px solid #fff
.pop-opts
    padding .5rem 0
    border-bottom 1px #eee solid
    &:last-child
        border-bottom none
    &:active
        background-color #eee
.setting-button
	position absolute
	right 1rem
	top .8rem
.accout-area
	background-color #fff
.sharebtn
    font-size 1.8rem
    padding 0 1.5rem
.change-day-btn
    padding 0 1rem
    &:first-child
        padding-left 0
.change-day-icon
    padding .5rem
</style>
