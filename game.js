//Game Variables//
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const backgroundimg = new Image();
backgroundimg.src = "./img/bg.png";
let backgroundWidth = 0;

//Sprit//
const spiritWidth = 75;
const spiritHeight = 75;
const spiritX = 75;
const spiritY = 500;
let spiritImg = new Image();
spiritImg.src = "./img/spirit.png";

const spirit = {
  x: spiritX,
  y: spiritY,
  width: spiritWidth,
  height: spiritHeight,
};

let obstacleArray = [];

const obstacle1Width = 120;
const obstacle1Height = 250;
const obstacle1X = 980;
const obstacle1Y = 500;
const obstacle1Img = new Image();
obstacle1Img.src = "./img/obstacle1.png";

const obstacle2Width = 120;
const obstacle2Height = 120;
const obstacle2X = 980;
const obstacle2Y = 475;
const obstacle2Img = new Image();
obstacle2Img.src = "./img/obstacle2.png";

const obstacle3Width = 120;
const obstacle3Height = 100;
const obstacle3X = 980;
const obstacle3Y = 550;
const obstacle3Img = new Image();
obstacle3Img.src = "./img/obstacle3.png";

const obstacle4Width = 75;
const obstacle4Height = 75;
const obstacle4X = 980;
const obstacle4Y = 350;
const obstacle4Img = new Image();
obstacle4Img.src = "./img/obstacle4.png";

//Game Physics and Operations//
let velocityX = -12;
let velocityY = 0;
let gravity = 0.4;
let adjustBy = 2.0; //Overlaps the characters collison//
let scrollSpeed = 8;
let gameOver = false;
let score = 0;
let highestScores = [];
let scoreList = document.getElementById("scoretable");
let hasAddedEventListnersForRestart = false;
let waitingToStart = true;

//Background Audio and Buttons//
let audio = new Audio();
audio.src = "./music/music.mp3";
audio.volume = 0.05; //Volume of background music
audio.loop = true;
audio.play();
audio.pause();

window.onload = function () {
  //Events & Animation Request//
  document.addEventListener("keydown", moveSpirit);
  document.addEventListener("touchstart", moveSpirit);
  requestAnimationFrame(gameLoop);
  setInterval(placeObstacle, 1000); //1000 milliseconds = 1 second
  audio.play();
}
function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (gameOver && waitingToStart) {
    return;
  }
  //Clear Canvas//
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Draw Scrolling Background//
  ctx.drawImage(backgroundimg, -backgroundWidth, 0);
  ctx.drawImage(backgroundimg, -backgroundWidth + canvas.width, 0);
  backgroundWidth += scrollSpeed;
  if (backgroundWidth == canvas.width) backgroundWidth = 0;

  //Draw Spirit//
  velocityY += gravity;
  spirit.y = Math.max(spirit.y + velocityY, 350);
  ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
  if (spirit.y > canvas.height) {
    gameOver = true;
    gameReset();
    checkScore();
  }

  //Draw Obstacles//
  for (let i = 0; i < obstacleArray.length; i++) {
    let obstacle = obstacleArray[i];
    obstacle.x += velocityX * (1 + score / 2000); //Speeds up the obstacles over time//
    ctx.drawImage(
      obstacle.img,
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
    );

    //GameOver//
    if (detectCollision(spirit, obstacle)) {
      gameOver = true;
      gameReset();
      checkScore();
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
   //Score//
   ctx.fillStyle = "white";
   ctx.font = "20px courier";
   score++;
   ctx.fillText(score, 15, 30);
 
   //Gameover Message//
  if (gameOver) {
    showGameover();
  }
  if (waitingToStart){
    showStartGame();
  }
 
}
function moveSpirit(e) {
  if (e.code === "Enter" || e.type === "touchstart") {
    velocityY = -6;
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
    obstacle.img = obstacle4Img;
    obstacle.width = obstacle4Width;
    obstacle.height = obstacle4Height;
    obstacle.x = obstacle4X;
    obstacle.y = obstacle4Y;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > 0.75) {
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
//Game Menu Buttons//
function mainMenu() {
  window.location = "index.html";
};
function playPause() {
  playbtn = document.getElementById("playPauseBtn");
  if (audio.paused) {
    audio.play();
    playbtn.style.background = "url(icons/pause.png) no-repeat";
  } else {
    audio.pause();
    playbtn.style.background = "url(music/play.png) no-repeat";
  }
}
function toggleHighScore() {
  let showHighScore = document.getElementById("highestScoreMenu");
  if (showHighScore.style.display === "none") {
    showHighScore.style.display = "";
  } else {
    showHighScore.style.display = "none";
  }
}
function highestScoresTable() {
  scoreList.innerHTML = highestScores.map((row) => {
    return (row.score);
  });
}
function checkScore() {
  let worstScore = 0;
  if (highestScores.length > 1) {
    worstScore = highestScores[highestScores.length - 1].score;
  }
  if (score > worstScore) {
    highestScores.push({ score });
  }
  highestScores.sort((a, b) => (a.score > b.score ? -1 : 1));
  if (highestScores.length > 1) {
    highestScores.pop();
  }
  highestScoresTable();
}
//Gameover Screen and Restart//
function gameReset(){
  if(!hasAddedEventListnersForRestart){
    hasAddedEventListnersForRestart = true;
    setTimeout(() => {
      document.addEventListener("keydown", reset, {once:true});
      document.addEventListener("touchstart",reset, {once:true}); 
    }, 500);
  }
}
function reset(){
  hasAddedEventListnersForRestart = false;
  gameOver = false; 
  spirit.y = spiritY;
    obstacleArray = [];
    score = 0;
    spiritImg = new Image();
    spiritImg.src = "./img/spirit.png";
    spiritImg.onload = function () {
      ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); // This draws the spirit character//
  };
}
function showGameover(){
  ctx.fillStyle = "white";
  ctx.font = "2rem Amatic SC, sans-serif";
  ctx.fillText("Gameover press Enter or Tap Screen to restart", 300, 350);
  document.getElementById("restartBtn").style.display = "block";
}