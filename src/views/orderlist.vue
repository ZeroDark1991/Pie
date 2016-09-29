<template>
	<div class="page">
	    <mt-header fixed title="订单列表">
            <mt-button @click="$back('/settings')" class="left" slot="left">
                <span class="iconfont">&#xe609;</span> 
            </mt-button>
        </mt-header>
		<div class="container-top">
			
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		route:{
			data({next}){
				next()
			}
		}
	}
</script>