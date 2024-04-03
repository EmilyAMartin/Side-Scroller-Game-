//Game Menu//
let runGame = function(){
    document.getElementById("newGame").style.display = "none";
    document.getElementById("theHead").style.display = "none";    
    document.getElementById("instructions").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("instructionsBtn").style.display = "none";
  };
 let showInstructions = function(){
   document.getElementById("theHead").style.display = "none";
   document.getElementById("instructionsBtn").style.display = "none";
   document.getElementById("newGame").style.display = "none";
   document.getElementById("instructions").style.display = "block";
   document.getElementById("backBtn").style.display = "block";
 }; 
let goBack = function(){
  document.getElementById("backBtn").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  document.getElementById("theHead").style.display = "block";
  document.getElementById("newGame").style.display = "block";
  document.getElementById("instructionsBtn").style.display = "block";
};
//Game Variables// 
//Canvas//
let board;
let boardWidth = 980;
let boardHeight = 730;
let context;

//Spirit character//
let spiritWidth = 75;
let spiritHeight = 75;
let spiritX = 75;
let spiritY = 500;
let spiritImg;

//Spirit object//
let spirit = {
    x : spiritX,
    y : spiritY,
    width : spiritWidth,
    height : spiritHeight
} 
//Obstacles//
let obstacleArray = [];

let obstacle1Width = 120;
let obstacle2Width = 115;

let obstacleHeight = 230;
let obstacleX = 700;
let obstacleY = 500;

let obstacle1Img;
let obstacle2Img;

//Game Physics and Operations//
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

//Game Functions//
// When Screen Loads// 
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //This draws the game background//

//Draws spirit character//
    spiritImg = new Image();
    spiritImg.src = "./img/spirit.png";
    spiritImg.onload = function() {
    context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); // This draws the spirit character//
    }

    //Obstacles//
    obstacle1Img = new Image();
    obstacle1Img.src = "./img/obstacle1.png";

    obstacle2Img = new Image();
    obstacle2Img.src = "./img/obstacle2.png";

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", moveSpirit);
   
    function toggleMuted() {
        let sound = document.getElementById('sound');
        sound.muted = !sound.muted;
      }
} 
//This will tell the browser that you want to perform an animation// 
//*Possibly animate the spirit so it floating or use multi button movement contorls//
    function update() {
        requestAnimationFrame(update);
        if (gameOver) {
            return;
        }
        context.clearRect(0, 0, board.width, board.height); //This clears the canvas//
       
        //Spirit Character// 
        velocityY += gravity;
        spirit.y = Math.min(spirit.y + velocityY, spiritY); // Applies gravity to spirit
        context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
    
        //Drawing Obstacles and Game over//
        for (let i = 0; i < obstacleArray.length; i++) {
            let obstacle = obstacleArray[i];
            obstacle.x += velocityX;
            context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
    
            if (detectCollision(spirit, obstacle)) {
                gameOver = true;
                spiritImg.src = "./img/spirit-dead.png";
                spiritImg.onload = function() {
                    context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
                //Add a game over image and an option to try again//
                }
            }
        }
    
        //score
        context.fillStyle="black";
        context.font="20px courier";
        score++;
        context.fillText(score, 5, 20);
    } 

//*Possibly animate the spirit so it floating or use multi button movement contorls//
function moveSpirit(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && spirit.y == spiritY) {
        //jump
        velocityY = -10;
    }

}

function placeObstacle() {
    if (gameOver) {
        return;
    }

    //place obstacle
    let obstacle = {
        img : null,
        x : obstacleX,
        y : obstacleY,
        width : null,
        height: obstacleHeight
    }

    let placeObstacleChance = Math.random();

    if (placeObstacleChance > .50) { 
        obstacle.img = obstacle2Img;
        obstacle.width = obstacle2Width;
        obstacleArray.push(obstacle);
    }
    else if (placeObstacleChance > .50) { 
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