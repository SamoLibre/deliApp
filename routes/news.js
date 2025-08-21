const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const news = require('../controllers/news');
const path = require('path');
const fs = require('fs');

router.get('/', isLoggedIn, news.renderNews);

router.get('/exams', isLoggedIn, (req, res) => {
    const examsPath = path.join(__dirname, '../public/exams.json');
    fs.readFile(examsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Could not load exams' });
        res.json(JSON.parse(data));
    });
});

module.exports = router;