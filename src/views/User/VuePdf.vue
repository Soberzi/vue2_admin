<template>
  <div>
    <!-- 合同信息pdf -->
    <el-dialog title="合同信息" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <!--
         属性：src:''文件的路径
       -->
      <!-- <pdf scr=''></pdf> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下载图片 -->
    <el-row :gutter="20" class="animate__animated animate__bounceInDown">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="download">下载图片</el-button>
            </div>
            <div class="text item">
              <img ref="img" :src="imgUrl" alt="">
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="download">下载图片</el-button>
            </div>
            <div class="text item">
              <img ref="img" :src="imgUrl" alt="">
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="down">下载图片</el-button>
            </div>
            <div class="text item">
              <img ref="img" :src="imgUrl" alt="">
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 导出表格 -->
    <el-button type="primary" @click="exportData">导出表格</el-button>
    <el-table :data="tableData" style="width: 100%;" class="animate__animated animate__bounceInUp">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 1.安装pdf：npm install vue-pdf -S
// 2.导入使用
// import pdf from 'vue-pdf'
import img from '../../assets/images/972d-htknpmh6134752.jpg'
import { export2Excel } from '@/common/js/util.js'
export default {
  data () {
    return {
      dialogVisible: false,
      imgUrl: img,
      columns: [// 定义表头
        { title: '日期', key: 'date' },
        { title: '姓名', key: 'name' },
        { title: '地址', key: 'address' }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  // components: {
  //   pdf
  // },
  methods: {
    // 导出表格
    exportData () {
      export2Excel(this.columns, this.tableData, '用户列表')
    },
    // 下载图片
    download () {
      // 新窗口打开
      const url = this.$refs.img
      window.location.href = url.src
    },
    // 同源下载
    down () {
      const alink = document.createElement('a')
      alink.href = this.imgUrl
      alink.download = 'pic'
      alink.click()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang='less' scoped>
@bgcolor:#111827;
@btncolor:#ffd859;
  .el-row {
    margin-bottom: 20px;
    margin-top: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
     button{
      font-weight: 700;
      background-color:@bgcolor;
      font-size: 16px;
      border: 1px solid white;
      margin-bottom: 10px;
      width:120px;
      height: 40px;
      color: #fff;
    }
    button:hover{
      background-color:@btncolor;
      color: @bgcolor;
      border: 1px solid @bgcolor;
    }

</style>
