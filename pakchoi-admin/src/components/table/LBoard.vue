<template>
  <el-drawer
    size="50%"
    :visible.sync="drawerVisible"
    :modal="false"
    :wrapperClosable="true"
    @close="close"
    class="l-board"
  >
    <div class="top-bar">
      <slot name="topbar" :test="content"></slot>
    </div>
    <div class="l-board-content">
      <slot name="content"></slot>
    </div>
    <div class="l-board-footer" v-if="boardFooter">
      <div class="flex-end-center">
        <el-button size="small" @click="close">取消</el-button>
        <el-button size="small" type="primary" @click="confirm">确认</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script>
export default {
  name: "LBoard",
  props: {
    content: [Object, null],
    visible: {
      type: Boolean,
      default: false
    },
    boardFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawerVisible: this.visible
    };
  },
  watch: {
    visible(value) {
      this.drawerVisible = value;
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("close-board");
      this.$emit("update:visible", false);
    },
    confirm() {
      this.$emit("click-confirm");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/index.scss";
.l-board {
  .l-board-content {
    height: calc(100vh - 194px);
    overflow-y: auto;
  }
  .l-board-footer {
    border-top: $back-border-color;
    padding: 12px 24px;
  }
  .top-bar {
    padding: 0 24px 12px 24px;
    border-bottom: $primary-border;
    margin-bottom: 12px;
  }
}
</style>
<style >
.l-board .el-drawer {
  outline: none;
}
</style>