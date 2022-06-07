import CryptoJS from 'crypto-js'
import _ from 'lodash'
import localforage from 'localforage'

var secretKey = 'HereIsTheMySecretKey_LOL'

export const secureStore = {
  set: function (key, value) {
    console.log('here >>')
    let setEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString()
    // this.$persistStore.set(key, setEncryptedData);
    window.localStorage.setItem(key, setEncryptedData)
  },
  get: function (key) {
    // this.$persistStore.get(key);
    let getEncryptedData = window.localStorage.getItem(key)
    console.log(!_.isNull(getEncryptedData), 'Here >>', getEncryptedData)
    if (!_.isNull(getEncryptedData)) { return JSON.parse(CryptoJS.AES.decrypt(getEncryptedData, secretKey).toString(CryptoJS.enc.Utf8)) }
    return null
  },
  clear: function () {
    window.localStorage.clear()
  }
}

export const indexStore = {
  set: function (key, value) {
    let setEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString()
    localforage.setItem(key, setEncryptedData)
  },
  get: function (key) {
    let getEncryptedData = localforage.getItem(key)
    if (!_.isNull(getEncryptedData)) { return JSON.parse(CryptoJS.AES.decrypt(getEncryptedData, secretKey).toString(CryptoJS.enc.Utf8)) }
    return null
  },
  clear: function () {
    localforage.clear()
  }
}
