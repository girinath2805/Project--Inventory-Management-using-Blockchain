const express = require('express')
const router = express.Router()
const {getPrivatedata} = require('../Controllers/private')
const { protect } = require('../middleware/auth')

router.route('/').get(protect,getPrivatedata)


module.exports = router