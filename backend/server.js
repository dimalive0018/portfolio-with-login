const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
require('dotenv').config();
require('colors');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});

const app = express();

app.use(connectLivereload());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./db')()
    .then(() => {
        console.log('DB connected'.green);
        app.listen(process.env.PORT, () => {
            console.log(
                `MongoDB server is listening on port ${process.env.PORT}`
                    .green.underline
            );
        });
    })
    .catch((err) => console.log(`${err}`.red.underline));

app.get('/', (req, res, next) => {
    res.send({
        message: "You're Welcome"
    })
});

app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/project', require('./routes/project.route'));

app.use((req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next(createError(404, `${fullUrl} not found`));
});

app.use((err, req, res, next) => {
    if (err instanceof createError.HttpError) {
        return res.send({
            status: err.status,
            message: err.message
        })
    };
    res.send({
        error: {
            status: 500 || err.status,
            message: err.message
        }
    });
});