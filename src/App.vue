<template>
    <div>
        <!-- <progress-bar></progress-bar> -->
        <router-view :transition="transfer" keep-alive></router-view>
        <div class="home-mask" v-show="mask"></div>
        <vue-progress-bar></vue-progress-bar>
        <mt-popup
            class="signin-pop"
            :visible.sync="signinPop"
            position='bottom'>
            <sign-in></sign-in>
        </mt-popup>
    </div>
</template>

<script>
import store from './vuex/store'
import SignIn from 'components/SignIn'

export default {
  store: store,
  vuex: {
    getters: {
        _signinPop: state => state.userinfo.signinPop
    }
  },
  data () {
    return {
      mask: false,
      transfer: 'slide',
    }
  },
  components: {
    SignIn
  },
  computed: {
    // mt-popup expects two-ways binding, but .sync try to set the value from getters of vuex
    // which suppose to be read-only
    // so put it here to solve the warning
    signinPop() {
        return this._signinPop
    }
  },
  events: {
    transfer (type) {
      this.transfer = type
    }
  }
}
</script>
<style lang="stylus">
.v-link-active

[v-cloak]
    display none   
.signin-pop
    width 100%
    height 100%
</style>