/**
 * Created by adama on 5/3/2017.
 */
'use strict';
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors')
const nn_status = require('./routes/route.status');




app.use(cors());

// Handles Static resources
app.use('/static', express.static(path.join(__dirname, 'public')));


nn_status(app);

// Send the basic testing page
app.get('/', function (req, res) {
    res.sendFile('views/ImageSubmission.html', {root: __dirname });
});
// Send the basic testing page
app.get('/testing', function (req, res) {
    res.sendFile('views/ImageSubmission-testing.html', {root: __dirname });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error:'Yep, an error'});
});

module.exports = app;