const User = require('../models/user.model');

module.exports = {
    registeredUser: async (email) => {
        return await User.findOne({ email });
    }
}