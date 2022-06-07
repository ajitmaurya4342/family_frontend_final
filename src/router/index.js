import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/home'
import Admin from '@/components/pages/Admin'

// import offers&promotions from '@/components/pages/offers&promotion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    },
  
  ],

  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
