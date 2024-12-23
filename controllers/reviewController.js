const db = require('../config/db');
const { validationResult } = require('express-validator');

// Get all reviews
exports.getAllReviews = (req, res) => {
  const sql = 'SELECT * FROM reviews ORDER BY date_added DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
};

// Create a new review
exports.createReview = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, rating, review_text } = req.body;
  const sql = 'INSERT INTO reviews (title, author, rating, review_text, date_added) VALUES (?, ?, ?, ?, NOW())';

  db.query(sql, [title, author, rating, review_text], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Review added successfully', id: results.insertId });
  });
};

// Update an existing review
exports.updateReview = (req, res) => {
  const { id } = req.params;
  const { title, author, rating, review_text } = req.body;

  const sql = 'UPDATE reviews SET title = ?, author = ?, rating = ?, review_text = ? WHERE id = ?';
  db.query(sql, [title, author, rating, review_text, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  });
};

// Delete a review
exports.deleteReview = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM reviews WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  });
};

// Search reviews by book title or author
exports.searchReviews = (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  const sql = `
    SELECT * FROM reviews
    WHERE title LIKE ? OR author LIKE ?
    ORDER BY date_added DESC
  `;

  db.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
};

// Get a single review by ID
exports.getReviewById = (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM reviews WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(results[0]);
  });
};
