<template>
  <div class="app">
    <el-row>
      <el-col
        :sm="4"
        :xs="24"
        :class="{ hide: isMenuHidden, navCol: true }"
        class="h-screen"
      >
        <sidebar :class="{ hide: isMenuHidden, navCol: true }" />
      </el-col>
      <el-col :sm="colSize" :xs="24" class="content">
        <el-row><headbar /></el-row>
        <el-row><nuxt /></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '@/components/Sidebar/Sidebar'
import Headbar from '@/components/Headbar'

export default {
  // middleware: 'auth',
  components: {
    Sidebar,
    Headbar
  },
  computed: {
    colSize() {
      return this.isMenuHidden ? 24 : 20
    },
    ...mapGetters(['isMenuHidden'])
  }
}
</script>

<!--<style scoped lang="scss">
.app {
  height: 100%;
  .el-row.main {
    height: 100%;
    .el-col {
      height: 100vh;
    }
    .navCol {
      transition: width 0.5s, opacity 0.15s ease-out;
      &.hide {
        transition: width 0.5s, opacity 2s ease-in;
      }
    }
    .content {
      transition: width 0.5s, opacity 0.5s ease-in;
    }
  }
}
</style>-->
