<template>
  <div>
    <el-button @click="getlist">get</el-button>
    <div v-for="(item,index) in list" :key="index">
      <span style="padding:0 12px">{{index}}</span>
      <span style="padding:0 12px">{{item}}</span>
    </div>
  </div>
</template>
<script>
let arr = [];
export default {
  name: "DashBoardIndex",
  data() {
    return {
      list: []
    };
  },
  mounted() {},
  methods: {
    getlist() {0
      arr = [];
      for (let index = 0; index < 43; index++) {
        arr.push(Math.floor(Math.random() * (43-1)+43);
      }
      this.list = arr;
    },
    getRandom() {
      let num = "";
      while (num == "" || arr.includes(num)) {
        num = Math.floor(Math.random() * (44 - 1));
      }
      return num;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>