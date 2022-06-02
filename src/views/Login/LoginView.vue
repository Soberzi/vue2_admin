<template>
  <div class="login">
    <el-row>
      <el-col :lg="15" :md="12" style="min-height:100vh" class="left">
        <img src="https://pinia.vuejs.org/logo.svg" alt="" style="width:150px">
        <span>欢迎光临 Pinia!</span>
        <span style="font-size:25px">后台管理系统</span>
      </el-col>
      <el-col :lg="9" :md="12" style="min-height:100vh" class="bg-light-50 right">
        <h2>欢迎回来</h2>
        <span>账号密码登录</span>
        <el-form ref="formRef" :rules="rules" :model="form" status-icon label-width="80px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username">
              <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" show-password>
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :plain="true" type="primary" @click="submitForm('formRef')">提交</el-button>
            <el-button type="primary" @click="resetForm('formRef')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '@/api/Mangaer/index.js'
import { mapMutations } from 'vuex'
import jwt from 'jwt-decode'
export default {
  data () {
    return {
      info: '',
      form: {
        username: '',
        password: null
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 辅助函数触发方法setUser
    ...mapMutations('userModule', ['setUser']),
    open2 () {
      this.$message({
        message: '登录成功！',
        type: 'success'
      })
    },
    open4 () {
      this.$message.error('账号或者密码错误！')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.form.username, this.form.password).then(res => {
            console.log(this.form.username, this.form.password)
            if (res.data.status === 200) {
              // 登录成功后
            /*
              1.存储用户信息到vuex
              2.跳转路由
              3.存储到本地
              4.在路由规则下全局路由守卫进行token字段拦截
              5.持久化 （在main.js调用store保存方法）
                */
              const user = {
                // 解析token拿到username
                username: jwt(res.data.token).username,
                token: res.data.token
              }
              // 存储到vuex
              this.setUser(user)
              // 存储到本地
              window.sessionStorage.setItem('userinfo', JSON.stringify(user))
              // 跳转路由
              this.$router.push('/')
              // 弹出成功登录消息框
              // console.log(res.data)
              // console.log(jwt(res.data.token))
              this.open2()
            // 解析token字段
            } else {
              // 账号或密码错误
              this.open4()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
@bgcolor:#111827;
@btncolor:#ffd859;
.login{
  .left,.right{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    }
  .left{
  text-align: center;
  font-size: 50px;
  font-weight: 800;
}
.right{
  color: @bgcolor;
  font-size: 35px;
  font-weight: 800;

  span{
    font-size: 20px;
    font-weight: 500;
  }
  form{
    margin-top: 20px;
    margin-right: 50px;
  }
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
</style>
