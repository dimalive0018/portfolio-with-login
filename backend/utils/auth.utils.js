const bcrypt = require('bcrypt');

module.exports = {
    passwordCrypter: async (pass) => {
        try {
            return await bcrypt.hash(pass, 10);
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    passwordDecryptor: async (pass, passwordCrypter) => {
        try {
            return await bcrypt.compare(pass, passwordCrypter);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}