import {
  SET_PERMISSION_LIST,
  SET_USER_INFO,
  SET_ACCOUNT_TOKEN,
  USER_INFO,
  ACCOUNT_TOKEN,
  SET_ROUTER_LIST
} from './../mutations-type'
import {
  setStorage
} from "@/utils/storage"
import utils from "@/utils/addPrototype"
import {
  mapRouterToTree
} from "@/utils/util"
import {
  getAuthRouter
} from "@/api/user";
export default {
  state: {
    userInfo: null,
    token: null,
    permissionList: [], // 树形路由
    routerList: [], // 路由
  },
  actions: {
    setUserInfo({
      commit
    }, data) {
      commit(SET_USER_INFO, data)
    },
    setAccountToken({
      commit
    }, data) {
      commit(SET_ACCOUNT_TOKEN, data)
    },
    getPermissionList({
      commit
    }) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await getAuthRouter();
          if (!utils.reqMsg(result, false)) {
            reject(result.msg)
          }
          commit(SET_ROUTER_LIST, result.data)
          const treeList = mapRouterToTree(result.data)
          resolve(treeList)
        } catch (error) {
          reject(error)
        }
      })
    },
    getAccountToken() {

    },
    getUserInfo() {}
  },
  mutations: {
    [SET_PERMISSION_LIST](state, value) {
      state.permissionList = value
    },
    [SET_USER_INFO](state, value) {
      state.userInfo = value
      setStorage(USER_INFO, value)
    },
    [SET_ACCOUNT_TOKEN](state, value) {
      state.token = value
      setStorage(ACCOUNT_TOKEN, value)
    },
    [SET_ROUTER_LIST](state, value) {
      state.routerList = value
    }
  }
}
