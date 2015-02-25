var fs= require("fs")
var Twitter = require('twitter')

var twitter = new Twitter({
  consumer_key:'f1DcWeVtaYVPB4d1JjrSswzBE',
  consumer_secret: 'EVq4UyzyWOvd2d1sQLqW0xK7rK275axcMexWJ0R3zrl9gPOEpL',
  access_token_key: '31862927-pRNQrTm7JnDuoFzNaDTVhGc03Lo58ozqKGnlrWkDs',
  access_token_secret: '6VN7jmrgckTC8QpxQqRRkCEJrRGF57AXyB0MUOjHIr88t'
});

twitter.stream('statuses/filter', {track: '@discofingers #stop, @discofingers #go, @discofingers #continue'},  function(stream){
  stream.on('data',retweetSorter);

  stream.on('error', function(error) {
    console.log(error);
  });
});

function retweetSorter(tweet, callback) {
    // console.log(tweet.text);
    if(tweet.retweeted_status == undefined){   //i.e. is a new tweet
        suggestionCreate(tweet);
    };
    else {                                      // i.e. is a vote
        // ***INSERT RETWEET FUNCTION***
    };
};


function regexFormatter (tweet, callback){
    var tweetText = tweet.text; 
    var regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
    var formatter = regex.exec(tweetText);
    // var hashtag = formatter[0];

    //***INSERT @ STRIPPING FUNCTION LATER***//
    
};

function suggestionCreate(tweet, callback){
    
    var textBody = regexFormatter(tweet.text);
    var retweetCount = 0;
    var originalTweeter = tweet.user.name;
    var voters = [];
    var hashtag = formatter[0];
    var timeCreated = tweet.timestamp_ms;
    var idNumber = tweet.id;

    var suggestionObject = {
        textBody : textBody,
        retweetCount : retweetCount,
        originalTweeter : originalTweeter,
        voters : voters,
        hashtag : hashtag,
        timeCreated : timeCreated, 
        idNumber : idNumber,
    };
    callback(suggestionObject);
};


function saveSuggestion(suggestionObject){
    storedTweets.tweets.push(suggestionObject);
} 










var storedTweets = {tweets:
    [ 
        { textBody : 'asdfasdfsdsf @founderscoders #go',
              retweetCount : 0,
              originalTweeter : 'gregaubs',
              voters : [],
              hashtag : '#go',
              timeCreated : 1500, 
              idNumber : 1201,
        },
        { textBody : '@founderscoders dfdfddfd #stop',
              retweetCount : 1,
              originalTweeter : 'per',
              voters : [],
              hashtag : '#stop',
              timeCreated : 1505, 
              idNumber : 1202,
        },
        { textBody : '@founderscoders fdfddff  #continue',
            retweetCount : 5,
              originalTweeter : 'asim',
              voters : [],
              hashtag : '#continue',
              timeCreated : 1510, 
              idNumber : 1203,
        }
    ]
};













