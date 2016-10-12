<template>
	<mt-progress
	    id="progressing"
	    v-show="showProgressBar"
	    :value="progressingValue"
	    :bar-height="3">
	    </mt-progress>
</template>
<script>
	export default {
		vuex:{
			getters:{
				progressingValue: state => state.progress.progressingValue,
				showProgressBar: state => state.progress.showProgressBar,
			}
		},
		data(){

		}
	}
</script>
<style lang="stylus" scoped>
#progressing
    position fixed
    height 3px
    z-index 200
    width 100%
    background-color #fff
</style>