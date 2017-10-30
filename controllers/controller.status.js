

'use strict';

const http = require('http');

exports.getModels = function (req, res) {
    let options = {
        host: 'rehket.asuscomm.com',
        path: '/models',
        port: 8000
    };

    console.log('Models Requested');
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