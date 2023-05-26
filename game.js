

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// For random sequence :
function nextSequence() {
  userClickedPattern = [];  
  level++;
  $("#level-title").text("Level "+level);  

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  animate(randomChosenColour);

}

// For user chosen sequence :
 $(".btn").click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    animate(userChosenColour);

    checkAnswer(userClickedPattern.length-1);


 });

//  For sound and animation :
function animate(currentColour){

    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

    var audio = new Audio("sounds/" + currentColour + ".mp3");
    audio.play();

}

// For starting the game :
$(document).ready(function(event){
    setTimeout(function(){
        if(!started){
            $("#level-title").text("Level "+ level);
            nextSequence();
            started = true;
        }
    }, 2000);
});
// $(document).keydown(function(event){
//     if(event.key.toLowerCase()=="a" && !started){
//         $("#level-title").text("Level "+ level);
//         nextSequence();
//         started = true;
//     }
// });

// For checking answer :
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }

    }
    // For wrong answer :
    else{
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Refresh to restart");

        startOver();
    }
}

// For restart the game :
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}