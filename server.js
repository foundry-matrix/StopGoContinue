var http = require( 'http' );
var fs = require('fs');
var path = require( 'path' );
var url = require('url');
// var dummy = require('/instaNullResponse.json');
//var twitterClient = require('./twitterClient');
var ecstatic = require( 'ecstatic')({root: __dirname + '/public'});

// http.createServer(function (req, res) {

    //     // if only URL root path is received then load the 'homepage'
    //     if ( req.url.match( /getinstas/ )) {
    //       instagramClient.requestHandler( req, res );
    //     }
    //     // otherwise look for file in ./public directory and read from there useing ecstatic
    //     else {
    //       ecstatic( req, res ) ;
    //     }

    // }).listen( process.env.PORT || 3000   );

http.createServer(function onRequest(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(JSON.stringify(obj.user.username))
  response.end();
  console.log(obj.user.username);
  }).listen(8000);

var obj;
fs.readFile('./instaNullResponse.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});
