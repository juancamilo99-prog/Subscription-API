const express = require('express');
const { registerUser, getUser, update_user_rol, login_user } = require('../controller/user.controller');
const { isAuth } = require('../middleware/authentication/auth.middleware');


const router = express.Router();

router.post('/register', registerUser);
router.get('/', getUser);
router.put('/:id', isAuth, update_user_rol);
router.post('/login', login_user);



module.exports = router