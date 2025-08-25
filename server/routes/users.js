const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const users = require('../controllers/users');

// Register
router.post('/register', catchAsync(users.register));

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, error: 'Giriş başarısız.' });
    req.logIn(user, err => {
      if (err) return next(err);
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

// Logout
router.post('/logout', users.logout);

// Grades (protected)
router.get('/grades', isLoggedIn, catchAsync(users.showGrades));

// Profile (protected)
router.get('/profile', isLoggedIn, (req, res) => {
  res.json({ user: req.user });
});

// Password change (protected)
router.post('/profile/password', isLoggedIn, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const isMatch = await user.authenticate(currentPassword);
    if (!isMatch.user) {
      return res.status(400).json({ error: 'Mevcut şifre yanlış.' });
    }
    await user.setPassword(newPassword);
    await user.save();
    res.json({ success: true, message: 'Şifreniz başarıyla güncellendi.' });
  } catch (err) {
    res.status(500).json({ error: 'Şifre güncellenemedi.' });
  }
});

module.exports = router;