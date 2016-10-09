<template>
<div class="page">
	<!-- Header -->
	<div class="container">
	    <div class="mediabox">
            <div class="flex-center site-box">
                <span
                    class="site-box text-extra text-white text-center"
                    style= "padding: .4rem 0;line-height: 1"
                    @click="switchPlantform()">
                    {{currentPlantform.name}}
                    <br/><i class="iconfont">&#xe60f;</i>
                </span>
		        <span
		            class="setting-button"
                    @click= "$go('/settings')"
		            >
		            <i class="iconfont text-white" style="font-size:1.2rem">&#xe60b;</i>
		        </span>
	        </div>	
            <div class="tap-box-container flex-center site-box">
                <div class="tap-box" style="padding: .4rem 0;" @click='fetchAccount()'>
            	    <div class="flex-center site-box">
            		    <i class="iconfont text-white" style="font-size: 5rem">&#xe60c;</i>
            	    </div>
                </div>
            </div>
    	    <div class="flex-center site-box text-white text-large">
    	        点击来个账号
    	    </div>            	    
	    </div>
        <div class="form—field">
            <mt-field
                label="起始时间"
                type="datetime"
                :value="formatDate"
                :disabled="true"
                @click="this.popupForDateTime= this.popupForDateTime?false:true">
            </mt-field>
            <mt-field
                label="购买天数"
                type="number"
                :disabled="true"
                value="1">
            </mt-field>       	
        </div>
        <div class="accout-area top-gap">
            <mt-field
                label="当前账号"
                type="text"
                :value="'accountpie@163.com'"
                :disabled="true">
            </mt-field>
            <mt-field
                label="密码"
                type="number"
                :disabled="true"
                value="123456778">
            </mt-field>         	
        </div>   
	</div>
	<!-- change plantforms -->
	<mt-popup
	    class="mint-popup-1"
        :visible.sync="popupForPlantform">
        <div
            class= 'pop-opts text-large mint-popup-1-item'
            v-for= "item in plantforms"
            @click= 'submitPlantform(item.name)'
            >
        	{{ item.name }}
        </div>
    </mt-popup>
    <!-- choose date & duration -->
    <mt-datetime-picker
        cancel-text=''
        confirm-text=''
        :visible.sync = "popupForDateTime"
        :start-date = "currentdate"
        :end-date = "enddate"
        type = "datetime"
        :value.sync = "date">
    </mt-datetime-picker>
</div>
</template>

<script>
import Service from '../service'
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
	data () {
		return {
			date: new Date(),
			pickerVisible: true,
			popupForPlantform: false,
			popupForDateTime: false,
            plantforms:[
                { name: '爱奇艺' },
                { name: '优酷' },
                { name: '乐视' },
            ],
		}
	},
	methods: {
		fetchAccount(){
            this.$go('/orderdetail', '123123123')	
		},
		switchPlantform(){
			console.log(1)
			this.popupForPlantform = true
		},
		submitPlantform(chosen){
			this.setCurrentPlantform({ name: chosen })
			this.popupForPlantform = false
		}
	},
	created(){
	},
	computed:{
        formatDate(){
        	let d = this.date
        	let minutes = d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()
        	let r = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 ${d.getHours()}:${minutes}`
        	return r
        },
        enddate(){
        	let curDate = new Date(this.currentdate)
        	let r = new Date((curDate/1000+86400*30)*1000)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.cushion
	bottom 2.5rem
    position absolute
    top 0
    right 0
    left 0
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
.top-gap 
	margin-top 16px
.setting-button
	position absolute
	right 1rem
	top .8rem
.accout-area
	background-color #fff	
</style>
