const express = require('express');
const router = express.Router();
const News = require('../models/news');
const { isLoggedIn, isGod } = require('../middleware');

// GET /api/news - Get all news as JSON
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const newsList = await News.find({}).populate('author');
        res.json(newsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch news.' });
    }
});

// POST /api/news - Only "god" can create a news post
router.post('/', isLoggedIn, isGod, async (req, res) => {
    try {
        const { title, content } = req.body;
        const news = new News({ title, content, author: req.user._id });
        await news.save();
        res.status(201).json(news);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create news.' });
    }
});

module.exports = router;