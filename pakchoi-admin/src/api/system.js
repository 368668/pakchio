import request from "@/utils/request"

//菜单列表
export const getMenuList = (params) => request({
  url: 'system/menu/list',
  method: 'get',
  params
})
/**
 * 添加菜单
 * @param {*} data 
 */
export const addMenu = (data) => request({
  url: 'system/menu/add',
  method: 'post',
  data
})

/**
 * 更新菜单
 * @param {_id} data 
 */
export const updateMenu = (data) => request({
  url: 'system/menu/update',
  method: 'post',
  data
})
/**
 * 删除菜单
 * @param {_id} data 
 */
export const deleteMenuItem = (data) => request({
  url: 'system/menu/delete',
  method: 'delete',
  data
})

/**
 * 用户列表
 * @param {*} params 
 */
export const getUserslist = (params) => request({
  url: 'system/userManage/list',
  method: 'get',
  params
})
/**
 * 用户管理更新
 * @param {*} data 
 */
export const updateUserManage = (data) => request({
  url: 'system/userManage/update',
  method: 'post',
  data
})
/**
 * 获取角色选项
 * @param {*} params 
 */
export const getRoleOptions = (params) => request({
  url: 'system/role/roleOptions',
  method: 'get',
  params
})
/**
 * 角色列表
 * @param {*} params 
 */
export const getRoleList = (params) => request({
  url: 'system/role/list',
  method: 'get',
  params
})

/**
 * 添加角色
 * @param {*} data 
 */
export const addRole = (data) => request({
  url: 'system/role/add',
  method: 'post',
  data
})
/**
 * 更新角色
 * @param {*} data 
 */
export const updateRole = (data) => request({
  url: 'system/role/update',
  method: 'post',
  data
})

/**
 * 删除角色
 * @param {*} data 
 */
export const deleteRoleItem = (data) => request({
  url: 'system/role/delete',
  method: 'delete',
  data
})
/**
 * 获取菜单选项
 */
export const getMenuOptions = () => request({
  url: 'system/menu/menuOptions',
  method: 'get',
})
