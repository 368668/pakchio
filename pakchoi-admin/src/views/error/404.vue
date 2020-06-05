<template>
  <div class="error-404">
    <el-button @click="$router.back()">返回</el-button>
  </div>
</template>
<script>
export default {
  name: "error-not-find",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.error-404 {
  padding: 100px;
  text-align: center;
}
</style>