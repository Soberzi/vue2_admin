<template>
  <div class="footer-container">
    <!-- 左侧的全选 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="cbFull" :checked="isfull" @change="fullChange" />
      <label class="custom-control-label" for="cbFull">全选</label>
    </div>

    <!-- 中间的合计 -->
    <div>
      <span>合计：</span>
      <!-- toFixed(n)几位小数 -->
      <span class="total-price">￥{{ amount.toFixed(2) }}</span>
    </div>

    <!-- 结算按钮 -->
    <el-button type="button" @click="open">结算（{{ all }}）</el-button>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  props: {
    /* 全选的状态 */
    isfull: {
      type: Boolean,
      defaultL: true
    },
    /* 总价 */
    amount: {
      type: Number,
      default: 0
    },
    /* 已勾选商品的总数量 */
    all: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /* 监听到全选的状态变化 */
    fullChange (e) {
      this.$emit('full-change', e.target.checked)
    },
    open () {
      this.$message('该功能待开发！')
    }
  }
}
</script>

<style lang="less" scoped>
@bgcolor:#262a44;
@btncolor:#ffd859;
.footer-container {
  width: 600px;
  font-size: 15px;
  height: 50px;
  border-top: 1px solid #efefef;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right:10px ;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

#cbFull {
  margin-right: 5px;
}

.total-price {
  font-weight: bold;
  font-size: 16px;
  color: red;
}
 button{
      margin-left: 10px;
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
