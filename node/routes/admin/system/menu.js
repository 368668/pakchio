const router = require('express').Router()
const menuController = require('../../../controller/admin/system/menu')

router.get('/list', menuController.getList)
router.post('/add', menuController.addMenu)
router.post('/update', menuController.updateMenu)
router.delete('/delete', menuController.deleteMenuItem)

router.get('/menuOptions', menuController.getMenuOptions)


module.exports = router