/**
 * Created by adama on 5/4/2017.
 * This is where we will query the NNetwors for their statuses and the models that they support.
 * SO Reference: https://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
 */

'use strict';
const http = require('http');
const https = require('https');

/*options = {
    host: 'target.website.com',
    port: 6006, // The port we are using for the request.
    path: 'the/path/to/the/resource',
    method: 'GET',
    headers: {
        'Content-Type': 'application:/json'
        }
    }
* */

exports.getJSON = function(options, onResult) {
    console.log('Making rest getJSon Request to ' + options.host + '\n');
    console.log(options);
    let port = options.port === 443 ? https : http;
    //console.log(port);
    let req = port.request(options,  function () {
        let output ='';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            let obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });

    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();

};