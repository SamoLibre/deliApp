const express = require('express');
const router = express.Router();
const News = require('../models/news');

// Show all news
router.get('/', async (req, res) => {
    const newsList = await News.find({}).populate('author');
    res.render('news/index', { newsList });
});

module.exports = router;