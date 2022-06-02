import request from '@/utils/request.js'

// 获取商品列表
export function getGoodsList (pagesize) {
  return request.get('/api/pojectList', {
    params: {
      pagesize
    }
  })
}
// 获取类目选择
export function getCategory (cid) {
  return request.get('/api/category', {
    params: {
      cid
    }
  })
}
