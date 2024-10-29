var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  if (level === 10) {
    $("#level-title").text("Level "+ level+ " Keep Going!").css("color", "#00CCDD");
  }
  if (level === 25) {
    $("#level-title").text("Level " +level + " Well Done!").css("color", "#00CCDD");
  }

  if (level === 35) {
    $("#level-title").text("level " +level + " Wow! You are so smart").css("color", "#00CCDD");
  }

  if (level === 50) {
    $("#level-title").text("Level "+ level + " Your memory is incredible!").css("color", "#00CCDD");
  }

  var randomNumber = Math.floor(Math.random() * 4);
  var randonChosenColor = buttonColors[randomNumber];
  gamePattern.push(randonChosenColor);

  $("#" + randonChosenColor)
    .fadeOut(300)
    .fadeIn(300)
    .fadeOut(300)
    .fadeIn(300);

  //   console.log(gamePattern);
  playSound(randonChosenColor);

  animatePress(randonChosenColor);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  console.log("user clicked" + userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var newAudio = new Audio("./sounds/" + name + ".mp3");
  newAudio.play();
  // console.log(newAudio);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    playSound("wrong");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
// $("body").click(function() {
//     nextSequence();
//   });
