const router = require('express').Router()
const roleController = require('../../../controller/admin/system/role')

router.get('/list', roleController.getList)
router.post('/add', roleController.hadRoleCode, roleController.addRole)
router.post('/update', roleController.hadRoleCode, roleController.updateRole)
router.delete('/delete', roleController.deletelRoleItem)

router.get('/roleOptions', roleController.getRoleOptions)

module.exports = router