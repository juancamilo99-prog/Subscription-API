const express = require('express');
const { registerUser, getUser } = require('../controller/user.controller');


const router = express.Router();

router.post('/register', registerUser);
router.get('/', getUser);



module.exports = router