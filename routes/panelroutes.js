const express = require('express');
const router = express.Router();
const User = require('../models/user');
const adminpanel = require('../controllers/adminpanel');
const catchAsync = require('../utils/catchAsync');
const { isGod } = require('../middleware'); // Middleware to check if user is a God
const News = require('../models/news');

// Example user data
router.get('/adminpanel', isGod, catchAsync(adminpanel.index)); 

router.post('/adminpanel', catchAsync(adminpanel.updateUserRole));

router.delete('/adminpanel/:id', adminpanel.deleteUser);

router.get('/adminpanel/newUser', isGod, adminpanel.newUser);

router.post('/adminpanel/newUser', isGod, catchAsync(adminpanel.createUser));

// Show new news form (admin only)
router.get('/news/new', isGod, (req, res) => {
    res.render('news/new');
});

// Create news (admin only)
router.post('/news', isGod, async (req, res) => {
    const { title, content } = req.body;
    const news = new News({ title, content, author: req.user._id });
    await news.save();
    req.flash('success', 'Haber başarıyla eklendi!');
    res.redirect('/news');
});

module.exports = router;