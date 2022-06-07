// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Meta from 'vue-meta'
import Slick from 'vue-slick'
import VueLocalStorage from 'vue-localstorage'
import GSignInButton from 'vue-google-signin-button'
import FBSignInButton from 'vue-facebook-signin-button'
import Carousel3d from 'vue-carousel-3d'
// import {  } from "@/components/";
import 'vue-tel-input/dist/vue-tel-input.css';
import VeeValidate from "vee-validate";
import CryptoJS from "crypto-js";
import _ from "lodash";
var secretKey = "HereIsTheMySecretKey_LOL";
var VueScrollTo = require('vue-scrollto');

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'slick-carousel/slick/slick.css'
import './assets/css/slick-theme.css'
import './assets/css/style.css'
import './assets/css/responsive.css'
import VueTelInput from 'vue-tel-input'
import VueHtmlToPaper from 'vue-html-to-paper';
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
var pjson = require('../package.json');
// Vue.use(VueScrollTo)
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -100,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}
Vue.use(VueHtmlToPaper, options);
Vue.use(VueTelInput)

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading)
Vue.mixin({
  data: function () {
    return {
      LOADING: null,
      packageVersion: pjson,
      // isShowLoading: false,
      countryId: 230,
      languageId: 2,
      selectedMainDate: "",
      secureStore: {
        set: function (key, value) {
          let setEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
          window.localStorage.setItem(key, setEncryptedData);
        },
        get: function (key) {
          let getEncryptedData = window.localStorage.getItem(key);
          if (!_.isNull(getEncryptedData))
            return JSON.parse(CryptoJS.AES.decrypt(getEncryptedData, secretKey).toString(CryptoJS.enc.Utf8))
          return null;
        },
        remove: function (key) {
          window.localStorage.removeItem(key);
        }
      },
      sessionStore: {
        set: function (key, value) {
          let setEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
          window.sessionStorage.setItem(key, setEncryptedData);
        },
        get: function (key) {
          let getEncryptedData = window.sessionStorage.getItem(key);
          if (!_.isNull(getEncryptedData))
            return JSON.parse(CryptoJS.AES.decrypt(getEncryptedData, secretKey).toString(CryptoJS.enc.Utf8))
          return null;
        },
        remove: function (key) {
          window.sessionStorage.removeItem(key);
        }
      },
      encrypt: function (value) {
        CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
      },
      decrypt: function (value) {
        return JSON.parse(CryptoJS.AES.decrypt(value, secretKey).toString(CryptoJS.enc.Utf8))
      }
    }
  },
  methods: {
    showLoading: function () {
      this.LOADING = this.$loading.show({
        color: '#e70d00',
        loader: 'spinner',
        width: 105,
        height: 105,
        class: 'css-loader',
        backgroundColor: 'rgba(0, 0, 0, 0.5);',
        opacity: 0.5,
        zIndex: 99999,
      })
      document.body.classList.add('modal-open')
    },

    hideLoading: function () {
      this.LOADING ? this.LOADING.hide() : "";
      document.body.classList.remove('modal-open')
    },

  }
})
Vue.use(Carousel3d);
Vue.use(VeeValidate);
Vue.use(GSignInButton)
Vue.use(FBSignInButton)
Vue.use(Meta)
Vue.use(BootstrapVue)
Vue.use(VueLocalStorage, {
  name: 'persistStore'
})
Vue.config.productionTip = false

// Created the Event Bus for the call parent function
export const EventBus = new Vue()
const Calendar = Vue.component('calendar', {
  template: "#calendar",
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
