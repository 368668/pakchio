<template>
  <div class="router-layout">
    <transition name="router">
      <keep-alive :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: "RouterLayout",
  computed: {
    keepAlive() {
      return this.$store.getters.keepAliveList;
    }
  }
};
</script>
<style lang="scss" scoped>
.router-layout {
  position: relative;
  background-color: #fff;
  padding: 15px;
  min-height: calc(100% - 30px);
  box-shadow: 0 0 12px rgba($color: #000, $alpha: 0.1);
  border-radius: 10px;
  overflow-x: hidden;
  max-width: 100%;
  .router-enter-active,
  .router-leave-active {
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    transition: all 0.6s ease;
  }
  .router-enter {
    transform: translateX(100px);
    opacity: 0;
  }
  .router-enter-to {
    transform: translateX(0);
    opacity: 1;
  }
  .router-leave {
    transform: translateX(0);
    opacity: 1;
  }
  .router-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
}
</style>
