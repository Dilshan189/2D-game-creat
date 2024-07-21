var runStart = 0;
function keyCheck(event){

    //Enter Key
    if(event.which == 13){
        if(runWorkerId==0){
            runWorkerId = setInterval(run, 100);
            runSound.play();
            runStart = 1;
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 600);
            createBlockId = setInterval(createBlock, 100);
            moveBlockId = setInterval(moveBlocks,100);
        
        }
    }


    //Space Key
    if(event.which == 32){
        if(runStart==1){
            if(jumpWorkerId==0){
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId = setInterval(jump,100);
                jumpSound.play();

            }
        }
    }




} 

var runSound = new Audio("run.mp3");
runSound.loop = true;


//Run Function

var player = document.getElementById("player");
var runImageNumber = 1;
var runWorkerId = 0;
function run(){
    runImageNumber++;
    if(runImageNumber == 11){
        runImageNumber=1;
    }

    player.src = "Run ("+runImageNumber+").png";



}

var jumpSound = new Audio("jump.mp3");
//Jump Function
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 415;
function jump(){
    jumpImageNumber++;
    if(jumpImageNumber<=7){
        playerMarginTop = playerMarginTop-35;
        player.style.marginTop = playerMarginTop+"px";
    }

    if(jumpImageNumber>=8){
        playerMarginTop = playerMarginTop+35;
        player.style.marginTop = playerMarginTop+"px";
    }

    if(jumpImageNumber==13){
        jumpImageNumber=1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;


        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    player.src = "Jump ("+jumpImageNumber+").png";


}

//Move Background
var backgroundWorkerId = 0;
var background = document.getElementById("background");
var backgroundX = 0;
function moveBackground(){
    backgroundX = backgroundX-20;
    background.style.backgroundPositionX = backgroundX+"px";
}


//Update Score
var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;
function updateScore(){
    newScore++;
    score.innerHTML = newScore;

}


//create  Block

var createBlockId = 0;
var blockMarginLeft = 600;
var blockId = 1;
function createBlock(){
    var block = document.createElement("div");
    block.className = "block";


    block.id = "block"+blockId;
    blockId++;

    var gap = Math.random()*(1000-400)+400;
    blockMarginLeft = blockMarginLeft+gap;


    block.style.marginLeft = blockMarginLeft+"px";

    background.appendChild(block);
}

//Move Blocks
var moveBlockId = 0;
function moveBlocks(){
    for(var i = 1; i<=blockId; i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-20;
        currentBlock.style.marginLeft = newMarginLeft+"px";
        //123&43
        if(newMarginLeft <=123){
            if(newMarginLeft>=60){
                if(playerMarginTop<=415){
                    if(playerMarginTop>=310){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockId);
                        clearInterval(moveBlockId);

                        deadWorkerId = setInterval(dead,100);
                        deadSound.play();
                    }
                }
            }
        }
    }
    

}
var deadSound = new Audio("dead.mp3");
//Dead Functioin

var deadImageNumber = 1;
var deadWorkerId = 0;
function dead(){
    deadImageNumber++;
    if(deadImageNumber==15){
        deadImageNumber =14;


        player.style.marginTop = "370px";
        document.getElementById("endScore").innerHTML = newScore;
        document.getElementById("gameOver").style.visibility = "visible"
    }
    player.src = "Dead ("+deadImageNumber+").png";
}

function re(){
    location.reload();
}

