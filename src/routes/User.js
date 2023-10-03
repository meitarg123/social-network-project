const express = require('express');
const userController = require ('../controllers/userController');


const router = express.Router();

router.get('/', userController.user_index);
router.post('/signup', userController.signup)
router.post('/login',  userController.login)

router.get('/login', (req,res) => {
    res.render('login.ejs');
});
router.get('/signup', (req,res) => {
    res.render('signup.ejs');
});

module.exports = router;