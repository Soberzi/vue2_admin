<template>
  <div>
    <el-menu default-active="/" class="el-menu-vertical-demo" background-color="#111827" text-color="#fff" active-text-color="#ffd04b" :router="true" :collapse="isCollapse">
      <div class="avatar">
        <img src="../../assets/logo.png" alt="">
        <span v-if="!isCollapse">Pinia后台管理系统</span>
      </div>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-setting"></i>
        <span slot="title">规格参数</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <span slot="title">广告分类</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/orderlist">
            <i class="el-icon-setting"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
          <el-menu-item index="/order/orderback">
            <i class="el-icon-setting"></i>
            <span slot="title">退货管理</span>
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
