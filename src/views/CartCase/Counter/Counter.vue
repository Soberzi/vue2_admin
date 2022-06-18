<template>
  <div class="number-container">
    <!-- 减 1 的按钮 -->
    <el-button type="button" class="btn btn-light btn-sm" @click="sub">-</el-button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ num }}</span>
    <!-- 加 1 的按钮 -->
    <el-button type="button" @click="add">+</el-button>
  </div>
</template>

<script>
import bus from '../eventBus.js'
export default {
  name: 'MyCounter',
  props: {
    /* 接收商品的id 值，将来使用eventBus方案，把数量传递到App组件，更新哪个商品的数量 */
    id: {
      type: Number,
      require: true
    },
    /* 接收到的num数量值 */
    num: {
      type: Number,
      default: 1
    }
  },
  methods: {
    /* 点击按钮让数值+1 */
    add () {
      /* 要发送给aApp的数据格式为{id,value}
      其中id是商品的id；value是商品的最新购买 */
      const obj = { id: this.id, value: this.num + 1 }
      /* 通过eventBus把obj对象发送给App组件 */
      bus.$emit('share', obj)
    },
    /* 点击按钮让数值-1 */
    sub () {
      if (this.num - 1 === 0) {
        return
      }
      const obj = { id: this.id, value: this.num - 1 }
      /* 通过eventBus把obj对象发送给App组件 */
      bus.$emit('share', obj)
    }
  }
}
</script>

<style lang="less" scoped>
@bgcolor:#262a44;
@btncolor:#ffd859;
.number-box {
  min-width: 30px;
  text-align: center;
  margin: 0 5px;
  font-weight: 600;
  font-size: 16px;
} button{
      font-weight: 700;
      background-color:#054476;
      font-size: 16px;
      color: #fff;
      border: 1px solid white;
    }
    button:hover{
      background-color:@btncolor;
      color: @bgcolor;
      border: 1px solid @bgcolor;
    }

</style>
