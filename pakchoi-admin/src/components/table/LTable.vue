<template>
  <div class="l-table">
    <el-table
      tooltip-effect="dark"
      stripe
      v-loading="loading"
      :border="border"
      :data="tableData"
      :row-key="rowKey"
      :default-expand-all="DefaultExpandAll"
      :tree-props="treeProps"
      :header-row-class-name="headerRowClassName"
    >
      <el-table-column
        v-for="(item, index) in tableProps"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :formatter="item.formatter"
        :width="item.width"
      >
        <template v-if="clickIndex==index" v-slot="scope">
          <span class="click-label" @click="$emit('click-row',scope)">{{scope.row[item.prop]}}</span>
        </template>
        <template
          v-else-if="typeof item.slot != 'undefined'&&typeof item.prop== 'undefined'"
          v-slot="{row}"
        >
          <div :class="item.slot">
            <slot :row="row" :name="item.slot"></slot>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="usePageInation"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="total,prev, pager, next ,jumper,sizes"
    ></el-pagination>
  </div>
</template>
<script>
/**
 * el-table-column
 * type   //selection CheckBox //expand 展示按钮
 * width
 * show-overflow-tooltip true 是有鼠标hover显示效果
 *
 * fixed  */
export default {
  name: "LTable",
  props: {
    tableData: Array,
    tableProps: Array,
    clickIndex: {
      type: Number,
      default: 0
    },
    loading: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    treeProps: Object, //树形配置
    DefaultExpandAll: {
      type: Boolean, // 默认展开全部
      default: true
    },
    rowKey: {
      type: String,
      default: "_id"
    },
    headerRowClassName: String, //表头row class name
    //分页
    usePageInation: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.$emit("update:pageSize", val);
      this.$emit("change-page");
    },
    handleCurrentChange(val) {
      this.$emit("update:currentPage", val);
      this.$emit("change-page");
    }
  }
};
</script>
<style lang="scss" scoped>
.l-table {
  .click-label {
    color: #1989fa;
    cursor: pointer;
    text-decoration: underline;
  }
  .el-pagination {
    padding: 8px;
  }
}
</style>
<style lang="scss">
.l-table {
  .el-table__header {
    th {
      background-color: #f5f5f5;
    }
  }
  .el-table__body-wrapper {
    overflow-y: auto;
    height: calc(100vh - 300px);
    min-height: 48px;
  }
}
</style>