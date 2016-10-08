<template>
    <div>
        <router-view :transition="transfer" keep-alive></router-view>
        <div class="home-mask" v-show="mask"></div> 
    </div>
</template>

<script>
import store from './vuex/store'

export default {
  store: store,
  data () {
    return {
      mask: false,
      transfer: 'slide',
    }
  },
  events: {
    transfer (type) {
      this.transfer = type
    }
  }
}
</script>
<style lang='stylus'>
.v-link-active

[v-cloak]
    display none
</style>