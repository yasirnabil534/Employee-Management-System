const express = require('express');
const router = express.Router();
const { authAPI } = require('../utils/apiEndpoints');
const {
    login,
} = require('../services/authService');

// ? API to sign in
router.post(authAPI, login);

module.exports = router;