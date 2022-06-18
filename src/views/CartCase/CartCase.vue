<template>
  <div class="app-container">
    <div class="animate__animated animate__bounceInUp">
      <!-- Header头部区域 -->
      <Header title="购物车"></Header>
      <!-- 循环渲染每一个商品的信息 -->
      <!-- 用v-bind动态绑定title属性这样就可以动态改变title的值，不然就是传了一个字符串 -->
      <Goods v-for="item in list" :key="item.id" :id="item.id" :title="item.goods_name" :pic="item.goods_img" :price="item.goods_price" :state="item.goods_state" :count="item.goods_count" @state-change="getNewState"></Goods>
    </div>
    <!-- Footer区域 -->
    <Footer :isfull="fullState" :amount="amt" :all="total" @full-change="getFullState"></Footer>
  </div>
</template>

<script>
/* 导入axios请求库 */
import { getCartList } from '@/api/Cart/index.js'

/* 导入需要的组件 */
import Goods from './Goods/Goods.vue'
import Footer from './Footer/Footer.vue'

import bus from './eventBus.js'
export default {
  components: {
    Goods,
    Footer
  },
  data () {
    return {
      /* 用来存储购物车的列表数据,默认为空 */
      list: []
    }
  },
  /* 计算属性 */
  computed: {
    /* 动态计算出全选状态是true还是false */
    fullState () {
      return this.list.every(item => item.goods_state === true)
    },
    /* 已勾选商品的总价格 */
    amt () {
      /* 先filter过滤
      在reduce累加 */
      return this.list.filter(item => item.goods_state).reduce((total, item) => {
        total += item.goods_price * item.goods_count
        return total
      }, 0)
    },
    /* 已勾选商品的总数量 */
    total () {
      return this.list.filter(item => item.goods_state).reduce((t, item) => {
        t += item.goods_count
        return t
      }, 0)
    }
  },
  /* 生命周期函数发起axios请求 */
  created () {
    /* 调用请求数据的方法 */
    this.initCartList()

    bus.$on('share', (val) => {
      this.list.some(item => {
        if (item.id === val.id) {
          item.goods_count = val.value
          return true
        } else return false
      })
    })
  },
  methods: {
    /* 封装请求列表数据的方法 */
    async initCartList () {
      /* 调用axios的get方法，请求列表数据 */
      const { data: res } = await getCartList()
      /* 只要请求回来的数据，在页面渲染期间要用到，则必须转存到data中 */
      if (res.status === 200) {
        this.list = res.list
      }
      console.log(res)
    },
    /* 接收子组件传递过来的数据
    e的格式为{id,value} */
    getNewState (e) {
      this.list.some(item => {
        if (item.id === e.id) {
          item.goods_state = e.value
          /* 终止后续循环 */
          return true
        } else return false
      })
    },
    /* 接收footer子组件传递过来的全选按钮状态 */
    getFullState (val) {
      this.list.forEach(item => (item.goods_state = val))
    }

  }

}
</script>

<style lang="less" scoped>
.app-container {
  color: #000;
  margin: 10px;
  width: 600px;
  padding-bottom: 50px;
  background: white;
  border-radius: 10px;
}
</style>
