<template>
  <div>
    <!-- 1.拖拽上传 -->
    <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
    <!-- 2.手动上传 -->
    <!--
      ref="upload"   获取dom元素
      action=''  必须参数，上传地址
      multiple 是否支持多选文件
      :on-preview="handlePreview"  点击文件列表中已上传的文件时的钩子
      :on-remove="handleRemove" 文件列表移除文件时的钩子
      on-success 文件上传成功时的钩子
      on-error 文件上传失败时的钩子
      on-progress 文件上传时的钩子
      auto-upload 是否在选取文件后立即进行上传
      file-list 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
     -->
    <el-upload class="upload-demo" ref="upload" :action="url" :on-preview="handlePreview" :on-success="successUplpoad" :on-error="errUplpoad" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
  </div>
</template>

<script>
import base from '@/api/base.js'
export default {
  name: 'MyUploading',
  data () {
    return {
      fileList: [],
      url: base.uploadUrl// 图片地址服务器
    }
  },
  methods: {
    // 点击上传按钮
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 上传成功的函数
    successUplpoad (response, flie, fileList) {
      console.log('上传成功', response, flie, fileList)
      this.$message({
        message: '图片上传成功！',
        type: 'success'
      })
      // 把成功的数据接口 response传递给父组件
      // 字符串截取slice(起始位置,终止位置)
      this.$emit('sendImg', response.url)
    },
    // 上传失败的函数
    errUplpoad () {
      this.$message.error('图片上传失败！')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<style>

</style>
