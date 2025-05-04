const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/auth');

router.post('/login', loginControllers.loginUser);
router.post('/loginadmin', loginControllers.loginAdmin);

module.exports = router;
