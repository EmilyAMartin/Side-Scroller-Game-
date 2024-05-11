//Game Variables//
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let backgroundimg = new Image();
backgroundimg.src = "./img/bg.png";
let backgroundWidth = 0;

//Sprit//
let spiritWidth = 75;
let spiritHeight = 75;
let spiritX = 75;
let spiritY = 500;
let spiritImg = new Image();
spiritImg.src = "./img/spirit.png";

const spirit = {
  x: spiritX,
  y: spiritY,
  width: spiritWidth,
  height: spiritHeight,
};

let obstacleArray = [];

let obstacle1Width = 120;
let obstacle1Height = 250;

let obstacle2Width = 120;
let obstacle2Height = 120;

let obstacle3Width = 120;
let obstacle3Height = 100;

let obstacle1X = 980;
let obstacle1Y = 500;
let obstacle2X = 980;
let obstacle2Y = 475;
let obstacle3X = 980;
let obstacle3Y = 550;

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
let adjustBy = 2.0; //Overlaps the characters collison//
let scrollSpeed = 8;
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
  canvas;
  canvas.height;
  canvas.width;
  //Events & Animation Request//
  document.addEventListener("keydown", moveSpirit);
  canvas.addEventListener("touchstart", moveSpirit);
  requestAnimationFrame(gameLoop);
  setInterval(placeObstacle, 1000); //1000 milliseconds = 1 second
  audio.play();
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

function toggleHighScore() {
  let showHighScore = document.getElementById("highScore");
  if (showHighScore.style.display === "none") {
    showHighScore.style.display = "block";
  } else {
    showHighScore.style.display = "none";
  }
}

const saveScores = [];

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (gameOver) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Draws Scrolling Background//
  ctx.drawImage(backgroundimg, -backgroundWidth, 0); //Background 1
  ctx.drawImage(backgroundimg, -backgroundWidth + canvas.width, 0); //Background 2
  backgroundWidth += scrollSpeed;
  if (backgroundWidth == canvas.width) backgroundWidth = 0;

  //Draws Spirit Character & Mouvement//
  velocityY += gravity;
  spirit.y = Math.max(spirit.y + velocityY, 350);
  ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);

  //Sprit Drops off Canvas//
  if (spirit.y > canvas.height) {
    gameOver = true;
    spiritImg.src = "./img/spirit-dead.png";
    spiritImg.onload = function () {
      ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
    };
  }

  //Drawing Obstacles//
  for (let i = 0; i < obstacleArray.length; i++) {
    let obstacle = obstacleArray[i];
    obstacle.x += velocityX * (1 + score / 2000); //Speed up obstacles over time//
    ctx.drawImage(
      obstacle.img,
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
    );

    //Collision//
    if (detectCollision(spirit, obstacle)) {
      gameOver = true;
      spiritImg.src = "./img/spirit-dead.png";
      spiritImg.onload = function () {
        ctx.drawImage(
          spiritImg,
          spirit.x,
          spirit.y,
          spirit.width,
          spirit.height
        );
      };
    }
  }

  //Score on screen//
  ctx.fillStyle = "white";
  ctx.font = "20px courier";
  score++;
  ctx.fillText(score, 15, 30);

  //Gameover Screen//
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "2rem Amatic SC, sans-serif";
    ctx.fillText("Gameover press Enter or Tap Screen to restart", 300, 350);
  }
}

function moveSpirit(e) {
  if (e.code === "Enter" || e.type === "touchstart") {
    velocityY = -6;
  }

  // Resets the Game//
  if (gameOver) {
    spirit.y = spiritY;
    obstacleArray = [];
    score = 0;
    gameOver = false;
    spiritImg = new Image();
    spiritImg.src = "./img/spirit.png";
    spiritImg.onload = function () {
      ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); // This draws the spirit character//
    };
  }
}

function placeObstacle() {
  if (gameOver) {
    return;
  }

  let obstacle = {
    img: null,
    x: null,
    y: null,
    width: null,
    height: null,
  };

  let placeObstacleChance = Math.random();

  if (placeObstacleChance > 0.75) {
    obstacle.img = obstacle3Img;
    obstacle.width = obstacle3Width;
    obstacle.height = obstacle3Height;
    obstacle.x = obstacle3X;
    obstacle.y = obstacle3Y;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > 0.5) {
    obstacle.img = obstacle2Img;
    obstacle.width = obstacle2Width;
    obstacle.height = obstacle2Height;
    obstacle.x = obstacle2X;
    obstacle.y = obstacle2Y;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > 0.25) {
    obstacle.img = obstacle1Img;
    obstacle.width = obstacle1Width;
    obstacle.height = obstacle1Height;
    obstacle.x = obstacle1X;
    obstacle.y = obstacle1Y;
    obstacleArray.push(obstacle);
  }
  if (obstacleArray.length > 5) {
    obstacleArray.shift(); //Keeps array from growing//
  }
}

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
    ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
  };
}
