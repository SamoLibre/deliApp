const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const news = require('../controllers/news');

router.get('/', isLoggedIn, news.renderNews);

module.exports = router;