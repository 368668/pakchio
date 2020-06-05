<template>
  <el-dialog
    class="l-dialog"
    top="50px"
    width="996px"
    ref="l_dialog"
    :visible.sync="dialogVisible"
    :title="title"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <transition name="dialog-content">
      <div ref="content" class="l-dialog-content" v-if="dialogVisible">
        <slot></slot>
      </div>
    </transition>
    <div slot="footer" class="l-dialog-footer">
      <div>
        <el-button type="primary" size="small" @click="confirm" :loading="confirmLoading">确认</el-button>
        <el-button size="small" @click="reset">重置</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>
<script>
import booleanMixins from "./../booleanMixins";
export default {
  name: "LDialog",
  mixins: [booleanMixins],
  props: {
    title: {
      type: String,
      default: "标题"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      confirmLoading: false
    };
  },
  watch: {
    loading(val) {
      this.confirmLoading = val;
    }
  },
  mounted() {
    this.confirmLoading = this.loading;
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
      this.closeDialog();
      this.$emit("click-canecl");
    },
    reset() {
      this.$emit("click-reset");
    },
    confirm() {
      this.$emit("click-confirm");
    }
  }
};
</script>
<style lang="scss">
.l-dialog {
  background-color: #f5f5f5;
  .el-dialog {
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 24px;
  }
  .el-dialog__body {
    padding: 20px 0 0 0;
  }
  .l-dialog-content {
    margin-left: 12px;
    margin-right: 12px;
    padding-left: 15px;
    padding-right: 15px;
    height: calc(100vh - 240px);
    min-height: 300px;
    overflow-y: auto;
    opacity: 1;
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: #ddd;
    }
  }
  .dialog-content-enter-active,
  .dialog-content-leave-active {
    transition: opacity 0.5s ease;
  }
  .dialog-content-enter,
  .dialog-content-leave-to {
    opacity: 0;
  }
}
</style>