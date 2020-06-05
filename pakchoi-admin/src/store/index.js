import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  getters: {
    userInfo: (state) => state.user.userInfo,
    accountToken: (state) => state.user.token,
    keepAliveList: (state) => state.app.keepAliveList,
    permissionList: (state) => state.user.permissionList,
    routerList: (state) => state.user.routerList
  },
});
