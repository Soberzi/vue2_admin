<template>
  <div class="params">
    <!-- 搜素框 -->
    <div class="header">
      <el-input v-model="inp" />
      <el-button type="primary" @click="show">查看</el-button>
      <el-button type="primary" @click="showParams">添加</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%" class="my-table animate__bounceInRight animate__animated">
      <el-table-column prop="attr_id" label="规格参数ID" width="100">
      </el-table-column>
      <el-table-column prop="cat_id" label="类目ID" width="100">
      </el-table-column>
      <el-table-column prop="attr_name" label="规格名称">
      </el-table-column>
      <el-table-column prop="attr_vals" label="规格参数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="250" fixed="right">
        <template>
          <el-button size="mini" @click="show">查看</el-button>
          <el-button size="mini" @click="show">编辑</el-button>
          <el-button size="mini" type="danger" @click="show">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <my-pagination :total="total" :pagesize="pagesize" @changePage='changePage'></my-pagination>
    <!-- 弹框 -->
    <params-dialog ref='dialog'></params-dialog>
  </div>
</template>

<script>
import { getSpecificationList } from '@/api/Specifications/index.js'
import MyPagination from '@/components/MyPagination/MyPagination.vue'
import ParamsDialog from './ParamsDialog.vue'

export default {
  components: { MyPagination, ParamsDialog },
  data () {
    return {
      inp: '',
      tableData: [],
      total: 10,
      pagesize: 1,
      currentPage: 1
    }
  },
  methods: {
    // 点击显示弹框---配置规格参数
    showParams () {
      this.$refs.dialog.dialogVisible = true
    },
    async http (page) {
      // 获取商品规格的数据
      const { data: res } = await getSpecificationList(page)
      console.log(res)
      this.tableData = res.data
      this.total = res.total
      this.pagesize = res.pagesize
    },
    // 分页页码
    changePage (num) {
      this.http(num)
    },
    show () {
      this.$message('该功能待开发，接口未写!')
    }
  },
  created () {
    this.http(1)
  }
}
</script>

<style lang='less' scoped>
@bgcolor:#111827;
@btncolor:#ffd859;
.params{
  margin: 20px;

    .header{
      display: flex;
     button{
      margin-left: 20px;
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
    .my-table{
      margin: 10px auto;
      border-radius: 10px;
    }
}
</style>
