import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const TOKEN_KEY = 'access_token'
const COUNTRY = 'country'
const LANGUAGE = 'language'
/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const TokenService = {
  getToken() {
    return Vue.localStorage.get(TOKEN_KEY)
  },

  saveToken(accessToken) {
    Vue.localStorage.set(TOKEN_KEY, accessToken)
  },

  removeToken() {
    Vue.localStorage.remove(TOKEN_KEY)
  }
}

const LanguageService = {
  getLanguage() {
    return Vue.localStorage.get(LANGUAGE)
  },

  saveLanguage(language) {
    this.$localStorage.set(LANGUAGE, language)
  },

  removeLanguage() {
    this.$localStorage.remove(LANGUAGE)
  }
}

const CountryService = {
  getCountry() {
    return JSON.parse(Vue.localStorage.get(COUNTRY))
  },

  saveCountry(country) {
    Vue.localStorage.set(COUNTRY, JSON.stringify(country))
  },

  removeCountry() {
    Vue.localStorage.remove(COUNTRY)
  }
}
export {
  TokenService,
  LanguageService,
  CountryService
}
