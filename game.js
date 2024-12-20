//Game Variables//
//Game Physics and Operations//
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const backgroundimg = document.getElementById("background");
let backgroundWidth = 0;
const levelOneScore = 500;
const winImg = document.getElementById("win");
const fps = 60;
const msPerFrame = 1000 / fps;
let msPrev = window.performance.now();
let velocityX = -12;
let velocityY = 0;
let gravity = 0.4;
let adjustBy = 2.0; //Overlaps the characters collison//
let backgroundScrollSpeed = 8;
let score = 0;
let highestScores = [];
let scoreList = document.getElementById("scoretable");
let restart = false;
let gameOver = false;
const keyCodes = ["Space", "touchstart"];

//Audio//
let audio = document.getElementById("backgroundmusic");
audio.volume = 0.05; //Volume of background music
audio.loop = true;
audio.play();
audio.pause();

//Sprit//
const spiritWidth = 75;
const spiritHeight = 75;
const spiritX = 75;
const spiritY = 500;
const spiritImg = document.getElementById("spirit");
const spiritImgDead = document.getElementById("spiritdead");

const spirit = {
  x: spiritX,
  y: spiritY,
  width: spiritWidth,
  height: spiritHeight,
};

//Obstacles//
let obstacleArray = [];

const obstacle1Width = 120;
const obstacle1Height = 250;
const obstacle1X = 980;
const obstacle1Y = 500;
const obstacle1Img = document.getElementById("plant");

const obstacle2Width = 120;
const obstacle2Height = 120;
const obstacle2X = 980;
const obstacle2Y = 475;
const obstacle2Img = document.getElementById("butterfly");

const obstacle3Width = 120;
const obstacle3Height = 100;
const obstacle3X = 980;
const obstacle3Y = 550;
const obstacle3Img = document.getElementById("dragonfly");

const obstacle4Width = 60;
const obstacle4Height = 50;
const obstacle4X = 980;
const obstacle4Y = 350;
const obstacle4Img = document.getElementById("firefly");

//Game Functions//
function drawBackground() {
  //Background & Score//
  ctx.drawImage(backgroundimg, -backgroundWidth, 0);
  ctx.drawImage(backgroundimg, -backgroundWidth + canvas.width, 0);
  backgroundWidth += backgroundScrollSpeed;
  if (backgroundWidth == canvas.width) backgroundWidth = 0;
}
function drawSpirit() {
  ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
}
function drawSpiritDead() {
  ctx.drawImage(spiritImgDead, spirit.x, spirit.y, spirit.width, spirit.height);
}
function moveSpirit(e) {
  if (keyCodes.includes(e.code) || keyCodes.includes(e.type)) {
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
//Game Menu Functions//
function mainMenu() {
  window.location = "index.html";
}
function playPause() {
  if (audio.paused) {
    audio.play();
    document.getElementById("pause").style.display = "block";
    document.getElementById("play").style.display = "none";
  } else {
    audio.pause();
    document.getElementById("play").style.display = "block";
    document.getElementById("pause").style.display = "none";
  }
}
let showHighScore = false;
function highScoreBox() {
  if (showHighScore) {
    //box//
    ctx.fillStyle = "#00000075";
    ctx.fillRect(870, 15, 150, 70);
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.roundRect(870, 15, 150, 70, 5);
    ctx.stroke();
    //text//
    ctx.fillStyle = "white";
    ctx.font = "25px Amatic SC, sans-serif";
    ctx.fillText("High Score", 910, 40);
    //score//
    ctx.fillStyle = "white";
    ctx.font = "25px Amatic SC, sans-serif";
    let highScore = highestScores.map((row) => {
      return row.score;
    });
    ctx.fillText(highScore, 935, 70);
  }
}
function highScoreBoxToggle() {
  showHighScore = !showHighScore;

  if (showHighScore) {
    highScoreBox();
  }
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
}

//Start, Restart, Win & Game Over //
function gameReset() {
  if (!restart) {
    restart = true;
    setTimeout(() => {
      document.addEventListener("keydown", reset);
      document.addEventListener("touchstart", reset, { once: true });
    }, 500);
  }
}
function reset(e) {
  if (keyCodes.includes(e.code) || keyCodes.includes(e.type)) {
    document.removeEventListener("keydown", reset);
    restart = false;
    gameOver = false;
    spirit.y = spiritY;
    obstacleArray = [];
    score = 0;
    ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height);
  }
}
function showGameover() {
  ctx.fillStyle = "white";
  ctx.font = "40px Amatic SC, sans-serif";
  ctx.fillText("Gameover press Space or Tap Screen to restart", 280, 350);
}
function showGamestart() {
  ctx.fillStyle = "white";
  ctx.font = "40px Amatic SC, sans-serif";
  ctx.fillText("Press Space or Tap Screen to start", 340, 350);
}
function showScore() {
  ctx.fillStyle = "white";
  ctx.font = "30px courier";
  score++;
  ctx.fillText(score, 15, 35);
}
function showWin() {
  document.getElementById("win").style.display = "block";
  document.getElementById("highestScoreMenu").style.display = "none";
  document.getElementById("gameMenu").style.display = "none";
}
function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//Loading Game//
window.onload = function () {
  //Events & Animation Request//
  document.addEventListener("keydown", startGame, { once: true });
  document.addEventListener("touchstart", startGame, { once: true });
  document.addEventListener("keydown", moveSpirit);
  document.addEventListener("touchstart", moveSpirit);
  audio.play();
  drawBackground();
  drawSpirit();
  showGamestart();
};
function startGame(e) {
  if (keyCodes.includes(e.code) || keyCodes.includes(e.type)) {
    requestAnimationFrame(gameLoop);
    setInterval(placeObstacle, 1000); //1000 milliseconds = 1 second
  }
  showHighScore = true;
}
function gameLoop() {
  requestAnimationFrame(gameLoop);
  //Frames per second//
  const msNow = window.performance.now();
  const msPassed = msNow - msPrev;
  if (msPassed < msPerFrame) return;
  const excessTime = msPassed % msPerFrame;
  msPrev = msNow - excessTime;

  if (gameOver) {
    return;
  }
  clearScreen();
  drawBackground();
  drawSpirit();
  showScore();
  highScoreBox();

  //Draw Spirit//
  velocityY += gravity;
  spirit.y = Math.max(spirit.y + velocityY, 350);

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
    if (detectCollision(spirit, obstacle)) {
      gameOver = true;
      gameReset();
      checkScore();
      drawSpiritDead();
    }
  }
  //Game over by falling off screen//
  if (spirit.y > canvas.height) {
    gameOver = true;
    gameReset();
    checkScore();
  }
  //Game over message//
  if (gameOver) {
    showGameover();
  }
  //Game over by completing level//
  if (score > levelOneScore) {
    gameOver = true;
    clearScreen();
    showWin();
    setInterval(() => {
      mainMenu();
    }, 4000);
  }
}
