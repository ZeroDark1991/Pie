import Vue from 'vue'
import Vuex from 'vuex'
import app from './App'

require("babel-polyfill")

//router
import VueRouter from 'vue-router'
import { configRouter } from './route-config'
// import { sync } from 'vuex-router-sync'
import VueProgressBar from 'vue-progressbar'

//vuex
// import store from './vuex/store'

// UI layout & components
import 'mobi.css'
import 'assets/icon.css'
import 'assets/common.css'
import 'assets/trainsition.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'assets/mint_cover.css'
import 'assets/mix.styl'

import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'

//transition control
import { $go, $back } from './transfer'

//image Handler
import imgHandler from './imgHandler'

//Indicator
import { Indicator } from 'mint-ui'

// vue-resouce
import VueResource from 'vue-resource'
import * as Service from './service'
// remove click delay
import Fastclick from 'fastclick'
Fastclick.attach(document.body)

Vue.use(Vuex)
Vue.use(Mint)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueProgressBar, {
  color: 'rgb(90, 255, 172)',
  failedColor: 'red',
  height: '3px'
})

Vue.http.headers.common['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8"

let p = Vue.prototype
p.$$get = Service.get
p.$$post = Service.post
p.$go = $go
p.$back = $back
p.$MessageBox = MessageBox
p.$Toast = _MyToast
p.$imgHandler = imgHandler
p.$Indicator = Indicator

function _MyToast(message){
	Toast({
		message: message,
		duration: 1000
	})
}

const router = new VueRouter()
const App = Vue.extend(app)

// configure router
configRouter(router)

// sync(store, router)

router.start(App, '#app')
window._Router = router