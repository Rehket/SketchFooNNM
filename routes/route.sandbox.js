/**
 * Created by adama on 5/3/2017.
 * This is a location to experiment with routing before implementing.
 */

'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const sharp = require('sharp');
const bp = require('body-parser');

router.use(function timeLog (req, res, next) {
    let today = new Date();
    console.log('Time: ', moment().format());
    next()
});

router.get('/', function(req, res){
    res.send('You are in the sandbox!');
});

let rawParse = bp.raw({type: 'application/*'});


router.post('/image', rawParse, function(req, res){

    console.log('Called Image Post!');
    sharp(req.body)
        .png()
        .toFile('Output.png', function (err, info) {

        });
    res.status(201);
    res.json([{message: 'Got It...'}])
});

module.exports = router;