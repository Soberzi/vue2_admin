import request from '@/utils/request.js'

// 登录,post请求体直接对象
export function login (username, password) {
  return request.post('/api/login', {
    username,
    password
  })
}
