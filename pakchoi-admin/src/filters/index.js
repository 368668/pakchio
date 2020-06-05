import moment from "moment"
export const dictText = (value, dictKey) => {
  const test = [{
    label: "主菜单",
    value: '1'
  }, {
    label: "子菜单",
    value: '2'
  }, {
    label: "按钮",
    value: '3'
  }]
  return test.find(item => item.value == value).label || 'undefined'
}


export const dateText = (value, formatText = 'YYYY-MM-DD') => {
  return moment(value).format(formatText) || null;
}
