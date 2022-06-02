<template>
  <div class="layout">
    <!-- 左侧导航区域 -->
    <my-menu class="menu" :isCollapse="isCollapse"></my-menu>
    <!-- 右侧内容区域 -->
    <my-content class="content" :class="{isActive:isCollapse}" :isCollapse="isCollapse" @changeCollapse='changeCollapse'></my-content>
  </div>
</template>

<script>
import MyContent from './MyContent.vue'
import MyMenu from './MyMenu.vue'

export default {
  components: { MyMenu, MyContent },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }

}
</script>

<style lang='less' scoped>
.layout{
  .menu{
    //width: 200px;
    position:fixed;
    top: 0;
    bottom: 0;
  }
  .content{
    margin-left: 200px;
      //过渡
    transition: all .5s;
  }
  .isActive{
    margin-left: 64px;

  }
}

</style>
