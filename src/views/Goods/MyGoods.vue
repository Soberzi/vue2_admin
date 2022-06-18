<template>
  <!-- 商品管理页面 -->
  <div class="goods">
    <!-- 1.搜索区域 -->
    <div class="header">
      <!-- change仅在输入框失去焦点或用户按下回车时触发(value: string | number) -->
      <el-input @change="searchinput" v-model="input" placeholder="搜索内容"></el-input>
      <el-button type="primary" @click="searchinput">查询</el-button>
      <router-link to="/addgoods">
        <el-button type="primary" @click="open">
          页面添加
        </el-button>
      </router-link>
      <el-button type="primary" @click="addGoods">
        弹框添加
      </el-button>
    </div>
    <!-- 2.表格区域展示视图数据 -->
    <div class="wrapper animate__animated animate__bounceInRight">
      <el-table :data="tableData" border style="width: 100%;border-radius: 5px;" max-height="400">
        <el-table-column type="selection" width="55" fixed='left'>
        </el-table-column>
        <el-table-column prop="goods_id" label="商品ID" width="100">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="100">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="goods_number" label="商品数量" width="100"></el-table-column>
        <el-table-column prop="goods_weight" label="重量" width="100"></el-table-column>
        <el-table-column prop="name" label="商品图片"></el-table-column>
        <el-table-column prop="name" label="商品卖点"></el-table-column>
        <el-table-column show-overflow-tooltip prop="goods_name" label="商品描述" width="200"></el-table-column>
        <el-table-column prop="name" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 3.分页 -->
    <my-pagination :total="total" :pagesize="pagesize" @changePage='changePage'></my-pagination>
    <!-- 4.对话框  方法1.父传子，2.children 3.ref-->
    <el-dialog title="商品添加" :visible.sync="dialogVisible" width="70%" :before-close="clearForm" ref="dialog">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="innerVisible=true" style="margin-right:20px;">类目选择</el-button>
          <span>{{ruleForm.category}}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="innerVisibleImg=true">上传图片</el-button>
          <img :src="ruleForm.image" style="margin-top:5px;width:100px">
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <!-- 富文本编译器 -->
          <wang-editor @sendEditor="sendEditor" ref="myEditor"></wang-editor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
      <!-- 1.内弹框：类目选择 -->
      <el-dialog width="40%" title="类目选择" :visible.sync="innerVisible" append-to-body>
        <!-- tree组件 -->
        <first-dialog @sendTreeData='sendTreeData'></first-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTree">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 2.内弹框：上传图片 -->
      <el-dialog width="40%" title="上传图片" :visible.sync="innerVisibleImg" append-to-body>
        <!--  -->
        <uploading @sendImg="sendImg"></uploading>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
// 按需导入api接口方法
import { getGoodsList } from '@/api/Goods/index.js'
import MyPagination from '@/components/MyPagination/MyPagination.vue'
import FirstDialog from './MyDialog/FirstDialog.vue'
import Uploading from './MyDialog/Uploading.vue'
import WangEditor from './WangEditor.vue'
export default {
  components: { MyPagination, FirstDialog, Uploading, WangEditor },
  data () {
    return {
      innerVisibleImg: false, // 图片弹框
      imgUrl: '', // 图片路径
      ruleForm: {
        title: '', // 商品名称
        price: '',
        num: '',
        sellPoint: '',
        image: '',
        descs: '',
        category: '', // 商品类目
        data1: '', // 商品时间
        data2: '' // 商品时间
      },
      rules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请选择价格', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      },
      input: '',
      tableData: [{
      }],
      // 每页显示的条目数
      pagesize: 1,
      total: 10,
      dialogVisible: false, // 外弹框
      innerVisible: false, // 内弹框
      treeData: {}
    }
  },
  methods: {
    // 接收wangEditor数据
    sendEditor (val) {
      this.ruleForm.descs = val
    },
    open () {
      this.$notify.info({
        title: '提示消息',
        message: '页面添加只制做了页面,相关功能实现已经在弹框添加完成'
      })
    },
    // 回显图片确定按钮
    showImg () {
      this.innerVisibleImg = false
      this.ruleForm.image = this.imgUrl
    },
    // 显示图片地址
    sendImg (val) {
      // console.log('图片地址：', val)
      this.imgUrl = val
    },
    // 获取tree数据
    sendTreeData (val) {
      this.treeData = val
    },
    showTree () {
      this.innerVisible = false
      // 显示tree数据
      this.ruleForm.category = this.treeData.name
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.$message({
            message: '恭喜你添加商品成功',
            type: 'success'
          })
          // 清空表单
          this.resetForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 清空表单数据
    clearForm () {
      // 清空表单 方法1.使用element里面的重置表单 方法2：自己手动初始化data的ruleFrom
      this.dialogVisible = false
      this.$refs.ruleForm.resetFields()
      // 单独清空编辑器内容
      this.$refs.myEditor.editor.txt.clear()
    },
    // 添加商品，出现弹框
    addGoods () {
      this.dialogVisible = true
    },
    // 编辑操作
    handleEdit (index, row) {
      // 点击编辑按钮，显示弹框
      // 弹框上回显数据展示--当前的行的数据
      this.$refs.dialog.dialogVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 封装获取商品列表数据的方法
    async getGoods (page) {
      const { data: res } = await getGoodsList(page)
      console.log(res)
      this.tableData = res.data
      this.total = res.total
      this.pagesize = res.pagesize
    },
    // 分页页码
    changePage (num) {
      this.getGoods(num)
    },
    // 搜索查询数据
    searchinput (val) {
      this.$message('搜索接口未写，搜索功能不可用!')
    }
  },
  created () {
    // 调用封装的获取数据的方法
    this.getGoods(1)
  }
}
</script>

<style lang="less" scoped>
@bgcolor:#111827;
@btncolor:#ffd859;
.goods{
  margin: 20px;
  .header{
    display: flex;
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
  .wrapper{
    margin-top: 20px;
    max-height: 600px;
  }
  .line{
      text-align: center;
    }
}
</style>
