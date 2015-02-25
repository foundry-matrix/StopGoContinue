var fs= require("fs");
var Twitter = require('twitter');
var mongoose = require('mongoose');


mongoose.connect('mongodb://foundrymatrix:foundrymatrix@ds048537.mongolab.com:48537/stopgocontinue');


var twitter = new Twitter({
  consumer_key: "DXOdJmAOCaGNWYExSEnUl4gUH",
  consumer_secret: "vl2qjRONh8N6jkU9ZLxyP7bDxFdmyHlClYxC7prcP9j1empEbE",
  access_token_key: "31862927-9sYkrlidwy0BAEcw44bVXCb0D8XDjnwZBzTYTTSBG",
  access_token_secret: "b7bzvCEA63xYD4w3P1XN5YaEd3wxhDzmbPn8kwSETVaH2"
});



var Schema = mongoose.Schema;

var tweetsSchema = new Schema({
  id: Number,
  textBody: String,
  retweetCount: Number,
  originalTweeter: String,
  hashtag: String,
  timeCreated: Number
});

var TweetCollection = mongoose.model('TweetCollection', tweetsSchema);



twitter.stream('statuses/filter', {track: '@discofingers #stop, @discofingers #go, @discofingers #continue'},  function(stream){
  stream.on('data',retweetSorter);

  stream.on('error', function(error) {
    console.log(error);
  });
});


/*
twitter.stream('statuses/filter', {track: '#love'},  function(stream){
  stream.on('data',retweetSorter);
  stream.on('error', function(error) {
    console.log(error);
  });
});
*/



stored_tweets =[{id: 123, textBody: "Wedensday drinks! #continue", retweetCount:"4"}]

  function retweetSorter(tweet, callback) {
    //console.log(tweet);
    // console.log(tweet.text);
        if(tweet.retweeted_status == undefined){   //i.e. is a new tweet
            suggestionCreate(tweet);
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

    TweetCollection.findOneAndUpdte({ id: id}, {$set:{retweetCount:rt_count }} ,function(err){
      console.log(err);
    })
    
  }



  function suggestionCreate(tweet){

    //var textBody = regexFormatter(tweet.text);

    var textBody = tweet.text;
    var id = tweet.id;
    var retweetCount = 0;
    var originalTweeter = tweet.user.name;
    var voters = [];
    var hashtag = [];
    var timeCreated = tweet.timestamp_ms;

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
    })

/*
    var object = {
        textBody : textBody,
        retweetCount : retweetCount,
        originalTweeter : originalTweeter,
        voters : voters,
        hashtag : hashtag,
        timeCreated : timeCreated 
    };
*/
    console.log(object);
  }




  function regexFormatter (tweetText){
    var regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
    var formatter = regex.exec(tweetText);
    var hashtag = formatter[0];
    
  };



