/**
 * Created by adama on 5/3/2017.
 * This is a location to experiment with routing before implementing.
 */

var express = require('express');
var router = express.Router();
var moment = require('moment');

router.use(function timeLog (req, res, next) {
    var today = new Date();
    console.log('Time: ', moment().format());
    next()
});

router.get('/', function(req, res){
    res.send('You are in the sandbox!');
});

module.exports = router;