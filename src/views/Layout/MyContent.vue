<template>
  <div>
    <div class="header">
      <div class="left">
        <i v-if="isCollapse" @click="changeMenu" class="iconfont icon-bofangliebiao"></i>
        <i v-if="!isCollapse" @click="changeMenu" class="iconfont icon-381-indent-decrease"></i>
        <!-- 动态生成面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: item.path }" v-for="item in breadcrumbList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right">
        头像退出区域
      </div>
    </div>
    <!-- 内容区域，路由出口 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isCollapse'],
  // data () {
  //   return {
  //     breadcrumbList: this.$route.matched
  //   }
  // },
  computed: {
    breadcrumbList () {
      return this.$route.matched
    }
  },
  methods: {
    changeMenu () {
      // 点击切换按钮 ，修改父组件数据 isCollapse
      this.$emit('changeCollapse')
    }
  },
  created () {
    console.log(this.$route.matched)
  }
}
</script>

<style lang="less" scoped>
.header{
  height: 80px;
  border-bottom: .5px solid gray;
  color: white;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .iconfont{
    font-size: 25px;
  }
  .left{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 10px;
    /deep/ span{
      color: white !important;
      font-weight: 600;
    }
  }
}
.content{
  color: white;
}

</style>
