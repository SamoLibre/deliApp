const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAuthor , validateReview, isReviewAuthor} = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;