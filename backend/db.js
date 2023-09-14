const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected'.green);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected'.red);
    });
    mongoose.connection.on('error', (err) => {
        console.log(`${err}`.red);
    });

    return mongoose.connect(process.env.URL,
        {
            user: process.env.USER,
            pass: process.env.PASS,
            dbName: process.env.DB_NAME
        }
    );
};