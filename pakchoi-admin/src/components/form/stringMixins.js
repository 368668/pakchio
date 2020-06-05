export default {
  props: {
    value: {
      type: [String, Number, Boolean, Array],
      default: ""
    },
    item: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      inputValue: ""
    };
  },
  mounted() {
    this.inputValue = this.value
  },
  watch: {
    value(val) {
      this.inputValue = val;
    }
  },
  methods: {
    changeValue(value) {
      const data = {
        value,
        item: this.item
      };
      if (
        typeof this.item.type != "undefined" &&
        this.item.type != null &&
        (this.item.type == "number" ||
          this.item.type == "tel" ||
          this.item.type == "int")
      ) {
        data.value = parseFloat(this.inputValue);
      }
      this.$emit("update:value", data.value);
      this.$emit("change-value", data);
      this.item.changeCallback && this.item.changeCallback(data)
    }
  },
}
