var fs = require("fs");
var Twitter = require('twitter');
var mongoose = require('mongoose');

mongoose.connect('mongodb://foundrymatrix:foundrymatrix@ds048537.mongolab.com:48537/stopgocontinue');

var twitter = new Twitter({
  consumer_key: "DXOdJmAOCaGNWYExSEnUl4gUH",
  consumer_secret: "vl2qjRONh8N6jkU9ZLxyP7bDxFdmyHlClYxC7prcP9j1empEbE",
  access_token_key: "31862927-9sYkrlidwy0BAEcw44bVXCb0D8XDjnwZBzTYTTSBG",
  access_token_secret: "b7bzvCEA63xYD4w3P1XN5YaEd3wxhDzmbPn8kwSETVaH2"
});


  twitter.stream('statuses/filter', {track: '@discofingers #stop, @discofingers #go, @discofingers #continue'},  function(stream){
    stream.on('data',retweetSorter);
    stream.on('error', function(error) {
      console.log(error);
    });
  });







var Schema = mongoose.Schema;

var tweetsSchema = new Schema({
      id: String,
      textBody: String,
      retweetCount: Number,
      originalTweeter: String,
      hashtag: String,
      timeCreated: Number,
}); 

var TweetCollection = mongoose.model('TweetCollection', tweetsSchema);


function serveTweets(response){
    TweetCollection.find({}, function(err,tweets){
      
      tweets.forEach(function(tweet){

      });

      response.writeHead(200, {"Content-Type": "application/javascript"});
      response.end(JSON.stringify(tweets));



    });
  }




  function retweetSorter(tweet, callback) {
    //console.log(tweet);
    // console.log(tweet.text);
        if(tweet.retweeted_status == undefined){   //i.e. is a new tweet
            regexFormatter(tweet);
            //suggestionCreate(tweet);
        }
        else {                                      // i.e. is a vote
            fetchRT(tweet);
         };
  };

  function fetchRT(tweet) {
    var id = tweet.retweeted_status.id;
    var rt_count = tweet.retweeted_status.retweet_count;
    console.log("Retweeted tweet with id:");
    console.log(id);
    updateInfo(id,rt_count);
  }


  function updateInfo(id,rt_count){
    TweetCollection.findOneAndUpdte({ id: id}, {$set: {retweetCount:rt_count } } ,function(err){
      console.log(err);
    });
    
  }


  function regexFormatter (tweet, callback){
    var tweetText = tweet.text;
    var regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
    var formatter = regex.exec(tweetText);
    suggestionCreate(tweet,formatter)
  };



  function suggestionCreate(tweet,formatter){
    //var textBody = regexFormatter(tweet.text);
    var textBody = tweet.text;
    var id = tweet.id;
    var retweetCount = 0;
    var originalTweeter = tweet.user.name;
    var voters = [];
    var hashtag = formatter[0];
    var timeCreated = tweet.timestamp_ms;
    var idNumber = tweet.id;


    new_tweet = new TweetCollection({
        id: id,
        textBody: textBody,
        retweetCount: retweetCount,
        originalTweeter: originalTweeter,
        hashtag: hashtag,
        timeCreated: timeCreated
    });

    new_tweet.save(function(err){
      console.log("saved");
      console.log(err);
    });

}


exports.serveTweets = serveTweets;







