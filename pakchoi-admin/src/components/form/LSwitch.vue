<template>
  <el-switch
    v-model="inputValue"
    active-color="#13ce66"
    inactive-color="#ff4949"
    @change="changeValue"
  ></el-switch>
</template>
<script>
import stringMixins from "./stringMixins";
export default {
  name: "LSwitch",
  mixins: [stringMixins],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>