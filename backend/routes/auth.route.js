const express = require('express');
const { userRegistration, userLogin } = require('../controller/auth.controller');
const { signIn, admin } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/registration', userRegistration);

router.post('/login', userLogin);

router.get('/check-auth', signIn, (req, res, next) => {
    res.send({
        status: 200
    })
});

router.get('/check-admin', signIn, admin, (req, res, next) => {
    res.send({
        status: 200
    })
});

module.exports = router;