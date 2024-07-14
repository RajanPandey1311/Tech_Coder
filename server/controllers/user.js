const User = require('../models/User');
const Role = require('../models/Role');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role', 'name');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.assignRole = async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.role = roleId;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
