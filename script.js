var spiritCharacter;

function startGame (){
    spiritCharacter = new component(30, 30, "Spirit.png", 10, 120, "image");
    gameArea.start();
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 980;
        this.canvas.height = 730;
        this.context = 
        this .canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGame, 20);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop: function () {
            clearInterval(this.interval);
        } 
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.scr = color;
        }
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY - 0;
        this.x = x;
        this.y = y;
        this.update = function() {
            ctx = gameArea.context;
            if (type == "image") {
                ctx.drawImage(this.image, 
                    this.x,
                    this.y,
                    this.width, this.height);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
        this.newPos = function (){
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
    function updateGameArea(){
        gameArea.clear();
        spiritCharacter.newPos();
        spiritCharacter.update();
    }