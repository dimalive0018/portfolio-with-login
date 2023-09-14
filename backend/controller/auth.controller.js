const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { passwordCrypter, passwordDecryptor } = require('../utils/auth.utils');
const User = require('../models/user.model');
const { registeredUser } = require('../data/auth.data');

module.exports = {
    userRegistration: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const registrationCheck = await registeredUser(email);
            if (registrationCheck) {
                return res.send({
                    status: 409,
                    message: 'Email already registered'
                })
            };
            const user = new User({ ...req.body });
            await user.validate();
            const passwordHashed = await passwordCrypter(password);
            user.password = passwordHashed;
            await user.save();
            res.send({
                status: 201,
                message: 'User successfully registered',
                user
            })
        } catch (error) {
            console.error(error.message);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.send({
                    status: 422,
                    message: error.message
                });
            };
            next(error);
        }
    },
    userLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await registeredUser(email);
            if (!user) {
                return res.send({
                    status: 404,
                    message: 'Invalid email'
                });
            };
            const decryptPassword = await passwordDecryptor(password, user.password);
            if (!decryptPassword) {
                return res.send({
                    status: 404,
                    message: 'Invalid password'
                });
            };
            const token = jwt.sign(
                {
                    id: user.id,
                    email,
                    role: user.role
                },
                process.env.JWT,
                { expiresIn: '2d' }
            );
            res.send({
                status: 200,
                message: 'Sign in completed',
                user: {
                    email,
                    role: user.role
                },
                token
            })
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    }
}