#!/usr/bin/env node

/**
 * Module dependencies.
 */

let app = require('../app');
let debug = require('debug')('sketchfoonnm:server');
let path = require('path');
let http = require('http');
let https = require('https');
let fs =require('fs');
const certsPath = path.join(__dirname, 'certs', 'server');
const caCertsPath = path.join(__dirname, 'certs', 'ca');
const httpPort = process.argv[3] || 4080;
/**
 * SSL Certificates
 */

const options = {
    key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem'))
    /**
     *     This certificate should be a bundle containing your server certificate and any intermediates
     *     cat certs/cert.pem certs/chain.pem > certs/server-bundle.pem
     */
    , cert: fs.readFileSync(path.join(certsPath, 'my-server.crt.pem'))

    /**
     *  ca only needs to be specified for peer-certificates,
     *  ca: [ fs.readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem')) ]
     */
    , requestCert: false
    , rejectUnauthorized: true
};



/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTPs server.
 */

let server = https.createServer(options);

/**
 * Listen on provided port, on all network interfaces.
 */

let host  = 'rehket.asuscomm.com';

server.on('request', app);
server.listen(port, function(){
    port = server.address().port;
    console.log('Listening on https://127.0.0.1:' + port);
    console.log('Listening on https://rehket.asuscomm.com:' + port);
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

let httpRedir = http.createServer();
httpRedir.on('request', function(req, res){
    res.setHeader(
        'Location'
        , 'https://' + req.headers.host.replace(/:\d+/, ':' + port) + req.url
    );
    res.statusCode = 302;
    res.end();
});

httpRedir.listen(httpPort, function(){
    console.log("\nRedirecting all http traffic to https\n");
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
