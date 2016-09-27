export function configRouter (router) {

  // normal routes
  router.map({
    '/home': {
      component: require('./views/home.vue')
    },
    '/coupons': {
      component: require('./views/coupons.vue')
    },
    '/settings': {
      component: function(resolve) {
        require(['./views/settings.vue'],resolve) 
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
