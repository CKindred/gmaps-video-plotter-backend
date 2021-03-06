const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const Video = require('./api/models/video');
const videoRoutes = require('./api/routes/videos');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(express.urlencoded());
app.use(express.json());

app.use('/videos', videoRoutes);
app.use('/user', userRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;