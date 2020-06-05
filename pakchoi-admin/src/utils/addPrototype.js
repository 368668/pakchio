import {
  Message
} from 'element-ui';
import regexp from './regexp'

export default {
  validateForm(form) {
    let value = false
    form.validate(valid => {
      if (valid) {
        value = true
      } else {
        Message({
          type: "warning",
          message: "请正确填写信息"
        })
      }
    })
    return value
  },
  reqMsg(res, show = true) {
    if (res.success) {
      show && Message({
        type: "success",
        message: res.msg
      })
      return true
    } else {
      Message({
        type: "error",
        message: res.msg
      })
      return false
    }
  },
  rules: regexp
}
