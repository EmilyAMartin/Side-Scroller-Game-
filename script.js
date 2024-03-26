//Canvas
let board;
let boardWidth = 980;
let boardHeight = 730;
let context;

//Sprit Character
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

//Plant Obstacle//
let plantWidth = 120;
let plantHeight = 260;
let plantX = 150
let plantY = 500
let plantImg;

//Game Operations//
let velocityX = 0;
let velocityY = 0;
let gravity = 0;
let gameOver = false;
let score = 0;

//Initial Load - Draw Background and Sprit (Possibly animate so it looks as if it is floating)//
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    
    spritImg = new Image();
    spritImg.src = "./Images/Sprit.png";
    spritImg.onload = function() {
    context.drawImage(spritImg, sprit.x, sprit.y, sprit.width, sprit.height); // Pulling infomation from Sprit Character//
    }
//Spawn Plant Obstacle//
    plantImg = new Image();
    plantImg.scr = "./Images/Plant.png";

    requestAnimationFrame(update);
    setInterval(placePlant, 1000)
    document.addEventListener("keydown". moveSprit);
}


