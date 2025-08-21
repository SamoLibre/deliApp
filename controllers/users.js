User = require('../models/user');
module.exports.register = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user,password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Kayıt başarılı!');
            res.redirect('/');
        })
        
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};
module.exports.login = (req, res) => {
    req.flash('success', 'Hoşgeldiniz!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Çıkış başarılı!');
        res.redirect('/');
    });
    
};

module.exports.showGrades = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Fetch the logged-in user
        if (!user) {
            req.flash('error', 'Kullanıcı bulunamadı.');
            return res.redirect('/login');
        }
        res.render('users/grades', { grades: user.grades });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Bir hata oluştu.');
        res.redirect('/');
    }
};