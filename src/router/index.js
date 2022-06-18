import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/pages/home";
import Home1 from "@/components/pages/home-1";
import Home2 from "@/components/pages/home-2";
import Home3 from "@/components/pages/home-3";
import Admin from "@/components/pages/Admin";

// import offers&promotions from '@/components/pages/offers&promotion'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage
    },
    {
      path: "/home-1",
      name: "Home1",
      component: Home1
    },
    {
      path: "/home-2",
      name: "Home2",
      component: Home2
    },
    {
      path: "/home-3",
      name: "Home3",
      component: Home3
    },
    {
      path: "/Admin",
      name: "Admin",
      component: Admin
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  }
});
