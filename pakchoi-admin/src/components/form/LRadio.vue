<template>
  <el-radio-group v-model="inputValue">
    <el-radio :label="radio.value" v-for="radio in item.options" :key="radio.value">{{radio.label}}</el-radio>
  </el-radio-group>
</template>
<script>
import stringMixins from "./stringMixins";
export default {
  name: "LRadio",
  mixins: [stringMixins],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>