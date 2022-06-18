<template>
  <div>
    <el-dialog title="添加规格参数" :visible.sync="dialogVisible" width="60%">
      <!-- 显示类目 -->
      <first-dialog @sendTreeData='sendTreeData'></first-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true" :disabled="isdisabled">确定并添加分组
        </el-button>
      </span>
      <!-- 二级弹框 -->
      <el-dialog width="50%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body>
        <div class="title" style="margin-bottom:10px;">
          <p>当前选中的商品：{{ treeData.name }}</p>
        </div>
        <el-button type="primary" @click="addDomain">新增规格列表</el-button>
        <el-divider></el-divider>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="150px" class="demo-dynamic">
          <el-form-item v-for="(item, index) in dynamicValidateForm.groups" :label="item.title + index" :key="index" :prop="item.value" :rules="{  required: true, message: '参数不能为空', trigger: 'blur' }">
            <div class="item">
              <el-input v-model="item.title"></el-input>
              <el-button type="primary" @click.prevent="addChildDomain(index)">增加子组</el-button>
              <el-button @click.prevent="removeDomain(index)">删除</el-button>
            </div>
            <!-- 内层的表单项 -->
            <el-form-item v-for="(ele, i) in item.children" :label="ele.title + i" :key="i" :prop="ele.value" :rules="{  required: true, message: '参数不能为空', trigger: 'blur' }">
              <div class="item">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeChildDomain(index,i)">删除</el-button>
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">确定</el-button>
          <el-button type="primary" @click="resetForm('dynamicValidateForm')">重置
          </el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import FirstDialog from '@/views/Goods/MyDialog/FirstDialog.vue'

export default {
  components: { FirstDialog },
  data () {
    return {
      dialogVisible: false,
      innerVisible: false,
      isdisabled: true,
      treeData: {}, // tree数据
      dynamicValidateForm: { // 动态表单
        groups: []
      }
    }
  },
  methods: {
    removeChildDomain (index, i) {
      this.dynamicValidateForm.groups[index].children.splice(i, 1)
    },
    // 增加子组
    addChildDomain (index) {
      this.dynamicValidateForm.groups[index].children.push({
        value: '',
        title: ''
      })
    },
    // 获取点击tree的数据
    sendTreeData (val) {
      console.log(val)
      this.treeData = val
      this.isdisabled = false
    },
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('提交规格参数', this.dynamicValidateForm.groups)
          this.$message('该功能待开发，接口未写!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 删除当前组
    removeDomain (index) {
      this.dynamicValidateForm.groups.splice(index, 1)// 切割数组
    },
    // 新增列表===增加大组说明规格配置
    addDomain () {
      this.dynamicValidateForm.groups.push({
        value: '',
        title: '',
        children: []
      })
    }
  }

}
</script>

<style lang='less' scoped>
.item{
  display: flex;
  margin-bottom: 5px;
  button{
    margin-left: 10px;
  }
}

</style>
