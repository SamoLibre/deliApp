const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const {storeReturnTo, isLoggedIn} = require('../middleware');
const users = require('../controllers/users');
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));  

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'} ), users.login);

router.get('/logout', users.logout);

router.get('/grades/', catchAsync(users.showGrades));

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('users/profile', { user: req.user });
});

router.post('/profile/password', isLoggedIn, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const isMatch = await user.authenticate(currentPassword);
        if (!isMatch.user) {
            req.flash('error', 'Mevcut şifre yanlış.');
            return res.redirect('/profile');
        }
        await user.setPassword(newPassword);
        await user.save();
        req.flash('success', 'Şifreniz başarıyla güncellendi.');
        res.redirect('/profile');
    } catch (err) {
        req.flash('error', 'Şifre güncellenemedi.');
        res.redirect('/profile');
    }
});


module.exports = router;