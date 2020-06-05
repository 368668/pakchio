import request from "@/utils/request"
/**
 * 获取邮箱验证码
 * @param {email} params 
 */
export const getValidateCode = (params) => request({
  url: "user/getValidateCode",
  method: "get",
  params
})

/**
 * 注册用户
 * @param {*} data 
 */
export const registerUser = (data) => request({
  url: "user/register",
  method: "post",
  data
})

/**
 * 用户登录
 * @param {*} data 
 */
export const login = (data) => request({
  url: "user/login",
  method: "post",
  data
})
/**
 * 获取有授权路由
 * token
 */
export const getAuthRouter = () => request({
  url: "user/getAuthRouter",
  method: "get",
})
