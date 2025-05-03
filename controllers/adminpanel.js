Campground = require('../models/campground');
User = require('../models/user');
const { isGod } = require('../middleware');
module.exports.index = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.render('adminpages/panelHome', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


module.exports.updateUserRole = async (req, res) => {
    const roles = req.body.roles; // Extract roles object from the form data
    try {
        for (const userId in roles) {
            const role = roles[userId];
            await User.findByIdAndUpdate(userId, { role }); // Update each user's role
        }
        req.flash('success', 'Successfully updated user roles!');
        res.redirect('/adminpanel'); // Redirect back to the admin panel
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to update user roles.');
        res.redirect('/adminpanel');
    }
};
