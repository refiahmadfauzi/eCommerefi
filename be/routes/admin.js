const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.post('/admins', adminController.createAdmin);
router.get('/admins', adminController.getAdmins);
router.get('/admins/:id', adminController.getAdminById);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:id', adminController.deleteAdmin);


module.exports = router;