import store from '../store/index.js'

// ζδΉε
let userinfo = sessionStorage.getItem('userinfo')
if (userinfo) {
  userinfo = JSON.parse(userinfo)
  store.commit('userModule/setUser', userinfo)
}
