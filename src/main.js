import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getElementui from './plugins/element'
import './assets/css/reset.css'
import './assets/iconfont/iconfont.css'
import 'windi.css'

Vue.config.productionTip = false

// 持久化
let userinfo = sessionStorage.getItem('userinfo')
if (userinfo) {
  userinfo = JSON.parse(userinfo)
  store.commit('userModule/setUser', userinfo)
}

getElementui(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
