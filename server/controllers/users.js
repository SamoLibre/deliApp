const User = require('../models/user');

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.json({ success: true, user: registeredUser });
        });
    } catch (e) {
        res.status(400).json({ success: false, error: e.message });
    }
};

module.exports.login = (req, res) => {
    res.json({ success: true, user: req.user });
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({ success: false, error: 'Çıkış başarısız.' });
        }
        res.json({ success: true, message: 'Çıkış başarılı!' });
    });
};

module.exports.showGrades = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
        }
        res.json({ grades: user.grades });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Bir hata oluştu.' });
    }
};
