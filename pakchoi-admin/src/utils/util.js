//以为数组转树形
import moment from "moment"
import LMainLayout from "@/components/layout/LMainLayout.vue";
export function getTreeData(list, root,
  parentId = 'pId',
  children = 'children',
  key = '_id',
) {
  function getchild(id) {
    const childrens = []
    list.forEach(item => {
      if (id == eval(`item.${parentId}`)) {
        item[children] = getchild(item[key])
        if (item[children] == undefined) delete item[children];
        childrens.push(item)
      }
    })
    if (childrens.length == 0) return
    else return childrens
  }
  return getchild(root)
}

export const dateText = (value, formatText = 'YYYY-MM-DD') => {
  return moment(value).format(formatText) || null;
}

export function filetrObj(obj) {
  const newObj = {}
  for (const key in obj) {
    const item = obj[key]
    if (item != null && item != undefined && item != '' && !isNaN(item)) {
      newObj[key] = item
    }
  }
  return newObj
}

export function mapRouterToTree(list) {
  return [{
    path: '/',
    name: "Index",
    component: LMainLayout,
    redirect: "/dashboard/index",
    meta: {
      hidden: true,
      title: "",
      path: "/"
    },
    children: getChildRouter(list)
  }]
}
/**
 * 拼接子路由
 * @param {*} list 
 */
function getChildRouter(list) {
  function getChild(parentId, parentPath) {
    const child = []
    list.forEach(item => {
      if (parentId == item.parentId) {
        const data = {
          component: importComponent(item.component),
          name: item.name,
          path: parentPath == undefined ? item.path : item.path.replace(parentPath + '/', ''),
          redirect: item.redirect,
          meta: {
            hidden: item.hidden,
            icon: item.icon,
            keepAlive: item.keepAlive,
            menuType: item.menuType,
            title: item.title,
            componentName: item.componentName,
            path: item.path
          }
        }
        data.children = getChild(item._id, item.path)
        data.children == undefined && delete data.children
        child.push(data)
      }
    })
    if (child.length == 0) return
    return child
  }
  return getChild(null)
}
/**
 * 引入模块
 * @param {*} component 
 */
function importComponent(component) {
  if (component.includes('/layout')) {
    return resolve => require([`@/components/layout/RouterLayout.vue`], resolve)
  } else {
    return resolve => require([`@/views/${component}.vue`], resolve)
  }
}
