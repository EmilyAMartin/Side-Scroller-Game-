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
let plantImg;
let plantWidth = 75;
let plantHeight = 75;
let plantX = 75;
let plantY = 500;

//Spirit object//
let plant = {
    x : plantX,
    y : plantY,
    width : plantWidth,
    height : plantHeight
} 

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

    //Obstacle//
    plantImg = new Image();
    plantImg.scr = "./Images/Plant.png";

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
        for (let i = 0; i < plantImg; i++) {
            let plant = plantImg[i];
            plant.x += velocityX;
            context.drawImage(plantImg, plant.x, plant.y, plant.width, plant.height);
    
            if (detectCollision(spirit, plant)) {
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

function placePlant() {
    if (gameOver) {
        return;
    }

    //place plant
    let plant = {
        img : null,
        x : plantX,
        y : plantY,
        width : null,
        height: plantHeight
    }

    let placePlantChance = Math.random(); //0 - 0.9999...

    if (placePlantChance > .90) { //10% you get cactus3
        plant.img = cactus3Img;
        plant.width = plantWidth;
        plant.push(plant);
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}