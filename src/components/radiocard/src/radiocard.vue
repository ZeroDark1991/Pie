<template>
	<div class="mint-radiolist">
		<label class="mint-radiolist-title" v-text="title"></label>
		<div v-for="option in options" style="position:relative;z-index: 0">
			<x-cell>
				<label slot="title">
					<span
						:class="{'is-right': align === 'right'}"
						class="mint-radio">

						<span
						    v-show="option.value === value">
						    [默认车辆]
					    </span>	
						<input
							class="mint-checkbox-core"
							:id = "'sw-radio' + option.value"
							type="radio"
							v-model="value"
							:disabled="option.disabled"
							:value="option.value || option">
							
					</span>
					<label
						:for="'sw-radio' + $index"
						class="mint-radio-label mint-radiocard-title"
						v-text="option.label || option">
					</label>
					<label
				        v-for="item in option.detail || '' "
						:for="'sw-radio' + option.value"
						class="mint-radio-label mint-radiocard-detail"
						v-text="item">           	
					</label>
					
				</label>
				
			</x-cell>
			<div class="deleteCard" v-on:click="notify(option.value,$index)">删除</div>
		</div>

	</div>
</template>

<script>
import XCell from '../../cell/index.js';
/**
 * mt-radio
 * @module components/radio
 * @desc 单选框列表，依赖 cell 组件
 *
 * @param {string[], object[]} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string} value - 选中值
 * @param {string} title - 标题
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 * @example
 * <mt-radio :value.sync="value" :options="['a', 'b', 'c']"></mt-radio>
 */
export default {
  name: 'sw-radio',
  props: {
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: String,
  },
  methods: {
    notify: function (carId,index) {
    	this.$dispatch('deleteCard',carId,index)
    }
  },
  components: {
    XCell
  }
};
</script>

<style lang="css">
	.deleteCard{
	    color: #fff;
	    background-color: #f00;
	    position: absolute;
	    top: 0;
	    right: 0px;
	    text-align: center;
	    color: #fff;
	    width: 100px;
	    height:99.9%;
	    z-index: -1;
	    line-height: 4.6rem;
	}
	.mint-radiocard-title{
		display: block;
		margin-bottom: .5rem;
	}
	.mint-radiocard-detail{
		color: #9e9e9e;
		display: block;
		line-height: 1.5;
	}
	.mint-cell{
		overflow: visible;
	}
</style>