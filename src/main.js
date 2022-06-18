import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getElementui from './plugins/element'
import './assets/css/reset.css'
import './assets/iconfont/iconfont.css'
import 'windi.css'
// 导入 echarts
import * as echarts from 'echarts'
import 'animate.css'

// 导入语言
import i18n from './lang/index.js'
import './router/permission.js'
import './utils/SessionStorage.js'

getElementui(Vue)

// 挂载原型上 全局使用
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
