const jtw = require('jsonwebtoken');
const { registeredUser } = require('../data/auth.data');

module.exports = {
    signIn: async (req, res, next) => {
        try {
            const jtwVerify = jtw.verify(
                req.headers.authorization,
                process.env.JWT
            );
            req.user = jtwVerify;
            next();
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    admin: async (req, res, next) => {
        try {
            const checkUser = await registeredUser(req.user.email);
            if (checkUser.role !== 'admin') {
                return res.send({
                    status: 401,
                    message: 'Unauthorized access'
                })
            } else {
                next();
            };
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    }
}