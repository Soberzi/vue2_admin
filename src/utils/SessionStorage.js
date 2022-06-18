import store from '../store/index.js'

// 持久化
let userinfo = sessionStorage.getItem('userinfo')
if (userinfo) {
  userinfo = JSON.parse(userinfo)
  store.commit('userModule/setUser', userinfo)
}
