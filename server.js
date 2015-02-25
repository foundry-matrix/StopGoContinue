var http = require( 'http' );
var fs = require('fs');
var path = require( 'path' );
var url = require('url');
var api = require('./client.js');

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
    var pathname = url.parse(request.url).pathname;
  
  if(pathname==="/") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('hello')
    response.end();
    //console.log(obj.user.username);
  } else if (pathname==="/api")  {
        
        api.serveTweets(response);

  } else {
    ecstatic(request, response);
  }



  }).listen(8000);



/*var obj;

fs.readFile('./instaNullResponse.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});*/
