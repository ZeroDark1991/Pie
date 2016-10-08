<template>
<div class="page">
	<!-- Header -->
	<div class="container">
	    <div class="mediabox">
            <div class="flex-right site-box">
		        <span
		            style= "font-size:.7rem; padding: .4rem 5% 0 5%;"
                    @click= "$go('/settings')"
		            >
		            <i class="iconfont text-white">&#xe60b;</i>
		        </span>
	        </div>	
            <div class="flex-center site-box">
                <span
                    class="site-box text-large text-white"
                    @click="switchPlantform()">
                    {{currentPlanform.name}}<i class="iconfont">&#xe60f;</i>
                </span>
            </div>
            <div class="flex-center site-box" style="padding: 1.2rem 0;">
                <div class="tap-box" @click='fetchAccount()'>
            	    <div class="flex-center top-gap site-box">
            		    <i class="iconfont text-white" style="font-size: 3.4rem">&#xe60c;</i>
            	    </div>
            	    <div class="flex-center site-box text-white text-large"
            	        style="margin-top: -0.6rem">来个账号
            	    </div>
                </div>
            </div>		    
	    </div>
        <div class="flex-center site-box top-gap">
            <div class="site-box text-center text-extra">
        	    <div>
        	        <span  style="border-bottom:1px solid #ddd">{{ currentdate.year }}年{{ currentdate.month }}月{{ currentdate.day }}日</span>
        	        <span  style="border-bottom:1px solid #ddd">{{ currentdate.hour }}:00</span>
        	    </div>
        	    <div class='top-gap'>
        	        <span>购买</span>
        	        <input class="text-extra text-center" style="width: 2rem" :value='1' disabled="true">
        	        <span>天</span>
        	    </div>
            </div>
        </div>
	</div>
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
</div>
</template>

<script>
import Service from '../service'
import {
	setUser_store_info,
} from '../vuex/actions'

export default {
	vuex: {
		getters: {
			currentdate: state => state.currentdate,
		},
		actions: {
			setUser_store_info,
		}
  	},
	data () {
		return {
			popupForPlantform: false,
            plantforms:[
                { name: '爱奇艺' },
                { name: '优酷' },
                { name: '乐视' },
            ],
            currentPlanform: {
            	name: '爱奇艺'
            }
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
			this.currentPlanform.name = chosen
			this.popupForPlantform = false
		}
	},
	created(){
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
    padding 0
    background #0083ff
    background linear-gradient(to bottom, #22c9ff 10%, #0083ff)
span
	padding .2rem
	margin 0 .2rem
.mint-popup-1
	width 60%
	text-align center
	padding .3rem 0
	border-radius(8px)
	top 85px
	transform translate3d(-50%,0,0)
.mint-popup-1-item:before
    display inline-block
    width 0
    height 0
    border solid transparent
    border-width 10px
    border-bottom-color #fff
    content ''
    position absolute
    top -20px
    right 45%
.cushion
	bottom 2.5rem
    position absolute
    top 0
    right 0
    left 0
.tap-box 
	width 150px
	height 150px
	border-radius(50%)
	background-color transparent
	border 2px solid #fff
.pop-opts
    padding .3rem 0
    border-bottom 1px #eee solid
    &:last-child
        border-bottom none
    &:active
        background-color #eee
.top-gap 
	margin-top 16px
</style>
