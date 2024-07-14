const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }


        user = new User({
            name,
            email,
            password,
            role,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role 
            }
        };

        jwt.sign(payload, "secret_key", {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload.user }); 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role 
            }
        };

        jwt.sign(payload, "secret_key", {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload.user });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
