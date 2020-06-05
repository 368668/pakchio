import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './permission';
import store from './store';
import App from './App.vue';
import * as filters from './filters'
import prototypefn from './utils/addPrototype'

import {
  getStorage
} from "./utils/storage"
import {
  USER_INFO,
  ACCOUNT_TOKEN
} from "./store/mutations-type"

import './style/element/theme/index.css';
import './style/index.scss';
import './assets/font/iconfont.css';
import 'nprogress/nprogress.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);

Object.keys(prototypefn).forEach(key => {
  Vue.prototype[key] = prototypefn[key]
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    store.dispatch('setAccountToken', getStorage(ACCOUNT_TOKEN))
    store.dispatch('setUserInfo', getStorage(USER_INFO))
  },
}).$mount('#app');
