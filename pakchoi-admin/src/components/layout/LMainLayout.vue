<template>
  <div class="l-main-layout">
    <el-container>
      <el-header class="l-height flex-start-center">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt />
        </div>
        <i
          :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}"
          class="menu-icon"
          @click="isCollapse=!isCollapse"
        ></i>
      </el-header>
      <el-container>
        <el-aside class="l-aside" :style="{'width':isCollapse?'64px':'240px'}">
          <l-menu-list :collapse="isCollapse"></l-menu-list>
        </el-aside>
        <el-main>
          <keep-alive :include="keepAlive">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import LMenuList from "./../menu/LMenuList.vue";
export default {
  name: "LMainLayout",
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    keepAlive() {
      return this.$store.getters.keepAliveList;
    }
  },
  methods: {},
  components: {
    LMenuList
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/index.scss";
.l-main-layout {
  .menu-icon {
    font-size: 24px;
    color: #fff;
    font-weight: 100;
  }
  .el-main {
    background-color: #f5f5f5;
    padding: 15px;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
  .l-aside {
    transition: width 0.6s ease;
    height: calc(100vh - 60px);
    background-color: #545c64;
    overflow: hidden;
    overflow-y: auto;
  }
  .l-height {
    background-color: $primary-color;
    padding: 0;
    .logo {
      text-align: center;
      width: 240px;
      img {
        height: 60px;
      }
    }
  }
}
</style>
