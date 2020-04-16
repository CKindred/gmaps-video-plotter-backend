const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
const checkAuth = require('../middleware/check-auth');
router.get('/', (req, res, next) => {
    Video.find().then(result => { return res.status(200).json(result) })
        .catch(err => { return res.status(500).json(err) });
});

router.post('/', checkAuth, (req, res, next) => {
    const loc = {
        lat: req.body.lat,
        lng: req.body.lng
    }

    const video = new Video({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        location: loc,
        videoURL: req.body.videoURL
    });
    video.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Video created'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;