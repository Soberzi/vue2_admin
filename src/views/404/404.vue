<template>
  <div class="notfound">
    <el-result>
      <template slot="icon">
        <img src="../../assets/logo.png" alt="">
      </template>
      <template slot="icon">
        <span>404 请求错误</span>
      </template>
      <template slot="extra">
        <el-button type="primary" size="medium" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  name: 'LostPage'
}
</script>

<style lang='less' scoped>
@bgcolor:#111827;
@btncolor:#ffd859;
.notfound{
  text-align: center;
  font-size: 50px;
  font-weight: 800;
  color: @btncolor;
    button{
      width: 100px;
      height: 50px;
      padding: 10px;
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
</style>
