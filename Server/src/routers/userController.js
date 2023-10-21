const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { userAPI } = require('../utils/apiEndpoints');
const {
    createUser,
    getUsers,
} = require('../services/userService');

// ? API to sign in
router.post(
    userAPI.CREATE,
    [
        body('fname', 'fname is required').notEmpty(),
        body('lname', 'lname is required').notEmpty(),
        body('email', 'Please enter a valid email').notEmpty().isEmail(),
        body('age', 'age is required').optional().isNumeric(),
        body('password', 'Please enter at least 6 digits').isLength({ min: 6 }),
        body('type', 'type is required').notEmpty(),
        body('type', 'type must be admin or user').isIn(['admin', 'user']),
    ],
    createUser
);

// ? API to get all users
router.get(userAPI.GET_ALL, getUsers);

module.exports = router;