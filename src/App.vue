<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {},
  methods: {
    ...mapMutations('userMoudel', ['setUser'])

  }
}
</script>

<style lang="less">
#app{
  color:white;
}

</style>
