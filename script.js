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
let spiritImg;
let spiritWidth = 75;
let spiritHeight = 75;
let spiritX = 75;
let spiritY = 500;

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

let obstacleHeight = 260;
let obstacleX = 700;
let obstacleY = boardHeight - obstacleHeight;

let obstacle1Img;
let obstacle2Img;

//Game Physics and Operations//
let velocityX = -8;
let velocityY = 0;
let gravity = .4;
let gameOver = false;
let score = 0;

//Game Functions//
// When Screen Loads// *Possibly animate the spirit so it floating or use multi button movement contorls
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //This draws the game background//

//Draws spirit character//
    spiritImg = new Image();
    spiritImg.src = "./Images/Spirit.png";
    spiritImg.onload = function() {
    context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); // This draws the spirit character//
    }

    //Obstacles//
    obstacle1Img = new Image();
    obstacle1Img.scr = "./Images/Plant.png";

    obstacle2Img = new Image();
    obstacle2Img.scr = "./Images/Butterfly.png"

    requestAnimationFrame(update);
    setInterval(placePlant, 1000)
    document.addEventListener("keydown". moveSpirit); //This will tell the browser that you want to perform an animation//
}
    function update() {
        if (gameOver) {
            return;
        }
        context.clearRect(0, 0, board.width, board.height); //This clears the canvas//
       
        //Spirit Character
        velocityY += gravity;
        spirit.y = Math.min(spirit.y + velocityY, spiritY); //apply gravity to current spirit.y so it doesn't exceed the ground//
        context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
    
        //Obstacles//
        for (let i = 0; i < obstacleArray.length; i++) {
            let obstacle = obstacleArray[i];
            obstacle.x += velocityX;
            context.drawImage(obstacle.img, obstacle.X, obstacle.Y, obstacle.width, obstacle.height);
    
            if (detectCollision(spirit, obstacle)) {
                gameOver = true;
            }
        }
        //score
        context.fillStyle="black";
        context.font="20px courier";
        score++;
        context.fillText(score, 5, 20);
    }

    
function moveSpirit(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && spirit.y == spiritY) {
        //jump
        velocityY = -10;
    }
    else if (e.code == "ArrowDown" && spirit.y == spiritY) {
        //duck
    }

}