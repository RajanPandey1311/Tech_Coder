const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    const { name, menus } = req.body;

    try {
        let role = new Role({ name, menus });
        await role.save();
        res.json(role);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
