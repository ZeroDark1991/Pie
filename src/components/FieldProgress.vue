<template>
    <div>
        <a class="mint-cell">
            <div class="mint-cell-title" style="padding-left:1rem">
                <span class="mint-cell-text">{{title}}</span>
                <slot name="label"></slot>
            </div>

            <div class="mint-cell-value"
                style="">
                <slot name="value"></slot>
            </div> 
        </a>
    </div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		props:['title']
	}
</script>
<style lang="stylus" scoped>
.mint-cell-value
	-webkit-box-flex: 2.5
	-ms-flex: 2.5
	flex: 2.5
	position: relative
	padding-right: 1rem
.mint-cell:after
	border-top: none
</style>