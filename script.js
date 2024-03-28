//Game objects//
var spiritCharacter;
var plantObstacle;
var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 980;
        this.canvas.height = 730;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//Start game//
function startGame() {
    gameArea.start();
    spiritCharacter = new component(75, 75, "lightgray", 100, 500); //Controls the size and location of spirit character//
    plantObstacle = new component(120, 260, "green", 350, 450); //Controls the size and location of plant obstacle//
}
//This adds components to the game area//
function component(width, height, color, x, y) {
    this.gamearea = gameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function updateGameArea() {
    gameArea.clear();
    spiritCharacter.speedX = 0;
    spiritCharacter.speedY = 0;
    if (gameArea.keys && gameArea.keys[37]) {spiritCharacter.speedX = -1; }
    if (gameArea.keys && gameArea.keys[39]) {spiritCharacter.speedX = 1; }
    if (gameArea.keys && gameArea.keys[38]) {spiritCharacter.speedY = -1; }
    if (gameArea.keys && gameArea.keys[40]) {spiritCharacter.speedY = 1; }
    plantObstacle.update();
    spiritCharacter.newPos();
    spiritCharacter.update();
  }