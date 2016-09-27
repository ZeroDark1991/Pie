<template>
<div  class="page">
<div class="container">
    <mt-header title="支付">
      	<mt-button @click="back(backPath)" class="left" slot="left">
          <span class="iconfont">&#xe602;</span> 
        </mt-button>
    </mt-header>
    <!-- data is loading -->
    <!-- <div v-if="$loadingRouteData" transition = "faded">
        <mt-spinner type="snake" color="#ff6632" :size="20"></mt-spinner>
    </div>  -->

        <!-- 支付方式 -->
    <div class="block">
        <mt-cell style="font-weight:bold;" title="支付方式"></mt-cell>
    </div>
    <div>
      <sw-radio
      class="payType"
          align = 'right'
          :value.sync="value"
          :options="[
                {label: '微信', value: 'weixin', icon: '&#xe60d;', icon_color: '#46dd6d',noVip:true},
                {label: '支付宝', value: 'zhifubao', icon: '&#xe60e;', icon_color: '#06b8f3',noVip:true},
                {label: leyouka.name, value: 'leyouka', icon: '&#xe61a;', icon_color: leyouka.color,noVip:leyouka.isVip,disabled:!leyouka.isVip}
            ]">
      </sw-radio>
    </div>
    <!-- 确认支付 -->
    <div class="orderPay bottomHeight" @click="toPay()">确认支付</div>
    </div>

    <!-- 输入密码 -->
      <mt-popup :visible.sync="payPwdVisible" popup-transition="popup-fade">
        <div id="payModel_box">
          <div class="payModel_text">请输入支付密码</div>
          <div class="payModel_content" @click="openFocus()">


            <input v-model="pwd" id="payPwd_input" maxlength="6" class="ui-input i-text" oncontextmenu="return false" onpaste="return false" autofocus="autofocus" oncopy="return false" oncut="return false" autocomplete="off" type="tel">
            <div class="sixDigitPassword">
                <i v-for="i in dotShow.length"><b v-show="dotShow[$index]"></b></i>
                <span class="guangbiao" style="left:0px;"></span>
            </div>


          </div>  
          <div class="payModel_text" style="margin-top:.5rem;position:relative;">
            <span @click="LYpay()" class="payModel_btn {{pwd.trim().length==6?'text-cyan':'text-grey' }}" plain>确认</span>
            <span @click="go('/forget_paykey')" class="payModel_forgetPwd text-small text-grey">忘记密码</span>
          </div>
          
        </div>
    </mt-popup>    
