<template>
  <div class="app">
    <el-row>
      <el-col
        :sm="4"
        :xs="24"
        :class="{ hide: isMenuHidden, navCol: true }"
        class="h-screen"
      >
        <sidebar />
      </el-col>
      <el-col :sm="colSize" :xs="24" class="content">
        <el-row><headbar /></el-row>
        <el-row><breadcrumb /></el-row>
        <el-row><nuxt /></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '@/components/Sidebar/Sidebar'
import Headbar from '@/components/Headbar'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  // middleware: 'auth',
  components: {
    Sidebar,
    Headbar,
    Breadcrumb
  },
  computed: {
    colSize() {
      return this.isMenuHidden ? 24 : 20
    },
    ...mapGetters(['isMenuHidden'])
  }
}
</script>

<style scoped lang="scss">
.app {
  .navCol {
    transition: width 0.5s, opacity 0.15s ease-out;
  }
  .hide {
    transition: width 0.5s, opacity 2s ease-in;
  }
  .content {
    transition: width 0.5s, opacity 0.5s ease-in;
  }
}
</style>
