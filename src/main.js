import Vue from 'vue'
import Vuex from 'vuex'
import app from './App'
require('es6-promise').polyfill()

import _ from 'lodash/core'

//router
import VueRouter from 'vue-router'
import { configRouter } from './route-config'
import { sync } from 'vuex-router-sync'

//vuex
import store from './vuex/store'

// UI layout & components
import 'mobi.css'
import './assets/icon.css'
import './assets/common.css'
import './assets/trainsition.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/mint_cover.css'

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

// remove click delay
import Fastclick from 'fastclick'
Fastclick.attach(document.body)

Vue.use(Vuex)
Vue.use(Mint)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.prototype.$go = $go
Vue.prototype.$back = $back
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Toast = _MyToast
Vue.prototype.$imgHandler = imgHandler
Vue.prototype.$Indicator = Indicator

function _MyToast(message){
	Toast({
		message: message,
		duration: 1500
	})
}

const router = new VueRouter()
const App = Vue.extend(app)

// configure router
configRouter(router)

sync(store, router)

router.start(App, '#app')

window._Router = router
window._ = _