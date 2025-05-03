const express = require('express');
const router = express.Router();
const User = require('../models/user');
const adminpanel = require('../controllers/adminpanel');
const catchAsync = require('../utils/catchAsync');
const { isGod } = require('../middleware'); // Middleware to check if user is a God
// Example user data
router.get('/adminpanel', isGod, catchAsync(adminpanel.index)); 

router.post('/adminpanel', catchAsync(adminpanel.updateUserRole));

module.exports = router;