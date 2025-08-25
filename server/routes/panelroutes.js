const express = require('express');
const router = express.Router();
const adminpanel = require('../controllers/adminpanel');
const catchAsync = require('../utils/catchAsync');
const { isGod } = require('../middleware');
const News = require('../models/news');

// Admin panel user management
router.get('/adminpanel', isGod, catchAsync(adminpanel.index));
router.post('/adminpanel', catchAsync(adminpanel.updateUserRole));
router.delete('/adminpanel/:id', adminpanel.deleteUser);
router.post('/adminpanel/newUser', isGod, catchAsync(adminpanel.createUser));

// Create news (admin only)
router.post('/news', isGod, async (req, res) => {
    const { title, content } = req.body;
    const news = new News({ title, content, author: req.user._id });
    await news.save();
    res.json({ success: true, message: 'Haber başarıyla eklendi!', news });
});

module.exports = router;