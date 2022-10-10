var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var start=false;

$("body").keydown(function(){
    if(!start){
        nextSequence();
        start=true;
    }
});

$("#mobile-title").click(function(){
    if(!start){
        nextSequence();
        start=true;
    }
});

var level=0;
function nextSequence(){
    var randomNumber=Math.random();
    randomNumber=Math.floor(4*randomNumber);
    
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio=new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();  
    
    $("#title").html("Level "+level);
    $("#mobile-title").html("Level "+level);
    level++;

    userClickedPattern=[];
}

$(".Btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();   
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#title").html("Game Over, Press Any Key to Restart");
        $("#mobile-title").html("Game Over, Tap to Restart");

        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}
