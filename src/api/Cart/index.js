import axios from 'axios'

// 获取商品列表
export function getCartList () {
  return axios.get('https://www.escook.cn/api/cart')
}
