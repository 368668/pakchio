export default {
  required: [{
    required: true,
    message: "请完整填写内容",
    trigger: "blur"
  }],
  required_change: [{
    required: true,
    message: "请完整填写内容",
    trigger: "change"
  }],
  regexp: {
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  }
}
