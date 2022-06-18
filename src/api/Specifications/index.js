import request from '@/utils/request.js'

// 获取商品列表
export function getSpecificationList (pagesize) {
  return request.get('/api/specificationsList', {
    params: {
      pagesize
    }
  })
}
