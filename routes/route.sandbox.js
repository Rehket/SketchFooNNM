/**
 * Created by adama on 5/3/2017.
 * This is a location to experiment with routing before implementing.
 */

'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const sharp = require('sharp');

router.use(function timeLog (req, res, next) {
    let today = new Date();
    console.log('Time: ', moment().format());
    next()
});

router.get('/', function(req, res){
    res.send('You are in the sandbox!');
});

router.post('/image', function(req, res){
    console.log('Called Image Post!')
});

module.exports = router;