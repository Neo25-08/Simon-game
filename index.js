let colors = ["green", "red", "yellow", "blue"];
let pattern = [];
let answer = [];
let level = 1;
let clicks = -1;
let start = false;

$(document).on("keydown", () => {
  console.log(start);
  if (!start) {
    $("#level-title").text("Level " + level);
    generatePattern();
    buttonPress(pattern);
    console.log("hello");
    start = true;
  }
})

function buttonPress(colorArray) {
  for (let i = 0; i < colorArray.length; i++) {
    setTimeout(() => {
      $("#" + colorArray[i]).addClass("pressed");
      playSound(colorArray[i]);
      setTimeout(() => {
        $("#" + colorArray[i]).removeClass("pressed");
      }, 200);
    }, 300 * i);
  } 
}

function generatePattern() {
  ranNum = Math.floor(Math.random() * 4)
  pattern.push(colors[ranNum]);
  console.log("pattern: ", pattern);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over")
  }, 400);
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

$(".btn").on("click", (event) => {
  $("#" + event.target.id).addClass("pressed");
  playSound(event.target.id);
    setTimeout(() => {
      $("#" + event.target.id).removeClass("pressed")
    }, 200);
  answer.push(event.target.id);
  answerChecker(event.target.id);
});

function answerChecker(color) {
  console.log("answer: ", answer);
  clicks++;
  if (pattern[clicks] !== color) {
    $("#level-title").text("Game over... Press any key to play again");
    gameOver();
    pattern = [];
    level = 1;
    clicks = -1;
    answer = [];
    start = false;
  } else if (pattern.length === answer.length) {
    setTimeout(() => {
      $("#level-title").text("Level " + level);
      generatePattern();
      buttonPress(pattern);
    }, 400);
    level++;
    clicks = -1;
    answer = [];
  }
}
