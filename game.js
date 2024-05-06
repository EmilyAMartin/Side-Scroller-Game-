//Game Variables//
let canvas;
let canvasWidth = 1040;
let canvasHeight = 740;
let context;

let backgroundimg = new Image();
backgroundimg.src = "./img/bg.png";
let backgroundWidth = 0;
let scrollSpeed = 8;

//Sprit//
let spiritWidth = 75;
let spiritHeight = 75;
let spiritX = 75;
let spiritY = 500;
let spiritImg = new Image();
spiritImg.src = "./img/spirit.png";

let spirit = {
  x: spiritX,
  y: spiritY,
  width: spiritWidth,
  height: spiritHeight,
};

let obstacleArray = [];

let obstacle1Width = 120;
let obstacle2Width = 120;
let obstacle3Width = 120;

let obstacleHeight = 250; //Height the same for all obstacles//
let obstacleX = 980;
let obstacleY = 500;
// let obstacleX2 = 980;
// let obstacleY2 = 400;

let obstacle1Img = new Image();
obstacle1Img.src = "./img/obstacle1.png";

let obstacle2Img = new Image();
obstacle2Img.src = "./img/obstacle2.png";

let obstacle3Img = new Image();
obstacle3Img.src = "./img/obstacle3.png";

//Game Physics and Operations//
let velocityX = -12;
let velocityY = 0;
let gravity = 0.4;
let adjustBy = 1.8; //Overlaps the characters collison//
let gameStarted = false;
let gameOver = false;
let score = 0;
let intervalID; //Starts the placement of object when new game is pressed//

//Background Audio and Buttons//
let audio = new Audio();
audio.src = "./music/music.mp3";
audio.volume = 0.05; //Volume of background music
audio.loop = true;
audio.play();
audio.pause();

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
  // setInterval(placeObstacleHigher, 1500); //1000 milliseconds = 1 second
};

function playPause() {
  playbtn = document.getElementById("playPauseBtn");
  if (audio.paused) {
    audio.play();
    playbtn.style.background = "url(music/pause.png) no-repeat";
  } else {
    audio.pause();
    playbtn.style.background = "url(music/play.png) no-repeat";
  }
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (gameOver) {
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  //Draws Scrolling Background//
  context.drawImage(backgroundimg, -backgroundWidth, 0); //Background 1
  context.drawImage(backgroundimg, -backgroundWidth + canvas.width, 0); //Background 2
  backgroundWidth += scrollSpeed;
  if (backgroundWidth == canvas.width) backgroundWidth = 0;

  //Draws Spirit Character & Mouvement//
  velocityY += gravity;
  spirit.y = Math.max(spirit.y + velocityY, 400);
  context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
  
  if (spirit.y > canvas.height) {
    gameOver = true;
  }

  //Drawing Obstacles//
  for (let i = 0; i < obstacleArray.length; i++) {
    let obstacle = obstacleArray[i];
    obstacle.x += velocityX * (1 + score / 5000); //Speed up obstacles over time//
    context.drawImage(
      obstacle.img,
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
    );

    //Collision//
    if (detectCollision(spirit, obstacle)) {
      gameOver = true;
      document.getElementById("gameOverMenu").style.display = "block";
      spiritImg.src = "./img/spirit-dead.png";
      spiritImg.onload = function () {
        context.drawImage(
          spiritImg,
          spirit.x,
          spirit.y,
          spirit.width,
          spirit.height
        ); //Add a game over image and an option to try again//
      };
    }
  }
  //Score on screen//
  context.fillStyle = "white";
  context.font = "20px courier";
  score++;
  context.fillText(score, 15, 30);
  audio.play();
}

function moveSpirit(e) {
  if (e.code === "Enter" || e.type === "touchstart"){
    velocityY = -6;
  }

  // Resets the Game//
  if (gameOver) {
    document.getElementById("gameOverMenu").style.display = "none";
    spirit.y = spiritY;
    obstacleArray = [];
    score = 0;
    gameOver = false;
    spiritImg = new Image();
    spiritImg.src = "./img/spirit.png";
    spiritImg.onload = function () {
      context.drawImage(
        spiritImg,
        spirit.x,
        spirit.y,
        spirit.width,
        spirit.height
      ); // This draws the spirit character//
    };
  }
}

function placeObstacle() {
  if (gameOver) {
    return;
  }
  let obstacle = {
    img: null,
    x: obstacleX,
    y: obstacleY,
    width: null,
    height: obstacleHeight,
  };

  let placeObstacleChance = Math.random();

  if (placeObstacleChance > 0.75) {
    obstacle.img = obstacle3Img;
    obstacle.width = obstacle3Width;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > 0.5) {
    obstacle.img = obstacle2Img;
    obstacle.width = obstacle2Width;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > 0.25) {
    obstacle.img = obstacle1Img;
    obstacle.width = obstacle1Width;
    obstacleArray.push(obstacle);
  }
  if (obstacleArray.length > 5) {
    obstacleArray.shift(); //Keeps array from growing//
  }
}
//Moves Obstacle Higher//
// function placeObstacleHigher() { 
//   if (gameOver) {
//     return;
//   }
//   let obstacle = {
//     img: null,
//     x: obstacleX2,
//     y: obstacleY2,
//     width: null,
//     height: obstacleHeight,
//   };
//   let placeObstacleChance = Math.random();
  
//   if (placeObstacleChance > 0.75) {
//     obstacle.img = obstacle2Img;
//     obstacle.width = obstacle2Width;
//     obstacleArray.push(obstacle);
  
//   if (obstacleArray.length > 5) {
//     obstacleArray.shift(); //Keeps array from growing//
//     }
//   }
// }

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width / adjustBy &&
    a.x + a.width / adjustBy > b.x &&
    a.y < b.y + b.height / adjustBy &&
    a.y + a.height / adjustBy > b.y
  );
}

function resetGame() {
  window.location = "index.html";
  clearInterval(intervalID); //Clears the gameloop and obstacle placement onclick to Main Menu//
  spirit.y = spiritY;
  obstacleArray = [];
  score = 0;
  gameOver = false;
  spiritImg = new Image();
  spiritImg.src = "./img/spirit.png";
  spiritImg.onload = function () {
    context.drawImage(
      spiritImg,
      spirit.x,
      spirit.y,
      spirit.width,
      spirit.height
    ); // This draws the spirit character//
  };
}
