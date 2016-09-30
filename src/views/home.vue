<template>
<div class="page">
	<!-- Header -->
	<mt-header fixed title="账号派">
		<mt-button slot="right" @click="$go('/settings')">
			<span style="font-size:.7rem; padding: .5rem .3rem .5rem 1.2rem;">
			    <i class="iconfont">&#xe60b;</i>
			</span>
		</mt-button>
	</mt-header>
	<div class="container-top" style="background-color: #f4f4f4">
        <div class="flex-center top-gap site-box">
            <span
            class="site-box text-large"
            style= 'border-bottom: 1px solid #0083ff'
            @click="switchPlantform()">
                {{currentPlanform.name}}<i class="iconfont">&#xe60f;</i>
            </span>
        </div>
        <div class="flex-center site-box" style="padding: 1rem 0;">
            <div class="tap-box" @click='fetchAccount()'>
            	<div class="flex-center top-gap site-box">
            		<i class="iconfont text-white" style="font-size: 3.4rem">&#xe60c;</i>
            	</div>
            	<div class="flex-center site-box text-white text-large"
            	    style="margin-top: -0.6rem">来个账号
            	</div>
            </div>
        </div>
        <div class="flex-center site-box">
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
        :visible.sync="popupForPlantform">
        <div
            class= 'pop-opts text-large mint-popup-1'
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
<style scoped>
span{
	padding: .2rem;
	margin: 0 .2rem;
}
.mint-popup{
	width: 60%;
	text-align: center;
	padding: .3rem 0;
	border-radius: 8px;
	top: 110px;
	transform: translate3d(-50%,0,0);
}
.mint-popup-1:before {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #fff;
    content: '';
    position: absolute;
    top: -20px;
    right: 45%;
}
.cushion {
	bottom: 2.5rem;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
.tap-box {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	background-color: #0083ff;
}
.pop-opts{
	padding: .3rem 0;
	border-bottom: 1px #eee solid;
}
.pop-opts:last-child{
	border-bottom: none;
}
.pop-opts:active{
	background-color: #eee;
}
.top-gap {
	margin-top: 16px;
}
</style>
