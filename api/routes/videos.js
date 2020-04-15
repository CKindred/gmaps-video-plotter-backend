const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

router.get('/', (req, res, next) => {
   Video.find().then(result => {return res.status(200).json(result)})
   .catch(err => {return res.status(500).json(err)}); 
});

module.exports = router;