const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    } 
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; 
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
}
module.exports.isGod = (req, res, next) => {
    const { id } = req.params;
    const user = User.findById(id);
    if (req.user.role !== 'god') {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect('/');
    }
    next();
}
