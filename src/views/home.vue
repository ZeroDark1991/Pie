<template>
<div class="page">
	<div class="container">
        <!-- banner栏开始 -->
	    <div class="mediabox">
            <div class="flex-center site-box">
                <span
                    class="site-box text-extra text-white text-center"
                    style= "padding: .4rem 0;line-height: 1"
                    @click="switchPlantform()">
                    {{currentPlantform.name}}
                    <br/>
                    <i class="iconfont">&#xe60f;</i>
                </span>
		        <span
		            class="setting-button"
                    @click= "$go('/settings')">
		            <i class="iconfont text-white" style="font-size:1.2rem">&#xe60b;</i>
		        </span>
	        </div>	
            <div class="tap-box-container flex-center site-box">
                <div class="tap-box text-center" style="padding: .8rem 0;vertical-align: middle " @click='fetchAccount()'>
        		    <i
        		        class="iconfont text-white"
        		        style="font-size: 4rem"
        		        v-text="currentPlantform.bought?'&#xe617;':'&#xe61a;'"
        		        >
        		    </i>
                </div>
            </div>
    	    <div class="flex-center site-box text-white text-large">
    	        <span v-text="currentPlantform.bought?'已购买':'点击来个账号'"></span>
    	    </div>            	    
	    </div>
        <!-- banner栏结束 -->
        <!-- 订单表单栏开始 -->
        <div class="form—field" v-show='!currentPlantform.bought'>
            <mt-field
                label="起始时间"
                type="datetime"
                :value="formatDate"
                :readonly="true"
                @click="popupForDateTime= popupForDateTime?false:true">
            </mt-field>
            <field-progress :title="'购买天数'">
            	<mt-range
            	    slot='value'
                    :value.sync="productAmounts"
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
                    {{productAmounts}} 天
                </span>
            </field-progress>
        </div>
        <!-- 订单表单栏结束 -->
        <div v-show='currentPlantform.bought'>
            <!-- 账号信息栏开始 -->
            <div class="accout-area">
                <mt-field
                    label="账号"
                    type="text"
                    :value="'accountpie@163.com'"
                    :readonly="true">
                </mt-field>
                <mt-field
                    label="密码"
                    type="text"
                    :readonly="true"
                    value="123456778">
                </mt-field>
                <mt-field
                    label="起始时间"
                    type="text"
                    :readonly="true"
                    value="2016.10.11  12:00">
                </mt-field>
                <mt-field
                    label="结束时间"
                    type="text"
                    :readonly="true"
                    value="2016.10.15  12:00">
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
	<!-- change plantforms begins -->
	<mt-popup class="mint-popup-1" :visible.sync="popupForPlantform">
        <div
            class= 'pop-opts text-large mint-popup-1-item'
            v-for= "item in plantforms"
            @click= 'submitPlantform(item.name)'
            >
        	{{ item.name }}
        </div>
    </mt-popup>
	<!-- change plantforms ends -->
    <!-- choose date & duration begins -->
    <mt-datetime-picker
        cancel-text=''
        confirm-text=''
        :visible.sync = "popupForDateTime"
        :start-date = "currentdate"
        :end-date = "enddate"
        type = "datetime"
        :value.sync = "date">
    </mt-datetime-picker>
    <!-- choose date & duration ends -->
</div>
</template>

<script>
import Service from '../service'
import FieldProgress from '../components/FieldProgress.vue'
import {
	setUser_store_info,
	setCurrentPlantform
} from '../vuex/actions'

export default {
	vuex: {
		getters: {
			currentdate: state => state.currentdate,
			currentPlantform: state => state.plantform.currentPlantform
		},
		actions: {
			setUser_store_info,
			setCurrentPlantform
		}
  	},
  	components:{
  		FieldProgress
  	},
	data () {
		return {
			date: new Date(),
			pickerVisible: true,
			popupForPlantform: false,
			popupForDateTime: false,
            plantforms:[
                { name: '爱奇艺', bought: true},
                { name: '优酷', bought: false},
                { name: '乐视', bought: false},
            ],
            productAmounts: 1,
		}
	},
	methods: {
		fetchAccount(){
			if(this.currentPlantform.bought)
				return
			else
                this.$go('/orderdetail', '123123123')	
		},
		switchPlantform(){
			this.popupForPlantform = true
		},
		submitPlantform(chosen){
			let target = this.plantforms.find(item => item.name == chosen)
			this.setCurrentPlantform(target)
			this.popupForPlantform = false
		},
		shareToFriends(){
			this.$Toast('share to your friends!')
		},
		shareOnMoments(){
			this.$Toast('share on your moments!')
		}
	},
	created(){},
	computed:{
        formatDate(){
        	//format currentDay
        	let d = this.date
        	let minutes = d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()
        	return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 ${d.getHours()}:${minutes}`
        },
        enddate(){
        	let curDate = new Date(this.currentdate)
        	let r = new Date((curDate/1000+86400*30)*1000) //一个月日期区间
        	return r
        }
	},
	route: {
		data ({ to, next }) {
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
    font-size 1.5rem
    padding 0 1.5rem
</style>
