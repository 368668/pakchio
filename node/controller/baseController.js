module.exports = class Base {
  constructor() {}
  queryPageList(model, params, findobj) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(findobj)
        const list = await model.find(findobj).sort({
          updateDate: -1
        }).skip(params.skip).limit(params.pageSize)
        const total = await model.estimatedDocumentCount()
        resolve({
          list,
          total
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  setPageListParams(param) {
    const params = {}
    if (typeof param.currentPage != 'undefined' && typeof param.pageSize != 'undefined') {
      const {
        currentPage,
        pageSize
      } = param
      params.skip = parseInt(currentPage - 1) * parseInt(pageSize) || 0
      params.pageSize = parseInt(pageSize) || 10
    }
    return params
  }
  getLikesObj(list, value) {
    return {
      $or: list.map(item => {
        return {
          [item]: {
            $regex: value
          }
        }
      })
    }
  }
}