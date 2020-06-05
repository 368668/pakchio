<template>
  <el-input
    v-model="inputValue"
    :type="item.type||'text'"
    :placeholder="placeholder"
    :rows="4"
    :maxlength="maxlength"
    :show-word-limit="showWordLimit"
    @input="changeValue"
  ></el-input>
</template>
<script>
import stringMixins from "./stringMixins";
export default {
  name: "LInput",
  mixins: [stringMixins],
  computed: {
    showWordLimit() {
      return this.item.type == "textarea";
    },
    maxlength() {
      return this.item.maxlength
        ? this.item.maxlength
        : this.item.type == "textarea"
        ? 100
        : "";
    },
    placeholder() {
      return this.item.placeholder || "请输入" + this.item.label;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>