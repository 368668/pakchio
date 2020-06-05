<template>
  <el-form
    class="l-form flex-bet flex-wrap"
    label-position="top"
    ref="el_form"
    :model="model"
    :label-width="labelWidth"
  >
    <div
      class="l-form-item"
      v-for="(item, index) in items"
      :key="index"
      :style="{
        width:item.width||'50%',
        minWidth:item.width||'50%'
      }"
    >
      <el-form-item
        v-if="typeof item.slot=='undefined'"
        :label="item.label||''"
        :prop="item.prop"
        :rules="getRules(item)"
      >
        <component
          :is="item.component"
          :value.sync="model[item.prop]"
          :item="item"
          @change-value="changeValue"
        ></component>
      </el-form-item>
      <slot v-else :name="item.slot" :item="item"></slot>
    </div>
  </el-form>
</template>
<script>
import LInput from "./LInput.vue";
import LTree from "./LTree.vue";
import LSelect from "./LSelect.vue";
import LSwitch from "./LSwitch.vue";
import LRadio from "./LRadio.vue";
export default {
  name: "LForm",
  props: {
    model: {
      type: Object,
      default: () => null
    },
    labelWidth: {
      type: String
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    form() {
      return this.$refs.el_form;
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    validate() {
      return this.validateForm(this.form);
    },
    changeValue(data) {
      this.$emit("change-item-value", data);
    },
    resetFields() {
      this.$refs.el_form.resetFields();
    },
    getRules(item) {
      return typeof item.rules == "string"
        ? this.rules[item.rules]
        : item.rules;
    }
  },
  components: {
    LInput,
    LTree,
    LSwitch,
    LSelect,
    LRadio
  }
};
</script>
<style lang="scss">
.l-form {
  .l-form-item {
    & > div {
      padding: 0 15px;
    }
    .el-form-item__label {
      padding-bottom: 0;
    }
  }
}
</style>