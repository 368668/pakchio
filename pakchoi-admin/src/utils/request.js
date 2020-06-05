import axios from 'axios';
import {
  Notification
} from 'element-ui';
import config from '@/config';
import store from '@/store';
import router from '@/router';
import {
  removeStorage,
} from "@/utils/storage"
import {
  ACCOUNT_TOKEN,
  USER_INFO
} from "@/store/mutations-type"
const request = axios.create({
  baseURL: config.BASE_URL,
  timeout: config.OUT_TIME,
  withCredentials: true
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
  if (store.getters.accountToken !== null &&
    store.getters.accountToken !== '' &&
    store.getters.accountToken !== undefined) {
    config.headers['Pakchoi-Token'] = store.getters.accountToken;
    if (['post', 'delete', 'put'].includes(config.method)) {
      Object.assign(config.data, {
        createBy: store.getters.userInfo.userName
      })
    }
  }
  if (config.method == 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1e3,
      ...config.params
    }
  }
  return config;
}, (error) => {
  Notification.error({
    title: "请求报错",
    message: error.message
  })
  return Promise.reject(error)
});

// 添加响应拦截器
request.interceptors.response.use((res) => {
    if (res.status == 200) return res.data
    else if (res.status == 201) {
      store.dispatch('setAccountToken', res.data.token)
      return request(res.config)
    }
  },
  (error) => {
    console.log(error.response)
    /**
     * token超时失效 */
    switch (error.response.status) {
      case 404:
        Notification.error({
          title: "网络错误",
          message: "找不到网络资源"
        })
        break;
      case 401:
        removeStorage(USER_INFO)
        removeStorage(ACCOUNT_TOKEN)
        router.replace('/user/login')
        Notification.error({
          title: "登录超时",
          message: error.response.data.msg
        })
        break;
      default:
        Notification.error({
          title: "服务异常",
          message: "请联系管理员"
        })
        break;
    }
    return Promise.reject(error)
  });

export default request;
