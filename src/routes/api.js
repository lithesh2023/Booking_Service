const express = require('express');
const bookingController = require("../controllers/bookingController")
const router = express.Router();
router.use('/booking', bookingController)
module.exports = router;
