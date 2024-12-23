const db = require('../config/db');

const Review = {
  getAllReviews: (callback) => {
    db.query('SELECT * FROM reviews ORDER BY date_added DESC', callback);
  },
  createReview: (data, callback) => {
    const { title, author, rating, review_text } = data;
    db.query('INSERT INTO reviews (title, author, rating, review_text) VALUES (?, ?, ?, ?)', 
      [title, author, rating, review_text], callback);
  },
  updateReview: (id, data, callback) => {
    const { book_title, author, rating, review_text } = data;
    db.query('UPDATE reviews SET title = ?, author = ?, rating = ?, review_text = ? WHERE id = ?', 
      [title, author, rating, review_text, id], callback);
  },
  deleteReview: (id, callback) => {
    db.query('DELETE FROM reviews WHERE id = ?', [id], callback);
  }
};

module.exports = Review;
