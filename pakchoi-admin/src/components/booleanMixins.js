export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    }
  },
  mounted() {
    this.dialogVisible = this.visible
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    }
  },
}
