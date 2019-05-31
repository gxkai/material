<template>
  <!--  <div class="navbar">-->
  <!--    <el-menu-->
  <!--      class="el-menu-demo"-->
  <!--      :default-active="$route.path"-->
  <!--      background-color="#324157"-->
  <!--      text-color="#bfcbd9"-->
  <!--    >-->
  <!--      <header>-->
  <!--        <div class="flex items-center justify-between text-2xl mr-5 ml-5">-->
  <!--          <div style="color: gray">-->
  <!--            智能工厂MES-->
  <!--          </div>-->
  <!--          <div-->
  <!--            class="nav-icon open"-->
  <!--            :class="{ hide: isMenuHidden }"-->
  <!--            @click="toggleMenu"-->
  <!--          >-->
  <!--            <span />-->
  <!--            <span />-->
  <!--            <span />-->
  <!--            <span />-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </header>-->
  <!--      &lt;!&ndash;      <div v-for="menu in menus" :key="menu.id">&ndash;&gt;-->
  <!--      &lt;!&ndash;        <el-submenu&ndash;&gt;-->
  <!--      &lt;!&ndash;          v-if="menu.children && menu.children.length"&ndash;&gt;-->
  <!--      &lt;!&ndash;          :index="menu.url || menu.name"&ndash;&gt;-->
  <!--      &lt;!&ndash;        >&ndash;&gt;-->
  <!--      &lt;!&ndash;          <template slot="title">&ndash;&gt;-->
  <!--      &lt;!&ndash;            <i v-if="menu.icon" :class="menu.icon" />{{ menu.name }}&ndash;&gt;-->
  <!--      &lt;!&ndash;          </template>&ndash;&gt;-->
  <!--      &lt;!&ndash;          <nuxt-link&ndash;&gt;-->
  <!--      &lt;!&ndash;            v-for="subMenu in menu.children"&ndash;&gt;-->
  <!--      &lt;!&ndash;            :key="subMenu.id"&ndash;&gt;-->
  <!--      &lt;!&ndash;            :to="subMenu.url"&ndash;&gt;-->
  <!--      &lt;!&ndash;            exact&ndash;&gt;-->
  <!--      &lt;!&ndash;          >&ndash;&gt;-->
  <!--      &lt;!&ndash;            <el-menu-item :index="subMenu.url || subMenu.name">&ndash;&gt;-->
  <!--      &lt;!&ndash;              <i v-if="subMenu.icon" :class="subMenu.icon" />{{ subMenu.name }}&ndash;&gt;-->
  <!--      &lt;!&ndash;            </el-menu-item>&ndash;&gt;-->
  <!--      &lt;!&ndash;          </nuxt-link>&ndash;&gt;-->
  <!--      &lt;!&ndash;        </el-submenu>&ndash;&gt;-->
  <!--      &lt;!&ndash;        <nuxt-link v-else :to="menu.url" exact>&ndash;&gt;-->
  <!--      &lt;!&ndash;          <el-menu-item :index="menu.url || menu.name">&ndash;&gt;-->
  <!--      &lt;!&ndash;            <i v-if="menu.icon" :class="menu.icon" />{{ menu.name }}&ndash;&gt;-->
  <!--      &lt;!&ndash;          </el-menu-item>&ndash;&gt;-->
  <!--      &lt;!&ndash;        </nuxt-link>&ndash;&gt;-->
  <!--      &lt;!&ndash;      </div>&ndash;&gt;-->
  <!--    </el-menu>-->
  <!--    <Sidebar :menuList="menus" />-->
  <!--  </div>-->
  <div>
    <!--    <header>-->
    <!--      <div class="flex items-center justify-between text-2xl mr-5 ml-5">-->
    <!--        <div style="color: gray">-->
    <!--          智能工厂MES-->
    <!--        </div>-->
    <!--        <div-->
    <!--          class="nav-icon open"-->
    <!--          :class="{ hide: isMenuHidden }"-->
    <!--          @click="toggleMenu"-->
    <!--        >-->
    <!--          <span />-->
    <!--          <span />-->
    <!--          <span />-->
    <!--          <span />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </header>-->
    <Sidebar :menuList="menus" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Component, Getter, namespace } from 'nuxt-property-decorator'
import Sidebar from '@/components/Sidebar/Sidebar'
const Menu = namespace('menu')

@Component({
  components: {
    Sidebar
  },
  methods: {
    ...mapActions(['toggleMenu'])
  }
})
class Navbar extends Vue {
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
export default Navbar
</script>
<style lang="scss" scoped></style>
