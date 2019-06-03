<template>
  <div>
    <div v-if="item.children">
      <template v-if="item.children.length == 0">
        <el-menu-item :index="item.path">
          <i class="el-icon-menu"></i>
          {{ $t(item.path) }}
        </el-menu-item>
      </template>

      <el-submenu v-else :index="item.path">
        <template slot="title">
          <i class="el-icon-menu"></i>
          {{ $t(item.path) }}
        </template>

        <template v-for="child in item.children">
          <sidebar-item
            v-if="child.children && child.children.length > 0"
            :key="child.id"
            :item="child"
          />
          <el-menu-item v-else :key="child.id" :index="child.path">
            <lux-icon type="yuandian" />
            {{ $t(child.path) }}
          </el-menu-item>
        </template>
      </el-submenu>
    </div>
    <div v-else>
      <el-menu-item :index="item.path">
        <i class="el-icon-menu"></i>
        {{ $t(item.path) }}
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import { Component } from 'nuxt-property-decorator'
@Component({
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
class SidebarItem {}
export default SidebarItem
</script>
