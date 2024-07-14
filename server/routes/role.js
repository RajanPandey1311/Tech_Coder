const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createRole, getRoles } = require('../controllers/role');

router.post('/', auth, createRole);
router.get('/', auth, getRoles);

module.exports = router;
