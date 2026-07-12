const express = require('express');
const { registerUser, getUser, update_user_rol, login_user, user_delete } = require('../controller/user.controller');
const { isAuth, isAuthDelete } = require('../middleware/authentication/auth.middleware');


const router = express.Router();

router.post('/register', registerUser);
router.get('/', getUser);
router.put('/:id', isAuth, update_user_rol);
router.post('/login', login_user);
router.delete('/delete/:id', isAuthDelete, user_delete);



module.exports = router