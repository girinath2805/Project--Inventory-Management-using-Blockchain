const express = require('express');
const { adminLogin, forgotPassword, resetPassword, register } = require('../Controllers/adminController');
const router = express.Router();

router.post('/register', register);
router.post('/adminlogin', adminLogin);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;