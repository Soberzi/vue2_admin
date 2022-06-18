<template>
  <div class="user">
    <el-button @click="look" type="primary">查看合同</el-button>
    <vue-pdf ref='myPdf'></vue-pdf>
  </div>
</template>

<script>
import VuePdf from './VuePdf.vue'
export default {
  components: { VuePdf },
  methods: {
    look () {
      this.$refs.myPdf.dialogVisible = true
    }
  }

}
</script>

<style lang='less' scoped>
@bgcolor:#111827;
@btncolor:#ffd859;
.user{
  padding: 10px;
   button{
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
