<template>
  <div class="p-2 ">
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(path, index) in paths_" :key="index">
          <nuxt-link :to="index < paths_.length ? path : ''" class="text-base">
            {{ $t(path) }}
          </nuxt-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
@Component({
  props: {
    path: {
      default: '/'
    }
  },
  watch: {
    $route() {
      this.getBreabcrumb()
    }
  }
})
class Breadcrumb extends Vue {
  paths = []
  paths_ = []
  mounted() {
    this.getBreabcrumb()
  }
  getBreabcrumb() {
    this.paths_ = []
    this.paths = this.$route.path.split('/')
    this.addPath(this.paths)
    this.paths_.reverse()
  }
  addPath(e) {
    if (e.length === 1) {
    } else {
      this.paths_.push(this.paths.map(e => e).join('/'))
      e.splice(e.length - 1, 1)
      this.addPath(e)
    }
  }
}
export default Breadcrumb
</script>
