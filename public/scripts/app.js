$(document).ready(function () {

  function renderTweets(tweets) {
    tweets.forEach(function (tweet) {
      var element = createTweetElement(tweet);
      $('#tweets-container').prepend(element);
    })
  }

  function createTweetElement(tweet) {
    //create variabled for tweeter data,
    //used to append to html elements
    var name = tweet.user.name;
    var avatar = tweet.user.avatars.small;
    var handle = tweet.user.handle;
    var content = tweet.content.text;
    var created = tweet.created_at;
    // an insanely overly compicated way of
    // getting the amout of days since tweet was made
    var today = Date.now();
    var millisElapsed = today - created;
    var daysElapsed = millisElapsed/86400000;
    var roundedDays = Math.round(daysElapsed);

    if(roundedDays === 0) {
      var day = "Tweeted today.";
    } else if (roundedDays === 1) {
      var day = "Tweeted yesteday.";
    } else {
      var day = "Tweeted " + roundedDays + " days ago.";
    }

    //to be appended to #tweet-container
    var $tweet = $("<article>").addClass("tweet");//.append(tweetData.context.text);
    //to be appended to $tweet
    var $header = $("<header>");
    var $body = $("<p>").append(content);
    var $footer = $("<footer>");
    //to be appended to $header
    var $tweet_handle = $("<span>").append(handle); //.addClass("handle").append(tweetData.user.handle);
    var $avatar = $("<img>").attr("src", avatar);  //.addClass("img").append(tweetData.user.avatars);
    var $user_name = $("<text>").append(name);
    //to be appended to $footer
    var $date = $("<p>").append(day)
    var $icon1 = $("<i class='fa fa-heart' aria-hidden='true'>");
    var $icon2 = $("<i class='fa fa-retweet' aria-hidden='true'>");
    var $icon3 = $("<i class='fa fa-flag' aria-hidden='true'>");
    //footer children appended to footer
    $date.appendTo($footer);
    ($icon1).appendTo($footer);
    ($icon2).appendTo($footer);
    ($icon3).appendTo($footer);
    //header children appended to
    ($avatar).appendTo($header);
    ($user_name).appendTo($header);
    ($tweet_handle).appendTo($header);
    //append header to tweet article
    ($header).appendTo($tweet);
    ($body).appendTo($tweet);
    ($footer).appendTo($tweet);

    return $tweet;
  };

  $('form[action="/tweets"]').on('submit', function (event) {
    event.preventDefault();
    var tweetInput = $(this);
    var input = tweetInput.find("textarea").serialize();

    if(input.length > 145) {
      alert("Message must be under 140 characters")
      } else if (input === "text=") {
        alert("You did not entet a tweet!")
      } else
      $.ajax({
        method: 'POST',
        url: tweetInput.attr('action'),
        data: tweetInput.find("textarea").serialize()
      }).done(function () {
        loadTweets();
      });
      $('form[action="/tweets"]').each(function() {
       this.reset();
     })
  });

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url:'/tweets',
      dataType: 'json',
      success: function(tweetData) {
        renderTweets(tweetData);
      }
    });
  }

  loadTweets();

});

