<template>
  <div class="user-layout">
    <el-header>
      <img src="@/assets/images/logo.png" alt />
    </el-header>
    <transition name="user-router">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
body {
  background-color: #f5f5f5;
}
.user-layout {
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  .el-header {
    img {
      height: 100%;
    }
  }
  .user-router-enter-active,
  .user-router-leave-active {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 1s ease;
  }
  .user-router-enter {
    opacity: 0;
    transform: translateX(-50%) rotateZ(-90deg);
  }
  .user-router-enter-to {
    opacity: 1;
    transform: translateX(0) rotateZ(0);
  }
  .user-router-leave {
    opacity: 1;
    transform: translateX(0) rotateZ(0);
  }
  .user-router-leave-to {
    opacity: 0;
    transform: translateX(50%) rotateZ(90deg);
  }
}
</style>