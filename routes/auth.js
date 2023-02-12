const express = require('express');
const {check, body} = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', [check('email').isEmail().withMessage('Please enter a valid email address').custom((value, {req}) => {
    return User.findOne({email: value}).then(userDoc => {
        if(userDoc){
            return Promise.reject(
                'Email already exists, please enter a unique one'
            );
        }
    })
}).trim(), 
body('password', 'Please enter a password with only alphanumeric characters & atleast of length 5').isLength({min: 5}).isString().trim(), 
body('confirmPassword').custom((value, {req}) => {
    if(value !== req.body.password){
        throw new Error("Passwords don't match!");
    }
    return true;
}).trim()], authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;