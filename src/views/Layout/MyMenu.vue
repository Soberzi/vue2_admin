<template>
  <div>
    <el-menu class="el-menu-vertical-demo" background-color="#111827" text-color="#fff" active-text-color="#ffd04b" :router="true" :collapse="isCollapse">
      <div class="avatar">
        <img src="../../assets/logo.png" alt="">
        <span v-if="!isCollapse">Pinia{{$t('menus.system')}}</span>
      </div>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{$t('menus.home')}}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <span slot="title">{{$t('menus.goods')}}</span>
      </el-menu-item>
      <el-submenu index="/params">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">{{$t('menus.params')}}</span>
        </template>
        <el-menu-item index="/params/specifications">
          <i class="el-icon-setting"></i>
          <span slot="title">{{$t('menus.package')}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">{{$t('menus.user')}}</span>
      </el-menu-item>
      <el-menu-item index="/cart">
        <i class="el-icon-shopping-cart-full"></i>
        <span slot="title">{{$t('menus.cart')}}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">{{$t('menus.advert')}}</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{$t('menus.order')}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/orderlist">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t('menus.orderlist')}}</span>
          </el-menu-item>
          <el-menu-item index="/order/orderback">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t('menus.back')}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['isCollapse'],
  data () {
    return {
      // isCollapse: false
    }
  }
}
</script>

<style lang="less" scoped>
.avatar{
  display: flex;
  color: white;
  height: 80px;
  font-weight: 550 !important;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: space-around;

  img{
    height: 35px;
    width: 35px;
  }
}
.el-menu{
  height: 100%;
  border-right: 0;
  font-weight: 550 !important;
  .is-active{
    background-color: #054476 !important;
  }
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
