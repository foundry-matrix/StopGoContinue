
var fs= require("fs")
var Twitter = require('twitter')

var twitter = new Twitter({
  consumer_key:'f1DcWeVtaYVPB4d1JjrSswzBE',
  consumer_secret: 'EVq4UyzyWOvd2d1sQLqW0xK7rK275axcMexWJ0R3zrl9gPOEpL',
  access_token_key: '31862927-pRNQrTm7JnDuoFzNaDTVhGc03Lo58ozqKGnlrWkDs',
  access_token_secret: '6VN7jmrgckTC8QpxQqRRkCEJrRGF57AXyB0MUOjHIr88t'
});

twitter.stream('statuses/filter', {track: '@founderscoders'},  function(stream){
  stream.on('data',retweetSorter);

  stream.on('error', function(error) {
    console.log(error);
  });
});

  function retweetSorter(tweet) {
    console.log(tweet.text);
    console.dir(tweet)
  };
