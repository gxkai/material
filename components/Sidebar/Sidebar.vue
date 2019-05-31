<template>
  <div class="sidebar-container">
    <div
      class="flex items-center justify-between text-2xl bg-color-gray pl-4 pr-2 sidebar-header"
    >
      <div style="color: gray" class="truncate">
        智能工厂MES
      </div>
      <div
        class="nav-icon open"
        :class="{ hide: isMenuHidden }"
        @click="toggleMenu"
      >
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item v-for="menu in menus" :key="menu.id" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Component, Getter, namespace } from 'nuxt-property-decorator'
import SidebarItem from './SidebarItem'
const Menu = namespace('menu')
@Component({
  components: { SidebarItem },
  methods: {
    ...mapActions(['toggleMenu'])
  }
})
class Sidebar {
  @Getter isMenuHidden
  @Menu.Getter menus

  async beforeMount() {
    // const result = await this.$axios.post('/mpi/auth/menuTree')
    const menus = require(`@/json/menu.json`)
    console.log(menus)
    if (Array.isArray(menus) && menus.length) {
      this.$store.dispatch('menu/addAll', this.translateMenus(menus))
    }
  }
  translateMenus(menus) {
    return menus.map(menu => {
      const subMenus = menu.children
      if (Array.isArray(subMenus) && subMenus.length) {
        this.translateMenus(subMenus)
      }
      menu.name = this.$t(menu.name || '')
      return menu
    })
  }
}
export default Sidebar
</script>
<style lang="scss" scoped>
.sidebar-header {
  background-color: rgb(48, 65, 86);
}
.sidebar-container {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgb(48, 65, 86);
  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }
  .is-horizontal {
    display: none;
  }
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
}
</style>
