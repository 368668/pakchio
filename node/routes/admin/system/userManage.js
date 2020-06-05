const router = require('express').Router()
const userManageController = require('../../../controller/admin/system/userManage')


router.get('/list', userManageController.getList)
router.post('/update', userManageController.update)


module.exports = router