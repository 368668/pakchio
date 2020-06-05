import router from "./router";
import NProgress from 'NProgress';
import store from '@/store'

import {
  getStorage
} from "@/utils/storage"
import {
  ACCOUNT_TOKEN,
  SET_PERMISSION_LIST
} from "@/store/mutations-type"

NProgress.configure({
  easing: 'ease',
  speed: 800,
  showSpinner: false
})
const wihteList = ['/user/login', '/user/register', '/user/change-password']
router.beforeEach((to, form, next) => {
  NProgress.start();
  //有 token
  if (getStorage(ACCOUNT_TOKEN)) {
    //跳转到白名单时重定向会首页
    if (wihteList.includes(to.path)) {
      next({
        path: "/"
      })
    } else {
      //后去用户授权路由 初始化
      if (store.getters.permissionList.length == 0) {
        //获取路由
        store.dispatch('getPermissionList').then((tree) => {
          store.commit(SET_PERMISSION_LIST, tree)
          router.addRoutes(tree)
          //注册路由s
          next({
            path: to.path
          })
        }).catch(err => {
          next()
        })
      } else {
        next()
      }
    }
    return
  }
  //没有token
  else if (!wihteList.includes(to.path)) {
    if (to.path == '/user/login') {
      next()
    } //非 白名单重定向到登录
    else {
      next({
        path: '/user/login'
      })
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done();
})
export default router
