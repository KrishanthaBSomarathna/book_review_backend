const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Validation rules
const validateReview = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review_text').notEmpty().withMessage('Review text is required')
];

// CRUD routes
router.get('/', reviewController.getAllReviews);
router.post('/', validateReview, reviewController.createReview);
router.put('/:id', validateReview, reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);
router.get('/:id', reviewController.getReviewById);

// Search route
router.get('/search', reviewController.searchReviews);

module.exports = router;
