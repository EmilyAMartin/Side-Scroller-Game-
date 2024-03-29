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
let sprit = {
    x : spiritX,
    y : spiritY,
    width : spiritWidth,
    height : spiritHeight
} 

//Plant obstacle//
let plantImg;
let plantWidth = 120;
let plantHeight = 260;
let plantX = 150;
let plantY = 500;

//Butterfly obstacle//
let butterflyImg;
let butterflyWidth = 115;
let butterflyHeight = 115;
let butterflyX = 150;
let butterflyY = 500;

//Game Physics and Operations//
let velocityX = 0;
let velocityY = 0;
let gravity = 0;
let gameOver = false;
let score = 0;

//Game Functions//
// When Screen Loads// *Possibly animate the spirit so it floating
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //This draws the game background//
    
    spritImg = new Image();
    spritImg.src = "./Images/Spirit.png";
    spritImg.onload = function() {
    context.drawImage(spritImg, sprit.x, sprit.y, sprit.width, sprit.height); // This draws the spirit character//
    }

//Plant Obstacle//
    plantImg = new Image();
    plantImg.scr = "./Images/Plant.png";

    butterflyImg = new Image();
    butterflyImg.scr = "./Images/Butterfly.png"

    requestAnimationFrame(update);
    setInterval(placePlant, 1000)
    document.addEventListener("keydown". moveSprit);} //This will tell the browser that you want to perform an animation//

    function update() {
    //Score//
    context.fillStyle="black";
    context.font="25px courier";
    score++;
    context.fillText(score, 15, 30);
    }