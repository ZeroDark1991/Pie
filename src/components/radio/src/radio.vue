<template>
  <div class="mint-radiolist">
    <label class="mint-radiolist-title" v-text="title"></label>
    <x-cell v-for="option in options" :class="{ isGary: !option.noVip }">
      <label slot="title">
          <span 
            v-show="option.noVip"
            :class="{'is-right': align === 'right'}"
            class="mint-radio">
            <input
              class="mint-checkbox-core"
              :id = "'sw-radio' + option.value"
              type="radio"
              v-model="value"
              :disabled="option.disabled"
              :value="option.value || option">
          </span>

          <label
              :for="'sw-radio' + option.value"
              class="mint-radio-label iconfont"
              :style="{color: option.icon_color || '#333',fontSize: '1.5rem'}"
              v-text="option.icon || '' ">
          </label>
          
          <label
              :for="'sw-radio' + option.value"
              class="mint-radio-label"
              v-text="option.label || option">           
          </label>
      </label>
    </x-cell>
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
 * @param {string} icon - iconfont unicode 字符(可选)
 * @param {string} icon_color - icon颜色(可选)
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
    value: String
  },
  components: {
    XCell
  }
};
</script>

<style lang="css">
.isGary{
  background-color: #ccc;
}
</style>