
import axios from 'axios'

const request = axios.create({
  // 指定请求的根路径
  baseURL: '/api',
  timeout: 3000
})

export default request
