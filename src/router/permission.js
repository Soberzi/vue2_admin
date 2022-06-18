import store from '../store/index.js'
import router from './index.js'
// 路由拦截
router.beforeEach((to, from, next) => {
  // 判断是否用户是否登录，用循环检查每一个路由元信息有无isLogin等true
  if (to.matched.some(ele => ele.meta.isLogin)) {
    // 2.判断当前用户是否已经登录
    const token = store.state.userModule.userinfo.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next() // 不需要登录
  }
})
