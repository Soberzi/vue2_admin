<template>
  <div class="cantianer">
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
        <el-dropdown @command="clickLang">
          <span class="el-dropdown-link" style="color:#fff;">
            语言切换<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div>
          欢迎：{{userinfo.username}}
          <el-button type="primary" @click="outlogin">退出登录 <i class="el-icon-switch-button"></i></el-button>
        </div>
      </div>
    </div>
    <!-- 内容区域，路由出口 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
    },
    ...mapState('userModule', ['userinfo'])
  },
  methods: {
    ...mapMutations('userModule', ['cleanUser']),
    changeMenu () {
      // 点击切换按钮 ，修改父组件数据 isCollapse
      this.$emit('changeCollapse')
    },
    clickLang (command) {
      console.log(command)
      this.$i18n.locale = command
    },
    outlogin () {
      // 退出登录
      // 清空vuex数据
      this.cleanUser()
      // 清空本地存储
      sessionStorage.removeItem('userinfo')
      // 返回登录
      this.$router.push('/login')
    }
  },
  created () {
    console.log(this.$route.matched)
  }
}
</script>

<style lang="less" scoped>
@bgcolor:#111827;
@btncolor:#ffd859;
.cantianer{
  min-width: 600px;
}
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
  .right{
    padding:30px;
    display: flex;
    font-weight: 600;
    align-items: center;
    min-width: 400px;
    div{
      margin-right: 10px;
        button{
      margin-left: 10px;
      font-weight: 700;
      background-color:@bgcolor;
      font-size: 16px;
      border: 1px solid white;
    }
    button:hover{
      background-color:@btncolor;
      color: @bgcolor;
      border: 1px solid @bgcolor;
    }
    }
  }
}
.content{
  color: white;
}

</style>
