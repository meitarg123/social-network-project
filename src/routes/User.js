const express = require('express');
const userController = require ('../controllers/userController');
const router = express.Router();

router.get('/login', (req,res) => {
    res.render('login.ejs');
});
router.get('/signup', (req,res) => {
    res.render('signup.ejs');
});
router.get('/', userController.user_index);
router.post('/signup', userController.signup)
router.post('/login',  userController.login)



module.exports = router;