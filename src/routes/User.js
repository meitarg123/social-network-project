const express = require('express');
const controller = require('../controllers/UserController');

const router = express.Router();

router.get('/', controller.user_index);
router.get('/login', (req,res) => {
    console.log("Received a request for /user/login");
    res.render('login.ejs');
});
router.get('/signup', (req,res) => {
    console.log("Received a request for /user/signup");
    res.render('signup.ejs');
});
router.post('/login',  controller.login);
router.post('/signup', controller.signup);

module.exports = router;
