// user模块数据
export default {
  // 开启命名空间
  namespaced: true,
  state: () => ({
    userinfo: {
      user: '',
      token: ''
    }
  }),
  getters: {
  },
  mutations: {
    // 设置用户信息
    setUser (state, value) {
      state.userinfo = value
    },
    // 清空信息
    cleanUser (state) {
      state.userinfo.user = ''
      state.userinfo.token = ''
    }
  },
  actions: {
  }
}
