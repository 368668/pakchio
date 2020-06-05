<template>
  <el-tree
    class="l-tree"
    :data="item.data"
    show-checkbox
    default-expand-all
    node-key="_id"
    ref="l_tree"
    :highlight-current="true"
    :props="item.defaultProps"
    :default-checked-keys="value"
    @check-change="changeValue"
  ></el-tree>
</template>
<script>
export default {
  name: "LTree",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default: () => null
    },
    treeData: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label"
        };
      }
    }
  },
  data() {
    return {};
  },
  watch: {
    value(val) {
      this.item.treeDataType == "key"
        ? this.setCheckedKeys(val)
        : this.setCheckedNodes(val);
    }
  },
  mounted() {},
  methods: {
    /**
     * 通过node 设置选中节点 */
    setCheckedNodes(data) {
      this.$refs.l_tree.setCheckedNodes(data);
    },
    /**
     * 通过node 过去选中节点 */
    getCheckedNodes() {
      return this.$refs.l_tree.getCheckedNodes();
    },
    /**
     * 通过node 设置选中节点 */
    setCheckedKeys(data) {
      this.$refs.l_tree.setCheckedKeys(data);
    },
    /**
     * 通过node 过去选中节点 */
    getCheckedKeys() {
      return this.$refs.l_tree.getCheckedKeys();
    },
    /**
     * 清空节点 */
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    changeValue(data) {
      this.$emit(
        "update:value",
        this.item.treeDataType == "key"
          ? this.getCheckedKeys()
          : this.getCheckedNodes()
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>