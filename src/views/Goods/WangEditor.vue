<template>
  <!-- WangEditor富文本编译器 -->
  <div id='main'>

  </div>
</template>

<script>
// 导入王富文本编译器
import E from 'wangeditor'
export default {
  data () {
    return {
      editor: ''
    }
  },
  mounted () {
    // 创建wangeditor实例，页面加载完就显示
    this.editor = new E('#main')
    // 配置onchange回调----获取富文本输入的内容
    this.editor.config.onchange = newHtml => {
      console.log('change 之后最新的 html', newHtml)
      // 把获取的富文本编译内容---传递给弹框父组件
      this.$emit('sendEditor', newHtml)
    }
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500 // 修改为 500ms

    // 自定义菜单
    this.editor.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      // 'foreColor',
      // 'backColor',
      'link',
      'list',
      'todo',
      // 'justify',
      // 'quote',
      'emoticon',
      'image',
      'video',
      'table',
      'code',
      'splitLine',
      'undo',
      'redo'
    ]
    this.editor.create()
  }
}
</script>

<style>

</style>
