<template>
  <div class="l-menu-list">
    <el-menu
      :router="true"
      :collapse="collapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeMenu"
    >
      <l-menu-item v-for="(item, index) in permissionList" :key="index" :item-vlaue="item"></l-menu-item>
    </el-menu>
  </div>
</template>
<script>
import LMenuItem from "./LMenuItem";
export default {
  name: "LMenuList",
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    permissionList() {
      return this.$store.getters.permissionList;
    },
    activeMenu() {
      return this.$route.path;
    }
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  components: {
    LMenuItem
  }
};
</script>
<style lang="scss">
.l-menu-list {
  .el-menu {
    border-right: 0;
  }
  .el-menu--collapse .l-menu-item > .el-menu-item span,
  .el-menu--collapse .l-menu-item > .el-submenu > .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
}
</style>