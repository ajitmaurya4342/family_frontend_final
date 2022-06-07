import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/home'

// import offers&promotions from '@/components/pages/offers&promotion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: HomePage
    },
  
  ],

  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
