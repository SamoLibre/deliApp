const User = require('./models/user');

// No need for storeReturnTo in a React API, but you can keep it if you use it elsewhere
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    } 
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'You must be signed in' });
    }
    next();
}

module.exports.isGod = async (req, res, next) => {
    // Always get the user from req.user (already authenticated)
    if (!req.user || req.user.role !== 'god') {
        return res.status(403).json({ error: 'You do not have permission to do that!' });
    }
    next();
}