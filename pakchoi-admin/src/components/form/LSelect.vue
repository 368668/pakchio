<template>
  <el-select
    v-model="inputValue"
    :placeholder="placeholder"
    :disabled="item.disabled"
    filterable
    clearable
    class="l-select"
    @change="changeValue"
  >
    <el-option
      v-for="option in item.options"
      :key="option[optionValue]"
      :label="option[optionLabel]"
      :value="option[optionValue]"
    ></el-option>
  </el-select>
</template>
<script>
import stringMixins from "./stringMixins";
export default {
  name: "LSelect",
  mixins: [stringMixins],
  data() {
    return {};
  },
  computed: {
    placeholder() {
      return this.item.placeholder || "请选择" + this.item.label;
    },
    optionValue() {
      return this.item.optionValue || "value";
    },
    optionLabel() {
      return this.item.optionLabel || "label";
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.l-select {
  width: 100%;
}
</style>