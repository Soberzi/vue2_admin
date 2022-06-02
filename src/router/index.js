import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/LayoutView.vue'
import Login from '@/views/Login/LoginView.vue'
import Home from '@/views/Home/MyHome.vue'
import OrderList from '@/views/Order/OrderList/OrderList.vue'
import OrderBack from '@/views/Order/OrderBack/OrderBack.vue'
import NotFound from '@/views/404/404.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    // 路由元信息
    meta: {
      isLogin: true,
      title: '首页'
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '数据'
        }
      },
      {
        path: '/goods',
        name: 'Goods',
        meta: {
          title: '商品管理'
        },
        component: () => import('@/views/Goods/MyGoods.vue')
      },
      {
        path: '/addgoods',
        name: 'AddGoods',
        meta: {
          title: '商品添加'
        },
        component: () => import('@/views/Goods/AddGoods.vue')
      },
      {
        path: '/params',
        name: 'Params',
        meta: {
          title: '规格参数'
        },
        component: () => import('@/views/Params/MyParams.vue')
      },
      {
        path: '/advert',
        name: 'Advert',
        meta: {
          title: '广告分类'
        },
        component: () => import('@/views/Advert/MyAdvert.vue')
      },
      {
        path: '/order',
        name: 'Order',
        meta: {
          title: '订单管理'
        },
        component: () => import('@/views/Order/MyOrder.vue'),
        // 路由重定向
        redirect: '/order/orderlist',
        children: [
          {
            path: 'orderlist',
            component: OrderList,
            meta: {
              title: '订单列表'
            }
          },
          {
            path: 'orderback',
            component: OrderBack,
            meta: {
              title: '退货管理'
            }
          }
        ]
      }
    ]
  },
  {
    // 登录路由
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    // 404页面
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

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

export default router
