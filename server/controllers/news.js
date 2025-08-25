const News = require('../models/news');
// Get all news
module.exports.getAllNews = async (req, res) => {
    try {
        const newsList = await News.find({}).populate('author');
        res.json(newsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch news.' });
    }
};

// Create news
module.exports.createNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        const news = new News({ title, content, author: req.user._id });
        await news.save();
        res.status(201).json(news);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create news.' });
    }
};