</div>  
</template>
<script>
import Service from '../service'
import SwRadio from '../components/radio'
import { setVipuser_store_info} from '../vuex/actions'
export default {
    vuex: {
      getters: {
        vipuser_info: state => state.vipuser_store,
      },
      actions: {
        setVipuser_store_info
      }
    },
  data () {
    return {
      leyouka:{
       name:"乐游卡（0.0）",
       color:'#f56f1c',
       isVip:true,
      },
      value: '',
      backPath:'',
      orderId:'',
      payPwdVisible:false,
      dotShow:[false,false,false,false,false,false],
      pwd:'',
      pwdInput:'',
      totalFee:'',
      aliId:'',
      pwdBtn:true

    }
  },
  methods:{
    go (link, param) {
    let self = this
    self.$transfer.go(self, link, param);
      },
    back (link, param) {
    let self = this
    self.$transfer.back(self, link, param);
      },
    toPay(){
      let self = this;
      self.$Indicator.open();
      if(!self.value){
        self.$Indicator.close();
        self.$Toast("请选择支付方式");
        return;
      }else{
        console.log(self.value)
        if(self.value =="zhifubao"){
            let s = {"id":self.orderId,"isAppPay":1};
            return Service(this, 'powerShop', 'AliPayPay', JSON.stringify(s))
            .then((data) => {
                //Write callBack codes here!
                self.$Indicator.close();
                if(!data) return;
                console.log(data);
                self.aliId = data.obj.aliId;
                self.totalFee = data.obj.totalFee;
                
                if(!Pointers.Pay) Pointers.Pay = self;
                app_order_alipay_vs2(self.aliId, self.totalFee, self.orderId,"order_alipay_callback_f"); 
                
          });

          
        }else if(self.value =="weixin"){
            let s = {"id":self.orderId,"isAppPay":1};
            return Service(this, 'powerShop', 'WxPay', JSON.stringify(s))
            .then((data) => {
                //Write callBack codes here!
                self.$Indicator.close();
                if(!data) return;
                console.log(data);
                self.aliId = data.obj.aliId;
                self.totalFee = data.obj.totalFee;
                if(!Pointers.Pay) Pointers.Pay = self;
                app_order_wxpay_vs2(self.aliId, self.totalFee, self.orderId,"order_wxpay_callback_f"); 
                
          });
     
        }else if(self.value =="leyouka"){
          self.pwd = "";
          self.pwdInput = "";
          self.dotShow = [false,false,false,false,false,false];
          self.payPwdVisible = true; 
          self.$Indicator.close();
          self.initPaykey();

        }
      }

    },
    openFocus(){
      let input = document.getElementsByClassName("i-text")[0];
      input.focus();
    },
    initPaykey () {
      // 密码自动跳格
      let self = this;
      let payPwd_input = document.getElementById("payPwd_input");
      let input = document.getElementsByClassName("i-text")[0];
      input.focus();
      input.onkeyup = function(e){
          let inputNew = ''+self.pwd.slice(self.pwdInput.length);
          let reg = /^\d{1}$/;
          if(inputNew == "" && self.pwdInput.length ==6 && e.keyCode != 8){
            self.$Toast("请点击确认按钮");
          }else {
            if(reg.test(inputNew) || e.keyCode == 8){
              self.pwdInput = self.pwd;
              self.dotShow = self.dotShow.map((item,i) => {
                return i<self.pwd.length?true:false
              })
            }else {
              self.$Toast("请输入数字密码");
              self.pwd= self.pwdInput;
              payPwd_input.value = self.pwdInput;
              return false;
            }
          }
          console.log(self.dotShow+"  inputNew:"+inputNew+"  self.pwdInput:"+self.pwdInput);
        }//end of keyup
      
    },
    LYpay(){  
      let self = this;
      if(self.pwdBtn){
        self.pwdBtn = false;
        self.$Indicator.open();
        if (self.pwd.trim().length == 6) {//六位input都不为空
          let id = self.orderId;
          let pwd = self.pwd;
          let s = {"id":id,"pwd":pwd};
          self.payPwdVisible = false; 

          //alert(JSON.stringify(s));
          return Service(this, 'powerShop', 'VipCardPay', JSON.stringify(s))
              .then((data) => {
                  //Write callBack codes here!
                  self.$Indicator.close();
                  self.pwdBtn = true;
                  if(!data) return;
                  console.log(data);
                  self.$Toast("支付成功！");
                  self.$transfer.back(self, '/order_detail', self.orderId);                  
            });
            
        }else {
            self.$Indicator.close();
            self.$Toast("请输入六位数字密码");
            self.pwdBtn = true;
            self.initPaykey ();
        }
      }
      
    }
  },
  components: {
    SwRadio
  },
  route: {
    data ({from,to,next}){
      let self = this;
      console.log(self.vipuser_info)
      
      let orderid = self.$route.params.orderId;
      let frompath = from.path;
      self.orderId = orderid;   
      if(frompath != "/forget_paykey"){
        self.backPath = frompath;
      }else{
        self.backPath = "/order_detail/"+self.orderId;
      }
      let s = {"id":self.orderId};  
      return Service(this, 'powerShop', 'UserOrderInfoNew', JSON.stringify(s))
            .then((data) => {
              console.log(data)
              if (self.vipuser_info) {
                self.leyouka.name='乐游卡('+self.vipuser_info.balance+'元)'
                self.leyouka.isVip = data.obj.factTotal>self.vipuser_info.balance ? false :true
                self.leyouka.color = data.obj.factTotal>self.vipuser_info.balance ? '#333' :'#f56f1c';
              }else{
                self.leyouka.name='乐游卡'
                self.leyouka.isVip = false
                self.leyouka.color = '#333'
              }
              console.log(self.leyouka.isVip)
            })
      self.value = '';
      self.payPwdVisible = false;
      self.dotShow = [false,false,false,false,false,false];
      self.pwd = ''
     
    }
  }   
}
</script>

<style lang="less" scoped>
  .block{
    margin-top:0.5rem;
  }
  .orderPay{
    color:#fff;
    font-size:1rem;
    height:2.5rem;
    line-height:2.5rem;
    text-align:center;
    background:#33d29f;
    position:absolute;
    width:100%;
    bottom:0;
  }
    .mint-popup{
    background:none;
  }
  #payModel_box{
    width:15rem;
    height:10rem;
    padding:0.5rem;
    background:#fff;
    border-radius:0.5rem;
    .payModel_text{
      text-align:center;
      height:1.5rem;
      line-height:1.5rem;
      font-size:0.8rem;
    }
    .payModel_content{
      text-align:center;
      height:4.4rem;
      line-height:4.4rem;
      border-bottom:1px solid #e5e5e5;
      position:relative;
      padding-top:1rem;
      .star{
        display:inline-block;
        margin:0 0.35rem;
        color:#FDAD0A;
        font-size:1.5rem;
      }
    }
    .payModel_btn{
      display:inline-block;
      height:2rem;
      line-height:2rem;
      width:4rem;
    }

    .payModel_forgetPwd{
      text-decoration:underline;
      position:absolute;
      top:0;
      right:0;
    }

    .payModel_content .i-text {
       position: absolute;
      opacity:0; 
      width: 12.6rem;
      height: 2.3rem;
      margin-left:-5.8rem;
      -webkit-user-select:initial;  /*取消禁用选择页面元素*/
      z-index: -999999;
      padding:0;
      color: #f00;
      letter-spacing: 2rem;
    }

    .payModel_content .sixDigitPassword {
      width: 14.4rem;
      padding-left:0.6rem;
      height: 2.3rem;
      background:#fff;
      position:relative; 
      left: -7.5rem;
      margin-left: 50%;
    }

    .payModel_content .sixDigitPassword i {
        width: 2.3rem;
        height: 2.3rem;
        float:left; 
        display:block;
        padding: 0.9rem;
        border:1px solid #eee;
        border-left:0;
    }

    .payModel_content .sixDigitPassword i:first-child {
        border-left:1px solid #eee;
    }

    .payModel_content .sixDigitPassword b {
        display: block; 
        margin: 0 auto; 
        width: 0.4rem; 
        height: 0.4rem;
        background-color: #000; 
        border-radius: 50%;
    }
  }
</style>
