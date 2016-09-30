<template>
<div class="page">
  
    <mt-header fixed title="我的优惠券">
      	<mt-button @click="$back('/settings')" class="left" slot="left">
          <span class="iconfont">&#xe609;</span>  
        </mt-button>
    </mt-header>
    <!-- data is loading --> 
  <div class="content container-top">
    <div v-if="$loadingRouteData" class="loading">
        <mt-spinner type="triple-bounce" color="#f56f1c" :size="20"></mt-spinner>
    </div>
<!--     <div class="content"> -->
        <div class="coupon round" v-for="list in lists">
          <div class="box-left text-red">
             <span class="text-small">¥</span>{{ list.coupon_price }}
            <div class="circle-small">
              ●●●●●●●●●
            </div>
            <div class="circle-big top"></div>
            <div class="circle-big bottom"></div>
          </div>
          <div class="box-right">
            <span>{{ list.coupon_type }}</span>
            <p>
               满{{ list.full_price }}元可以使用<br>
               有效期：{{ list.time1 }}至{{ list.time2 }}
            </p>
          </div>
        </div>
        <div v-if="ifHave" style="width:100%;margin-bottom:.6rem;text-align:center">您没有可用的优惠券</div>
        
        <!-- 过期优惠券 -->
        
	        <div class="coupon overdue" v-for="list_over in list_overs" v-show="show">
	          <div class="box-left text-grey">
	            <span class="text-small">¥</span>{{ list_over.coupon_price }}
	            <div class="circle-small">
	              ●●●●●●●●●
	            </div>
	            <div class="circle-big top"></div> 
	            <div class="circle-big bottom"></div>
	          </div>
	          <div class="box-right">
	            <div class="overdue-font">{{ list_over.canUse }}</div>
	            <p style="margin-top:1.6rem">
	               满{{ list_over.full_price }}元可以使用<br>
	               有效期：{{ list_over.time1 }}至{{ list_over.time2 }}
	            </p>
	          </div>
	        </div>

          <div class="btn text-grey" v-if="btn" type="default" size="small" @click="watch">{{ msg }}</div>
	   
<!--     </div> -->
  </div>  
</div>  
</template>

<script>
import Service from '../service'
export default {
  data () {
    return {
      msg:'查看历史优惠券',
      ifHave:false,
      show: false,
      btn:false,
      lists:[
      ],
      list_overs:[
      ]
    }
  },
  methods:{
    back (link) {
      this.$transfer.back(this, link)
    },
    
    watch:function(){
    	if(this.msg=='查看历史优惠券'){
    		this.show=true
    		this.msg='收起'
    	}
    	else{
    		this.show=false
    		this.msg='查看历史优惠券'
    	}  	
    }
  },
  created(){

  },
  route: {
    data ({ to,next }) {
        return Service.bind(this)('powerShop', 'UserCouponFetch', '')
        .then((data) => {
            console.log(data)
            //Write callBack codes here!
        
        })  

    },//页面加载完成执行
    deactivate ({ next }) {
    //Triggers when component destroys
        let self = this
        console.log('coupons deactivated!')
        self.ifHave = false
        self.show = false
        self.btn = false
        self.msg = '查看历史优惠券'
        next()
    }

  }  
}
</script>

<style scoped>
    .loading{
      margin-top:-0.5rem;
      margin-bottom:1rem;
    }
    .content{
        box-sizing:content-box !important;
        padding:.5rem 1.0rem 0;
    }
    .coupon{
        width:100%;
        height:5.3rem;
        margin:0 auto;
        background:#efefef;
        /*border-radius: 5%;*/
        margin-bottom:0.6rem;
        overflow:hidden;
    }
    .cou-first{
      margin-top:0.8rem;
    }

    .box-left{
      position:relative;
      float:left;
      width:30%;
      height:5.3rem;
      /*box-flex:1.0;*/
      text-align: center;
      font-size:2rem;
      padding:1rem 0;
    }
    .box-left span{
      margin-right:0.1rem;
    }
    .circle-small{
      position:absolute;
      top:0.5rem;
      right:-0.2rem;
      width:0.2rem;
      height:5.3rem;
      /*overflow: hidden;*/
      line-height:1.2;
      font-size:0.4rem;
      word-wrap: break-word;
      color:#f7f7f7;
    }
    .circle-big{
      position:absolute; 
      width:.5rem;
      height:.5rem;
      border-radius: 50%;
      background:#f7f7f7;
    }
    .top{
      top:-0.15rem;
      right:-0.4rem;
    }
    .bottom{
      bottom:-0.15rem;
      right:-0.4rem;
    }
    .box-right{
      float:right;
      width:70%;
      /*box-flex:2.684;*/
      height:5.3rem;
      padding:.6rem 0 0 1.4rem;
    }
    .overdue{
      opacity: 0.9;
    }
    .box-right >span{
      font-size:0.9rem;
      font-weight:bold;
    }
    .overdue-font{
      float:right;
      margin-right:1.0rem;
      font-size:0.7rem;
      color:#b7b7b7;
    }
    .box-right >p{
      font-size:.6rem;
      margin-top:.3rem;
      line-height:1.8;
      color: #767575;
    }
    .btn{
      width:100%;
      text-align:center;
      height:2.5rem;
      line-height:2.5rem;
      margin-top:-0.5rem;
    }
  </style>