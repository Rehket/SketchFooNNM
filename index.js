/**
 * Created by adama on 5/3/2017.
 */
'use strict';

const express = require('express');
const app = express();

const sandBox = require('./routes/route.sandbox');

app.use('/sandbox', sandBox);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});