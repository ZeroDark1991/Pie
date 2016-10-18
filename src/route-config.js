export function configRouter (router) {

  // normal routes
  router.map({
    '/home': {
      component: require('./views/home.vue')
    },
    '/couponlist': {
      component: require('./views/couponlist.vue')
    },
    '/activedcoupons': {
      component: require('./views/activedCoupons.vue')
    },    
    '/settings': {
      component: function(resolve) {
        require(['./views/settings.vue'],resolve) 
      }
    },
    '/pay': {
      component: function(resolve) {
        require(['./views/pay.vue'],resolve) 
      }
    },
    '/orderdetail/:orderId':{
      component: function(resolve){
        require(['./views/orderDetail.vue'],resolve)
      }
    },
    '/confirmorder':{
      component: function(resolve){
        require(['./views/confirmOrder.vue'],resolve)
      }
    },    
    '/orderlist': {
      component: function(resolve){
        require(['./views/orderlist.vue'], resolve)
      }
    },
    '/newslist': {
      component: function(resolve){
        require(['./views/newslist.vue'], resolve)
      }
    },
    '/newsdetail/:newsId': {
      component: function(resolve){
        require(['./views/newsDetail.vue'], resolve)
      }
    },
    '/userinfo': {
      component: function(resolve){
        require(['./views/userEditor.vue'], resolve)
      }
    }    
    // // not found handler
    // '*': {
    //   component: require('./components/not-found.vue')
    // },
  })

  // redirect
  router.redirect({
    '/': '/home',
  })

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
 
  /* 
   * here I put a home-mask (a absolute & transparent lay)
   * to cover the .3s duration animation when pages switch
   */

  router.beforeEach(({from,next}) => {
    router.app.mask = true
    next()
  })
  
  router.afterEach(({from,next}) => {
    setTimeout(()=>{
        router.app.mask = false    
    },500)
  })  
}
