const express = require('express');
const app = express();
const morgan = require('morgan');

const videos = {
    videos: [
        {
            title: 'Placeholder title',
            location: { lat: 55.3781, lng: -3.4360 },
            videoURL: "https://www.youtube.com/embed/zoSJ3bNGPp0"
        },
        {
            title: 'Placeholder title 2',
            location: { lat: 51.7634, lng: -0.2231 },
            videoURL: "https://www.youtube.com/embed/orMtwOz6Db0"
        }
    ]
}

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

app.use((req, res, next) => {
    res.status(200).json(videos);
});

module.exports = app;