<template>
  <div class="l-screen-bar">
    <el-card shadow="never">
      <div class="flex-start-center bar">
        <div class="flex-start-center cj">
          <p>场景 :</p>
          <el-select v-model="model" filterable size="small">
            <el-option :value="1">1</el-option>
            <!-- <el-option>
              <a href="JavaScript:;" @click.stop="addOption">123</a>
            </el-option>
            <el-option></el-option>-->
          </el-select>
        </div>
        <el-button icon="iconfont icon-shaixuan" type="warning" size="small">高级筛选</el-button>
        <el-button
          icon="el-icon-plus"
          type="primary"
          size="small"
          @click="$emit('click-add')"
        >{{addBtnText}}</el-button>
        <div class="serach flex">
          <el-input
            v-model="keyWordValue"
            :placeholder="placeholder"
            :clearable="true"
            size="small"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              type="primary"
              size="small"
              @click="search"
            >搜索</el-button>
          </el-input>
          <el-button size="small" @click="clearAll">清除</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "LScreenBar",
  props: {
    // keyWords: {
    //   type: [String, Number],
    //   default: ""
    // },
    wordKey: {
      type: Array,
      default: () => []
    },
    keyWordsPlaceholder: {
      type: Array,
      default: () => []
    },
    addBtnText: {
      type: String,
      default: "添加"
    }
  },
  data() {
    return {
      model: "",
      keyWordValue: ""
    };
  },
  computed: {
    placeholder() {
      return "请输入" + this.keyWordsPlaceholder.join(" / ");
    }
  },
  created() {},
  mounted() {
    this.model = this.vlaue;
  },
  methods: {
    addOption() {
      console.log("添加模板");
    },
    search() {
      this.$emit("click-search", this.keyWordValue);
    },
    clearAll() {
      this.keyWordValue = "";
      this.$emit("click-clear-all");
    }
  }
};
</script>
<style lang="scss" scoped>
.l-screen-bar {
  .el-card {
    border: 0;
  }
  .cj {
    p {
      margin-right: 8px;
    }
  }
  .bar {
    & > div {
      margin-right: 15px;
    }
  }
  .serach {
    margin-left: 30px;
    .el-input__inner {
      border-right: 0;
    }
    .el-button--primary {
      color: #fff;
      background-color: #4fd551;
      border-color: #4fd551;
      border-radius: 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      &:active {
        opacity: 0.8;
      }
    }
    & > button {
      margin-left: 12px;
    }
  }
}
</style>
<style lang="scss">
.l-screen-bar {
  .serach {
    .el-input__inner {
      border-right: 0;
    }
  }
}
</style>