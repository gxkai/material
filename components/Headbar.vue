<template>
  <div class="headbar">
    <header ref="header" class="header">
      <el-row>
        <el-col :span="5">
          <div
            class="nav-icon"
            :class="{ hide: !isMenuHidden }"
            @click="toggleMenu"
          >
            <span />
            <span />
            <span />
            <span />
          </div>
        </el-col>
        <el-col :offset="14" :span="3">
          <p v-if="!!displayName">
            <el-tooltip :content="displayName">
              <img src="~/assets/img/avatar.svg" />
            </el-tooltip>
            <span> {{ displayName }}</span>
          </p>
        </el-col>
        <el-col :span="2">
          <p @click="logout">
            <img src="~/assets/img/exit.svg" />
            <span> {{ $t('head.exit') }}</span>
          </p>
        </el-col>
      </el-row>
    </header>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Component, Getter } from 'nuxt-property-decorator'

@Component({
  methods: {
    ...mapActions(['toggleMenu'])
  }
})
class Headbar extends Vue {
  @Getter isMenuHidden
  @Getter authUser
  @Getter displayName
  async logout() {
    await this.$store.dispatch('logout', async () => {
      const redirectUri = encodeURIComponent(
        `http://localhost:3000${this.$route.fullPath.replace(
          /token=[^&]*(&)?/g,
          ''
        )}`
      )
      window.location.replace(
        `http://ksat.luxshare-ict.com/passport/login?appid=Lux.MES&redirect_uri=${redirectUri}`
      )
    })
  }
}
export default Headbar
</script>

<style lang="scss" scoped>
.headbar {
  height: 60px;
  position: relative;
  .header {
    @media (max-width: 768px) {
      .el-col p span {
        display: none;
      }
    }
    .el-col:nth-child(2),
    .el-col:nth-child(3),
    .el-col:nth-child(4) {
      cursor: pointer;
      color: #5e6d82;
      border-left: 1px solid #c0ccda;
      p {
        margin: 0 auto;
        padding: 0 10px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        img {
          vertical-align: middle;
        }
      }
    }
    width: 100%;
    height: 60px;
    z-index: 100;
    line-height: 60px;
    border-bottom: 1px solid #c0ccda;
    transition: all 0.5s ease;
  }
}
</style>
