const User = require('../models/user');

module.exports.index = async (req, res) => {
    try {
        const users = await User.find();
        res.render('adminpages/panelHome', { users, allowedRoles: User.allowedRoles }); // Pass allowedRoles
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


module.exports.newUser = (req, res) => {
    res.render('adminpages/newUser', { allowedRoles: User.allowedRoles });
};

module.exports.updateUserRole = async (req, res) => {
    const roles = req.body.roles;
    try {
        for (const userId in roles) {
            const role = roles[userId];
            if (User.allowedRoles.includes(role)) {
                await User.findByIdAndUpdate(userId, { role });
            }
        }
        req.flash('success', 'Successfully updated user roles!');
        res.redirect('/adminpanel');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to update user roles.');
        res.redirect('/adminpanel');
    }
};

module.exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        req.flash('success', 'User deleted successfully!');
        res.redirect('/adminpanel');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to delete user.');
        res.redirect('/adminpanel');
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!User.allowedRoles.includes(role)) {
            req.flash('error', 'Invalid role selected.');
            return res.redirect('/adminpanel/newUser');
        }
        const user = new User({ username, email, role });
        await User.register(user, password); // If using passport-local-mongoose
        req.flash('success', 'User created successfully!');
        res.redirect('/adminpanel');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to create new user.');
        res.redirect('/adminpanel/newUser');
    }
};
