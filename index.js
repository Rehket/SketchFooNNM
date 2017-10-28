/**
 * Created by adama on 5/3/2017.
 */
'use strict';
const path = require('path');

const express = require('express');
const app = express();
const sandBox = require('./routes/route.sandbox');

app.use('/sandbox', sandBox);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {

    res.sendFile('views/ImageSubmission.html', {root: __dirname });
});

app.get('/testing', function (req, res) {

    res.sendFile('views/ImageSubmission-testing.html', {root: __dirname });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});