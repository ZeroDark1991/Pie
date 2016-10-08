<template>
	<div class="page">
	    <mt-header fixed title="订单列表">
            <mt-button @click="$back('/settings')" class="left" slot="left">
                <span class="iconfont">&#xe609;</span> 
            </mt-button>
            <mt-button @click="reload()" slot="right">
                <span class="iconfont">&#xe610;</span> 
            </mt-button>
        </mt-header>
		<div class="container-top">

		    <div v-if='orderlist.length == 0' class="text-center" style="margin-top: 1rem">
                <span>暂无订单信息</span>
		    </div>
		    	
		    <div v-else>
			    <div v-for='order in orderlist'>
		            <order
                        :order= "order"
                        @click="$go('orderdetail', order.id)"
                        >
                    </order>
			    </div>
		    </div>

		</div>
	</div>
</template>
<script>
    import order from '../components/order.vue'

	export default {
		data(){
			return {
                orderlist:[
                    {
                    	id: 123123123,
                    	time: '2016-2-2 14:00',
                    	detail: '爱奇艺账号 9.11-9.13',
                    	price: 2,
                    	coupon: '7折',
                    	status: '已完成'
                    },
                    {
                    	id: 12222222313,
                    	time: '2016-2-2 14:00',
                    	detail: '爱奇艺账号 9.11-9.13',
                    	price: 0.2,
                    	coupon: null,
                    	status: '未付款'
                    }                    
                ]
			}
		},
		methods:{
            reload(){
            	this.$Toast('Page Reloading')
            }
		},
		components:{
			order
		},
		route:{
			data({next}){
				next()
			}
		}
	}
</script>