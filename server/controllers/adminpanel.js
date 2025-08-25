const User = require('../models/user');

module.exports.index = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users, allowedRoles: User.allowedRoles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
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
        res.json({ success: true, message: 'Successfully updated user roles!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to update user roles.' });
    }
};

module.exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        res.json({ success: true, message: 'User deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete user.' });
    }
};

module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!User.allowedRoles.includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role selected.' });
        }
        const user = new User({ username, email, role });
        await User.register(user, password); // If using passport-local-mongoose
        res.json({ success: true, message: 'User created successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to create new user.' });
    }
};
