const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers, assignRole } = require('../controllers/user');

router.get('/', auth, getUsers);
router.post('/assign-role', auth, assignRole);

module.exports = router;
