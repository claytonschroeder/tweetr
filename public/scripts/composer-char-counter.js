// $(function() {
//   $(".new-tweet textarea").keyup(function(){
//     var entered = $(".new-tweet textarea").val().length;
//     $(".new-tweet .counter").html(140 - entered);
//     if(entered > 140) {
//       $(".new-tweet .counter").css('color', 'red');
//     } else {
//       $(".new-tweet .counter").css('color', 'grey');
//     }
//   });
// });

//=============CHARACTER COUNTER==================//
$(function() {
  var countCharacters = function() {
    var entered = $("textarea", this).val().length;
    $(".counter", this).html(140 - entered);
    if(entered > 140) {
      $(".counter", this).css('color', 'red');
    } else {
      $(".counter", this).css('color', 'grey');
    }
  };
  $(".new-tweet").on('input', countCharacters);
});


//=============COMPOSE MESSAGE==================//

$( "#nav-bar text.compose" ).click(function() {
  $( "main.container section.new-tweet" ).slideToggle( "slow", function() {
    $("textarea").focus();
  });
});






