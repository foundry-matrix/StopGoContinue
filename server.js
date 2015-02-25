var http = require( 'http' );
var fs = require('fs');
var path = require( 'path' );
var url = require('url');
var api = require('./client.js');
var ecstatic = require( 'ecstatic')({root: __dirname + '/public'});



http.createServer(function onRequest(request, response) {
  var pathname = url.parse(request.url).pathname;
  
  if(pathname==="/") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('hello')
    response.end();
  } else if (pathname==="/api")  {
        api.serveTweets(response);       //This where the request our database happens.
  } else {
    ecstatic(request, response);
  }

}).listen(8000);

console.log("server started");
