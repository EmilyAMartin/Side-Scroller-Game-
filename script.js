//Canvas//
let board;
let boardWidth = 980;
let boardHeight = 730;
let context;

//Sprit character//
let spritWidth = 75;
let spritHeight = 75;
let spritX = 75
let spritY = 500
let spritImg;

let sprit = {
    x : spritX,
    y : spritY,
    width : spritWidth,
    height : spritHeight
}

//Plant obstacle//
let plantWidth = 120;
let plantHeight = 260;
let plantX = 150;
let plantY = 500;
let plantImg;

//Butterfly obstacle//
let butterflyWidth = 115;
let butterflyHeight = 115;
let butterflyX = 150;
let butterflyY = 500;
let butterflyImg;

//Game operations//
let velocityX = 0;
let velocityY = 0;
let gravity = 0;

let gameOver = false;
let score = 0;

// When the screen initial loads it will draw  the background and sprit (Possibly animate so it looks as if it is floating)//
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    
    spritImg = new Image();
    spritImg.src = "./Images/Sprit.png";
    spritImg.onload = function() {
    context.drawImage(spritImg, sprit.x, sprit.y, sprit.width, sprit.height); // This pulls the infomation from the section Sprit Character//
    }

//Spawn Plant Obstacle//
    plantImg = new Image();
    plantImg.scr = "./Images/Plant.png";

    butterflyImg = new Image();
    butterflyImg.scr = "./Images/Butterfly.png"

    requestAnimationFrame(update);
    setInterval(placePlant, 1000)
    document.addEventListener("keydown". moveSprit);}

    function update() {
    //Score//
    context.fillStyle="black";
    context.font="25px courier";
    score++;
    context.fillText(score, 15, 30);
    }
   