<template>
  <div class="l-menu-item">
    <!-- 路由菜单 -->
    <el-menu-item :index="itemVlaue.meta.path" v-if="useMenuItem" :route="itemVlaue">
      <i :class="itemVlaue.meta.icon" v-if="itemVlaue.meta.icon"></i>
      <span slot="title">{{ itemVlaue.meta.title }}</span>
    </el-menu-item>
    <!-- 下拉菜单 -->
    <template v-else-if="hasChild">
      <el-submenu :index="itemVlaue.meta.path" v-if="!itemVlaue.meta.hidden">
        <template slot="title">
          <i :class="itemVlaue.meta.icon"></i>
          <span>{{ itemVlaue.meta.title }}</span>
        </template>
        <l-menu-item v-for="(item, index) in itemVlaue.children" :key="index" :item-vlaue="item"></l-menu-item>
      </el-submenu>
      <!-- 递归 -->
      <template v-else>
        <l-menu-item v-for="(item, index) in itemVlaue.children" :key="index" :item-vlaue="item"></l-menu-item>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    itemVlaue: Object
  },
  name: "LMenuItem",
  data() {
    return {};
  },
  computed: {
    hasChild() {
      return typeof this.itemVlaue.children !== "undefined";
    },
    useMenuItem() {
      return (
        !this.itemVlaue.meta.hidden &&
        typeof this.itemVlaue.children === "undefined"
      );
    }
  }
  // render() {
  //   return () => {
  //     if (this.useMenuItem) {
  //       <el-menu-item index={this.itemVlaue.path} route={this.itemVlaue}>
  //         <i
  //           class={this.itemVlaue.meta.icon}
  //           v-if={this.itemVlaue.meta.icon}
  //         ></i>
  //         <span slot="title">{this.itemVlaue.meta.title}</span>
  //       </el-menu-item>;
  //     }
  //   };
  // }
};
</script>
<style lang="scss" scoped>
</style>