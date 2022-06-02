<template>
  <!-- 类目对话框组件 -->
  <div>
    <!--
     1. :props="props" props配置选项：有以下四点
          label指定节点标签为节点对象的某个属性值
          children指定子树为节点对象的某个属性值
          disabled指定节点选择框是否禁用为节点对象的某个属性值
          isLeaf指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
     2. :load="loadNode"
          加载子树数据的方法，仅当 lazy 属性为true 时生效
          自动执行函数，就是异步请求数据
     3. lazy
          是否懒加载子节点，需与 load 方法结合使用
     4.  show-checkbox
          是否可被选中
      -->
    <el-tree :props="props" :load="loadNode" lazy accordion @node-click="nodeClick">
    </el-tree>
  </div>
</template>

<script>
import { getCategory } from '@/api/Goods/index.js'
export default {
  data () {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    // 点击tree获取数据
    nodeClick (data, node) {
      console.log(data, node)
      // 传递数据给父组件
      this.$emit('sendTreeData', data)
    },
    async loadNode (node, resolve) {
      // resolve()成功返回的数据结果
      // console.log('load自动执行', node)
      if (node.level === 0) {
        // 进入页面 获取第一层tree数据
        const { data: res } = await getCategory()
        return resolve(res.result)
      }
      if (node.level >= 1) {
        // 请求当前点击的tree下面的数据
        const { data: res } = await getCategory(
          node.level
        )
        if (res.status === 200) {
          return resolve(res.result)
        } else {
          return resolve([])
        }
      }
    }
  }
}
</script>

<style>

</style>
