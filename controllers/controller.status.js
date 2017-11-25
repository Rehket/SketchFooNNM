
/*The Controller for Status*/

'use strict';

const http = require('http');

exports.getModels = function (req, res) {
    let options = {
        host: 'localhost',
        path: '/api/models/',
        port: 8000
    };

    console.log('Models Requested');
    // Get the models from the address specified in options.
    http.get(options, function(resp) {
        let data = '';

        resp.on('data', function(chunk) {
            data += chunk;
        });

        resp.on('end', function(){
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200);
            res.send(data);
        });
    });
};