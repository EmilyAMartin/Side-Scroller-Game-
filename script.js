//Game Menu//
let runGame = function(){
    document.getElementById("newGame").style.display = "none";
    document.getElementById("theHeader").style.display = "none";    
    document.getElementById("instructions").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("instructionsBtn").style.display = "none";
    document.getElementById("soundBtn").style.display = "none";   
};
let showInstructions = function(){
    document.getElementById("theHeader").style.display = "none";
    document.getElementById("instructionsBtn").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("instructions").style.display = "block";
    document.getElementById("soundBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "block";
}; 
let goBack = function(){
    document.getElementById("backBtn").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("theHeader").style.display = "block";
    document.getElementById("newGame").style.display = "block";
    document.getElementById("soundBtn").style.display = "block";
    document.getElementById("instructionsBtn").style.display = "block";
};
let toggleMuted = function(){
document.getElementById("soundBtn").muted = true;
}

//Game Variables// 
//Scrolling Background//
let canvas;
let canvasWidth = 980;
let canvasHeight = 730;
let context;

let backgroundimg = new Image();
    backgroundimg.src = "./img/background.png";
let backgroundWidth = 0;
let scrollSpeed = 2;

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
let obstacle2Width = 115;
let obstacleHeight = 230;
let obstacleX = 980;
let obstacleY = 500;
let obstacle1Img = new Image();
    obstacle1Img.src = "./img/obstacle1.png";
let obstacle2Img = new Image();
    obstacle2Img.src = "./img/obstacle2.png";

//Game Physics and Operations//
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

//Game Functions//
window.onload = function () {
    canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    context = canvas.getContext("2d"); 
   
    function background()
    {
            context.drawImage(backgroundimg, -backgroundWidth, 0); //Background 1
            context.drawImage(backgroundimg, -backgroundWidth + canvas.width, 0); //Background 2
            backgroundWidth += scrollSpeed;
             
            if (backgroundWidth == canvas.width)
                backgroundWidth = 0;
                window.requestAnimationFrame(background);
        }
        background();

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", moveSpirit);   
    
} 

function update() { 
    requestAnimationFrame(update);        
    
    //Draws Spirit Character & Mouvement// 
    velocityY += gravity;
    spirit.y = Math.min(spirit.y + velocityY, spiritY); 
    context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
    
    //Drawing Obstacles//
    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.x += velocityX;
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
    
    //Object Collision//
    if (detectCollision(spirit, obstacle)) {
        gameOver = true;
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
    
    //Gameover//
    if (gameOver) {
        context.drawImage(backgroundimg, 0, 0, 980, 730)
        context.fillStyle="white";
        context.font="50px courier";
        context.fillText("GAME OVER", 360, 360,);
        spiritImg.src = "./img/spirit-dead.png";
        context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);     
      }
    } 
       
//*Possibly animate the spirit so it floating or use multi button movement contorls//
function moveSpirit(e) {
    if ((e.code == "ArrowUp") && spirit.y == spiritY) {
        //jump
        velocityY = -10;
    }
   // Resets the Game// 
   if(gameOver){
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
    //place obstacle
    let obstacle = {
        img : null,
        x : obstacleX,
        y : obstacleY,
        width : null,
        height: obstacleHeight
    }
    let placeObstacleChance = Math.random();

    if (placeObstacleChance > .10) { 
        obstacle.img = obstacle2Img;
        obstacle.width = obstacle2Width;
        obstacleArray.push(obstacle);
    }
    else if (placeObstacleChance > .10) { 
        obstacle.img = obstacle1Img;
        obstacle.width = obstacle1Width;
        obstacleArray.push(obstacle);
    }

    if (obstacleArray.length > 5) {
        obstacleArray.shift(); //Keeps array from growing//
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
           
}

