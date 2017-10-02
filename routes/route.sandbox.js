/**
 * Created by adama on 5/3/2017.
 * This is a location to experiment with routing before implementing.
 * We are using https://www.npmjs.com/package/multer
 */

'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const bp = require('body-parser');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const { spawn } = require('child_process');
//const fileUpload = require('express-fileupload');
//const multer  = require('multer');


router.use(bp());

router.use(function timeLog (req, res, next) {
    let today = new Date();
    console.log('Time: ', moment().format());
    next()
});

router.get('/', function(req, res){
    res.send('You are in the sandbox!');
});

//let rawParse = bp.raw({type: 'application/*'});

/*let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

const upload = multer({ storage: storage});
*/

router.post('/image', function(req, res, next){

    //if (!req.file)
        //return res.status(400).send('No files were uploaded.');


    console.log(req.body.image);
    let data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
    let buf = new Buffer(data, 'base64');
    fs.writeFile('uploads/image.jpeg', buf, function(){
        console.log("File Saved!!");
        spawn.child_process();
    });

    console.log('Called Image Post!');
    // Use the mv() method to place the file somewhere on your server
        res.status(201);
        res.json([{message: 'Got It...'}]);


});

module.exports = router;