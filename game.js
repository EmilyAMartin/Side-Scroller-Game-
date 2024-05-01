
//Game Variables// 
let canvas;
let canvasWidth = 1040;
let canvasHeight = 740;
let context;

let backgroundimg = new Image();
    backgroundimg.src = "./img/bg.png";
let backgroundWidth = 0;
let scrollSpeed = 4;

//Sprit//
let spiritWidth = 75;
let spiritHeight = 75;
let spiritX = 75;
let spiritY = 500;
let spiritImg = new Image(); 
spiritImg.src = "./img/spirit.png";


let spirit = {
    x : spiritX,
    y : spiritY,
    width : spiritWidth,
    height : spiritHeight
} 

let obstacleArray = [];

let obstacle1Width = 120;
let obstacle2Width = 120;
let obstacle3Width = 120;

let obstacleHeight = 250;//Height the same for all obstacles//
let obstacleX = 980;
let obstacleY = 500;

let obstacle1Img = new Image(); 
obstacle1Img.src = "./img/obstacle1.png";

let obstacle2Img = new Image();
obstacle2Img.src = "./img/obstacle2.png";


let obstacle3Img = new Image();
obstacle3Img.src = "./img/obstacle3.png";

//Game Physics and Operations//
let velocityX = -10
let velocityY = 0;
let gravity = .4;
let adjustBy = 2.0; //Overlaps the characters collison//
let gameStarted = false;
let gameOver = false;
let score = 0;
let intervalID; //Starts the placement of object when new game is pressed//

//Background Audio and Buttons//
let audio, playbtn;

function initAudioPlayer(){
    audio = new Audio();
    audio.src = "./music/music.mp3";
    audio.volume = 0.05; //Volume of background music
    audio.loop = true;
    audio.play();
    playbtn = document.getElementById("playpausebtn");
    playbtn.addEventListener("click", playPause);
    
function playPause(){
    if(audio.paused){
        audio.play();
        playbtn.style.background = "url(music/pause.png) no-repeat";
    } else {
        audio.pause();
        playbtn.style.background = "url(music/play.png) no-repeat";
       }

    }
} 
window.addEventListener("load", initAudioPlayer);



window.onload = function () {   
    //Draw Canvas//
        canvas = document.getElementById("canvas");
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        context = canvas.getContext("2d");
    //Events & Animation Request//
        document.addEventListener("keydown", moveSpirit);  
        canvas.addEventListener("touchstart", moveSpirit); 
        requestAnimationFrame(gameLoop);
        setInterval(placeObstacle, 1000); //1000 milliseconds = 1 second
    } 
function gameLoop() { 
    requestAnimationFrame(gameLoop);   
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height)

    //Draws Scrolling Background//
    context.drawImage(backgroundimg, -backgroundWidth, 0); //Background 1
    context.drawImage(backgroundimg, -backgroundWidth + canvas.width, 0); //Background 2
    backgroundWidth += scrollSpeed;
    if (backgroundWidth == canvas.width)
    backgroundWidth = 0;
   
    //Draws Spirit Character & Mouvement// 
    velocityY += gravity;
    spirit.y = Math.min(spirit.y + velocityY, spiritY); 
    context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
        
    //Drawing Obstacles//
    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.x += velocityX;
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
              
    //Collision//
    if (detectCollision(spirit, obstacle)) {
        gameOver = true;
        document.getElementById("gameOverMenu").style.display = "block";
        spiritImg.src = "./img/spirit-dead.png";
        spiritImg.onload = function() {
            context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); //Add a game over image and an option to try again//
            }
        }
        
    }
    //Score on screen//
    context.fillStyle="white";
    context.font="20px courier";
    score++;
    context.fillText(score, 15, 30); 
    }  

function moveSpirit(e) {
    if ((e.code === "Enter" || e.type === "touchstart") && spirit.y === spiritY) {
        velocityY = -10;
    
    }
    
    // Resets the Game// 
   if (gameOver){
        document.getElementById("gameOverMenu").style.display = "none";
        spirit.y = spiritY;
        obstacleArray = [];
        score = 0;
        gameOver = false;
        spiritImg = new Image();
        spiritImg.src = "./img/spirit.png";
        spiritImg.onload = function() {
        context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); // This draws the spirit character//
        }
    }
}

function placeObstacle() {
    if (gameOver) {
        return;
    }
    let obstacle = {
        img : null,
        x : obstacleX,
        y : obstacleY,
        width : null,
        height: obstacleHeight
    }
    
    let placeObstacleChance = Math.random();

    if (placeObstacleChance > .75) { 
        obstacle.img = obstacle3Img;
        obstacle.width = obstacle3Width;
        obstacleArray.push(obstacle);
    }
    else if (placeObstacleChance > .50) { 
        obstacle.img = obstacle2Img;
        obstacle.width = obstacle2Width;
        obstacleArray.push(obstacle);
    }
    else if (placeObstacleChance > .25) { 
        obstacle.img = obstacle1Img;
        obstacle.width = obstacle1Width;
        obstacleArray.push(obstacle);
    }

    if (obstacleArray.length > 5) {
        obstacleArray.shift(); //Keeps array from growing//
    }
}
function detectCollision(a, b) {
    return a.x < b.x + b.width / adjustBy &&   
           a.x + a.width / adjustBy > b.x &&   
           a.y < b.y + b.height / adjustBy &&  
           a.y + a.height / adjustBy > b.y;    
           
}

function resetGame(){
    window.location = "index.html"
    clearInterval(intervalID); //Clears the gameloop and obstacle placement onclick to Main Menu//
    spirit.y = spiritY;
    obstacleArray = [];
    score = 0;
    gameOver = false;
    spiritImg = new Image();
    spiritImg.src = "./img/spirit.png";
    spiritImg.onload = function() {
    context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); // This draws the spirit character//
        }
    }